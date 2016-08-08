Country = new Mongo.Collection('event');

Meteor.methods({
  tempEventInsert: function(eventAttributes) {
    
    check(eventAttributes, {
      name: String
    });
    
    var user = Meteor.user();


    
    event = _.extend(eventAttributes, {
      createdBy: user._id,
      lastUpdatedBy: user._id,
      isActive: true,
      createdAt: new Date(),
      lastUpdatedAt: new Date()
    });
    
    event._id = event.insert(event);
    
    return event._id;
  }
});