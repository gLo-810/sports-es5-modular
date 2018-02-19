// //Random CONTROLLER
// var randomController = (function(a){
//   // shuffle arrays
//   var fisherYates = function(a) {
//       for (var i = a.length; i; i--) {
//         var j = Math.floor(Math.random() * i);
//         [a[i - 1], a[j]] = [a[j], a[i - 1]];
//     }
//   }
//
//   return {
//     shuffle: function(){
//       return fisherYates();
//     }
//   }
//
// })();

// UI controller
var UIController = (function(){

  var DOMstrings = {
    picGrid: document.getElementsByClassName('pic-grid-container'),
    baseball: document.getElementById('baseball'),
    football: document.getElementById('football'),
    btnDisplay: document.getElementById('btn-display'),
    btnReset:  document.getElementById('btn-reset'),
    btnRandom: document.getElementById('random'),
    mainText:  document.getElementById('main-text'),
    names: [],
    numbers: null,
    picFrame: 'picture-frame'
  }

      // save names without submitting
      var saveNames = function() {
        DOMstrings.names = DOMstrings.mainText.value.split('\n');

        //creates a numbers array that is the same length as the names array, for indexing.
        DOMstrings.numbers = Array.from({length:DOMstrings.names.length}).map((_,i)=>i);

        console.log(DOMstrings.names);
        console.log(DOMstrings.numbers);
      }

      //display images with names
      var display = function() {
        // clear content to start fresh
        DOMstrings.picGrid[0].innerHTML = "";
        DOMstrings.names.forEach(function(name, i) {

          var picContainer = document.createElement('div'),
              newImg = document.createElement('img'),
              newName = document.createElement('p');
        // append the elements
          picContainer.className = DOMstrings.picFrame;
          picContainer.appendChild(newImg);
          picContainer.appendChild(newName);
          newName.textContent = name;

          if (baseball.checked) {
                newImg.src = "./assets/images/baseball/team" + DOMstrings.numbers[i] + ".jpg";
           } else if (football.checked) {
                newImg.src = "./assets/images/football/team" + DOMstrings.numbers[i] + ".gif";
           }
          DOMstrings.picGrid[0].appendChild(picContainer);
        });
      }

      return {

        getDOMstrings: function() {
          return DOMstrings;
        },

        saveInput: function() {
          return saveNames();
        },

        displayTeams: function() {
          return display();
        }

      };

})();

// GLOBAL APP controller
var controller = (function(UICtrl){



  var setupEventListeners = function(){

    var DOM = UICtrl.getDOMstrings();

    var shuffle = function(a) {
          for (var i = a.length; i; i--) {
            var j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
      }

    // save names to array, no submit button
    DOM.mainText.addEventListener('blur', UICtrl.saveInput, false);

    DOM.btnDisplay.addEventListener('click', function() {
      UICtrl.displayTeams();
    });

    DOM.btnRandom.addEventListener('click', function() {
      shuffle(DOM.names);
      shuffle(DOM.numbers);
      UICtrl.displayTeams();
    });

    DOM.btnReset.addEventListener('click', function() {
      DOM.picGrid[0].innerHTML = "";
    });

  }

  return {
    init: function() {
      console.log('app started!');
      setupEventListeners();
    }

  }

})(UIController);

controller.init();
