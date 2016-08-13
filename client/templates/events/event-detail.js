
Template.eventdetail.rendered = function() {
};


Template.eventdetail.helpers({
  event: function() {
    return Event.find({_id: FlowRouter.getParam("eventId")}).fetch()[0]
  }				
});