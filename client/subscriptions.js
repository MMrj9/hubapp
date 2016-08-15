Meteor.autorun(function(){
  Meteor.subscribe('userProfile', Meteor.userId());
  Meteor.subscribe('countryName')
});

