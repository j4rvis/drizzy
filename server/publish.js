Meteor.publish("users", function(){
  return Users.find({});
});
Meteor.publish("questions", function(){
  return Questions.find({});
});