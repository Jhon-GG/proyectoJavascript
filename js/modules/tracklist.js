

class Tracks extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.renderFrame();
    }

    async renderFrame() {
        const uri = this.getAttribute('uri');
        if (uri) {
            const id = uri.split(':')[2];
            await this.loadTrackList(id);
        }
    }

    async loadTrackList(albumId) {
        const url = `https://spotify23.p.rapidapi.com/albums/?ids=${albumId}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8208b634d8mshfbf7b8084b4af97p1e63ffjsn17e0f81b8289',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            // Obtener el primer álbum de la respuesta
            const album = result.albums[0];

            // Obtener la URL de la tercera imagen
            const imageUrl = album.images[2].url;

            // Crear la plantilla HTML para cada pista del álbum
            let templates = '';
            album.tracks.items.forEach(track => {
                templates += `
                <div class="right_asideListBoxes">
                    <div class="right_asideListImg">
                        <img src=${imageUrl} alt="trackList" data-id="${track.uri}>
                    </div>
                    <div class="right_asideListDescription">
                        <h3>${track.name}</h3>
                        <p>${track.artists[0].name}</p>
                    </div>
                    <div class="right_asideListTime">
                        <h3>${album.release_date}</h3>                        
                    </div>
                </div>
                `;
            });
            this.innerHTML = templates;

            setTimeout(() => {
                this.querySelectorAll('.track__songsName').forEach(track => {
                    track.classList.add('active');
                });
            }, 100);
            
            this.querySelectorAll('img').forEach(img => {
                img.addEventListener('click', () => {
                    const id = img.dataset.id;
                    const myFrame = document.querySelector('.main__frame');
                    myFrame.setAttribute('uri', `${id}`);
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    static get observedAttributes() {
        return ['uri'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'uri' && oldValue !== newValue) {
            this.renderFrame();
        }
    }
}

customElements.define('spoty-tracks', Tracks);