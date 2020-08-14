$(function () {
  $('[data-toggle="tooltip"]').tootlip()
});
    	$(function () {
  $('[data-toggle="popover"]').popover()
});
    $('#contare').on('show.bs.modal', function (e) {console.log('el modal se muestra');
});	

    	$('#contare').on('shown.bs.modal', function (e) {console.log('el modal se mostro');
});
    $('#contare').on('hidden.bs.modal', function (e) {
  console.log("el modal se esconde");
})
    $('#contare').on('hidden.bs.modal', function (e) {
  console.log('el modal se oculto');

        $('#mirarebtn').removeClass("btn btn-danger");
        $('#mirarebtn').addClass("btn btn-warning");
        $('#mirarebtn').prop("disabled", true);
    });