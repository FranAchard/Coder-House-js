// 
var edad = 18;

if (edad >= 18) {
    console.log("La persona puede conducir un automóvil.");
} else {
    console.log("La persona no puede conducir un automóvil, es menor de edad.");
}


//
for (var i = 1; i <= 10; i++) {
    console.log(i);
}

//
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function realizarCalculo(num1, num2, operacion) {
    switch (operacion) {
        case 'suma':
            return num1 + num2;
        case 'resta':
            return num1 - num2;
        case 'multiplicacion':
            return num1 * num2;
        case 'division':
            return num1 / num2;
        default:
            return 'Operación no válida';
    }
}
