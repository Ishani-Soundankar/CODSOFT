// Get display and history elements
const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
const modeSwitch = document.getElementById("mode-switch");
const modeLabel = document.getElementById("mode-label");

let currentInput = "";
let history = [];

// Append number to display
function appendNumber(num) {
  currentInput += num;
  updateDisplay();
}

// Append operator to display
function appendOperator(op) {
  if (currentInput === "") return;
  const lastChar = currentInput.slice(-1);
  if (isOperator(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }
  currentInput += op;
  updateDisplay();
}

// Clear display
function clearDisplay() {
  currentInput = "";
  updateDisplay("0");
}

// Delete last character
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || "0");
}

// Perform calculation
function calculate() {
  try {
    const result = eval(currentInput);
    history.push(`${currentInput} = ${result}`);
    updateHistory();
    currentInput = result.toString();
    updateDisplay();
  } catch (error) {
    updateDisplay("Error");
  }
}

// Update display
function updateDisplay(value) {
  display.textContent = value || currentInput;
}

// Update history list
function updateHistory() {
  historyList.innerHTML = "";
  history.slice().reverse().forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

// Delete all history
function clearHistory() {
  history = [];
  updateHistory();
}

// Check if character is an operator
function isOperator(char) {
  return ["+", "-", "*", "/", "%"].includes(char);
}

// Light/Dark mode toggle
modeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  modeLabel.textContent = modeSwitch.checked ? "Dark Mode" : "Light Mode";
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(key) || key === ".") {
    appendNumber(key);
  } else if (isOperator(key)) {
    appendOperator(key);
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
