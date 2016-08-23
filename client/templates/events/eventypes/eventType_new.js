Template.eventType_new.onCreated(function() {

    //Check if user is logged in
    if (Meteor.userId() == null) {
        FlowRouter.go('/login');
        return swal({
            title: "User must be logged in",
            text: "Please login before trying to create an event",
            showConfirmButton: true,
            type: "warning"
        });
    }

    var self = this;
    self.autorun(function() {
        self.subscribe('eventTypeName');
    });
});


Template.eventType_new.events({
    'click #create': function(e, t) {

        e.preventDefault();

        var eventType = {data:{
            name: $('#eventTypename').val()
        }
        };

        if (!eventType.data.name) {
            return swal({
                title: "Invalid Name",
                text: "Please try again",
                showConfirmButton: true,
                type: "error"
            });
        }

        $("#eventTypename").val(null);
        $("#eventTypename").select();

        console.log(EventType.find({
                "data.name": eventType.data.name
            }).count());

        if (EventType.find({
                "data.name": eventType.data.name
            }).count() > 0) {
            return swal({
                title: "Invalid Name",
                text: "An Event Type with that name already exists",
                showConfirmButton: true,
                type: "error"
            });
        }

        Meteor.call('eventTypeInsert', eventType, function(error, eventTypeId) {
            if (error) {
                throwError(error.reason);
            } else {
                return swal({
                    title: "Sucess",
                    text: "Event Type created",
                    showConfirmButton: true,
                    type: "success"
                });
            }
        });
    }
});