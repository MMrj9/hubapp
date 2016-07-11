Template.country_new.events({
  'click #create': function(e, t) {

    e.preventDefault();  

    var country = {
      name: $('#countryname').val()
    };
    
    if (! country.name) {
                return swal({
                    title: "Invalid Name",
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });   
   }
   
  $("#countryname").val(null);
  $("#countryname").select();

 	if(Country.find({name: country.name}).count()>0){
 		                return swal({
                    title: "Invalid Name",
                    text: "A country with that name already exists",
                    showConfirmButton: true,
                    type: "error"
                });   
 	}
    
    Meteor.call('countryInsert', country, function(error, countryId) {
      if (error){
        throwError(error.reason);
      } else {
 		                return swal({
                    title: "Sucess",
                    text: "Country created",
                    showConfirmButton: true,
                    type: "success"
                });   
      }
    });
  }
});