// const jwt = require('jsonwebtoken');
// const { User } = require('../models')

// const secreteKey = 'iamthesecretkey';

// module.exports = {
//     createJWT: (user) => {
//         const token = jwt.sign({
//             username: user.user_name,
//             id: user.id
//         },
//         secreteKey,
//         {
//             expiresIn: '24h'
//         });

//         return token;
//     },
//     verifyUser: (token) => {
//         const decodedPayload = jwt.verify(token, secreteKey)
//         return User.findByPk(decodedPayload.id)
//     }
// }