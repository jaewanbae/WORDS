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

//get random word with definition
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
            // //console.log word given by first api
            // console.log(randomWord);
            //call hintOne() assuming word is in dictionary and has short definition 
            wordsApp.giveHintOne(jsonResponse[0].shortdef[0]);
            //then get word length
            wordsApp.getLetterBoxes(randomWord.length);
            console.log(randomWord);
            // console.log(jsonResponse[0].fl); -- hint for part of speech
            // if cors array (word isn't in dictionary) or word has no short definition, get another word 
            }).catch ((error) => {
                wordsApp.getWord();
            })
}

//give hint one
wordsApp.giveHintOne = (hintOne) => {
    const definition = document.querySelector('.definition');
    definition.innerText = `${hintOne}`;
}

//get number of boxes per word length
wordsApp.getLetterBoxes = (numOfBoxes) => {
    const letterBoxes = document.querySelectorAll('.letter');
    const letterBoxesArray = Array.from(letterBoxes);
    const letterBoxesInPlay = letterBoxesArray.slice(0, numOfBoxes);
    for (let letterBox of letterBoxesInPlay) {
        letterBox.classList.add("inPlay");
      }      
}

wordsApp.init = () => {
    // wordsApp.curtainRise();
    wordsApp.getWord();
}

wordsApp.init();