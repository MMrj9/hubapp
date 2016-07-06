 Accounts.onCreateUser(function(options, user) {

      // Use provided profile in options, or create an empty profile object
    user.profile = options.profile || {};

    if(user.services.facebook){
      user.profile.firstName = user.services.facebook.first_name;
      user.profile.lastName = user.services.facebook.last_name;
      user.profile.pictureLink = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    }
    else if(user.services.google){
      user.profile.firstName = user.services.google.given_name;
      user.profile.lastName = user.services.google.family_name;
      user.profile.pictureLink = user.services.google.picture;
    }
    else if(user.services.twitter){
      var name = user.profile.name;
      var splitname = name.split(" ");

      if(splitname.length>0){
      user.profile.firstName = splitname[0];
      }
      if(splitname.length>1){
      user.profile.lastName = splitname[1];
      }

      user.profile.pictureLink = user.services.twitter.profile_image_url;
    
    }
    else{
      // Assigns the first and last names to the newly created user object
      user.profile.firstName = options.firstName;
      user.profile.lastName = options.lastName;
    }


    // Basic Prof Picture Setup
    //user.profile.profPicture = Meteor.absoluteUrl() + "img/default/user.jpg";
    // Organization
    user.profile.organization = ["Org"];
    //Basic Role Set Up
    user.roles = ["User"];

    // Returns the user object
    return user;
});

