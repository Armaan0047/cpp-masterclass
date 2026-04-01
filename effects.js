// effects.js - Advanced Futuristic Interactions
// Implements custom GSAP custom cursor, magnetic button physics, canvas background, and synthesized audio.

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================================= 
       1. SYNTHESIZED WEB AUDIO FEEDBACK (Zero Assets, Ultra Fast)
       ========================================================================= */
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;
    let ambientOsc1 = null;
    let ambientOsc2 = null;
    let ambientGain = null;
    let isMuted = false;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new AudioContext();
            startAmbientDrone();
        } else if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Auto-init audio context on first human click interaction to bypass browser policies
    document.addEventListener('mousedown', initAudio, { once: true });

    const audioToggleBtn = document.getElementById('audio-toggle');
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            initAudio(); // ensure initialized
            isMuted = !isMuted;
            const icon = document.getElementById('audio-icon');
            if (isMuted) {
                if(ambientGain) ambientGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
                icon.setAttribute('data-lucide', 'volume-x');
                audioToggleBtn.classList.add('text-rose-500');
                audioToggleBtn.classList.remove('text-slate-400');
            } else {
                if(ambientGain) ambientGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 2.0);
                icon.setAttribute('data-lucide', 'volume-2');
                audioToggleBtn.classList.remove('text-rose-500');
                audioToggleBtn.classList.add('text-emerald-400');
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }

    function startAmbientDrone() {
        if(ambientOsc1) return; // already started
        ambientGain = audioCtx.createGain();
        ambientGain.gain.value = isMuted ? 0 : 0.015; // low volume drone
        ambientGain.connect(audioCtx.destination);

        ambientOsc1 = audioCtx.createOscillator();
        ambientOsc1.type = 'sine';
        ambientOsc1.frequency.value = 55; // Low A
        ambientOsc1.connect(ambientGain);
        ambientOsc1.start();

        ambientOsc2 = audioCtx.createOscillator();
        ambientOsc2.type = 'triangle';
        ambientOsc2.frequency.value = 110; // Octave above
        ambientOsc2.connect(ambientGain);
        ambientOsc2.start();
        
        // Gentle modulation effect
        setInterval(() => {
            if(!audioCtx) return;
            const mod = Math.sin(Date.now() / 2000) * 2;
            ambientOsc1.frequency.setTargetAtTime(55 + mod, audioCtx.currentTime, 0.5);
            ambientOsc2.frequency.setTargetAtTime(110 + mod, audioCtx.currentTime, 0.5);
        }, 100);
    }

    function playSound(type) {
        if (!audioCtx || isMuted) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        if (type === 'hover') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);  // Increased volume
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        } else if (type === 'success') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.05); // Increased volume
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.5);
        } else if (type === 'error') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime); // Increased volume
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.2);
        } else if (type === 'unlock') {
            // Massive reward sound
            osc.type = 'square';
            osc.frequency.setValueAtTime(200, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.5);
            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.5);
        }
    }

    // Export playSound to window so arena.js can use it
    window.effectsPlaySound = playSound;

    /* ========================================================================= 
       2. CUSTOM CURSOR & TRAIL LOGIC (GSAP QuickTo for 60fps)
       ========================================================================= */
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (cursor && follower && typeof gsap !== 'undefined') {
        gsap.set(cursor, {xPercent: -50, yPercent: -50});
        gsap.set(follower, {xPercent: -50, yPercent: -50});
        
        const xToCursor = gsap.quickTo(cursor, "x", {duration: 0.1, ease: "power3"});
        const yToCursor = gsap.quickTo(cursor, "y", {duration: 0.1, ease: "power3"});
        
        const xToFollower = gsap.quickTo(follower, "x", {duration: 0.4, ease: "power3"});
        const yToFollower = gsap.quickTo(follower, "y", {duration: 0.4, ease: "power3"});
        
        window.addEventListener('mousemove', (e) => {
            xToCursor(e.clientX);
            yToCursor(e.clientY);
            xToFollower(e.clientX);
            yToFollower(e.clientY);
        });
        
        // Dynamic Cursor Hover listeners
        const attachCursorHover = () => {
            document.querySelectorAll('a, button, .roadmap-node, .glass-panel, [role="button"], .arena-card').forEach(el => {
                if(el.dataset.cursorBound) return;
                el.dataset.cursorBound = "true";
                
                el.addEventListener('mouseenter', () => {
                    follower.classList.add('cursor-hover');
                    playSound('hover');
                });
                el.addEventListener('mouseleave', () => follower.classList.remove('cursor-hover'));
            });
            
            // Text input contextual states
            document.querySelectorAll('input, #search-input, textarea, .ace_editor').forEach(el => {
                if(el.dataset.cursorTextBound) return;
                el.dataset.cursorTextBound = "true";
                el.addEventListener('mouseenter', () => {
                    cursor.style.display = 'none';
                    follower.classList.add('cursor-text');
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.display = 'block';
                    follower.classList.remove('cursor-text');
                });
            });
        };
        attachCursorHover();
        
        // Observer to re-attach cursor handlers to newly injected elements
        const observer = new MutationObserver((mutations) => {
            attachCursorHover();
            attachMagneticPhysics();
        });
        observer.observe(document.body, {childList: true, subtree: true});
    }

    /* ========================================================================= 
       3. MAGNETIC PHYSICS FOR BUTTONS & CARDS
       ========================================================================= */
    const attachMagneticPhysics = () => {
        if (typeof gsap === 'undefined') return;
        document.querySelectorAll('.glass-panel, button, .roadmap-node, .arena-card').forEach(elem => {
            if(elem.id === 'home-view' || elem.id === 'topic-view' || elem.style.height === '100%') return;

            if(elem.dataset.magneticBound) return;
            elem.dataset.magneticBound = "true";
            elem.classList.add('magnetic');
            
            elem.addEventListener('mousemove', (e) => {
                // If the element has a disabled state (like locked button), reduce effect
                const intensity = elem.classList.contains('cursor-not-allowed') ? 0.05 : 0.2;
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const limitX = Math.max(-15, Math.min(15, x * intensity));
                const limitY = Math.max(-15, Math.min(15, y * intensity));

                gsap.to(elem, {
                    x: limitX,
                    y: limitY,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
            
            elem.addEventListener('mouseleave', () => {
                gsap.to(elem, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.4)"
                });
            });
        });
    };
    attachMagneticPhysics();

    /* ========================================================================= 
       4. AMBIENT PARTICLE CANVAS BACKGROUND
       ========================================================================= */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let time = 0;
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();
        
        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedY = Math.random() * 0.4 + 0.1;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.color = Math.random() > 0.5 ? '0, 240, 255' : '112, 0, 255';
            }
            update() {
                this.y -= this.speedY;
                this.x += this.speedX + Math.sin(time + this.y*0.01) * 0.2; // organic float

                if (mouse.x && mouse.y) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        this.x -= dx * 0.01;
                        this.y -= dy * 0.01;
                        this.opacity = Math.min(1, this.opacity + 0.02);
                    }
                }

                if (this.y < -10) {
                    this.y = canvas.height + 10;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
        
        const animateCanvas = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateCanvas);
        };
        animateCanvas();
    }

    /* ========================================================================= 
       5. AUDIO FEEDBACK HOOKS (Success / Error Validation)
       ========================================================================= */
    const feedbackObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if(mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const node = mutation.target;
                if(node.id === 'feedback-panel' && !node.classList.contains('hidden')) {
                     if(node.querySelector('.text-emerald-400')) playSound('success');
                     else if(node.querySelector('.text-rose-400') || node.querySelector('.text-amber-500')) playSound('error');
                }
            }
        });
    });
    
    setTimeout(()=> {
        const container = document.getElementById('view-container');
        if(container) {
            feedbackObserver.observe(container, { subtree: true, attributes: true, attributeFilter: ['class'] });
        }
    }, 1000);
});
