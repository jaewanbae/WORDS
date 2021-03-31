wordsApp = {};

wordsApp.init = () => {
    // wordsApp.curtainRise();
    wordsApp.getWord();
}

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
            if (jsonResponse[0].length <= 7) {                        
                wordsApp.checkDef(jsonResponse[0]);
            } else {
                wordsApp.getWord();
            }
        })
}

//get random word with definition
wordsApp.checkDef = (randomWord) => {    
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
            //call hintOne() assuming word is in dictionary and has short definition 
            wordsApp.giveHintOne(jsonResponse[0].shortdef[0]);
            //then get word length
            wordsApp.getLetterBoxes(randomWord.length);
            // jsonResponse[0].fl -- hint for part of speech
            wordsApp.checkAnswer(randomWord);
            console.log(randomWord);
            // if return cors (word isn't in dictionary) or word has no short definition, get another word 
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
    for (let letterBox of letterBoxesArray) {
        letterBox.classList.remove("inPlay");
      }  
    for (let letterBox of letterBoxesInPlay) {
        letterBox.classList.add("inPlay");
      }     
    //   wordsApp.nextLetter(letterBoxesInPlay); 
}

//automatically tab to next letter {
    //wordsApp.nextLetter(letterInput)
    //event listener to focused input
    //check if input value length is equal to max length
    //onkeyup event
    //this. focus next 
// }

//get input and match with randomWord 
wordsApp.checkAnswer = (answer) => {
    const submitted = document.querySelector('.answerSubmit');
    //clear any input from earlier attempts
    const inputField = document.querySelectorAll('input[type=text]');
    inputField.forEach(letter => {
        letter.value="";
    });
    submitted.addEventListener('click', function() {
        const letter1 = document.querySelector('#letter1').value;
        const letter2 = document.querySelector('#letter2').value;
        const letter3 = document.querySelector('#letter3').value;
        const letter4 = document.querySelector('#letter4').value;
        const letter5 = document.querySelector('#letter5').value;
        const letter6 = document.querySelector('#letter6').value;
        const letter7 = document.querySelector('#letter7').value;
        const letter8 = document.querySelector('#letter8').value;
        const wordSubmitted = `${letter1}${letter2}${letter3}${letter4}${letter5}${letter6}${letter7}${letter8}`;
        const lowerCaseWord = wordSubmitted.toLowerCase();
        if (lowerCaseWord == answer) {
            const gotIt = document.querySelector('.checkmark');
            gotIt.classList.add("feedbackAnimation");
        } else {
            const tryAgain = document.querySelector('.xMark');
            tryAgain.classList.add("feedbackAnimation");
        }
    });
}


wordsApp.init();