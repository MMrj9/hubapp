Template.categorylist.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('category');  
  });
});


Template.categorylist.helpers({
    category: function() {
 		return Category;
    },
    listSettings: function() {
        return {
            rowsPerPage: 10,
            class: 'highlight',
            fields: [{
                key: '_id',
                label: 'Id',                
                fn: function (value, object, key) {     
                    var pathDef = "/category/:categoryId";
                    var params = {categoryId: value};
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
            }, {
                key: 'data.parentId',
                label: 'Parent',                
                fn: function (value, object, key) {  
                    if(value){   
                    var pathDef = "/category/:categoryId";
                    var params = {categoryId: value};
                    var queryParams = {};
                    value = Category.find({_id: value}).fetch()[0].data.name;
                    var path = FlowRouter.path(pathDef, params, queryParams);
                    return new Spacebars.SafeString("<a href="+path+">"+value+"</a>");
                    }
                    else 
                        return "";
                 }, 
                sortable: true 
            }
            ]
        }
    }
});