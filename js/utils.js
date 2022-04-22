// Collision logic 
function determineCollision({ fighter1, fighter2 }) {
    // return true if fighter1 attacks fighter2 successfully
    if (fighter1.isNormalAttacking) {
        return (
            fighter1.normalAttackBox.position.x + fighter1.normalAttackBox.width >= fighter2.position.x &&
            fighter1.normalAttackBox.position.x <= fighter2.position.x + fighter2.dimension.width &&
            fighter1.normalAttackBox.position.y + fighter1.normalAttackBox.height >= fighter2.position.y &&
            fighter1.normalAttackBox.position.y <= fighter2.position.y + fighter2.dimension.height);
    } else if (fighter1.isHeavyAttacking) {
        return (
            fighter1.heavyAttackBox.position.x + fighter1.heavyAttackBox.width >= fighter2.position.x &&
            fighter1.heavyAttackBox.position.x <= fighter2.position.x + fighter2.dimension.width &&
            fighter1.heavyAttackBox.position.y + fighter1.heavyAttackBox.height >= fighter2.position.y &&
            fighter1.heavyAttackBox.position.y <= fighter2.position.y + fighter2.dimension.height);
    } else
        return false;
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
        determineWinner({ player1, player2, timer });
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