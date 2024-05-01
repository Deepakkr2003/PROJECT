// Game Constants & Variables
// let direction ={x:0 , y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
//let board = document.querySelector(".board");
food = { x: 6, y: 7 };

// Touch control variables
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}
let inputDir = { x: 0, y: 0 };
function gameEngine() {
    //part 1:updating the snake array & Food

    //speaker logic start
    const speakerOn = document.querySelector(".unmute");
    const speakerOff = document.querySelector(".mute");

    speakerOn.addEventListener('click', () => {
        speakerOn.classList.add('hide')
        speakerOff.classList.remove("hide")
        musicSound.pause();
    })

    speakerOff.addEventListener('click', () => {
        musicSound.play();
        speakerOn.classList.remove("hide")
        speakerOff.classList.add('hide')
        // selectSpeaker = true;
    })
    //speaker logic end

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        // alert("Game Over.Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    //if you have eaten the food,increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hiscore" + hiscoreval;
        }
        scoreBox.innerHTML = "score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        // console.log(food);
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
        // console.log(snakeArr[i]);
    }
    // console.log(snakeArr[0], inputDir)

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //part 2:Display the snake and food
    //Dispaly the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('head');
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore" + hiscore;
}


window.requestAnimationFrame(main);

// Event listeners for keyboard controls
window.addEventListener('keydown', e => {
    // Ensure snake doesn't reverse direction
    if (e.key === "ArrowUp" && inputDir.y !== 1) {
        inputDir = { x: 0, y: -1 };
    } else if (e.key === "ArrowDown" && inputDir.y !== -1) {
        inputDir = { x: 0, y: 1 };
    } else if (e.key === "ArrowLeft" && inputDir.x !== 1) {
        inputDir = { x: -1, y: 0 };
    } else if (e.key === "ArrowRight" && inputDir.x !== -1) {
        inputDir = { x: 1, y: 0 };
    }
    moveSound.play();
});

// Event listeners for touch controls
window.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    // Determine the direction based on swipe
    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0 && inputDir.x !== -1) {
            inputDir = { x: 1, y: 0 }; // Right swipe
        } else if (dx < 0 && inputDir.x !== 1) {
            inputDir = { x: -1, y: 0 }; // Left swipe
        }
    } else {
        // Vertical swipe
        if (dy > 0 && inputDir.y !== -1) {
            inputDir = { x: 0, y: 1 }; // Down swipe
        } else if (dy < 0 && inputDir.y !== 1) {
            inputDir = { x: 0, y: -1 }; // Up swipe
        }
    }
    moveSound.play();
});
