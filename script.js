const canciones = [
    { id: 1, titulo: "Midnight City", artista: "M83", imagen: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 2, titulo: "Blinding Lights", artista: "The Weeknd", imagen: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: 3, titulo: "Starboy", artista: "Daft Punk", imagen: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: 4, titulo: "Lose Yourself", artista: "Eminem", imagen: "https://images.unsplash.com/photo-1514525253361-b83f859b21c0?w=300", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
];

let playlist = JSON.parse(localStorage.getItem('myPlaylist')) || [];
const player = document.getElementById('audio-player');
const btnMasterPlay = document.getElementById('btn-master-play');

function renderSongs(lista = canciones) {
    document.getElementById('contenedor-productos').innerHTML = lista.map(s => `
        <div class="col-6 col-md-4">
            <div class="card song-card" onclick="playSong(${s.id})">
                <div class="img-container"><img src="${s.imagen}"></div>
                <div class="p-2 text-center">
                    <div class="fw-bold small text-truncate">${s.titulo}</div>
                    <div class="text-secondary small mb-2">${s.artista}</div>
                    <button onclick="event.stopPropagation(); addToPlaylist(${s.id})" class="btn btn-outline-success btn-sm w-100 rounded-pill">+ Lista</button>
                </div>
            </div>
        </div>`).join('');
}

function playSong(id) {
    const s = canciones.find(x => x.id === id);
    document.getElementById('current-title').innerText = s.titulo;
    document.getElementById('current-artist').innerText = s.artista;
    document.getElementById('current-img').src = s.imagen;
    player.src = s.url;
    player.play();
    btnMasterPlay.className = "bi bi-pause-circle-fill btn-play-sm";
    mostrarAviso(`Sonando: ${s.titulo}`);
}

function togglePlay() {
    if (!player.src) return;
    if (player.paused) {
        player.play();
        btnMasterPlay.className = "bi bi-pause-circle-fill btn-play-sm";
    } else {
        player.pause();
        btnMasterPlay.className = "bi bi-play-circle-fill btn-play-sm";
    }
}

function addToPlaylist(id) {
    const s = canciones.find(x => x.id === id);
    if (!playlist.find(x => x.id === id)) {
        playlist.push(s);
        save();
        mostrarAviso("Añadida ✅");
    }
}

function removeFromPlaylist(id) {
    playlist = playlist.filter(x => x.id !== id);
    save();
}

function save() {
    localStorage.setItem('myPlaylist', JSON.stringify(playlist));
    actualizarInterfaz();
}

function actualizarInterfaz() {
    document.getElementById('cart-count').innerText = playlist.length;
    document.getElementById('lista-carrito').innerHTML = playlist.length ? playlist.map(s => `
        <div class="d-flex justify-content-between align-items-center mb-3 bg-white bg-opacity-10 p-2 rounded">
            <div class="d-flex align-items-center">
                <img src="${s.imagen}" width="40" class="rounded me-2">
                <div class="small fw-bold">${s.titulo}</div>
            </div>
            <i class="bi bi-trash text-danger" onclick="removeFromPlaylist(${s.id})"></i>
        </div>`).join('') : '<p class="text-center">Lista vacía</p>';
}

function filtrar() {
    const t = document.getElementById('buscador').value.toLowerCase();
    renderSongs(canciones.filter(s => s.titulo.toLowerCase().includes(t) || s.artista.toLowerCase().includes(t)));
}

function mostrarAviso(m) {
    const t = document.createElement('div');
    t.className = 'custom-toast';
    t.innerText = m;
    document.getElementById('toast-container').appendChild(t);
    setTimeout(() => t.remove(), 2000);
}

document.addEventListener('DOMContentLoaded', () => { renderSongs(); actualizarInterfaz(); });