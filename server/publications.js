
//Countries

Meteor.publish('country', function() {
  return Country.find({ });
});

//Events

Meteor.publish('event', function() {
  return Event.find({ });
});


//Single Event

Meteor.publish('singleEvent', function(id) {
  check(id, String);
  return Event.find(id);
});
