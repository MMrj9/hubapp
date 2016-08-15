Template.backofficemain.events({
'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
        FlowRouter.go('/backoffice');
    }
});