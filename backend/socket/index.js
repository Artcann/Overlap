const socketioJwt = require("socketio-jwt");

const User = require("../models/User");
const Day = require("../models/Day");
const Question = require("../models/Question");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

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

      const user = await User.findOne({_id : socket.decoded_token.userId});
      const progression = user.progression || {};

      // Add questions to the user
      if (!progression[day._id]) {
        const questions = await Promise.all(day.questions.map(async questionId => {
          return await Question.findOne({id: questionId});
        }))
  
        progression[day._id] = shuffle(questions).map(question => {
          question.answer = null
          question.time = null
          return question
        });
        
        try {
          await User.findOneAndUpdate(
            { 
              _id: socket.decoded_token.userId 
            },
            {
              progression: progression
            }
          );
          } catch (e) {
            socket.emit('error');
          }
      }

      socket.emit('startGameSuccess')
    })

    socket.on('nextQuestion', async () => {
      const day = await Day.getDay();
      const questions = (await User.findOne({_id: socket.decoded_token.userId})).progression[day._id];

      for (const question of questions) {
        if (!question.answer) {
          socket.emit("nextQuestion", question);
          return;
        }
      }
    })

    
  })
}