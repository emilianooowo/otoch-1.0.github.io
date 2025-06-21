const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('dynamicHeader');
    const logoImg = document.getElementById('logoImg');

    const logoBlanco = '';
    const logoNegro = 'assets/logos/logo.png';

    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 430) {
            header.classList.add('scrolled');
            logoImg.src = logoNegro;
        } else {
            header.classList.remove('scrolled');
            logoImg.src = logoBlanco;
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
    updateHeader();
});

let animationTimeout;

function startAnimation() {
    // Limpiar cualquier animación anterior
    clearTimeout(animationTimeout);

    const images = document.querySelectorAll('.background-image');
    const logoParts = document.querySelectorAll('.logo-part');

    // Resetear estados de imágenes
    images.forEach(img => {
        img.classList.remove('slide-up', 'slide-down');
        img.classList.add('hidden');
        img.style.opacity = '0';
    });

    // Resetear estados del logo
    logoParts.forEach(part => {
        part.classList.remove('logo-slide-up', 'logo-slide-down');
        part.style.opacity = '0';
        part.style.transform = 'translateY(100px)';
    });

    // Secuencia de animaciones de imágenes
    const sequence = [
        { element: images[0], delay: 0 },     // Imagen 1 - inmediato
        { element: images[3], delay: 500 },   // Imagen 4 - 0.5s
        { element: images[1], delay: 800 },  // Imagen 2 - 1s
        { element: images[2], delay: 1200 }   // Imagen 3 - 1.5s
    ];

    sequence.forEach(({ element, delay }) => {
        setTimeout(() => {
            const direction = element.dataset.direction;
            element.classList.remove('hidden');

            if (direction === 'up') {
                element.style.transform = 'translateY(100%)';
                element.classList.add('slide-up');
            } else {
                element.style.transform = 'translateY(-100%)';
                element.classList.add('slide-down');
            }
        }, delay);
    });

    // Secuencia de animaciones del logo después de 2 segundos
    const logoSequence = [
        { element: logoParts[0], delay: 2000 },    // Parte 1 - lateral izq (arriba)
        { element: logoParts[1], delay: 2100 },    // Parte 2 - central (abajo)
        { element: logoParts[2], delay: 2200 }     // Parte 3 - lateral der (arriba)
    ];

    logoSequence.forEach(({ element, delay }) => {
        animationTimeout = setTimeout(() => {
            const direction = element.dataset.logoDirection;

            if (direction === 'up') {
                element.style.transform = 'translateY(100px)';
                element.classList.add('logo-slide-up');
            } else {
                element.style.transform = 'translateY(-100px)';
                element.classList.add('logo-slide-down');
            }
        }, delay);
    });
}

window.addEventListener('load', startAnimation);