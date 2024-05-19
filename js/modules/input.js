// --------------------- INPUT 1  ---------------------------

class AlbumFilter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .form {
            --input-text-color: #fff;
            --input-bg-color: #1f1f1f;
            --focus-input-bg-color: transparent;
            --text-color: #949faa;
            --active-color: #fff;
            --width-of-input: 140%;
            height: 100%;
            --inline-padding-of-input: 1.2em;
            --gap: 0.9rem;
            margin-left: 5%;
          }
  
          /* form style */
          .form {
            font-size: 1rem;
            display: flex;
            gap: 0.5rem;
            align-items: center;
            width: var(--width-of-input);
            position: relative;
            isolation: isolate;
          }
  
          /* a fancy bg for showing background and border when focus. */
          .fancy-bg {
            position: absolute;
            width: 100%;
            inset: 0;
            background: var(--input-bg-color);
            border-radius: 30px;
            height: 100%;
            z-index: -1;
            pointer-events: none;
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
          }
  
          /* label styling */
          label {
            width: 100%;
            padding: 0.8em;
            height: 40px;
            padding-inline: var(--inline-padding-of-input);
            display: flex;
            align-items: center;
          }
          
          .search, .close-btn {
            position: absolute;
          }
  
          /* styling search-icon */
          .search {
            fill: var(--text-color);
            left: var(--inline-padding-of-input);
          }
  
          /* svg -- size */
          svg {
            width: 17px;
            display: block;
          }
  
          /* styling of close button */
          .close-btn {
            border: none;
            right: var(--inline-padding-of-input);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            padding: 0.1em;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--active-color);
            opacity: 0;
            visibility: hidden;
          }
  
          /* styling of input */
          .input {
            color: var(--input-text-color);
            width: 100%;
            margin-inline: min(2em,calc(var(--inline-padding-of-input) + var(--gap)));
            background: none;
            border: none;
          }
          
          .input:focus {
            outline: none;
          }
          
          .input::placeholder {
            color: var(--text-color)
          }
  
          /* input background change in focus */
          .input:focus ~ .fancy-bg {
            border: 1px solid var(--active-color);
            background: var(--focus-input-bg-color);
          }
  
          /* search icon color change in focus */
          .input:focus ~ .search {
            fill: var(--active-color);
          }
  
          /* showing close button when typing */
          .input:valid ~ .close-btn {
            opacity: 1;
            visibility: visible;
          }
  
          /* this is for the default background in input,when selecting autofill options -- you can remove this code if you do not want to override the browser style.  */
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
            -webkit-transition-delay: 9999s;
          }
        </style>
        <label class="form" for="search">
            <input class="input albumSearch" type="text" required="" placeholder="What do you want to listen to?" id="albumSearch">
            <div class="fancy-bg"></div>
            <div class="search">
                <svg viewBox="0 0 24 24" aria-hidden="true" class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
                    <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                </svg>
            </div>
            <button class="close-btn" type="reset">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </label>
      `;
      this.albums = []; // Array para almacenar los álbumes cargados desde el JSON
    }
  
    connectedCallback() {
      this.albumSearch = this.shadowRoot.querySelector('.albumSearch');
      this.albumSearchBTN = this.shadowRoot.querySelector('.albumSearchBTN');
  
      this.albumSearch.addEventListener('input', this.handleInput.bind(this));
      // También necesitas añadir el evento input aquí para detectar cuando se modifique el campo de búsqueda.
  
      // Cargar los álbumes desde el archivo JSON cuando se cargue el componente
      this.loadAlbums();
    }
  
    async loadAlbums() {
      try {
        const response = await fetch('./db/albums.json');
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }
        const data = await response.json();
        this.albums = data.albums;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    handleInput() {
      const query = this.albumSearch.value.trim().toLowerCase();
      if (query.length === 0) {
        this.renderAlbums(this.albums); // Mostrar todos los álbumes si la búsqueda está vacía
        return;
      }
  
      // Filtrar álbumes que coincidan con el término de búsqueda
      const filteredAlbums = this.albums.filter(album => album.name.toLowerCase().includes(query));
      this.renderAlbums(filteredAlbums);
    }
  
    renderAlbums(albums) {
        const albumList = this.shadowRoot.querySelector('#albumList');
        albumList.innerHTML = ''; // Limpiar la lista antes de mostrar los nuevos resultados
        const ol = document.createElement('ol');
        albums.forEach(album => {
          const li = document.createElement('li');
          li.textContent = album.name;
          ol.appendChild(li);
        });
        albumList.appendChild(ol);
      }
  }
  
  customElements.define('album-filter', AlbumFilter);

  

// ----------------------- BUSCADOR DE EN MEDIO ------------------------------



  class SongFilter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
            .form {
                --input-text-color: #fff;
                --input-bg-color: #1f1f1f;
                --focus-input-bg-color: transparent;
                --text-color: #949faa;
                --active-color: #fff;
                --width-of-input: 75%;
                height: 30px;
                --inline-padding-of-input: 1.2em;
                --gap: 0.9rem;
                margin-left: 10%;
            }
            
            /* Establecer anchura y margen en valores absolutos */
            .form input[type="text"] {
                width: 300px; /* Por ejemplo, establecer un ancho absoluto */
                margin-left: 50px; /* Por ejemplo, establecer un margen absoluto */
                height:40px
            }

                .form {
                    font-size: 1rem;
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                    width: var(--width-of-input);
                    position: relative;
                    isolation: isolate;
                }

                .fancy-bg {
                    position: absolute;
                    width: 100%;
                    inset: 0;
                    background: var(--input-bg-color);
                    border-radius: 30px;
                    height: 100%;
                    z-index: -1;
                    pointer-events: none;
                    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
                }

                label {
                    width: 100%;
                    padding: 0.8em;
                    height: 40%;
                    padding-inline: var(--inline-padding-of-input);
                    display: flex;
                    align-items: center;
                }

                .search, .close-btn {
                    position: absolute;
                }

                .search {
                    fill: var(--text-color);
                    left: var(--inline-padding-of-input);
                }

                svg {
                    width: 17px;
                    display: block;
                }

                .close-btn {
                    border: none;
                    right: var(--inline-padding-of-input);
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    padding: 0.1em;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--active-color);
                    opacity: 0;
                    visibility: hidden;
                }

                .input {
                    color: var(--input-text-color);
                    width: 100%;
                    margin-inline: min(2em,calc(var(--inline-padding-of-input) + var(--gap)));
                    background: none;
                    border: none;
                }

                .input:focus {
                    outline: none;
                }

                .input::placeholder {
                    color: var(--text-color);
                }

                .input:focus ~ .fancy-bg {
                    border: 1px solid var(--active-color);
                    background: var(--focus-input-bg-color);
                }

                .input:focus ~ .search {
                    fill: var(--active-color);
                }

                .input:valid ~ .close-btn {
                    opacity: 1;
                    visibility: visible;
                }

                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus,
                input:-webkit-autofill:active {
                    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                    -webkit-transition-delay: 9999s;
                }

                @media screen and (max-width: 768px) {
                    .form {
                        --input-text-color: #fff;
                        --input-bg-color: #1f1f1f;
                        --focus-input-bg-color: transparent;
                        --text-color: #949faa;
                        --active-color: #fff;
                        --width-of-input: 75%;
                        height: 3%;
                        --inline-padding-of-input: 1.2em;
                        --gap: 0.9rem;
                        margin-left: 10%;
                    }
                }

            </style>
            <label class="form" for="search">
                <input class="input songSearch" type="text" required="" placeholder="What do you want to listen to?" id="songSearch">
                <div class="fancy-bg"></div>
                <div class="search">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                </div>
                <button class="close-btn" type="reset">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </label>
            <div id="songList"></div>
        `;
    }

    connectedCallback() {
        this.songSearch = this.shadowRoot.querySelector('.songSearch');
        this.songSearch.addEventListener('input', this.handleInput.bind(this));
        this.songSearch.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleInput() {
        const query = this.songSearch.value.trim().toLowerCase();
        if (query.length > 0) {
            this.searchAndDisplaySongs(query);
        } else {
            this.clearResults();
        }
    }

    async searchAndDisplaySongs(query) {
        const codeBase = query.replace(/\s/g, '%20');
        const url = `https://spotify23.p.rapidapi.com/search/?q=${codeBase}&type=tracks&offset=0&limit=1&numberOfTopResults=1`;
        const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '7286905108msh5eadf69b458c83fp1100ccjsn59531d8846b0',
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const track = result.tracks.items[0].data;
            if (track) {
                this.playSong(track);
            } else {
                this.clearResults();
            }
        } catch (error) {
            console.error(error);
            alert('Error searching for track');
        }
    }

    playSong(song) {
        const trackUri = song.uri;
        const myFrame = document.querySelector('my-frame');
        myFrame.setAttribute('uri', trackUri);
    }

    clearResults() {
        const songList = this.shadowRoot.querySelector('#songList');
        songList.innerHTML = '';
    }

    handleSubmit(event) {
        event.preventDefault();
        const query = this.songSearch.value.trim();
        if (query) {
            this.searchAndDisplaySongs(query);
        }
    }
}

