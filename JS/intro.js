// create game area

const myGameArea = {
    canvas: document.getElementById('canvas'),
    start: function() {
      this.canvas.width = 800;
      this.canvas.height = 500;
      this.context = this.canvas.getContext('2d');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
  };


// draw background
// const seaBed = new Image();
// seaBed.src = "../gameLab/images/seabed.png";

// seaBed.onload = function(){
//     context.drawImage(seaBed,0,0, canvas.width, canvas.height);
// };

// draw fisher cat on Canvas 
 class fisherCat {
    constructor(){
        this.x = 20;
        this.y = 100;
        this.width = 100;
        this.height = 60;

// load the image
    const img = new Image();
    img.addEventListener('load',()=> {
        // once image loaded => draw
        this.img = img;
        this.draw();
    })
    img.src ="../gameLab/images/fisher.png";
    }
 }
 

// fisherCat.onload = function(){
//     context.drawImage(fisherCat,20,100,100,60);
// }

// move fisher cat 
// function moveCat(event){
//     let catSpeed = 3;
//     switch(event.code){
//         case "ArrowLeft":
//             catX -= catSpeed;
//         break;
//         case "ArrowRight":
//             catX += catSpeed;
//         break;  
//         case "ArrowLUp":
//             catY -= catSpeed;
//         break;
//         case "ArrowDown":
//             catY += catSpeed;
//         break;
//     }
// }


