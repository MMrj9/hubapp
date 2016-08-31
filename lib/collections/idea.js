Idea = new Mongo.Collection('idea');

Meteor.methods({
    ideaInsert: function(ideaAttributes) {


        var user = Meteor.user();
        if (user) {
            idea = _.extend(ideaAttributes, {
                metadata: {
                    createdBy: user._id,
                    createdAt: new Date()
                }
            });
        } else {
            idea = _.extend(ideaAttributes, {
                metadata: {
                    createdAt: new Date()
                }
            });
        }

        idea._id = Idea.insert(idea);

        Email.send({
            to: "geral@hubsetubal.pt",
            from: "geral@hubsetubal.pt",
            subject: "New idea from " + idea.data.name,
            html: "<h4>" + idea.data.name + "</h4><h4>" + idea.data.email + "</h4><p>" + idea.data.content + "</p>",
        });

        return idea._id;
    }
});