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
    answerIndex = Number(answerIndex);
    Users.update({name: userName}, {$set: {answerIndex: answerIndex}})
  },
  resetUserAnswers: function () {
    var allUsers = Users.find({});
    allUsers.forEach(function (user) {
      Users.update({_id: user._id}, {$set: {answerIndex: 0}});
    });
  },
  addQuestion: function (target) {
    Questions.insert({
      text: target.text,
      answer1: target.answer1,
      answer2: target.answer2,
      answer3: target.answer3,
      answer4: target.answer4,
      righAnswerIndex: Number(target.index),
      order: Number(target.order),
      createdAt: new Date()
    });
  },
  deleteQuestion: function (questionId) {
    Questions.remove(questionId);
  },
  startGame: function(){
    if(System.findOne({name: "gameStarted"})){
      var system = System.findOne({name: "gameStarted"});
      var newValue = !system.value;
      System.update({name: "gameStarted"}, {$set: {value: newValue}});
    }else{
      System.insert({name: "gameStarted", value: true});
    }
  },
  setQuestionIndex: function (index) {
    if(System.findOne({name: "currentQuestionIndex"})){
      System.update({name: "currentQuestionIndex"}, {$set: {value: index}});
    }else{
      System.insert({name: "currentQuestionIndex", value: 0});
    }
  },
  incrementQuestionIndex: function () {
    if(System.findOne({name: "currentQuestionIndex"})){
      var system = System.findOne({name: "currentQuestionIndex"});
      var newValue = system.value + 1;
      System.update({name: "currentQuestionIndex"}, {$set: {value: newValue}});
    }else{
      System.insert({name: "currentQuestionIndex", value: 0});
    }
  }
});