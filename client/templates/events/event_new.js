Template.eventnew.events({
    'click #btn-event-data': function(e) {
        Meteor.call('getEventData', function(err, data) {
            $('#result').text(JSON.stringify(data, undefined, 4));            
         });
    }
});

var fbPhotos = [];

Template.fbgraph.events({
    fbPhotos : function(e) {
        Meteor.call('getEventData', function(err, data) {
            $('input[name=fbPhotos]').text(EJSON.stringify(data, undefined, 4));            
         });
    }
});

Template.facebookphoto.helpers({ 
  pictures: fbPhotos
});