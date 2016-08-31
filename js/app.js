var allImages = []; //Empty array to hold all image objects
var currentImages = ['', '', '']; //currentImages needs to be initialized with 3 blank values to work properly
var iterations = 0; //Keep track of the number of times images have been looked at

//Fill the allImages array with all required image objects
function createImageArray() {
  var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

  //Constructor function for each new image object
  function CreateImage(imgName, imgPath) {
    this.imgName = imgName; //Name of the picture.
    this.imgPath = 'images/' + imgPath; //File path of the picture.
    this.clicked = 0; //How many times this picture has been clicked.
    this.viewed = 0; //How many times this picture has been viewed.
    this.justViewed = false; //The picture has not been viewed recently
    this.allSuck = 0;
    this.elementId;
  };

  //Create an object for each image, stored in the allImages array
  for (var h = 0; h < imagePaths.length; h++) {
    allImages.push(new CreateImage(imagePaths[h].split('.')[0], imagePaths[h]));
  }
}

//Change currentImages to be an array of 3 images randomly chosen with no repeats of the recently viewed images.
function randomizer() {
  for (var i = 0; i < 3; i++) { //Run this 3 times to get 3 images.
    var randomNum = Math.floor(Math.random() * allImages.length); //Pick a random number between 0 and 19.
    if (allImages[randomNum].justViewed === false) { //If the randomly selected image has not been viewed.
      currentImages.push(allImages[randomNum]); //Add the selected image to the currentImages array.
      allImages[randomNum].justViewed = true; //And store that it has been recently viewed.
      allImages[randomNum].viewed++; //Increment the number of times this image has been viewed.
    } else {
      i--; //If it has been recently viewed, do nothing and run the loop an additional time.
    }
  }
  //currentImages will have 6 items, with the last 3 being the most recent images, and the first 3 being the previous set. Since we know the first 3 are not matches to the last 3 from our previous for loop and if statement, we can safely set the first 3 images' justViewed flag to false.
  for (var j = 0; j < 3; j++) {
    currentImages[j].justViewed = false;
  }
  //We can then remove the first 3 items of the array so that currentImages is only an array of the 3 most recent images again.
  currentImages.splice(0, 3);
}

function render() {
  for (var k = 1; k < 4; k++) {
    document.getElementById(('img_' + k)).setAttribute('src', currentImages[k - 1].imgPath);
    currentImages[k - 1].elementId = k;
  }
}

//The function to be called when an image is clicked on
function selectImage(event) {
  iterations++;
  var selectedImage = event.target.id; //Get the ID of the element that triggered the event
  //Check each object in the currentImages array. If its stored ID is equal to the ID of the clicked element, then add 1 to the number of times it's been clicked.
  for (var l = 0; l < 3; l++) {
    if (parseInt(selectedImage.split('img_')[1]) === currentImages[l].elementId) {
      currentImages[l].clicked++;
    }
  }
  if (event.target.id === 'button') {
    for (var s = 0; s < 3; s++) {
      currentImages[s].allSuck++;
    }
  }
  if (iterations < 25) { //If the focus group participant has viewed less than 25 groups of images
    randomizer();
    render();
  } else { //If the participant has viewed 25 groups of images, display the chart
    for (var q = 1; q < 4; q++) {
      document.getElementById('img_' + q).style.display = 'none'; //Hide all images
    }
    drawChart();
  }
}

//Add event listeners to all 3 images.
function createEventListeners() {
  for (var m = 1; m < 4; m++) {
    document.getElementById('img_' + m).addEventListener('click', selectImage);
  }
  document.getElementById('button').addEventListener('click', showImages);
}

//Remove paragraphs and headings, show the images
function showImages() {
  var imageElements = document.getElementsByTagName('img');
  var headerElements = document.getElementsByTagName('h2');
  var paragraphElements = document.getElementsByTagName('p');
  for (var t = 0; t < imageElements.length; t++) {
    imageElements[t].style.display = 'inline-block';
  }
  for (var u = 0; u < headerElements.length; u++) {
    headerElements[u].style.display = 'none';
  }
  for (var v = 0; v < paragraphElements.length; v++) {
    paragraphElements[v].style.display = 'none';
  }
  var btn = document.getElementById('button');
  btn.textContent = 'These all suck';
  btn.removeEventListener('click', showImages);
  btn.addEventListener('click', selectImage);
}

//Create a bar chart of necessary data.
function drawChart() {
  document.getElementById('chart_container').style.display = 'block';
  document.getElementById('button').style.display = 'none';
  var labelNames = []; //Create an array of all the objects' names to be used in the chart's "labels" data.
  //Create an array of all the objects' clicked counts to be used in the chart's datasets->data.
  var allClicks = [];
  var allSucks = [];
  var backgroundColors = []; //An array of background colors for the chart.
  var backgroundColorsViews = []; //Array of background colors for the views chart.
  var backgroundColorsSucks = [];
  var borderColors = []; //An array of border colors for the chart.
  var allViews = []; //An array of all objects' view counts to be stored for a chart overlay
  for (var p = 0; p < allImages.length; p++) {
    labelNames.push(allImages[p].imgName);
    allClicks.push(allImages[p].clicked);
    backgroundColors.push('#00b236'); //Set the click bar's background color to green.
    borderColors.push('#000'); //All borders are black.
    allViews.push(allImages[p].viewed);
    backgroundColorsViews.push('#ff0200'); //Set the view bar's background color to red.
    allSucks.push(allImages[p].allSuck);
    backgroundColorsSucks.push('rgba(138, 0, 224, 0.6');
  }
  var ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelNames, //The array of names for all image objects
      datasets: [
        {
          label: 'Viewed, but all sucked',
          data: allSucks,
          backgroundColor: backgroundColorsSucks,
          borderColor: borderColors,
          borderWidth: 1
        },
        {
          label: 'Number of clicks per image',
          data: allClicks, //The array of number of clicks for all image objects
          backgroundColor: backgroundColors, //The array of background colors for all image objects
          borderColor: borderColors, //The array of borders for all image objects (black)
          borderWidth: 1
        },
        {
          label: 'Number of views per image',
          data: allViews,
          backgroundColor: backgroundColorsViews,
          borderColor: borderColors,
          borderWidth: 1
        }
      ]
    },
    options: {
      maintainAspectRatio: false, //Do not maintain the aspect ratio when the chart is drawn
      legend: {
        labels: {
          fontColor: '#000', //Make the legend text black
          fontSize: 24, //Make the legend text 36px
          padding: 70
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontSize: 20, //Set the y-values to be 20px
            fixedStepSize: 1, //Have the chart's y-values go up by 1
            beginAtZero: true //Start the chart at 0
          }
        }],
        xAxes: [{
          stacked: true,
          ticks: {
            fontSize: 24 //Set the x-values (names) to be 24px
          }
        }]
      }
    }
  });
}

function init() {
  createImageArray();
  createEventListeners();
  randomizer();
  render();
}

init();
