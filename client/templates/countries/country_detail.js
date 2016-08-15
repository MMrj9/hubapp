Template.countrydetail.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('singleCountry', FlowRouter.getParam("countryId"));  
  });
});


Template.countrydetail.helpers({
    country: function() {
        return Country.find({
            _id: FlowRouter.getParam("countryId")
        }).fetch()[0]
    }
});
