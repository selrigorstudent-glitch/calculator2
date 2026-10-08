import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNumber, setWaitingForNumber] = useState(false);

  const inputNumber = (number) => {
    if (waitingForNumber) {
      setDisplay(number);
      setWaitingForNumber(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const chooseOperator = (nextOperator) => {
    const number = parseFloat(display);

    if (isNaN(number)) return;

    setFirstNumber(number);
    setOperator(nextOperator);

    const symbol =
      nextOperator === "*"
        ? "×"
        : nextOperator === "/"
        ? "÷"
        : nextOperator === "-"
        ? "−"
        : "+";

    setDisplay(symbol);
    setWaitingForNumber(true);
  };

  const handleEquals = () => {
    if (firstNumber === null || operator === null) return;

    const secondNumber = parseFloat(display);

    if (isNaN(secondNumber)) return;

    let result;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;

      case "-":
        result = firstNumber - secondNumber;
        break;

      case "*":
        result = firstNumber * secondNumber;
        break;

      case "/":
        result = secondNumber === 0 ? "Error" : firstNumber / secondNumber;
        break;

      default:
        result = secondNumber;
    }

    setDisplay(String(result));
    setFirstNumber(null);
    setOperator(null);
    setWaitingForNumber(false);
  };

  const clearCalculator = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForNumber(false);
  };

  const showName = () => {
    setDisplay("Sean Eric L. Rigor");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForNumber(false);
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

          <button className="zero" onClick={() => inputNumber("0")}>
            0
          </button>

          <button className="name-button" onClick={showName}>
            Rigor Sean
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
