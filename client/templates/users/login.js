
Template.login.events({
    'click #login-button': function(e, t) {
        e.preventDefault();
        var email = $('#login-email').val(),
            password = $('#login-password').val();

        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                return swal({
                    title: "Email or password Incorect",
                    text: "Please try again or create an account",
                    timer: 1700,
                    showConfirmButton: false,
                    type: "error"
                });
            } else {
                //Update last login 
                Meteor.users.update( { _id: Meteor.userId() }, {$set: {"data.lastLoginAt": new Date()}});
                FlowRouter.go('/');
            }
        });
        return false;
    },

    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                return swal({
                    title: "Facebook Login Failed",
                    timer: 1700,
                    showConfirmButton: false,
                    type: "error"
                });
                throw new Meteor.Error("Facebook login failed");
            }
        });
            //Update last login 
            Meteor.users.update( { _id: Meteor.userId() }, {$set: {"data.lastLoginAt": new Date()}});
            FlowRouter.go('/');
    },
    
    'click #google-login': function(event) {
        Meteor.loginWithGoogle({}, function(err){
            if (err) {
                return swal({
                    title: "Google Login Failed",
                    timer: 1700,
                    showConfirmButton: false,
                    type: "error"
                });                
                throw new Meteor.Error("Google login failed");
            }
        });
            //Update last login 
            Meteor.users.update( { _id: Meteor.userId() }, {$set: {"data.lastLoginAt": new Date()}});
            FlowRouter.go('/');

    },
    
    'click #twitter-login': function(event) {
        Meteor.loginWithTwitter({}, function(err){
            if (err) {
                return swal({
                    title: "Twitter Login Failed",
                    timer: 1700,
                    showConfirmButton: false,
                    type: "error"
                });
                throw new Meteor.Error("Twitter login failed");
            }
        });
            //Update last login 
            Meteor.users.update( { _id: Meteor.userId() }, {$set: {"data.lastLoginAt": new Date()}});
            FlowRouter.go('/');
            
    }
});
