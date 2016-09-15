Template.eventnew.rendered = function() {
    $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 1,
            format: 'dd-mm-yyyy'
        });

    var timepicker = new TimePicker();

    timepicker.bindInput('#beginTime', {timeFormat: 'military'});

};

Template.eventnew.events({
    'click #create-event': function(e) {

        var startDateTime = moment($('#beginDate').val() + ' ' + $('#beginTime').val(), "DD-MM-YYYY HH:mm").toDate();
        var endDateTime = moment($('#endDate').val() + ' ' + $('#endTime').val(), "DD-MM-YYYY HH:mm").toDate();

        var event = { data:{
            name: $('name').val(),
            //formatação do texto
            description: decodeURIComponent(encodeURIComponent($('#description').val())),
            start: startDateTime,
            end: endDateTime,
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