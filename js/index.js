/**
----
Скрипт для главной страницы (index.html)
----
*/
"use strict";
$(document).ready(function () {
  /**
    Валидация формы на вызвать мастера
    ----------------------------------------
  */
  /** 
   * @const
   * @type {number}
   */
  var validPhone = 0;
  /** 
   * @const
   * @type {number}
   */
  var validName = 0;
  //проверка изначальных состояний и валидация формы при загрузке стрницы
  //поле телефон
  var $inputedPhone = $('.call-master [name=phone]').val();
  if ($inputedPhone === '') {
    validPhone = 0;
  } else {
    validPhone = 1;
  }
  if (Inputmask.isValid($inputedPhone, {
      alias: "+7 (999) 999-9999"
    })) {
    var validPhone = 2;
  };

  //поле имя
  var $inputedName = $('.call-master [name=name]').val();
  if ($inputedName === '') {
    validName = 0;
  } else {
    validName = 1;
  }
  if (Inputmask.isValid($inputedName, {
      alias: "a{2,20} "
    })) {
    var validName = 2;
  };

  //добавление маски на поле телефон
  $('#input-phone').inputmask("+7 (999) 999-9999", {
    "onincomplete": function () {
      var $currentPhone = $('.call-master [name=phone]').val();
      if ($currentPhone === '') {
        validPhone = 0;
      } else {
        validPhone = 1;
      }
    },
    "oncomplete": function () {
      validPhone = 2;
      $(this).removeClass('call-master__input--invalid');
      removeErr('input-phone', 'call-master__errorMsg');
    },
    "onKeyValidation": function () {
      removeErr('input-phone', 'call-master__errorMsg');
    }
  });

  //добавление маски на поле имя
  $('#input-name').inputmask("a{2,20} [aa{2,20}]", {
    "onincomplete": function () {
      var $currentName = $('.call-master [name=name]').val();
      if ($currentName === '') {
        validName = 0;
      } else {
        validName = 1;
      }

    },

    "oncomplete": function () {
      validName = 2;
      $(this).removeClass('call-master__input--invalid');
      removeErr('input-name', 'call-master__errorMsg');
    },
    "onKeyValidation": function () {
      removeErr('input-name', 'call-master__errorMsg');
    },
    "placeholder": " ",
    "showMaskOnHover": false
  });



  //валидация формы при нажатии на кнопку отправить
  $('.call-master__btn').click(function (evt) {
    //проверка заполненности поля телефон
    if (validPhone === 0) {
      evt.preventDefault();
      $('#input-phone').addClass('call-master__input--invalid');

      if (!$("label[for='input-phone']").children().hasClass("call-master__errorMsg")) {
        showErr('input-phone', 'call-master__errorMsg', true, 'Введите номер телефона');
      }
    } else if (validPhone === 1) {
      evt.preventDefault();
      $('#input-phone').addClass('call-master__input--invalid');

      if (!$("label[for='input-phone']").children().hasClass("call-master__errorMsg")) {
        showErr('input-phone', 'call-master__errorMsg', true, 'Введите номер полностью');
      }
    }
    //проверка заполненности поля имя
    if (validName === 0) {
      evt.preventDefault();
      $('#input-name').addClass('call-master__input--invalid');
      if (!$("label[for='input-name']").children().hasClass("call-master__errorMsg")) {
        showErr('input-name', 'call-master__errorMsg', true, 'Введите имя');
      }
    } else if (validName === 1) {
      evt.preventDefault();
      $('#input-name').addClass('call-master__input--invalid');
      if (!$("label[for='input-name']").children().hasClass("call-master__errorMsg")) {
        showErr('input-name', 'call-master__errorMsg', true, 'Введите имя минимум из 2 букв');
      }
    }
  });

 /**
    удаление сообщения об ошибки и класса, 
    сообщающего об ошибке при клике вне формы
  */
  $(document).mouseup(function (e) {
    var currentForm = $('.call-master'); // тут указываем ID элемента
    if (!currentForm.is(e.target) // если клик был не по нашему блоку
      && currentForm.has(e.target).length === 0) { // и не по его дочерним элементам
      removeErr('input-name', 'call-master__errorMsg');
      removeErr('input-phone', 'call-master__errorMsg');
      $('#input-name').removeClass('call-master__input--invalid');
      $('#input-phone').removeClass('call-master__input--invalid');
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

    if ($fieldLabel.children().hasClass(className)) {
      $fieldLabel.find('.' + className).remove();
    }
  }
})
