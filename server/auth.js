

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
        if (user.services) {
            
            var service = _.keys(user.services)[0];
            var email = user.services[service].email;
 
            console.log(email);

 
            if (!email)
                return user;
 
            // see if any existing user has this email address, otherwise create new
            var existingUser = Meteor.users.findOne({'emails.address': email});
            
            
            if (!existingUser)
                return user;

            console.log(existingUser._id);
            console.log("he");

 
            // precaution, these will exist from accounts-password if used
            if (!existingUser.services)
                existingUser.services = { resume: { loginTokens: [] }};
            if (!existingUser.services.resume)
                existingUser.services.resume = { loginTokens: [] };
 
            // copy across new service info
            existingUser.services[service] = user.services[service];
            existingUser.services.resume.loginTokens.push(
                user.services.resume.loginTokens[0]
            );
 
            // even worse hackery
            Meteor.users.remove({_id: existingUser._id}); // remove existing record
            return existingUser;                          // record is re-inserted
        }
    });
 
