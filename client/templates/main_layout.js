Template.mainLayout.events({
'click .button-collapse': function(event){
    $('.button-collapse').sideNav();
},
});

Template.mainLayout.events({
'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
        FlowRouter.go('/backoffice');
    }
});