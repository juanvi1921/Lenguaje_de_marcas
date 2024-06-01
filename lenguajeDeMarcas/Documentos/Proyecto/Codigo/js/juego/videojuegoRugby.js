document.addEventListener("DOMContentLoaded", function () { // lo de mover el jugador va dentro del DOM funciones y variables
const areaJuego = document.getElementById("areaJuego"); //Metemos en constantes el area de juego y el jugador
const jugador = document.getElementById("jugador");

const areaJuegoRect = areaJuego.getBoundingClientRect();
const jugadorRect = jugador.getBoundingClientRect();

let jugadorPosition = areaJuegoRect.width / 2 - jugadorRect.width / 2; //variable de la posicion del jugador
let atacanteEnPantalla = false; //Variable para detectar si hay un oponente en pantalla
let puntuacion = 0; //Variable para los placajes
let marcadorVis = 10; //Variable para la puntuacion visitante
let marcadorLoc = 18; //Variable de la puntuacion local
let juegoIniciado = false; //Variable para el control de inicio del juego
let permitirSumaPuntos = false; //variable para dejar de sumar puntos al acabar el juego

//Funcion para visualizar el cambio de posicion del jugador

function actualizaPosicionJugador() {
    jugador.style.left = `${jugadorPosition}px`;
}

//Funcion para mover el jugador de izquierda a derecha.
function moverJugador(event) {
    if (juegoIniciado) {
        switch (event.key) {
            case "ArrowLeft":
                jugadorPosition = Math.max(jugadorPosition - 10, 25); // Limites donde puede llegar el jugador hacia la izquierda
                actualizaPosicionJugador();
                break;
            case "ArrowRight":
                jugadorPosition = Math.min(jugadorPosition + 10, areaJuegoRect.width - jugadorRect.width); // Limites donde puede llegar el jugador hacia la derecha
                actualizaPosicionJugador();
                break;
        }
    }
}
document.addEventListener("keydown", moverJugador);

    //Funcoin para crear atacante
    function crearAtacante() {
        if (!atacanteEnPantalla) {
            const atacante = document.createElement("div");
            atacante.className = "atacante";
            const maxX = (areaJuegoRect.width - 50) ; //Ancho por donde puede aparecer el bloque. -20 para que no se salga
            const randomX = Math.floor(Math.random() * maxX);
            atacante.style.left = `${randomX}px`;
            areaJuego.appendChild(atacante);
            moverAtacante(atacante);
        }
    }

    //Funcion para la caida de atacantes
    function moverAtacante(atacante) {
        atacanteEnPantalla = true;
        const velocidad = Math.floor(Math.random() * 3) + 5; // Ajusta la velocidad. NumAleatorio entre 5 y 7
        let posicionActual = atacante.offsetTop; //Empieza a caer desde arriba.
    
        function animacionCaida() { //Funcion para la animacion del bloque.
            if (posicionActual < areaJuegoRect.height) { //Mientras la posicion actual del bloque sea menor a la altura del area de juego
                posicionActual += velocidad; //Se incrementa en velocidad para simular la velocidad de caida
                atacante.style.top = `${posicionActual}px`; //La propiedad top se actualiza despues de hacer el movimiento.
    
                if (detectaPlacaje(atacante, jugador)) { //Verificamos que si hay colision desaparezca el bloque
                    sumaPlacajes(); //con esta funcion  sumamos puntuacion
                    atacante.remove(); //Quitamos bloque
                    atacanteEnPantalla = false;  //Ponemos esto a false para que pueda generar un nuevo bloque
                } else {
                    requestAnimationFrame(animacionCaida); //LLamada recursiva a la funcion animacionCaida (Animacion suave)
                }
            } else if (permitirSumaPuntos === true) {
                const marcadorDiv = document.getElementById("marcador");
                marcadorVis += 5;
                marcadorDiv.innerHTML = `<img class="equipo1" src="../../img/juego/videojuegoRugby/spain.png"> ${marcadorLoc} - ${marcadorVis} <img class="equipo2" src="../../img/juego/videojuegoRugby/newZealand.png">`;
                atacante.remove();
                atacanteEnPantalla = false;
            }
        }
        requestAnimationFrame(animacionCaida); //Lo mismo quie arriba
    }
    
    //Funcion para detectar si hay placaje.
    function detectaPlacaje(atacante, jugador) {
        const atacanteRect = atacante.getBoundingClientRect();
        const jugadorRect = jugador.getBoundingClientRect();

        return (
            atacanteRect.top < jugadorRect.bottom &&
            atacanteRect.bottom > jugadorRect.top &&
            atacanteRect.left < jugadorRect.right &&
            atacanteRect.right > jugadorRect.left
        );
    }
    //Actualiza la visualizacion en el DOM y suma la puntuacion.
    function sumaPlacajes() {
        if (permitirSumaPuntos === true) {
            puntuacion++;
            actualizaMarcador();
        } 
    }
    
    //Funcion para actualizar el marcador
    function actualizaMarcador() {
        document.getElementById("puntuacion").innerText = "Placajes 💥: " + puntuacion;
    }

    document.getElementById("comenzar").addEventListener("click", comenzarJuego);//Al darle al boton de comenzar ejecuta la funcion comenzarJuego

    //Funcion para empezar el juego
    function comenzarJuego() {
        let cuentaAtras = 3;
        let mensajeComienzo = document.getElementById("mensajeComienzo");
        let botonComenzar = document.getElementById("comenzar");
        let descripcionJuego = document.getElementById("descripcionJuego");
        let cuentaAtrasIntervalo = setInterval(function() {
            if (cuentaAtras > 0) {
                mensajeComienzo.textContent = "Comenzando en " + cuentaAtras;
                cuentaAtras--;
                botonComenzar.style.display = "none"; //Quita la funcionalidad del boton una vez dado
            } else {
                clearInterval(cuentaAtrasIntervalo); //quita el intervalo
                mensajeComienzo.remove();
                juegoIniciado = true;
                permitirSumaPuntos = true;
                tiempoJuego();
                crearAtacante();
                creaAtacanteIntervalo = setInterval(function () {
                    crearAtacante();
                }, 100); //Milisegundos que tarda en generar otro bloque.
                botonComenzar.style.display = "none"; //Quita el boton una vez dado
                descripcionJuego.style.display = "none"; //Quitamos la descripcion
            }
        }, 1000) //Milisegundos para el cambio de la cuenta atras
    }

    //Funcion para el tiempo de juego
    function tiempoJuego() {
        let minuto = 79;
        let segundo = 0;

        const tiempoIntervalo = setInterval(function() { //Intervalo para ir actualizando el tiempo
            segundo++;
            if (segundo === 60) {
                minuto++;
                segundo = 0;
            }
            document.getElementById("tiempo").innerText = minuto + " : " + segundo;
            if (minuto === 80) {
                clearInterval(tiempoIntervalo); //Esto detiene el temporizador
                clearInterval(creaAtacanteIntervalo); // Deja de crear atacantes
                finJuego();
            }
        }, 1000) //El intervalo es de 1 segundo
    }

    document.getElementById("reiniciar").style.display = "none"; //Mantener boton de reinicio oculto
    document.getElementById("ganador").style.display = "none"; //Mantener div de ganador oculto
    document.getElementById("perdedor").style.display = "none"; //Mantener div de perdedor oculto

    //Funcion para finalizar el juego
    function finJuego() {
        permitirSumaPuntos = false;
        const atacantes = document.querySelectorAll(".atacante"); //seleccionamos el atacante que haya en pantalla
        atacantes.forEach(function(atacante) { //Recorremos todos los atacantes que haya y itero sobre ellos
        atacante.remove(); //Lo eliminamos
        });

        if (marcadorLoc > marcadorVis) {
            document.getElementById("reiniciar").style.display = "block"; //Muestra el boton de reiniciar
            document.getElementById("ganador").style.display = "block"; //Muestra que has ganado
            document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);//Al darle al boton reinicia
        } else if (marcadorLoc < marcadorVis) {
            document.getElementById("reiniciar").style.display = "block"; //Muestra el boton de reiniciar
            document.getElementById("perdedor").style.display = "block"; //Muestra que has perdido
            document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);//Al darle al boton reinicia
        }
    }

    //Funcion para el boton de reiniciar
    function reiniciarJuego() {
        location.reload();
    }  
});
