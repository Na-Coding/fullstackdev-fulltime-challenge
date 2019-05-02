var app = require('express')()
var bodyParser = require('body-parser')
var http = require('http').Server(app)
var io = require('socket.io')(http)
const version = '/api/v1/'
var logger = require('morgan')
var moment = require('moment')
const server = app
const cookieSession = require('cookie-session')
const cors = require('cors')
var port = process.env.PORT || 3013;
var mm = moment()
var date = mm.utc().format('DD-MM-YYYY')
var time = mm.utc().format('HH:mm:ss')

const corsOptions = {
    origin: (origin, cb) => {
        // console.log(origin);
        cb(null, true)
    },
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions))
server.use(bodyParser.json({
    limit: '50mb'
}))
server.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))
var configlog = `:method :url status :status `
app.use(logger(configlog))
var insert = require('./router/insert')
var user = require('./router/user')
app.use(cookieSession({
    name: 'coin-locker',
    keys: ['cookie'],
    maxAge: 8 * 60 * 60 * 1000,
    httpOnly: true
}))
app.use(version + 'insert', insert)
app.use(version + 'user', user)
io.on('connect', function (socket) {
    // Client ทำการเชื่อมต่อ
    console.log('user Connected' + " " + date + " " + time);
    // Client ตัดการเชื่อมต่อ
    socket.on('disconnect', function () {
        console.log('user Disconnect' + " " + date + " " + time);
    })
    // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
    socket.on('sent-message', function (message) {
        io.sockets.emit('new-message', message)
    })
})
http.listen(port, function (err, result) {
    console.log('running in port http://localhost:' + port);
}) 
