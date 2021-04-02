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

// automatically tab to next letter {
//     wordsApp.nextLetter(letterInput) {
//     // check if input value length is equal to max length
//     // this. focus next 
// }

//get input 
wordsApp.getAnswer = () => {
    const submitted = document.querySelector('.answerSubmit');
    //clear any input from earlier attempts
    const inputField = document.querySelectorAll('input[type=text]');
    inputField.forEach(letter => {
        letter.value="";
        //automatically tab to next empty box if letter is entered
        letter.addEventListener('input', function() {
            if (this.value.length === 1) {
                let parent = this.parentElement;
                let nextParent = parent.nextElementSibling;
                nextParent.querySelector('input[type=text]').focus();
            }
        });
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
    } else {
        wordsApp.tryAgain.classList.add("feedbackAnimation");
        console.log(wordsApp.finalAnswer, wordsApp.answer);
    }
      
    wordsApp.nextWord();   
}

wordsApp.nextWord = () => {
    const nextWord = document.querySelector('.nextWord');
    nextWord.addEventListener('click', function() {
        wordsApp.init();
        console.log("next word please");
        wordsApp.gotIt.classList.remove("feedbackAnimation");
        wordsApp.tryAgain.classList.remove("feedbackAnimation");
    });
}


wordsApp.init();