Template.eventnew.events({
    'click #btn-event-data': function(e) {

      var url = $('#eventurl').val().trim();

      if (url.indexOf("https://www.facebook.com/events/")==-1) {
                return swal({
                    title: "Invalid Url",
                    text: "The Url should be something like: https://www.facebook.com/events/{Id}",
                    showConfirmButton: true,
                    type: "error"
                });   
     }

     //falta verificação se evento externo já existe
     else{

      var id = url.substring(32, url.lenght);
      var aux = id.indexOf('/');

      if(aux>-1)
        id = id.substring(0,aux);

      console.log(id);

        Meteor.call('getEventData', id);
    }
  }
});

