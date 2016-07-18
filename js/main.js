
"use strict";
$(document).ready(function(e) {
  //добавление в head ссылки на googleFonts
  $("head").append("<link href='https://fonts.googleapis.com/css?family=PT+Sans:400,400italic,700,700italic&amp;subset=latin,cyrillic-ext' rel='stylesheet' type='text/css'>");
  
  /**
   Открытие и закрытие попапа
  */
  //добавление блока для затемнения фона при открытии попапа
  $('.popup-report').after("<div class='popup-report__overlay'></div>");
  $('.popup-report, .popup-report__overlay').hide();
  //окрытие попапа при нажатии на ссылки
  $('.basic-btn').click(function(evt){   
    evt.preventDefault();
    $('.popup-report, .popup-report__overlay').fadeIn(500);
    $('.popup-report #report-name').focus();
  })
  //закрытие попапа при нажатии на крестик или по затемненному фону
  $('.popup-report__close, .popup-report__overlay').click(function(){
    $('.popup-report, .popup-report__overlay').fadeOut(500);
    if ($('.popup-report').hasClass('popup-report__shake')) {
      $('.popup-report').removeClass('popup-report__shake');
    }
  })
  //закрытие попапа при нажатии на клавишу esc  
  $(this).keydown(function(eventObject){
    if (eventObject.which == 27)
      $('.popup-report, .popup-report__overlay').fadeOut(500);
      if ($('.popup-report').hasClass('popup-report__shake')) {
        $('.popup-report').removeClass('popup-report__shake');
      }
  });
    
  
  /**
    Добавление масок для полей форм, валидация
  */
  
  /*------------------------------------------*/
  var validPhone = 0;
  var validName = 0;
  var popupValidPhone = 0;
  var popupValidName = 0;
  //проверка после загрузки
  var $inputedPhone = $('.call-master [name=phone]').val();
  if (Inputmask.isValid($inputedPhone, { alias: "+7 (999) 999-9999"})){
    var validPhone = 1;
  };
  
  var $inputedName = $('.call-master [name=name]').val();
  if (Inputmask.isValid($inputedName, { alias: "a{2,20} "})){
    var validName = 1;
  };
  
  var $inputedPhonePopup = $('.popup-report__form [name=phone]').val();
  if (Inputmask.isValid($inputedPhonePopup, { alias: "+7 (999) 999-9999"})){
    var popupValidPhone = 1;
  };
  
  var $inputedNamePopup = $('.popup-report__form [name=name]').val();
  if (Inputmask.isValid($inputedNamePopup, { alias: "a{2,20} "})){
    var popupValidName = 1;
  };
  
  /**
    Валидация формы вызова мастера в секции intro
  */
  
  //валидация поля телефон
  $('#input-phone').inputmask("+7 (999) 999-9999", 
    { "onincomplete": function() {
      validPhone = 0;
      $(this).addClass('call-master__input--invalid');
      showErr('input-phone', 'call-master__errorMsg', true, 'Введите номер полностью');
      },
      "oncomplete": function() {
      validPhone = 1;
      $(this).removeClass('call-master__input--invalid');
      removeErr('input-phone', 'call-master__errorMsg');
      },
     "onKeyValidation": function() {
       removeErr('input-phone', 'call-master__errorMsg');
     }
    }                         
  );
  
  //валидация поля имя
  $('#input-name').inputmask("a{2,20} [aa{2,20}]", 
    { 
      "onincomplete": function() {
        validName = 0;
      $(this).addClass('call-master__input--invalid');
      showErr('input-name', 'call-master__errorMsg', true, 'Введите имя');
      },
      "oncomplete": function() {
      validName = 1;
      $(this).removeClass('call-master__input--invalid');
      removeErr('input-name', 'call-master__errorMsg');
      },
     "onKeyValidation": function() {
       removeErr('input-name', 'call-master__errorMsg');
     },
    "placeholder": " ",
    "showMaskOnHover": false                      
  });
  
  
  
  //проверка перед отправкой формы
  $('.call-master__btn').click(function(evt){
    if(validPhone === 0) {
      evt.preventDefault();
      $('#input-phone').addClass('call-master__input--invalid');
    
      if (!$("label[for='input-phone']").children().hasClass("call-master__errorMsg")){
        showErr('input-phone', 'call-master__errorMsg', true, 'Введите номер телефона');
      }
    }
    
    if(validName === 0) {
      evt.preventDefault();
      $('#input-name').addClass('call-master__input--invalid');
      if (!$("label[for='input-name']").children().hasClass("call-master__errorMsg")){
        showErr('input-name', 'call-master__errorMsg', true, 'Введите имя');
      }
    }
  });
  
    
  
  
 
  /**
    Валидация формы попапа
  */
  
  
  $('#report-phone').inputmask("+7 (999) 999-9999", {
    "onincomplete": function() {
      popupValidPhone = 0;
      $(this).addClass('popup-report__input--invalid');
      showErr('report-phone', 'popup-report__error');
      },
    "oncomplete": function() {
      popupValidPhone = 1;
      $(this).removeClass('popup-report__input--invalid');
        removeErr('report-phone', 'popup-report__error');
      },
     "onKeyValidation": function() {
       removeErr('report-phone', 'popup-report__error');
     }
      
    })
    
    $('#report-name').inputmask("a{2,20} [aa{2,20}]", {
      "placeholder": " ",
      "showMaskOnHover": false,
      "onincomplete": function() {
        popupValidName = 0;
        $(this).addClass('popup-report__input--invalid');
        showErr('report-name', 'popup-report__error');
        },
      "oncomplete": function() {
        popupValidName = 1;
        $(this).removeClass('popup-report__input--invalid');
          removeErr('report-name', 'popup-report__error');
        },
       "onKeyValidation": function() {
         removeErr('report-name', 'popup-report__error');
        }
    });
  
  $('.popup-report__btn').click(function(evt){
      
      if (popupValidPhone === 0) {
        evt.preventDefault();
        $('#report-phone').addClass('popup-report__input--invalid');
      
        if (!$("label[for='report-phone']").children().hasClass("popup-report__error")){
          showErr('report-phone', 'popup-report__error');
        }
      }
      
      if (popupValidName === 0) {
        evt.preventDefault();
        $('#report-name').addClass('popup-report__input--invalid');
        if (!$("label[for='input-name']").children().hasClass("popup-report__error")){
           showErr('report-name', 'popup-report__error');
        }
      }
    
      if (popupValidName === 0 || popupValidPhone === 0) {
        if ($('.popup-report').hasClass('popup-report__shake')) {
          $('.popup-report').removeClass('popup-report__shake');
        }
        $('.popup-report').addClass('popup-report__shake');
      }
    });
  
   /**
    функция показа сообщения об ошибки
  * @param {HTMLElement} field
  * @param {string} errClass
  * @param {boolean} text
  * @param *{string} errorMessage
  */
  function showErr(field, errClass, text, errorMessage) {
    var errorSpan = document.createElement("span");
    
    if (text) {
      var errorMessage = document.createTextNode(errorMessage);
      errorSpan.appendChild(errorMessage);
    }
    
    errorSpan.className = errClass;

    var $fieldLabel = $("label[for='" + field + "']");
    $fieldLabel.append(errorSpan);
  }
  
 /**
    функция удаления сообщения об ошибки
  * @param {HTMLElement} field
  * @param {string} className
  */
  
  function removeErr(field, className) {
    var $fieldLabel = $("label[for='" + field + "']");
      
    if ($fieldLabel.children().hasClass(className)){
      $fieldLabel.find('.' + className).remove();
    }
  }
   
  
  /*$(document).mouseup(function (e){ // событие клика по веб-документу
		var callMaster = $(".call-master"); // тут указываем ID элемента
		if (!callMaster.is(e.target) // если клик был не по нашему блоку
		    && callMaster.has(e.target).length === 0) { // и не по его дочерним элементам
			removeErr('input-phone'); // скрываем его
          console.log('sdf');
		}
	});*/
});

