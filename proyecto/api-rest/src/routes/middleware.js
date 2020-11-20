const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../configs/config.js');

checkToken = (req, res, next) => {
    if (req.headers['user_token'] === undefined) {
        return res.json({
            error: 'you must include the header'
        });
    };
    const token = req.headers['user_token'];
    let payload = null
    try {
        payload = jwt.decode(token, config.llave)
    } catch (err) {
        return res.json({
            error: 'invalid token'
        });
    }

    if (moment().unix() > payload.expiresAt){
        return res.json({
            error: 'expired token'
        });
    };
    next();
};

module.exports = {
    checkToken: checkToken,
}