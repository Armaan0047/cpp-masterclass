// animations.js
// Futuristic GSAP & Micro-interactions layer for C++ BTech Master Platform
// Keeps app.js logic completely untouched.

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Background Orb Animations (Continuous Ambient Glow)
    if(typeof gsap !== 'undefined') {
        gsap.to('#glow-orb-1', {
            x: '30%', y: '20%',
            duration: 15, ease: 'sine.inOut', yoyo: true, repeat: -1
        });
        gsap.to('#glow-orb-2', {
            x: '-30%', y: '-20%',
            duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1
        });
        gsap.to('#glow-orb-3', {
            scale: 1.5, opacity: 0.8,
            duration: 12, ease: 'sine.inOut', yoyo: true, repeat: -1
        });
        
        // Initial intro stagger for Sidebar
        gsap.fromTo('#sidebar',
            { x: '-100%', opacity: 0 },
            { x: '0%', opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
        );
    }

    // 2. Button & Card Ripple Effect (Micro-interaction)
    // Runs independently of React/Vanilla JS logic
    document.addEventListener('click', function(e) {
        const target = e.target.closest('button') || e.target.closest('.glass-panel') || e.target.closest('.roadmap-node');
        if (target) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Fix overflow for buttons to contain ripple, but don't break glass-panels or roadmap-nodes structure unconditionally
            const computedPos = getComputedStyle(target).position;
            if(computedPos === 'static') target.style.position = 'relative';
            
            if(target.tagName.toLowerCase() === 'button' && getComputedStyle(target).overflow !== 'hidden') {
                 target.style.overflow = 'hidden';
            }
            
            target.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });

    // 3. Mutation Observer to catch Dynamically Injected Elements from app.js
    // This watches the DOM and applies GSAP when app.js renders things
    const observer = new MutationObserver((mutations) => {
        if(typeof gsap === 'undefined') return;

        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                
                // --- Editor Enhancements ---
                const editorContainer = document.getElementById('practice-code-editor');
                if (editorContainer && !editorContainer.dataset.animBound) {
                    editorContainer.dataset.animBound = "true";
                    
                    // Entrance animation for editor
                    gsap.fromTo(editorContainer.parentElement, 
                        { scale: 0.95, opacity: 0, y: 20 },
                        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
                    );

                    // Add Glowing Focus State
                    editorContainer.addEventListener('click', () => {
                        editorContainer.classList.add('editor-focused');
                    });
                    document.addEventListener('click', (e) => {
                        if (!editorContainer.contains(e.target)) {
                            editorContainer.classList.remove('editor-focused');
                        }
                    });
                }

                // --- Stagger Glass Panels Details in Topic View ---
                // Only run once per render
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element Node
                        
                        // Topic panels
                        const content = node.innerHTML || '';
                        if (content.includes('language-cpp') || node.classList.contains('glass-panel')) {
                            const panels = document.querySelectorAll('#topic-view .glass-panel, #topic-view .bg-primary\\/5, #topic-view .bg-secondary\\/5');
                            if (panels.length > 0 && !panels[0].dataset.animRun) {
                                panels[0].dataset.animRun = "true";
                                gsap.fromTo(panels, 
                                    { y: 30, opacity: 0, scale: 0.98 }, 
                                    { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)' }
                                );
                            }
                        }

                        // --- Code Runner Button Transition ---
                        if (node.id === 'run-code-btn') {
                           gsap.fromTo(node, {scale: 0.9}, {scale: 1, duration: 0.3, ease: 'back.out(2)'});
                        }
                        
                        // --- Feedback Panel (Success / Error) Entrance ---
                        if (node.id && node.id === 'feedback-panel' && !node.classList.contains('hidden')) {
                            gsap.fromTo(node,
                                { scale: 0.8, opacity: 0, y: 20 },
                                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.7)' }
                            );
                        }

                        // --- Roadmap Nodes Enhancement ---
                        if (node.classList && node.classList.contains('roadmap-node')) {
                            // Delay based on index is hard to infer directly here, so we stagger them if they appear together
                            gsap.fromTo(node,
                                { scale: 0, opacity: 0, rotation: -15 },
                                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.5)', delay: Math.random() * 0.4 }
                            );
                        }

                        // Catch output text changes
                        if(node.id === 'output-text' || (node.querySelector && node.querySelector('#output-text'))) {
                           const ot = document.getElementById('output-text');
                           if(ot && ot.innerHTML.trim() !== '') {
                               gsap.fromTo(ot, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3 });
                           }
                        }
                    }
                });
            }
            
            // Watch for class changes on output elements or feedback panels
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const trg = mutation.target;
                if (trg.id === 'feedback-panel' && !trg.classList.contains('hidden')) {
                    // It was shown
                    gsap.fromTo(trg,
                        { scale: 0.8, opacity: 0, y: 20 },
                        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.7)' }
                    );
                }
            }
        });
    });

    // Start observing containers where dynamic content is added
    const container = document.getElementById('view-container');
    const roadmapContainer = document.getElementById('roadmap-container');
    
    if (container) {
        observer.observe(container, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }
    if(roadmapContainer) {
        observer.observe(roadmapContainer, {childList: true, subtree: true});
    }

    // Wrap initial modules if any are on screen
    setTimeout(() => {
        const initialPanels = document.querySelectorAll('#modules .glass-panel');
        if (initialPanels.length && typeof gsap !== 'undefined') {
            gsap.fromTo(initialPanels, 
                { y: 50, opacity: 0, rotationX: 10 }, 
                { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
        }
    }, 500); // Give it time for DOM rendering
});
