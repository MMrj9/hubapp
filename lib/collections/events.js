Event = new Mongo.Collection('event');

Meteor.methods({

  //Insert event
  eventInsert: function(eventAttributes) {
    
    /*
    check(eventAttributes, {
      name: String
    });*/
    var user = Meteor.user();

      event = _.extend(eventAttributes, { metadata:{
      createdBy: user._id,
      lastUpdatedBy: user._id,
      isActive: true,
      createdAt: new Date(),
      lastUpdatedAt: new Date()
    }
    });
    

    event._id = Event.insert(event);
    return event._id;
    
  },

  //Check if Event with external id x already exists
  hasEventWithExternalId: function(externalId){
  	if(Event.find({externalId: externalId}).count()>0)
  		return true;
  	else
  		return false;

  },

  eventList: function(){
    console.log(Event.find({ }).fetch());
    return Event.find({ }).fetch();
  } 



});