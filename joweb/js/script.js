document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {
        document.body.classList.remove('hidden');
        // Añadir un retraso de 2.5 segundos (2500 milisegundos)
        setTimeout(function() {
            // Ocultar el loader con una transición de desvanecimiento
            document.getElementById('loader').classList.add('hidden');
            // Mostrar el contenido con una transición de desvanecimiento
            document.getElementById('content').classList.add('visible');
            // Mostrar el body
            
        }, 2500); // Cambia 2500 por el tiempo en milisegundos que desees
    });
});

// Variable global para rastrear el índice Z más alto
let highestZIndex = 1;

// Función para hacer que un elemento sea arrastrable
function makeElementDraggable(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let lastTap = 0;

    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = handleTouchStart;
    elmnt.ondblclick = handleDoubleClick;

    function handleTouchStart(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 300 && tapLength > 0) {
            toggleSize(elmnt);
        } else {
            dragMouseDown(e);
        }

        lastTap = currentTime;
    }

    function handleDoubleClick(e) {
        e.stopPropagation();
        toggleSize(e.target);
    }

    function toggleSize(elmnt) {
        let infoDiv = elmnt.parentElement.querySelector('.infoPrenda');

        if (elmnt.style.transform === 'scale(4)') {
            elmnt.style.transform = 'scale(1)';
            elmnt.style.transition = 'transform 0.3s ease';
            elmnt.style.imageRendering = 'auto';
            document.removeEventListener('click', handleDocumentClick);

            if (infoDiv) {
                infoDiv.style.opacity = '0';
                setTimeout(() => {
                    infoDiv.style.display = 'none';
                }, 500);
            }
        } else {
            elmnt.style.transform = 'scale(4)';
            elmnt.style.transition = 'transform 0.3s ease';
            elmnt.style.imageRendering = 'high-quality';
            document.addEventListener('click', handleDocumentClick);

            if (infoDiv) {
                infoDiv.style.display = 'flex';
                setTimeout(() => {
                    infoDiv.style.opacity = '1';
                }, 10);
            }
        }
    }

    function handleDocumentClick(e) {
        const elmnt = document.querySelector('[style*="transform: scale(4)"]');
        if (elmnt && !elmnt.contains(e.target)) {
            toggleSize(elmnt);
        }
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        elmnt.style.cursor = 'grabbing';

        if (e.type === 'touchstart') {
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        } else {
            pos3 = e.clientX;
            pos4 = e.clientY;
        }

        highestZIndex++;
        elmnt.style.zIndex = highestZIndex;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

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

        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        elmnt.style.cursor = 'grab';
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;

        const personajeDiv = document.getElementById('personaje');
        const personajeRect = personajeDiv.getBoundingClientRect();
        const elmntRect = elmnt.getBoundingClientRect();

        const isInsidePersonaje = (
            elmntRect.top >= personajeRect.top &&
            elmntRect.left >= personajeRect.left &&
            elmntRect.bottom <= personajeRect.bottom &&
            elmntRect.right <= personajeRect.right
        );

        if (isInsidePersonaje) {
            elmnt.style.position = 'fixed';
            elmnt.style.top = elmntRect.top + "px";
            elmnt.style.left = elmntRect.left + "px";
        } else {
            const parentRect = elmnt.parentElement.getBoundingClientRect();

            // Calcular la posición correcta relativa al padre
            const offsetX = elmntRect.left - parentRect.left;
            const offsetY = elmntRect.top - parentRect.top;

            elmnt.style.position = 'absolute';
            elmnt.style.top = offsetY + "px";
            elmnt.style.left = offsetX + "px";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach(elmnt => {
        makeElementDraggable(elmnt);
    });
});



const soundInfoWebstarz = new Audio('sound/sintes_starz.mp3');

