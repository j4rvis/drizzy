Meteor.subscribe("users");

Template.server_app.helpers({
  users: function(){
    return Users.find({});
  }
});