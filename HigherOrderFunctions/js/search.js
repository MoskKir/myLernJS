const years = document.createElement('option');
const  maxyear = new Date().getFullYear();
let  minyear = maxyear - 10;

for(let i = maxyear; i >  minyear; i--) {
    let option =  document.createElement('option');
    option.value = i;
    option.innerText = i;
    document.querySelector('#year').appendChild(option);
}

function getCars() {
    return [
        {
            make: 'BMW',
            carmodel: 'Serie 3',
            year: 2012,
            price: 30000,
            doors: 4,
            color: 'White',
            transmission: 'automatic'
        },
        { 
            make: 'Audi', 
            carmodel: 'A4', 
            year: 2018, 
            price: 40000, 
            doors: 4, 
            color: 'Black', 
            transmission: 'automatic' 
        },
        {
            make: 'Ford',
            carmodel: 'Mustang',
            year: 2015,
            price: 20000,
            doors: 2,
            color: 'White',
            transmission: 'automatic'
        },
        { 
            make: 'Audi', 
            carmodel: 'A6', 
            year: 2010, 
            price: 35000, 
            doors: 4, 
            color: 'Black', 
            transmission: 'automatic' },
        {
            make: 'BMW',
            carmodel: 'Serie 5',
            year: 2016,
            price: 70000,
            doors: 4,
            color: 'Red',
            transmission: 'automatic'
        },
        {
            make: 'Mercedes Benz',
            carmodel: 'Clase C',
            year: 2015,
            price: 25000,
            doors: 4,
            color: 'White',
            transmission: 'automatic'
        },
        {
            make: 'Chevrolet',
            carmodel: 'Camaro',
            year: 2018,
            price: 60000,
            doors: 2,
            color: 'Red',
            transmission: 'manual'
        },
        { 
            make: 'Ford', 
            carmodel: 'Mustang', 
            year: 2019, 
            price: 80000, 
            doors: 2, 
            color: 'Red', 
            transmission: 'manual' },
        {
            make: 'Dodge',
            carmodel: 'Challenger',
            year: 2017,
            price: 40000,
            doors: 4,
            color: 'White',
            transmission: 'automatic'
        },
        { 
            make: 'Audi', 
            carmodel: 'A3', 
            year: 2017, 
            price: 55000, 
            doors: 2, 
            color: 'Black', 
            transmission: 'manual' 
        },
        {
            make: 'Dodge',
            carmodel: 'Challenger',
            year: 2012,
            price: 25000,
            doors: 2,
            color: 'Red',
            transmission: 'manual'
        },
        {
            make: 'Mercedes Benz',
            carmodel: 'Clase C',
            year: 2018,
            price: 45000,
            doors: 4,
            color: 'Blue',
            transmission: 'automatic'
        },
        {
            make: 'BMW',
            carmodel: 'Serie 5',
            year: 2019,
            price: 90000,
            doors: 4,
            color: 'White',
            transmission: 'automatic'
        },
        { 
            make: 'Ford',
            carmodel: 'Mustang',
            year: 2017,
            price: 60000,
            doors: 2,
            color: 'Black',
            transmission: 'manual' 
        },
        {
            make: 'Dodge',
            carmodel: 'Challenger',
            year: 2015,
            price: 35000,
            doors: 2,
            color: 'Blue',
            transmission: 'automatic'
        },
        {
            make: 'BMW',
            carmodel: 'Serie 3',
            year: 2018,
            price: 50000,
            doors: 4,
            color: 'White',
            transmission: 'automatic'
        },
        {
            make: 'BMW',
            carmodel: 'Serie 5',
            year: 2017,
            price: 80000,
            doors: 4,
            color: 'Black',
            transmission: 'automatic'
        },
        {
            make: 'Mercedes Benz',
            carmodel: 'Clase C',
            year: 2018,
            price: 40000,
            doors: 4,
            color: 'White',
            transmission: 'automatic'
        },
        { 
            make: 'Audi', 
            carmodel: 'A4', 
            year: 2016, 
            price: 30000, 
            doors: 4, 
            color: 'Blue', 
            transmission: 'automatic'
        }
    ];
}

