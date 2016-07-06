// Publishing third party oauth service specifically to client
Meteor.publish('userData', function() {
    var currentUser;
    currentUser = this.userId;
    if (currentUser) {
        return Meteor.users.find({
            _id: currentUser
        }, {
            fields: {
                // Default
                "emails": 1,
                // Created profile property
                "profile": 1,
                // Created roles property
                "roles": 1,
                "createdAt": 1,
                "createdBy": 1,
                "lastUpdatedAt": 1,
                "lastUpdatedBy": 1
            }
        });
    } else {
        return this.ready();
    }
});