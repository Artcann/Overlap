const socketioJwt = require("socketio-jwt");

const User = require("../models/User");
const Day = require("../models/Day");
const Question = require("../models/Question");

exports.socket = (io) => {
  io.use(socketioJwt.authorize({
    secret: process.env.RANDOM_TOKEN_SECRET,
    handshake: true
  }));

  io.on('connection', (socket) => {
    
    socket.on('startGame', async () => {
      const day = await Day.getDay();

      if (!day) {
        socket.emit('notStarted')
        return
      }

      const user = User.findOne({_id : socket.decoded_token.userId});
      const progression = user.progression || {};

      const questions = await Promise.all(day.questions.map(async questionId => {
        return await Question.findOne({id: questionId});
      }))

      console.log(questions);

      console.log(progression)
      if(!progression[day._id]) {

      }
    })

    
  })
}