// Instanciate the classes
const cryptoAPI = new CryptoAPI();
const ui = new UI();

// Create the variables
const form = document.getElementById('form');


// Add event listener
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Read currency
    const currencySelect = document.getElementById('currency').value;
    // Read cryptocyrrency
    const cryptoCyrrencySelect = document.getElementById('cryptocurrency').value;

    // Validate that the selects have something
    if (currencySelect === '' || cryptoCyrrencySelect === '') {
        ui.printMessage('Не все поля заполненны', 'deep-orange darken-4 card-panel');
    } else {
        // Query API
        cryptoAPI.queryAPI(currencySelect, cryptoCyrrencySelect)
            .then(data => {
                console.log(data.result[0]);
                ui.displayResult(data.result[0], currencySelect);
            }) 
    }
    
})