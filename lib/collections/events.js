Event = new Mongo.Collection('event');

Meteor.methods({
  tempEventInsert: function(eventAttributes) {
    
    /*
    check(eventAttributes, {
      name: String
    });*/
    
    var user = Meteor.user();

    console.log("xD");

    event = _.extend(eventAttributes, {
      createdBy: user._id,
      lastUpdatedBy: user._id,
      isActive: true,
      createdAt: new Date(),
      lastUpdatedAt: new Date()
    });
    
    event._id = Event.insert(event);
    
    return event._id;
  }
});