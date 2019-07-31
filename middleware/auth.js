const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({error: 'unauthorised'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded;
        next();
    } catch (err){
        next();
    }
}

module.exports = auth;
