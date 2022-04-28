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
  
     

    },
    verifyUser: (token) => {
        const decodedPayload = jwt.verify(token, secretKey)
        //console.log('decodedPayload', decodedPayload);
        return User.findByPk(decodedPayload.id)
    }
};