document.querySelector('.logo-button').addEventListener('click', function () {
    const fondo = document.querySelector('.fondo');
    const idProyectos = document.getElementById('id-proyectos');
    const logo = document.querySelector('.logo-button');
    const infoWebstarz = document.getElementById('infoWebstarz');
    const isSmallScreenPortrait = window.matchMedia('(max-width: 500px) and (orientation: portrait)').matches;
    
    if (isSmallScreenPortrait) {
        const footer = document.querySelector('footer');
        if (footer.style.display === 'none' || footer.style.display === '') {
            footer.style.display = 'flex';
        } else {
            footer.style.display = 'none';
        }
    }
    if (!soundInfoWebstarz.paused) {
        // Pausar y reiniciar el sonido si está sonando
        soundInfoWebstarz.pause();
        soundInfoWebstarz.currentTime = 0;
    } else {
        // Reproducir el sonido si está pausado
        soundInfoWebstarz.volume = 0.1;
        soundInfoWebstarz.loop = true;
        soundInfoWebstarz.play();
    }

    if (fondo) {
        logo.style.top = `${logo.offsetTop}px`; 
        logo.style.left = `${logo.offsetLeft}px`; 
        logo.offsetHeight; 
        logo.style.top = ''; 
        logo.style.left = ''; 
        logo.style.transform = ''; 
        logo.style.zIndex = ''; 
        logo.style.position = ''; 

        infoWebstarz.style.transition = 'opacity 0.5s ease';
        infoWebstarz.style.opacity = '0';
        setTimeout(() => {
            infoWebstarz.style.display = 'none';
        }, 500); 

        fondo.style.transition = 'opacity 0.5s ease';
        fondo.style.opacity = '0';
        setTimeout(() => {
            fondo.remove();
        }, 500); 

        idProyectos.style.display = 'block';
        idProyectos.style.position = ''; 
        idProyectos.style.zIndex = ''; 
    } else {
        logo.style.position = 'fixed';
        logo.style.transition = 'transform 0.5s ease, top 0.5s ease, left 0.5s ease';
        logo.style.top = `${logo.offsetTop}px`; 
        logo.style.left = `${logo.offsetLeft}px`; 

        logo.offsetHeight;

        logo.style.top = '5%';
        logo.style.left = '50%';
        logo.style.transform = 'translateX(-50%) scale(1.5)'; 
        
        idProyectos.style.display = 'none'; 

        infoWebstarz.style.display = 'flex';
        infoWebstarz.style.opacity = '1'; 

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

    

        // Crear estrellas en el fondo
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}vw`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`; 
            star.style.animationDelay = `${Math.random() * 5}s`; 
            newFondo.appendChild(star);
        }
    }
});



// Crear el elemento de audio
const giggleSound = new Audio('sound/girl-giggle.wav');
const uwuSound = new Audio('sound/uwu.mp3');

// Ajustar el volumen de los sonidos (0.0 es el volumen mínimo y 1.0 es el volumen máximo)
giggleSound.volume = 0.1; // Ajusta este valor según sea necesario
uwuSound.volume = 0.1; // Ajusta este valor según sea necesario

// Pre-cargar los archivos de audio
giggleSound.preload = 'auto';
uwuSound.preload = 'auto';

// Variable para rastrear el último sonido reproducido
let lastSoundPlayed = null;

// Función para alternar sonidos
function playAlternateSound() {
    // Detener el sonido actual antes de reproducir el siguiente
    if (lastSoundPlayed) {
        lastSoundPlayed.pause();
        lastSoundPlayed.currentTime = 0; // Reiniciar el sonido
    }

    if (lastSoundPlayed === giggleSound) {
        uwuSound.play();
        lastSoundPlayed = uwuSound;
    } else {
        giggleSound.play();
        lastSoundPlayed = giggleSound;
    }
}

//--- Al clickear o tocar #personaje cambia el source de la imagen dentro de #personaje ---
document.querySelector('#personaje').addEventListener('pointerdown', function () {
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

document.getElementById('toggle-lang-es').addEventListener('click', function () {
    window.location.href = 'index.html';
});

document.getElementById('toggle-lang-en').addEventListener('click', function () {
    window.location.href = 'index-en.html';
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
