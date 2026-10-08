import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const inputNumber = (number) => {
    if (waitingForSecondNumber) {
      setDisplay(number);
      setWaitingForSecondNumber(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const chooseOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (operator && waitingForSecondNumber) {
      setOperator(nextOperator);
      return;
    }

    if (firstNumber === null) {
      setFirstNumber(inputValue);
    } else if (operator) {
      const result = calculate(firstNumber, inputValue, operator);
      setDisplay(String(result));
      setFirstNumber(result);
    }

    setWaitingForSecondNumber(true);
    setOperator(nextOperator);
  };

  const calculate = (first, second, operation) => {
    switch (operation) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return second === 0 ? "Error" : first / second;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    if (operator === null || firstNumber === null) return;

    const secondNumber = parseFloat(display);
    const result = calculate(firstNumber, secondNumber, operator);

    setDisplay(String(result));
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  const clearCalculator = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  return (
    <div className="page">
      <h1>Calculator of Sean Eric L. Rigor - IT3A</h1>

      <div className="calculator">
        <div className="display">{display}</div>

        <div className="buttons">
          <button className="clear" onClick={clearCalculator}>
            C
          </button>

          <button className="operator" onClick={() => chooseOperator("/")}>
            ÷
          </button>

          <button className="operator" onClick={() => chooseOperator("*")}>
            ×
          </button>

          <button className="operator" onClick={() => chooseOperator("-")}>
            −
          </button>

          <button onClick={() => inputNumber("7")}>7</button>
          <button onClick={() => inputNumber("8")}>8</button>
          <button onClick={() => inputNumber("9")}>9</button>

          <button className="operator" onClick={() => chooseOperator("+")}>
            +
          </button>

          <button onClick={() => inputNumber("4")}>4</button>
          <button onClick={() => inputNumber("5")}>5</button>
          <button onClick={() => inputNumber("6")}>6</button>

          <button className="equals" onClick={handleEquals}>
            =
          </button>

          <button onClick={() => inputNumber("1")}>1</button>
          <button onClick={() => inputNumber("2")}>2</button>
          <button onClick={() => inputNumber("3")}>3</button>

          <button
            className="zero"
            onClick={() => inputNumber("0")}
          >
            0
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;