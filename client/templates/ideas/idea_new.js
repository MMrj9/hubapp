Template.idea_new.created = function() {
    this.authenticated = new ReactiveVar(false);
    this.name = new ReactiveVar("");
    this.email = new ReactiveVar("");
}


Template.idea_new.helpers({
    'isAuthenticated': function(){
            return Template.instance().authenticated.get();
        }
});

Template.idea_new.events({
    'click #create': function(e, t) {

        e.preventDefault();

        var idea;
        if(Meteor.user()){
        idea = {data:{
            name: Meteor.user().data.fullName,
            email: Meteor.user().email.address,
            content: $('#content').val()
        }
        };
        }
        else{
        idea = {data:{
            name: Template.instance().name.get(),
            email: Template.instance().email.get(),
            content: $('#content').val()
        }
        };
        }

        if (!idea.data.content) {
            return swal({
                title: "Invalid Content",
                text: "Please try again",
                showConfirmButton: true,
                type: "error"
            });
        }

        Meteor.call('ideaInsert', idea, function(error, ideaId) {
            if (error) {
                throwError(error.reason);
            } else {
                return swal({
                    title: "Sucess",
                    text: "Idea created",
                    showConfirmButton: true,
                    type: "success"
                });
                FlowRouter.go('/idea');
            }
        });
    },
    
    'click #facebook-login': function(event) {
        event.preventDefault();
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
            //Enable idea submission
            Template.instance().authenticated.set(true);
            //Update last login 
            Meteor.users.update( { _id: Meteor.userId() }, {$set: {"metadata.lastLoginAt": new Date()}});
    },
    
    'click #google-login': function(event) {
        event.preventDefault();
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
            //Enable idea submission
            Template.instance().authenticated.set(true);
            //Update last login 
            Meteor.users.update( { _id: Meteor.userId() }, {$set: {"metadata.lastLoginAt": new Date()}});
    },

    'click #check-auth': function(event){
        var name = $('#name').val();
        var email = $('#email').val();

                // Trim Helper
        var trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        }

        var name = trimInput(name);
        if(name==''){
                return swal({
                    title: "Name is mandatory",
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
        }


        var email = trimInput(email);

        // Email Validation
        var isValidEmail = function validateEmail(email) {
            //Regex test for valid email
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(email)) {
                return true;
            } else {
                return swal({
                    title: "Invalid Email",
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
            }
        }

        if(isValidEmail(email)){
            Template.instance().name.set(name);
            Template.instance().email.set(email);
            Template.instance().authenticated.set(true);
        }

    }
});