const section = document.querySelector("section");
const playerLivesCount = document.querySelector(".livecount");
const timeCount = document.getElementById("time");
const timebtn = document.querySelector("button");

let playerLives = 6;
playerLivesCount.textContent = playerLives;

document.addEventListener("DOMContentLoaded", (e) => {
    console.log(e);
    cardGenerator();
    timerGenerator();
  });

//Generate the data
let cardData = [
{ imgSrc: "./images/chelsea.png", id: 1, name: "chelsea" },
{ imgSrc: "./images/mu.png", id: 2, name: "man utd" },
{ imgSrc: "./images/mc.png", id: 3, name: "man city" },
{ imgSrc: "./images/afc.png", id: 4, name: "arsenal" },
{ imgSrc: "./images/lfc.jpeg", id: 5, name: "liverpool" },
{ imgSrc: "./images/tfc.jpeg", id: 6, name: "tottenham" },
{ imgSrc: "./images/evt.png", id: 7, name: "everton" },
{ imgSrc: "./images/lei.png", id: 8, name: "leicester" },
{ imgSrc: "./images/chelsea.png", id: 9, name: "chelsea" },
{ imgSrc: "./images/mu.png", id: 10, name: "man utd" },
{ imgSrc: "./images/mc.png", id: 11, name: "man city" },
{ imgSrc: "./images/afc.png", id: 12, name: "arsenal" },
{ imgSrc: "./images/lfc.jpeg", id: 13, name: "liverpool" },
{ imgSrc: "./images/tfc.jpeg", id: 14, name: "tottenham" },
{ imgSrc: "./images/evt.png", id: 15, name: "everton" },
{ imgSrc: "./images/lei.png", id: 16, name: "leicester" },
];

   //timer:
const timerGenerator = () => {
    timebtn.addEventListener('click', () => {
        var timeRemaining = 60;
        var timer = setInterval(() => {
            timeRemaining--;
            timeCount.textContent = timeRemaining;
            if (timeRemaining === 0) {
                restart("Time out");
                clearInterval(timer);
            };
        }, 1000);
    });
};
 

// card generator
const cardGenerator = () => {
    //randomise
    cardData.sort(() => Math.random() - 0.5);

    //generate HTML
    cardData.forEach((item, index) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);

        //attach cards to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            console.log(e);
            card.classList.toggle('toggleCard');
            checkCards(e);
        })
    });
};

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCard = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    // check if flipped is the same
    if (flippedCard.length === 2){
        if (
        flippedCard[0].getAttribute("name") ===
        flippedCard[1].getAttribute("name")
        ){
        console.log("match");
        flippedCard.forEach((card) => {
            card.classList.remove("flipped");
            card.style.pointerEvents = "none";
        })
        } else {
            console.log("wrong");
            flippedCard.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0){
                restart("Try again");
            };
        };
    };
    if(toggleCard.length === 16){
        restart("You won!");
    };
};


//Restart
const restart = (text) => {
    cardData.sort(() => Math.random() - 0.5);
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card")
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000);

    });
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    
    var timeRemaining = 60;
    timeCount.textContent = timeRemaining;

    setTimeout(() => window.alert(text), 100);
};