import * as UI from './ui.js';
import { API } from './api.js';

UI.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Read the form data
    const artistName = UI.artistInput.value,
          songName = UI.songInput.value;

    //console.log(artistName, songName);
    
    // Validate the form
    if (artistName === '' || songName === '') {
        UI.messageDiv.innerHTML = 'Не все поля заполненны';
        UI.messageDiv.classList.add('error');
        setTimeout(() => {
            UI.messageDiv.innerHTML = '';
            UI.messageDiv.classList.remove('error');
        }, 1500);
    } else {
        // Query the REST API
        const lyric = new API(artistName, songName);
        lyric.queryAPI()
            .then(data => {
                if (data.lyric.lyrics) {
                    let result = data.lyric.lyrics;                
                    UI.resultDiv.textContent = result;
                } else {
                    // No results found
                    UI.messageDiv.innerHTML = 'Песнь не найдена';
                    UI.messageDiv.classList.add('error');
                    setTimeout(() => {
                        UI.messageDiv.innerHTML = '';
                        UI.messageDiv.classList.remove('error');
                        UI.searchForm.reset();
                    }, 1500);
                }
                
            })
        
        
    }
})