/**
----
Скрипт для страницы Отзывы (reviews.html)
----
*/

"use strict";
$(document).ready(function() {
  /**
    иницилизация галереи colorbox для всех ссылок,
    расположенных внутри блока '.reviews__images'
  */
  $('.reviews__images').find('a').colorbox({
    'rel': 'gallery',
    'maxWidth': '90%',
    'transition': 'fade',
    'current': '{current} отзыв из {total}'
  });
});
