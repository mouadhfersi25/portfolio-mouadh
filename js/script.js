// ===== NAVIGATION & SCROLL =====

// Toggle menu mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fermer le menu mobile lors du clic sur un lien
const navLinkItems = document.querySelectorAll('.nav-link');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Active link selon la section visible
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Navbar scrolled effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

if (savedTheme === 'light') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

themeToggle?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'light') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMATIONS ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments pour animations
const animatedElements = document.querySelectorAll(`
    .competence-category,
    .projet-card,
    .certification-card,
    .timeline-item,
    .stat-card,
    .info-card,
    .contact-method
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== TYPED TEXT EFFECT =====
const typedTextElement = document.querySelector('.typed-text');
if (typedTextElement) {
    const texts = [
        'Full-Stack Developer',
        'React Developer',
        'Django Developer',
        'MERN Stack Developer',
        'DevOps Enthusiast'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 100;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause avant de supprimer
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause avant de taper le prochain texte
        }

        setTimeout(type, typingSpeed);
    }

    // Démarrer l'effet de frappe après un délai
    setTimeout(type, 1000);
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target > 10 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target > 10 ? '+' : '');
        }
    }, 16);
}

// Observer pour les compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = parseInt(target.getAttribute('data-target'));
            
            if (!target.classList.contains('counted')) {
                animateCounter(target, value);
                target.classList.add('counted');
            }
        }
    });
}, { threshold: 0.5 });

// Ajouter data-target aux éléments stat
document.querySelectorAll('.stat-content h4, .stat-card h3').forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/\d+/);
    
    if (match) {
        el.setAttribute('data-target', match[0]);
        counterObserver.observe(el);
    }
});

// ===== PARTICLES EFFECT (Optional - Background Animation) =====
function createParticle() {
    const heroBg = document.querySelector('.animated-bg');
    if (!heroBg) return;

    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 5 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(124, 58, 237, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
    
    heroBg.appendChild(particle);

    // Supprimer après animation
    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Créer des particules périodiquement
setInterval(createParticle, 3000);

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    // Cacher le loader si vous en ajoutez un
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }

    // Animer le hero au chargement
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===== CURSOR EFFECT (Optional) =====
const cursor = document.createElement('div');
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.border = '2px solid var(--primary-color)';
cursor.style.borderRadius = '50%';
cursor.style.position = 'fixed';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '9999';
cursor.style.transition = 'all 0.1s ease';
cursor.style.display = 'none'; // Désactivé par défaut

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Seulement sur desktop
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// ===== FORM VALIDATION (si vous ajoutez un formulaire de contact) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validation basique
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        
        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }
        
        // Ici vous pouvez ajouter l'envoi du formulaire
        console.log('Formulaire soumis:', { name, email, message });
        alert('Message envoyé avec succès!');
        contactForm.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== PROJET CARDS TILT EFFECT =====
const projetCards = document.querySelectorAll('.projet-card, .certification-card');

projetCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== COPIE EMAIL AU CLIC =====
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.href.replace('mailto:', '');
        
        // Créer un tooltip pour confirmer
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Email copié!';
        tooltip.style.position = 'fixed';
        tooltip.style.background = 'var(--success-color)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '10px 20px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.top = e.clientY + 'px';
        tooltip.style.left = e.clientX + 'px';
        tooltip.style.zIndex = '10000';
        tooltip.style.animation = 'fadeInUp 0.3s ease';
        
        document.body.appendChild(tooltip);
        
        // Copier dans le presse-papiers
        navigator.clipboard.writeText(email).then(() => {
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
});

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Portfolio Mouadh FERSI', 'color: #7c3aed; font-size: 20px; font-weight: bold;');
console.log('%cÀ la recherche d\'un stage PFE!', 'color: #06b6d4; font-size: 14px;');
console.log('%c📧 Contact: mouadh.fersi@esprit.tn', 'color: #10b981; font-size: 12px;');

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page chargée en ${(pageLoadTime / 1000).toFixed(2)}s`);
    });
}

// ===== EASTER EGG =====
let clickCount = 0;
const logo = document.querySelector('.logo');

logo?.addEventListener('click', (e) => {
    e.preventDefault();
    clickCount++;
    
    if (clickCount === 5) {
        alert('🎉 Vous avez trouvé l\'easter egg! Merci de visiter mon portfolio!');
        clickCount = 0;
    }
});

// ===== PREVENT RIGHT CLICK ON IMAGES (Optional - Protection) =====
// Décommentez si vous voulez protéger vos images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert('Les images sont protégées');
    });
});
*/

