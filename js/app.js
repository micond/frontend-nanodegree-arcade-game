// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    console.log(this);
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //if the enemy crosses off screen, reset its position.

    if (this.x <= 550) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
    }

    //If the player comes within 30px of an enemy's x and y coordinates, reset the game
    if (player.x >= this.x - 30 && player.x <= this.x + 30) {
        if (player.y >= this.y - 30 && player.y <= this.y + 30) {
            this.reset();
        }
    }

    // USE different pictures for player - after collision change character picture

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = 200;
    this.y = 400;
    console.log(this);
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt) {
    //if left key is pressed and player is not on edge of map, pressed decrement x
    if (this.Keypress === 'left' && this.x > 0) {
        this.x = this.x - 100;
        //if right key is pressed and player is not on edge of map increment x
    } else if (this.Keypress === 'right' && this.x != 400) {
        this.x = this.x + 100;
        //if up key is pressed increment y
    } else if (this.Keypress === 'up') {
        this.y = this.y - 82;
        //if down key is pressed and player is not on edge of map decrement y
    } else if (this.Keypress === 'down' && this.y != 400) {
        this.y = this.y + 82;
    }
    this.Keypress = null;

    //If on water, reset
    if (this.y < 10) {
        this.reset();
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Input handler for player
Player.prototype.handleInput = function(e) {
    this.Keypress = e;
    console.log(this);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
(function setEnemies() {
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 140));
    allEnemies.push(new Enemy(-2, 220));
}());
var player = new Player;
var CharCounter = 0;

//Reset player to beginning position. If character collides with bug change character.
Object.prototype.reset = function() {
    var characters = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];

    if (this.y > 50) {
        player.sprite = characters[CharCounter + 1];
        CharCounter = CharCounter + 1;
        if (CharCounter === 4) {
            CharCounter = -1;
        }
        console.log('sprite < 50:', player.sprite)
    };
    player.x = 200;
    player.y = 400;

    // player.sprite = charcters[1]
    // console.log(charcters[0]);
    console.log(player.sprite);
    // player.sprite = 'images/char-cat-girl.png';
    // console.log("resource:", Resources.load);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
