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
    } else {
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

  medusas.forEach((medusa) => medusa.update());

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
    }

    update() {
        const ctx = canvas1.getContext('2d');
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
    

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
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
const player = new Component(80, 80, playerImageSrc, 50, 270);

const medusas = [];

function spawnMedusa() {
    const medusaImageSrc = "/images/medusa.png";
    const medusaSpeed = 2; // Set your desired medusa speed
    const newMedusa = new medusa(medusaImageSrc, medusaSpeed);
    medusas.push(newMedusa);
  }
  setInterval(spawnMedusa, 2000)

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
          this.x -= this.dx * 2.5; // Increase the horizontal movement
          this.y += this.dx;
        } else if (this.angle === 60) {
          this.x -= this.dx * 2.5; // Increase the horizontal movement
          this.y -= this.dx;
        } else this.x -= this.dx;
      }

    //   move() {
    //     if (this.angle === -60) {
    //       this.x -= this.dx;
    //       this.y += this.dx;
    //     } else if (this.angle === 60) {
    //       this.x -= this.dx;
    //       this.y -= this.dx;
    //     } else this.x -= this.dx;
    //   } 

      update() {
      this.move();
      this.draw();
     }
}




