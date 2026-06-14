document.addEventListener('DOMContentLoaded', () => {
    
    // --- PAGE 1: Cake & Fireworks ---
    const blowBtn = document.getElementById('blow-btn');
    const candleFlame = document.getElementById('candle-flame');
    const bdayText = document.getElementById('bday-text');
    const nextBtn1 = document.getElementById('next-btn-1');

    if (blowBtn) {
        blowBtn.addEventListener('click', () => {
            // 1. Turn off candle
            candleFlame.classList.add('off');
            blowBtn.style.display = 'none';

            // 2. Trigger Fireworks (using canvas-confetti)
            setTimeout(() => {
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                function randomInRange(min, max) {
                    return Math.random() * (max - min) + min;
                }

                const interval = setInterval(function() {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 50 * (timeLeft / duration);
                    // since particles fall down, start a bit higher than random
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);

                // 3. Show Text and Next Button
                setTimeout(() => {
                    bdayText.style.display = 'block';
                    nextBtn1.style.display = 'inline-block';
                    
                    // Force a reflow so the transition works
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            bdayText.classList.add('show');
                            nextBtn1.classList.add('show');
                        });
                    });
                }, 1000);

            }, 500); // Wait 0.5s after blowing candle before fireworks
        });
    }

    // --- PAGE 3: Gallery Scroll Animation ---
    const scrollAnims = document.querySelectorAll('.scroll-anim');

    if (scrollAnims.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of element is visible
        });

        scrollAnims.forEach(anim => {
            observer.observe(anim);
        });
    }

    // --- INTERACTIVE: CAKE BOUNCE ---
    const cakeContainer = document.querySelector('.cake-container');
    if (cakeContainer) {
        cakeContainer.addEventListener('click', () => {
            cakeContainer.style.transform = 'scale(0.95) rotate(-2deg)';
            setTimeout(() => {
                cakeContainer.style.transform = 'scale(1) rotate(0deg)';
                cakeContainer.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }, 150);
        });
    }

    // --- INTERACTIVE: CURSOR TRAIL ---
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.18) return;

        const trail = document.createElement('div');
        trail.className = 'cursor-trail cursor-heart';
        trail.textContent = '♥';
        trail.style.left = (e.pageX - 10) + 'px';
        trail.style.top = (e.pageY - 10) + 'px';
        trail.style.fontSize = (0.8 + Math.random() * 0.8).toFixed(1) + 'rem';
        trail.style.opacity = (0.35 + Math.random() * 0.4).toFixed(2);
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 1000);
    });

    // --- INTERACTIVE: ENVELOPE (PAGE 2) ---
    const envelope = document.getElementById('envelope');
    const realLetter = document.getElementById('real-letter');

    if (envelope && realLetter) {
        envelope.addEventListener('click', () => {
            if (!envelope.classList.contains('open')) {
                envelope.classList.add('open');
                
                // Wait for envelope animation, then show letter
                setTimeout(() => {
                    envelope.style.display = 'none';
                    realLetter.classList.remove('hidden');
                    realLetter.classList.add('visible');
                }, 1200);
            }
        });
    }

    // --- INTERACTIVE: LIGHTBOX (PAGE 3) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryImages = document.querySelectorAll('.photo-single img, .grid-item img');

    if (lightbox && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer'; // Make it clear it's clickable
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }
});
