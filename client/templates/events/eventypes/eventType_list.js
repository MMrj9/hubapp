Template.eventTypelist.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('eventType');  
  });
});


Template.eventTypelist.helpers({
    eventType: function() {
 		return EventType;
    },
    listSettings: function() {
        return {
            rowsPerPage: 10,
            fields: [{
                key: '_id',
                label: 'Id',                
                fn: function (value, object, key) {     
                    var pathDef = "/eventType/:eventTypeId";
                    var params = {eventTypeId: value};
                    var queryParams = {};

                    var path = FlowRouter.path(pathDef, params, queryParams);
                    return new Spacebars.SafeString("<a href="+path+">"+value+"</a>");
                 }, sortable: false 
            }
            ,
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