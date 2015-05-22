Meteor.methods({
  addUser: function(name) {
    Users.insert({
      name: name,
      date: new Date()
    });
  },
  deleteUser: function(name) {
    Users.remove({name: name});
  },
  deleteUserById: function(userId) {
    Users.remove(userId);
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
    var currentValue;
    var cursor = System.find({name: "gameStarted"});
    cursor.forEach(function (system) {
      currentValue = system.value;
    });

    System.update({name: "gameStarted"}, {$set: {value: !currentValue}});
  }
});