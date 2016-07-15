
//Formatar data para MM-DD-YYYY
Template.registerHelper('formatDate', function(date) {
  if(date)
  	return moment(date).format('MM-DD-YYYY');
  else
  	return "";
});

//Formatar data para MM-DD-YYYY hh:mm:ss
Template.registerHelper('formatDateTime', function(date) {
  if(date)
  	return moment(date).format('MM-DD-YYYY, HH:mm:ss');
  else
  	return "";
});

//Procurar nome de país através de id
Template.registerHelper('getCountryName', function(id) {
	if(id!=null)
  		return Country.findOne({_id: id}).name;
  	else 
  		return "";
});

