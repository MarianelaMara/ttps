const yup = require('yup');

function validate(validation) {
    return (req, res, next) => {
        try {
            validation(req.body);

            next();
        } catch (error) {
            next(error);
        }
    };
}

function createUsersValidation(data) {
    const schema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    });

    schema.validateSync(data);
}
function createPaciente(data) {
    const schema = yup.object().shape({
        nombre: yup.string().matches(/^[a-zA-Z]+$/).required(),
        apellido: yup.string().matches(/^[a-zA-Z]+$/).required(),
        dni: yup.number().integer().required(),
        domicilio: yup.string().required(),
        fechanac: yup.date().required(),
        telefono: yup.string().required(),
        antecedentes: yup.string(),
        obrasocial: yup.string(),
        nombrecontacto: yup.string().matches(/^[a-zA-Z]+$/),
        telefonocontacto: yup.string(),
        parentesco: yup.string().matches(/^[a-zA-Z]+$/),        
    });

    schema.validateSync(data);
}

function createEvolucion(data) {
    const schema = yup.object().shape({
        idinternacion: yup.number().integer().required(),
        idpersonal: yup.number().integer().required(),
        fecha:yup.date().required(),
        hora: yup.string().required(),
        temperatura:yup.number().required(),
        tasistolica: yup.number().integer().required(),
        tadiastolica: yup.number().integer().required(),
        fc: yup.number().integer().required(),
        fr: yup.number().integer().required(),
        mecanicaventilatoria: yup.string().matches(/^[a-zA-Z]+$/).required(),
        oxigeno: yup.bool().required(),
        tipo: yup.string().matches(/^[a-zA-Z]+$/),
        litros: yup.number().integer(), 
        porcentaje: yup.number(),
        saturacion: yup.number().integer(),
        pafi: yup.bool(),
        valorpafi: yup.number().integer(),
        pronovigil: yup.bool(),
        tos: yup.bool(),
        disnea: yup.number().integer(),
        estabilidad: yup.bool(),
        somnolencia: yup.bool().required(),
        anosmia: yup.bool().required(),
        disgeusia: yup.bool().required(),
        observacion: yup.string(),
        arm: yup.bool(),
        armdescripcion: yup.string(),
        traqueotomia: yup.bool(),
        vasopresores: yup.bool(),
        vasopresoresdescripcion: yup.string()
    });

    schema.validateSync(data);
}


module.exports = {
    validate,
    createUsersValidation,
    createPaciente,
    createEvolucion
};