var numberOne;
var numberTwo;
var result;
var word = document.createElement('div');
document.body.append(word);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
form.append(input);
var button = document.createElement('button');
button.textContent = '입력!';
form.append(button);
var resultDiv = document.createElement('div');
document.body.append(resultDiv);
function generateNumber() {
    numberOne = Math.ceil(Math.random() * 9);
    numberTwo = Math.ceil(Math.random() * 9);
    result = numberOne * numberTwo;
}
function displayNumber() {
    word.textContent = numberOne + " \uACF1\uD558\uAE30 " + numberTwo + "\uB294 ?";
}
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (result === Number(input.value)) {
        resultDiv.textContent = '딩동댕';
        generateNumber();
        displayNumber();
    }
    else {
        resultDiv.textContent = '땡';
    }
    input.value = '';
    input.focus();
});
generateNumber();
displayNumber();
