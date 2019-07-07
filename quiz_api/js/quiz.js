let correctAnswer;

document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
});

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
        
        console.log(possibleAnswers);
        console.log(correctAnswer);
    })
}