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

Template.questions_view.helpers({
  questions: function () {
    return Questions.find({}, {sort: {createdAt: -1}});
  }
});

Template.questions_view.events({
  'click #admin': function () {
    Router.go("/admin");
  },
  'click #users': function () {
    Router.go("/admin/users");
  },
  'submit .addQuestion': function (event) {

    var question = {
      text: event.target.text.value,
      answer1: event.target.answer1.value,
      answer2: event.target.answer2.value,
      answer3: event.target.answer3.value,
      answer4: event.target.answer4.value,
      index: event.target.index.value,
      order: event.target.order.value
    };

    Meteor.call("addQuestion", question);
    event.target.text.value = "";
    event.target.answer1.value = "";
    event.target.answer2.value = "";
    event.target.answer3.value = "";
    event.target.answer4.value = "";

    return false;
  }
});

Template.question.events({
  'click #deleteQuestion': function () {
    Meteor.call("deleteQuestion", this._id);
  }
});

Template.users_view.helpers({
  getAllUsers: function () {
    return Users.find({});
  }
});
Template.users_view.events({
  'click #admin': function () {
    Router.go("/admin");
  },
  'click #questions': function () {
    Router.go("/admin/questions");
  }
});

Template.user_detailed.events({
  'click #deleteUser': function () {
    Meteor.call("deleteUserById", this._id);
  }
});

Meteor.startup(function () {
  if (System.find({name: "gameStarted"}).count() == 0) {
    System.insert({name: "gameStarted", value: false});
  }
});