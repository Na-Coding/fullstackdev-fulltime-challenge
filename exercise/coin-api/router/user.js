const express = require('express')
const router = express.Router()
const userUtil = require('../controller/user_ctl')
const validateUtil = require('../controller/validate_ctl');


router.post('/user_register',
    validateUtil.validate_user_register(),
    userUtil.user_register(),
    function (req, res) {
        res.status(200).json({
            success: true,
            message: 'สมัครสมาชิกสำเร็จ',
        });
    });
router.post('/user_login',
    validateUtil.validate_user_login(),
    userUtil.user_login(),
    function (req, res) {
        // req.session = { ck_coinlocker: req.result }
        res.status(200).json({
            success: true,
            message: 'เข้าสู่ระบบสำเร็จ',
            result:req.result
        });
    });
// router.get('/user_logout',
//     function (req, res) {
//         req.session = null
//         res.status(200).json({
//             success: true,
//             message: 'ออกจากระบบสำเร็จ'
//         });
//     });
// router.get('/check_token',
//     validateUtil.validate_token(),
//     function (req, res) {
//         res.status(200).json({
//             success: true,
//             message: 'check token success'
//         });
//     });

module.exports = router;