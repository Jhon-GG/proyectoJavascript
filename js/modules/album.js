
class AlbumImages extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const loadAlbums = async (searchTerm, index) => {
            const codeBase = searchTerm.replace(/\s/g, '%20');

            const url = `https://spotify23.p.rapidapi.com/search/?q=${codeBase}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
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
            const codeBase = searchTerm.replace(/\s/g, '%20');

            const url = `https://spotify23.p.rapidapi.com/search/?q=${codeBase}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
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



// -------------------------- APARTADO MAY LIKE -----------------------------------


class MayLike extends HTMLElement {
    constructor() {
        super();
    }
    
    async connectedCallback() {
        const genres = ['cool with you new jeans', 'stressed out twenty one pilots', 'basket case green day', 'gossip maneskin', 'american green day'];
        const fetchSongsByGenre = async (genre) => {
            const url = `https://spotify23.p.rapidapi.com/search/?q=${genre}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
            const options = {
                method: 'GET',
                headers: {
                    // 'X-RapidAPI-Key': '8208b634d8mshfbf7b8084b4af97p1e63ffjsn17e0f81b8289',
                    // 'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const result = await response.json();
            return result.tracks.items;
        };

        try {
            let allSongs = [];
            for (const genre of genres) {
                const songs = await fetchSongsByGenre(genre);
                if (songs && songs.length > 0) {
                    allSongs.push(songs[Math.floor(Math.random() * songs.length)]); // Selecciona una canción aleatoria de cada género
                }
            }
            
            let templates = '';
            allSongs.forEach(track => {
                const trackData = track.data;
                // Primera URL de la portada del álbum
                const primeraUrl = trackData.albumOfTrack.coverArt.sources[0].url;
                // Nombre de la canción
                const nombre = trackData.name;
                // Nombre del artista
                const artista = trackData.artists.items.map(artist => artist.profile.name).join(', ');
                // Duración de la canción en milisegundos
                const durationMs = trackData.duration.totalMilliseconds;
                // Convertir a minutos y segundos
                const minutes = Math.floor(durationMs / 60000);
                const seconds = Math.floor((durationMs % 60000) / 1000).toString().padStart(2, '0');

                templates += `
                <div class="left_youMayLikeListBoxes">
                    <div class="left_youMayLikeListImg">
                        <img src="${primeraUrl}" alt="list">
                    </div>
                    <div class="left_youMayLikeListDescription">
                        <h3>${nombre}</h3>
                        <p>${artista}</p>
                    </div>
                    <div class="left_youMayLikeListTime">
                        <h3>${minutes}:${seconds}</h3>
                    </div>
                </div>
                `;
            });

            if (templates === '') {
                console.log('No se encontraron canciones para los géneros proporcionados');
            }
            this.innerHTML = templates;
        } catch (error) {
            console.error(error);
        }
    }
}

customElements.define('may-like', MayLike);







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

