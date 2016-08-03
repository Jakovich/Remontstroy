$(document).ready(function(){
  var portfolioItem = $(".portfolio__item");
var linkMore = $(".portfolio__more");
var PAGE_SIZE = 1;
var pageNumber = 0;

var portfolioItemInabled = [];
console.log(portfolioItemInabled);
for (var i = 0; i < portfolioItem.length; i++) {
  if (portfolioItem[i].style.display === "none") {
    portfolioItemInabled.push(portfolioItem[i]);
  }
}



function showMore() {
  linkMore.click(function (event) {
    event.preventDefault();
    
    renderReviews(portfolioItemInabled, pageNumber, this);
    pageNumber++;
  });
  console.log(portfolioItemInabled);
}

function renderReviews(arr, page, link) {

  var from = page * PAGE_SIZE;

  var to = from + PAGE_SIZE;
  
  var arrResult = arr.slice(from, to);
  
  for (var i = 0; i < arrResult.length; i++) {
    
    arrResult[i].style.display = "block";
    var photos = arrResult[i].querySelectorAll("img");
    for (var i = 0; i < photos.length; i++) {
      var atr = photos[i].getAttribute("data-src");
      photos[i].setAttribute("src", atr);
    }
  }

  /*arr.slice(from, to).forEach(function (items) {
    items.style.display = "block";
    var photos = items.querySelectorAll("img");
    for (var i = 0; i < photos.length; i++) {
      var atr = photos[i].getAttribute("data-src");
      photos[i].setAttribute("src", atr);
    }
  });*/

  if (page === (arr.length - 1)) {
    link.style.display = "none";
  }

}

showMore();
})


