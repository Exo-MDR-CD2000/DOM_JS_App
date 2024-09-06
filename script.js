// DOM stuff here

document.addEventListener('DOMContentLoaded', () => {
    const songForm = document.querySelector('#songForm'); // targets song form
    const songTableBody = document.querySelector('table tbody'); // targets table body

    // Load songs from local storage
    loadSongsFromLocalStorage();

    /**
     * songForm event listener below with a submit event
     * Prevents default form submission (page reload)
     * Grabs song data from form
     * Adds song to table
     * Saves song to local storage
     * Resets form after submission
     */
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


    /**
     * addSongToTable function below
     * We create a new row element
     * then use innerHTML to add song data to the row
     * Use appendChild to add the row to the table body
     * There is documentation online about innerHTML security risks, but for this project it is fine
     */
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


// read into local storage tutorials and how to use it for submission