customElements.define('song-filter', SongFilter);




// -------------------------- BUSCADOR DERECHA -------------------------------


class SearchSongs extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      .form {
          --input-text-color: #fff;
          --input-bg-color: #1f1f1f;
          --focus-input-bg-color: transparent;
          --text-color: #949faa;
          --active-color: #fff;
          --width-of-input: 75%;
          height: 10px;
          --inline-padding-of-input: 1.2em;
          --gap: 0.9rem;
          margin-left: 10%;
      }

      .form {
          font-size: 1rem;
          display: flex;
          gap: 0.5rem;
          align-items: center;
          width: var(--width-of-input);
          position: relative;
          isolation: isolate;
      }

      .fancy-bg {
          position: absolute;
          width: 100%;
          inset: 0;
          background: var(--input-bg-color);
          border-radius: 30px;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      }

      label {
          width: 100%;
          padding: 0.8em;
          height: 40%;
          padding-inline: var(--inline-padding-of-input);
          display: flex;
          align-items: center;
      }

      .search, .close-btn {
          position: absolute;
      }

      .search {
          fill: var(--text-color);
          left: var(--inline-padding-of-input);
      }

      svg {
          width: 17px;
          display: block;
      }

      .close-btn {
          border: none;
          right: var(--inline-padding-of-input);
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          padding: 0.1em;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--active-color);
          opacity: 0;
          visibility: hidden;
      }

      .input {
          color: var(--input-text-color);
          width: 100%;
          margin-inline: min(2em,calc(var(--inline-padding-of-input) + var(--gap)));
          background: none;
          border: none;
      }

      .input:focus {
          outline: none;
      }

      .input::placeholder {
          color: var(--text-color);
      }

      .input:focus ~ .fancy-bg {
          border: 1px solid var(--active-color);
          background: var(--focus-input-bg-color);
      }

      .input:focus ~ .search {
          fill: var(--active-color);
      }

      .input:valid ~ .close-btn {
          opacity: 1;
          visibility: visible;
      }

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
          -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
          -webkit-transition-delay: 9999s;
      }

      @media screen and (max-width: 768px) {
        .form {
            --input-text-color: #fff;
            --input-bg-color: #1f1f1f;
            --focus-input-bg-color: transparent;
            --text-color: #949faa;
            --active-color: #fff;
            --width-of-input: 75%;
            height: 2%;
            --inline-padding-of-input: 1.2em;
            --gap: 0.9rem;
            margin-left: 10%;
        }
    }
  </style>
  <label class="form" for="search">
      <input class="input songSearch" type="text" required="" placeholder="What do you want to listen to?" id="songSearch">
      <div class="fancy-bg"></div>
      <div class="search">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr">
              <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
          </svg>
      </div>
      <button class="close-btn" type="reset">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
      </button>
  </label>
  <div id="songList"></div>
      `;
  }

  connectedCallback() {
      this.songSearch = this.shadowRoot.querySelector('.songSearch');
      this.songSearch.addEventListener('input', this.handleInput.bind(this));
  }

  async handleInput() {
      const query = this.songSearch.value.trim().toLowerCase();
      if (query.length > 0) {
          this.searchAndDisplaySongs(query);
      }
  }

  async searchAndDisplaySongs(query) {
      const codeBase = query.replace(/\s/g, '%20');
      const url = `https://spotify23.p.rapidapi.com/search/?q=${codeBase}&type=tracks&offset=0&limit=50&numberOfTopResults=50`;
      const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '7286905108msh5eadf69b458c83fp1100ccjsn59531d8846b0',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
          }
      };

      try {
          const response = await fetch(url, options);
          const result = await response.json();
          const tracks = result.tracks.items.map(item => item.data);
          if (tracks.length > 0) {
              this.updateTrackList(tracks);
          }
      } catch (error) {
          console.error(error);
          alert('Error searching for tracks');
      }
  }

      updateTrackList(tracks) {
        const trackList = document.querySelector('track-list');
        trackList.updateTracks(tracks);

        const images = trackList.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('click', () => {
                const uri = img.dataset.uri;
                const myFrame = document.querySelector('my-frame');
                myFrame.setAttribute('uri', uri); // Establecer el URI de la canción en el my-frame al hacer clic en la imagen
            });
        });
    }


}

customElements.define('search-songs', SearchSongs);


