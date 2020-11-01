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

module.exports = {
    validate,
    createUsersValidation,
};