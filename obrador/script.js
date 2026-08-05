document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Fade-In Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 2. Generative Background Canvas (Monatomic Clock homage)
    const canvas = document.getElementById('generative-bg');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let time = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // Subtle generative particles connecting like spatial geometry
    const particles = [];
    const numParticles = 40;

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }

    function drawGenerativeBackground() {
        ctx.clearRect(0, 0, width, height);
        
        ctx.fillStyle = 'rgba(207, 92, 54, 0.2)'; // Rust color with low opacity
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;

        particles.forEach((p, index) => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            // Draw connections (Spatial Geometry)
            for (let j = index + 1; j < numParticles; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        time += 0.01;
        requestAnimationFrame(drawGenerativeBackground);
    }

    // 3. Image Carousels
    const carousels = document.querySelectorAll('.image-carousel');
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-img');
        if (images.length <= 1) return;
        
        let currentIndex = 0;
        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 3000);
    });

    drawGenerativeBackground();
});
