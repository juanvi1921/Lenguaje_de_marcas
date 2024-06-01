const fechaActual = document.querySelector(".fechaActual"), 
getDia = document.querySelector(".dias"),
mesPrevioIcono = document.querySelectorAll(".iconos span ");

// Cogiendo la fecha actual
let fecha = new Date(), 
anyoActual = fecha.getFullYear(),
mesActual = fecha.getMonth();

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", 
                "Noviembre", "Diciembre"];

// Definir eventos
const eventos = [
    { dia: 5, mes: 5, anyo: 2024, evento: "Entrenamiento a las 20:00" }, // 5 de Junio de 2024
    { dia: 9, mes: 5, anyo: 2024, evento: "Partido vs AllBlacks. 9:30 en el vestuario" }  // 12 de Junio de 2024
];

const generarCalendario = () => {
    let primerDiaMes = new Date(anyoActual, mesActual, 1).getDay(); //coge primer dia del mes
    let ultimaFechaMes = new Date(anyoActual, mesActual + 1, 0).getDate(); //coge la ultima fecha del mes
    let ultimoDiaMes = new Date(anyoActual, mesActual, ultimaFechaMes).getDay(); //coge el ultimo dia del mes
    let ultimaFechaUltimoMes = new Date(anyoActual, mesActual, 0).getDate(); //coge la ultima fecha del mes anterior

    let liGetDia = "";

    // Los for crean las listas del mes anterior, el actual y el siguiente.
    for (let i = primerDiaMes; i > 0; i--) {
        liGetDia += `<li class="inactivo">${ultimaFechaUltimoMes - i + 1}</li>`;
    }

    for (let i = 1; i <= ultimaFechaMes; i++) {
        let diaActual = i === fecha.getDate() && mesActual === fecha.getMonth() && anyoActual === fecha.getFullYear() ? "activo" : "";

        // Verificar si el día actual tiene un evento
        let evento = eventos.find(evento => evento.dia === i && evento.mes === mesActual && evento.anyo === anyoActual);
        let claseEvento = evento ? "evento" : "";

        liGetDia += `<li class="${diaActual} ${claseEvento}" data-evento="${evento ? evento.evento : ''}">${i}</li>`;
    }

    for (let i = ultimoDiaMes; i < 6; i++) {
        liGetDia += `<li class="inactivo">${i - ultimoDiaMes + 1}</li>`;
    }

    fechaActual.innerText = `${meses[mesActual]} ${anyoActual}`;
    getDia.innerHTML = liGetDia;

    // Añadir evento de clic a los días con eventos
    document.querySelectorAll(".evento").forEach(dia => {
        dia.addEventListener("click", () => {
            alert(`Evento: ${dia.getAttribute("data-evento")}`);
        });
    });
}
generarCalendario();

mesPrevioIcono.forEach(icono => { //Evento para los botones de pasar los meses.
    icono.addEventListener("click", () => {
        mesActual = icono.id === "previo" ? mesActual - 1 : mesActual + 1; //Operador ternario, si pulsas el que tiene id previo resta else suma 1
        
        if (mesActual < 0 || mesActual > 11) {
            fecha = new Date(anyoActual, mesActual);
            anyoActual = fecha.getFullYear();
            mesActual = fecha.getMonth();
        } else {
            fecha = new Date();
        }
        generarCalendario();
    });
})
