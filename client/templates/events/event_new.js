Template.eventnew.events({
    'click #btn-event-data': function(e) {

      //Get and Trim the URL
      var url = $('#eventurl').val().trim();

      //Check if valid facebook URL
      if (url.indexOf("https://www.facebook.com/events/")==-1) {
                return swal({
                    title: "Invalid Url",
                    text: "The Url should be something like: https://www.facebook.com/events/{Id}",
                    showConfirmButton: true,
                    type: "error"
                });   
     }

     //Falta verificação se evento externo já foi importado
     else{

      //Remove the https://www.facebook.com/events/
      var id = url.substring(32, url.lenght);
      var aux = id.indexOf('/');

      //Remove everything after the id (if it exists)
      if(aux>-1)
        id = id.substring(0,aux);

      console.log(id);

        Meteor.call('getEventData', id);
    }
  }
});