// Search terms object
let searchFields = {
    make: '',
    year: '',
    min: '',
    max: '',
    doors: '',
    transmission: '',
    color: ''
}

// Event listener for DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    const cars = getCars();
    showCars(cars);
});

// Event listeners for the form elements
const make = document.querySelector('#make');
make.addEventListener('input', (event) => {
    // console.log(event.target.value);
    searchFields.make = event.target.value;
    // Execute the filter cars based on the items that we have in the search fields object
    filterCars();
});

const year = document.querySelector('#year');
year.addEventListener('input', (event) => {
    searchFields.year = Number(event.target.value);
    // Execute the filter cars based on the items that we have in the search fields object
    filterCars();
});

const min = document.querySelector('#min');
min.addEventListener('input', (event) => {
    searchFields.min = Number(event.target.value);
    // Execute the filter cars based on the items that we have in the search fields object
    filterCars();
});

const max = document.querySelector('#max');
max.addEventListener('input', (event) => {
    searchFields.max = Number(event.target.value);
    // Execute the filter cars based on the items that we have in the search fields object
    filterCars();
});

const doors = document.querySelector('#doors');
doors.addEventListener('input', (event) => {
    searchFields.doors = Number(event.target.value);
    // Execute the filter cars based on the items that we have in the search fields object
    filterCars();
});

const transmission = document.querySelector('#transmission');
transmission.addEventListener('input', (event) => {
    searchFields.transmission = event.target.value;
    // Execute the filter cars based on the items that we have in the search fields object
    filterCars();
});

const color = document.querySelector('#color');
color.addEventListener('input', (event) => {
    searchFields.color = event.target.value;
    // Execute the filter cars based on the items that we have in the search fields object
    filterCars();
});



function clearHTML() {
    // Select the container
    const container = document.querySelector('#result');

    // Clear the HTML
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function showCars(cars) {
    // Get the container
    const container = document.querySelector('#result');

    // Clear previous HTML
    clearHTML();

    // Build the HTML and print the data in the container
    cars.forEach(car => {
        const carHTML = document.createElement('p');
        carHTML.innerHTML = `
            ${car.make} ${car.model} - ${car.year} - ${car.doors} Door - Transmission: ${car.transmission} - Price: ${car.price} - Color: ${car.color}
        `;
        container.appendChild(carHTML);
    });
}

function noResults() {
    clearHTML();

    // Build the alert
    const noResults = document.createElement('div');
    noResults.classList.add('alert', 'error');
    noResults.appendChild(document.createTextNode('No Results Found'));
    document.querySelector('#result').appendChild(noResults);
}

function filterCars() {
    const result = getCars()
                    .filter(filterMake)
                    .filter(filterYear)
                    .filter(filterMinPrice)
                    .filter(filterMaxPrice)
                    .filter(filterMaxPrice)
                    .filter(filterDoors)
                    .filter(filterTransmission)
                    .filter(filterColor);
    
    console.table(result);

    if (result.length) {
        showCars(result);
    } else {
        noResults();
    }
}

function filterMake(car) {
    if (searchFields.make) {
        return car.make === searchFields.make
    } else {
        return car;
    }
}

function filterYear(car) {
    if (searchFields.year) {
        return car.year === searchFields.year
    } else {
        return car;
    }
}

function filterMinPrice(car) {
    if (searchFields.min) {
        return car.price >= searchFields.min
    } else {
        return car;
    }
}

function filterMaxPrice(car) {
    if (searchFields.max) {
        return car.price <= searchFields.max
    } else {
        return car;
    }
}

function filterDoors(car) {
    if (searchFields.doors) {
        return car.doors === searchFields.doors
    } else {
        return car;
    }
}

function filterTransmission(car) {
    if (searchFields.transmission) {
        return car.transmission === searchFields.transmission
    } else {
        return car;
    }
}

function filterColor(car) {
    if (searchFields.color) {
        return car.color === searchFields.color
    } else {
        return car;
    }
}
