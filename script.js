// DOM stuff here

document.addEventListener('DOMContentLoaded', () => {
    const songForm = document.getElementById('songForm');
    const songTableBody = document.querySelector('table tbody');

    // Load songs from local storage
    loadSongsFromLocalStorage();

    // Handle form submission
    songForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const songData = {
            title: songForm.songTitle.value,
            artist: songForm.artist.value,
            album: songForm.album.value,
            year: songForm.year.value,
            genre: songForm.genre.value,
            duration: songForm.duration.value
        };
        addSongToTable(songData);
        saveSongToLocalStorage(songData);
        songForm.reset();
    });

    // Add song to table
    function addSongToTable(songData) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${songData.title}</td>
            <td>${songData.artist}</td>
            <td>${songData.album}</td>
            <td>${songData.year}</td>
            <td>${songData.genre}</td>
            <td>${songData.duration}</td>
            <td><button type="button" class="btn btn-sm btn-danger delete-btn">Delete</button></td>
        `;
        songTableBody.appendChild(row);

        // Add delete functionality
        row.querySelector('.delete-btn').addEventListener('click', () => {
            row.remove();
            deleteSongFromLocalStorage(songData);
        });
    }

    // Save song to local storage
    function saveSongToLocalStorage(songData) {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.push(songData);
        localStorage.setItem('songs', JSON.stringify(songs));
    }

    // Load songs from local storage
    function loadSongsFromLocalStorage() {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.forEach(songData => addSongToTable(songData));
    }

    // Delete song from local storage
    function deleteSongFromLocalStorage(songData) {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs = songs.filter(song => song.title !== songData.title || song.artist !== songData.artist);
        localStorage.setItem('songs', JSON.stringify(songs));
    }
});