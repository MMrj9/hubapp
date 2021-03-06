if (Meteor.isServer) {

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
                "data": 1,
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
                "data": 1,
                // Created data property
                "metadata": 1,
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
                "data": 1,
                // Created data property
                "metadata": 1,
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

Meteor.publish('singleCountry', function(id) {
  return Country.find({_id: id});
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

//Categories

Meteor.publish('category', function() {
  return Category.find({ });
});

Meteor.publish('categoryName', function() {
  return Category.find({ },{fields: {"data": 1}});
});

Meteor.publish('singleCategory', function(id) {
  return Category.find({_id: id});
});

Meteor.publish('subCategories', function(id) {
  return Category.find({"data.parentId": id},{fields: {"data": 1}});
});


//Ideas
  Meteor.publish('ideaCounter', function () {
    Counts.publish(this, 'total-ideas', Idea.find());
  });

  Meteor.publish('ideas', function(email) {
    return Idea.find({ },{fields: {"data": 1}});
});


}