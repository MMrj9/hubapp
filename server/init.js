//file:/server/init.js
Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '../../../../../../../.uploads/tmp',
    uploadDir: process.env.PWD + '.././../../../../../.uploads/',
    checkCreateDirectories: true,
    validateRequest: function(req) {
    	//2MB max 
        if (req.headers["content-length"] > 2097152) {
            return "File is too long!";
        }
        return null; 
    }
})
});
