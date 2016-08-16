Template.countrydetail.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('singleCountry', FlowRouter.getParam("countryId"));
    });
    self.nUsers = new ReactiveVar("Waiting for response from server...");
    Meteor.call("numberOfUsersFromCountry", FlowRouter.getParam("countryId"), function(error, result) {
        if (error)
            console.log(error);
        else
            self.nUsers.set(result);
    });
});

Template.countrydetail.helpers({
    country: function() {
        return Country.find({
            _id: FlowRouter.getParam("countryId")
        }).fetch()[0]
    },
    nUsers: function() {
        return Template.instance().nUsers.get();
    }
});

Template.countrydetail.events({
    'click #delete-country': function(event) {
        return swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function() {
            Meteor.call("countryDelete", FlowRouter.getParam("countryId"), function(error, result) {
                if (error)
                    return swal("Error", error.reason, "error");
                else {
                    FlowRouter.go("/country_list");
                    return swal("Deleted!", "Country has been deleted.", "success");
                }
            })
        });

    }

});