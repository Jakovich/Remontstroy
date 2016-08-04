$(document).ready(function () {
  var portfolioItem = $(".portfolio__item");
  var linkMore = $(".portfolio__more");
  var PAGE_SIZE = 3;
  var pageNumber = 0;

  var portfolioItemInabled = [];

  for (var i = 0; i < portfolioItem.length; i++) {
    if (portfolioItem[i].style.display === "none") {
      portfolioItemInabled.push(portfolioItem[i]);
    }
  }

  function showMore() {
    linkMore.click(function (event) {
      event.preventDefault();
      renderPhotos(portfolioItemInabled, pageNumber, this);
      pageNumber++;
    });
  }

  function renderPhotos(arr, page, link) {

    var from = page * PAGE_SIZE;

    var to = from + PAGE_SIZE;

    var arrResult = arr.slice(from, to);
    console.log(arrResult);

    for (var j = 0; j < arrResult.length; j++) {
      arrResult[j].style.display = "block";
      var photos = arrResult[j].querySelectorAll("img");
      for (var i = 0; i < photos.length; i++) {
        var atr = photos[i].getAttribute("data-src");
        photos[i].setAttribute("src", atr);
      }
    }

    if (!(page < Math.floor((arr.length - 1) / PAGE_SIZE))) {
      link.style.display = "none";
    }

    showColorbox();

  }




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
