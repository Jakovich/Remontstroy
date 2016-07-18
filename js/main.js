
"use strict";
$(document).ready(function(e) {
    $('.popup-report, .popup-report__overlay').hide();
    $('.basic-btn').click(function(evt){
      evt.preventDefault();
      $('.popup-report, .popup-report__overlay').fadeIn(500);
    })
    $('.popup-report__close, .popup-report__overlay').click(function(){
      $('.popup-report, .popup-report__overlay').fadeOut(500);
    })
    
    $('#input-phone').inputmask("+7 (999) 999-9999");
    $('#report-phone').inputmask("+7 (999) 999-9999")
    $('#input-name').inputmask('Regex', { regex: "[A-Za-zА-Яа-яЁё]{3-20}" });
    $('#report-name').inputmask('Regex', { regex: "[A-Za-zА-Яа-яЁё]{3-20}" });
   
});