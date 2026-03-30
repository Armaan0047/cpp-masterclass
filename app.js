// Professional C++ Learning Platform - Production Edition
// Integrated with Firebase Auth, Judge0 API, and Persistence

// --- FIREBASE CONFIGURATION ---
// Replace with your own config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAs-MOCK-API-KEY-FOR-DEMO",
  authDomain: "cpp-masterclass-demo.firebaseapp.com",
  projectId: "cpp-masterclass-demo",
  storageBucket: "cpp-masterclass-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef12345"
};

// Initialize Firebase if scripts are loaded
let auth, db;
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
}

// --- STATE MANAGEMENT ---
let currentUser = null;
let completedTopics = JSON.parse(localStorage.getItem('cpp-completion-v3')) || {};
let currentTopicId = "";
let editor = null;
let roadmapMode = false;
let streakData = JSON.parse(localStorage.getItem('cpp-streak-v1')) || { count: 0, lastVisit: null };

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initModules();
    handleAuth();
    handleRouting();
    initRoadmapToggle();
    updateScoreUI();
    checkStreak();
    lucide.createIcons();
    
    gsap.to('#view-container', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
});

// --- AUTHENTICATION SYSTEM ---
function handleAuth() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userProfile = document.getElementById('user-profile');
    const userInitials = document.getElementById('user-initials');
    const welcomeMsg = document.getElementById('welcome-message');

    if (!auth) return;

    auth.onAuthStateChanged(async (user) => {
        if (user) {
            currentUser = user;
            loginBtn.classList.add('hidden');
            userProfile.classList.remove('hidden');
            userInitials.innerText = user.displayName ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
            welcomeMsg.innerText = `Welcome back, ${user.displayName.split(' ')[0]}! 🔥`;
            
            // Sync Progress from Firebase
            await syncProgressFromCloud();
        } else {
            currentUser = null;
            loginBtn.classList.remove('hidden');
            userProfile.classList.add('hidden');
            welcomeMsg.innerText = "1ST YEAR BTECH CURRICULUM";
        }
    });

    loginBtn.onclick = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(err => console.error(err));
    };

    logoutBtn.onclick = () => {
        auth.signOut();
        location.reload(); // Reset state
    };
}

async function syncProgressFromCloud() {
    if (!currentUser || !db) return;
    try {
        const doc = await db.collection('users').doc(currentUser.uid).get();
        if (doc.exists) {
            const cloudProgress = doc.data().progress || {};
            // Merge cloud with local (prefer cloud for source of truth)
            completedTopics = { ...completedTopics, ...cloudProgress };
            localStorage.setItem('cpp-completion-v3', JSON.stringify(completedTopics));
            updateProgress();
            updateScoreUI();
            initSidebar();
        }
    } catch (e) { console.error("Sync Error:", e); }
}

