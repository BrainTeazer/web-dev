let allNumbers = /[\d.]/;
let allOperators = /[+-/*]/;

let operatorCheck = 0; // has an operator already been pressed (for chain calcualtion)
let num1 = "";
let num2 = "";
let operator = "";
let isNum1 = true; //checks whether the number being inputted is the first one
let negative = 0; //checks whether negative sign is pressed after pressing multiply or divide
let nextSide = 0; //checks whether to clear the display for the next number after pressing operator

const display = document.querySelector("#display");

function greaterThanTen() {
  if (display.textContent.length > 10) {
    display.textContent = display.textContent.slice(0, -1);
    num1 = num1.slice(0, -1);
    num2 = num2.slice(0, -1);
  }
}

function percent() {
  if (isNum1) {
    operate(operator, Number(num1));
    num1 = result;
  } else {
    operate(operator, Number(num2));
    num2 = result;
  }
  display.textContent = result;
}

function numDigits(x) {
  return ("" + x).length;
}

function checkResult() {
  if (numDigits(result) > 10 && result.toString().includes(".")) {
    result = result.toFixed(10 - ("" + result).split(".")[0].length - 1);
  } else if (numDigits(result) > 10) {
    trueResult = result;
    result = result.toString().slice(0, 10);
    alert("Result is too long so has been shortened. The real true result is " + trueResult);
    return result;
  } else {
    return result;
  }
}

mathOperators = {
  add: function (num1, num2) {
    result = num1 + num2;
    checkResult();
  },
  substract: function (num1, num2) {
    result = num1 - [num2];
    checkResult();
  },
  multiply: function (num1, num2) {
    result = num1 * num2;
    checkResult();
  },
  divide: function (num1, num2) {
    result = num1 / num2;
    checkResult();
  },
  percent: function (num1) {
    result = num1 / 100;
    checkResult();
  },
  error: function () {
    result = "Error";
    return result;
  },
};

function operate(operator, num1, num2) {
  if (num2 === undefined) {
    mathOperators.percent(num1);
  } else {
    switch (operator) {
      case "+":
        mathOperators.add(num1, num2);
        break;
      case "-":
        mathOperators.substract(num1, num2);
        break;
      case "×":
        mathOperators.multiply(num1, num2);
        break;
      case "÷":
        if (num2 === 0) {
          mathOperators.error();
        } else {
          mathOperators.divide(num1, num2);
        }
        break;
      default:
        return true;
    }
  }
}

function equalOf() {
  if (num2 === "") {
    //prevents from pressing equals if second number is not pressed
    return false;
  } else {
    operate(operator, Number(num1), Number(num2));
    operator = "";
    operatorCheck = 0;
    display.textContent = result;
    num1 = result;
    num2 = "";
  }
}
let tmpdisp = "";

function changeSign() {
  if (Number(display.textContent) > 0) {
    if (isNum1) {
      num1 = `-${num1}`;
    } else {
      num2 = `-${num2}`;
    }
    if (display.textContent.length === 10) {
      tmpdisp = `${display.textContent}`.slice(-1); //stores number that is replaced by the '-' to be readded if sign is changed again
      display.textContent = `-${display.textContent}`.slice(0, 10);
    } else {
      display.textContent = `-${display.textContent}`;
    }
  } else if (Number(display.textContent < 0)) {
    if (isNum1) {
      num1 = `${num1.toString().substring(1)}`;
    } else {
      num2 = `${num2.toString().substring(1)}`;
    }
    if (display.textContent.length === 10) {
      display.textContent = display.textContent.substring(1) + tmpdisp;
    } else {
      display.textContent = `${display.textContent.substring(1)}`;
    }
  }
}

function clearAll() {
  display.textContent = "0";
  operatorCheck = 0;
  num1 = "";
  num2 = "";
  operator = "";
  negative = 0;
  nextSide = 0;
  isNum1 = true;
}

function erase() {
  display.textContent = display.textContent.slice(0, -1);
  if ((isNum1 && operator != "") || isNum1) {
    num1 = num1.toString().slice(0, -1);
    operatorCheck = 0;
    nextSide = 0; // Makes sure that on clicking number it doesn't clear display and act as if you are entering num2
  } else if (num2 === "" && operator != "") {
    operator = "";
    operatorCheck = 0;
  } else {
    num2 = num2.slice(0, -1);
  }
}

//For the AC button
const clear = document.querySelector("#clear");
clear.addEventListener("click", (e) => {
  clearAll();
});

//For the delete button
const backspace = document.querySelector("#delete");
backspace.addEventListener("click", (e) => {
  erase();
});

//For the = button
const equals = document.querySelector("#equals");
equals.addEventListener("click", (e) => {
  equalOf();
});

//For the +/- button
const plusMinus = document.querySelector("#plusMinus");
plusMinus.addEventListener("click", (e) => {
  changeSign();
});

//For the numbers
const buttons = document.querySelectorAll(".buttons");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    //If '.' has already been pressed, another one is not allowed
    if (display.textContent.indexOf(".") > -1 && e.target.textContent === ".") {
      return false;
    }

    //If an operator has been clicked then input will be stored in num2 else num1.
    if (operatorCheck > 0) {
      num2 += e.target.textContent;
      isNum1 = false;
    } else if (operatorCheck === 0) {
      num1 += e.target.textContent;
      isNum1 = true;
    }

    if (display.textContent === "0") {
      //
      //if 0 is the ONLY number on the display
      //
      display.textContent = e.target.textContent;
      //
      //if there is already a '.' then do not allow another one
      //
    } else if (display.textContent.indexOf(".") > -1 && e.target.textContent === ".") {
      display.textContent += "";
      //
      //if after operator is already clicked, a number is pressed it will clear the display and begin showing the second number
      //
    } else if (nextSide > 0) {
      if (negative > 0) {
        display.textContent = `-${e.target.textContent}`;
        negative = 0;
      } else {
        display.textContent = e.target.textContent;
      }
      nextSide = 0;
    } else {
      display.textContent += e.target.textContent;
    }

    greaterThanTen();
  });
});

//For the operators (+,-,*,/,%)
const operators = document.querySelectorAll(".operator");
operators.forEach((mathOperator) => {
  mathOperator.addEventListener("click", (e) => {
    if (e.target.textContent === "%") {
      //
      // Checks if the button clicked is %.
      //
      percent();
    } else if ((num1 === "" || (num2 === "" && operator != "")) && e.target.textContent === "-") {
      //
      //if num1 is empty OR num2 is empty AND an operator has already been pressed, then pressing substract (minus) is to make said number negative
      //
      display.textContent = "-";

      if (num1 === "") {
        num1 = "-";
      } else {
        num2 = "-";
        negative = 1;
      }
    } else if (operatorCheck === 0) {
      //
      //checks if a operator has been pressed once, if not changes operatorCheck to 1 (operator has been pressed) and also indicates that nextSide (or second number) should begin.
      //
      operator = e.target.textContent;
      operatorCheck = 1;
      nextSide = 1;
    } else {
      //
      //if an operator has already been pressed before (for chain calculations)
      //
      if (num2 === "") {
        //
        //if num2 is empty, an operator has been pressed already and minus is pressed then num2 becomes negative
        //
        if (e.target.textContent === "-") {
          display.textContent = "-";
          num2 = "-";
          negative = 1;
        } else {
          operator = e.target.textContent;
        }
      } else {
        operate(operator, Number(num1), Number(num2));
        operator = e.target.textContent;
        display.textContent = `${result}`;
        num1 = result;
        num2 = "";
        isNum1 = true;
        nextSide = 1;
      }
    }
  });
});

/* window.addEventListener("keydown", (e) => {
  function getOperator() {
    if (e.key === "*") {
      operator = "×";
    } else if (e.key === "/") {
      operator = "÷";
    } else {
      operator = e.key;
    }
  }

  if (display.textContent.length === 10) {
    return false;
  }

  if (e.key === "Backspace") {
    erase();
  }

  if (allNumbers.test(e.key) && !e.key.includes("F")) {
    if (display.textContent === "0") {
      display.textContent = e.key;
    } else if (display.textContent.indexOf(".") > -1 && e.key === ".") {
      display.textContent += "";
    } else if (nextSide > 0) {
      display.textContent = e.key;
      nextSide = 0;
    } else {
      display.textContent += e.key;
    }
    if (isNum1) {
      if (display.textContent.indexOf(".") > -1 && e.key === ".") {
        num1 += "";
      } else {
        num1 += e.key;
      }
    } else {
      if (display.textContent.indexOf(".") > -1 && e.key === ".") {
        num2 += "";
      } else {
        num2 += e.key;
      }
    }
    // console.log(num1);
    console.log(num2);
  } else if (e.key === "%") {
    percent();
  } else if (allOperators.test(e.key)) {
    isNum1 = false;

    if (operatorCheck === 0) {
      operatorCheck = 1;
      nextSide = 1;
    } else {
      //if an operator has already been pressed before (for chain calculations)
      if (num2 === "") {
        if (e.target.textContent === "-") {
          display.textContent = "-";
          num2 = "-";
          negative = 1;
        } else {
          getOperator();
        }
      } else {
        operate(operator, Number(num1), Number(num2));
        getOperator();
        display.textContent = `${result}`;
        num1 = result;
        num2 = "";
        nextSide = 1;
      }
    }
    getOperator();
  } else if (e.key === "Enter" || e.key === "=") {
    equalOf();
  }
}); */
