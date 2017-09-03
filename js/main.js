$(document).ready(function(){
  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var game = button.data('game'); // Extract info from data-* attributes
    var link = $(button).attr("gameLink");
    console.log(link);
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text(game);
    modal.find('.modal-body img').attr("src", $($(button).children(".gameImg")).attr("src"));
    modal.find('.modal-footer a').attr("href", link);
  })
});
