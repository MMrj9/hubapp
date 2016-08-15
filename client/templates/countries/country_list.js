Template.countrylist.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('country');  
  });
});


Template.countrylist.helpers({
    country: function() {
 		return Country;
    },
    listSettings: function() {
        return {
            rowsPerPage: 10,
            fields: [{
                key: '_id',
                label: 'Id',
                sortable: false 
            },
            {
                key: 'metadata.createdAt',
                label: 'Created At',
                sortable: true 
            }, {
                key: 'data.name',
                label: 'Name',
                sortable: true 
            }
            ]
        }
    }
});