class Calculator {
  constructor(previousOutputTextElement, currentOutputTextElement) {
    this.previousOutputTextElement = previousOutputTextElement;
    this.currentOutputTextElement = currentOutputTextElement;
    this.clear();
  }

  clear() {
    this.currentOutput = "";
    this.previousOutput = "";
    this.operator = undefined;
  }

  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOutput.includes(".")) return;
    this.currentOutput = this.currentOutput.toString() + number.toString();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerNumbers = parseFloat(stringNumber.split(".")[0]);
    const decimalNumbers = stringNumber.split(".")[1];
    let interDisplay;
    if (isNaN(integerNumbers)) {
      interDisplay = "";
    } else {
      interDisplay = integerNumbers.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalNumbers != null) {
      return `${interDisplay}.${decimalNumbers}`;
    } else {
      return interDisplay;
    }
  }

  updateDisplay() {
    this.currentOutputTextElement.innerText = this.formatDisplayNumber(
      this.currentOutput
    );
    if (this.operator != null) {
      this.previousOutputTextElement.innerText = `${this.formatDisplayNumber(
        this.previousOutput
      )} ${this.operator}`;
    } else {
      this.previousOutputTextElement.innerText = "";
    }
  }

  chooseOperator(operator) {
    if (this.currentOutput === "") return;
    if (this.previousOutput !== "") {
      this.compute();
    }
    this.operator = operator;
    this.previousOutput = this.currentOutput;
    this.currentOutput = "";
  }

  compute() {
    let answer;
    const prev = parseFloat(this.previousOutput);
    const curr = parseFloat(this.currentOutput);
    switch (this.operator) {
      case "+":
        answer = prev + curr;
        break;
      case "-":
        answer = prev - curr;
        break;
      case "x":
        answer = prev * curr;
        break;
      case "÷":
        answer = prev / curr;
        break;
      default:
        return;
    }
    this.currentOutput = answer;
    this.operator = undefined;
    this.previousOutput = "";
  }
}

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearAllButton = document.querySelector(".clear-all");
const deleteButton = document.querySelector(".delete");
const equalsButton = document.querySelector(".equal");
const previousOutputTextElement = document.querySelector(".previous-output");
const currentOutputTextElement = document.querySelector(".current-output");

const calculator = new Calculator(
  previousOutputTextElement,
  currentOutputTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

clearAllButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperator(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

console.log(calculator);
