Template.categorydetail.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('singleCategory', FlowRouter.getParam("categoryId"));
    });
});

Template.categorydetail.helpers({
    category: function() {
        return Category.find({
            _id: FlowRouter.getParam("categoryId")
        }).fetch()[0]
    }
});

Template.categorydetail.events({
    'click #delete-category': function(e) {
        return swal({
            title: "Are you sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function() {
            Meteor.call("categoryDelete", FlowRouter.getParam("categoryId"), function(error, result) {
                if (error)
                    return swal("Error", error.reason, "error");
                else {
                    FlowRouter.go("/category_list");
                    return swal("Deleted!", "category has been deleted.", "success");
                }
            })
        });

    }

});