wordsApp = {};

// curtain JS
// wordsApp.curtainRise = () => {
//     const curtain = document.querySelector(`.curtain`)
//     curtain.addEventListener(`click`, () => {
//         curtain.classList.add(`topCurtainRise`)
//     })
// }

//get random word
wordsApp.getWord = () => {
    wordsApp.randomWordApiUrl = "https://random-word-api.herokuapp.com/word?number=1";
    fetch(wordsApp.randomWordApiUrl)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            //check word length is less than 8
            if (jsonResponse[0].length <= 8) {                        
                wordsApp.getDef(jsonResponse[0]);
            } else {
                wordsApp.getWord();
            }
        })
}

//get random word definition
wordsApp.getDef = (randomWord) => {    
    merriamApiUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${randomWord}`;
    merriamApiKey = "10c2ccc6-00e7-4a3e-907d-d70bbfbacb4b";
    const url = new URL(merriamApiUrl);
    
    url.search = new URLSearchParams({
        key: merriamApiKey
    })

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            console.log(randomWord);
            //if word is in dictionary and has short definition, console.log
            console.log(jsonResponse[0].shortdef[0]);
            //then get word length
            wordsApp.getBoxes(randomWord.length);
            // console.log(jsonResponse[0].fl);
            // if cors array (word isn't in dictionary) or word has no short definition, get another word 
            }).catch ((error) => {
                wordsApp.getWord();
            })
}

//get number of boxes per word length
wordsApp.getBoxes = (numOfBoxes) => {
    console.log(numOfBoxes);
}

wordsApp.init = () => {
    // wordsApp.curtainRise();
    wordsApp.getWord();
}

wordsApp.init();