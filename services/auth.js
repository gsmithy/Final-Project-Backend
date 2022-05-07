const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');


const secretKey = 'iamthesecretkey';

module.exports = {
    createJWT: (user) => {
        const token = jwt.sign({
            user_name: user.user_name, 
            id: user.id
        },
        secretKey,
        {
        expiresIn: '48h'
        });

        return token;
    },
    verifyUser: (token) => {
        try {
            const decodedPayload = jwt.verify(token, secretKey)
            return User.findByPk(decodedPayload.id)
        } catch(err){
            return null;
        };
    },

    hashPassword: function(plainTextPassword) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
      },

      comparePasswords: function (plainTextPassword, hashedPassword) {
        return bcrypt.compareSync(plainTextPassword, hashedPassword)
      }
};