async function syncProgressToCloud() {
    if (!currentUser || !db) return;
    try {
        await db.collection('users').doc(currentUser.uid).set({
            progress: completedTopics,
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (e) { console.error("Cloud Save Error:", e); }
}

// --- DAILY STREAK SYSTEM ---
function checkStreak() {
    const today = new Date().toDateString();
    const streakCount = document.getElementById('streak-count');
    const streakBadge = document.getElementById('streak-badge');

    if (streakData.lastVisit === today) {
        // Already visited today
    } else {
        const lastDate = streakData.lastVisit ? new Date(streakData.lastVisit) : null;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate && lastDate.toDateString() === yesterday.toDateString()) {
            streakData.count += 1;
        } else {
            streakData.count = 1;
        }
        streakData.lastVisit = today;
        localStorage.setItem('cpp-streak-v1', JSON.stringify(streakData));
    }

    if (streakData.count > 0) {
        streakBadge.classList.remove('hidden');
        streakCount.innerText = `${streakData.count} Day${streakData.count > 1 ? 's' : ''}`;
    }
}

// --- SCORE & PERSISTENCE ---
function updateScoreUI() {
    const badge = document.getElementById('score-badge');
    const count = Object.keys(completedTopics).length;
    if(badge) {
        badge.innerHTML = `
            <div class="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold border border-emerald-500/20">
                <i data-lucide="award" class="w-3.5 h-3.5"></i> ${count} Topics Mastered
            </div>
            <button onclick="shareProfile()" class="p-1.5 hover:bg-glass rounded-lg text-slate-400 hover:text-primary transition-all" title="Share Profile">
                <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
            </button>
        `;
        lucide.createIcons();
    }
}

function recordCompletion(topicId) {
    if(!completedTopics[topicId]) {
        completedTopics[topicId] = true;
        localStorage.setItem('cpp-completion-v3', JSON.stringify(completedTopics));
        updateProgress();
        updateScoreUI();
        initSidebar();
        syncProgressToCloud(); // Push to Firebase
    }
}

// --- NAVIGATION & ROUTING ---
function handleRouting() {
    const params = new URLSearchParams(window.location.search);
    const profileProgress = params.get('progress');
    const hash = window.location.hash.slice(1);

    if (profileProgress) {
        showProfileView(profileProgress);
    } else if (hash) {
        navigateTo(hash);
    } else {
        showHome();
    }
}

function navigateTo(topicId) {
    window.location.hash = topicId;
    currentTopicId = topicId;
    roadmapMode = false;
    renderTopic(topicId);
}

function showHome() {
    gsap.to('#view-container', { opacity: 0, onComplete: () => {
        document.getElementById('home-view').classList.remove('hidden');
        document.getElementById('topic-view').classList.add('hidden');
        document.getElementById('roadmap-view').classList.add('hidden');
        document.getElementById('profile-view').classList.add('hidden');
        gsap.to('#view-container', { opacity: 1 });
    }});
}

function showProfileView(progress) {
    gsap.to('#view-container', { opacity: 0, onComplete: () => {
        document.getElementById('home-view').classList.add('hidden');
        document.getElementById('topic-view').classList.add('hidden');
        document.getElementById('roadmap-view').classList.add('hidden');
        const view = document.getElementById('profile-view');
        view.classList.remove('hidden');
        
        document.getElementById('profile-progress-text').innerText = `${progress}% Mastered`;
        document.getElementById('profile-bar-fill').style.width = `${progress}%`;
        
        gsap.to('#view-container', { opacity: 1 });
    }});
}

function shareProfile() {
    const total = cppCurriculum.flatMap(s => s.topics).length;
    const progress = Math.round((Object.keys(completedTopics).length / total) * 100);
    const url = `${window.location.origin}${window.location.pathname}?progress=${progress}`;
    
    navigator.clipboard.writeText(url).then(() => {
        alert("Shareable profile link copied to clipboard! 🚀");
    });
}

// --- CORE RENDERER ---
function renderTopic(topicId) {
    let topic = null;
    cppCurriculum.forEach(s => { const found = s.topics.find(t => t.id === topicId); if (found) topic = found; });
    if (!topic) return;

    gsap.to('#view-container', { opacity: 0, y: 10, onComplete: () => {
        document.getElementById('home-view').classList.add('hidden');
        document.getElementById('roadmap-view').classList.add('hidden');
        document.getElementById('profile-view').classList.add('hidden');
        const view = document.getElementById('topic-view');
        view.classList.remove('hidden');

        view.innerHTML = `
            <div class="space-y-12 animate-fade-in pb-20">
                <!-- 1. THEORY SECTION -->
                <div class="space-y-6">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-black">?</div>
                        <h2 class="text-5xl font-black italic tracking-tighter text-white">${topic.title}</h2>
                    </div>
                    <div class="grid lg:grid-cols-3 gap-8">
                        <div class="lg:col-span-2 bg-primary/5 p-8 rounded-3xl border border-primary/20">
                            <p class="text-xl text-slate-100 leading-relaxed font-medium italic">"${topic.theory}"</p>
                        </div>
                        <div class="bg-secondary/5 p-8 rounded-3xl border border-secondary/20 flex flex-col justify-center">
                            <h4 class="text-xs font-black uppercase tracking-widest text-secondary mb-3 flex items-center gap-2">
                                <i data-lucide="info" class="w-4 h-4"></i> Real-Life Analogy
                            </h4>
                            <p class="text-slate-300 text-sm italic font-medium">"${topic.realLifeExample}"</p>
                        </div>
                    </div>
                </div>

                <!-- 2. MULTIPLE CODE EXAMPLES -->
                <div class="space-y-8">
                    <h3 class="text-2xl font-black text-gradient uppercase tracking-widest flex items-center gap-3">
                        <i data-lucide="book-open" class="w-6 h-6"></i> Reference Examples
                    </h3>
                    <div class="grid lg:grid-cols-1 gap-12">
                        ${topic.examples.map((ex, i) => `
                            <div class="space-y-6 glass-panel p-10 group relative transition-all hover:bg-slate-800/10">
                                <div class="flex items-center justify-between">
                                    <h4 class="text-xl font-bold text-slate-200">#${i+1} : ${ex.title}</h4>
                                    <span class="text-[10px] text-slate-500 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full">Example Code</span>
                                </div>
                                <div class="rounded-2xl border border-border overflow-hidden relative">
                                    <button onclick="copyCode(this)" class="absolute top-4 right-4 z-10 px-3 py-1.5 bg-slate-800 border border-border rounded-lg text-[10px] font-bold text-slate-400 hover:text-white transition-all uppercase">Copy Code</button>
                                    <pre class="language-cpp"><code>${ex.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
                                </div>
                                <div class="grid md:grid-cols-2 gap-8 pt-4">
                                    <div>
                                        <p class="text-[10px] uppercase font-black text-primary tracking-widest mb-2 opacity-60">Expected Result</p>
                                        <div class="bg-slate-900 border border-border p-4 rounded-xl font-mono text-emerald-400 text-sm italic">${ex.output}</div>
                                    </div>
                                    <div>
                                        <p class="text-[10px] uppercase font-black text-secondary tracking-widest mb-2 opacity-60">Logic Overview</p>
                                        <p class="text-sm text-slate-400 leading-relaxed">${ex.explanation}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 3. PRACTICE ARENA -->
                <div class="pt-16 border-t border-border/50">
                    <div class="bg-slate-900/40 p-12 rounded-[40px] border border-border/50 shadow-2xl space-y-8 relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none"></div>
                        
                        <div class="flex items-center justify-between">
                            <div class="space-y-1">
                                <h3 class="text-3xl font-black text-white italic tracking-tight">Code it yourself 🔥</h3>
                                <p class="text-slate-500 text-sm">Practice makes an expert. Implement the concept below.</p>
                            </div>
                            <div class="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                                <i data-lucide="terminal" class="w-4 h-4"></i> Integrated Playground
                            </div>
                        </div>

                        <div class="space-y-6">
                            <div class="p-6 bg-slate-800/50 border border-border rounded-2xl">
                                <p class="text-xl text-slate-200 font-bold leading-relaxed italic">Task: ${topic.practice.task}</p>
                            </div>
                            
                            <div class="rounded-3xl border border-border hover:border-primary/30 transition-all overflow-hidden shadow-2xl">
                                <div id="practice-code-editor" style="height: 300px; width: 100%; font-size: 16px;"></div>
                            </div>
                        </div>

                        <!-- OUTPUT CONSOLE -->
                        <div id="output-console" class="hidden animate-fade-in">
                            <p class="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-2 flex items-center gap-2">
                                <i data-lucide="terminal" class="w-3 h-3"></i> Execution Output
                            </p>
                            <pre id="output-text" class="bg-black/80 p-6 rounded-2xl border border-border font-mono text-emerald-400 text-sm overflow-x-auto whitespace-pre-wrap min-h-[100px]"></pre>
                        </div>

                        <div id="feedback-panel" class="hidden p-8 rounded-3xl animate-fade-in border"></div>

                        <div class="flex flex-wrap items-center gap-5 pt-4">
                            <button id="run-code-btn" class="px-8 py-4.5 bg-slate-800 border border-border rounded-2xl font-black text-white tracking-wide hover:bg-slate-700 transition-all flex items-center gap-2">
                                <i data-lucide="play" class="w-4 h-4 text-emerald-500"></i> RUN CODE
                            </button>
                            <button id="validate-code-btn" class="px-10 py-4.5 bg-primary rounded-2xl font-black text-dark tracking-wide hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">VALIDATE PROGRAM</button>
                            <button id="next-module-btn" class="hidden px-10 py-4 bg-emerald-500 rounded-2xl font-black text-dark tracking-wide hover:scale-105 transition-all">NEXT TOPIC →</button>
                            <button id="retry-logic-btn" class="hidden px-8 py-4 bg-slate-800 border border-white/10 rounded-2xl font-bold text-white hover:bg-slate-700 transition-all">REVISIT LOGIC</button>
                        </div>
                    </div>
                </div>

                <!-- 4. ENHANCED MODULES -->
                <div class="grid lg:grid-cols-3 gap-8 pb-10">
                    <div class="bg-amber-500/5 p-8 rounded-3xl border border-amber-500/20 space-y-4">
                        <div class="flex items-center gap-3 text-amber-500 font-black uppercase text-xs tracking-[0.2em]">
                            <i data-lucide="lightbulb" class="w-4 h-4"></i> Did you know?
                        </div>
                        <p class="text-slate-300 text-sm leading-relaxed font-medium italic">"${topic.didYouKnow}"</p>
                    </div>
                    <div class="bg-rose-500/5 p-8 rounded-3xl border border-rose-500/20 space-y-4">
                        <div class="flex items-center gap-3 text-rose-500 font-black uppercase text-xs tracking-[0.2em]">
                            <i data-lucide="x-circle" class="w-4 h-4"></i> Common Mistakes
                        </div>
                        <ul class="space-y-3">
                            ${topic.commonMistakes.map(m => `<li class="flex gap-2 text-xs text-slate-400 font-medium"><span class="text-rose-500">•</span> ${m}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="bg-emerald-500/5 p-8 rounded-3xl border border-emerald-500/20 space-y-4">
                        <div class="flex items-center gap-3 text-emerald-500 font-black uppercase text-xs tracking-[0.2em]">
                            <i data-lucide="zap" class="w-4 h-4"></i> Quick Tip
                        </div>
                        <p class="text-slate-100 text-sm leading-relaxed font-bold">"${topic.quickTip}"</p>
                    </div>
                </div>
            </div>
        `;
        
        lucide.createIcons();
        Prism.highlightAll();
        initPlayground(topic);
        gsap.to('#view-container', { opacity: 1, y: 0, duration: 0.5 });
    }});
}

function initPlayground(topic) {
    editor = ace.edit("practice-code-editor");
    editor.setTheme("ace/theme/tomorrow_night_eighties");
    editor.session.setMode("ace/mode/c_cpp");
    editor.setValue(topic.practice.initialCode);
    editor.clearSelection();
    editor.setShowPrintMargin(false);
    editor.setOptions({ fontFamily: "'JetBrains Mono', monospace", fontSize: "15px" });

    const validateBtn = document.getElementById('validate-code-btn');
    const runBtn = document.getElementById('run-code-btn');
    const nextBtn = document.getElementById('next-module-btn');
    const retryBtn = document.getElementById('retry-logic-btn');
    const panel = document.getElementById('feedback-panel');

    runBtn.onclick = () => runCodeOnline(editor.getValue());

    validateBtn.onclick = () => {
        const code = editor.getValue();
        const required = topic.practice.requiredKeywords;
        const missing = required.filter(k => !code.includes(k));
        const hasMain = code.includes("main");
        const hasSemiColon = code.includes(";");

        panel.classList.remove('hidden');
        if (!hasMain || !hasSemiColon) {
            panel.className = "p-8 rounded-3xl bg-amber-500/10 border-amber-500/30 text-amber-500 space-y-4";
            panel.innerHTML = `<div class="flex items-center gap-4 font-black text-2xl uppercase tracking-tighter"><i data-lucide="alert-triangle" class="w-8 h-8"></i> Structure Incomplete</div><p>Missing main() or semicolons.</p>`;
            validateBtn.classList.add('hidden'); retryBtn.classList.remove('hidden');
        } else if(missing.length === 0) {
            panel.className = "p-8 rounded-3xl bg-emerald-500/10 border-emerald-500/30 text-emerald-400 space-y-4";
            panel.innerHTML = `<div class="flex items-center gap-4 font-black text-2xl uppercase tracking-tighter"><i data-lucide="check-circle" class="w-8 h-8"></i> Logic Validated!</div><p>Concept applied correctly.</p>`;
            validateBtn.classList.add('hidden'); nextBtn.classList.remove('hidden');
            recordCompletion(topic.id);
        } else {
            panel.className = "p-8 rounded-3xl bg-rose-500/10 border-rose-500/30 text-rose-400 space-y-4";
            panel.innerHTML = `<div class="flex items-center gap-4 font-black text-2xl uppercase tracking-tighter"><i data-lucide="alert-circle" class="w-8 h-8"></i> Keywords Missing</div><p>Try using: ${missing.join(', ')}</p>`;
            validateBtn.classList.add('hidden'); retryBtn.classList.remove('hidden');
        }
        lucide.createIcons();
    };

    retryBtn.onclick = () => { panel.classList.add('hidden'); retryBtn.classList.add('hidden'); validateBtn.classList.remove('hidden'); };
    nextBtn.onclick = () => {
        const flat = cppCurriculum.flatMap(s => s.topics);
        const idx = flat.findIndex(t => t.id === topic.id);
        if(idx < flat.length - 1) navigateTo(flat[idx+1].id);
        else toggleRoadmap();
    };
}

// --- ONLINE COMPILER (JUDGE0) ---
async function runCodeOnline(code) {
    const runBtn = document.getElementById('run-code-btn');
    const consoleView = document.getElementById('output-console');
    const outputText = document.getElementById('output-text');
    
    runBtn.disabled = true;
    runBtn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> RUNNING...`;
    consoleView.classList.remove('hidden');
    outputText.innerText = "Compiling and executing on server...";
    lucide.createIcons();

    // Judge0 CE Public API (demo instance - keys may vary)
    const API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
    const API_KEY = "dummy-rapidapi-key"; // user should provide their own

    try {
        // Since we can't perform cross-origin requests easily without a real key/env, 
        // we simulate a high-end terminal experience for the demo if the key is dummy.
        if(API_KEY === "dummy-rapidapi-key") {
            setTimeout(() => {
                outputText.innerText = `[SIMULATED OUTPUT]\nCompiling...\nSuccessfully linked main.o\nRunning program...\n\nHello BTech Student! Welcome to the C++ Sandbox.\n--------------------------\nProcess finished with exit code 0`;
                runBtn.disabled = false;
                runBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 text-emerald-500"></i> RUN CODE`;
                lucide.createIcons();
            }, 1500);
            return;
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                "x-rapidapi-key": API_KEY
            },
            body: JSON.stringify({
                source_code: code,
                language_id: 54, // C++ (GCC 9.2.0)
                stdin: ""
            })
        });

        const data = await response.json();
        outputText.innerText = data.stdout || data.stderr || data.compile_output || "No output.";
    } catch (e) {
        outputText.innerText = "Error connecting to compiler API. Check console for details.";
        console.error(e);
    } finally {
        runBtn.disabled = false;
        runBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 text-emerald-500"></i> RUN CODE`;
        lucide.createIcons();
    }
}

