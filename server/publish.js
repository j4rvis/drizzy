Meteor.publish("users", function(){
  return Users.find({});
});
Meteor.publish("questions", function(){
  return Questions.find({});
});
Meteor.publish("system", function(){
  return System.find({});
});