var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images [];
var currentImages = ['', '', '']; //This will be my array that gets populated.
//^^also set this up so it repopulates each click(event listener)
//this is how I will know not to repeat same items.

function Image(imgName, imgPath) {
  this.imgName = imgName;
  this.imgPath = 'img/' + imgPath; //want property to automatically join IMG directory with file name!^^
  this.clicked = 0;
  this.viewed = 0;
  this.recentView === false; //This is how i will establish if it was shown.
  this.elementId = ''; //This creates elementId so i can style and place accordingly
};

//need to create new object for each image based on literal object contructor.
//use imagePath and imagePaths
for (var b = 0; b < imagePaths.length; b++) {
  allImages.push(new Image(imagePaths[b].split('.')[0], imagePaths[b]));
}
//^^ used b because created randomizes funtion first. Keep track!!!

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}//^^This is used in order to get a random integer between 0 and 19(inclusive)
//0 and 19 becaue theyre are 20 objects in array. see below.


function randomizer() {
  for (var i = 0, i <3, i++) {
    var randomNum = getRandomIntInclusive(0, 19);
  }//runs 3 times to produce 3 random numbers to call from imagePaths array
}
