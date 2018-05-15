let history = [];


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('+1');

        socket.emit('history', history);

        socket.on('username', data => console.log(data));

        socket.emit('welcome', 'Bonjour');
        socket.broadcast.emit('welcome', 'momo');

        socket.on('newMessage', data => {
            history.push(data);
            if (history.length > 10) {
                return history;


            }

            socket.broadcast.emit('incomingMessage', data);
            socket.emit('incomingMessage', data);
        });

        socket.on('typing', data => socket.broadcast.emit('typingIncoming', data));

        socket.on('disconnect', () => {
            console.log('-1');
        })

    });
};
