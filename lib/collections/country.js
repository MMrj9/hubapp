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
    if(Meteor.users.find({"data.countryId": id}).count() > 0){
      throw new Meteor.Error("country-cannot-be-deleted", "You can't delete this country");
    }
    else{
      Country.remove(id);
    }
      return id;
  },
  numberOfUsersFromCountry: function(id){
    return Meteor.users.find({"data.countryId": id}).count();
  }
});
