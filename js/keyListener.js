window.addEventListener('keydown', (event) => {
    if (!isOver) {
        switch (event.key) {
            case 'd':
                key.d.pressed = true;
                player1.lastKey = 'd';
                break;
            case 'a':
                key.a.pressed = true;
                player1.lastKey = 'a';
                break;
            case 'w':
                if (player1.position.y + player1.dimension.height >= groundStage_Y)
                    player1.speed.y = -15;
                break;
            case 'g':
                if (!player1.isNormalAttacking)
                    player1.normalAttack();
                break;
            case 'h':
                if (!player1.isHeavyAttacking)
                    player1.heavyAttack();
                break;
            case 'ArrowRight':
                key.ArrowRight.pressed = true;
                player2.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                key.ArrowLeft.pressed = true;
                player2.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                if (player2.position.y + player2.dimension.height >= canvas.height - 97)
                    player2.speed.y = -15;
                break;
            case '4':
                if (!player2.isNormalAttacking)
                    player2.normalAttack();
                break;
            case '5':
                if (!player2.isHeavyAttacking)
                    player2.heavyAttack();
                break;
            default:
                break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            key.d.pressed = false;
            break;
        case 'a':
            key.a.pressed = false;
            break;
        case 'ArrowRight':
            key.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = false;
            break;
        default:
            break;
    }
});