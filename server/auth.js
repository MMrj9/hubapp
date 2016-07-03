

//Facebook

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1712781068995608',
    secret: '3e7b218a58ec9d4261548831cc2549ae'
});

//Google

ServiceConfiguration.configurations.remove({
  service: "google"
});

ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "939265270988-panpl23h0q0q9hlfmhu1agc8csjq49sf.apps.googleusercontent.com",
  secret: "M-pAImuzOKwKi_qoUqD-KGGY"
});

//Twitter

ServiceConfiguration.configurations.remove({
  service: "twitter"
});

ServiceConfiguration.configurations.insert({
  service: "twitter",
  consumerKey: "xOXHdJKPPrBf8I5HABgINfP6Z",
  secret: "7IYk7TcC0FmTfcEkJY9MeyIoIEe7DqSlkBLIy2rCHdkr2nukR5"
});



 Accounts.onCreateUser(function(options, user) {
    // Use provided profile in options, or create an empty profile object
    user.profile = options.profile || {};

    // Assigns the first and last names to the newly created user object
    user.profile.firstName = options.firstName;
    user.profile.lastName = options.lastName;

    // Basic Prof Picture Setup
    user.profile.profPicture = Meteor.absoluteUrl() + "img/default/user.jpg";
    // Organization
    user.profile.organization = ["Org"];
    //Basic Role Set Up
    user.roles = ["User"];

    // Returns the user object
    return user;
});
