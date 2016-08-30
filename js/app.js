var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var allImages = [];
var currentImages = ['', '', '']; //This will be my array that gets populated.
//^^also set this up so it repopulates each click(event listener)
//this is how I will know not to repeat same items.
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}//^^This is used in order to get a random integer between 0 and 19(inclusive)
//0 and 19 becaue theyre are 20 objects in array. see below.

function Image(imgName, imgPath) {
  this.imgName = imgName;
  this.imgPath = 'img/' + imgPath; //want property to automatically join IMG directory with file name!^^
  this.clicked = 0;
  this.viewed = 0;
  this.justViewed === false; //This is how i will establish if it was shown.
  this.elementId = ''; //This creates elementId so i can style and place accordingly
};

//need to create new object for each image based on literal object contructor.
//use imagePath and imagePaths
for (var b = 0; b < imagePaths.length; b++) {
  allImages.push(new Image(imagePaths[b].split('.')[0], imagePaths[b]));
}
//^^ used b because created randomizes funtion first. Keep track!!!

function randomizer() {
  for (var i = 0; i < 3; i++) {
    var randomNum = getRandomIntInclusive(0, 19);
    if (allImages[randomNum].justViewed === false) { //If randomImg is not viewed
    currentImages.push(allImages[randomNum]); //Add to currentImages
    allImages[randomNum].justViewed = true; //And store that it has been recently viewed.
    allImages[randomNum].viewed++; //viewes will increase by 1 but will only run 3 times..
  } else {
      i--; //If recently viewed, run the loop an additional time.
    }
  }
//^^This will make loop run untill i hits 3. **test** Passed!
//for some reason my array is not filling?!?!? confused, and moving forward for now***

//ran console.log - currentImages displaying 6 objects in array, first 3 have already been viewed.
for (var j = 0; j < 3; j++) {
  currentImages[j].justViewed = false;
}
//^^set first 3 images in justViewed = false// also we can splice them(remove from array)
currentImages.splice(0, 3);
