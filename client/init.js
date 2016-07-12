Meteor.startup(function() {
  Uploader.finished = function(index, fileInfo, templateContext) {
  	console.log(fileInfo.path);
  	Meteor.users.update( { _id: Meteor.userId() }, {$set: {"profile.photoPath": fileInfo.path}});
  }
})