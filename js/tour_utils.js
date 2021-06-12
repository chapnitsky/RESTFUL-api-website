
$(document).ready(function () {
    $("form[name='tour_form']").validate({
       // Specify validation rules
        rules: {
          "name":{
            minlength: 5
          },
          "email":{
            "email":true
          },
          "gphone":{
            digits: true,
            minlength: 10,
            maxlength: 10
          }
        },
        // Specify validation error messages
        messages: {       
          name: "Your name must be at least 5 characters long",
          email: "email structure is some@domain "
        }
      });

    // process the form
    $('#tour_form').submit(function (event) {
        if(!$("#tour_form").valid()) return;
        console.log("in submit");
        
        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/tours', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                "id": $("#id").val(),
                "start_date": $("#date").val(),
                "duration": parseInt($("#duration").val()),
                "price": parseInt($("#price").val()),
                "guide":{
                  "name": $("#gname").val(),
                  "email": $("#gemail").val(),
                  "cellular": $("#gphone").val()
                }
            }),
            processData: false,            
           // dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function( data, textStatus, jQxhr ){
                console.log(data);
                location.href = "/list";

            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        })
          
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
