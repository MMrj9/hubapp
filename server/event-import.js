  function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
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

Facebook.prototype.getUserData = function() {
    return this.query('me');
}
Facebook.prototype.getPhotos = function() {
    return this.query('/me/photos?fields=picture');
}

Meteor.methods({
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getPhotos();
        return data;
     }
});

Meteor.methods({
    getPhotos: function() {   
    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var photos = fb.getPhotos;
    return photos;
}
}); 