Questions = new Mongo.Collection("questions");

if (Meteor.isClient) {

  Template.admin.helpers({
    questions: function () {
      return Questions.find({});
    }
  });

  Template.admin.events({
    'submit .addQuestion': function (event) {

      var question = {
        text: event.target.text.value,
        answer1: event.target.answer1.value,
        answer2: event.target.answer2.value,
        answer3: event.target.answer3.value,
        answer4: event.target.answer4.value,
        index: event.target.index.value
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

  Template.question.helpers({
    'submit .addQuestion': function () {
    }
  });

  Template.question.events({
    'click #deleteQuestion': function (event) {
      Meteor.call("deleteQuestion", this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
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
  }
});
