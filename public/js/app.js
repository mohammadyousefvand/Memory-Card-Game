let $ = document

let cards = $.querySelectorAll('.card')
let restart = $.querySelector('.restart')

let matchCount = 0
let cardOne, cardTwo
let disable = false

function rotation({target: clickcard}) {
    console.log(clickcard)
    if (cardOne !== clickcard && !disable) {
        clickcard.classList.add('rotate')
        if (!cardOne) {
            return cardOne = clickcard
        }
        cardTwo = clickcard
        disable = true
        let cardImgOne = cardOne.querySelector('.back img').src,
            cardImgTow = cardTwo.querySelector('.back img').src

        checkMatchCards(cardImgOne, cardImgTow)
    }
}

function checkMatchCards(img1, img2) {
    if (img1 === img2) {
        matchCount++

        if (matchCount == 8) {
            restart.classList.add('show-btn')
        }
        cardOne.removeEventListener("click", rotation)
        cardTwo.removeEventListener("click", rotation)
        cardOne = ''
        cardTwo = ''
        return disable = false
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "rotate")
        cardTwo.classList.remove("shake", "rotate")
        cardOne = ''
        cardTwo = ''
        disable = false
    }, 1200);

}

function onmergeCard() {
    matchCount = 0;
    disable = false
    cardOne = ''
    cardTwo = ''
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    numbers.sort(() => Math.random() > 0.5 ? 1 : -1)
    cards.forEach((card, i) => {
        card.classList.remove("rotate");
        let imgTag = card.querySelector(".back img")
        imgTag.src = `public/images/${numbers[i]}.png`
        card.addEventListener("click", rotation)
    });
    restart.classList.remove('show-btn')
}

onmergeCard()


cards.forEach(card => {
    card.addEventListener('click', rotation)
})

restart.addEventListener('click', onmergeCard)