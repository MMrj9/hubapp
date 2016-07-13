Template.registerHelper('formatDate', function(date) {
  if(date)
  	return moment(date).format('MM-DD-YYYY');
  else
  	return "";
});

Template.registerHelper('formatDateTime', function(date) {
  if(date)
  	return moment(date).format('MM-DD-YYYY, HH:mm:ss');
  else
  	return "";
});

Template.registerHelper('getCountryName', function(id) {
	if(id!=null)
  		return Country.findOne({_id: id}).name;
  	else 
  		return "";
});

