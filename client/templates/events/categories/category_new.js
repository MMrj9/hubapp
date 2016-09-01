Template.category_new.onCreated(function() {

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
        self.subscribe('categoryName');
    });
});


Template.category_new.events({
    'click #create': function(e, t) {

        e.preventDefault();

        var category = {data:{
            name: $('#categoryname').val()
        }
        };

        if (!category.data.name) {
            return swal({
                title: "Invalid Name",
                text: "Please try again",
                showConfirmButton: true,
                type: "error"
            });
        }

        $("#categoryname").val(null);
        $("#categoryname").select();

        if (Category.find({
                "data.name": category.data.name
            }).count() > 0) {
            return swal({
                title: "Invalid Name",
                text: "A Category with that name already exists",
                showConfirmButton: true,
                type: "error"
            });
        }

        Meteor.call('categoryInsert', category, function(error, categoryId) {
            if (error) {
                throwError(error.reason);
            } else {
                return swal({
                    title: "Sucess",
                    text: "Category created",
                    showConfirmButton: true,
                    type: "success"
                });
            }
        });
    }
});