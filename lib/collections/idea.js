Idea = new Mongo.Collection('idea');

Meteor.methods({
    ideaInsert: function(ideaAttributes) {

        var user = Meteor.user();

        idea = _.extend(ideaAttributes, {
            metadata: {
                createdBy: user._id,
                createdAt: new Date()
            }
        });

        idea._id = Idea.insert(idea);

        Email.send({
            to: "miguelmorujao@gmail.com",
            from: "miguelmorujao@gmail.com",
            subject: "New idea from " + user.data.fullName,
            html: "<img src='"+user.data.pictureLink+"'</img><h4>" + user.data.fullName + "</h4><h4>" + user.email.address + "</h4><p>Ideia: " + idea.data.content + "</p>",
        });

        return idea._id;
    }
});