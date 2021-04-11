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
          question.startTime = null
          question.endTime = null
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
      const progression = (await User.findOne({_id: socket.decoded_token.userId})).progression;
      let questions = progression[day._id]

      let questionSent = false;
      for (let i = 0; i < questions.length; i++) {
        if (!questions[i].answer && questions[i].answer !== 0) {
          if(!questions[i].startTime) {
            questions[i].startTime = Date.now();
          }
          let question = {
            ...questions[i],
            correct: undefined
          }
          socket.emit("nextQuestion", question);
          questionSent = true
          break;
        }
      }

      if (!questionSent)
        socket.emit('endDay')
  
      await User.findOneAndUpdate(
        { 
          _id: socket.decoded_token.userId 
        },
        {
          progression: progression
        }
      );
    })

    socket.on("submitAnswer", async ({ answer, question }) => {
      const day = await Day.getDay();
      const user = await User.findOne({_id: socket.decoded_token.userId})
      const progression = user.progression;
      let questions = progression[day._id];

      for (let i = 0; i < questions.length; i++) {
        if (question.id == questions[i].id) {
          if (questions[i].answer || questions[i].answer === 0) {
            socket.emit('error')
            break
          }

          questions[i].answer = answer;
          questions[i].endTime = Date.now()
          let points = 0
          if (questions[i].answer === questions[i].correct) {
            points += 10;
            points += Math.floor(Math.min(10, 15_000/(questions[i].endTime - questions[i].startTime)));
            user.score += points;
          }
          
          progression[day._id][i] = questions[i] 
          await User.findOneAndUpdate(
            { 
              _id: socket.decoded_token.userId 
            },
            {
              score: user.score,
              progression
            }
          );

          socket.emit("correction", {answer: questions[i].correct, ours: questions[i].answer, points});
          break
        }
      }
    })
  })
}