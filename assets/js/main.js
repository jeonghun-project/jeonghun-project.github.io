document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Count-Up Animation for Stats
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                animateCount(target, endValue);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));

    function animateCount(el, end) {
        let current = 0;
        const duration = 2000;
        const step = end / (duration / 16);
        
        function update() {
            current += step;
            if (current < end) {
                el.innerText = Math.floor(current).toLocaleString() + "+";
                requestAnimationFrame(update);
            } else {
                el.innerText = end.toLocaleString() + "+";
            }
        }
        update();
    }

    // 3. 3D Tilt Effect for Cards (Optional enhanced interaction)
    const cards = document.querySelectorAll('.post-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / 10) * -1;
            const rotateY = (x - centerX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});
