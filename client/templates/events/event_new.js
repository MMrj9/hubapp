Template.eventnew.rendered = function() {
    //Check if user is logged in
    if (Meteor.userId() == null) {
        FlowRouter.go('/login');
        return swal({
            title: "User must be logged in",
            text: "Please login before trying to createa an event",
            showConfirmButton: true,
            type: "warning"
        });
    }
};

Template.eventnew.events({
    'click #btn-event-data': function(e) {

        //Get and Trim the URL
        var url = $('#eventurl').val().trim();

        //Check if user is logged in
        if (Meteor.userId() != null) {
            //Check if valid facebook URL
            if (url.indexOf("https://www.facebook.com/events/") == -1) {
                return swal({
                    title: "Invalid Url",
                    text: "The Url should be something like: https://www.facebook.com/events/{Id}",
                    showConfirmButton: true,
                    type: "error"
                });
            } else {

                //Remove the https://www.facebook.com/events/
                var id = url.substring(32, url.lenght);
                var aux = id.indexOf('/');

                //Remove everything after the id (if it exists)
                if (aux > -1)
                    id = id.substring(0, aux);

                //Check if facebook event was already imported
                Meteor.call('hasEventWithExternalId', id, function(error, result) {
                    if (result) {
                        return swal({
                            title: "Event already imported from Facebook",
                            text: "That facebook event was already imported to this application",
                            showConfirmButton: true,
                            type: "error"
                        });
                    } else {
                        //Check if it is a valid facebook event
                        Meteor.call('isValidFacebookEvent', id, function(error, result) {
                            if (!result) {
                                return swal({
                                    title: "Invalid Facebook event",
                                    text: "That's not a valid facebook event",
                                    showConfirmButton: true,
                                    type: "error"
                                });
                            } else {
                                Meteor.call('importEventFromFacebook', id, function(error, result) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        return swal({
                                            title: "Event sucessfully imported",
                                            showConfirmButton: true,
                                            type: "success"
                                        });
                                    }
                                });
                            }
                        });
                    }

                });
            }
        } else {
            FlowRouter.go('/login');
            return swal({
                title: "User must be logged in",
                text: "Please login before trying to createa an event",
                showConfirmButton: true,
                type: "warning"
            });
        }
    }
});