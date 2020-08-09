//this ichat app run by live server not by nodejs and postman app is also run by live server but before add on  github first add about & contact page on postman app


//Node server which will handle socket io connections

const io = require('socket.io')(8000)//here io initialise & port defined

const users = {};

io.on('connection', socket => {//listen bhot sare connections kom called io is a instance
    socket.on('new-user-joined', name => {//socket.on decide what happen with a perticular connection 
        // console.log("New user", name)
        users[socket.id] = name;//user ko aak key dedo aur oosme name append kr do
        socket.broadcast.emit('user-joined', name);//broadcast.emit sab event emit kr dega oos insaan ko chod kr jisne join kiya
    }); 

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
