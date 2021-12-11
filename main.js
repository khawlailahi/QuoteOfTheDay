const quoteText = document.querySelector(".quote"),
authorName = document.querySelector(".author .name"),
soundBtn = document.querySelector(".sound"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
quoteBtn = document.querySelector("button");
let spinner = document.querySelector(".spinner-wrapper");


function randomQuote(){

    quoteBtn.classList.add("loading");
    quoteBtn.textContent  = "Loading Quote...";
    
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.textContent  = "New Quote";
        quoteBtn.classList.remove("loading");

        if(getComputedStyle(spinner, null).display === "block") {          
            spinner.style.display = "none";
            document.querySelector(".title").style.display = "block";
            document.querySelector(".wrapper").style.display = "block";
        }
    });
    
}
document.addEventListener("DOMContentLoaded", randomQuote);
soundBtn.addEventListener("click", ()=>{
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    speechSynthesis.speak(utterance);
});
copyBtn.addEventListener("click", ()=>{
    let quote = `${quoteText.innerText} 
- ${authorName.innerText}` ;
    navigator.clipboard.writeText(quote);
});
twitterBtn.addEventListener("click", ()=>{
    let quote = `${quoteText.innerText} 
    - ${authorName.innerText}` ;
    let tweetUrl = `https:\\twitter.com/intent/tweet?url=${quote}`;
    window.open(tweetUrl,"_blank");
});
quoteBtn.addEventListener("click", randomQuote);
