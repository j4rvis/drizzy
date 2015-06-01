if (Meteor.isServer) {
  Meteor.startup(function () {
    if(!System.findOne({name: "currentQuestionIndex"})){
      System.insert({name: "currentQuestionIndex", value: 0});
    }
  });
}