class AlbumInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
            .left_baseAlbum{
                display: flex;
                flex-direction: row;
                /* border: 1px solid purple; */
                width: 100%;
                justify-content: baseline;
                align-items: center;
                height: 25vh;
                margin-top: 3%;
              }
            
              .left_baseAlbum:hover{
                cursor: pointer;
              }
            
              .left_baseAlbum2{
                display: flex;
                flex-direction: row;
                /* border: 1px solid purple; */
                width: 100%;
                justify-content: baseline;
                align-items: center;
                height: 25vh;
                margin-top: 4%;
              }
            
              .left_albumContent:hover{
                cursor: pointer;
                border-radius: 5%;
                border: 1px solid rgba(255, 255, 255, 0.205);
              }
            
              .left_album2:hover{
                cursor: pointer;
              }
            
              .left_album{
                display: flex;
                flex-direction: row;
                /* border: 1px solid lightblue; */
                justify-content: center;
                align-items: flex-start;
                padding: 0;
                width: 40%;
                height: 25vh;
                margin-left: 7%;
              }
            
              .left_album2{
                display: flex;
                flex-direction: row;
                /* border: 1px solid lightblue; */
                justify-content: center;
                align-items: flex-start;
                padding: 0;
                width: 40%;
                height: 25vh;
                margin-left: 6%;
              }
            
              .left_albumContent{
                display: flex;
                flex-direction: column;
              }
            
              .left_albumContent img{
                display: flex;
                width: 100%;
                height: 50%;
                border-radius: 5%;
                justify-content: center;
                align-items: center;
                padding: 0;
                margin: 0;
              }
            
              .left_albumContent h2{
                display: flex;
                font-size: 120%;
                margin-top: 3%;
              }
            
              .left_albumContent p{
                display: flex;
                margin-top: -9%;
                font-size: 90%;
                color: #949faa;
              }
            </style>
            <section class="left_baseAlbum">
                <div class="left_album">
                    <div id="album" class="left_albumContent">
                        <img src="storage/img/album.png" alt="album">
                        <h2>After Hours</h2>
                        <p>The weeknd</p>
                    </div>
                </div>
                <div class="left_album2">
                    <div class="left_albumContent">
                        <img id="album2" src="storage/img/album2.png" alt="album">
                        <h2>Suicide Squad</h2>
                        <p>Various Artists</p>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('album-info', AlbumInfo);

class AlbumInfo2 extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
            .left_baseAlbum{
                display: flex;
                flex-direction: row;
                /* border: 1px solid purple; */
                width: 100%;
                justify-content: baseline;
                align-items: center;
                height: 25vh;
                margin-top: 3%;
              }
            
              .left_baseAlbum:hover{
                cursor: pointer;
              }
            
              .left_baseAlbum2{
                display: flex;
                flex-direction: row;
                /* border: 1px solid purple; */
                width: 100%;
                justify-content: baseline;
                align-items: center;
                height: 25vh;
                margin-top: 4%;
              }
            
              .left_albumContent:hover{
                cursor: pointer;
                border-radius: 5%;
                border: 1px solid rgba(255, 255, 255, 0.205);
              }
            
              .left_album2:hover{
                cursor: pointer;
              }
            
              .left_album{
                display: flex;
                flex-direction: row;
                /* border: 1px solid lightblue; */
                justify-content: center;
                align-items: flex-start;
                padding: 0;
                width: 40%;
                height: 25vh;
                margin-left: 7%;
              }
            
              .left_album2{
                display: flex;
                flex-direction: row;
                /* border: 1px solid lightblue; */
                justify-content: center;
                align-items: flex-start;
                padding: 0;
                width: 40%;
                height: 25vh;
                margin-left: 6%;
              }
            
              .left_albumContent{
                display: flex;
                flex-direction: column;
              }
            
              .left_albumContent img{
                display: flex;
                width: 100%;
                height: 50%;
                border-radius: 5%;
                justify-content: center;
                align-items: center;
                padding: 0;
                margin: 0;
              }
            
              .left_albumContent h2{
                display: flex;
                font-size: 120%;
                margin-top: 3%;
              }
            
              .left_albumContent p{
                display: flex;
                margin-top: -9%;
                font-size: 90%;
                color: #949faa;
              }
            </style>
            <section class="left_baseAlbum2">
                <div class="left_album">
                    <div class="left_albumContent">
                        <img src="storage/img/album3.png" alt="album">
                        <h2>Exodus</h2>
                        <p>Exo</p>
                    </div>
                </div>
                <div class="left_album2">
                    <div class="left_albumContent">
                        <img src="storage/img/album4.png" alt="album">
                        <h2>Blurryface</h2>
                        <p>Twenty One Pilots</p>
                    </div>
                </div>
            </section> 
        `;
    }
}

customElements.define('album-info2', AlbumInfo2);


function changeSong(){
    // Obtenemos la imagen por su ID
    const boxSong = document.getElementById('#album');
    
    // Agregamos un evento de clic a la imagen
    boxSong.addEventListener('click', () => {
        // Obtenemos el elemento my-frame por su clase
        const myFrame = document.querySelector('.section_middleFrame');
        // Cambiamos el atributo uri del my-frame con la URL de la nueva canción
        myFrame.setAttribute('uri', 'spotify:track:6b5P51m8xx2XA6U7sdNZ5E');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Obtenemos la imagen por su ID
    const image = document.getElementById('imageId');
    // Agregamos un evento de clic a la imagen
    image.addEventListener('click', changeSong);
});

