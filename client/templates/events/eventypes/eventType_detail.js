Template.eventTypedetail.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('singleEventType', FlowRouter.getParam("eventTypeId"));
    });
});

Template.eventTypedetail.helpers({
    eventType: function() {
        return EventType.find({
            _id: FlowRouter.getParam("eventTypeId")
        }).fetch()[0]
    }
});

Template.eventTypedetail.events({
    'click #delete-eventType': function(e) {
        return swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function() {
            Meteor.call("eventTypeDelete", FlowRouter.getParam("eventTypeId"), function(error, result) {
                if (error)
                    return swal("Error", error.reason, "error");
                else {
                    FlowRouter.go("/eventType_list");
                    return swal("Deleted!", "eventType has been deleted.", "success");
                }
            })
        });

    }

});