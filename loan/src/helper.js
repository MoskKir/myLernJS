export function calculateTotal(amount, term) {
    // Amount
    let totalAmount;

    if (amount <= 1000) {
        totalAmount = amount *  .25;    
    } else if (amount > 1000 && amount < 5000) {
        totalAmount = amount *  .20;
    } else if (amount >= 5000 && amount < 10000) {
        totalAmount = amount *  .15;
    } else {
        totalAmount = amount *  .10;
    }

    let totalTerm;

    switch(term) {
        case 3: 
            totalTerm = amount * .05;
            break;
        case 6: 
            totalTerm = amount * .1;
            break;
        case 12: 
            totalTerm = amount * .15;
            break;
        case 24: 
            totalTerm = amount * .2;
            break;
        default:
            break;
        

    }
    return amount + totalAmount + totalTerm;

    

    // Calculate the total interesst based on the time

}