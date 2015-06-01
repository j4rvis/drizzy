Template.game.helpers({
	question:function () {
		var system = System.findOne({name: "currentQuestionIndex"});

		var systemChanged = System.find({}).observeChanges({
			changed: function () {
				$("body").removeClass("rightAnswer");
				$("body").removeClass("wrongAnswer");
				return Questions.findOne({order: system.value});
			}
		});

  		var maxUserCount = Users.find({}).count();
  		var query = Users.find({});	
  		var handle = query.observeChanges({
  		changed: function (id, user) {
    		var answeredUserCount = Users.find({answerIndex: {$gt: 0}}).count();
    		if(answeredUserCount == maxUserCount){
    			var user = Users.findOne({name: Session.get('user')});

    			if(userAnsweredRight(user.answerIndex, system.value)){
    				console.log("richtig geantwortet");
    				$("body").addClass("rightAnswer");
    			}else{
    				console.log("falsch geantwortet");
    				$("body").addClass("wrongAnswer");
    			}
    		}
  		}});
		return Questions.findOne({order: system.value});
	}
});

Template.game.events({
	'click button': function(event){
		var userName = Session.get('user');
		var index = event.currentTarget.name;
	    Meteor.call("updateUserAnswer", userName, index);
	    return false;
  	}
});

function userAnsweredRight (userAnswer, currentQuestionindex) {
	console.log("Useranswer: " + userAnswer);
	
	var question = Questions.findOne({order: currentQuestionindex});
	console.log("RightAnswer: " + question.righAnswerIndex);

	if (userAnswer == question.righAnswerIndex) {
		return true;
	}else{
		return false;
	}
}