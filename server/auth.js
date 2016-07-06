 Accounts.onCreateUser(function(options, user) {

      // Use provided profile in options, or create an empty profile object
    user.profile = options.profile || {};

    if(user.services.facebook){ //Facebook
      user.profile.firstName = user.services.facebook.first_name;
      user.profile.lastName = user.services.facebook.last_name;
      user.profile.pictureLink = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
      user.profile.gender = user.services.facebook.gender;

      user.createdBy = user._id;
      user.lastUpdatedBy = user._id;
    }
    else if(user.services.google){ //Google
      user.profile.firstName = user.services.google.given_name;
      user.profile.lastName = user.services.google.family_name;
      user.profile.pictureLink = user.services.google.picture;
      user.profile.gender = user.services.google.gender;

      user.createdBy = user._id;
      user.lastUpdatedBy = user._id;
    }
    else if(user.services.twitter){ //Twitter
      var name = user.profile.name;
      var splitname = name.split(" ");

      if(splitname.length>0){
      user.profile.firstName = splitname[0];
      }
      if(splitname.length>1){
      user.profile.lastName = splitname[1];
      }

      user.profile.pictureLink = user.services.twitter.profile_image_url;

      user.createdBy = user._id;
      user.lastUpdatedBy = user._id;    
    }
    else{ // Local
      user.profile.firstName = options.firstName;
      user.profile.lastName = options.lastName;
      user.profile.birthDate = new Date(options.birthdate);
      user.profile.gender = options.gender;
      
      user.createdBy = options.creatorId;
      user.lastUpdatedBy = options.creatorId;
    }



    user.createdAt = new Date();
    user.lastUpdatedAt = new Date();

    // Basic Prof Picture Setup
    //user.profile.profPicture = Meteor.absoluteUrl() + "img/default/user.jpg";
    // Organization
    user.profile.organization = ["Org"];
    //Basic Role Set Up
    user.roles = ["User"];

    // Returns the user object
    return user;
});

