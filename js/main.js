
"use strict";
$(document).ready(function(e) {
	$('.reviews__cboxExample').colorbox({rel:'gal'});
    $('.reviews__cboxFeedback').colorbox({rel:'gal2'});
    $('#input-phone').inputmask("+7 (999) 999-9999", 
                                { "onincomplete": function(){ alert('inputmask incomplete')}}
                                 );
});