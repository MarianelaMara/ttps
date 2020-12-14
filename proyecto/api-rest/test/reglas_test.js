var expect = require('chai').expect;
var regla= require('../src/reglas');

//const expect = global.expect;

describe('correr reglas', () => {
  var satanterior = 97
  var a = []
  var fecha = new Date();
  fecha.setDate(fecha.getDate() - 10);
  var evolucion1= {
    somnolencia: true,
    mecanicaventilatoria: 'Regular',
    fr: 40,
    fechasintomas: fecha.toISOString(),
    oxigeno: true,
    saturacion: 94
  }
  var evolucion2= {
    somnolencia: false,
    mecanicaventilatoria: 'Buena',
    fr: 23,
    fechasintomas: '2020-12-08',
    oxigeno: false,
    saturacion: 90
  }
  
  //reglaUno
  it('regla uno si somnolencia es true', () => {
    expect(regla.reglaUno(evolucion1.somnolencia, a)).to.equal(true);
  });
  it('regla uno si somnolencia es false', () => {
    expect(regla.reglaUno(evolucion2.somnolencia, a)).to.equal(false);
  });
  //reglaDos
  it('regla dos si mecanica ventilatoria es Regular', () => {
    expect(regla.reglaDos(evolucion1.mecanicaventilatoria, a )).to.equal(true);
  });
  it('regla dos si mecanica ventilatoria es Buena', () => {
    expect(regla.reglaDos(evolucion2.mecanicaventilatoria, a)).to.equal(false);
  });
   //reglaTres
  it('regla tres si frecuencia respiratoria es mayor a 30 ', () => {
    expect(regla.reglaTres(evolucion1.fr, a )).to.equal(true);
  });
  it('regla tres si frecuencia respiratoria es menor a 30', () => {
    expect(regla.reglaTres(evolucion2.fr, a)).to.equal(false);
  });
   //reglaCuatro
  it('regla cuatro pasaron 10 días desde el inicio de los síntomas', () => {
    expect(regla.reglaCuatro(evolucion1.fechasintomas, a )).to.equal(true);
  });
  it('regla cuatro si no pasaron 10 días desde el inicio de los síntomas', () => {
    expect(regla.reglaCuatro(evolucion2.fechasintomas, a )).to.equal(false);
  });
   //reglaCinco
   it('regla cinco si saturación de oxígeno es menor a 92%', () => {
    expect(regla.reglaCinco(evolucion2.saturacion, a )).to.equal(true);
  });
  it('regla cinco si Saturación de oxígeno es mayor 92%', () => {
    expect(regla.reglaCinco(evolucion1.saturacion, a )).to.equal(false);
  });
   //reglaSeis
   it('regla seis si Saturación bajó 3% con respecto a la anterior y no se corrio la regla 5', () => {
    expect(regla.reglaSeis(evolucion1.saturacion, satanterior, a )).to.equal(true);
  });
  it('regla seis si Saturación no bajó 3%', () => {
    expect(regla.reglaSeis(evolucion2.saturacion, satanterior, a )).to.equal(false);
  })
})
