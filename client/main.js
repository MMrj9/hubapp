import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.auth.events({
  'click #logout'(event, instance) {
  	Meteor.logout();
  },
});
