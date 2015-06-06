Meteor.subscribe("users");

Template.server_app.helpers({
  users: function(){
  	var maxUserCount = Users.find({}).count();
  	var query = Users.find({});
  	var handle = query.observeChanges({
  		changed: function (id, user) {
    		var answeredUserCount = Users.find({answerIndex: {$gt: 0}}).count();
        var systemTimer = System.findOne({name: "timerIsRunning"});

    		if(answeredUserCount == maxUserCount && !(systemTimer.value)){
    			var system = System.findOne({name: "currentQuestionIndex"});
    			var question = Questions.findOne({order: system.value});
    			var htmlId = "#answer" + question.righAnswerIndex;

    			$(htmlId).addClass("btn-success");
          Meteor.call("setTimerIsRunning", true);

    			Meteor.setTimeout(function () {
            $(htmlId).removeClass("btn-success");
    				Meteor.call("incrementQuestionIndex");
    				Meteor.call("resetUserAnswers");
            Meteor.call("setTimerIsRunning", true);
    			}, 10000);
    		}
  		}
	   });
    return query;
  }
});

Template.currentQuestion.helpers({
	question:function () {
		var system = System.findOne({name: "currentQuestionIndex"});
		var questionIndex = system.value;
		return Questions.findOne({order: questionIndex});
	}
});