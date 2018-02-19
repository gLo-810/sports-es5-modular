//Random CONTROLLER
var randomController = (function(){
  // shuffle arrays
  function shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }

})();

// UI controller
var UIController = (function(){

  var DOMstrings = {
    picGrid: 'pic-grid-container',
    rBaseball: 'baseball',
    rFootball: 'football',
    btnDisplay: 'btn-display',
    btnReset: 'btn-reset',
    mainText:  document.getElementById('main-text'),
    names: [],
    numbers: null,
    picFrame: 'picture-frame'
  }

  var pGrid = document.getElementsByClassName(DOMstrings.picGrid),
      baseball = document.getElementById(DOMstrings.rBaseball),
      football = document.getElementById(DOMstrings.rFootall),
      display = document.getElementById(DOMstrings.btnDisplay),
      reset = document.getElementById(DOMstrings.btnReset);
      // mainText = document.getElementById(DOMstrings.textArea),
      // names = [],
      // numbers;

      // save names without submitting
      var saveNames = function() {
        DOMstrings.names = DOMstrings.mainText.value.split('\n');

        //creates a numbers array that is the same length as the names array, for indexing.
        DOMstrings.numbers = Array.from({length:DOMstrings.names.length}).map((_,i)=>i);

        console.log(DOMstrings.names);
        console.log(DOMstrings.numbers);
      }

      //display images with names
      var displayTeams = function() {
        // clear content to start fresh
         pGrid[0].innerHTML = "";
        names.forEach(function(name, i) {

            let picContainer = document.createElement('div'),
              newImg = document.createElement('img'),
              newName = document.createElement('p');
        // append the elements
          picContainer.className = DOMstrings.picFrame;
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

      return {

        getDOMstrings: function() {
          return DOMstrings;
        },

        saveInput: function() {
          return saveNames();
        }

      };

})();

// GLOBAL APP controller
var controller = (function(rCtrl, UICtrl){


  var setupEventListeners = function(){

    var DOM = UICtrl.getDOMstrings();


    // save names to array, no submit button
    DOM.mainText.addEventListener('blur', UICtrl.saveInput, false);

    // display.addEventListener('click', function() {
    //   displayEls();
    // });
    //
    // random.addEventListener('click', function() {
    //   shuffle(names);
    //   shuffle(numbers);
    //   displayEls();
    // });
    //
    // reset.addEventListener('click', function() {
    //   pGrid[0].innerHTML = "";
    // });

  }

  return {
    init: function() {
      console.log('app started!');
      setupEventListeners();
    }

  }

})(randomController,UIController);

controller.init();
