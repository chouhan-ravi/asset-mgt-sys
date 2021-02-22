const io = require('socket.io')();
const userService = require("../services/user.service");
const AssetService = require("../services/asset.service");


const usernames = {};
const rooms = ['SUPPLIER', 'REVIEWER', 'CARIER'];

module.exports = server => {
    io.attach(server);
    io.origins('*:*');
    io.use((socket, next) => {
        console.log(socket.handshake.query.token);
        if(socket.handshake.query.token) {
            const base64Credentials = socket.handshake.query.token;
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            const [username, password] = credentials.split(':');
            const user = userService.authenticate({ username, password });
            if (user) {
                next();
            }
        
        }
        next(new Error('Authentication error'));
    });
    /* experimental
    io.sockets.on('connection', (socket) => {
        socket.on('adduser', (data) => {
            console.log(`===> `, data);
            socket.username = data.username;
            let userRoom = 'CARIER';
            if (data.userType == 'SUPPLIER') {
                userRoom = 'SUPPLIER';
            } else if (data.userType == 'REVIEWER') {
                userRoom = 'REVIEWER';
            } 
            socket.room = userRoom;
            usernames[data.username] = data.username;
            socket.join(userRoom);
            socket.emit('ping', 'SERVER', 'You have connected to '+userRoom);
            // socket.emit('ping', {message: 'You have connected to '+userRoom});
        });

        socket.on('pingtoreviewer', (data) => {
            io.sockets.in('REVIEWER').emit('ping', socket.username, data);
        });

        socket.on('pingtosupplier', (data) => {
            io.sockets.in('SUPPLIER').emit('ping', socket.username, data);
        });

        socket.on('disconnect', () => {
            delete usernames[socket.username];
            io.sockets.emit('updateusers', usernames);
            socket.broadcast.emit('ping', 'SERVER', socket.username+' has disconnected');
            socket.leave(socket.room);
        });
    }); */

    io.on('connection', (client) => {
        console.log(`Client  ${client.id} connected.`);
        client.emit('info', {message: `You are  ${client.id} connected.`});

        client.on('join', function(data) {
            console.log(data);
        });
    
        client.on('message', function(data) {
            //AssetService.saveAlarm(data);
            //console.log(io.socket);
            io.emit('info', {message: "Alert! New request pushed"});
        });

        client.on('disconnect', () =>{
            console.log(`Client ${client.id} disconnected.`);
            //client.broadcast.emit('info', {message: `Client ${client.id} disconnected.`});
        });

        client.on('error', function (err) {
            console.log('received error from client:', client.id)
            console.log(err)
        })
    });
};