window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
};
const gameOver = new Audio('./audio/gameOverSound.mp3');
gameOver.volume = 0.4;
const scoringSound = new Audio('./audio/scoring.mp3')
const losingLife = new Audio('./audio/losing.mp3');
losingLife.volume = 0.8;
const gameAudio = new Audio('./audio/gameMusic.mp3');
gameAudio.volume = 0.2;

function startGame() {
  document.getElementById("game-intro").style.display = "none"; 
  document.getElementById("game-board").style.display = "block";
  gameAudio.loop = true;
  gameAudio.play();
  updateCanvas();
}

const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');
const img = new Image();
img.src = './images/seabed.png';


const backgroundImage = {
img: img,
x: 0,
speed: -1,

move: function() {
  this.x += this.speed;
  this.x %= canvas1.width;
},

draw: function() {
  const scaledWidth = canvas1.width;
  const scaledHeight = canvas1.height;

  ctx.drawImage(this.img, this.x, 0, scaledWidth, scaledHeight);

  if (this.speed < 0) {
    ctx.drawImage(this.img, this.x + canvas1.width, 0, scaledWidth, scaledHeight);
  } 
  else {
  ctx.drawImage(this.img, this.x - this.img.width, 0, scaledWidth, scaledHeight);
  }
},
};

let gameRunning = true; 
let score = 0; 
let lives = 3; 

function updateCanvas() {

if(!gameRunning) {
  return;
}
else {  
backgroundImage.move();

ctx.clearRect(0, 0, canvas1.width, canvas1.height);
backgroundImage.draw();

player.newPos();
player.update();


medusas.forEach((medusa, index) => { 
  let medusaCollided = false;
  medusa.update();
  if (player.crashWith(medusa)) {
    medusaCollided = true; 
    medusas.splice(index,1);
    losingLife.play();
  }

  if (medusaCollided) {
    lives--; 
    if (lives <=0) { 
      lives = 0; 
      gameRunning = false; 
      showGameOver();
      gameOver.play();
    }

  }
  
});

fishes.forEach((fish, index) => {
  fish.update();
  if (player.crashWith(fish)) {
    score += 100;
    fishes.splice(index, 1); 
    scoringSound.play();
  }
});

displayScore(); 
displayLives(); 

if (!gameRunning) {
  return;
} else {
 
  requestAnimationFrame(updateCanvas);
}
}
}

class Component {
  constructor(width, height, imageSrc, x, y) {
     
    this.width = width;
    this.height = height;
    this.image = new Image(); 
    this.image.src = imageSrc;
    this.x = x;
    this.y = y;

    this.speedY = 0;
    this.speedX = 0

  document.addEventListener('keydown', (event) => this.movePlayer(event));
  document.addEventListener('keyup', (event) => this.stopPlayer(event));

  }

