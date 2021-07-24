let allNumbers = /[\d.]/;
let allOperators = /[+-/*]/;

mathOperators = {
  add: function (num1, num2) {
    result = num1 + num2;
    return result;
  },
  substract: function (num1, num2) {
    result = num1 - num2;
    return result;
  },
  multiply: function (num1, num2) {
    result = num1 * num2;
    return result;
  },
  divide: function (num1, num2) {
    result = num1 / num2;
    return result;
  },
  percent: function (num1) {
    result = num1 / 100;
    return result;
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

let nextSide = 0;
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".buttons");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (display.textContent === "0") {
      display.textContent = e.target.textContent;
    } else if (display.textContent.length === 10) {
      return false;
    } else if (display.textContent.indexOf(".") > -1 && e.target.textContent === ".") {
      display.textContent += "";
    } else if (nextSide > 0) {
      display.textContent = e.target.textContent;
      nextSide = 0;
    } else {
      display.textContent += e.target.textContent;
    }
  });
});

let operatorCheck = 0;
let num2 = "";
let num1 = "";
let operator = "";
let num2Check = 0;
let num1Check = 1;
const numbers = document.querySelectorAll(".number");

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (display.textContent.length === 10) {
      return false;
    } else if (operatorCheck > 0) {
      num2 += e.target.textContent;
      num2Check = 1;
      num1Check = 0;
    } else if (operatorCheck === 0) {
      num1 += e.target.textContent;
      num1Check = 1;
      num2Check = 0;
    }
  });
});

const operators = document.querySelectorAll(".operator");

operators.forEach((mathOperator) => {
  mathOperator.addEventListener("click", (e) => {
    if (e.target.textContent === "%") {
      operate(operator, Number(num1));
      display.textContent = result;
      num1 = result;
      num2 = "";
    } else if (operatorCheck === 0) {
      operator = e.target.textContent;
      operatorCheck = 1;
      nextSide = 1;
    } else {
      if (num2 === "") {
        return false;
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
  display.textContent = "0";
  operatorCheck = 0;
  num1 = "";
  num2 = "";
});

const backspace = document.querySelector("#delete");

backspace.addEventListener("click", (e) => {
  display.textContent = display.textContent.slice(0, -1);
  if (num2 === "" && operator != "") {
    operator = "";
    operatorCheck = 0;
  } else if (num1Check > 0) {
    num1 = num1.slice(0, -1);
  } else if (num2Check > 0) {
    num2 = num2.slice(0, -1);
  }
});

const equals = document.querySelector("#equals");

equals.addEventListener("click", (e) => {
  equalOf();
});

const plusMinus = document.querySelector("#plusMinus");

plusMinus.addEventListener("click", (e) => {
  if (Number(display.textContent) > 0) {
    if (num1Check > 0) {
      num1 = `-${num1}`;
      display.textContent = num1;
    } else if (num2Check > 0) {
      num2 = `-${num2}`;
      display.textContent = num2;
    }
  } else if (Number(display.textContent < 0)) {
    if (num1Check > 0) {
      num1 = `${num1.substring(1)}`;
      display.textContent = num1;
    } else if (num2Check > 0) {
      num2 = `${num2.substring(1)}`;
      display.textContent = num2;
    }
  }
});

/* window.addEventListener("keypress", (e) => {
  console.log(e.key);
  if (allNumbers.test(e.key)) {
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
      num2 += e.key;
    }
  } else if (e.key === "Enter") {
    equalOf();
  }
}); */

function equalOf() {
  if (num2 === "") {
    return false;
  } else {
    operatorCheck = 0;
    operate(operator, Number(num1), Number(num2));
    display.textContent = result;
    num1 = result;
    num2 = "";
  }
}
