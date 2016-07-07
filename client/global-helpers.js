Template.registerHelper('formatDate', function(date) {
  if(date)
  	return moment(date).format('MM-DD-YYYY');
  else
  	return "";
});