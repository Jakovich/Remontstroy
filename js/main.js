
"use strict";
$(document).ready(function(e) {
    $("head").append("<link href='https://fonts.googleapis.com/css?family=PT+Sans:400,400italic,700,700italic&amp;subset=latin,cyrillic-ext' rel='stylesheet' type='text/css'>");
    $('.popup-report').after("<div class='popup-report__overlay'></div>");
    $('.popup-report, .popup-report__overlay').hide();
    $('.basic-btn').click(function(evt){
      
      evt.preventDefault();
      $('.popup-report, .popup-report__overlay').fadeIn(500);
      $('.popup-report #report-name').focus();
    })
    $('.popup-report__close, .popup-report__overlay').click(function(){
      $('.popup-report, .popup-report__overlay').fadeOut(500);
    })
    
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27)
        $('.popup-report, .popup-report__overlay').fadeOut(500);
    });
    
    var validValue = 0; 
    $('#input-phone').inputmask("+7 (999) 999-9999", 
      { "onincomplete": function() {
        validValue = 0;
        $(this).addClass('call-master__input--invalid');
        showErr('input-phone', 'Введите номер полностью');
        },
        "oncomplete": function() {
        validValue = 2;
        $(this).removeClass('call-master__input--invalid');
        console.log(validValue);
        removeErr('input-phone');
        },
       "onKeyValidation": function() {
         removeErr('input-phone');
       }
      }                         
    );
  
    $('#input-name').inputmask('Regex', { regex: "[A-Za-zА-Яа-яЁё]{3-20}",
                                        "onincomplete": function() {
        validValue = 1;
        $(this).addClass('call-master__input--invalid');
        showErr('input-phone', 'Введите номер полностью');
        }
    });
  
    $('.call-master__btn').click(function(evt){
      if(validValue === 0) {
        evt.preventDefault();
        $('#input-phone').addClass('call-master__input--invalid');
      
        if (!$("label[for='input-phone']").children().hasClass("call-master__errorMsg")){
          showErr('input-phone', 'Введите номер телефона');
        }
      }
    });
  
    function showErr(field, errorMessage) {
      var errorSpan = document.createElement("span");
      var errorMessage = document.createTextNode(errorMessage);

      errorSpan.appendChild(errorMessage);
      errorSpan.className = "call-master__errorMsg";

      var $fieldLabel = $("label[for='" + field + "']");
      $fieldLabel.append(errorSpan);
    }
  
    function removeErr(field) {
      var $fieldLabel = $("label[for='" + field + "']");
      
      if ($fieldLabel.children().hasClass("call-master__errorMsg")){
        $fieldLabel.find('.call-master__errorMsg').remove();
      }
    }
  
    
  
    
    $('#report-phone').inputmask("+7 (999) 999-9999")
    
    $('#report-name').inputmask('Regex', { regex: "[A-Za-zА-Яа-яЁё]{3-20}" });
   
});

