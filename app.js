let statusDiv = document.querySelector('.status');
let resetDiv = document.querySelector('.reset');
let gameCells = document.querySelectorAll('.game-cell');
let liveGame = true;
let xIsNext = true;
let winner = null

const xSymbol = '×';
const oSymbol = '○';
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;
let handleWin = (letter) => {
    liveGame = false;
    winner = letter;
    if (winner === 'x') {
        statusDiv.innerHTML = `${letterToSymbol(winner)} is the winner!`
    } else {
        statusDiv.innerHTML = `<span>${letterToSymbol(winner)} is the winner!</span>`
    }
}

let checkStatus = () => {
    let topLeft = gameCells[0].classList[2]
    let topMiddle = gameCells[1].classList[2]
    let topRight = gameCells[2].classList[2]
    let middleLeft = gameCells[3].classList[2]
    let middleMiddle = gameCells[4].classList[2]
    let middleRight = gameCells[5].classList[2]
    let bottomLeft = gameCells[6].classList[2]
    let bottomMiddle = gameCells[7].classList[2]
    let bottomRight = gameCells[8].classList[2]
    let array = [topLeft, topMiddle, topRight, middleLeft, middleMiddle, middleRight, bottomLeft, bottomMiddle, bottomRight]
    if (xIsNext && !winner) {
        statusDiv.innerHTML = `${letterToSymbol('x')}'s turn`
    } else if (!xIsNext && !winner) {
        statusDiv.innerHTML = `<span>${letterToSymbol('o')}'s turn`
    }
    if(topLeft && topLeft === topMiddle && topLeft === topRight){
        handleWin(topLeft)
    } else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
        handleWin(middleLeft)
    } else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
        handleWin(bottomLeft)
    } else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){
        handleWin(topLeft)
    } else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
        handleWin(topMiddle)
    } else if(topRight && topRight === middleRight && topRight === bottomRight){
        handleWin(topRight);
    } else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight){
        handleWin(topLeft);
    } else if(topRight && topRight === middleMiddle && topRight === bottomLeft){
        handleWin(topRight);
    } else if(array.length === 9 && !array.includes(undefined)){
        liveGame = false;
        statusDiv.innerHTML = 'GAME IS A TIE'
    }


}

let getClass = (e) => {
    return [...e.target.classList]
}

let handleReset = (e) => {
    liveGame = true;
    xIsNext = true;
    winner = null;
    for(cell of gameCells){
        cell.classList.remove('x');
        cell.classList.remove('o');
    }
    statusDiv.innerHTML = `${letterToSymbol('x')}'s turn`

}


let handleClick = (e) => {
    if(!liveGame) return;
    let classArray = getClass(e);
    let location = classArray[1];
    let divElement = e.target;
    if(classArray[2] === 'x' || classArray[2] === 'o') return;
    if(xIsNext){
        divElement.classList.add('x');;
        xIsNext = !xIsNext
        checkStatus();
    } else {
        divElement.classList.add('o')
        xIsNext = !xIsNext
        checkStatus();
    }
}

resetDiv.addEventListener('click', handleReset);
for(let cell of gameCells){
    cell.addEventListener('click', handleClick)
}