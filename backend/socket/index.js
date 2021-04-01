exports.socket = (io) => {
  io.on('connection', (socket) => {
    console.log('Salut');
    console.log(socket);

    socket.on('test', ({ message }) => {
      console.log(message);
    })
  })
}