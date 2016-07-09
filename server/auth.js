 Accounts.onCreateUser(function(options, user) {

     // Use provided profile in options, or create an empty profile object
     user.profile = options.profile || {};
     user.data = {};

     if (user.services.facebook) { //Facebook
         user.emails = [{
             'adress': user.services.facebook.email,
             'verified': true
         }];
         user.profile.firstName = user.services.facebook.first_name;
         user.profile.lastName = user.services.facebook.last_name;
         user.profile.pictureLink = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
         user.profile.gender = user.services.facebook.gender;
     
         user.data.isActive = true;
         user.data.createdBy = user._id;
         user.data.lastUpdatedBy = user._id;
     } else if (user.services.google) { //Google
         user.emails = [{
             'adress': user.services.google.email,
             'verified': true
         }];
         user.profile.firstName = user.services.google.given_name;
         user.profile.lastName = user.services.google.family_name;
         user.profile.pictureLink = user.services.google.picture;
         user.profile.gender = user.services.google.gender;

         user.data.isActive = true;
         user.data.createdBy = user._id;
         user.data.lastUpdatedBy = user._id;
     } else if (user.services.twitter) { //Twitter
         user.emails = [{
             'adress': user.services.twitter.email,
             'verified': true
         }];
         user.email = user.services.twitter.email;
         var name = user.profile.name;
         var splitname = name.split(" ");

         if (splitname.length > 0) {
             user.profile.firstName = splitname[0];
         }
         if (splitname.length > 1) {
             user.profile.lastName = splitname[1];
         }

         user.profile.pictureLink = user.services.twitter.profile_image_url;

         user.data.isActive = true;
         user.data.createdBy = user._id;
         user.data.lastUpdatedBy = user._id;
     } else { // Local
         user.profile.firstName = options.firstName;
         user.profile.lastName = options.lastName;
         user.profile.birthDate = new Date(options.birthdate);
         user.profile.gender = options.gender;

         if (options.creatorId != null) {
             user.data.createdBy = options.creatorId;
             user.data.lastUpdatedBy = options.creatorId;
         } else {
             user.data.createdBy = user._id;
             user.data.lastUpdatedBy = user._id;
         }

         user.data.isActive = false;
     }

     user.data.createdAt = new Date();
     user.data.lastUpdatedAt = new Date();

     // Basic Prof Picture Setup
     //user.profile.profPicture = Meteor.absoluteUrl() + "img/default/user.jpg";
     // Organization
     user.profile.organization = ["Org"];
     //Basic Role Set Up
     user.roles = ["User"];

     // Returns the user object
     return user;
 });