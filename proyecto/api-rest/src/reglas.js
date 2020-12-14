var moment = require('moment');
const Alerta = require('./models/alerta.model');
const Paciente = require('./models/paciente.model');

function diff(fecha1, fecha2) {
    let milisegundosDia = 24 * 60 * 60 * 1000;
    let milisegundosTranscurridos = Math.abs(fecha1.getTime() - fecha2.getTime());
    let diasTranscurridos = Math.round(milisegundosTranscurridos/milisegundosDia);
    return diasTranscurridos;
}
function reglaUno (somnolencia, arrayAlertas) {
    if (somnolencia === true) {
        arrayAlertas.push('El paciente presenta somnolencia. Evaluar pase a UTI');
        return true;
    }else return false;
}
 function reglaDos (mv, arrayAlertas) {
    if (mv === "Regular" || mv === "Mala" ) {
        arrayAlertas.push('El valor de la mecánica ventilatoria es: '+ [mv] + '. Evaluar pase a UTI');
        return true;
    }
    else return false;
}
function reglaTres(fr, arrayAlertas) {
    if (fr > 30) {
        arrayAlertas.push('FR es mayor a 30 por minuto evaluar pase a UTI');
        return true;
    }
    else return false;
}
function reglaCuatro(fechasintomas, arrayAlertas) {
    var fechaactual = new Date();
    var fecha= new Date(fechasintomas.slice(0, -14));
    if ((diff(fechaactual, fecha)) === 11){//por el redondeo
        arrayAlertas.push('Pasaron 10 días desde el inicio de los síntomas evaluar alta');
        return true;
    }else return false;
}
function reglaCinco(saturacion, arrayAlertas) {
    if (saturacion < 92){
        arrayAlertas.push('Saturación de oxígeno es menor a 92%. Evaluar oxígeno terapia y prono');
        return true;
    }else return false;
}
function reglaSeis(saturacion, satAnt, arrayAlertas) {
    if ((saturacion >= 92) && ((satAnt - saturacion) === 3)){
        arrayAlertas.push('Saturación bajó 3%. Evaluar oxígeno terapia y prono');
        return true;
    }else return false;
}

function correrReglas(ev, satAnt, fechasintomas) {
    var arrayAlertas = [];
    if (ev.idsistema !== 3){

        reglaUno(ev.somnolencia, arrayAlertas);
        reglaDos(ev.mecanicaventilatoria, arrayAlertas);
        reglaTres(ev.fr, arrayAlertas);
    }
    reglaCuatro(fechasintomas, arrayAlertas);
    if (ev.oxigeno === true ){
        reglaCinco(ev.saturacion, arrayAlertas);
        reglaSeis(ev.saturacion, satAnt, arrayAlertas);  
    }
    return arrayAlertas;
}
exports = module.exports= {
    reglaUno,
    reglaDos,
    reglaTres,
    reglaCuatro,
    reglaCinco,
    reglaSeis
}


