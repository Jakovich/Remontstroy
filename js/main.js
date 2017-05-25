/*
----
Общий скрипт для всех страниц
----
*/

"use strict";
$(document).ready(function () {

             
  /**
   Открытие и закрытие попапа
   ------------------------------
  */

  //добавление и скрытие блока для затемнения фона при открытии попапа
  $('.popup-report').after("<div class='popup-report__overlay'></div>");
  $('.popup-report, .popup-report__overlay').hide();

  //окрытие попапа при нажатии на ссылки
  $('.basic-btn').click(function (evt) {
    evt.preventDefault();
    $('.popup-report, .popup-report__overlay').fadeIn(500);

  })

  //закрытие попапа при нажатии на крестик или по затемненному фону
  $('.popup-report__close, .popup-report__overlay').click(function () {
    $('.popup-report, .popup-report__overlay').fadeOut(500);
    if ($('.popup-report').hasClass('popup-report__shake')) {
      $('.popup-report').removeClass('popup-report__shake');
    }
  })

  //закрытие попапа при нажатии на клавишу esc
  $(this).keydown(function (eventObject) {
    if (eventObject.which == 27)
      $('.popup-report, .popup-report__overlay').fadeOut(500);
    if ($('.popup-report').hasClass('popup-report__shake')) {
      $('.popup-report').removeClass('popup-report__shake');
    }
  });


  /**
    Валидация формы попапа
    ----------------------------------------
  */

  /**
   * @const
   * @type {number}
   */
  var popupValidPhone = 0;

  /**
   * @const
   * @type {number}
   */
  var popupValidName = 0;

  //проверка изначальных состояний и валидация формы при загрузке стрницы
  //поле телефон
  var $inputedPhonePopup = $('.popup-report__form [name=phone]').val();
  if (Inputmask.isValid($inputedPhonePopup, {
      alias: "+7 (999) 999-9999"
    })) {
    var popupValidPhone = 1;
  };

  //проверка изначальных состояний и валидация формы при загрузке стрницы
  //поле телефон
  var $inputedNamePopup = $('.popup-report__form [name=name]').val();
  if (Inputmask.isValid($inputedNamePopup, {
      alias: "a{2,20} "
    })) {
    var popupValidName = 1;
  };

  //добавление маски на поле телефон
  $('#report-phone').inputmask("+7 (999) 999-9999", {
    "onincomplete": function () {
      popupValidPhone = 0;
      $(this).addClass('popup-report__input--invalid');
      showErr('report-phone', 'popup-report__error');
    },
    "oncomplete": function () {
      popupValidPhone = 1;
      $(this).removeClass('popup-report__input--invalid');
      removeErr('report-phone', 'popup-report__error');
    },
    "onKeyValidation": function () {
      removeErr('report-phone', 'popup-report__error');
    }

  })

  //добавление маски на поле имя
  $('#report-name').inputmask("a{2,20} [aa{2,20}]", {
    "placeholder": " ",
    "showMaskOnHover": false,
    "onincomplete": function () {
      popupValidName = 0;
      $(this).addClass('popup-report__input--invalid');
      showErr('report-name', 'popup-report__error');
    },
    "oncomplete": function () {
      popupValidName = 1;
      $(this).removeClass('popup-report__input--invalid');
      removeErr('report-name', 'popup-report__error');
    },
    "onKeyValidation": function () {
      removeErr('report-name', 'popup-report__error');
    }
  });

  //валидация формы при нажатии на кнопку отправить

  $('.popup-report__btn').click(function (evt) {
    //проверка заполненности поля телефон
    if (popupValidPhone === 0) {
      evt.preventDefault();
      $('#report-phone').addClass('popup-report__input--invalid');

      if (!$("label[for='report-phone']").children().hasClass("popup-report__error")) {
        showErr('report-phone', 'popup-report__error');
      }
      //добавление класса анимации
      if ($('.popup-report').hasClass('popup-report__shake')) {
        $('.popup-report').removeClass('popup-report__shake');
      }
      $('.popup-report').addClass('popup-report__shake');
    }
    //проверка заполненности поля телефон
    if (popupValidName === 0) {
      evt.preventDefault();
      $('#report-name').addClass('popup-report__input--invalid');
      if (!$("label[for='input-name']").children().hasClass("popup-report__error")) {
        showErr('report-name', 'popup-report__error');
      }
      //добавление класса анимации
      if ($('.popup-report').hasClass('popup-report__shake')) {
        $('.popup-report').removeClass('popup-report__shake');
      }
      $('.popup-report').addClass('popup-report__shake');
    }


  });


  //закрытие попапа при отправке формы
  $('.popup-report__form').submit(function () {
    $('.popup-report, .popup-report__overlay').fadeOut(500);
    if ($('.popup-report').hasClass('popup-report__shake')) {
      $('.popup-report').removeClass('popup-report__shake');
    }
  })


  /**
    Вспомогательные функции
  */


  /**
    функция показа сообщения об ошибки
  * @param {HTMLElement} field
  * @param {string} errClass
  * @param {boolean} text
  * @param *{string} errorMessage
  */


  function showErr(field, errClass, text, errorMessage) {
    var $errorSpan = $('<span></span>');

    if (text) {
      $errorSpan.append(errorMessage);
    }

    $errorSpan.addClass(errClass);
    $errorSpan.hide();

    var $fieldLabel = $("label[for='" + field + "']");
    $fieldLabel.append($errorSpan);
    $errorSpan.fadeIn(300);
  }

  /**
     функция удаления сообщения об ошибки
   * @param {HTMLElement} field
   * @param {string} className
   */

  function removeErr(field, className) {
    var $fieldLabel = $("label[for='" + field + "']");

    if ($fieldLabel.children().hasClass(className)) {
      $fieldLabel.find('.' + className).fadeOut(300, function() { $(this).remove(); });
    }
  }

  /**
    удаление сообщения об ошибки и класса,
    сообщающего об ошибке при клике вне формы
  */

  $(document).mouseup(function (e) {
    var currentForm = $('.popup-report'); // тут указываем ID элемента
    if (!currentForm.is(e.target) // если клик был не по нашему блоку
      && currentForm.has(e.target).length === 0) { // и не по его дочерним элементам
      removeErr('report-name', 'popup-report__error');
      removeErr('report-phone', 'popup-report__error');
      $('#report-name').removeClass('popup-report__input--invalid');
      $('#report-phone').removeClass('popup-report__input--invalid');
    }
  })


});
