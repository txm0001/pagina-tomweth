const container = document.getElementById('falling-container');
const helloWindow = document.getElementById('hello_window');
const UNSPLASH_ACCESS_KEY = 'UQcZGyo_R5OBuAX7IW0xgTwwrpY_Fm6kEMsy3mMx1J4'; // Replace with your Unsplash Access Key
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

const soundFiles = [
    'angry_voice.wav',
    'broken_glass.wav',
    'busy_restaurant.wav',
    'cat_licking.wav',
    'chewing_gum.wav',
    'chicken.mp3',
    'doubt.wav',
    'eating_chocolate.wav',
    'grito_cayendo.wav',
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
];

console.log('iniciado');

// funcion para buscar imagen en unsplash
function fetchImage(query) {
    let formattedQuery = query.replace(/_/g, ' '); // Reemplazar guiones bajos con espacios
    let url = UNSPLASH_URL + '?query=' + formattedQuery + '&client_id=' + UNSPLASH_ACCESS_KEY;
    
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error en la solicitud de la API de Unsplash: ' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(function(data) {
            if (!data.results || data.results.length === 0) {
                console.error('No se encontraron imágenes para la consulta:', formattedQuery);
                return 'https://via.placeholder.com/120';  // Imagen de respaldo si no se encuentran resultados
            }
            const randomIndex = Math.floor(Math.random() * data.results.length); // Obtener un índice aleatorio
            return data.results[randomIndex].urls.small; // Devolver la URL de la primera imagen encontrada
        })
        .catch(function(error) {
            console.error('Error al obtener la imagen:', error);
            return 'https://via.placeholder.com/120';  // Imagen de respaldo en caso de error
        });
}


// Function to create a falling element with an image and sound
async function createFallingElement(soundFile) {
    const soundName = soundFile.split('.')[0]; // Get sound name without extension
    const imageUrl = await fetchImage(soundName);
    const element = document.createElement('div');
    element.className = 'falling-element';
    
    console.log('Creating element for sound:', soundFile, 'Image URL:', imageUrl); // Log element creation

    const img = document.createElement('img');
    img.src = imageUrl;

    const audio = document.createElement('audio');
    audio.src = `sounds/${soundFile}`;
    audio.loop = true;
    audio.play();

    element.appendChild(img);
    element.appendChild(audio);
    container.appendChild(element);

    const startX = Math.random() * window.innerWidth;
    element.style.left = `${startX}px`;

    const duration = 10 + Math.random() * 10; // Duration between 10 to 20 seconds
    const endY = window.innerHeight;

    const animation = element.animate([
        { transform: `translateY(0)`, opacity: 1 },
        { transform: `translateY(${endY}px)`, opacity: 0 }
    ], {
        duration: duration * 1000,
        easing: 'linear',
        fill: 'forwards'
    });

    // Attach event listeners after element is added to the DOM
    img.addEventListener('mouseover', () => {
        console.log('Image hovered:', img.src);
        document.querySelectorAll('.falling-element').forEach(el => {
            if (el !== element) {
                el.classList.add('hidden');
                console.log('Hiding element:', el);
            }
        });
        element.classList.add('hovered');
        animation.pause();
    });

    img.addEventListener('mouseout', () => {
        console.log('Mouse out of image:', img.src);
        document.querySelectorAll('.falling-element').forEach(el => {
            el.classList.remove('hidden');
            console.log('Showing element:', el);
        });
        element.classList.remove('hovered');
        animation.play();
    });
}

// Main function to initiate the falling elements
function init() {
    console.log('Initialization started'); // Log initialization start
    setInterval(async () => {
        const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];
        await createFallingElement(randomSound);
    }, 1000);
}

// Click event to start the falling elements
helloWindow.addEventListener('click', () => {
    helloWindow.style.display = 'none';
    init();
});
