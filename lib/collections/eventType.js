EventType = new Mongo.Collection('eventType');

Meteor.methods({
  eventTypeInsert: function(eventTypeAttributes) {
        
    var user = Meteor.user();
    
    eventType = _.extend(eventTypeAttributes, {metadata:{
      createdBy: user._id,
      lastUpdatedBy: user._id,
      isActive: true,
      createdAt: new Date(),
      lastUpdatedAt: new Date()
    }
    });
    
    eventType._id = EventType.insert(eventType);
    
    return eventType._id;
  },
  eventTypeDelete: function(id){
    if(Event.find({"data.eventTypeId": id}).count() > 0){
      throw new Meteor.Error("eventType-cannot-be-deleted", "You can't delete this Event Type");
    }
    else{
      EventType.remove(id);
    }
      return id;
  }
});
