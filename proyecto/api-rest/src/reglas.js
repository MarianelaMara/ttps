var moment = require('moment');
const Alerta = require('./models/alerta.model');
const Paciente = require('./models/paciente.model');

function diff(fecha1, fecha2) {
    let milisegundosDia = 24 * 60 * 60 * 1000;
    let milisegundosTranscurridos = Math.abs(fecha1.getTime() - fecha2.getTime());
    let diasTranscurridos = Math.round(milisegundosTranscurridos/milisegundosDia);
    return diasTranscurridos;
}
function reglaUno(somnolencia, medicos, idpaciente) {
    if (somnolencia === true) {
        Alerta.addAlerta(idpaciente, 'El paciente presenta somnolencia. Evaluar pase a UTI.', (err, data) => {
            if(err){
                res.status(500).send({
                    message: "Error al insertar alerta"
                });
            }
            else {
                for(m of medicos) {
                    Alerta.asociar(data, m.idempleado, (err, data) => {
                        if(err){
                            res.status(500).send({
                                message: "Error al asociar alerta"
                            });
                        }
                    });
                }     
            }
        });
        return 'El paciente presenta somnolencia. Evaluar pase a UTI.'
    }
}
function reglaDos(mv, medicos, idpaciente) {
    if (mv === "Regular" || mv === "Mala" ) {
        Alerta.addAlerta(idpaciente, 'El valor de la mecánica ventilatoria es: '+ [mv] + '. Evaluar pase a UTI ', (err, data) => {
            if(err){
                res.status(500).send({
                    message: "Error al insertar alerta"
                });
            }
            else {
                for(m of medicos) {
                    Alerta.asociar(data, m.idempleado, (err, data) => {
                        if(err){
                            res.status(500).send({
                                message: "Error al asociar alerta"
                            });
                        }
                    });
                }     
            }
        });
        return 'El valor de la mecánica ventilatoria es: '+ [mv] + '. Evaluar pase a UTI '
    }
}
function reglaTres(fr, medicos, idpaciente) {
    if (fr > 30) {
        Alerta.addAlerta(idpaciente, 'FR es mayor a 30 por minuto evaluar pase a UTI', (err, data) => {
            if(err){
                res.status(500).send({
                    message: "Error al insertar alerta"
                });
            }
            else {
                for(m of medicos) {
                    Alerta.asociar(data, m.idempleado, (err, data) => {
                        if(err){
                            res.status(500).send({
                                message: "Error al asociar alerta"
                            });
                        }
                    });
                }     
            }
        });
        return 'FR es mayor a 30 por minuto evaluar pase a UTI'
    }
}
function reglaCuatro(fechasintomas, medicos, idpaciente) {
    var fechaactual = new Date();
    var fecha= new Date(fechasintomas.slice(0, -14));
    if ((diff(fechaactual, fecha)) === 10){
        Alerta.addAlerta(idpaciente, 'Pasaron 10 días desde el inicio de los síntomas evaluar alta ', (err, data) => {
            if(err){
                res.status(500).send({
                    message: "Error al insertar alerta"
                });
            }
            else {
                for(m of medicos) {
                    Alerta.asociar(data, m.idempleado, (err, data) => {
                        if(err){
                            res.status(500).send({
                                message: "Error al asociar alerta"
                            });
                        }
                    });
                }     
            }
        });
        return 'Pasaron 10 días desde el inicio de los síntomas evaluar alta '
    }
}
function reglaCinco(saturacion, medicos, idpaciente) {
    if (saturacion < 92){
        Alerta.addAlerta(idpaciente, 'Saturación de oxígeno es menor a 92%. Evaluar oxígeno terapia y prono ', (err, data) => {
            if(err){
                res.status(500).send({
                    message: "Error al insertar alerta"
                });
            }
            else {
                for(m of medicos) {
                    Alerta.asociar(data, m.idempleado, (err, data) => {
                        if(err){
                            res.status(500).send({
                                message: "Error al asociar alerta"
                            });
                        }
                    });
                }     
            }
        });
        return 'Saturación de oxígeno es menor a 92%. Evaluar oxígeno terapia y prono '
    }
}
function reglaSeis(saturacion, satAnt, medicos, idpaciente) {
    if ((saturacion >= 92) && ((satAnt - saturacion) === 3)){
        Alerta.addAlerta(idpaciente, 'Saturación bajó 3%. Evaluar oxígeno terapia y prono', (err, data) => {
            if(err){
                res.status(500).send({
                    message: "Error al insertar alerta"
                });
            }
            else {
                for(m of medicos) {
                    Alerta.asociar(data, m.idempleado, (err, data) => {
                        if(err){
                            res.status(500).send({
                                message: "Error al asociar alerta"
                            });
                        }
                    });
                }     
            }
        });
        return 'Saturación bajó 3%. Evaluar oxígeno terapia y prono'
    }
}
function correrReglas(ev, satAnt, fechasintomas, idpaciente) {
    Paciente.getMedicosPaciente(idpaciente, (errP, dataP) => {
        if(errP){
            res.status(500).send({
                message: "Error al devolver médicos asociados"
            });
        }
        else {
            if (ev.idsistema !== 3){
                reglaUno(ev.somnolencia, dataP, idpaciente);
                reglaDos(ev.mecanicaventilatoria, dataP, idpaciente);
                reglaTres(ev.fr, dataP, idpaciente);
            }
            reglaCuatro(fechasintomas, dataP, idpaciente);
            if (ev.oxigeno === true ){
                reglaCinco(ev.saturacion, dataP, idpaciente);
                reglaSeis(ev.saturacion, satAnt, dataP, idpaciente);  
            }
        }
    });
}



module.exports = {
   correrReglas
};