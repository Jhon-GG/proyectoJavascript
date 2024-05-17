import './modules/input.js';
import './modules/album.js';
import './modules/tracklist.js'


// -------------------- COMPONENTE DE SPOTIFY RAPIDAPI ------------------------------

class myframe extends HTMLElement {
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
                <iframe class="spotify-iframe" width="100%" height="500" src="https://open.spotify.com/embed/${typeOf}/${id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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

customElements.define("my-frame", myframe);




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

