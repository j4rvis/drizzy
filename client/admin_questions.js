Meteor.subscribe("questions");
Meteor.subscribe("system");

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
Template.questions_view.helpers({
  questions: function () {
    return Questions.find({}, {sort: {createdAt: -1}});
  }
});
