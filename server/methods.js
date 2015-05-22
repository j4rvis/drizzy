Meteor.methods({
  addUser: function(name) {
    Users.insert({
      name: name,
      answerIndex: 0,
      date: new Date()
    });
  },
  deleteUser: function(name) {
    Users.remove({name: name});
  },
  deleteUserById: function(userId) {
    Users.remove(userId);
  },
  updateUserAnswer: function(userName, answerIndex) {
    Users.update({name: userName}, {$set: {answerIndex: answerIndex}})
  },
  addQuestion: function (target) {
    Questions.insert({
      text: target.text,
      answer1: target.answer1,
      answer2: target.answer2,
      answer3: target.answer3,
      answer4: target.answer4,
      righAnswerIndex: target.index,
      createdAt: new Date()
    });
  },
  deleteQuestion: function (questionId) {
    Questions.remove(questionId);
  },
  startGame: function(){
    var system = System.findOne({name: "gameStarted"});
    var newValue = !system.value;
    System.update({name: "gameStarted"}, {$set: {value: newValue}});
  }
});