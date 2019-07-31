const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../../models/users');
const auth = require('../../../middleware/auth');
const { jwtSecret } = require('../../../config/keys');

const router = express.Router();

// register user
router.post('/', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({username, email, password});
    newUser.save()
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

router.get('/', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            res.json(user);
        })
})

module.exports = router;
