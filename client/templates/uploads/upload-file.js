Template.s3_tester.events({
    "click button.upload": function(){
        var files = $("input.file_bag")[0].files

        S3.upload({
                files:files,
                path:"uploads"
            },function(e,r){
                //change the path of the user profile image
                Meteor.users.update( { _id: Meteor.userId() }, {$set: {"profile.photoPath": r.url}});
        });
    }
})

Template.s3_tester.helpers({
    "files": function(){
        return S3.collection.find();
    }
})