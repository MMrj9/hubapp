Template.userProfile.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('userData', FlowRouter.getParam("userId"));  
  });
});


Template.userProfile.rendered = function() {
    //Maneira estúpida de dar a volta á situação
        this.autorun(function() {
            var optionsCursor = Country.find().count();
            if (optionsCursor > 0) {
                $('select').material_select();
            }
        });
      };




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
  	if(Meteor.user().data.birthDate)
    {
	   var birthday = +new Date(Meteor.user().data.birthDate);
     console.log(~~((Date.now() - birthday) / (31557600000)));
	   return ~~((Date.now() - birthday) / (31557600000));
   }
	  else 
		  return false;
  },
  'rolesList': function(){
    return ["User", "Admin", "InternalCollaborator", "ExternalCollaborator"]
  } 

});

Template.userProfile.events({
  'change #role-select': function (event, template) {
        var role = $(event.currentTarget).val();
        Roles.removeUsersFromRoles( Meteor.userId(), Meteor.user().roles);
    Roles.addUsersToRoles( Meteor.userId(), [ role ]);
    }
})