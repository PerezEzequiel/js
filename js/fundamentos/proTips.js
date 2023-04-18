function crearPersona(nombre,apellido){
    return {
        nombre: nombre,
        apellido: apellido
    }
}

const crearPersona2 = (nombre,apellido) => ({nombre,apellido})

const persona = crearPersona('Fernando','Herrera')
const persona2 = crearPersona2('Ezequiel','Perez')

console.log(persona2);