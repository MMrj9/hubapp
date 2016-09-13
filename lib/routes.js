FlowRouter.route('/', {
   name: 'home',
   triggersEnter: [function(context, redirect) {
    redirect('/riseabove');
  }]
});
FlowRouter.route('/user/:userId', {
   name: 'userProfile',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "userProfile"
   });
  }
});
FlowRouter.route('/user_list', {
   name: 'user_list',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "userlist"
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
FlowRouter.route('/country_list', {
   name: 'country_list',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "countrylist"
   });
  }
});
FlowRouter.route('/country/:countryId', {
   name: 'country_detail',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "countrydetail"
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
FlowRouter.route('/event_new', {
   name: 'event_new',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "eventnew"
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
FlowRouter.route('/category_new', {
   name: 'category_new',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "category_new"
   });
  }
});
FlowRouter.route('/category_list', {
   name: 'category_list',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "categorylist"
   });
  }
});
FlowRouter.route('/category/:categoryId', {
   name: 'category_detail',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "categorydetail"
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
FlowRouter.route('/riseabove', {
   name: 'idea_new',
   action: function() {
   BlazeLayout.render("emptyLayout", {
      content: "idea_new"
   });
  }
});