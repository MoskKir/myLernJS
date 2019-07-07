let correctAnswer,
    correctNumber = (localStorage.getItem('quiz_game_correct') ? localStorage.getItem('quiz_game_correct') : 0),
    incorrectNumber = (localStorage.getItem('quiz_game_incorrect') ? localStorage.getItem('quiz_game_incorrect') : 0);

document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
    eventListeners();
});

eventListeners = (event) => {
    document.querySelector('#check-answer').addEventListener('click', validateAnswer);
    document.querySelector('#clear-storage').addEventListener('click', clearResults);
}

function loadQuestion() {
    const url = 'https://opentdb.com/api.php?amount=1';
    fetch(url)
        .then(data => data.json())
        .then(result => displayQuestion(result.results));
}

// Display the question HTML from API
displayQuestion = questions => {
    // Create HTML question
    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col-12');

    questions.forEach(question => {
        // Read the correct answer
        correctAnswer = question.correct_answer;
        
        // Inject the correct answer in the posible answers
        let possibleAnswers = question.incorrect_answers;
        possibleAnswers.splice( Math.floor( Math.random() * 3), 0, correctAnswer );
        
        // Add the HTML Question text
        questionHTML.innerHTML = `
            <div class="row justify-content-between heading">
                <p class="category">Category: ${question.category}</p>
                <div class="totals">
                    <span class="badge badge-success">${correctNumber}</span>
                    <span class="badge badge-danger">${incorrectNumber}</span>
                </div>
            </div>
            <h2 class="text-center">${question.question}</h2>
        `;

        // Generate the HTML for answers
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4');
        
        possibleAnswers.forEach(answer => {
            const answerHTML = document.createElement('li');
            answerHTML.classList.add('col-12', 'col-md-5');
            answerHTML.textContent = answer;
            
            // Attach an event click the answer is clicked
            answerHTML.onclick = selectAnswer;

            answerDiv.appendChild(answerHTML);
        });
        questionHTML.appendChild(answerDiv);
        // And render in the HTML
        document.getElementById('app').appendChild(questionHTML);

        console.log(possibleAnswers);
        console.log(correctAnswer);
    })
}

// When the answer is selected
selectAnswer = (event) => {
    // Remove the previous active class for the answer
    if (document.querySelector('.active')) {
        const activeAnswer = document.querySelector('.active');
        activeAnswer.classList.remove('active');
    }
    // Adds the current answer
    event.target.classList.add('active');
}

// Check answer
validateAnswer = () => {
    if(document.querySelector('.questions .active')) {
        checkAnswer();
    } else {
        // error
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger', 'col-md-6');
        errorDiv.textContent = 'Please select answer';
        // Select the questions div to insert alert
        const questionsDiv = document.querySelector('.questions');
        questionsDiv.appendChild(errorDiv);

        // Remove the error
        setTimeout(() => {
            document.querySelector('.alert-danger').remove();
        }, 1000);
    }
}

//Check if the answer is correct or not correct
checkAnswer = () => {
    const userAnswer = document.querySelector('.questions .active');
    // console.log(userAnswer.textContent);
    if (userAnswer.textContent === correctAnswer) {
        // console.log('ZBS');
        correctNumber++;
    } else {
        incorrectNumber++;
    }
    // Save into localstorage
    saveIntoStorage();
    // Clear previous HTML 
    const app = document.getElementById('app'); 
    while(app.firstChild) {
        app.removeChild(app.firstChild);
    }
    // Load a new question
    loadQuestion();
} 

// Saves totals in storage
saveIntoStorage = () => {
    localStorage.setItem('quiz_game_correct', correctNumber);
    localStorage.setItem('quiz_game_incorrect', incorrectNumber);
}

// Clear results from local storage
clearResults = () => {
    localStorage.setItem('quiz_game_correct', 0);
    localStorage.setItem('quiz_game_incorrect', 0);

    setTimeout(() => {
        window.location.reload();
    }, 500);
}