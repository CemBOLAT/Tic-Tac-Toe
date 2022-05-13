const table = document.querySelector("#table")
tableCreator()
const letterPhotos = document.querySelectorAll(".photoPart")
const tablePart = document.querySelectorAll(".tablePart")
const scorePlayer1Display = document.querySelector("#player-1-score")
let player1Score = 0 ;
const scorePlayer2Display = document.querySelector("#player-2-score")
let player2Score = 0 ;
const whoseTurnLetterDisplay = document.querySelector("#whoseTurnLetter")
const currentPlayerDisplay = document.querySelector("#currentPlayer")


const winnerPick = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const resultSentence = document.querySelector("#resultSentence")


let whoseTurn = 1
let totalPuttedLetter =  0
let whichClass
function setTheGame(){
    tablePart.forEach((blok) => {
        blok.addEventListener("click",()=>{
            if(totalPuttedLetter < 9){
                nextPlayer(blok)
                foundClasses()
            }   
            else if(totalPuttedLetter == 9 ){
                nextPlayer(blok)
                foundClasses()
                resetTheGame()
            }     
            else if(totalPuttedLetter == 10){
                nextPlayer(blok)
                resetTheGame()
            }
        })
    })
    
}
function resetTheGame(){
    tablePart.forEach((blok) => {
        if(blok.classList.contains("x-class")){
            blok.classList.remove("x-class")
        }
        else if(blok.classList.contains("o-class")){
            blok.classList.remove("o-class")
        }
    })
    if(whoseTurn == 1){
        whoseTurn = 2
        totalPuttedLetter = 0

    }
    else if(whoseTurn == 2 ){
        whoseTurn = 1
        totalPuttedLetter = 0
    }
    for(let i = 0 ; i < arrayBox.length ; i++){
        arrayBox[i] = " "
    }
    resultSentence.textContent = " "
}
const arrayBox = [
    , , ,
    , , ,
    , , ,
]


function foundClasses(){
    const oClass = document.querySelectorAll(".o-class")
    const xClass = document.querySelectorAll(".x-class")
    var oClassArray = []
    var xClassArray = []
    let id 
    for(let i = 0 ; i < oClass.length ; i++){
        id = parseInt(oClass[i].id)
        oClassArray.push(id)
        arrayBox[id] = "o-class"
    }
    for(let i = 0 ; i < xClass.length ; i++){
        id = parseInt(xClass[i].id)
        xClassArray.push(id)
        arrayBox[id] = "x-class"

    }
    
    for(let i = 0 ; i < winnerPick.length ; i++){
        if(
            arrayBox[winnerPick[i][0]] == "x-class" &&
            arrayBox[winnerPick[i][1]] == "x-class" &&
            arrayBox[winnerPick[i][2]] == "x-class"
            ){
                resultSentence.textContent = `Player-1 wins the game!`
                totalPuttedLetter = 10
                player1Score++
                scorePlayer1Display.textContent = player1Score
            }
        else if(
                arrayBox[winnerPick[i][0]] == "o-class" &&
                arrayBox[winnerPick[i][1]] == "o-class" &&
                arrayBox[winnerPick[i][2]] == "o-class"
                ){
                    player1Score == 2
                    resultSentence.textContent = `Player-2 wins the game!`
                    totalPuttedLetter = 10
                    player2Score++
                    scorePlayer2Display.textContent = player2Score
                }
    }
}

function nextPlayer(blok){
    if(whoseTurn == 1){
            if(
                !blok.classList.contains("o-class") && 
                !blok.classList.contains("x-class")
            ){
                currentPlayerDisplay.textContent = "Player-2"
                blok.classList.add("x-class")
                totalPuttedLetter++
            }
        whoseTurn = 2
    }
    else if(whoseTurn == 2){
        if(
            !blok.classList.contains("x-class") && 
            !blok.classList.contains("o-class")
        ){
            currentPlayerDisplay.textContent = "Player-1"
            blok.classList.add("o-class")
            totalPuttedLetter++
        }
        whoseTurn = 1
    }
}
function tableCreator(){
    for(let i = 0 ; i < 9 ; i++){
        const element = document.createElement("div")
        const photoBox = document.createElement("div")
        photoBox.classList.add("photoPart")
        element.classList.add("tablePart")
        element.setAttribute("id",`${i}`)
        photoBox.setAttribute("id",`photo-${i}`)
        table.appendChild(element)
        element.appendChild(photoBox)
    }
}
setTheGame()
