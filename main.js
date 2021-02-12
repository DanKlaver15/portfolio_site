"use strict";

var edgeSize = 200;
var timer = null;

window.addEventListener("mousemove", handleMousemove, false);

function handleMousemove(event) {

  var viewportX = event.clientX;
  var viewportY = event.clientY;

  var viewportWidth = document.documentElement.clientWidth;
  var viewportHeight = document.documentElement.clientHeight;

  var edgeTop = edgeSize;
  var edgeBottom = ( viewportHeight - edgeSize );
  
  var edgeLeft = edgeSize;
  var edgeRight = (viewportWidth - edgeSize);
  var isInLeftEdge = (viewportX < edgeLeft);
  var isInRightEdge = (viewportX > edgeRight);

  if (!(isInLeftEdge || isInRightEdge)) {
    clearTimeout(timer);
    return;
  }

  var documentWidth = Math.max(
    document.body.scrollWidth,
    document.body.offsetWidth,
    document.body.clientWidth,
    document.documentElement.scrollWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );

  var documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.body.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
 );

  var maxScrollX = (documentWidth - viewportWidth);
  var maxScrollY = ( documentHeight - viewportHeight );

  (function checkForWindowScroll() {
    clearTimeout(timer);
    if (adjustWindowScroll()) {
      timer = setTimeout(checkForWindowScroll, 30 );
    }
  })();

  function adjustWindowScroll() {
    var currentScrollX = window.pageXOffset;
    var currentScrollY = window.pageYOffset;
    var canScrollLeft = (currentScrollX > 0);
    var canScrollRight = (currentScrollX < maxScrollX);
    var nextScrollX = currentScrollX;
    var nextScrollY = currentScrollY;
    var maxStep = 50;

    if (isInLeftEdge && canScrollLeft) {
      var intensity = ((edgeLeft - viewportX) / edgeSize);
      nextScrollX = (nextScrollX - ( maxStep * intensity));
    } 
    else if (isInRightEdge && canScrollRight) {
      var intensity = ((viewportX - edgeRight) / edgeSize);
      nextScrollX = (nextScrollX + (maxStep * intensity));
    }

    nextScrollX = Math.max(0, Math.min( maxScrollX, nextScrollX));
    nextScrollY = Math.max( 0, Math.min( maxScrollY, nextScrollY ) );

    if (nextScrollX !== currentScrollX) {
      window.scrollTo(nextScrollX, nextScrollY);
      return( true );
    } 
    else {
      return( false );
    }
  }
}