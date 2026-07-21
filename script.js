/**
 * 💡 Birthday Website Runtime Engine
 * Architecture: Modular Event Driver, Lock System & Particle Pipeline
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Configurable Application Constants
    const WISH_MESSAGE = `To someone incredibly special,

May your day be filled with endless laughter, magical surprises, and all the sweet moments you deserve! You radiate so much happiness into the world, and today, we get to return all that love back to you.

Happy Birthday! 💖✨`;

    const SECRET_PASSWORD = "2403";

    // DOM Engine Registry
    const DOM = {
        screens: {
            lock: document.getElementById('screen-lock'),
            prompt: document.getElementById('screen-prompt'),
            birthday: document.getElementById('screen-birthday'),
            wish: document.getElementById('screen-wish')
        },
        buttons: {
            unlock: document.getElementById('btn-unlock'),
            yes: document.getElementById('btn-yes'),
            no: document.getElementById('btn-no'),
            readWish: document.getElementById('btn-read-wish'),
            restart: document.getElementById('btn-celebrate-again')
        },
        passwordInput: document.getElementById('password-input'),
        passwordError: document.getElementById('password-error'),
        typewriterTarget: document.getElementById('typewriter-target'),
        animationOverlay: document.getElementById('animationOverlay'),
        bgMusic: document.getElementById('bg-music')
    };

    // State Vector
    let activeTimers = [];

    /* ==========================================================================
       MUSIC CONTROLLER
       ========================================================================== */

    /**
     * Attempts to boot up background music play loops safely.
     * Overcomes rigid browser user-interaction rules.
     */
    function playBackgroundMusic() {
        if (DOM.bgMusic) {
            DOM.bgMusic.volume = 0.5; // Optimized volume range (50%)
            DOM.bgMusic.play().catch(error => {
                console.log("Autoplay caught by browser engine. Retrying on next physical touch.", error);
            });
        }
    }

    /* ==========================================================================
       PARTICLE & AMBIENT ANIMATION PIPELINE
       ========================================================================== */

    /**
     * Spawns a dedicated high-performance DOM particle inside overlay
     * @param {string} character - Emoji content ('💖', '✨', '🎈')
     */
    function spawnAmbientParticle(character) {
        const particle = document.createElement('div');
        particle.className = 'ambient-particle';
        particle.textContent = character;
        
        // Randomize physics traits
        const startX = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 150; 
        const duration = 4 + Math.random() * 4; 
        const scale = 0.6 + Math.random() * 0.8;
        const rot = 180 + Math.random() * 360;

        particle.style.left = `${startX}vw`;
        particle.style.setProperty('--drift', `${drift}px`);
        particle.style.setProperty('--scale', scale);
        particle.style.setProperty('--rot', `${rot}deg`);
        particle.style.animationDuration = `${duration}s`;
        particle.style.fontSize = `${16 + Math.random() * 20}px`;

        DOM.animationOverlay.appendChild(particle);

        // Native cleanup on completion
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    /**
     * Initializes continuous generation system for environmental visuals
     */
    function initAmbientSystem() {
        const pools = ['💖', '✨', '🌸', '✨', '🎈'];
        const interval = setInterval(() => {
            const token = pools[Math.floor(Math.random() * pools.length)];
            spawnAmbientParticle(token);
        }, 450);
        activeTimers.push(interval);
    }

    /**
     * Triggers production-grade burst using canvas-confetti library
     */
    function triggerConfettiBlast() {
        if (typeof confetti === 'function') {
            const end = Date.now() + (2 * 1000);
            const colors = ['#ff66b2', '#ff1493', '#ffffff', '#ffb6c1'];

            (function frame() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.8 },
                    colors: colors
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.8 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }

    /* ==========================================================================
       UX & ENGINE DYNAMICS
       ========================================================================== */

    /**
     * Standardized state machine controller for switching flow vistas cleanly
     * @param {HTMLElement} activeTargetScreen 
     */
    function switchScreen(activeTargetScreen) {
        // Fade & Collapse active elements
        Object.values(DOM.screens).forEach(screen => {
            if (screen.classList.contains('active')) {
                screen.style.opacity = '0';
                screen.style.transform = 'scale(0.95) translateY(-10px)';
                setTimeout(() => {
                    screen.classList.remove('active');
                }, 400); // Links smoothly with CSS transition standard
            }
        });

        // Initialize target state
        setTimeout(() => {
            activeTargetScreen.classList.add('active');
            // Force browser layout repaint pipeline 
            requestAnimationFrame(() => {
                activeTargetScreen.style.opacity = '1';
                activeTargetScreen.style.transform = 'scale(1) translateY(0)';
            });
        }, 400);
    }

    /**
     * Verifies the entered password against the secret.
     */
    function handleLockUnlock() {
        const inputVal = DOM.passwordInput.value.trim();
        
        if (inputVal === SECRET_PASSWORD) {
            DOM.passwordError.textContent = "";
            playBackgroundMusic(); // Play music instantly once unlocked
            switchScreen(DOM.screens.prompt);
        } else {
            // Apply shake animation to container
            DOM.passwordInput.classList.add('shake');
            DOM.passwordError.textContent = "Incorrect code, please try again! 💕";
            
            setTimeout(() => {
                DOM.passwordInput.classList.remove('shake');
            }, 400);
        }
    }

    /**
     * Mathematical evasion engine for processing NO option interactions safely
     */
    function relocateNoButton() {
        const btn = DOM.buttons.no;
        
        // Compute viewport parameters relative to active view limits
        const card = btn.closest('.glass-card');
        const cardRect = card.getBoundingClientRect();
        
        // Max range configuration (relative constraints)
        const maxDeltaX = cardRect.width / 2 - btn.offsetWidth;
        const maxDeltaY = cardRect.height / 2 - btn.offsetHeight;
        
        // Calculate dynamic coordinate alterations
        const randomX = (Math.random() - 0.5) * maxDeltaX * 1.5;
        const randomY = (Math.random() - 0.5) * maxDeltaY * 1.5;

        btn.style.position = 'relative';
        btn.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    /**
     * Optimized asynchronous Typewriter Simulation
     * @param {string} text - The input code message string
     * @param {HTMLElement} element - Target rendering layer
     */
    function executeTypewriter(text, element) {
        element.textContent = '';
        let index = 0;
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                // Micro-variations simulate human pacing architecture
                const pacing = text.charAt(index - 1) === ',' || text.charAt(index - 1) === '.' ? 350 : 35;
                setTimeout(type, pacing);
            }
        }
        type();
    }

    /* ==========================================================================
       DECLARATIVE EVENT LISTENERS REGISTER
       ========================================================================== */

    // Password unlock handlers
    DOM.buttons.unlock.addEventListener('click', handleLockUnlock);
    DOM.passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLockUnlock();
        }
    });

    // Option Logic Hooks
    DOM.buttons.yes.addEventListener('click', () => {
        switchScreen(DOM.screens.birthday);
        triggerConfettiBlast();
    });

    // Runaway Trigger for standard and mobile environments
    DOM.buttons.no.addEventListener('mouseenter', relocateNoButton);
    DOM.buttons.no.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Deflects native click emulations on mobile devices
        relocateNoButton();
    });

    // Birthday Celebration Screen Transition
    DOM.buttons.readWish.addEventListener('click', () => {
        switchScreen(DOM.screens.wish);
        // Delay typewriter deployment precisely inline with system animations
        setTimeout(() => {
            executeTypewriter(WISH_MESSAGE, DOM.typewriterTarget);
        }, 500);
    });

    // Full Application Reset State System
    DOM.buttons.restart.addEventListener('click', () => {
        DOM.buttons.no.style.transform = 'translate(0px, 0px)';
        DOM.passwordInput.value = "";
        switchScreen(DOM.screens.lock);
        triggerConfettiBlast();
    });

    // Core Runtime Ignition
    initAmbientSystem();
});
