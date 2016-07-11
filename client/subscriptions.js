Meteor.autorun(function(){
  Meteor.subscribe('userData');
  Meteor.subscribe('country');
});
