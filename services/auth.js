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
        expiresIn: '48h'
        });

        return token;
    },
    terminateJWT: (user) => {

        const token = 
        res.header(token, secretKey, { expires: new Date(0) });
        res.status(200).send('Logged out');

    },

    verifyUser: (token) => {
        try {
            const decodedPayload = jwt.verify(token, secretKey)
            return User.findByPk(decodedPayload.id)
        } catch(err){
            return null;
        };
    }
};

