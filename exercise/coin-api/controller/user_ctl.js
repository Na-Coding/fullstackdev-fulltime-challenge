var MongoClient = require('mongodb').MongoClient
// var url = 'mongodb+srv://krittaphat_na:1234@coinlockercluster-lwtpx.mongodb.net/test?retryWrites=true';
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/'
// var url = 'mongodb://localhost:27017/';
let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let encrytp = require('../const/encrypt')

exports.user_register = function () {
    return function (req, res, next) {
        console.log(req.body)
        var data = { username: req.body.username, password: encrytp.encrytp(req.body.password) }
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("CoinLocker");
            if (typeof dbo[0] === 'undefined') {
                dbo.collection("User").insert(data, function (err, res) {
                    if (err) throw err;
                    console.log("register success");
                    db.close();
                    next()
                });
            } else {
                res.status(200).json(errorMessages.err_user_already)
                return;
            }

        })
    }
}
exports.user_login = function () {
    return function (req, res, next) {
        var username = req.body.username
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("CoinLocker");
            dbo.collection("User").findOne({ username }, function (err, result) {
                if (err) throw err;
                if (result != null) {
                    if (bcrypt.compareSync(req.body.password, result.password)) {
                        const { id } = result._id
                        const token = jwt.sign({ id }, 'key')
                        req.result = result
                        next()
                    }
                    else {
                        res.status(400).json({ success: false, message: 'Failed to sign in!' });
                    }
                } else {
                    res.status(400).json({ success: false, message: 'Failed to sign in!' });
                }
                db.close();
                next()
            });
        })
    }
}

