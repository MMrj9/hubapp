Template.registerHelper('formatDate', function(date) {
  if(date)
  	return moment(date).format('MM-DD-YYYY');
  else
  	return "";
});

Template.registerHelper('getCountryName', function(id) {
  	return Country.findOne({_id: id}).name;
});