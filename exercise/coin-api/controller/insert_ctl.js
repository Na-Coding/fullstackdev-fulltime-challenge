var MongoClient = require('mongodb').MongoClient
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/'
// var url = 'mongodb+srv://krittaphat_na:1234@coinlockercluster-lwtpx.mongodb.net/test?retryWrites=true';

// var url = 'mongodb://localhost:27017/';
exports.add_locker = function () {
    return function (req, res, next) {
        console.log(req.body)
        var data = req.body
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("CoinLocker");
            dbo.collection("Locker").insertOne(data, function (err, res) {
                if (err) throw err;
                console.log("insert to database success");
                db.close();
                next()
            });
        })
    }
}