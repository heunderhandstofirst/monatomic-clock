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

    // 3. Image Carousels (Standard)
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

    // 4. Studio Carousel Custom Sequence
    const studioCarousel = document.querySelector('.studio-carousel');
    if (studioCarousel) {
        const p1 = studioCarousel.querySelector('.profile-1');
        const p4 = studioCarousel.querySelector('.profile-4');
        const p3 = studioCarousel.querySelector('.profile-3');
        const p5 = studioCarousel.querySelector('.profile-5');
        const p2 = studioCarousel.querySelector('.profile-2');
        const p6 = studioCarousel.querySelector('.profile-6');
        const p8 = studioCarousel.querySelector('.profile-8');
        const p7 = studioCarousel.querySelector('.profile-7');

        const allStudioImgs = [p1, p4, p3, p5, p2, p6, p8, p7];
        
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        const BB = 4000; // 4 seconds

        async function runStudioSequence() {
            while (true) {
                allStudioImgs.forEach(img => img.classList.remove('active'));
                
                // Show 1 and 3
                p1.classList.add('active');
                p3.classList.add('active');
                await delay(BB);
                
                // Fade 1 out, replace with 4
                p1.classList.remove('active');
                p4.classList.add('active');
                await delay(BB);
                
                // Fade 3 out, replace with 5
                p3.classList.remove('active');
                p5.classList.add('active');
                await delay(BB);
                
                // Fade out both
                p4.classList.remove('active');
                p5.classList.remove('active');
                
                // cycle in 2
                p2.classList.add('active');
                await delay(BB);
                
                // cycle in 6
                p2.classList.remove('active');
                p6.classList.add('active');
                await delay(BB);
                
                // cycle in 8
                p6.classList.remove('active');
                p8.classList.add('active');
                await delay(BB);
                
                // cycle in 7
                p8.classList.remove('active');
                p7.classList.add('active');
                await delay(BB);
            }
        }
        
        runStudioSequence();
    }

    // 5. Monatomic Clock: 2-Panel Artifact Comparison Carousel (Real vs. Clock - 3s Cycle)
    const compSection = document.getElementById('comparison');
    if (compSection) {
        const artifacts = [
            {
                name: "Ampelmann Crosswalk",
                loc: "Berlin, Germany",
                clockImg: "ClockPhotos/Ampelmann.png",
                physImg: "ClockPhotos/PhysicalImages/Ampelmann.png"
            },
            {
                name: "Best Western",
                loc: "Long Beach, CA",
                clockImg: "ClockPhotos/BestWestern.png",
                physImg: "ClockPhotos/PhysicalImages/BestWestern.jpg"
            },
            {
                name: "Bond Clothes",
                loc: "Times Square, New York, NY",
                clockImg: "ClockPhotos/Bond.png",
                physImg: "ClockPhotos/PhysicalImages/Bond.jpg"
            },
            {
                name: "Britex Fabrics",
                loc: "San Francisco, CA",
                clockImg: "ClockPhotos/Britex.png",
                physImg: "ClockPhotos/PhysicalImages/Britex.png"
            },
            {
                name: "Citgo Sign",
                loc: "Kenmore Square, Boston, MA",
                clockImg: "ClockPhotos/Citgo.png",
                physImg: "ClockPhotos/PhysicalImages/Citgo.jpg"
            },
            {
                name: "Colgate Clock",
                loc: "Jersey City, NJ",
                clockImg: "ClockPhotos/Colgate.png",
                physImg: "ClockPhotos/PhysicalImages/Colgate.png"
            },
            {
                name: "Domino Sugar",
                loc: "Baltimore, MD",
                clockImg: "ClockPhotos/Domino.png",
                physImg: "ClockPhotos/PhysicalImages/Domino.png"
            },
            {
                name: "256 Farben - Gerhard Richter",
                loc: "SFMOMA, San Francisco, CA",
                clockImg: "ClockPhotos/256 Farben - Gerhard Richter.png",
                physImg: "ClockPhotos/PhysicalImages/256 Farben - Gerhard Richter.png"
            },
            {
                name: "Farmacia",
                loc: "Rome, Italy",
                clockImg: "ClockPhotos/Farmacia.png",
                physImg: "ClockPhotos/PhysicalImages/Farmacia.png"
            },
            {
                name: "Grand Central Terminal",
                loc: "New York, NY",
                clockImg: "ClockPhotos/GrandCentral.png",
                physImg: "ClockPhotos/PhysicalImages/GrandCentral.jpg"
            },
            {
                name: "Heinz Ketchup",
                loc: "Pittsburgh, PA",
                clockImg: "ClockPhotos/Heinz.png",
                physImg: "ClockPhotos/PhysicalImages/Heinz.png"
            },
            {
                name: "Helms Bakery",
                loc: "Culver City, CA",
                clockImg: "ClockPhotos/HelmsBakery.png",
                physImg: "ClockPhotos/PhysicalImages/HelmsBakery.jpg"
            },
            {
                name: "Hercules Floor",
                loc: "Malibu, CA",
                clockImg: "ClockPhotos/Hercules.png",
                physImg: "ClockPhotos/PhysicalImages/Hercules.png"
            },
            {
                name: "Hi-Ho Motel",
                loc: "Fairfield, CT",
                clockImg: "ClockPhotos/HiHo.png",
                physImg: "ClockPhotos/PhysicalImages/HiHo.jpg"
            },
            {
                name: "Dim Sum",
                loc: "Hong Kong",
                clockImg: "ClockPhotos/Dim Sum.png",
                physImg: "ClockPhotos/PhysicalImages/Dim Sum.jpg"
            },
            {
                name: "Leonard's Bakery",
                loc: "Honolulu, HI",
                clockImg: "ClockPhotos/Leonards.png",
                physImg: "ClockPhotos/PhysicalImages/Leonards.jpg"
            },
            {
                name: "Lincoln Hardware",
                loc: "Santa Monica, CA",
                clockImg: "ClockPhotos/Lincoln.png",
                physImg: "ClockPhotos/PhysicalImages/Lincoln.jpg"
            },
            {
                name: "OXO Tower & The Gherkin",
                loc: "London, England",
                clockImg: "ClockPhotos/London.png",
                isLondon: true
            },
            {
                name: "NYC MTA Mosaic",
                loc: "New York, NY",
                clockImg: "ClockPhotos/MTA.png",
                physImg: "ClockPhotos/PhysicalImages/MTA.png"
            },
            {
                name: "Malibu Pier",
                loc: "Malibu, CA",
                clockImg: "ClockPhotos/Malibu.png",
                physImg: "ClockPhotos/PhysicalImages/Malibu.png"
            },
            {
                name: "Manhattan Bridge",
                loc: "East River, New York, NY",
                clockImg: "ClockPhotos/ManhattanBridge.png",
                physImg: "ClockPhotos/PhysicalImages/ManhattanBridge.png"
            },
            {
                name: "Martini Sign",
                loc: "Florence, Italy",
                clockImg: "ClockPhotos/Martini.png",
                physImg: "ClockPhotos/PhysicalImages/Martini.jpg"
            },
            {
                name: "McSorley's Old Ale House",
                loc: "Greenwich Village, New York, NY",
                clockImg: "ClockPhotos/McSorleys.png",
                physImg: "ClockPhotos/PhysicalImages/McSorleys.png"
            },
            {
                name: "The Moulin Rouge",
                loc: "Paris, France",
                clockImg: "ClockPhotos/Moulin.png",
                physImg: "ClockPhotos/PhysicalImages/Moulin.jpg"
            },
            {
                name: "Padre Hotel",
                loc: "Bakersfield, CA",
                clockImg: "ClockPhotos/Padre.png",
                physImg: "ClockPhotos/PhysicalImages/Padre.jpg"
            },
            {
                name: "White Stag",
                loc: "Portland, OR",
                clockImg: "ClockPhotos/Portland.png",
                physImg: "ClockPhotos/PhysicalImages/Portland.png"
            },
            {
                name: "Pyramids & Columns",
                loc: "Luxor, Egypt",
                clockImg: "ClockPhotos/Pyramids.png",
                physImg: "ClockPhotos/PhysicalImages/Pyramids.jpg"
            },
            {
                name: "Rabbit Ears Motel",
                loc: "Steamboat Springs, CO",
                clockImg: "ClockPhotos/RabbitEars.png",
                physImg: "ClockPhotos/PhysicalImages/RabbitEars.png"
            },
            {
                name: "Sam The Record Man",
                loc: "Toronto, Canada",
                clockImg: "ClockPhotos/Sam.png",
                physImg: "ClockPhotos/PhysicalImages/Sam.png"
            },
            {
                name: "Schweppes",
                loc: "Madrid, Spain",
                clockImg: "ClockPhotos/Schweppes.png",
                physImg: "ClockPhotos/PhysicalImages/Schweppes.jpg"
            },
            {
                name: "Skipping Girl Vinegar",
                loc: "Melbourne, Australia",
                clockImg: "ClockPhotos/Skipper.png",
                physImg: "ClockPhotos/PhysicalImages/Skipper.png"
            },
            {
                name: "Stomatol Toothpaste",
                loc: "Stockholm, Sweden",
                clockImg: "ClockPhotos/Stomatol.png",
                physImg: "ClockPhotos/PhysicalImages/Stomatol.png"
            },
            {
                name: "SMPTE Test Pattern",
                loc: "Kennedy Space Center, FL",
                clockImg: "ClockPhotos/TestPattern.png",
                physImg: "ClockPhotos/PhysicalImages/TestPattern.jpg"
            },
            {
                name: "Richshuset Thermometer",
                loc: "Copenhagen, Denmark",
                clockImg: "ClockPhotos/Thermometer.png",
                physImg: "ClockPhotos/PhysicalImages/Thermometer.png"
            },
            {
                name: "Tucson Cactus",
                loc: "Tucson, AZ",
                clockImg: "ClockPhotos/Tucson.png",
                physImg: "ClockPhotos/PhysicalImages/Tucson.png"
            },
            {
                name: "Union Oyster House",
                loc: "Boston, MA",
                clockImg: "ClockPhotos/UnionOyster.png",
                physImg: "ClockPhotos/PhysicalImages/UnionOyster.png"
            },
            {
                name: "Urth Caffe",
                loc: "Los Angeles, CA",
                clockImg: "ClockPhotos/Urth.png",
                physImg: "ClockPhotos/PhysicalImages/Urth.png"
            },
            {
                name: "Wallauer's Paints",
                loc: "White Plains, NY",
                clockImg: "ClockPhotos/Wallauer.png",
                physImg: "ClockPhotos/PhysicalImages/Wallauer.jpg"
            }
        ];

        // Preload all images for seamless transitions
        artifacts.forEach(item => {
            const img1 = new Image();
            img1.src = item.clockImg;
            if (item.physImg) {
                const img2 = new Image();
                img2.src = item.physImg;
            }
        });
        new Image().src = "ClockPhotos/PhysicalImages/OXO.jpg";
        new Image().src = "ClockPhotos/PhysicalImages/Gherkin.jpg";

        const counterEl = document.getElementById('comp-counter');
        const titleEl = document.getElementById('comp-title');
        const locEl = document.getElementById('comp-loc');
        const clockImgEl = document.getElementById('comp-clock-img');
        const physImgEl = document.getElementById('comp-phys-img');
        const londonContainer = document.getElementById('london-phys-container');
        const prevBtn = document.getElementById('comp-prev');
        const nextBtn = document.getElementById('comp-next');
        const playPauseBtn = document.getElementById('comp-play-pause');

        let currentIdx = 0;
        let isPlaying = true;
        let timer = null;
        const CYCLE_TIME = 5000; // 5 seconds

        function renderArtifact(index) {
            const item = artifacts[index];

            // Gentle fade out
            if (clockImgEl) clockImgEl.style.opacity = '0';
            if (physImgEl) physImgEl.style.opacity = '0';
            if (londonContainer) londonContainer.style.opacity = '0';

            setTimeout(() => {
                // Text info update
                if (counterEl) {
                    counterEl.textContent = `${(index + 1).toString().padStart(2, '0')} / ${artifacts.length.toString().padStart(2, '0')}`;
                }
                if (titleEl) titleEl.textContent = item.name;
                if (locEl) locEl.textContent = `• ${item.loc}`;

                if (clockImgEl) {
                    clockImgEl.src = item.clockImg;
                    clockImgEl.alt = `${item.name} Clock Complication`;
                }

                if (item.isLondon) {
                    if (physImgEl) physImgEl.style.display = 'none';
                    if (londonContainer) {
                        londonContainer.style.display = 'flex';
                    }
                } else {
                    if (londonContainer) londonContainer.style.display = 'none';
                    if (physImgEl) {
                        physImgEl.style.display = 'block';
                        physImgEl.src = item.physImg;
                        physImgEl.alt = `${item.name} Physical Photo`;
                    }
                }

                // Gentle fade in
                requestAnimationFrame(() => {
                    if (clockImgEl) clockImgEl.style.opacity = '1';
                    if (item.isLondon) {
                        if (londonContainer) londonContainer.style.opacity = '1';
                    } else {
                        if (physImgEl) physImgEl.style.opacity = '1';
                    }
                });
            }, 380);
        }

        function nextSlide() {
            currentIdx = (currentIdx + 1) % artifacts.length;
            renderArtifact(currentIdx);
        }

        function prevSlide() {
            currentIdx = (currentIdx - 1 + artifacts.length) % artifacts.length;
            renderArtifact(currentIdx);
        }

        function startTimer() {
            if (timer) clearInterval(timer);
            timer = setInterval(nextSlide, CYCLE_TIME);
        }

        function stopTimer() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        function togglePlayPause() {
            isPlaying = !isPlaying;
            if (isPlaying) {
                if (playPauseBtn) playPauseBtn.textContent = '⏸';
                startTimer();
            } else {
                if (playPauseBtn) playPauseBtn.textContent = '▶';
                stopTimer();
            }
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                if (isPlaying) startTimer();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                if (isPlaying) startTimer();
            });
        }

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', togglePlayPause);
        }

        // Initialize first slide and timer
        renderArtifact(currentIdx);
        startTimer();
    }

    drawGenerativeBackground();
});