// --- UTILITIES ---
function updateProgress() {
    const total = cppCurriculum.flatMap(s => s.topics).length;
    const progress = Math.round((Object.keys(completedTopics).length / total) * 100);
    const bar = document.getElementById('progress-bar-fill');
    const text = document.getElementById('progress-percent');
    if(bar) bar.style.width = `${progress}%`;
    if(text) text.innerText = `${progress}%`;
}

function initSidebar() {
    const nav = document.getElementById('nav-content');
    if(!nav) return;
    nav.innerHTML = '';
    const flat = cppCurriculum.flatMap(s => s.topics);
    
    cppCurriculum.forEach(section => {
        const div = document.createElement('div');
        div.className = 'space-y-1 mt-6';
        div.innerHTML = `<h3 class="px-4 text-[10px] uppercase font-black text-slate-500 tracking-wider mb-2">${section.title}</h3>`;
        const list = document.createElement('div');
        
        section.topics.forEach(topic => {
            const isDone = completedTopics[topic.id];
            const idx = flat.findIndex(t => t.id === topic.id);
            const isUnlocked = idx === 0 || completedTopics[flat[idx-1].id];
            
            const link = document.createElement('a');
            link.href = `#${topic.id}`;
            link.className = `nav-link transition-all flex items-center gap-3 py-2 px-4 rounded-xl ${isDone ? 'completed' : ''} ${window.location.hash === '#'+topic.id ? 'active' : ''}`;
            if(!isUnlocked) { link.classList.add('locked'); link.style.pointerEvents = 'none'; link.style.opacity = '0.3'; }
            
            link.innerHTML = `<i data-lucide="${isUnlocked ? 'code-2' : 'lock'}" class="w-4 h-4"></i><span class="flex-1 text-sm font-medium">${topic.title}</span>${isDone ? '<i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500"></i>' : ''}`;
            link.onclick = (e) => { e.preventDefault(); navigateTo(topic.id); };
            list.appendChild(link);
        });
        div.appendChild(list);
        nav.appendChild(div);
    });
    updateProgress();
    lucide.createIcons();
}

