/**
----
Скрипт для страницы Наши работы (portfolio.html)
----
*/
"use strict";
$(document).ready(function () {
  var portfolioItem = $(".portfolio__item");
  var linkMore = $(".portfolio__more");
  
  /**
   кол-во новых элементов для показа
   * @const
   * @type {number}
   */
  var PAGE_SIZE = 3;
  
  /** 
   * @const
   * @type {number}
   */
  var pageNumber = 0;

  var portfolioItemInabled = [];
  
  /** 
  функция добавление title к картинкам до/после
  */
  
  function addTitle() {
    var explic = document.querySelectorAll(".portfolio__right-images");
    for (var i = 0; i < explic.length; i++) {
      //берется значение подписи к картинке
      var currentExplic = explic[i].querySelector('.portfolio__explic');
      //добавляется фраза 'ДО и ПОСЛЕ'
      var currentTitle = 'ДО и ПОСЛЕ: ' + currentExplic.innerText;
      var currentLink = explic[i].querySelector('a');
      //вставляется в качестве значения атрибута ссылки, из которого colorbox 
      //берет название к слайду
      currentLink.setAttribute('title', currentTitle); 
    }
    
  }
  
  addTitle();
  
  //выбираются все скрытые строчки портфолио, имеющие класс 'portfolio__item--hidden'
  for (var i = 0; i < portfolioItem.length; i++) {
    if (portfolioItem[i].classList.contains('portfolio__item--hidden')) {
      portfolioItemInabled.push(portfolioItem[i]);
    }
  }


  /**
  
  функция постраничного показа примеров работ
  * @param {array} arr
  * @param {number} page
  * @param {HTMLElement} link
  */

  function renderPhotos(arr, page, link) {

    var from = page * PAGE_SIZE;

    var to = from + PAGE_SIZE;

    var arrResult = arr.slice(from, to);

    for (var j = 0; j < arrResult.length; j++) {
      arrResult[j].classList.remove("portfolio__item--hidden");
      var photos = arrResult[j].querySelectorAll("img");
      for (var i = 0; i < photos.length; i++) {
        var atr = photos[i].getAttribute("data-src");
        photos[i].setAttribute("src", atr);
      }
    }
    //скрытие кнопки "Смотреть еще", если больше нет элементов к показу
    if (!(page < Math.floor((arr.length - 1) / PAGE_SIZE))) {
      link.style.display = "none";
    }
    //запуск галареи colorbox
    showColorbox();

  }
  
  /**
  функция показа следующей страницы при нажатии на кнопку "Смотрите еще"
  */
  
  function showMore() {
    linkMore.click(function (event) {
      event.preventDefault();
      renderPhotos(portfolioItemInabled, pageNumber, this);
      pageNumber++;
    });
  }
  
  /**
  инициализация галереи colorbox для всех видимых строк портфолио
  */
  
  function showColorbox() {
    var $portfolioItems = $(".portfolio__item:visible");
    $portfolioItems.find('a').colorbox({
      'rel': 'gallery',
      'maxWidth': '90%',
      'transition': 'fade',
      'current': ''
    });
  }

  showMore();
  showColorbox();

})
