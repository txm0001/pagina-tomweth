const container = document.getElementById('falling-container');
const helloWindow = document.getElementById('hello_window');
const message = document.getElementById('message');
const UNSPLASH_ACCESS_KEY = 'UQcZGyo_R5OBuAX7IW0xgTwwrpY_Fm6kEMsy3mMx1J4'; // Reemplazar con tu clave de acceso de Unsplash
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';
const SEARCH_TERM = 'window'; // Término de búsqueda para la imagen de fondo del body

const soundFiles = [
    'angry_voice.wav',
    'broken_glass.wav',
    'busy_restaurant.wav',
    'cat_licking.wav',
    'chewing_gum.wav',
    'chicken.mp3',
    'doubt.wav',
    'eating_chocolate.wav',
    'scream_falling.wav',
    'inhale_exhale.wav',
    'landing_plain.wav',
    'licking_moaning.wav',
    'roar.wav',
    'robin_singing.wav',
    'scissors_cutting.wav',
    'sigh.wav',
    'sparkling_water.wav',
    'whisper.wav',
    'walking_crocs.mp3',
    'raindrops.wav',
    'howling_wolves.wav',
    'motorcycle.wav',
    'thunder.wav',
    'baby_laughing.wav',

];

let currentElements = 0; // Contador de elementos actuales
const maxElements = 30; // Máximo número de elementos que pueden caer al mismo tiempo
let allElementsFallen = false; // Variable para verificar si todos los elementos han caído

console.log('Script iniciado'); // Registro de inicialización única

