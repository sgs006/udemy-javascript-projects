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

  return {
    addItem: function(type, des, val) {
      var newItem;
      //Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Create new item based on 'inc' or 'exp' type
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      // Push it into our data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },

    testing: function() {
      console.log(data);
    }
  };
})();

//UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHTMl, element;
      // Create HTLM string with placeholder
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline" /></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><iclass="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace placeholder with actual data
      newHTML = html.replace("%id%", obj.id);
      newHTML = newHTML.replace("%description%", obj.description);
      newHTML = newHTML.replace("%value%", obj.value);

      //Insert HTLM into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);
    },
    //clears input fields for next input
    clearFields: function() {
      var fields, fieldsArray;
      //creates list of values
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      //converts list of values to array so we can use forEach
      fieldsArray = Array.prototype.slice.call(fields);
      //Loops over our array setting all values to empty
      fieldsArray.forEach(function(current, index, array) {
        current.value = "";
      });
      //set cursor back to description box
      fieldsArray[0].focus();
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
        //.which is added for older browsers
        ctrlAddItem();
      }
    });
  };
  var updateBudget = function() {
    //1. Calculate the budget
    //2. Return the budget
    //3. Display the budget on the UI
  };

  //This function adds a new item from input
  var ctrlAddItem = function() {
    var input, newItem;
    //1. Get the filed input data
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      //3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      //4. Clear the fields
      UICtrl.clearFields();

      //5. Calculate and update the budget
      updateBudget();
    }
  };

  return {
    init: function() {
      console.log("Application has started");
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
