Template.eventlist.helpers({
    event: function() {
 		return Event;
    },
    listSettings: function() {
        return {
            rowsPerPage: 10,
            fields: [{
                key: '_id',
                label: 'Id',
                fn: function (value, object, key) {     
                    var pathDef = "/events/:eventId";
                    var params = {eventId: value};
                    var queryParams = {};

                    var path = FlowRouter.path(pathDef, params, queryParams);
                    return new Spacebars.SafeString("<a href="+path+">"+value+"</a>");
                 }, sortable: false 
            },
            {
                key: 'createdAt',
                label: 'Created At',
                sortable: true 
            }, {
                key: 'name',
                label: 'Name',
                sortable: true 
            },
            {
                key: 'start',
                label: 'When',
                sortable: true 
            },
            {
                key: 'place',
                label: 'Where'
            }]
        }
    }
});