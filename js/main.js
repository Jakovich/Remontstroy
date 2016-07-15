
"use strict";
$(document).ready(function(e) {
	$('.reviews__cboxExample').colorbox({
      'rel' : 'gal',
      'maxWidth' : '95%',
      'current' : ''
    });
    $('.reviews__cboxFeedback').colorbox({
      'rel' : 'gal2',
      'maxWidth' : '95%',
      'current' : ''
    });
    $('#input-phone').inputmask("+7 (999) 999-9999");
  
  // Респонсивный ColorBox
  jQuery.colorbox.settings.maxWidth  = '95%';
  jQuery.colorbox.settings.maxHeight = '95%';
  
  // Функция ресайза ColorBox
  var resizeTimer;
  function resizeColorBox()
  {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (jQuery('#cboxOverlay').is(':visible')) {
        jQuery.colorbox.load(true);
      }
    }, 300);
  }
  
  // Ресайз при изменении размера окна браузера и
  // изменении ориентации мобильного устроиства
  jQuery(window).resize(resizeColorBox);
  window.addEventListener("orientationchange", resizeColorBox, false);
});