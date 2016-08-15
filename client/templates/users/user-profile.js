Template.userProfile.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('userData', FlowRouter.getParam("userId"));  
  });
});

Template.userProfile.helpers({
  'user': function(){
    return Meteor.users.find({_id: FlowRouter.getParam("userId")}).fetch()[0];
  },
  'isMale': function(){
  	if(Meteor.user().data.gender=="male")
  		return true;
  	else
  		return false;
  },
  'isFemale': function(){
  	if(Meteor.user().data.gender=="female")
  		return true;
  	else 
  		return false;
  },
  'age': function(){
  	if(Meteor.user().data.birthDate){
	  var birthday = +new Date(Meteor.user().data.birthDate);
	  return ~~((Date.now() - birthday) / (31557600000));
	}
	else 
		return "?";

  }
});

Template.userProfile.helpers({

});

Template.userProfile.events({
'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
        FlowRouter.go('/login');
    }
});