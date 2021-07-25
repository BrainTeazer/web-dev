let allNumbers = /[\d.]/;
let allOperators = /[+-/*]/;

let operatorCheck = 0; // has an operator already been pressed (for chain calcualtion)
let num2 = "";
let num1 = "";
let operator = "";
let num1Check = 1; //checks whether the number being inputted is the first one
let negative = 0; //checks whether negative sign is pressed after pressing multiply or divide
let nextSide = 0; //checks whether to clear the display for the next number after pressing operator

function greaterThanTen() {
  if (display.textContent.length > 10) {
    display.textContent = display.textContent.slice(0, -1);
    num1 = num1.slice(0, -1);
    num2 = num2.slice(0, -1);
  }
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
    operatorCheck = 0;
    operate(operator, Number(num1), Number(num2));
    operator = "";
    display.textContent = result;
    num1 = result;
    num2 = "";
  }
}

function changeSign() {
  if (Number(display.textContent) > 0) {
    num1 = `-${num1}`;
    display.textContent = `-${display.textContent}`;
  } else if (Number(display.textContent < 0)) {
    num1 = `${num1.substring(1)}`;
    display.textContent = `${display.textContent.substring(1)}`;
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
  num1Check = 1;
}

function erase() {
  display.textContent = display.textContent.slice(0, -1);
  if (num2 === "" && operator != "") {
    operator = "";
    operatorCheck = 0;
  } else if (num1Check > 0) {
    num1 = num1.slice(0, -1);
  } else {
    num2 = num2.slice(0, -1);
  }
}
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".buttons");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (operatorCheck > 0) {
      if (display.textContent.indexOf(".") > -1 && e.target.textContent === ".") {
        num2 = num2;
      } else {
        num2 += e.target.textContent;
      }
      num1Check = 0;
    } else if (operatorCheck === 0) {
      if (display.textContent.indexOf(".") > -1 && e.target.textContent === ".") {
        num1 = num1;
      } else {
        num1 += e.target.textContent;
      }
      num1Check = 1;
    }
    if (display.textContent === "0") {
      //if 0 is the ONLY number on the display
      display.textContent = e.target.textContent;
    } else if (display.textContent.indexOf(".") > -1 && e.target.textContent === ".") {
      display.textContent += "";
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

const operators = document.querySelectorAll(".operator");

function percent() {
  if (num1Check > 0) {
    operate(operator, Number(num1));
    num1 = result;
  } else {
    operate(operator, Number(num2));
    num2 = result;
  }
  display.textContent = result;
}

operators.forEach((mathOperator) => {
  mathOperator.addEventListener("click", (e) => {
    if (e.target.textContent === "%") {
      // Checks if the button clicked is %.
      percent();
    } else if (num1 === "" && e.target.textContent === "-") {
      display.textContent = "-";
      num1 = "-";
    } else if (num2 === "" && operator != "" && e.target.textContent === "-") {
      display.textContent = "-";
      num2 = "-";
      negative = 1;
    } else if (operatorCheck === 0) {
      operator = e.target.textContent;
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
          operator = e.target.textContent;
        }
      } else {
        operate(operator, Number(num1), Number(num2));
        operator = e.target.textContent;
        display.textContent = `${result}`;
        num1 = result;
        num2 = "";
        nextSide = 1;
      }
    }
  });
});

const clear = document.querySelector("#clear");

clear.addEventListener("click", (e) => {
  clearAll();
});

const backspace = document.querySelector("#delete");

backspace.addEventListener("click", (e) => {
  erase();
});

const equals = document.querySelector("#equals");

equals.addEventListener("click", (e) => {
  equalOf();
});

const plusMinus = document.querySelector("#plusMinus");

plusMinus.addEventListener("click", (e) => {
  changeSign();
});

window.addEventListener("keydown", (e) => {
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
    } else {
      display.textContent += e.key;
    }
    if (num1Check > 0) {
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
    num1Check = 0;
    if (e.key === "*") {
      operator = "×";
    } else if (e.key === "/") {
      operator = "÷";
    } else {
      operator = e.key;
    }
  } else if (e.key === "Enter") {
    console.log(num1);
    console.log(num2);
    if (num1 != "" && num2 != "") {
      operate(operator, Number(num1), Number(num2));
      num1Check = 1;
      console.log(result);
      display.textContent = `${result}`;
      num1 = result;
      num2 = "";
    }
  }
});
