// import './index.html';
// import './style.css';
let input = document.querySelectorAll('input');
const start__game = document.querySelector('.start__game');
const changeName = document.querySelector('.change__name');
const back = document.querySelector('#back');
const game = document.querySelector('#game');
const scoreboard = document.querySelector('.game-score__content');
let player1 = document.querySelector('.player1').value;
let player2 = document.querySelector('.player2').value;
const block = document.querySelector('.block');
const buttons = document.querySelector('.buttons');
let player = document.querySelector('.player2');
const clear = document.querySelector('.clear');
const new__game = document.querySelector('.new__game');
let player1__score = document.querySelector('.player1-count');
let player2__score = document.querySelector('.player2-count');
let LS = sessionStorage.getItem('player1');
let LS2 = sessionStorage.getItem('player2');
let currentPlayer = 'X';
// const userInput = input.value;
const myInput1 = document.getElementById('inputChek1');
const myInput2 = document.getElementById('inputChek2');
//game
const savedGame = sessionStorage.getItem('game');
if (savedGame) {
    document.querySelector('#game').innerHTML = savedGame;
    currentPlayer = sessionStorage.getItem('currentPlayer');
} else {
    for (let i = 0; i < 9; i++) {
        document.querySelector('#game').innerHTML += '<div class="block"></div>';
    }
}
document.querySelector('#game').onclick = function (event) {
    if (event.target.className == 'block' && event.target.innerHTML == '') {
        event.target.innerHTML = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkWinner();
        sessionStorage.setItem('game', document.querySelector('#game').innerHTML);
        sessionStorage.setItem('currentPlayer', currentPlayer);
    } else {
        return;
    }
}
//score
let count = 0;
if (sessionStorage.getItem('score1')) {
    count = parseInt(sessionStorage.getItem('score1'));
}
player1__score.innerHTML = count;
let play = function () {
    count += 1;
    player1__score.innerHTML = count;
    sessionStorage.setItem('score1', count);
    console.log(count);
}
let count2 = 0;
if (sessionStorage.getItem('score2')) {
    count2 = parseInt(sessionStorage.getItem('score2'));
}
player2__score.innerHTML = count2;
let play2 = function () {
    count2 += 1;
    player2__score.innerHTML = count2;
    sessionStorage.setItem('score2', count2);
    console.log(count2);
}
//buttons
start__game.addEventListener('click', function () {
    if (myInput1.value.trim() === '' || myInput2.value.trim() === '') {
        Swal.fire({
            title: 'Введите имена игроков',
            showConfirmButton: false,
            timer: 1500,
        })
    } else {
        player1 = document.querySelector('.player1').value;
        player2 = document.querySelector('.player2').value;
        document.querySelector('.scoreTable').innerHTML = player1 + ':';
        document.querySelector('.scoreTable2').innerHTML = player2 + ':';
        buttons.style.display = 'block';
        back.style.display = 'none';
        game.style.display = 'block';
        scoreboard.style.display = 'block';
        console.log(player1);
        console.log(player2);
        sessionStorage.setItem('player1', player1);
        sessionStorage.setItem('player2', player2);
    }
});

clear.onclick = function () {
    currentPlayer = "X";
    game.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        document.querySelector('#game').innerHTML += '<div class = "block"></div>';
    }
    sessionStorage.removeItem('game', document.querySelector('#game').innerHTML);
    sessionStorage.removeItem('currentPlayer', currentPlayer);
}
new__game.onclick = function () {
    currentPlayer = "X";
    count = false;
    count2 = false;
    player1__score.innerHTML = '0';
    player2__score.innerHTML = '0';
    game.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        document.querySelector('#game').innerHTML += '<div class = "block"></div>';
    }
    sessionStorage.removeItem('score1', count);
    sessionStorage.removeItem('score2', count2);
    sessionStorage.removeItem('game', document.querySelector('#game').innerHTML);
    sessionStorage.removeItem('currentPlayer', currentPlayer);
}
changeName.onclick = function () {
    buttons.style.display = 'none';
    back.style.display = 'block';
    game.style.display = 'none';
    scoreboard.style.display = 'none';
    sessionStorage.removeItem('player1', player1);
    sessionStorage.removeItem('player2', player2);
    new__game.onclick();
}
//check Winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const allBlock = document.querySelectorAll('.block');
    const player1Won = winningCombinations.some(combination => {
        return combination.every(index => allBlock[index].innerHTML === 'X');
    });
    const player2Won = winningCombinations.some(combination => {
        return combination.every(index => allBlock[index].innerHTML === 'O');
    });
    const allFilled = Array.from(allBlock).every(block => block.innerHTML !== '');
    if (player1Won) {
        Swal.fire({
            title: 'Победитель ' + (LS == null ? player1 : player1 || LS),
            showConfirmButton: false,
            timer: 1000,
        })
        play();
        clear.onclick();
    } else if (player2Won) {
        Swal.fire({
            title: 'Победитель ' + (LS2 == null ? player2 : player2 || LS2),
            showConfirmButton: false,
            timer: 1000,
        });
        play2();
        clear.onclick();
    } else if (allFilled) {
        Swal.fire({
            title: 'Ничья',
            showConfirmButton: false,
            timer: 1000,
        })
        clear.onclick();
    }
}
//reload
if (LS !== null & LS2 !== null) {
    document.querySelector('.scoreTable').innerHTML = LS + ':';
    document.querySelector('.scoreTable2').innerHTML = LS2 + ':';
    buttons.style.display = 'block';
    back.style.display = 'none';
    game.style.display = 'block';
    scoreboard.style.display = 'block';
}