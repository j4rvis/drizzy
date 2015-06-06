Template.game.helpers({
	question:function () {
		var system = System.findOne({name: "currentQuestionIndex"});

		System.find({name: "currentQuestionIndex"}).observeChanges({
        	changed: function () {
                console.log("changed");
                $(".result").hide();
        		$(".result").removeClass("rightAnswer");
        		$(".result").removeClass("wrongAnswer");
        		return Questions.findOne({order: system.value});
        	}
        });

      	var maxUserCount = Users.find({}).count();
      	var query = Users.find({});
      	query.observeChanges({
        	changed: function (id, user) {
        		var answeredUserCount = Users.find({answerIndex: {$gt: 0}}).count();
        		if(answeredUserCount == maxUserCount){
        			var user = Users.findOne({name: Session.get('user')});

        			if (userAnsweredRight(user.answerIndex, system.value)) {
                        $(".result").show().addClass("rightAnswer");
                    } else {
                        $(".result").show().addClass("wrongAnswer");
        			}
        		}
        	}
        });
        return Questions.findOne({order: system.value});
    }
});

Template.game.events({
	'click .answer_field': function(event){
		var userName = Session.get('user');
		var index = event.currentTarget.name;
        $(event.currentTarget).addClass('btn-info');
        $('.answer_field').attr( "disabled", "disabled" );;
    console.log(index);
    Meteor.call("updateUserAnswer", userName, index);
    return false;
	}
});

function userAnsweredRight (userAnswer, currentQuestionindex) {
	var question = Questions.findOne({order: currentQuestionindex});

	if (userAnswer == question.righAnswerIndex) {
		return true;
	}else{
		return false;
	}
}
