document.addEventListener('DOMContentLoaded', () => {
    const floatingImage = document.getElementById('floatingImage');
    const bio = document.getElementById('bio');
    const closeBio = document.getElementById('closeBio');


    floatingImage.addEventListener('click', () => {
        floatingImage.style['animation-play-state'] = 'paused';
        bio.style.display = 'flex';
    });

    closeBio.addEventListener('click', () => {
        floatingImage.style['animation-play-state'] = 'running';
        bio.style.display = 'none';
    });

    dragElement(document.getElementById("bio"));

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id)) {
            document.getElementById(elmnt.id).onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});
window.onload = function () {
    const obrasTodas = document.getElementById('ObrasEmergentes');
    const closeObra1 = document.getElementById('closeObra1');
    const closeObra2 = document.getElementById('closeObra2');
    const closeObra3 = document.getElementById('closeObra3');
    const obra1 = document.getElementById('obra1');
    const obra2 = document.getElementById('obra2');
    const obra3 = document.getElementById('obra3');

    document.getElementById('obras').addEventListener('click', () => {
        [obra1, obra2, obra3].forEach(obra => {
            obra.style.display = 'flex';
        });
        floatingImage.style['animation-play-state'] = 'paused';

        obrasTodas.style.display = 'flex';

        closeObra1.addEventListener('click', () => {
            obra1.style.display = 'none';
        });
        closeObra2.addEventListener('click', () => {
            obra2.style.display = 'none';
        });
        closeObra3.addEventListener('click', () => {
            obra3.style.display = 'none';
        });
    });

    dragElement(document.getElementById("obra1"));
    dragElement(document.getElementById("obra2"));
    dragElement(document.getElementById("obra3"));

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id)) {
            document.getElementById(elmnt.id).onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            elmnt.style.cursor = 'grabbing';
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            elmnt.style.cursor = 'grab';
            document.onmouseup = null;
            document.onmousemove = null;
        }
    };

    document.getElementById('iuniversalPic').addEventListener('click', () => {
        const videoContainer = document.getElementById('container-iuniversalVideo');
        const videoYoutube = document.getElementById('iuniversal-video');
        const videoSrc = "https://www.youtube.com/embed/UW2wEtLUTys?si=2ti_hhLG4L7NTulW&controls=0&autoplay=1";

        videoContainer.classList.toggle('mostrar');
        videoYoutube.src = videoSrc;
        event.stopPropagation();
    });

    window.onclick = (event) => {
        const videoContainer = document.getElementById('container-iuniversalVideo');
        const videoYoutube = document.getElementById('iuniversal-video');
        if (!videoContainer.contains(event.target) && !videoYoutube.contains(event.target)) {
            if (videoContainer.classList.contains('mostrar')) {
                videoContainer.classList.remove('mostrar');
                videoYoutube.src = "";

            };
        };
    };

    document.getElementById('silentWalksPic').addEventListener('click', () => {
        const soundConteiner = document.getElementById('container-silentWalksCloud');
        const sonidoSoundcloud = document.getElementById('silentWalks-soundcloud');
        const soundSrc = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1277899771&color=%2318180f&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true";

        soundConteiner.classList.toggle('mostrar');
        sonidoSoundcloud.src = soundSrc;
        event.stopPropagation();
    });

    window.onclick = (event) => {
        const soundConteiner = document.getElementById('container-silentWalksCloud');
        const sonidoSoundcloud = document.getElementById('silentWalks-soundcloud');
        if (!soundConteiner.contains(event.target) && !sonidoSoundcloud.contains(event.target)) {
            if (soundConteiner.classList.contains('mostrar')) {
                soundConteiner.classList.remove('mostrar');
                sonidoSoundcloud.src = "";
            };
        };
    };
};
