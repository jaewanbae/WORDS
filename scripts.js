wordsApp = {};
wordsApp.gotIt = document.querySelector('.checkmark');
wordsApp.tryAgain = document.querySelector('.xMark');

wordsApp.init = () => {
    wordsApp.nextWord();
    wordsApp.getWord();
    wordsApp.autoTab();
    wordsApp.getAnswer();
    wordsApp.decideLength();
}

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
            // if return cors (word isn't in dictionary) or word has no short definition, get another word 
            }).catch ((error) => {
                wordsApp.getWord();
            })
}

//check random word length per media query
wordsApp.decideLength = () => {
    const mobile = window.matchMedia("(max-width: 650px)");
    const mainElement = document.querySelector("main");
    if (mobile.matches) { // If media query matches
        console.log("turn to landscape for a better experience");
        const container = document.createElement('div');
        const messageContainer = document.createElement('div');
        const message = document.createElement('p');
        const icon = document.createElement('i');
        message.textContent = `Please turn your device to landscape view for the best experience!`
        icon.classList.add(`fas`);
        icon.classList.add(`fa-times`);
        container.classList.add('messageContainer');
        messageContainer.classList.add('landscapeMessage');
        messageContainer.appendChild(message);
        messageContainer.appendChild(icon)
        container.appendChild(messageContainer);
        mainElement.appendChild(container);
        icon.addEventListener('click', () => {
            container.remove();
        })
    }
}

// Auto Tab function
wordsApp.autoTab = () => {
    const inputField = document.querySelectorAll('input[type=text]');
    inputField.forEach(letter => {
        let parent = letter.parentElement;
        let nextParent = parent.nextElementSibling;
        let prevParent =  parent.previousElementSibling;
        //automatically tab to next empty box if letter is entered
        letter.addEventListener('input', function() {
            if (this.value.length === 1) {                
                nextParent.querySelector('input[type=text]').focus();             
            }
        });
        //automatically delete and move to previous box if backspace is pressed
        letter.addEventListener('keyup', function(e) {
            if (e.key === "ArrowLeft") {
                prevParent.querySelector('input[type=text]').focus();
            } 
            if (e.key === "ArrowRight") {
                nextParent.querySelector('input[type=text]').focus();
            }
        })
    });
}

//give hint one
wordsApp.giveHintOne = (hintOne) => {
    const definition = document.querySelector('.definition');
    definition.classList.remove(`blinking`)
    definition.textContent = `${hintOne}`;
}

//get number of boxes per word length
wordsApp.getLetterBoxes = (numOfBoxes) => {
    const letterBoxes = document.querySelectorAll('.letter');
    const letterBoxesArray = Array.from(letterBoxes);
    const letterBoxesInPlay = letterBoxesArray.slice(0, numOfBoxes);
    for (let letterBox of letterBoxesArray) {
        letterBox.children[1].value = "";
        letterBox.classList.remove("inPlay");
      }  
    for (let letterBox of letterBoxesInPlay) {
        letterBox.children[1].value = "";
        letterBox.classList.add("inPlay");
      }     
}

//get input 
wordsApp.getAnswer = () => {
    const submitted = document.querySelector('.answerSubmit');
    wordsApp.submitCount =  0;

    const gameStage = document.querySelector('main');
    gameStage.addEventListener ('keydown', function(e) {
        if (e.key === "Enter") {
            submitted.click();
        } 
    })

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
    if (wordsApp.finalAnswer === wordsApp.answer) {
        wordsApp.gotIt.classList.add("feedbackAnimation");        
    } else {
        wordsApp.tryAgain.classList.remove("feedbackAnimation");
        void wordsApp.tryAgain.offsetWidth;
        wordsApp.tryAgain.classList.add("feedbackAnimation");
    }
}

wordsApp.nextWord = () => {
    const nextWord = document.querySelector('.nextWord');
    const definition = document.querySelector('.definition');
    nextWord.addEventListener('click', function() {
        wordsApp.finalAnswer = "";
        wordsApp.answer = "";
        wordsApp.getWord();
        wordsApp.gotIt.classList.remove("feedbackAnimation");
        wordsApp.tryAgain.classList.remove("feedbackAnimation");
        definition.classList.add(`blinking`);
        definition.textContent = `Generating Hint`;
    });
}

wordsApp.init();