  update() {
      const ctx = canvas1.getContext('2d');
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  

newPos() {
  this.x += this.speedX;
  this.y += this.speedY;

  this.checkBounds();
}

movePlayer(event) {
  switch (event.key) {
   
    case 'ArrowUp':
        this.speedY = -5;
      break;
   
    case 'ArrowDown':
      this.speedY = 5;
      break;
   
    case 'ArrowLeft':
      this.speedX = -5;
      break;
   
    case 'ArrowRight':
      this.speedX = 5;
      break;
  }
}

stopPlayer(event) {
  switch (event.key) {
  
    case 'ArrowUp':
    case 'ArrowDown':
      this.speedY = 0;
      break;
    
    case 'ArrowLeft':
    case 'ArrowRight':
      this.speedX = 0;
      break;
  }
}

left() {
  return this.x;
}
right() {
  return this.x + this.width;
}
top() {
  return this.y;
}
bottom() {
  return this.y + this.height;
}

crashWith(obstacle) {
  return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
}

checkBounds() {
  if (this.x < 0) {
    this.x = 0;
  }
  if (this.x + this.width > canvas1.width) {
    this.x = canvas1.width - this.width;
  }
  if (this.y < 0) {
    this.y = 0;
  }
  if (this.y + this.height > canvas1.height) {
    this.y = canvas1.height - this.height;
  }
}
}

const playerImageSrc = './images/fisher.png'; 
const player = new Component(80, 80, playerImageSrc, 50, 270);

const medusas = [];

function spawnMedusa() {
  const medusaImageSrc = "./images/medusa.png";
  const medusaSpeed = 2; 
  const newMedusa = new medusa(medusaImageSrc, medusaSpeed);
  medusas.push(newMedusa);
}
setInterval(spawnMedusa, 1500)

class medusa {
  constructor(imageSrc, medusaSpeed) {
      this.image = new Image();
      this.image.src = imageSrc;
      this.speed = medusaSpeed;
      this.width = 80;
      this.height = 80;
      this.x = 1300;
      this.y = Math.random() * canvas1.height;
      this.angle = this.angle();
      this.dx = 1 * this.speed;
      this.yx = 1 * this.speed;
      this.radius = 20;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle * Math.PI / 360);
      ctx.drawImage(this.image, 0, 0, this.width, this.height);
      ctx.restore();
    }

    angle() {
      if (this.y <= 150) return -60;
      else if (this.y >= 151 && this.y <= 300) return 0;
      else return 60;
    }

    move() {
      if (this.angle === -60) {
        this.x -= this.dx * 2.5; 
        this.y += this.dx;
      } else if (this.angle === 60) {
        this.x -= this.dx * 2.5; 
        this.y -= this.dx;
      } else this.x -= this.dx;
    }

    update() {
    this.move();
    this.draw();
   }

   top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }
}

const fishes = [];

function spawnFish() {
  const fishSpeed = 1.5; 
  const newFish = new fish(fishSpeed);
  fishes.push(newFish);
}

setInterval(spawnFish, 4000); 


class fish extends medusa {
  constructor(fishSpeed) {
      super(fishSpeed);
  
      this.image = new Image();
      this.image.src = "./images/fish.png";
      this.x = Math.random() * canvas1.clientWidth + 900;
      this.y = Math.random() * canvas1.clientHeight;
      this.speed = fishSpeed;
      this.angle = 0;
      this.dx = 1 * this.speed;
      this.yx = 1 * this.speed;
      this.radius = 100;
      this.width = 40;
      this.height = 40;
    }

  update(){
      this.move();
      this.draw();
  }
}

function showGameOver() {

    cancelAnimationFrame(updateCanvas);

    ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  
    ctx.drawImage(img, 0, 0, canvas1.width, canvas1.height);

    gameAudio.pause();
  
    ctx.font = "50px Cursive";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game over", canvas1.width / 2 - 50, canvas1.height / 2 - 40);
  
    ctx.font = "40px Cursive";
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";
    ctx.fillText("You made: " + score + " points !", canvas1.width / 2 - 50, canvas1.height / 2 + 40);

    const resetButton = document.createElement('button');
    resetButton.id = 'reset-button';
    resetButton.innerHTML = 'Restart Game';
    resetButton.onclick = resetGame;
    document.getElementById('game-board').appendChild(resetButton);
}

function displayScore() {
ctx.font = "20px Arial";
ctx.fillStyle = "blue";
ctx.fillText("Score: " + score, canvas1.width -150, 50);
}

function displayLives() {
ctx.font = "20px Arial";
ctx.fillStyle = "red";
ctx.fillText("Lives: " + lives, canvas1.width -150, 80);
}

function resetGame(){
    gameRunning = true;
    score = 0;
    lives = 3;
    player.x = 50;
    player.y = 270;
    medusas.length = 0;
    fishes.length = 0;
    gameAudio.play();

    const resetButton = document.getElementById('reset-button');
    if(resetButton){
        resetButton.style.display = 'none';
    }

    document.getElementById('game-board').style.display = 'block'

    startGame();
}
