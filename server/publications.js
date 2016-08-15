/**
Não esquecer de apenas publicar certos campos
*/

//Users

Meteor.publish('userProfile', function() {
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
            }
        });
    } else {
        return this.ready();
    }
});

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
                "data": 1,
                // Created roles property
                "roles": 1

            }
        });
    } else {
        return this.ready();
    }
});

//Countries

Meteor.publish('country', function() {
  return Country.find({ });
});

Meteor.publish('countryName', function() {
  return Country.find({ },{fields: {"data": 1}});
});

//Events

Meteor.publish('event', function() {
  return Event.find({ });
});

Meteor.publish('eventOnlyData', function() {
  return Event.find({ },{fields: {data:1}});
});

Meteor.publish('singleEvent', function(id) {
  return Event.find(id);
});
