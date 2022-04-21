// Collision logic
function determineCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.dimension.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.dimension.height);
}

// Winner logic
var isOver = false;
function determineWinner({ player1, player2, timer }) {
    clearTimeout(timer);
    isOver = true;
    document.querySelector('#result').style.display = 'flex';
    // document.querySelector('#retry').style.display = 'inline';
    if (player1.remainingHealth === player2.remainingHealth) {
        document.querySelector('#result').innerHTML = 'Tie';
    } else if (player1.remainingHealth > player2.remainingHealth) {
        document.querySelector('#result').innerHTML = player1.name + ' win';
    } else if (player1.remainingHealth < player2.remainingHealth) {
        document.querySelector('#result').innerHTML = player2.name + ' win';
    }
}

//Timer countdown
var time = gameTime;
var timer;
function descreaseTimer() {
    timer = setTimeout(descreaseTimer, 1000);
    if (time > 0) {
        time--;
        document.querySelector('#timer').innerHTML = time;
    }

    //End game on time out
    if (time === 0) {
        determineWinner({ player, enemy, timer });
    }
}

// Reset timer and health
function Retry() {
    isOver = false;
    time = gameTime;
    descreaseTimer();

    // Player reset
    player.remainingHealth = player.maxHealth;
    player.switchSprite('idle');
    player.position = { x: 100, y: 0 }
    // player.image = player.sprites.idle.image;
    // player.framesMax = player.sprites.idle.framesMax
    // player.framesCurrent = 0;


    // Enemy reset
    enemy.remainingHealth = enemy.maxHealth;
    enemy.switchSprite('idle');
    enemy.position = { x: 880, y: 0 }
    // enemy.image = enemy.sprites.idle.image;
    // enemy.framesMax = enemy.sprites.idle.framesMax
    // enemy.framesCurrent = 0;

    document.querySelector('#player-remaining-health').style.width = '100%';
    document.querySelector('#enemy-remaining-health').style.width = '100%';
    document.querySelector('#retry').style.display = 'none';
    document.querySelector('#result').style.display = 'none';
}