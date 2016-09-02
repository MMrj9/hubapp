Template.categorydetail.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('singleCategory', FlowRouter.getParam("categoryId"));
        var category = Category.find({
            _id: FlowRouter.getParam("categoryId")
        }).fetch()[0];
        if(category){
        if(category.data.parentId){
        self.subscribe('singleCategory', category.data.parentId);
        }
        else{
        self.subscribe('subCategories', category._id);
        }
        }


    });
});

Template.categorydetail.helpers({
    'category': function() {
        return Category.find({
            _id: FlowRouter.getParam("categoryId")
        }).fetch()[0];
    },
    'subCategories': function(id) {
        return Category.find({"data.parentId": id}).fetch();
    },
    'getParent': function(parentId) {
        return Category.find({
            _id: parentId
        }).fetch()[0];

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
    },
    'click #addSubCategory': function(e) {

        e.preventDefault();

        var category = {
            data: {
                name: $('#subcategoryname').val(),
                parentId: FlowRouter.getParam("categoryId")
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

        $("#subcategoryname").val(null);
        $("#subcategoryname").select();

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