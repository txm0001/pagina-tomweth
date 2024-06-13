// --- DOMContentLoaded Event Listener ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Variables para Floating Image y Bio ---
    const floatingImage = document.getElementById('floatingImage');
    const bio = document.getElementById('bio');
    const closeBio = document.getElementById('closeBio');

    // --- Event Listeners Mostrar Bio ---
    floatingImage.addEventListener('click', showBio);
    floatingImage.addEventListener('touchstart', showBio);

    function showBio() {
        floatingImage.style['animation-play-state'] = 'paused';
        bio.style.display = 'flex';
    };

    // --- Event Listener  Cerrar Bio ---
    closeBio.addEventListener('click', () => {
        floatingImage.style['animation-play-state'] = 'running';
        bio.style.display = 'none';
    });

    // --- Hacer Bio Draggable ---
    makeElementDraggable(bio);
});

// --- Window Onload Event Listener ---
window.onload = function () {
    // --- Variables for Obras ---
    const obrasTodas = document.getElementById('obrasEmergentes');
    const closeObra1 = document.getElementById('closeObra1');
    const closeObra2 = document.getElementById('closeObra2');
    const closeObra3 = document.getElementById('closeObra3');
    const obra1 = document.getElementById('obra1');
    const obra2 = document.getElementById('obra2');
    const obra3 = document.getElementById('obra3');

    // --- Event Listener for Showing Obras ---
    document.getElementById('obras').addEventListener('click', () => {
        [obra1, obra2, obra3].forEach(obra => {
            obra.style.display = 'flex';
        });
        floatingImage.style['animation-play-state'] = 'paused';
        obrasTodas.style.display = 'flex';

        closeObra1.addEventListener('click', () => {
            obra1.style.display = 'none';
        });
        closeObra1.addEventListener('touchstart', () => {
            obra1.style.display = 'none';
        });

        closeObra2.addEventListener('click', () => {
            obra2.style.display = 'none';
        });
        closeObra2.addEventListener('touchstart', () => {
            obra2.style.display = 'none';
        });

        closeObra3.addEventListener('click', () => {
            obra3.style.display = 'none';
        });
        closeObra3.addEventListener('touchstart', () => {
            obra3.style.display = 'none';
        });
    });

    // --- Make Obras Draggable ---
    makeElementDraggable(obra1);
    makeElementDraggable(obra2);
    makeElementDraggable(obra3);

    // --- Event Listener for iUniversal Video ---
    document.getElementById('iuniversalPic').addEventListener('click', (event) => {
        const videoContainer = document.getElementById('container-iuniversalVideo');
        const videoYoutube = document.getElementById('iuniversal-video');
        const videoSrc = "https://www.youtube.com/embed/UW2wEtLUTys?si=2ti_hhLG4L7NTulW&controls=0&autoplay=1";

        videoContainer.classList.toggle('mostrar');
        videoYoutube.src = videoSrc;
        event.stopPropagation();
    });

    // --- Event Listener for Closing iUniversal Video ---
    window.addEventListener('click', (event) => {
        const videoContainer = document.getElementById('container-iuniversalVideo');
        const videoYoutube = document.getElementById('iuniversal-video');
        const closeVideo = document.querySelector('#closeIuniversal-video');
        const videoSrc = "https://www.youtube.com/embed/UW2wEtLUTys?si=2ti_hhLG4L7NTulW&controls=0&autoplay=1";

        if (!videoContainer.contains(event.target) && !videoYoutube.contains(event.target) || event.target == closeVideo) {
            if (videoContainer.classList.contains('mostrar')) {
                videoContainer.classList.remove('mostrar');
                videoYoutube.src = "";
                videoYoutube.src = videoSrc;
            }
        }
    });

    // --- Event Listener for Silent Walks ---
    document.getElementById('silentWalksPic').addEventListener('click', (event) => {
        const soundConteiner = document.getElementById('container-silentWalksCloud');
        const sonidoSoundcloud = document.getElementById('silentWalks-soundcloud');
        const soundSrc = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1277899771&color=%2318180f&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true";

        soundConteiner.classList.toggle('mostrar');
        sonidoSoundcloud.src = soundSrc;
        event.stopPropagation();
    });

    // --- Event Listener for Closing Silent Walks ---
    window.addEventListener('click', (event) => {
        const soundConteiner = document.getElementById('container-silentWalksCloud');
        const sonidoSoundcloud = document.getElementById('silentWalks-soundcloud');
        const soundSrc = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1277899771&color=%2318180f&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true";

        if (!soundConteiner.contains(event.target) && !sonidoSoundcloud.contains(event.target)) {
            if (soundConteiner.classList.contains('mostrar')) {
                soundConteiner.classList.remove('mostrar');
                sonidoSoundcloud.src = "";

            }
        }
    });

    // --- Variables para Laboratorios --- 
    const laboratoriosTodos = document.getElementById('laboratoriosEmergentes');
    const closeLaboratorio1 = document.getElementById('closeLab1');
    const closeLaboratorio2 = document.getElementById('closeLab2');
    const laboratorio1 = document.getElementById('laboratorio1');
    const laboratorio2 = document.getElementById('laboratorio2');
    const archivosLabs = document.getElementById('absoluteArchivesLab');
    const archivosLab1 = document.getElementsByClassName('laboratorio1Arch');
    const archivosLab2 = document.getElementsByClassName('laboratorio2Arch');

    // --- event listerners para mostrar laboratorios ---
    document.getElementById('laboratorios').addEventListener('click', () => {
        [laboratorio1, laboratorio2].forEach(laboratorio => {
            laboratorio.style.display = 'flex';
            archivosLabs.style.display = 'initial';
            for (let i = 0; i < archivosLabs.children.length; i++) {
                archivosLabs.children[i].style.display = 'initial';
            }

        });
        floatingImage.style['animation-play-state'] = 'paused';
        laboratoriosTodos.style.display = 'flex';

        closeLaboratorio1.addEventListener('click', () => {
            laboratorio1.style.display = 'none';
            for (let elemento of archivosLab1) {
                elemento.style.display = 'none'; // Reemplaza 'none' con el estilo que quieras aplicar
            }
        });
        closeLaboratorio1.addEventListener('touchstart', () => {
            laboratorio1.style.display = 'none';
            for (let elemento of archivosLab1) {
                elemento.style.display = 'none'; // Reemplaza 'none' con el estilo que quieras aplicar
            }
        });

        closeLaboratorio2.addEventListener('click', () => {
            laboratorio2.style.display = 'none';
            for (let elemento of archivosLab2) {
                elemento.style.display = 'none'; // Reemplaza 'none' con el estilo que quieras aplicar
            }
        });
        closeLaboratorio2.addEventListener('touchstart', () => {
            laboratorio2.style.display = 'none';
            for (let elemento of archivosLab2) {
                elemento.style.display = 'none'; // Reemplaza 'none' con el estilo que quieras aplicar
            }
        });
    });
    // --- Make Laboratorios Draggable ---
    makeElementDraggable(laboratorio1);
    makeElementDraggable(laboratorio2);
};





// --- Function to Make Elements Draggable ---
function makeElementDraggable(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;

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
    }
}

// --- Function Play Pedito Sound ---
function tiraPedito() {
    new Audio('sounds/pedito.wav').play();
    const ands = document.getElementsByClassName('and');
    ands[0].style.cursor = 'grabbing';
}

// --- Event Listener - Floating Image risitas ---
document.getElementById('floatingImage').addEventListener('click', risitas);

// --- Function Play Risitas Sound onClick ---
function risitas() {
    new Audio('sounds/risita.wav').play();
    // const floatingImage = document.getElementById('floatingImage');

}

// --- Function para Campanitas

const sonidosItems = ['/sounds/campanita1.wav', 'sounds/campanita2.wav', 'sounds/campanita3.wav', 'sounds/campanitaslargas.wav', 'sounds/crash.wav', 'sounds/gong.wav'];

let itemCategories = document.getElementsByClassName('c')

function randomSonido() {
    let randomSonido = Math.floor(Math.random() * sonidosItems.length);
    return sonidosItems[randomSonido];
}

function playSonido() {
    new Audio(randomSonido()).play();
}

for (let i = 0; i < itemCategories.length; i++) {
    itemCategories[i].addEventListener('click', playSonido);
}

