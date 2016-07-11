Meteor.publish('country', function() {
  return Country.find({ });
});
