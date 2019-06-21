// Classes
class Budget {
    constructor(budget) {
        this.budget = Number ( budget );
        this.budgetLeft = this.budget;
    }

    // Substrack from the budget
    substractFromBudget(amount) {
        return this.budgetLeft -= amount;
    }
}

// Everything related of HTML
class HTML {

    // Insert the budget when users add it
    insertBudget(amount) {
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

    printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        // Insert into HTML
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        setTimeout(function() {
            document.querySelector('.primary .alert').remove();
            addExpenseForm.reset();
        }, 3000);
    }


    addExpenseToList(name, amount) {
        const expenseList = document.querySelector('#expenses ul');

        // Create a li
        const li = document.createElement('li');
        li.className = 'List-group-item d-flex justify-content-between align-items-center';
        // Create the template
        li.innerHTML =`
            ${name}
            <span class='badge badge-primary badge-pill'>$ ${amount}</span>
        `

        // Insert into the HTML
        expenseList.appendChild(li);        
    }
    
    // Substract expense amount from budget
    trackBudget(amount) {
        const budgetLeftDollars = budget.substractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`

        // Check when 25% is spend
        if( (budget.budget / 4) > budgetLeftDollars ) {
            // Add some classes and remove others
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        } else if ( (budget.budget / 2) > budgetLeftDollars ) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}

// Variables 
const addExpenseForm = document.querySelector('#add-expense'),
    budgetTotal = document.querySelector('span#total'),
    budgetLeft = document.querySelector('span#left');


let budget, userBudget; 

const html = new HTML();

// Event Listeners 
eventListener();

function eventListener() {    
    // App Init
    document.addEventListener('DOMContentLoaded', function() {
        // Ask the visitior the weekly budget
        userBudget = prompt(' Введите свой недельный бюджет ');
        // Validate the userBudget
        if (userBudget === null || userBudget === '' || userBudget === '0') {
            window.location.reload();
        } else {
            // If Budget is valid then create the budget class
            budget = new Budget(userBudget);

            // Instanciated HTML class
            html.insertBudget(budget.budget);
        }
    });
    
    // When a new expense is added 
    addExpenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Read the input value
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if (expenseName === '' || amount === '') {
            html.printMessage('There was error, all the filds are mandatory', 'alert-danger');
        } else {
            // Add the expenses into the list
            html.addExpenseToList(expenseName, amount);
            html.trackBudget(amount);
            html.printMessage('Added.. ', 'alert-success');
        }
    });

}
