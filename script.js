// Variable global para rastrear el índice Z más alto
let highestZIndex = 1;

// Función para hacer que un elemento sea arrastrable
function makeElementDraggable(elmnt) {
    // Variables para almacenar las posiciones del mouse/touch
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let lastTap = 0;

    // Asigna los manejadores de eventos para el mouse y el touch
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = handleTouchStart;
    elmnt.ondblclick = handleDoubleClick;

    // Función para manejar el inicio del toque
    function handleTouchStart(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        // Si el tiempo entre toques es menor a 300ms, se considera un doble toque
        if (tapLength < 300 && tapLength > 0) {
            toggleSize(elmnt);
        } else {
            dragMouseDown(e);
        }

        lastTap = currentTime;
    }

    // Función para manejar el doble clic en la versión de escritorio
    function handleDoubleClick(e) {
        e.stopPropagation(); // Evitar que el evento de clic se propague al documento
        toggleSize(e.target);
    }

    // Función para alternar el tamaño del elemento y mostrar el div de información
    function toggleSize(elmnt) {
        let infoDiv = elmnt.parentElement.querySelector('.infoPrenda');

        if (elmnt.style.transform === 'scale(4)') {
            elmnt.style.transform = 'scale(1)';
            elmnt.style.transition = 'transform 0.3s ease';
            elmnt.style.imageRendering = 'auto';
            document.removeEventListener('click', handleDocumentClick); // Remover el evento de clic en el documento

            // Ocultar el div de información
            if (infoDiv) {
                infoDiv.style.opacity = '0';
                setTimeout(() => {
                    infoDiv.style.display = 'none';
                }, 500); // Espera a que la transición termine antes de ocultar el div
            }
        } else {
            elmnt.style.transform = 'scale(4)';
            elmnt.style.transition = 'transform 0.3s ease';
            elmnt.style.imageRendering = 'high-quality';
            document.addEventListener('click', handleDocumentClick); // Agregar el evento de clic en el documento

            // Mostrar el div de información con fadeIn
            if (infoDiv) {
                infoDiv.style.display = 'flex';
                setTimeout(() => {
                    infoDiv.style.opacity = '1';
                }, 10); // Pequeño retraso para asegurar que el display se aplique antes de la transición
            }
        }
    }


    // Función para manejar el clic en el documento
    function handleDocumentClick(e) {
        const elmnt = document.querySelector('[style*="transform: scale(4)"]');
        if (elmnt && !elmnt.contains(e.target)) {
            toggleSize(elmnt);
        }
    }

    // Función para manejar el inicio del arrastre con el mouse
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        elmnt.style.cursor = 'grabbing';

        // Determina las posiciones iniciales del mouse/touch
        if (e.type === 'touchstart') {
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        } else {
            pos3 = e.clientX;
            pos4 = e.clientY;
        }

        // Incrementa el índice Z para asegurar que el elemento esté al frente
        highestZIndex++;
        elmnt.style.zIndex = highestZIndex;

        // Asigna los manejadores de eventos para el movimiento y la finalización del arrastre
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
    }

    // Función para manejar el arrastre del elemento
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        // Calcula las nuevas posiciones del mouse/touch
        if (e.type === 'touchmove') {
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        } else {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
        }

        // Establece la nueva posición del elemento
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    // Función para finalizar el arrastre del elemento
    function closeDragElement() {
        elmnt.style.cursor = 'grab';
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todos los elementos con la clase 'draggable'
    const draggableElements = document.querySelectorAll('.draggable');
    // Hace que cada elemento sea arrastrable
    draggableElements.forEach(elmnt => {
        makeElementDraggable(elmnt);
    });
});




