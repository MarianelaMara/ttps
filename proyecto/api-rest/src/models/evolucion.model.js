const sql = require("../database.js");
const moment = require('moment');


const Evolucion = function(p) {
  this.idinternacion = p.idinternacion;
  this.idpersonal = p.idpersonal;
  this.fecha = p.fecha;
  this.hora = p.hora;
  this.temperatura = p.temperatura;
  this.tasistolica = p.tasistolica;
  this.tadiastolica = p.tadiastolica;
  this.fc = p.fc;
  this.fr = p.fr;
  this.mecanicaventilatoria = p.mecanicaventilatoria;
  this.oxigeno = p.oxigeno;
  this.tipo = p.tipo;
  this.litros = p.litros;
  this.porcentaje = p.porcentaje;
  this.saturacion = p.saturacion;
  this.pafi = p.pafi;
  this.valorpafi = p.valorpafi;
  this.pronovigil = p.pronovigil;
  this.tos = p.tos;
  this.disnea = p.disnea;
  this.estabilidad = p.estabilidad;
  this.somnolencia = p.somnolencia;
  this.anosmia = p.anosmia;
  this.disgeusia = p.disgeusia;
  this.observacion = p.observacion;
  this.arm = p.arm;
  this.armdescripcion = p.armdescripcion;
  this.traqueotomia = p.traqueotomia;
  this.vasopresores = p.vasopresores; 
  this.vasopresoresdescripcion = p.vasopresoresdescripcion;
  this.idsistema = p.idsistema;
};