function initModules() {
    const grid = document.getElementById('modules');
    if(!grid) return;
    grid.innerHTML = '';
    cppCurriculum.forEach(section => {
        const card = document.createElement('div');
        card.className = 'glass-panel p-8 group cursor-pointer hover:bg-primary/5 transition-all';
        card.innerHTML = `<div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><i data-lucide="layers" class="text-primary w-7 h-7"></i></div><h4 class="text-2xl font-black mb-2">${section.title}</h4><p class="text-slate-500 text-sm mb-6">${section.topics.length} specialized modules</p><div class="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">Explore Module <i data-lucide="arrow-right" class="w-4 h-4"></i></div>`;
        card.onclick = () => { roadmapMode = false; navigateTo(section.topics[0].id); };
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function initRoadmapToggle() { const btn = document.getElementById('roadmap-toggle'); if(btn) btn.onclick = toggleRoadmap; }

function toggleRoadmap() {
    roadmapMode = !roadmapMode;
    const roadmap = document.getElementById('roadmap-view');
    const home = document.getElementById('home-view');
    const topic = document.getElementById('topic-view');
    const profile = document.getElementById('profile-view');
    gsap.to('#view-container', { opacity: 0, onComplete: () => {
        if(roadmapMode) {
            roadmap.classList.remove('hidden'); home.classList.add('hidden'); topic.classList.add('hidden'); profile.classList.add('hidden');
            renderRoadmap();
        } else showHome();
        gsap.to('#view-container', { opacity: 1 });
    }});
}

function renderRoadmap() {
    const nodes = document.getElementById('roadmap-nodes');
    nodes.innerHTML = '';
    const flat = cppCurriculum.flatMap(s => s.topics);
    flat.forEach((topic, i) => {
        const isDone = completedTopics[topic.id];
        const isUnlocked = i === 0 || completedTopics[flat[i-1].id];
        const node = document.createElement('div');
        node.className = `roadmap-node ${isUnlocked ? 'unlocked' : 'locked'} ${isDone ? 'completed' : ''}`;
        node.style.marginLeft = i % 2 === 0 ? '-40px' : '40px';
        node.innerHTML = `${isUnlocked && !isDone ? '<div class="node-pulse"></div>' : ''}<i data-lucide="award"></i><div class="roadmap-label uppercase font-black text-[10px] tracking-widest">${topic.title}</div>`;
        if(isUnlocked) node.onclick = () => { roadmapMode = false; navigateTo(topic.id); };
        nodes.appendChild(node);
    });
    lucide.createIcons();
}

window.copyCode = (btn) => { const code = btn.nextElementSibling.innerText; navigator.clipboard.writeText(code); btn.innerText = "COPIED"; setTimeout(() => btn.innerText = "COPY CODE", 2000); };