// Función para obtener imágenes aleatorias utilizando el término de búsqueda "window" de la API de Unsplash
function fetchRandomImage() {
    const url = `${UNSPLASH_URL}?query=${SEARCH_TERM}&client_id=${UNSPLASH_ACCESS_KEY}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud de la API de Unsplash: ' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (!data.results || data.results.length === 0) {
                console.error('No se encontraron imágenes para la consulta:', SEARCH_TERM);
                return 'https://via.placeholder.com/1920x1080'; // Imagen de respaldo si no se encuentran resultados
            }
            const randomIndex = Math.floor(Math.random() * data.results.length); // Obtener un índice aleatorio
            return data.results[randomIndex].urls.full; // Devolver la URL de la imagen completa
        })
        .catch(error => {
            console.error('Error al obtener la imagen aleatoria:', error);
            return 'https://via.placeholder.com/1920x1080'; // Imagen de respaldo en caso de error
        });
}

// Función para establecer el fondo del body
function setBackgroundImage() {
    fetchRandomImage().then(imageUrl => {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    });
}

// Llamar a la función para establecer el fondo cuando se carga la página
document.addEventListener('DOMContentLoaded', setBackgroundImage);

// Función para obtener imágenes de la API de Unsplash
function fetchImage(query) {
    var formattedQuery = query.replace(/_/g, ' '); // Reemplazar guiones bajos con espacios
    var url = UNSPLASH_URL + '?query=' + formattedQuery + '&client_id=' + UNSPLASH_ACCESS_KEY;

    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Error en la solicitud de la API de Unsplash: ' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            if (!data.results || data.results.length === 0) {
                console.error('No se encontraron imágenes para la consulta:', formattedQuery);
                return 'https://via.placeholder.com/120'; // Imagen de respaldo si no se encuentran resultados
            }
            const randomIndex = Math.floor(Math.random() * data.results.length); // Obtener un índice aleatorio
            return data.results[randomIndex].urls.small; // Devolver la URL de la primera imagen encontrada
        })
        .catch(function (error) {
            console.error('Error al obtener la imagen:', error);
            return 'https://via.placeholder.com/120'; // Imagen de respaldo en caso de error
        });
}

// Función para crear un elemento que cae con una imagen y un sonido
function createFallingElement(soundFile) {
    const soundName = soundFile.split('.')[0]; // Obtener el nombre del sonido sin extensión
    const formattedQuery = soundName.replace(/_/g, ' '); // Guardar formattedQuery para su uso posterior
    fetchImage(soundName).then(function (imageUrl) {
        const element = document.createElement('div');
        element.className = 'falling-element';

        console.log('Creating element for sound:', soundFile, 'Image URL:', imageUrl); // Registro de creación de elemento

        let img = document.createElement('img');
        img.src = imageUrl;

        const audio = document.createElement('audio');
        audio.src = `sounds/${soundFile}`;
        audio.loop = true;
        audio.volume = 0; // iniciar el audio en silencio
        audio.play();

        element.appendChild(img);
        element.appendChild(audio);
        container.appendChild(element);

        const startX = Math.random() * window.innerWidth;
        element.style.left = `${startX}px`;

        const duration = 10 + Math.random() * 10; // Duración entre 10 y 20 segundos
        const endY = window.innerHeight;

        const animation = element.animate([
            { transform: `translateY(0)`, opacity: 0 }, // inicio de la animación con opacidad en 0
            { transform: `translateY(${0.05 * endY}px)`, opacity: 1, offset: 0.05 }, // opacidad en 1 al 5% del recorrido
            { transform: `translateY(${endY}px)`, opacity: 0 } // final opacidad en 0
        ], {
            duration: duration * 1000,
            easing: 'linear',
            fill: 'forwards'
        });

        // Fade in del audio
        let fadeInInterval = setInterval(() => {
            if (audio.volume < 0.5) {
                audio.volume += 0.05;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 300);

        // Verificar si hay un elemento con la clase 'hovered'
        const hoveredElement = document.querySelector('.hovered');
        if (hoveredElement) {
            element.classList.add('hidden');
            audio.pause();
        }

        animation.onfinish = function () {
            // Fade out del audio
            let fadeOutInterval = setInterval(() => {
                if (audio && audio.volume > 0.05) { // si el audio existe y su volumen es mayor a 0
                    audio.volume -= 0.05;
                } else {
                    clearInterval(fadeOutInterval); // Limpia el intervalo si el volumen es 0 o el audio no existe
                    if (container.contains(element)) { // Verifica si el elemento aún está en el contenedor antes de intentar eliminarlo
                        container.removeChild(element);
                    }
                    // currentElements--; // Disminuir el contador cuando el elemento termine de caer
                    checkAllElementsFallen(); // Verificar si todos los elementos han caído
                }
            }, 100);
        };

        img.addEventListener('mouseover', function () {
            console.log('Image hovered:', img.src);
            document.querySelectorAll('.falling-element').forEach(function (el) {
                if (el !== element) {
                    el.classList.add('hidden'); // Oculta los demás elementos
                    el.querySelector('audio').pause(); // Detiene el audio de los demás elementos
                    console.log('Hiding element:', el);
                }
            });
            element.classList.add('hovered', 'enlarged'); // Añade clases para indicar que está siendo señalado y para agrandarlo
            animation.pause();
            audio.pause(); // Pausa el audio del elemento actual, si deseas que siga sonando, quita esta línea
        });

        img.addEventListener('mouseout', function () {
            console.log('Mouse out of image:', img.src);
            document.querySelectorAll('.falling-element').forEach(function (el) {
                el.classList.remove('hidden'); // Muestra los demás elementos
                el.querySelector('audio').play(); // Reanuda el audio de los demás elementos
                console.log('Showing element:', el);
            });
            element.classList.remove('hovered', 'enlarged'); // Quita las clases para volver al tamaño original
            animation.play();
            audio.play(); // Reanuda el audio del elemento actual, si deseas que siga pausado, quita esta línea
        });

        // Agregar evento para abrir nueva pestaña en Google Imágenes al hacer clic en la imagen
        img.addEventListener('click', function () {
            const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(formattedQuery)}`;
            window.open(searchUrl, '_blank');
        });

        currentElements++; // Aumentar el contador cuando se crea un nuevo elemento
        console.log('Current elements:', currentElements); // Registro de elementos actuales
    });
}

// Función para verificar si todos los elementos han caído
function checkAllElementsFallen() {
    if (currentElements == maxElements) { // Verificar si el contador es igual al máximo de elementos
        allElementsFallen = true; // Establecer la variable para evitar mostrar el mensaje más de una vez
        setTimeout(showMessage, 10000); // Mostrar el mensaje 10 segundos después de que todos los elementos hayan caído
    }
}

// Función para mostrar el mensaje
function showMessage() {
    message.classList.add('show');
}

// Función principal para iniciar los elementos caídos
function init() {
    console.log('inicio correcto'); // Registro de inicio de inicialización
    setInterval(function () {
        if (currentElements < maxElements) { // Crear un nuevo elemento solo si no se ha alcanzado el máximo
            const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];
            createFallingElement(randomSound);
        }
    }, 2500); // Intervalo 2500 ms
}

// Evento de clic para iniciar los elementos caídos
helloWindow.addEventListener('click', function () {
    helloWindow.style.display = 'none';
    init();
});
