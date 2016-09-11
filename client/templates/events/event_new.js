Template.eventnew.rendered = function() {
    $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 1
        });

     $('#timepicker').pickatime({
        autoclose: false,
        twelvehour: false
      });

};

Template.eventnew.events({
    'click #create-event': function(e) {

        combineDateAndTime = function(date, time) {
            console.log(time);
    timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();
    var dateString = '' + year + '-' + month + '-' + day;
    var combined = new Date(dateString + ' ' + timeString);

    return combined;
};
       
        var event = { data:{
            name: $('name').val(),
            //formatação do texto
            description: decodeURIComponent(encodeURIComponent($('#description').val())),
            start: combineDateAndTime($('#beginDate').val(),$('#beginTime').val()),
            end: combineDateAndTime($('#endDate').val(),$('#endTime').val()),
            place: $('#place').val(),
            city: $('#city').val(),
            status: "new"
        }
        };


    
        //Check if user is logged in
        if (Meteor.userId() != null) {
                Meteor.call('eventInsert', event, function(error, eventId) {
                    if (error) {
                        // throwError(error.reason);
                        console.log(error);
                    } else {
                        result = eventId;
                    }
                });
        } else {
            FlowRouter.go('/login');
            return swal({
                title: "User must be logged in",
                text: "Please login before trying to create an event",
                showConfirmButton: true,
                type: "warning"
            });
        }
    }
});