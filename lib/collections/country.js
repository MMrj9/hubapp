Country = new Mongo.Collection('country');

Meteor.methods({
  countryInsert: function(countryAttributes) {
        
    var user = Meteor.user();
    
    country = _.extend(countryAttributes, {metadata:{
      createdBy: user._id,
      lastUpdatedBy: user._id,
      isActive: true,
      createdAt: new Date(),
      lastUpdatedAt: new Date()
    }
    });
    
    country._id = Country.insert(country);
    
    return country._id;
  },
  countryDelete: function(id){
    if(Meteor.users.find({countryId: id}).count() > 0){
      console.log("There are users related to this country.")
    }
    else{
      Country.remove(id);
    }
      return id;
  }
});
