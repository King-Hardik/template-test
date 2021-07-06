const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const bgColor = document.getElementById('bg-color');
const loader = document.getElementById('loader');


// Show Loading 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New quotes
function newQuote() {
    loading();
    color = ['bg-color1', 'bg-color2', 'bg-color3', 'bg-color4'];
    bgColor.classList.value = ''
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

    bgColor.classList.add(color[Math.floor(Math.random()*color.length)]);

    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    if(quoteText.length > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    } 
    // Set Quote. Hide Loader 
    quoteText.textContent = quote.text;
    complete();
    
}

// Get Quotes From API
let apiQuotes = [];
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // Because the await keyword is present, the asynchronous function is paused until the request completes.
        newQuote();
    }catch(error){
        //Catch Error here
    }
}

//Tweet quotes
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

//We also need ot load our getQuotes function upon loading the page for the first time (or refreshing)
//On Load
getQuotes();
