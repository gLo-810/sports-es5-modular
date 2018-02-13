let pGrid = document.getElementsByClassName('pic-grid-container'),
    // textarea = document.querySelector('textarea'),
    baseball = document.getElementById('baseball'),
    football = document.getElementById('football'),
    display = document.getElementById('btn-display'),
    reset = document.getElementById('btn-reset'),
    mainText = document.getElementById('main-text'),
    names = [],
    numbers;


// save names without submitting
function saveNames() {
  names = mainText.value.split('\n');
  numbers = Array.from({length:names.length}).map((_,i)=>i); //creates a numbers array that is the same length as the names array, for indexing.
}
// save names to array, no submit button
mainText.addEventListener('blur', saveNames, false);

// shuffle arrays
function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

//display images with names
function displayEls() {
  // clear content to start fresh
   pGrid[0].innerHTML = "";
  names.forEach(function(name, i) {

      let picContainer = document.createElement('div'),
        newImg = document.createElement('img'),
        newName = document.createElement('p');
  // append the elements
    picContainer.className = "picture-frame";
    picContainer.appendChild(newImg);
    picContainer.appendChild(newName);
    newName.textContent = name;

    if (baseball.checked) {
               newImg.src = "./assets/images/baseball/team" + numbers[i] + ".jpg";
             } else if (football.checked) {
               newImg.src = "./assets/images/football/team" + numbers[i] + ".gif";
             }
    pGrid[0].appendChild(picContainer);
  });
}

display.addEventListener('click', function() {
  displayEls();
});

random.addEventListener('click', function() {
  shuffle(names);
  shuffle(numbers);
  displayEls();
});

reset.addEventListener('click', function() {
  pGrid[0].innerHTML = "";
});
