import './modules/input.js';
import './modules/album.js';
import './modules/tracklist.js'


// -------------------- COMPONENTE DE SPOTIFY RAPIDAPI ------------------------------

class myframe extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.renderFrame();
    }

    renderFrame() {
        const uri = this.getAttribute('uri');
        if (uri) {
            const id = uri.split(':')[2];
            const typeOf = uri.split(':')[1];
            this.shadowRoot.innerHTML = `
                <iframe class="spotify-iframe" width="100%" height="500" src="https://open.spotify.com/embed//album/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            `;
        } else {
            this.shadowRoot.innerHTML = '';
        }
    }

    static get observedAttributes() {
        return ["uri"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'uri' && oldVal !== newVal) {
            this.renderFrame();
        }
    }
}
customElements.define("my-frame",myframe)


// class MyFrame extends HTMLElement {
//     constructor() {
//         super();
//     }
    
//     connectedCallback() {
//         this.attachShadow({ mode: "open" });
//         // Escuchar el evento personalizado 'albumSelected' de AlbumGallery
//         document.addEventListener('albumSelected', (event) => {
//             // Obtener la uri del detalle del evento
//             const uri = event.detail;
//             // Obtener solo lo que está después del ":" en la uri
//             const id = uri.split(':')[1];
//             // Insertar el iframe con el id en el shadow DOM
//             this.shadowRoot.innerHTML = `
//                 <iframe class="spotify-iframe" width="100%" height="500" src="https://open.spotify.com/embed/album/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
//             `;
//         });
//     }
// }

// customElements.define("my-frame", MyFrame);







// // ----------------- FUNCIONALIDAD BOTONES -----------------------


// // funciones.js

// function showLeft() {
//     // Ocultar parte central y derecha, mostrar parte izquierda
//     document.getElementById('section_middle').style.display = 'none';
//     document.getElementById('right_aside').style.display = 'none';
//     document.getElementById('left_aside').style.visibility = 'visible';
// }

// function showRight() {
//     // Ocultar parte central y izquierda, mostrar parte derecha
//     document.getElementById('section_middle').style.display = 'none';
//     document.getElementById('left_aside').style.display = 'none';
//     document.getElementById('right_aside').style.visibility = 'visible';
// }