Evolucion.getEvolucion = (id, result) => {
  //select DATE_FORMAT (fecha, '% d /% m /% y') 
    sql.query('SELECT * FROM evolucion WHERE idinternacion = ' + [id] + ' ORDER BY fecha', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
      if (res.length) {
        result(null, res);
        return;
      }
      // not found Internacion with the id
      result({ kind: "not_found" }, null);
    });
};
Evolucion.getUltimaEvolucion = (id, result) => {
    sql.query('SELECT * FROM evolucion WHERE idinternacion = ' + [id] + ' ORDER BY idevolucion DESC LIMIT 1', (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } 
      if (res.length) {
        result(null, res[0]);
        return;
      }
      // not found Evoluciones with the id
      result({ kind: "not_found" }, null);
    });
};
Evolucion.getEvolucionesSistema = (idinternacion, idsistema, result) => {
  sql.query('SELECT * FROM evolucion WHERE idinternacion = ' + [idinternacion] + ' AND idsistema='+[idsistema]+' ORDER BY fecha', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res.length) {
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};
  
Evolucion.addEvolucion = (idsistema, idinternacion,idpersonal, temperatura, tasistolica, tadiastolica, fc, fr, mecanicaventilatoria, oxigeno, tipo, litros, porcentaje, saturacion, pafi, valorpafi, pronovigil, tos, disnea, estabilidad, somnolencia, anosmia, disgeusia, observacion, arm, armdescripcion, traqueotomia, vasopresores, vasopresoresdescripcion,   result) => {
  var fecha = new Date();
  var hora = moment().format('LT');
    sql.query('INSERT INTO evolucion (`idinternacion`, `idempleado`, `fecha`, `hora`, `temperatura`, `tasistolica`, `tadiastolica`, `fc`, `fr`, `mecanicaventilatoria`, `oxigeno`, `tipo`, `litros`, `porcentaje`, `saturacion`, `pafi`, `valorpafi`, `pronovigil`, `tos`, `disnea`, `estabilidad`, `somnolencia`, `anosmia`, `disgeusia`, `observacion`, `arm`, `armdescripcion`, `traqueotomia`, `vasopresores`, `vasopresoresdescripcion`, `idsistema`) VALUES ("' + [idinternacion] + '", "' +[idpersonal]+'", CURDATE() , TIME(NOW()), "' + [temperatura] + '", "' + [tasistolica] +'", "' + [tadiastolica] +'", "' + [fc] +'", "' + [fr] +'", "' + [mecanicaventilatoria] +'", ' + [oxigeno] +', "' + [tipo] +'", "' + [litros] +'", "' + [porcentaje] +'", "' + [saturacion] +'", ' + [pafi] +', "' + [valorpafi] +'", ' + [pronovigil] +', ' + [tos] +', "' + [disnea] +'", ' + [estabilidad] +', ' + [somnolencia] +', ' + [anosmia] +', ' + [disgeusia] +', "' + [observacion] +'", ' + [arm] +', "' + [armdescripcion] +'", ' + [traqueotomia] +', ' + [vasopresores] +', "' + [vasopresoresdescripcion] +'", "' +[idsistema]+'")' , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    else {
      const evolucion = new Evolucion({
        idinternacion: idinternacion,
        idpersonal: idpersonal,
        fecha: fecha,
        hora: hora,
        temperatura: temperatura,
        tasistolica: tasistolica,
        tadiastolica: tadiastolica,
        fc: fc,
        fr: fr,
        mecanicaventilatoria: mecanicaventilatoria,
        oxigeno: oxigeno,
        tipo: tipo,
        litros: litros,
        porcentaje: porcentaje,
        saturacion: saturacion,
        pafi: pafi,
        valorpafi: valorpafi,
        pronovigil: pronovigil,
        tos: tos,
        disnea: disnea,
        estabilidad: estabilidad,
        somnolencia: somnolencia,
        anosmia: anosmia,
        disgeusia: disgeusia,
        observacion: observacion,
        arm: arm,
        armdescripcion: armdescripcion,
        traqueotomia: traqueotomia,
        vasopresores: vasopresores, 
        vasopresoresdescripcion: vasopresoresdescripcion,
        idsistema: idsistema
      });
      result(null, evolucion);
      return;
    }
});
};
Evolucion.editEvolucion = (idevolucion,idsistema,idinternacion,idpersonal,fecha, hora, temperatura, tasistolica, tadiastolica, fc, fr, mecanicaventilatoria, oxigeno, tipo, litros, porcentaje, saturacion, pafi, valorpafi, pronovigil, tos, disnea, estabilidad, somnolencia, anosmia, disgeusia, observacion, arm, armdescripcion, traqueotomia, vasopresores, vasopresoresdescripcion,   result) => {
  sql.query('UPDATE evolucion SET temperatura =' +[temperatura]+', tasistolica= ' +[tasistolica]+', tadiastolica =' +[tadiastolica]+', fc=' +[fc]+', fr=' +[fr]+', mecanicaventilatoria= "' +[mecanicaventilatoria]+'", oxigeno= "' +[oxigeno]+'", tipo= "' +[tipo]+'", litros=' +[litros]+', porcentaje=' +[porcentaje]+', saturacion=' +[saturacion]+', pafi=' +[pafi]+', valorpafi=' +[valorpafi]+', pronovigil=' +[pronovigil]+', tos=' +[tos]+', disnea=' +[disnea]+', estabilidad=' +[estabilidad]+', somnolencia=' +[somnolencia]+', anosmia=' +[anosmia]+', disgeusia=' +[disgeusia]+', observacion= "' +[observacion]+'", arm=' +[arm]+', armdescripcion= "' +[armdescripcion]+'", traqueotomia= ' +[traqueotomia]+', vasopresores= ' +[vasopresores]+', vasopresoresdescripcion= "' +[vasopresoresdescripcion]+'", idsistema= ' +[idsistema]+'  WHERE (`idevolucion` = "'+[idevolucion]+'")' , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res) {
      const evolucion = new Evolucion({
        idinternacion: idinternacion,
        idpersonal: idpersonal,
        fecha: fecha,
        hora: hora,
        temperatura: temperatura,
        tasistolica: tasistolica,
        tadiastolica: tadiastolica,
        fc: fc,
        fr: fr,
        mecanicaventilatoria: mecanicaventilatoria,
        oxigeno: oxigeno,
        tipo: tipo,
        litros: litros,
        porcentaje: porcentaje,
        saturacion: saturacion,
        pafi: pafi,
        valorpafi: valorpafi,
        pronovigil: pronovigil,
        tos: tos,
        disnea: disnea,
        estabilidad: estabilidad,
        somnolencia: somnolencia,
        anosmia: anosmia,
        disgeusia: disgeusia,
        observacion: observacion,
        arm: arm,
        armdescripcion: armdescripcion,
        traqueotomia: traqueotomia,
        vasopresores: vasopresores, 
        vasopresoresdescripcion: vasopresoresdescripcion,
        idsistema: idsistema
      });
      result(null, evolucion);
      return;
    }
    result({ kind: "not_found" }, null);
});
};

module.exports = Evolucion;