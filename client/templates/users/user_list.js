Template.userlist.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('userAll');  
  });
});


Template.userlist.helpers({
    users: function() {
 		return Meteor.users;
    },
    listSettings: function() {
        return {
            rowsPerPage: 10,
            fields: [{
                key: '_id',
                label: 'Id',
                fn: function (value, object, key) {     
                    var pathDef = "/user/:userId";
                    var params = {userId: value};
                    var queryParams = {};

                    var path = FlowRouter.path(pathDef, params, queryParams);
                    return new Spacebars.SafeString("<a href="+path+">"+value+"</a>");
                 }, sortable: false 
            },
            {
                key: 'data.createdAt',
                label: 'Created At',
                sortable: true 
            },
            {
                key: 'email.address',
                label: 'Email',
                sortable: true 
            }, {
                key: 'profile.name',
                label: 'Name',
                sortable: true 
            }

    ]
}}
});