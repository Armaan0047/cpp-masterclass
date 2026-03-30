// Professional C++ Learning Platform - Production Edition
// Integrated with REAL Judge0 API, Firebase Persistence, and Smart UX

// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
    apiKey: "AIzaSyAs-MOCK-API-KEY-FOR-DEMO", 
    authDomain: "cpp-masterclass-demo.firebaseapp.com",
    projectId: "cpp-masterclass-demo",
    storageBucket: "cpp-masterclass-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef12345"
};

// Initialize Firebase securely
let auth, db;
if (typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } catch(e) { console.warn("Firebase Init Error (Using Mock Mode):", e.message); }
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
    
    gsap.to('#view-container', { opacity: 1, y: 0, duration: 0.8 });
    window.onhashchange = handleRouting;
});

// --- AUTHENTICATION SYSTEM ---
function handleAuth() {
    const loginBtn = document.getElementById('login-btn');
    const userProfile = document.getElementById('user-profile');
    const userInitials = document.getElementById('user-initials');
    const welcomeMsg = document.getElementById('welcome-message');

    if (!auth) {
        loginBtn.onclick = () => alert("Auth is currently disabled. (Check API Key config in app.js)");
        return;
    }

    auth.onAuthStateChanged(async (user) => {
        if (user) {
            currentUser = user;
            loginBtn.classList.add('hidden');
            userProfile.classList.remove('hidden');
            userInitials.innerText = user.displayName ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
            welcomeMsg.innerText = `Welcome, ${user.displayName.split(' ')[0]}!`;
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
        auth.signInWithPopup(provider).catch(err => {
            console.error(err);
            alert("Firebase Login Error: Use a valid API Key in authConfig. Current: " + err.code);
        });
    };

    document.getElementById('logout-btn').onclick = () => {
        auth.signOut().then(() => location.reload());
    };
}

async function syncProgressFromCloud() {
    if (!currentUser || !db) return;
    try {
        const doc = await db.collection('users').doc(currentUser.uid).get();
        if (doc.exists) {
            const cloudProgress = doc.data().progress || {};
            completedTopics = { ...completedTopics, ...cloudProgress };
            localStorage.setItem('cpp-completion-v3', JSON.stringify(completedTopics));
            updateProgress();
            updateScoreUI();
            initSidebar();
        }
    } catch (e) {}
}

async function syncProgressToCloud() {
    if (!currentUser || !db) return;
    try {
        await db.collection('users').doc(currentUser.uid).set({
            progress: completedTopics,
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (e) {}
}

// --- DAILY STREAK SYSTEM ---
function checkStreak() {
    const today = new Date().toDateString();
    const badge = document.getElementById('streak-badge');
    const streakCount = document.getElementById('streak-count');

    if (streakData.lastVisit !== today) {
        const lastDate = streakData.lastVisit ? new Date(streakData.lastVisit) : null;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate && lastDate.toDateString() === yesterday.toDateString()) {
            streakData.count += 1;
        } else if (!lastDate || lastDate.toDateString() !== today) {
            streakData.count = 1;
        }
        streakData.lastVisit = today;
        localStorage.setItem('cpp-streak-v1', JSON.stringify(streakData));
    }

    if (streakData.count > 0) {
        badge.classList.remove('hidden');
        badge.classList.add('streak-glow');
        streakCount.innerText = `${streakData.count} Day Streak 🔥`;
    }
}

// --- SKELETON LOADER ---
function renderSkeleton(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="space-y-12 pb-20">
            <div class="h-16 w-3/4 skeleton"></div>
            <div class="grid lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 h-48 skeleton"></div>
                <div class="h-48 skeleton"></div>
            </div>
            <div class="h-[400px] w-full skeleton rounded-[40px]"></div>
        </div>
    `;
}

// --- ONLINE COMPILER ---
async function runCodeOnline(code) {
    const runBtn = document.getElementById('run-code-btn');
    const consoleView = document.getElementById('output-console');
    const outputText = document.getElementById('output-text');
    
    runBtn.disabled = true;
    runBtn.innerHTML = `<div class="spinner"></div> <span>RUNNING...</span>`;
    consoleView.classList.remove('hidden');
    outputText.innerText = "Connecting to Judge0 server...";
    outputText.classList.remove('text-rose-400', 'text-emerald-400', 'result-success', 'result-error');
    lucide.createIcons();

    const API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
    const API_KEY = "dummy-key"; // Student enters their own key

    try {
        if(API_KEY === "dummy-key") {
            await new Promise(r => setTimeout(r, 1200));
            outputText.innerText = "[PROD SIMULATION]\nCompiling...\nRunning main.cpp\n\nOutput:\nCongratulations! Code executed successfully.\n\n(Key required for real stdout: rapidapi.com/judge0)";
            outputText.classList.add('text-emerald-400');
        } else {
            const resp = await fetch(API_URL, {
                method: "POST",
                headers: { "content-type": "application/json", "x-rapidapi-key": API_KEY, "x-rapidapi-host": "judge0-ce.p.rapidapi.com" },
                body: JSON.stringify({ source_code: code, language_id: 54 })
            });
            const data = await resp.json();
            if(data.stdout) {
                outputText.innerText = data.stdout;
                outputText.classList.add('text-emerald-400', 'result-success');
            } else {
                outputText.innerText = data.stderr || data.compile_output || "No output returned.";
                outputText.classList.add('text-rose-400', 'result-error');
            }
        }
    } catch(e) {
        outputText.innerText = "Offline Mode: Enable API in app.js for real compilation.";
    } finally {
        runBtn.disabled = false;
        runBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 text-emerald-500"></i> RUN CODE`;
        lucide.createIcons();
    }
}

// --- CORE RENDERER ---
function renderTopic(topicId) {
    let topic = null;
    cppCurriculum.forEach(s => { const found = s.topics.find(t => t.id === topicId); if (found) topic = found; });
    if (!topic) return;

    gsap.to('#view-container', { opacity: 0, scale: 0.98, duration: 0.3, onComplete: () => {
        document.getElementById('home-view').classList.add('hidden');
        document.getElementById('roadmap-view').classList.add('hidden');
        document.getElementById('profile-view').classList.add('hidden');
        const view = document.getElementById('topic-view');
        view.classList.remove('hidden');
        
        renderSkeleton('topic-view');
        gsap.to('#view-container', { opacity: 1, scale: 1, duration: 0.3 });

        setTimeout(() => {
            view.innerHTML = `
                <div class="space-y-12 animate-fade-in pb-20">
                    <div class="space-y-6">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-black">?</div>
                            <h2 class="text-5xl font-black italic tracking-tighter text-white">${topic.title}</h2>
                        </div>
                        <div class="grid lg:grid-cols-3 gap-8">
                            <div class="lg:col-span-2 bg-primary/5 p-8 rounded-3xl border border-primary/20">
                                <p class="text-xl text-slate-100 italic">"${topic.theory}"</p>
                            </div>
                            <div class="bg-secondary/5 p-8 rounded-3xl border border-secondary/20 flex flex-col justify-center">
                                <h4 class="text-xs font-black uppercase text-secondary mb-2">Real-Life Analogy</h4>
                                <p class="text-slate-300 text-sm font-medium italic">"${topic.realLifeExample}"</p>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-8">
                        <h3 class="text-2xl font-black text-gradient uppercase">Reference Examples</h3>
                        <div class="grid gap-12">
                            ${topic.examples.map((ex, i) => `
                                <div class="glass-panel p-10 relative">
                                    <h4 class="text-xl font-bold mb-4">#${i+1} : ${ex.title}</h4>
                                    <pre class="language-cpp"><code>${ex.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="pt-16 border-t border-border/50">
                        <div class="bg-slate-900/40 p-12 rounded-[40px] border border-border/50 shadow-2xl space-y-8 relative overflow-hidden">
                            <h3 class="text-3xl font-black italic">Interactive Arena 🔥</h3>
                            <div class="p-6 bg-slate-800/50 border border-border rounded-2xl"><p class="text-xl text-slate-200">Task: ${topic.practice.task}</p></div>
                            <div class="rounded-3xl border border-border overflow-hidden"><div id="practice-code-editor" style="height: 350px;"></div></div>
                            <div id="output-console" class="hidden"><pre id="output-text" class="bg-black/90 p-6 rounded-2xl border border-border font-mono text-sm leading-relaxed"></pre></div>
                            <div id="feedback-panel" class="hidden p-8 rounded-3xl border"></div>
                            <div class="flex flex-wrap gap-5 pt-4">
                                <button id="run-code-btn" class="px-8 py-4 bg-slate-800 border border-border rounded-2xl font-black hover:bg-slate-700 transition-all flex items-center gap-2"><i data-lucide="play" class="w-4 h-4 text-emerald-500"></i> RUN CODE</button>
                                <button id="validate-code-btn" class="px-10 py-4 bg-primary text-dark rounded-2xl font-black hover:scale-105 transition-all">VALIDATE PROGRAM</button>
                                <button id="next-module-btn" class="hidden px-10 py-4 bg-emerald-500 text-dark rounded-2xl font-black hover:scale-105 transition-all">NEXT TOPIC →</button>
                                <button id="retry-logic-btn" class="hidden px-8 py-4 bg-slate-800 border-border/40 rounded-2xl font-bold hover:bg-slate-700 transition-all">RETRY LOGIC</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            lucide.createIcons();
            Prism.highlightAll();
            initPlayground(topic);
        }, 400); 
    }});
}

function initPlayground(topic) {
    editor = ace.edit("practice-code-editor");
    editor.setTheme("ace/theme/tomorrow_night_eighties");
    editor.session.setMode("ace/mode/c_cpp");
    editor.setValue(topic.practice.initialCode);
    editor.setOptions({ fontFamily: "'JetBrains Mono', monospace", fontSize: "16px", showPrintMargin: false });

    const validateBtn = document.getElementById('validate-code-btn');
    const runBtn = document.getElementById('run-code-btn');
    const panel = document.getElementById('feedback-panel');

    runBtn.onclick = () => runCodeOnline(editor.getValue());

    validateBtn.onclick = () => {
        const code = editor.getValue();
        const required = topic.practice.requiredKeywords;
        const missing = required.filter(k => !code.includes(k));
        const structural = { main: code.includes("main"), braces: code.includes("{") && code.includes("}"), semi: code.includes(";") };

        panel.classList.remove('hidden');
        if (!structural.main || !structural.braces || !structural.semi) {
            panel.className = "p-8 rounded-3xl bg-amber-500/10 border-amber-500/30 text-amber-500";
            panel.innerHTML = `<h4 class="font-black">❌ SYNTAX ERROR</h4><p>Missing ${!structural.main ? '[main]' : ''} ${!structural.braces ? '[braces]' : ''} ${!structural.semi ? '[semicolon]' : ''}.</p>`;
        } else if(missing.length > 0) {
            panel.className = "p-8 rounded-3xl bg-rose-500/10 border-rose-500/30 text-rose-400";
            panel.innerHTML = `<h4 class="font-black">❌ CONCEPT MISSING</h4><p>Your solution doesn't use: <span class="font-bold">${missing[0]}</span>.</p>`;
        } else {
            panel.className = "p-8 rounded-3xl bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
            panel.innerHTML = `<h4 class="font-black">✅ CHALLENGE MASTERED</h4><p>Excellent logic! Move to the next topic.</p>`;
            validateBtn.classList.add('hidden');
            document.getElementById('next-module-btn').classList.remove('hidden');
            recordCompletion(topic.id);
        }
        lucide.createIcons();
    };

    document.getElementById('next-module-btn').onclick = () => {
        const flat = cppCurriculum.flatMap(s => s.topics);
        const idx = flat.findIndex(t => t.id === topic.id);
        if(idx < flat.length - 1) navigateTo(flat[idx+1].id);
        else toggleRoadmap();
    };
}

// --- BOILERPLATE UTILS ---
function navigateTo(topicId) { window.location.hash = topicId; }
function handleRouting() {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(window.location.search);
    if(params.get('progress')) showProfileView(params.get('progress'));
    else if(hash) renderTopic(hash);
    else showHome();
}
function showHome() {
    roadmapMode = false;
    gsap.to('#view-container', { opacity: 0, onComplete: () => {
        document.getElementById('home-view').classList.remove('hidden');
        document.getElementById('topic-view').classList.add('hidden');
        document.getElementById('roadmap-view').classList.add('hidden');
        document.getElementById('profile-view').classList.add('hidden');
        gsap.to('#view-container', { opacity: 1 });
    }});
}
function updateScoreUI() {
    const badge = document.getElementById('score-badge');
    if(badge) {
        badge.innerHTML = `<div class="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold border border-emerald-500/20">${Object.keys(completedTopics).length} Mastered</div>`;
    }
}
function recordCompletion(tid) {
    if(!completedTopics[tid]) {
        completedTopics[tid] = true;
        localStorage.setItem('cpp-completion-v3', JSON.stringify(completedTopics));
        updateProgress(); updateScoreUI(); initSidebar(); syncProgressToCloud();
    }
}
function updateProgress() {
    const total = cppCurriculum.flatMap(s => s.topics).length;
    const prog = Math.round((Object.keys(completedTopics).length / total) * 100);
    document.getElementById('progress-bar-fill').style.width = `${prog}%`;
    document.getElementById('progress-percent').innerText = `${prog}%`;
}
function initSidebar() {
    const nav = document.getElementById('nav-content'); nav.innerHTML = '';
    const flat = cppCurriculum.flatMap(s => s.topics);
    cppCurriculum.forEach(section => {
        const div = document.createElement('div'); div.className = 'space-y-1 mt-6';
        div.innerHTML = `<h3 class="px-4 text-[10px] uppercase font-black text-slate-500 tracking-wider mb-2">${section.title}</h3>`;
        const list = document.createElement('div');
        section.topics.forEach(topic => {
            const isDone = completedTopics[topic.id];
            const idx = flat.findIndex(t => t.id === topic.id);
            const isUnlocked = idx === 0 || completedTopics[flat[idx-1].id];
            const link = document.createElement('a'); link.href = `#${topic.id}`;
            link.className = `nav-link flex items-center gap-3 py-2 px-4 rounded-xl ${isDone ? 'completed' : ''} ${window.location.hash === '#'+topic.id ? 'active' : ''} ${!isUnlocked ? 'opacity-30 pointer-events-none' : ''}`;
            link.innerHTML = `<i data-lucide="${isUnlocked ? 'code-2' : 'lock'}" class="w-4 h-4"></i><span class="flex-1 text-sm font-medium">${topic.title}</span>${isDone ? '<i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500"></i>' : ''}`;
            list.appendChild(link);
        });
        div.appendChild(list); nav.appendChild(div);
    });
    lucide.createIcons();
}
function initModules() {
    const grid = document.getElementById('modules'); grid.innerHTML = '';
    cppCurriculum.forEach(section => {
        const card = document.createElement('div');
        card.className = 'glass-panel p-8 group cursor-pointer hover:bg-primary/5 transition-all';
        card.innerHTML = `<div class="mb-6"><i data-lucide="layers" class="text-primary w-10 h-10"></i></div><h4 class="text-2xl font-black mb-2">${section.title}</h4><div class="flex items-center gap-2 text-primary font-bold text-xs uppercase">Start Module →</div>`;
        card.onclick = () => { navigateTo(section.topics[0].id); };
        grid.appendChild(card);
    });
    lucide.createIcons();
}
function initRoadmapToggle() { document.getElementById('roadmap-toggle').onclick = toggleRoadmap; }
function toggleRoadmap() {
    roadmapMode = !roadmapMode;
    gsap.to('#view-container', { opacity: 0, onComplete: () => {
        const v = roadmapMode;
        document.getElementById('roadmap-view').classList.toggle('hidden', !v);
        document.getElementById('home-view').classList.toggle('hidden', v);
        document.getElementById('topic-view').classList.add('hidden');
        if(v) renderRoadmap();
        gsap.to('#view-container', { opacity: 1 });
    }});
}
function renderRoadmap() {
    const nodes = document.getElementById('roadmap-nodes'); nodes.innerHTML = '';
    const flat = cppCurriculum.flatMap(s => s.topics);
    flat.forEach((topic, i) => {
        const isDone = completedTopics[topic.id];
        const isUnlocked = i === 0 || completedTopics[flat[i-1].id];
        const node = document.createElement('div');
        node.className = `roadmap-node ${isUnlocked ? 'unlocked' : 'locked'} ${isDone ? 'completed' : ''}`;
        node.style.marginLeft = i % 2 === 0 ? '-40px' : '40px';
        node.innerHTML = `${isUnlocked && !isDone ? '<div class="node-pulse"></div>' : ''}<i data-lucide="award"></i><div class="roadmap-label uppercase font-black text-[10px]">${topic.title}</div>`;
        if(isUnlocked) node.onclick = () => navigateTo(topic.id);
        nodes.appendChild(node);
    });
    lucide.createIcons();
}
window.copyCode = (btn) => { navigator.clipboard.writeText(btn.nextElementSibling.innerText); btn.innerText = "COPIED"; setTimeout(() => btn.innerText = "COPY CODE", 2000); };
