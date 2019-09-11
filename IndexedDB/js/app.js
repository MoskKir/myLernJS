let DB;

const form = document.querySelector('form'),
      petName = document.querySelector('#pet-name'),
      owenerName = document.querySelector('#owner-name'),
      phone = document.querySelector('#phone'),
      date = document.querySelector('#date'),
      hour = document.querySelector('#hour'),
      symptoms = document.querySelector('#symptoms'),
      appointments = document.querySelector('#appointments'),
      appointmentTitle = document.querySelector('#appointment-title');

document.addEventListener('DOMContentLoaded', () => {
    // Create the database
    let AppointmentDB = window.indexedDB.open('appointments', 1);

    // If there's an error
    AppointmentDB.onerror = function() {
        console.log('There was an error');
    }
    // If everything is fine, assing the result to the isntance
    AppointmentDB.onsuccess = function() {
        // console.log('Database ready');

        // Save the result
        DB = AppointmentDB.result;

        // Display the appointments
        displayAppointments();
    }

    // This method runs once (great for creating the schema)
    AppointmentDB.onupgradeneeded = function(event) {
        // The event will be the database
        let db = event.target.result;

        // Create an object store,
        // keypath is going to be the Indexes
        let objectStore = db.createObjectStore('appointments', { keyPath: 'key', autoIncrement: true });

        //createindex: 1. field name 2. keypath 3. options
        objectStore.createIndex('petname', 'petname', { unique: false } );
        objectStore.createIndex('ownername', 'ownername', { unique: false } );
        objectStore.createIndex('phone', 'phone', { unique: false } );
        objectStore.createIndex('date', 'date', { unique: false } );
        objectStore.createIndex('hour', 'hour', { unique: false } );
        objectStore.createIndex('symptoms', 'symptoms', { unique: false } );

        console.log('Database ready and fields created');
    }

    form.addEventListener('submit', addAppointment)

    function addAppointment(event) {
        event.preventDefault();

        // Create a new object with the form info
        let newAppointment = {
            petname : petName.value,
            ownername : owenerName.value,
            phone : phone.value,
            date : date.value,
            hour : hour.value,
            symptoms : symptoms.value
        }

        //console.log(newAppointment);
        
        // Insert the object into the database
        let transaction = DB.transaction(['appointments'], 'readwrite');
        let objectStore = transaction.objectStore('appointments');

        let request = objectStore.add(newAppointment);

        // On success
        request.onsuccess = () => {
            form.reset();
        }
        transaction.oncomplete = () => {
            console.log('Новая запись на прием добавлена');

            displayAppointments();
        }
        transaction.onerror = () => {
            console.log('Ошибка, попробуйте еще раз')
        }  
    }

    function displayAppointments() {
        // Clear the previous appoints
        while(appointments.firstChild) {
            appointments.removeChild(appointments.firstChild);
        }

        // Create the object store
        let objectStore = DB.transaction('appointments').objectStore('appointments');

        objectStore.openCursor().onsuccess = function(event) {
            // Assign the current cursor
            let cursor = event.target.result;

            if(cursor) {
                let appointmentHTML = document.createElement('li');
                appointmentHTML.setAttribute('data-appointment-id', cursor.value.key);
                appointmentHTML.classList.add('list-group-item');

                appointmentHTML.innerHTML = `
                
                    <p class="font-weight-bold">Pet Name: <span class="font-weight-normal">${cursor.value.petname}<span></p>
                    <p class="font-weight-bold">Owner name: <span class="font-weight-normal">${cursor.value.ownername}<span></p>
                    <p class="font-weight-bold">Phone: <span class="font-weight-normal">${cursor.value.phone}<span></p>
                    <p class="font-weight-bold">Date: <span class="font-weight-normal">${cursor.value.date}<span></p>
                    <p class="font-weight-bold">Hour: <span class="font-weight-normal">${cursor.value.hour}<span></p>
                    <p class="font-weight-bold">Symptoms: <span class="font-weight-normal">${cursor.value.symptoms}<span></p>
                    
                `;
                // Remove button
                const removeBTN = document.createElement('button');
                removeBTN.classList.add('btn', 'btn-danger');
                removeBTN.innerHTML = '<span aria-hidden="true">x</span> Remove';
                removeBTN.onclick = removeAppointment;


                // Add this into the HTML
                appointmentHTML.appendChild(removeBTN);
                appointments.appendChild(appointmentHTML);

                cursor.continue();
            } else {
                if(!appointments.firstChild) {
                    appointmentTitle.textContent = 'Add a new appointment';
                    let noAppointment = document.createElement('p');
                    noAppointment.classList.add('text-center');
                    noAppointment.textContent = 'No results found';
                    appointments.appendChild(noAppointment);
                } else {
                    appointmentTitle.textContent = 'Manage your Appointments';
                }
            }
        }
    }

    function removeAppointment(event) {
        let appointmentID = Number(event.target.parentElement.getAttribute('data-appointment-id'));

        let transaction = DB.transaction(['appointments'], 'readwrite');
        let objectStore = transaction.objectStore('appointments');
        objectStore.delete(appointmentID);

        transaction.oncomplete = () => {
            event.target.parentElement.parentElement.removeChild(event.target.parentElement);

            if(!appointments.firstChild) {
                appointmentTitle.textContent = 'Add a new appointment';
                let noAppointment = document.createElement('p');
                noAppointment.classList.add('text-center');
                noAppointment.textContent = 'No results found';
                appointments.appendChild(noAppointment);
            } else {
                appointmentTitle.textContent = 'Manage your Appointments';
            }
        }
    }

});