"use strict";

var ripple, ripples, RippleEffect, loc, cover, coversize, style, x, y, i, num;
ripples = document.querySelectorAll(".ripple");

RippleEffect = function (b) {
  ripple = this;
  cover = document.createElement("span");
  coversize = ripple.offsetWidth;
  loc = ripple.getBoundingClientRect();
  x = b.pageX - loc.left - window.pageXOffset - coversize / 2;
  y = b.pageY - loc.top - window.pageYOffset - coversize / 2;
  var c = "top:" + y + "px; left:" + x + "px; height:" + coversize + "px; width:" + coversize + "px;";
  ripple.appendChild(cover);
  cover.setAttribute("style", c);
  cover.setAttribute("class", "rp-effect");
  setTimeout(function () {
    var d = document.getElementsByClassName("rp-effect");

    for (var a = d.length - 1; a >= 0; a--) {
      d[a].parentNode.removeChild(d[a]);
    }
  }, 2000);
};

for (i = 0, num = ripples.length; i < num; i++) {
  ripple = ripples[i];
  ripple.addEventListener("mousedown", RippleEffect);
}

;