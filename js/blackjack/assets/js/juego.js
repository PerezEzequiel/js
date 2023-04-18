const miModulo = (() => {


    'use strict'


    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];


    const tagSmall = document.querySelectorAll('small');
    const divCartasJugadores = document.querySelectorAll('.divCartas');

    const btnPedirCarta = document.querySelector('#btnPedirCarta'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevoJuego = document.querySelector('#btnNuevoJuego');

    let puntosJugadores = [];
    let deck = [];

    //Metodos
    const inicializarJuego = (numeroDeJugadores = 2) => {

       deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numeroDeJugadores; i++) {
            divCartasJugadores[i].innerHTML = '';
            tagSmall[i].innerText = 0;
            puntosJugadores.push(0);
        }

        btnPedirCarta.disabled = false;
        btnDetener.disabled = false;

        return deck;
    }
    const crearDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo)
            }
        }
        return _.shuffle(deck);
    }
    const pedirCarta = (array) => {

        let numberRandom;
        let elemento;
        if (array.length === 0) {
            throw 'No hay cartas en el deck';

        } else {
            numberRandom = Math.floor(Math.random() * (51 - 0) + 0);
            elemento = array[numberRandom];
            array.splice(numberRandom, 1);
        }
        return elemento;
    }
    const valorCarta = (cartaRecibida) => {

        const valor = cartaRecibida.substring(0, cartaRecibida.length - 1);
        let puntos = 10;

        if (isNaN(valor)) {
            if (valor === 'A') {
                puntos = 11;
            }
        } else {
            puntos = valor * 1;
        }
        return puntos;
    }

    //Turno:0 -> Primer jugador
    //Ultimo turno: Computadora
    const acumularPuntosJugador = (turno, carta) => {

        console.log("Valor carta "+puntosJugadores[turno]);
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        tagSmall[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }
    const crearCarta = (turno, carta) => {
        const imgCarta = document.createElement('img');

        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }
    const determinarGanador = () =>{

        const [puntosMinimos,puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie Gana :(');
            } else if (puntosMinimos > 21) {
                alert('La computadora gana :)');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 100)
    }
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora=0;
        do {
            const carta = pedirCarta(deck);
            const turno = puntosJugadores.length - 1;

            crearCarta(turno, carta);
            puntosComputadora = acumularPuntosJugador(turno, carta)

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        
        determinarGanador();
    }


    //Eventos
    btnPedirCarta.addEventListener('click', () => {

        const carta = pedirCarta(deck);
        const turno = 0;
        console.log(puntosJugadores[0]);
        let puntosJugador = acumularPuntosJugador(turno, carta);

        crearCarta(turno, carta);

        if (puntosJugador > 21) {
            console.warn('Perdiste');
            btnPedirCarta.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('Ganaste,21!');
            btnPedirCarta.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    })

    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    })

    //Todo lo que este en el return va a ser publico y le puedo modificar el nombre con el que quiero acceder porfuera
    return {
        nuevoJuego: inicializarJuego
    };
})();

