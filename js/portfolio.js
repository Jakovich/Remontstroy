/**
----
Скрипт для страницы Наши работы (portfolio.html)
----
*/
"use strict";
$(document).ready(function () {
  var portfolioItems = $(".portfolio__item");
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
  функция добавление title к ссылкам на картинки
  */
  
  function addTitle() {
    
    for (var i = 0; i < portfolioItems.length; i++) {
      //берется значение подписи к картинке
      var currentExplic = portfolioItems[i].querySelector('.portfolio__explic');
      var currentText = currentExplic.innerText;
      //добавляется фраза 'ДО и ПОСЛЕ'
      var currentTitle = 'ДО и ПОСЛЕ: ' + currentText;
      var imgBig = portfolioItems[i].querySelector('.portfolio__img-big');
      var imgBigLink = imgBig.querySelector('a');
      var imgSmlWrap = portfolioItems[i].querySelector('.portfolio__left-images');
      var imgSmlLinks = imgSmlWrap.querySelectorAll('a');
      for (var j = 0; j < imgSmlLinks.length; j++) {
        imgSmlLinks[j].setAttribute('title', currentText)
      }
      //вставляется в качестве значения атрибута ссылки, из которого colorbox 
      //берет название к слайду
      imgBigLink.setAttribute('title', currentTitle); 
    }
    
  }
  
  addTitle();
  
  //выбираются все скрытые строчки портфолио, имеющие класс 'portfolio__item--hidden'
  for (var i = 0; i < portfolioItems.length; i++) {
    if (portfolioItems[i].classList.contains('portfolio__item--hidden')) {
      portfolioItemInabled.push(portfolioItems[i]);
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
      var photos = arrResult[j].querySelectorAll("a");
      for (var i = 0; i < photos.length; i++) {
        var atr = photos[i].getAttribute("data-src");
        var img = new Image();
        img.src = atr;
        var currentExplicItem = photos[i].parentNode.parentNode.parentNode;
        var currentExplic = currentExplicItem.querySelector('.portfolio__explic').innerText;
        img.setAttribute('alt', currentExplic);
        photos[i].insertBefore(img, photos[i].firstChild);
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
    var $portfolioItemsVis = $(".portfolio__item:visible");
    $portfolioItemsVis.find('a').colorbox({
      'rel': 'gallery',
      'maxWidth': '90%',
      'transition': 'fade',
      'current': ''
    });
  }

  showMore();
  showColorbox();

})
