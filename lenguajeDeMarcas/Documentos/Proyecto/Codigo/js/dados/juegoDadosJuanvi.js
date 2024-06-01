let puntuacionTotal1 = 0;
let puntuacionTotal2 = 0;

function generaNumRandom() {// generamos un numero aleatorio entre 1 y 6
    let numRandom = Math.floor(Math.random() * 6 + 1);

    return numRandom;
}

function numeroDados(idJugador, idSeccion, idPuntuacion) {// plasmar los dados y la puntunación de una tirada.
    let sumaDeDados = 0;
    let cantidadDados = document.getElementById(idJugador).value;// leemos las cantidad seleccionada por el jugador
    cantidadDados = parseInt(cantidadDados);//pasamos la cantidad a enteros
    
    document.getElementById(idSeccion).innerHTML = "";//Limpiamos los dados
    for (let i = 0; i < cantidadDados; i++) {//hacemos un bucle que itera tantas veces como la cantidad de dados que lanza el jugador
        let numeroAleatorio;
        numeroAleatorio = generaNumRandom();//llamamos a la función que nos devuelve un numero aleatorio

        generaDado(idSeccion, numeroAleatorio);//generar un 1 dado e imprimirlo por pantalla

        sumaDeDados += numeroAleatorio;//hacemos el sumatorio de los dados lanzados
    }

    document.getElementById(idPuntuacion).innerHTML = sumaDeDados;//Escribimos el resultado de la suma de los dados
}


function generaDado(idSeccion, numeroAleatorio) {
    let imgOutput = document.createElement('img');//creamos un elemento imagen

    imgOutput.src = "../../img/dados/imagenes/d" + numeroAleatorio + "jv.png"; //identificando el elemento del array dados
    imgOutput.setAttribute('class', 'imagen');//asignar clase a la imagen.    
    document.getElementById(idSeccion).appendChild(imgOutput);//Creamos el hijo imagen faltaria 
}



function obtenerGanador() {//Mostramos quien ha sido el ganador de la tirada REVISAR TODA LA FUNCION
    //Inicializamos y definimos las variables de puntuacion 1 y puntuacion 2
    var puntuacion1 = parseInt(document.getElementById('puntuacion1').innerHTML) || 0;
    var puntuacion2 = parseInt(document.getElementById('puntuacion2').innerHTML) || 0;
    //Añadir un punto al jugador que ha ganado
    console.log("Puntuacion 1 " + puntuacion1);
    console.log("Puntuacion 2 " + puntuacion2);
    if (puntuacion1 > puntuacion2) {//gana jugador 1
        document.getElementById('resultadoTirada').innerHTML = "El jugador 1 ha marcado un try!";
        puntuacionTotal1 +=5;//anadimos un punto a J1
        console.log("Puntuacion total 1 " + puntuacionTotal1);
    } else if (puntuacion1 < puntuacion2) {//gana jugador 2
        document.getElementById('resultadoTirada').innerHTML = "El jugador 2 ha marcado un try!";
        puntuacionTotal2+=5;//anadimos un punto a J2
        console.log("Puntuacion total 2 " + puntuacionTotal2);
    }
    else {//empate
        document.getElementById('resultadoTirada').innerHTML = "EMPATE";
    }

    // Quitar los dados cuando queremos obtener el ganador
    document.getElementById('seccion1').innerHTML = "";
    document.getElementById('seccion2').innerHTML = "";
    
    //Actualizar puntuacion
    document.getElementById('puntuacionTotal1').innerHTML = puntuacionTotal1;
    document.getElementById('puntuacionTotal2').innerHTML = puntuacionTotal2;
}


