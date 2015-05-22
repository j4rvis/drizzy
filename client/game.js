Template.game.helpers({
	question:function () {
		return Questions.findOne({});
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