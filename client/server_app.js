Meteor.subscribe("users");

Template.server_app.helpers({
  users: function(){
    return Users.find({});
  },
  userCount: function(){
    return Users.find().count()
  }
});

Template.server_app.events({
  'click button': function(event){
    Meteor.call("deleteUser", event.target.previousElementSibling.textContent);
    return false;
  }
})