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
                key: 'createdAt',
                label: 'Created At',
                sortable: true 
            }, {
                key: 'name',
                label: 'Name',
                sortable: true 
            }
            ]
        }
    }
});