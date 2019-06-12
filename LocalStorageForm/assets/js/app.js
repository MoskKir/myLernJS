//var
const tweetList = document.getElementById('tweet-list');

//Event lisener
eventListeners();

function eventListeners() {
    
    //Form submission
    document.querySelector('#form').addEventListener('submit', newTweet);
    
    //Remove tweets from the list
    tweetList.addEventListener('click', removeTweet);

    //Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}



//Function

function newTweet(event) {
    event.preventDefault();

    //Read text area value 
    const tweet = document.getElementById('tweet').value;
    //Create remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';
    
    
    //Create an <li> elements
    const li = document.createElement('li');
    li.textContent = tweet;
    
    //add remove button to each tweets
    li.appendChild(removeBtn);

    //add li to the list 
    tweetList.appendChild(li);

    //add tweet to local storage
    addTweetLocalStorage(tweet);
    
    //Clean the text area
    this.reset();
}

//Remove the tweets from the DOM
function removeTweet(event) {
    if (event.target.classList.contains('remove-tweet')) {
        event.target.parentElement.remove();
    } 

    //Remove from the storage
    removeTweetLocalStorage( event.target.parentElement.textContent );
    
}

//add tweet to local storage function
function addTweetLocalStorage(tweet) {
   let tweets = getTweetsFromStorage();
   
   //Add the tweet into the Array
   tweets.push(tweet);
   
   // Convert tweet array into String
   localStorage.setItem('tweets', JSON.stringify( tweets ) );

}

function getTweetsFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    // if local storage is empty then we create empty array
    if (tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse( tweetsLS );
    }
    
    return tweets;    
}

//Prints Local Storage Tweets on load
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();

    //Loop throught storage and then print
    tweets.forEach(function(tweet) {
        //Create remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';
    
    
        //Create an <li> elements
        const li = document.createElement('li');
        li.textContent = tweet;
    
        //add remove button to each tweets
        li.appendChild(removeBtn);

        //add li to the list 
        tweetList.appendChild(li);
    });
}

//Remove the tweet from local Storage
function removeTweetLocalStorage(tweet) {
    //get tweets from storage
    let tweets = getTweetsFromStorage();

    //remove the X from the tweets
    const tweetDelete = tweet.substring( 0, tweet.length -1 );
    
    //Loop throught the tweets and remove the tweet that's equal
    tweets.forEach(function(tweetLS, index) {
        if (tweetDelete === tweetLS) {

            //Remove value from array 
            tweets.splice(index, 1)
        }
    });

    //Save the data
    localStorage.setItem('tweets', JSON.stringify(tweets) );
    
}