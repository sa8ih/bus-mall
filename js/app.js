var allImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images [];

function Image(imgName, imgPath) {
  this.imgName = imgName; //Name of the picture.
  this.imgPath = 'images/' + imgPath; //File path of the picture.
  this.clicked = 0; //How many times this picture has been clicked.
  this.viewed = 0; //How many times this picture has been viewed.
  this.imageId = ''; //The ID to be stored when inserting the element into the DOM.
};

function randomizes() {
  for (var i = 0, i <3, i++) {
    var randoNum (math.floor(math.random() * allImages.length));
    images.push(new image(allImages[randoNum].split('.')[0], allImages[randoNum]));
  }
}

var imageOne = new Image(allImages[0].split('.')[0], allImages[0]);
var imageTwo = new Image(allImages[1].split('.')[0], allImages[1]);
var imageThree = new Image(allImages[2].split('.'[0]), allImages[2]);
