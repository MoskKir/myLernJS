document.getElementById('button').addEventListener('click', loadData);

function loadData() {
    // Create the new XMLHTTPRequest object
    const xhr = new XMLHttpRequest();

    // Open the conection
    xhr.open('GET', 'data.txt', true);

    // Execution of the ajax call
    xhr.onload = function() {
        if (this.status === 200) {
            document.getElementById('output').innerHTML = `<p>${this.responseText}</p>`;
        }
    }

    // Send the request
    xhr.send();
}