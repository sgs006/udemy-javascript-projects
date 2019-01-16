//BUDGET CONTROLLER
var budgetController = (function() {
  //Some code
})();

//UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    //make DOMstrings object accessible outside UIController scope.
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  var DOM = UICtrl.getDOMstrings();

  var ctrlAddItem = function() {
    //1. Get the filed input data
    var input = UICtrl.getInput();
    console.log(input);

    //2. Add the item to the budget controller
    //3. Add the item to the UI
    //4. Calculate the budget
    //5. Display the budget on the UI
  };

  document
    .querySelector(DOM.inputButton)
    .addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", function(e) {
    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
