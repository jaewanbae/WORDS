wordsApp = {};

// curtain JS
wordsApp.curtainRise = () => {
    const curtain = document.querySelector(`.curtain`)
    curtain.addEventListener(`click`, () => {
        curtain.classList.add(`topCurtainRise`)
    })
}

wordsApp.init = () => {
    wordsApp.curtainRise();
}

wordsApp.init();