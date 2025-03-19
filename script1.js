let boxes = document.querySelectorAll(".outer-box");
let innerBoxes = document.querySelectorAll(".inner-box");
let score = document.querySelector(".score");
let winner = document.querySelector(".winner");
let resetBtn = document.querySelector(".reset-btn");
let loser = document.querySelector(".loser")


const placingBombs = () => {                          // Placing Bombs!
    let firstBoom = Math.floor(Math.random() * 40);
    let secondBoom = Math.floor(Math.random() * 40);
    while (firstBoom === secondBoom) {
        secondBoom = Math.floor(Math.random() * 40)
    }
    let thirdBoom = Math.floor(Math.random() * 40)
    while (thirdBoom === secondBoom || thirdBoom === firstBoom) {
        thirdBoom = Math.floor(Math.random() * 40)
    }
    let fourthBoom = Math.floor(Math.random() * 40)
    while (fourthBoom === thirdBoom || fourthBoom === secondBoom || fourthBoom === firstBoom) {
        fourthBoom = Math.floor(Math.random() * 40)
    }
    console.log(firstBoom)
    innerBoxes[firstBoom].innerHTML = "💣";
    innerBoxes[secondBoom].innerHTML = "💣";
    innerBoxes[thirdBoom].innerHTML = "💣";
    innerBoxes[fourthBoom].innerHTML = "💣";
}
placingBombs();

boxes.forEach((box) => {                           // Clicking Event
    box.addEventListener("click" , () => {
        box.classList.add("disable")
        box.firstElementChild.classList.remove("hide");
        winSituation(box);
    })
})

const showingBomb = () => {
    innerBoxes.forEach((box) => {
        box.classList.remove("hide");
        setTimeout(() => {
            box.classList.add("hide");
        }, 1000);
    })
}
showingBomb()


const winSituation = (a) => {                       // if catches bomb
    if (a.firstElementChild.innerText === "💣"){
        a.style.border = "4px solid red";
        loser.classList.remove("winner-hide");
        boxes.forEach((box) => {
            box.classList.add("disable");
            box.firstElementChild.classList.remove("hide");
        })
    } else {
        score.innerText++
    } 
    if (score.innerText == 36) {                    // if winner gets declared
        winner.classList.remove("winner-hide");
    }
}

resetBtn.addEventListener("click" , () => {
    loser.classList.add("winner-hide");
    winner.classList.add("winner-hide");
    boxes.forEach((box) => {
        box.firstElementChild.classList.add("hide");
        if (box.style.border === "4px solid red") {
            box.style.border = ""
        }
        box.classList.add("disable")
    })
    setTimeout(() => {
        boxes.forEach((a) => {
            a.firstElementChild.classList.add("hide");
            a.classList.remove("disable");
            a.firstElementChild.innerText = "+1"
            score.innerText = 0;
            a.classList.remove("disable")
        })
        placingBombs();
        showingBomb();
    }, 1000)
})

