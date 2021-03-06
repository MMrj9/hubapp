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
            class: 'highlight',
            fields: [{
                key: '_id',
                label: 'Id',                
                fn: function (value, object, key) {     
                    var pathDef = "/country/:countryId";
                    var params = {countryId: value};
                    var queryParams = {};

                    var path = FlowRouter.path(pathDef, params, queryParams);
                    return new Spacebars.SafeString("<a href="+path+">"+value+"</a>");
                 }, sortable: false 
            }
            ,
            {
                key: 'metadata.createdAt',
                label: 'Created At',
                fn: function (value) { return moment(value).format('MM-DD-YYYY HH:mm');}, 
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