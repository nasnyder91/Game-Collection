$(document).ready(function(){
  var form = $("#theForm");
  $('#theForm').on('submit', function(e) {
       e.preventDefault();

       var name = $('#name').val();

       var email = $('#email').val();

       var comments = $('#contactMessage').val();

       if(form[0].checkValidity()){
         $.ajax({
             url:'https://formspree.io/n.a.snyder@comcast.net',
             method:'POST',
             data:{
                 name:name,
                 _replyto:email,
                  email:email,
                 comments:comments,
                 _subject:'Game Collection site form submission',
             },
             dataType:"json",
             success:function() {
                 console.log('success');
                 $('#formThankYou').show();
             }

         });
       } else{
         console.log("not valid");
         form.find(':submit').click();
       }
   });


  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var game = button.data('game'); // Extract info from data-* attributes
    var link = $(button).attr("gameLink");
    var readme = $(button).attr("readmeURL");
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text(game);
    modal.find('.modal-body img').attr("src", $($(button).children(".gameImg")).attr("src"));
    modal.find('.modal-footer a').attr("href", link);

    var client = new XMLHttpRequest();
    client.open('GET', readme);
    client.onreadystatechange = function() {
      modal.find("#modalInfo").html(client.responseText);
    }
    client.send();

  });
});
