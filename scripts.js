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
                console.log(jsonResponse[0]);                        
                wordsApp.getDef(jsonResponse[0]);
                wordsApp.getBoxes(jsonResponse[0].length);
            } else {
                wordsApp.getWord();
            }
        })
}

//get number of boxes per word length
wordsApp.getBoxes = (numOfBoxes) => {
    console.log(numOfBoxes);
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
            //if no definition (undefined), get another word and its part of speech
            if (jsonResponse[0].shortdef) {
                console.log(jsonResponse[0].shortdef[0]);
                console.log(jsonResponse[0].fl);
            } else (wordsApp.getWord());
        })
}

wordsApp.init = () => {
    // wordsApp.curtainRise();
    wordsApp.getWord();
}

wordsApp.init();