Meteor.subscribe("questions");
Meteor.subscribe("system");

Template.admin_view.events({
  'click #questions': function () {
    Router.go("/admin/questions");
  },
  'click #users': function () {
    Router.go("/admin/users");
  },
  'click #start': function () {
    Meteor.call("startGame");
    console.log("Test");
  },
  'click #resetIndex': function () {
    Meteor.call("setQuestionIndex", 0);
    Meteor.call("resetUserAnswers");
  }
});

Template.admin_view.helpers({
  gameIsRunning: function () {
    if(System.findOne({name: "gameStarted"})){
      var system = System.findOne({name: "gameStarted"});
      return system.value;
    }else{
      return false;
    }
  },
  currentQuestion: function () {
    if(System.findOne({name: "currentQuestionIndex"})){
      var system = System.findOne({name: "currentQuestionIndex"});
      return system.value;
    }else{
      return "Variable nicht gesetzt";
    }
  }
});

Meteor.startup(function () {
  if (System.find({name: "gameStarted"}).count() == 0) {
    System.insert({name: "gameStarted", value: false});
  }
});