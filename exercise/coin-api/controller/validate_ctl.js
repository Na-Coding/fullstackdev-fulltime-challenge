var errorMessages = require('../const/err_message');
var jwt = require('jsonwebtoken')



exports.validate_user_register = function () {
    return function (req, res, next) {
        if (req.body.username && req.body.password) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data);
            return;
        }
    };
};

exports.validate_user_login = function () {
    return function (req, res, next) {
        if (req.body.username && req.body.password) {
            next();
        } else {
            res.status(200).json(errorMessages.invalid_data);
            return;
        }
    };
};

// exports.validate_token = function () {
//     return function (req, res, next) {
//         try {
//             const decode = jwt.verify(req.session.ck_coinlocker, 'key')
//             if (decode) {
//                 req.id = decode.id
//                 next()
//             } else {
//                 res.status(400).json({ success: false, messages: 'token not found' });
//             }
//         } catch (error) {
//             res.status(400).json({ success: false, messages: 'token not found' });
//         }
//     }
// }