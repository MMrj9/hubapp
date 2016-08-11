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

Facebook.prototype.importEventFromFacebook = function(id) {
    return this.query(id);
}

Meteor.methods({
    //mudar o nome da função
    importEventFromFacebook: function(id) {

        //Falta fazer com que utiliadores não logados com facebook consigam usar4
        var fb,data; 

        Meteor.call("getAccessToken", function(error, result) {
          fb= new Facebook(result);
          data = fb.importEventFromFacebook(id);
        })

        var event = {
            name: data.name,
            description: data.description,
            start: data.start_time,
            end: data.end_time,
            place: data.place.name,
            city: data.place.location.city,
            externalId: data.id
        };

        Meteor.call('eventInsert', event, function(error, eventId) {
              if (error){
               // throwError(error.reason);
               console.log(error);
              } else {
                return eventId;    
              }
            });

        return data;
     },
   
    //Check if facebook event exists
    isValidFacebookEvent: function(id) {

          var fb,data; 

          Meteor.call("getAccessToken", function(error, result) {
          if(result){
            fb = new Facebook(result);
            data = fb.importEventFromFacebook(id);
          }else{
            console.log("Couldn't get event data")
          }
          });

          //Check if request result is error
         if(data.hasOwnProperty('error'))
          return false;
         else
          return true;
     }     



});
