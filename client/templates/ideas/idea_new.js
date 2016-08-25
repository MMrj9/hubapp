Template.idea_new.events({
    'click #create': function(e, t) {

        e.preventDefault();

        var idea = {data:{
            content: $('#content').val()
        }
        };

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
            }
        });
    }
});