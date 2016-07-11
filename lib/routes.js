FlowRouter.route('/', {
   name: 'home',
   action: function() {
   BlazeLayout.render("mainLayout", {
      content: "home"
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