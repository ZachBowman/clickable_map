// Smooth Vertical Scrolling Animation

// Set the contents via html.
// #scroller is the outside scroll area, and must have position: relative.
// #scroll_inside is the inner div, which contains the content.  It must have position: absolute.
// #scroll_inside must be at least half the height of #scroller, or there will be a noticeable pop-in.

$(document).ready (function ()
  {
  //var y = 0;
  //var y = parseInt ($("#scroll_inside").css ("top"));

  var scroll_area_height    = document.getElementById ("scroller").offsetHeight;
  var scroll_element_height = document.getElementById ("scroll_inside").offsetHeight;

  $("#scroll_inside").clone().appendTo ("#scroller").attr ("id", "scroll_inside2");
  $("#scroll_inside2").css ("top", scroll_element_height);

  window.setInterval (function ()
    {
    scroll ("#scroll_inside")
    scroll ("#scroll_inside2")
    }, 50);

  function scroll (element)
    {
    var y = parseInt ($(element).css ("top"));
    y += 1;
    if (y > scroll_area_height) y -= (scroll_element_height * 2);
    $(element).css ("top", y);
    }
  });
