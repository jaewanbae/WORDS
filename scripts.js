wordsApp = {};

wordsApp.init = () => {
    // wordsApp.curtainRise();
    wordsApp.finalAnswer = "";
    wordsApp.answer = "";
    wordsApp.getWord();
}

// curtain JS
// wordsApp.curtainRise = () => {
//     let curtain = document.querySelector(`.curtain`)
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
    let url = new URL(merriamApiUrl);
    
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
            wordsApp.answer = randomWord;
            console.log(randomWord);
            //then get word length
            wordsApp.getLetterBoxes(randomWord.length);
            // jsonResponse[0].fl -- hint for part of speech
            wordsApp.getAnswer();
            // if return cors (word isn't in dictionary) or word has no short definition, get another word 
            }).catch ((error) => {
                wordsApp.getWord();
            })
}

//give hint one
wordsApp.giveHintOne = (hintOne) => {
    let definition = document.querySelector('.definition');
    definition.innerText = `${hintOne}`;
}

//get number of boxes per word length
wordsApp.getLetterBoxes = (numOfBoxes) => {
    let letterBoxes = document.querySelectorAll('.letter');
    let letterBoxesArray = Array.from(letterBoxes);
    let letterBoxesInPlay = letterBoxesArray.slice(0, numOfBoxes);
    for (let letterBox of letterBoxesArray) {
        letterBox.classList.remove("inPlay");
      }  
    for (let letterBox of letterBoxesInPlay) {
        letterBox.classList.add("inPlay");
      }     
    //   wordsApp.nextLetter(letterBoxesInPlay); 
}

// automatically tab to next letter {
//     wordsApp.nextLetter(letterInput) {
//     // check if input value length is equal to max length
//     // this. focus next 
// }

//get input 
wordsApp.getAnswer = () => {
    let submitted = document.querySelector('.answerSubmit');
    //clear any input from earlier attempts
    let inputField = document.querySelectorAll('input[type=text]');
    inputField.forEach(letter => {
        letter.value="";
    });

    submitted.addEventListener('click', function() {
        let letter1 = document.querySelector('#letter1').value;
        let letter2 = document.querySelector('#letter2').value;
        let letter3 = document.querySelector('#letter3').value;
        let letter4 = document.querySelector('#letter4').value;
        let letter5 = document.querySelector('#letter5').value;
        let letter6 = document.querySelector('#letter6').value;
        let letter7 = document.querySelector('#letter7').value;
        let letter8 = document.querySelector('#letter8').value;
        let wordSubmitted = `${letter1}${letter2}${letter3}${letter4}${letter5}${letter6}${letter7}${letter8}`;
        wordsApp.finalAnswer = wordSubmitted.toLowerCase();
        wordsApp.checkAnswer();     
    });
}

wordsApp.checkAnswer = () => {
    wordsApp.gotIt = document.querySelector('.checkmark');
    wordsApp.tryAgain = document.querySelector('.xMark');

    if (wordsApp.finalAnswer === wordsApp.answer) {
            wordsApp.gotIt.classList.add("feedbackAnimation");
            console.log(wordsApp.finalAnswer, wordsApp.answer);
            console.log("yay!");            
    } else {
        wordsApp.tryAgain.classList.add("feedbackAnimation");
        console.log(wordsApp.finalAnswer, wordsApp.answer);
        console.log("nope");
    }
      
    wordsApp.nextWord();   
}

wordsApp.nextWord = () => {
    let nextWord = document.querySelector('.nextWord');
    nextWord.addEventListener('click', function() {
        wordsApp.init();
        console.log("next word please");
        wordsApp.gotIt.classList.remove("feedbackAnimation");
        wordsApp.tryAgain.classList.remove("feedbackAnimation");
    });
}


wordsApp.init();