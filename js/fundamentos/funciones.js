
//Las funciones por defecto retornan undefined.

function saludar(nombre){
    console.log(arguments)
    console.log('Hola mundo');
}

//Funcion anonima

const saludar2 = function(nombre){
    console.log(arguments)
    console.log('Hola ' + nombre);
}


//Funcion flecha

const saludarFlecha = (nombre) => {
    console.log('Hola ' + nombre);
    return 1;
}

//Funcion flecha cuando hay solo 1 linea de codigo.
const sumar = (a,b) => a + b;

//Funcion flecha no tiene la propiedad arguments pero se puede poner el rest ... para que los parametros actuales se guarden como un array.
//Despues de ...args no puede ir ningun parametro
const imprimeArgumentosFlecha = (edad,...args) => {
    console.log(edad);
    console.log(args);
}


//Test

let retorno = saludarFlecha("Pepe");

console.log("Retorno de saludar flecha:" +retorno);