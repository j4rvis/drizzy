Meteor.subscribe('users', function(){
  var current_user = Session.get('user');
  var user_exists = Users.findOne({name: Session.get('user')});
  if(current_user && current_user == user_exists.name){
    Router.go('/client_wait');
  } else {
    Session.clear();
  }
});
Template.client_wait.helpers({
  registeredUsers: function(){
    return Users.find().count();
  }
});

Template.client_app.events({
  'submit .new_user': function(event) {
    var name = event.target.username.value;
    Meteor.call("addUser", name);
    event.target.username.value = "";
    Session.setPersistent('user',name);
    Router.go('/client_wait');
    return false;
  }
});