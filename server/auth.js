Accounts.onCreateUser(function(options, user) {

     // Use provided data in options, or create an empty data object
     user.data = options.data || {};
     user.metadata = {};

     if (user.services.facebook) { //Facebook
         user.email = {
             'address': user.services.facebook.email,
             'verified': true
         };
         user.data.firstName = user.services.facebook.first_name;
         user.data.lastName = user.services.facebook.last_name;
         user.data.pictureLink = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
         user.data.gender = user.services.facebook.gender;
     
         user.metadata.isActive = true;
         user.metadata.createdBy = user._id;
         user.metadata.lastUpdatedBy = user._id;
         user.metadata.authType = "Facebook";
     } else if (user.services.google) { //Google
         user.email = {
             'address': user.services.google.email,
             'verified': true
         };
         user.data.firstName = user.services.google.given_name;
         user.data.lastName = user.services.google.family_name;
         user.data.pictureLink = user.services.google.picture;
         user.data.gender = user.services.google.gender;

         user.metadata.isActive = true;
         user.metadata.createdBy = user._id;
         user.metadata.lastUpdatedBy = user._id;
         user.metadata.authType = "Google";
     } else if (user.services.twitter) { //Twitter
         user.email = {
             'address': user.services.twitter.email,
             'verified': true
         };
         user.email = user.services.twitter.email;
         var name = user.data.name;
         var splitname = name.split(" ");

         if (splitname.length > 0) {
             user.data.firstName = splitname[0];
         }
         if (splitname.length > 1) {
             user.data.lastName = splitname[1];
         }

         user.data.pictureLink = user.services.twitter.data_image_url;

         user.metadata.isActive = true;
         user.metadata.createdBy = user._id;
         user.metadata.lastUpdatedBy = user._id;
         user.metadata.authType = "Twitter";
     } else { // Local
         user.email = {
             'address': options.email,
             'verified': false
         };
         user.data.firstName = options.firstName;
         user.data.lastName = options.lastName;
         user.data.birthDate = new Date(options.birthdate);
         user.data.countryId = options.countryId;
         user.data.city = options.city;
         user.data.gender = options.gender;
         user.data.photoPath = "";
         
         user.metadata.isActive = true;

         if (options.creatorId != null) {
             user.metadata.createdBy = options.creatorId;
             user.metadata.lastUpdatedBy = options.creatorId;
         } else {
             user.metadata.createdBy = user._id;
             user.metadata.lastUpdatedBy = user._id;
         }

         user.metadata.isActive = false;
         user.metadata.authType = "Local";
     }

     //Concat first + last name to create full name
     user.data.fullName = user.data.firstName + " " + user.data.lastName;

     user.metadata.lastLoginAt = new Date();
     user.metadata.createdAt = new Date();
     user.metadata.lastUpdatedAt = new Date();

     // Basic Prof Picture Setup
     //user.data.profPicture = Meteor.absoluteUrl() + "img/default/user.jpg";
     // Organization
     user.data.organization = ["Org"];
     //Basic Role Set Up
     user.roles = ["User"];

     // Returns the user object
     return user;
 });


 Meteor.users.allow({
    update: function (userId, doc) {
        return true;
    }
});