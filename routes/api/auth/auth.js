const express = require('express');
const User = require('../../../models/users');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../../config/keys');

const router = express.Router();

router.post('/', (req, res) => {
    const { email, password } = req.body;
    User.findOne({email, password})
        .then(user => {
            jwt.sign(
                {id: user.id},
                jwtSecret,
                {expiresIn: 3600},
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    })
                }
            )
        })
})

module.exports = router;
