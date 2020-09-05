const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firtsValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
    // Replace current value if first value is entered
    if (awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else{
    // If current dipslay value is 0, replace it, if not add number
    const dipslayValue = calculatorDisplay.textContent
    calculatorDisplay.textContent = dipslayValue === '0' ? number : dipslayValue + number;
    }
}

function addDecimal(){
    // If operator prassed, don't add decimal
    if (awaitingNextValue) return;
    // if no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate first and second value depending on operator
const calculate = {
    '/':(firtsNumber, secondNumber) => firtsNumber/secondNumber,
    '*':(firtsNumber, secondNumber) => firtsNumber*secondNumber,
    '+':(firtsNumber, secondNumber) => firtsNumber+secondNumber,
    '-':(firtsNumber, secondNumber) => firtsNumber-secondNumber,
    '=':(firtsNumber, secondNumber) => secondNumber,
}

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // Preveny multiple operator
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return};
    // Asign firt value
    if (!firtsValue){
        firtsValue = currentValue
    }else{
        const calculation = calculate[operatorValue](firtsValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firtsValue = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue = true
    operatorValue = operator;
}

// Add Event Listners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if(inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset display
function resetAll(){
    firtsValue = 0;
    operatorValue= '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Event Listner
clearBtn.addEventListener('click', resetAll);