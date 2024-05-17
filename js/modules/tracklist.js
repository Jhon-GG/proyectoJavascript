

class TrackList extends HTMLElement {
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
                'X-RapidAPI-Key': 'bb41872726msh81baf08ac413f15p1947b7jsnb9728a6429e9',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const album = result.albums[0];
            const imageUrl = album.images[2].url;

            let templates = '';
            album.tracks.items.forEach(track => {
                const durationMs = track.duration_ms;
                const minutes = Math.floor(durationMs / 60000);
                const seconds = Math.floor((durationMs % 60000) / 1000).toString().padStart(2, '0');

                templates += `
                    <div class="right_asideListBoxes">
                        <div class="right_asideListImg">
                            <img src="${imageUrl}" alt="trackList" data-id="${track.uri}">
                        </div>
                        <div class="right_asideListDescription">
                            <h3>${track.name}</h3>
                            <p>${track.artists[0].name}</p>
                        </div>
                        <div class="right_asideListTime">
                            <h3>${minutes}:${seconds}</h3>
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
                    const myFrame = document.querySelector('my-frame');
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

customElements.define('track-list', TrackList);