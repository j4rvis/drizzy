Meteor.subscribe("questions");
Meteor.subscribe("system");

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