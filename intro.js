window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
  };
  
  function startGame() {
    document.getElementById("game-intro").style.display = "none"; // Hide the game intro
    document.getElementById("game-board").style.display = "block";
    updateCanvas();
  }
  

const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');
console.log(canvas1)
const img = new Image();
img.src = '../images/seabed.png';
console.log(img.src)

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

function updateCanvas() {

  backgroundImage.move();

  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  backgroundImage.draw();

  player.newPos();
  player.update();

  requestAnimationFrame(updateCanvas);
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

    // Add event listeners for arrow key presses
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
  }

  movePlayer(event) {
    switch (event.key) {
      // Arrow up
      case 'ArrowUp':
          this.speedY = -5;
        break;
      // Arrow down
      case 'ArrowDown':
        this.speedY = 5;
        break;
      // Arrow left
      case 'ArrowLeft':
        this.speedX = -5;
        break;
      // Arrow right
      case 'ArrowRight':
        this.speedX = 5;
        break;
    }
  }

  stopPlayer(event) {
    switch (event.key) {
      // Arrow up or down key released
      case 'ArrowUp':
      case 'ArrowDown':
        this.speedY = 0;
        break;
      // Arrow left or right key released
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
}

const playerImageSrc = '/images/fisher.png'; 
const player = new Component(100, 100, playerImageSrc, 50, 270);

