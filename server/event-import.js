function Facebook(accessToken) {
    this.fb = require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
       });
   });
   return data.result;
}

Facebook.prototype.getEventData = function(id) {
    return this.query(id);
}

Facebook.prototype.getFriendsData = function() {
    return this.query('/me/friends');
}

Meteor.methods({
    //mudar o nome da função
    getEventData: function(id) {

        //Falta fazer com que utiliadores não logados com facebook consigam usar
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getEventData(id);

        console.log(data.name);

        var event = {
            name: data.name,
            description: data.description,
            start: data.start_time,
            end: data.end_time,
            place: data.place.name,
            city: data.place.location.city,
            externalId: data.id
        };

        Meteor.call('tempEventInsert', event, function(error, eventId) {
              if (error){
               // throwError(error.reason);
               console.log(error.reason + " error");
              } else {
                return eventId;    
              }
            });

        return data;
     }
});

Meteor.methods({
    getPhotos: function() {   
    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var photos = fb.getPhotos;
    return photos;
}}); 