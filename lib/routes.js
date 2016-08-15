FlowRouter.route('/my_profile', {
   name: 'userProfile',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "userProfile"
   });
  }
});
FlowRouter.route('/login', {
   name: 'login',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "login"
   });
  }
});
FlowRouter.route('/register', {
   name: 'register',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "register"
   });
  }
});
FlowRouter.route('/country_new', {
   name: 'country_new',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "country_new"
   });
  }
});
FlowRouter.route('/event_import', {
   name: 'event_import',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "eventimport"
   });
  }
});
FlowRouter.route('/event_list', {
   name: 'event_list',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "eventlist"
   });
  }
});
FlowRouter.route('/events/:eventId', {
   name: 'event_detail',
   subscriptions: function(params, queryParams) {
        this.register('event', Meteor.subscribe('singleEvent', params.eventId));
   },
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "eventdetail"
   });
  }
});
FlowRouter.route('/backoffice', {
   name: 'backoffice',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "backofficemain"
   });
  }
});