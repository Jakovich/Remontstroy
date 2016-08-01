
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
  var validPhoneCont = 0;
  var validNameCont = 0;
  //проверка после загрузки
  var $inputedPhone = $('.call-master [name=phone]').val();
  if ($inputedPhone === '') {
          validPhone = 0;
  } else {
          validPhone = 1;
  }
  if (Inputmask.isValid($inputedPhone, { alias: "+7 (999) 999-9999"})){
    var validPhone = 2;
  };
  
  
  
  var $inputedName = $('.call-master [name=name]').val();
  if ($inputedName === '') {
    validName = 0;
  } else {
    validName = 1;
  }
  if (Inputmask.isValid($inputedName, { alias: "a{2,20} "})){
    var validName = 2;
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
      var $currentPhone = $('.call-master [name=phone]').val();
        if ($currentPhone === '') {
          validPhone = 0;
        } else {
          validPhone = 1;
        }
      },
      "oncomplete": function() {
        validPhone = 2;
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
        var $currentName = $('.call-master [name=name]').val();
        if ($currentName === '') {
          validName = 0;
        } else {
          validName = 1;
        }
        
      },
        
      
      "oncomplete": function() {
        validName = 2;
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
    if(validPhone === 1) {
      evt.preventDefault();
      $('#input-phone').addClass('call-master__input--invalid');
    
      if (!$("label[for='input-phone']").children().hasClass("call-master__errorMsg")){
        showErr('input-phone', 'call-master__errorMsg', true, 'Введите номер полностью');
      }
    }
    
    if(validName === 0) {
      evt.preventDefault();
      $('#input-name').addClass('call-master__input--invalid');
      if (!$("label[for='input-name']").children().hasClass("call-master__errorMsg")){
        showErr('input-name', 'call-master__errorMsg', true, 'Введите имя');
      }
    }
    
    if(validName === 1) {
      evt.preventDefault();
      $('#input-name').addClass('call-master__input--invalid');
      if (!$("label[for='input-name']").children().hasClass("call-master__errorMsg")){
        showErr('input-name', 'call-master__errorMsg', true, 'Введите имя минимум из 2 букв');
      }
    }
  });
  
    
  
  /**
    Валидация формы на странице contacts
  */
  
  ////валидация поля телефон
  $('#contacts-phone').inputmask("+7 (999) 999-9999", 
    { "onincomplete": function() {
      var $currentPhone = $('.contacts-form [name=phone]').val();
        if ($currentPhone === '') {
          validPhoneCont = 0;
        } else {
          validPhoneCont = 1;
        }
      },
      "oncomplete": function() {
        validPhoneCont = 2;
        $(this).removeClass('contacts-form__input--invalid');
        removeErr('contacts-phone', 'contacts-form__errorMsg');
      },
     "onKeyValidation": function() {
       removeErr('contacts-phone', 'contacts-form__errorMsg');
     }
    }                         
  );
  

  
  //валидация поля имя
  $('#contacts-name').inputmask("a{2,20} [aa{2,20}]", 
    { 
      "onincomplete": function() {
        var $currentName = $('.contacts-form [name=name]').val();
        if ($currentName === '') {
          validNameCont = 0;
        } else {
          validNameCont = 1;
        }
        
      },
        

      "oncomplete": function() {
        validNameCont = 2;
        $(this).removeClass('contacts-form__input--invalid');
        removeErr('contacts-name', 'contacts-form__errorMsg');
      },
     "onKeyValidation": function() {
       removeErr('contacts-name', 'contacts-form__errorMsg');
     },
    "placeholder": " ",
    "showMaskOnHover": false                      
  });
  
  $('.contacts-form__btn').click(function(evt){
    if(validPhoneCont === 0) {
      evt.preventDefault();
      $('#contacts-phone').addClass('contacts-form__input--invalid');
    
      if (!$("label[for='contacts-phone']").children().hasClass("call-master__errorMsg")){
        showErr('contacts-phone', 'contacts-form__errorMsg', true, 'Введите номер телефона');
      }
    }
    if(validPhoneCont === 1) {
      evt.preventDefault();
      $('#contacts-phone').addClass('contacts-form__input--invalid');
    
      if (!$("label[for='contacts-phone']").children().hasClass("call-master__errorMsg")){
        showErr('contacts-phone', 'contacts-form__errorMsg', true, 'Введите номер полностью');
      }
    }
    
    if(validNameCont === 0) {
      evt.preventDefault();
      $('#contacts-name').addClass('contacts-form__input--invalid');
      if (!$("label[for='contacts-name']").children().hasClass("call-master__errorMsg")){
        showErr('contacts-name', 'contacts-form__errorMsg', true, 'Введите имя');
      }
    }
    
    if(validNameCont === 1) {
      evt.preventDefault();
      $('#contacts-name').addClass('contacts-form__input--invalid');
      if (!$("label[for='contacts-name']").children().hasClass("call-master__errorMsg")){
        showErr('contacts-name', 'contacts-form__errorMsg', true, 'Введите имя минимум из 2 букв');
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
   
  
  $(document).mouseup(function (e){ 
		var callMaster = $(".call-master"); 
		if (!callMaster.is(e.target) // если клик был не по нашему блоку
		    && callMaster.has(e.target).length === 0) { // и не по его дочерним элементам
			removeErr('input-phone', 'call-master__errorMsg');
            removeErr('input-name', 'call-master__errorMsg');
            $('#input-name').removeClass('call-master__input--invalid');
            $('#input-phone').removeClass('call-master__input--invalid');
		}
	})
  
  $(document).mouseup(function (e){ // событие клика по веб-документу
		var callMaster = $(".popup-report"); // тут указываем ID элемента
		if (!callMaster.is(e.target) // если клик был не по нашему блоку
		    && callMaster.has(e.target).length === 0) { // и не по его дочерним элементам
			removeErr('report-name', 'popup-report__error');
            removeErr('report-phone', 'popup-report__error');
            $('#report-name').removeClass('popup-report__input--invalid');
            $('#report-phone').removeClass('popup-report__input--invalid');
		}
	});
  
  $(document).mouseup(function (e){ // событие клика по веб-документу
		var callMaster = $(".contacts-form"); // тут указываем ID элемента
		if (!callMaster.is(e.target) // если клик был не по нашему блоку
		    && callMaster.has(e.target).length === 0) { // и не по его дочерним элементам
			removeErr('contacts-name', 'contacts-form__errorMsg');
            removeErr('contacts-phone', 'contacts-form__errorMsg');
            $('#contacts-name').removeClass('contacts-form__input--invalid');
            $('#contacts-phone').removeClass('contacts-form__input--invalid');
		}
	});
  
  
});

