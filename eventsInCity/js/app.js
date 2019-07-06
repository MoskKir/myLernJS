const eventbrite = new EventBrite();
const ui = new UI();

document.getElementById('submitBtn').addEventListener('click', (event) => {
    event.preventDefault();

    // Get values from form
    const eventName = document.getElementById('event-name').value;
    const category = document.getElementById('category').value;

    console.log(eventName + ' + ' + category);
    if (eventName !== '') {
        eventbrite.queryAPI(eventName, category)
            .then(events => {
                
                // Check for events
                const eventsList = events.events.events;
                if (eventsList.length !== 0) {
                    ui.displayEvents(eventsList);
                } else {
                    ui.printMessage('Не найдено ни одного события', 'alert alert-danger text-center mt-4');
                }
            })
    } else {
        // Print the message
        ui.printMessage('Добавьте Событие или город', 'alert alert-danger text-center mt-4');
    }
})