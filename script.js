// --- Text Effect ---
const text = "Desenvolvedor Backend";
let i = 0;
const speed = 70;

function typing() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
    }
}

// Typing Effect
window.onload = typing;

// --- Particles Background ---
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let w, h, particles;

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random()
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        ctx.fillStyle = `rgba(0, 255, 156, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.y -= p.speed; // Up
        if (p.y < 0) {
            p.y = h;
            p.x = Math.random() * w;
        }
    });
    requestAnimationFrame(draw);
}

// Canvas Resize
window.addEventListener('resize', init);

// Particle system
init();
draw();

// Scroll Project
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});

// --- Scroll nav
document.querySelectorAll('nav .links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetId.startsWith('#')) {
            e.preventDefault();
            const windowHeight = window.innerHeight;
            const elementHeight = targetElement.offsetHeight;

            const targetPosition = targetElement.offsetTop - (windowHeight / 2) + (elementHeight / 2);

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});