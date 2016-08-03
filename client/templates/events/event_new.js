Template.fbgraph.events({
    'click #btn-user-data': function(e) {
        Meteor.call('getUserData', function(err, data) {
            $('#result').text(JSON.stringify(data, undefined, 4));            
         });
    }
});

var fbPhotos = [];

Template.fbgraph.events({
    fbPhotos : function(e) {
        Meteor.call('getUserData', function(err, data) {
            $('input[name=fbPhotos]').text(EJSON.stringify(data, undefined, 4));            
         });
    }
});

Template.facebookphoto.helpers({ 
  pictures: fbPhotos
});