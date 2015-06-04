Meteor.subscribe("questions");
Meteor.subscribe("system");

Template.users_view.helpers({
  getAllUsers: function () {
    return Users.find({});
  }
});

Template.user_detailed.events({
  'click #deleteUser': function () {
    Meteor.call("deleteUserById", this._id);
  }
});