Questions = new Mongo.Collection("questions");
Answers = new Mongo.Collection("answers");

if (Meteor.isClient) {

  Template.admin.helpers({
    questions: function () {
      return Questions.find({});
    }
  });

  Template.admin.events({
    'submit .addQuestion': function (event) {

     var text = event.target.text.value
     Meteor.call("addQuestion", text);
     event.target.text.value = "";

     return false; 
    }
  });

  Template.question.helpers({
    'submit .addQuestion': function () {
      
    }
  });

  Template.question.events({
    'submit .addQuestion': function () {
      
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  addQuestion: function (text) {
    Questions.insert({
      text: text,
      createdAt: new Date()
    });
  },
  deleteQuestion: function (questionId) {
    Questions.remove(questionId);
  }
});

Router.route('/admin', function () {
  this.render('admin');
});
