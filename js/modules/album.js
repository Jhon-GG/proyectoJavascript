
class AlbumImages extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const loadAlbums = async (searchTerm, index) => {
            const formattedSearchTerm = searchTerm.replace(/\s/g, '%20');

            const url = `https://spotify23.p.rapidapi.com/search/?q=${formattedSearchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
            const options = {
                method: 'GET',
                headers: {
                    // 'X-RapidAPI-Key': '8208b634d8mshfbf7b8084b4af97p1e63ffjsn17e0f81b8289',
                    // 'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();

                if (result.albums.items.length > index) {
                    const albumData = result.albums.items[index].data;
                    if (albumData && albumData.coverArt && albumData.coverArt.sources.length > 0) {
                        const primeraUrl = albumData.coverArt.sources[0].url;
                        const uri = albumData.uri;
                        const id = uri.split(':')[2];
                        this.innerHTML = `
                            <img id="album__${index + 1}" src="${primeraUrl}" alt="" data-id="${id}">
                        `;

                        this.querySelector('img').addEventListener('click', () => {
                            const myFrame = document.querySelector('.main__frame');
                            myFrame.setAttribute('uri', `spotify:album:${id}`);
                            const AlbumTracksComponent = document.querySelector('.trackList');
                            AlbumTracksComponent.setAttribute('uri', `spotify:album:${id}`);
                        });
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        const index = parseInt(this.getAttribute('index')) || 0;
        loadAlbums('imagine dragons', index);
    }
}

customElements.define('album-images', AlbumImages);





// // ------------------- ALBUMS TITLE ----------------------



class SongTitles extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const loadSongs = async (searchTerm, index) => {
            const formattedSearchTerm = searchTerm.replace(/\s/g, '%20');

            const url = `https://spotify23.p.rapidapi.com/search/?q=${formattedSearchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
            const options = {
                method: 'GET',
                headers: {
                    // 'X-RapidAPI-Key': '8208b634d8mshfbf7b8084b4af97p1e63ffjsn17e0f81b8289',
                    // 'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();

                if (result.tracks.items.length > index) {
                    const trackData = result.tracks.items[index].data;
                    if (trackData) {
                        const songTitle = trackData.name;
                        this.innerHTML = `
                            <h2>${songTitle}</h2>
                        `;
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        const index = parseInt(this.getAttribute('index')) || 0;
        loadSongs('imagine dragons', index);
    }
}

customElements.define('song-titles', SongTitles);





// // ----------------- CAMBIAR CANCIÓN ------------------------

// function changeSong(){
//     // Obtenemos la imagen por su ID
//     const boxSong = document.getElementById('#album');
    
//     // Agregamos un evento de clic a la imagen
//     boxSong.addEventListener('click', () => {
//         // Obtenemos el elemento my-frame por su clase
//         const myFrame = document.querySelector('.section_middleFrame');
//         // Cambiamos el atributo uri del my-frame con la URL de la nueva canción
//         myFrame.setAttribute('uri', 'spotify:track:6b5P51m8xx2XA6U7sdNZ5E');
//     });
// }

// document.addEventListener('DOMContentLoaded', function() {
//     // Obtenemos la imagen por su ID
//     const image = document.getElementById('imageId');
//     // Agregamos un evento de clic a la imagen
//     image.addEventListener('click', changeSong);
// });

