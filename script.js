document.addEventListener('DOMContentLoaded', () => {
    const diasElement = document.getElementById('dias');
    const horasElement = document.getElementById('horas');
    const minutosElement = document.getElementById('minutos');
    const segundosElement = document.getElementById('segundos');
    const dataCasamento = new Date('2025-07-27T00:00:00').getTime();
    
    function atualizarContagem() {
        const agora = new Date().getTime();
        const distancia = dataCasamento - agora;

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        diasElement.textContent = dias;
        horasElement.textContent = horas;
        minutosElement.textContent = minutos;
        segundosElement.textContent = segundos;
    }

    setInterval(atualizarContagem, 1000);

    // Galeria de Fotos
    const slides = document.querySelector('.slides');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    function updateGallery(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1;
        updateGallery(currentIndex);
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0;
        updateGallery(currentIndex);
    });

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentIndex = index;
            updateGallery(currentIndex);
        });
    });

    updateGallery(currentIndex); // Inicializa a galeria
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const menuLateral = document.querySelector(".menu-lateral");

    hamburgerMenu.addEventListener("click", () => {
        menuLateral.classList.toggle("ativo"); // Alterna a classe para exibir/esconder o menu
    });

    // Fechar o menu ao clicar fora (opcional)
    document.addEventListener("click", (event) => {
        if (!menuLateral.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            menuLateral.classList.remove("ativo");
        }
    });
});