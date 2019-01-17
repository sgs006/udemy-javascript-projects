//BUDGET CONTROLLER
var budgetController = (function() {
  //constructor functions that creat objects which set our inputs
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //data struction object to hold all our data
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
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
  //sets up all our event listeners for organization
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  //This function adds a new item from input
  var ctrlAddItem = function() {
    //1. Get the filed input data
    var input = UICtrl.getInput();

    //2. Add the item to the budget controller
    //3. Add the item to the UI
    //4. Calculate the budget
    //5. Display the budget on the UI
  };

  return {
    init: function() {
      console.log("Application has started");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
