// define variables
var game;
var player;
var platforms;
var badges;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;

var poison;
var coin;
var star;

// add collectable items to the game
  function addItems() {
  coin = game.add.physicsGroup();
  poison = game.add.physicsGroup();
  star = game.add.physicsGroup();
  createCoin(225, 500, 'coin');
  createCoin(575, 500, 'coin');
  createCoin(375, 400, 'coin');
  createCoin(525, 300, 'coin');
  createCoin(650, 250, 'coin');
  createCoin(100, 250, 'coin');
  createCoin(225, 200, 'coin');
  createPoison(375, 100, 'poison');
  createCoin(575, 150, 'coin');
  createPoison(375, 500, 'poison');
  createStar(125, 50, 'star');
}

// add platforms to the game
function addPlatforms() {
    platforms = game.add.physicsGroup();
    platforms.create(100, 550, 'platform');
    platforms.create(450, 550, 'platform');
    platforms.create(300, 450, 'platform2');
    platforms.create(400, 350, 'platform2');
    platforms.create(650, 300, 'platform');
    platforms.create(50, 300, 'platform');
    platforms.create(150, 250, 'platform');
    platforms.create(250, 150, 'platform');
    platforms.create(550, 200, 'platform2');
    platforms.create(100, 100, 'platform2');
    platforms.setAll('body.immovable', true);
  }

// create a single animated item and add to screen
function createCoin(left, top, image) {
  var Coin = coin.create(left, top, image);
  Coin.animations.add('spin');
  Coin.animations.play('spin', 10, true);
}
function createPoison(left, top, image) {
  var Poison = poison.create(left, top, image);
  Poison.animations.add('spin');
  Poison.animations.play('spin', 5, true);
}
function createStar(left, top, image) {
  var Star = star.create(left, top, image);
  Star.animations.add('spin');
  Star.animations.play('spin', 5, true);
}



// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen


function poisonHandler(player, Poison) {

  Poison.kill();
  currentScore = currentScore -  10;

}

function starHandler(player, Star) {

  Star.kill();
  currentScore = currentScore + 50;
  
  if (currentScore >= winningScore) {
      createBadge();
  }

}
function coinHandler(player, Coin) {

  Coin.kill();
  currentScore = currentScore + 10;
 
  if (currentScore >= winningScore) {
      createBadge();
  }

}


// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#ddf542';
    
    //Load images
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform2', 'platform_2.png');
    
    //Load spritesheets
    game.load.spritesheet('player', 'mikethefrog.png', 32, 0);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('poison', 'poison.png', 32, 0);
    game.load.spritesheet('star', 'star.png', 32, 30);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, coin, coinHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    game.physics.arcade.overlap(player, poison, poisonHandler);
    game.physics.arcade.overlap(player, star, starHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
  }

  function render() {

  }

};