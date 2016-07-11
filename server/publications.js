Meteor.publish('country', function(countryId) {
  check(countryId, String);
  return Country.find({_id: countryId});
});
