/**
Não esquecer de apenas publicar certos campos
*/

//Users

Meteor.publish('userProfile', function(id) {
        return Meteor.users.find({
            _id: id
        }, {
            fields: {
                // Default
                "email": 1,
                // Created profile property
                "profile": 1,
            }
        });
    });

Meteor.publish('userData', function(id) {
        return Meteor.users.find({
            _id: id
        }, {
            fields: {
                // Default
                "email": 1,
                // Created profile property
                "profile": 1,
                // Created data property
                "data": 1,
                // Created roles property
                "roles": 1
            }
        });
});

Meteor.publish('userAll', function() {
        return Meteor.users.find({ }, {
            fields: {
                // Default
                "email": 1,
                // Created profile property
                "profile": 1,
                // Created data property
                "data": 1,
                // Created roles property
                "roles": 1
            }
        });
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
