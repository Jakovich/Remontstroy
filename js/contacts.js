/*
----
Скрипт для страницы Контакты (contacts.html)
----
*/

"use strict";
$(document).ready(function() {

  /**
  Инициализация яндекс карты
  --------------------------------
  */
  
  ymaps.ready(init);
  
  var myMap;
  var myPlacemark;

  function init() {
    //создание карты
    myMap = new ymaps.Map("yandex-map", {
      center: [55.78727, 37.635817],
      zoom: 12,
      controls: ["zoomControl", "fullscreenControl"]
    });
    //создание метки на карте 
    myPlacemark = new ymaps.Placemark(
          [55.78727, 37.635817], {
        name: 'OOO "Ремонтстрой"',
        description: 'Адрес: г. Москва, Проспект Мира, д. 68, строение 3, офис 10Б',

        balloonContent: '<b>Компания:</b> ООО "Ремонтстрой"<br> <b>Адрес:</b> г. Москва, Проспект Мира, д. 68,<br>строение 3, офис 10Б',
        iconCaption: 'OOO "Ремонтстрой"'
      }, {
        preset: 'islands#redDotIconWithCaption',
        balloonPanelMaxMapArea: 0,
        closeButton: true
      }

    );
    //добавление метки на карту
    myMap.geoObjects.add(myPlacemark);

  }

  
  /**
    Валидация формы на странице
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
  var $inputedPhone = $('.contacts-form [name=phone]').val();
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
  var $inputedName = $('.contacts-form [name=name]').val();
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
  $('#contacts-phone').inputmask("+7 (999) 999-9999", {
    "onincomplete": function () {
      var $currentPhone = $('.contacts-form [name=phone]').val();
      if ($currentPhone === '') {
        validPhone = 0;
      } else {
        validPhone = 1;
      }
    },
    "oncomplete": function () {
      validPhone = 2;
      $(this).removeClass('contacts-form__input--invalid');
      removeErr('contacts-phone', 'contacts-form__errorMsg');
    },
    "onKeyValidation": function () {
      removeErr('contacts-phone', 'contacts-form__errorMsg');
    }
  });

  //добавление маски на поле имя
  $('#contacts-name').inputmask("a{2,20} [aa{2,20}]", {
    "onincomplete": function () {
      var $currentName = $('.contacts-form [name=name]').val();
      if ($currentName === '') {
        validName = 0;
      } else {
        validName = 1;
      }

    },

    "oncomplete": function () {
      validName = 2;
      $(this).removeClass('contacts-form__input--invalid');
      removeErr('contacts-name', 'contacts-form__errorMsg');
    },
    "onKeyValidation": function () {
      removeErr('contacts-name', 'contacts-form__errorMsg');
    },
    "placeholder": " ",
    "showMaskOnHover": false
  });



  //валидация формы при нажатии на кнопку отправить
  $('.contacts-form__btn').click(function (evt) {
    //проверка заполненности поля телефон
    if (validPhone === 0) {
      evt.preventDefault();
      $('#contacts-phone').addClass('contacts-form__input--invalid');

      if (!$("label[for='contacts-phone']").children().hasClass("contacts-form__errorMsg")) {
        showErr('contacts-phone', 'contacts-form__errorMsg', true, 'Введите номер телефона');
      }
    } else if (validPhone === 1) {
      evt.preventDefault();
      $('#contacts-phone').addClass('contacts-form__input--invalid');

      if (!$("label[for='contacts-phone']").children().hasClass("contacts-form__errorMsg")) {
        showErr('contacts-phone', 'contacts-form__errorMsg', true, 'Введите номер полностью');
      }
    }
    //проверка заполненности поля имя
    if (validName === 0) {
      evt.preventDefault();
      $('#contacts-name').addClass('contacts-form__input--invalid');
      if (!$("label[for='contacts-name']").children().hasClass("contacts-form__errorMsg")) {
        showErr('contacts-name', 'contacts-form__errorMsg', true, 'Введите имя');
      }
    } else if (validName === 1) {
      evt.preventDefault();
      $('#contacts-name').addClass('contacts-form__input--invalid');
      if (!$("label[for='contacts-name']").children().hasClass("contacts-form__errorMsg")) {
        showErr('contacts-name', 'contacts-form__errorMsg', true, 'Введите имя минимум из 2 букв');
      }
    }
  });

  
  
  /**
    удаление сообщения об ошибки и класса, 
    сообщающего об ошибке при клике вне формы
  */

  $(document).mouseup(function(e) {
    var currentForm = $('.contacts-form'); // тут указываем ID элемента
    if (!currentForm.is(e.target) // если клик был не по нашему блоку
      && currentForm.has(e.target).length === 0) { // и не по его дочерним элементам
      removeErr('contacts-name', 'contacts-form__errorMsg');
      removeErr('contacts-phone', 'contacts-form__errorMsg');
      $('#contacts-name').removeClass('contacts-form__input--invalid');
      $('#contacts-phone').removeClass('contacts-form__input--invalid');
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
