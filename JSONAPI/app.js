document.querySelector('#load').addEventListener('click',  loadPosts);


function loadPosts() {
     // Create the object
     const xhr = new XMLHttpRequest();

     // Open the connection
     xhr.open('GET', 'https://jsonplaceholder.typicode.com/photos', true);

     // Execute the function
     xhr.onload = function() {
          if(this.status === 200) {
               const response = JSON.parse( this.responseText );

               // Print the contents
               let output = '';

               response.forEach(function(post) {
                    output += `
                         <div class="one columns">
                              <p>${post.title}</p>
                              <img src="${post.thumbnailUrl}">
                         </div>
                    `;
               });
               document.querySelector('#result').innerHTML = output;
          }
     }

     // Send the request
     xhr.send();
}