Category = new Mongo.Collection('category');

Meteor.methods({
  categoryInsert: function(categoryAttributes) {
        
    var user = Meteor.user();
    
    category = _.extend(categoryAttributes, {metadata:{
      createdBy: user._id,
      lastUpdatedBy: user._id,
      isActive: true,
      createdAt: new Date(),
      lastUpdatedAt: new Date()
    }
    });
    
    category._id = Category.insert(category);
    
    return category._id;
  },
  categoryDelete: function(id){
    if(Event.find({"data.categoryId": id}).count() > 0){
      throw new Meteor.Error("category-cannot-be-deleted", "You can't delete this Event Type");
    }
    else{
      Category.remove(id);
    }
      return id;
  }
});
