
$(document).ready(function () {
    $("form[name='tour_form']").validate({
       // Specify validation rules
        rules: {
          "name":{
            minlength: 5
          },
          "email":{
            "email":true
          }
        },
        // Specify validation error messages
        messages: {       
          name: "Your name must be at least 5 characters long",
          email: "email structure is some@domain "
        }
    });
    $("form[name='uguide_form']").validate({
      // Specify validation rules
       rules: {
         "name":{
           minlength: 5
         },
         "email":{
           "email":true
         }
       },
       // Specify validation error messages
       messages: {       
         name: "Your name must be at least 5 characters long",
         email: "email structure is some@domain "
       }
   });
      $("form[name='guide_form']").validate({
        // Specify validation rules
         rules: {
           "name":{
             minlength: 5
           },
           "email":{
             "email":true
           },
           "phone":{
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
                "guide": $("#gid").val()
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
    $('#edit_form').submit(function (event) {
      console.log("in submit");
      
      // process the form
      $.ajax({
          type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
          url: `/tours/${$("#edit_id").val()}`, // the url where we want to POST
          contentType: 'application/json',
          data: JSON.stringify({
              "id": $("#edit_id").val(),
              "start_date": $("#date").val(),
              "duration": parseInt($("#duration").val()),
              "price": parseInt($("#price").val()),
              "guide": $("#gid").val()
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
    $('#guide_form').submit(function (event) {
      if(!$("#guide_form").valid()) return;
      console.log("in submit");
      
      // process the form
      $.ajax({
          type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
          url: '/guides', // the url where we want to POST
          contentType: 'application/json',
          data: JSON.stringify({
              "name": $("#gname").val(),
              "email": $("#gemail").val(),
              "phone": $("#gphone").val()
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

  $('#uguide_form').submit(function (event) {
    if(!$("#uguide_form").valid()) return;
    console.log("in submit");
    
    // process the form
    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
        url: `/guides/${$("#gid").val()}`, // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "name": $("#gname").val(),
            "email": $("#gemail").val(),
            "phone": $("#gphone").val()
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
$('#dguide_form').submit(function (event) {
  console.log("in submit");
  // process the form
  $.ajax({
      type: 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
      url: `/guides/${$("#gid").val()}`, // the url where we want to POST
      contentType: 'application/json',
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
$('#tourguide_form').submit(function (event) {
  console.log("in submit");
  // process the form
  $.ajax({
      type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
      url: `/tours_guide/${$("#gid").val()}`, // the url where we want to POST
      contentType: 'application/json',
      processData: false,            
     // dataType: 'json', // what type of data do we expect back from the server
      encode: true,
      success: function( data, textStatus, jQxhr ){
          console.log(data);
          str = "<br></br>";
          for(let i = 0; i < data.length; i++){
            str += data[i]["id"] + "<br></br>";
          }
          $("#resulted").html(str);

      },
      error: function( jqXhr, textStatus, errorThrown ){
          console.log( errorThrown );
      }
  })
    
  // stop the form from submitting the normal way and refreshing the page
  event.preventDefault();
});

});
