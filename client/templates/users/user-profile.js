Template.userProfile.helpers({
  'isMale': function(){
  	if(Meteor.user().profile.gender=="male")
  		return true;
  	else
  		return false;
  },
  'isFemale': function(){
  	if(Meteor.user().profile.gender=="female")
  		return true;
  	else 
  		return false;
  },
  'age': function(){
  	if(Meteor.user().profile.birthDate){
	  var birthday = +new Date(Meteor.user().profile.birthDate);
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