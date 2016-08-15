Meteor.autorun(function(){
  Meteor.subscribe('userProfile');
  Meteor.subscribe('countryName')
});

