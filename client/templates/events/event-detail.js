Template.eventlist.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('singleEvent', FlowRouter.getParam("eventId"));  
  });
});


Template.eventdetail.helpers({
    event: function() {
        return Event.find({
            _id: FlowRouter.getParam("eventId")
        }).fetch()[0]
    }
});


Template.eventdetail.events({
    'click #more': function(e) {
        //Show all the text
        var h = $('#eventdescription')[0].scrollHeight;
        e.stopPropagation();
        $('#more').hide();
        $('#less').show();
        $('#eventdescription').animate({
            'height': h
        })
    },
    'click #less': function(e) {
        //Show less text
        $('#less').hide();
        $('#more').show();
        $('#eventdescription').animate({
            'height': '100px'
        })
    }
})