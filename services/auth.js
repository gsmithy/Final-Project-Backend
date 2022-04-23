const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secretKey = 'iamthesecretkey';

/* JWT Token creation */
module.exports = {
    createJWT: (user) => {
        const token = jwt.sign({
            username: user.user_name, 
            id: user.id
        },
        secretKey,
        {
            expiresIn: '10h'
        });

        return token;
    },
    verifyUser: (token) => {
        const decodedPayload = jwt.verify(token, secretKey)
        console.log('decoded payload', decodedPayload);
        return User.findByPk(decodedPayload.id);
    }
};