document.querySelector('.logo-button').addEventListener('click', function () {
    const fondo = document.querySelector('.fondo');
    const idProyectos = document.getElementById('id-proyectos');
    const logo = document.querySelector('.logo-button');
    const infoWebstarz = document.getElementById('infoWebstarz');

    if (fondo) {
        // Revertir la transformación y la transición del logo
        logo.style.top = `${logo.offsetTop}px`; // Fijar la posición actual
        logo.style.left = `${logo.offsetLeft}px`; // Fijar la posición actual
        logo.offsetHeight; // Forzar un reflujo para que los estilos iniciales se apliquen antes de la transición
        logo.style.top = ''; // Eliminar el estilo inline
        logo.style.left = ''; // Eliminar el estilo inline
        logo.style.transform = ''; // Eliminar la transformación
        logo.style.zIndex = ''; // Restablecer el z-index
        logo.style.position = ''; // Restablecer la posición por defecto

        // Ocultar infoWebstarz con fadeout
        infoWebstarz.style.transition = 'opacity 0.5s ease';
        infoWebstarz.style.opacity = '0';
        setTimeout(() => {
            infoWebstarz.style.display = 'none';
        }, 500); // Esperar a que termine la transición

        // Eliminar las estrellitas con fadeout
        fondo.style.transition = 'opacity 0.5s ease';
        fondo.style.opacity = '0';
        setTimeout(() => {
            fondo.remove();
        }, 500); // Esperar a que termine la transición

        // Mostrar idProyectos y restablecer su posición
        idProyectos.style.display = 'block';
        idProyectos.style.position = ''; // Restablecer la posición
        idProyectos.style.zIndex = ''; // Restablecer el z-index
    } else {
        // Establecer estilos iniciales
        logo.style.position = 'fixed';
        logo.style.transition = 'transform 0.5s ease, top 0.5s ease, left 0.5s ease';
        logo.style.top = `${logo.offsetTop}px`; // Fijar la posición inicial
        logo.style.left = `${logo.offsetLeft}px`; // Fijar la posición inicial

        // Forzar un reflujo para que los estilos iniciales se apliquen antes de la transición
        logo.offsetHeight;

        // Aplicar la transformación y la transición
        logo.style.top = '5%';
        logo.style.left = '50%';
        logo.style.transform = 'translateX(-50%) scale(1.5)'; // Centra horizontalmente y escala
        
        idProyectos.style.display = 'none'; 

        // Mostrar infoWebstarz y restablecer su opacidad
        infoWebstarz.style.display = 'flex';
        infoWebstarz.style.opacity = '1'; // Restablecer la opacidad

        const newFondo = document.createElement('div');
        newFondo.classList.add('fondo');
        newFondo.style.backgroundColor = 'aliceblue'; 
        newFondo.style.position = 'fixed';
        newFondo.style.top = '0';
        newFondo.style.left = '0';
        newFondo.style.width = '100%';
        newFondo.style.height = '100%';
        newFondo.style.backgroundSize = 'cover';
        newFondo.style.backgroundPosition = 'center';
        newFondo.style.zIndex = highestZIndex++;
        document.body.appendChild(newFondo);

        // Crear estrellitas
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}vw`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`; // Duración aleatoria entre 2 y 5 segundos
            star.style.animationDelay = `${Math.random() * 5}s`; // Retraso aleatorio
            newFondo.appendChild(star);
        }
    }
});

// Crear el elemento de audio
const giggleSound = new Audio('sound/girl-giggle.wav');
const uwuSound = new Audio('sound/uwu.mp3');

// Variable para rastrear el último sonido reproducido
let lastSoundPlayed = null;

// Función para alternar sonidos
function playAlternateSound() {
    if (lastSoundPlayed === giggleSound) {
        uwuSound.play();
        lastSoundPlayed = uwuSound;
    } else {
        giggleSound.play();
        lastSoundPlayed = giggleSound;
    }
}

//--- Al clickear #personaje cambia el source de la imagen dentro de #personaje ---
document.querySelector('#personaje').addEventListener('click', function () {
    const personaje = document.querySelector('#personaje img');
    if (personaje.src.includes('img/personajes/webstarElf1.png')) {
        personaje.src = 'img/personajes/webstarElf2.png';
        // si el personaje es el modelo 2 pasar al modelo 3
    } else if (personaje.src.includes('img/personajes/webstarElf2.png')) {
        personaje.src = 'img/personajes/webstarElf3.png';
        // si el personaje es el modelo 3 pasar al modelo 1
    } else {
        personaje.src = 'img/personajes/webstarElf1.png';
    }
    // Reproducir el sonido alternado
    playAlternateSound();
});

// Agregar evento para touch
document.querySelector('#personaje').addEventListener('touchstart', function () {
    playAlternateSound();
});

// --- Cambiar funcion hover en dispositivos táctiles ---
document.addEventListener('DOMContentLoaded', function () {
    // Detectar si el dispositivo soporta hover
    const supportsHover = window.matchMedia('(hover: hover)').matches;

    if (!supportsHover) {
        // Obtener todos los elementos con la clase .info-proyecto
        const infoProyectos = document.querySelectorAll('.info-proyecto');

        infoProyectos.forEach(function (infoProyecto) {
            // Obtener el hipervínculo y el contenedor del proyecto
            const link = infoProyecto.querySelector('a');
            const container = infoProyecto.querySelector('.container-proyecto');

            // Agregar un evento de clic al elemento .info-proyecto
            infoProyecto.addEventListener('click', function (event) {
                // Prevenir la acción por defecto del hipervínculo
                event.preventDefault();

                // Alternar la visibilidad del contenedor del proyecto
                if (container.style.display === 'block') {
                    container.style.display = 'none';
                } else {
                    container.style.display = 'block';
                }
            });

            // Agregar un evento de clic al documento para ocultar el contenedor
            document.addEventListener('click', function (event) {
                // Verificar si el clic ocurrió fuera del contenedor
                if (!infoProyecto.contains(event.target)) {
                    container.style.display = 'none';
                }
            });
        });
    }
});

// // Función para manejar el desplazamiento de la página
// function handleScroll() {
//     const scrollPosition = window.scrollY;
//     const elements = document.querySelectorAll('.column-info');

//     elements.forEach(elmnt => {
//         // Aplica una transformación suave basada en la posición de desplazamiento
//         elmnt.style.transform = `translateY(${scrollPosition * 0.2}px)`;
//         elmnt.style.transition = 'transform 0.3s ease-out';
//     });
// }

// // Agrega el evento de desplazamiento a la ventana
// window.addEventListener('scroll', handleScroll);
