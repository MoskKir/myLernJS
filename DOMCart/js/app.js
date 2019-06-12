//Variables
const coursers = document.querySelector('#courses-list'),
    shopingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');



//Listeners
loadEventListeners();

function loadEventListeners() {
    //When a new course is added
    coursers.addEventListener('click', buyCourse);

    //When the remove button is clicked
    shopingCartContent.addEventListener('click', removeCourse);

    //ClearCart Btn 
    clearCartBtn.addEventListener('click', clearCartBtnFn);

    //Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}





//Functions

function buyCourse(event) {
    event.preventDefault();
    // console.log(event.target);
    //Use delegation to find the course that was added
    if (event.target.classList.contains('add-to-cart') ) {
        // console.log ('Course added')

        //Read the course values
        // console.log(event.target.parentElement.parentElement);
        const course = event.target.parentElement.parentElement;

        //Read the values
        getCourseInfo(course);
    }

}

//Reads the HTML information of the selected course
function getCourseInfo(course) {
    // Create an Object with Course Data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    // console.log(courseInfo);

    //Insert into the shoping cart
    addIntoCart(courseInfo);
}

//Display the selected courses into the shoping cart

function addIntoCart(course) {
    //create a <tr> into <tbody>
    const row = document.createElement('tr');

    //Build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    // Add into the shoping cart
    shopingCartContent.appendChild(row);

    // Add courses into the storage
    saveIntoStorage(course);

}

//Remove Btn function (remove course from DOM)
function removeCourse(event) {
    let course, courseId;

    //Remove from the DOM
    if (event.target.classList.contains('remove')) {
        event.target.parentElement.parentElement.remove();
        course = event.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    //Remove from the Local Storage
    removeCourseLocalStorage(courseId);
}

function removeCourseLocalStorage(id) {
    //Get Local Storage data
    let coursesLS = getCoursesFromStorage();

    //loop throught the array and find the index to remove
    coursesLS.forEach(function(courseLS, index ) {
        if (courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });
    // console.log(coursesLS);

    //Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// Clears the shoping cart if we using clearCartBtn
function clearCartBtnFn() {
    // shopingCartContent.remove();
    // shopingCartContent.innerHtml = '';

    while(shopingCartContent.firstChild) {
        shopingCartContent.removeChild(shopingCartContent.firstChild);
    }

    //clear from Local Storage
    clearLocalStorage();

}

function clearLocalStorage() {
    localStorage.clear();
}

//Add the courses into the local Storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    //add the courses into the array
    courses.push(course);

    //since storage only savesstrings, we need to convert JSON into String
    localStorage.setItem('courses', JSON.stringify(courses));

}

//Get the contents from storage
function getCoursesFromStorage() {

    let courses;
    
    // if something exist on storagethen we get the value, otherwise create an empty array
    
    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

// Loads when document is ready and print courses into shopping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    //LOOP throught the courses and print into the cart
    coursesLS.forEach(function(course) {
        //create the <tr>
        const row = document.createElement('tr');

        //print the content
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shopingCartContent.appendChild(row);
    });

}
