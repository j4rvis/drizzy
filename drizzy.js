Users = new Mongo.Collection("users")

if (Meteor.isClient) {

  Template.client.helpers({
    users: function(){
      return Users.find({});
    }
  });

  Template.client.events({
    'submit .new_user': function(event) {
      Meteor.call("addUser", event.target.username.value);
      event.target.username.value = "";
      // Router.go('/answer')
      return false;
    },
    'click button': function(event){
      Meteor.call("deleteUser", event.target.previousElementSibling.textContent);
      // console.log(event.target.previousElementSibling.textContent);
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  addUser: function(name) {
    Users.insert({
      name: name,
      date: new Date()
    });
  },
  deleteUser: function(name) {
    Users.remove({name: name});
  }
});
