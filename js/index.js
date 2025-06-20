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
        { element: images[1], delay: 1000 },  // Imagen 2 - 1s
        { element: images[2], delay: 1500 }   // Imagen 3 - 1.5s
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
        { element: logoParts[1], delay: 2300 },    // Parte 2 - central (abajo)
        { element: logoParts[2], delay: 2600 }     // Parte 3 - lateral der (arriba)
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

function restartAnimation() {
    startAnimation();
}

// Iniciar animación al cargar la página
window.addEventListener('load', startAnimation);

// También reiniciar si se hace click en cualquier lugar
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('restart-btn')) {
        startAnimation();
    }
});