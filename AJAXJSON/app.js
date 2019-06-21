document.getElementById('button1').addEventListener('click', loadEmployee);
document.getElementById('button2').addEventListener('click', loadEmployees);


// Display single Employee
function loadEmployee() {
     // Create the object
     const xhr = new XMLHttpRequest();

     // Open the conection
     xhr.open('GET', 'employee.json', true);

     // Execute the function
     xhr.onload = function() {
          if(this.status === 200) {
               const employee = JSON.parse(this.responseText);
               
               // Build the template
               const output = `
                    <ul>
                         <li>ID: ${employee.id}</li>
                         <li>NAME: ${employee.name}</li>
                         <li>COMPANY: ${employee.company}</li>
                         <li>JOB: ${employee.job}</li>
                    </ul>
               `;
               // Print the HTML
               document.getElementById('employee').innerHTML = output;
          }
     }

     // Send the request
     xhr.send();
}

// Display many Employees
function loadEmployees() {
     // Create the object
     const xhr = new XMLHttpRequest();

     // Open the conection
     xhr.open('GET', 'employees.json', true);

     // Execute the function
     xhr.onload = function() {
          if(this.status === 200) {
               const employees = JSON.parse(this.responseText);              
               
               // Build the template
               let output = '';

               employees.forEach(function(employee) {
                    output += `
                         <ul>
                              <li>ID: ${employee.id}</li>
                              <li>NAME: ${employee.name}</li>
                              <li>COMPANY: ${employee.company}</li>
                              <li>JOB: ${employee.job}</li>
                         </ul>
                    `
               });

               // Print the HTML
               document.getElementById('employees').innerHTML = output;
          }
     }

     // Send the request
     xhr.send();
}