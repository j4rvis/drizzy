if (Meteor.isServer) {
  Meteor.startup(function () {
    if(!System.findOne({name: "currentQuestionIndex"})){
      System.insert({name: "currentQuestionIndex", value: 0});
    }
    if(!System.findOne({name: "timerIsRunning"})){
      System.insert({name: "timerIsRunning", value: false});
    }
  });
}