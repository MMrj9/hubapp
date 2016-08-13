Template.register.rendered=function() {
    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 100,
    min: new Date(1900,1,1),
    max: new Date(),
    format: 'yyyy-mm-dd',
    formatSubmit: 'yyyy-mm-dd',
    hiddenName: true
  }),
    this.autorun(function() 
        { 
            var optionsCursor = Country.find().count(); 
            if(optionsCursor > 0)
                { $('select').material_select(); } 
        }); 
};

Template.register.helpers({
    countries: function(){
        return Country.find({}, {sort: {name: 1}});
    },
});



Template.register.events({

    'click #register-button': function(e, t) {
        e.preventDefault();
        // Retrieve the input field values
        var email = $('#email').val(),
            firstName = $('#first-name').val(),
            lastName = $('#last-name').val(),
            password = $('#password').val(),
            passwordAgain = $('#password-again').val(),
            birthdate = $('#birthdate').val(),
            countryId = $( "#country-select" ).val(),
            city = $('#city').val(),
            gender;

            if($("#male").is(':checked')){
                gender = "male"
            }
            if($("#female").is(':checked')){
                gender = "female"
            }
            

        // Trim Helper
        var trimInput = function(val) 
        {
            return val.replace(/^\s*|\s*$/g, "");
        }
        var email = trimInput(email);

        // Email Validation
        var isValidEmail = function validateEmail(email) 
        {
            //Regex test for valid email
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(email)){
                return true;
            }
            else{
                return swal({
                    title: "Invalid Email",
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
            }
        }

        // Check password is at least 6 chars long
        var isValidPassword = function(pwd, pwd2) {
            if (pwd === pwd2) {
                return pwd.length >= 6 ? true : false;
            } else {
                return swal({
                    title: "Passwords don't match",
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
            }
        }


        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        if (isValidPassword(password, passwordAgain) && isValidEmail(email)) { 
            Accounts.createUser({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                birthdate: birthdate,
                creatorId: Meteor.userId(),
                countryId: countryId,
                city: city,
                gender: gender
            }, function(error) {
                if (error) {
                    return swal({
                    title: error.reason,
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
                } else {
                    FlowRouter.go('/');
                }
            });
        }

        return false;
    }
});
