//Funciones para el carrusel de imagenes.
let indice = 1; 
muestraImagen(indice); //mostramos la imagen del indice, inicializado a 1.
muestraImagenAut();

//Funcion para pasar las imagenes
function pasarImagen (n) {
    muestraImagen(indice += n);
}

//Funcion para mostrar las imagenes
function muestraImagen(n) {
    let i;
    let imagenes = document.getElementsByClassName("imagen");
        if (n > imagenes.length) {
            indice = 1;
        } if (n < 1) {
            indice = imagenes.length;
        }
        for (i = 0; i < imagenes.length; i++) {
            imagenes[i].style.display = "none";
        }
        imagenes[indice - 1].style.display = "block";
}

//Funcion para la muestra de imagenes automatica
function muestraImagenAut() {
    let i;
    let imagenes = document.getElementsByClassName("imagen");
        for (i = 0; i < imagenes.length; i++) {
            imagenes[i].style.display = "none";
        }
        indice++;
        if (indice > imagenes.length) {
            indice = 1;
        }
        imagenes[indice - 1].style.display = "block";
        setTimeout(muestraImagenAut, 5000);
}

//Funcion para ir a la pagina de los desplegables.
function linkPagina (url) {
    if (url) {
        window.location.href = url;
    }
}


