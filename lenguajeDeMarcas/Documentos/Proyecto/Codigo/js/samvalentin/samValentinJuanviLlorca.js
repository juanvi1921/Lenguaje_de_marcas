/*$(document).ready(function () {
    $("img").hover(function () {
        moverDiv();
    });
});
function moverDiv() {
    arriba = Math.random() * (400 - 1) + 1;
    abajo = Math.random() * (609 - 1) + 1;
    $("img").css({
        "top": arriba + "px",
        "left": abajo + "px",
    });
}*/

window.onload = function() {
    setTimeout(cambiarImagen, 8000);
}

function cambiarImagen(){
    document.getElementById("img1").src="../../img/samvalentin/samValentinJuanviLlorca/fondo2.jpg";
}