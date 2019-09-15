(function (a) { a.fn.ripple = function (i) { if (this.length > 1) { return this.each(function (x, y) { a(y).ripple(i) }) } i = i || {}; this.off(".ripple").data("unbound", true); if (i.unbind) { return this } var m = function () { return q && !q.data("unbound") }; this.addClass("legitRipple").removeData("unbound").on("tap.ripple", function (x) { if (!m()) { q = a(this); h(x.coords) } }).on("dragstart.ripple", function (x) { if (!f.allowDragging) { x.preventDefault() } }); a(document).on("move.ripple", function (x) { if (m()) { r(x.coords) } }).on("end.ripple", function () { if (m()) { t() } }); a(window).on("scroll.ripple", function (x) { if (m()) { t() } }); var w, b = function (x) { return !!x.type.match(/^touch/) }, p = function (x, y) { if (b(x)) { x = k(x.originalEvent.touches, y) } return [x.pageX, x.pageY] }, k = function (x, y) { return a.makeArray(x).filter(function (A, z) { return A.identifier == y })[0] }, o = 0, n = function (y) { if (y.type == "touchstart") { o = 3 } if (y.type == "scroll") { o = 0 } var x = o && !b(y); if (x) { o-- } return !x }, j, c, l; this.on("mousedown.ripple touchstart.ripple", function (x) { if (n(x)) { w = b(x) ? x.originalEvent.changedTouches[0].identifier : -1; j = a(this); c = a.Event("tap", { coords: p(x, w) }); if (~w) { l = setTimeout(function () { j.trigger(c); l = null }, f.touchDelay) } else { j.trigger(c) } } }); a(document).on("mousemove.ripple touchmove.ripple mouseup.ripple touchend.ripple touchcancel.ripple", function (y) { var x = y.type.match(/move/); if (l && !x) { clearTimeout(l); l = null; j.trigger(c) } if (n(y) && (b(y) ? k(y.originalEvent.changedTouches, w) : !~w)) { a(this).trigger(x ? a.Event("move", { coords: p(y, w) }) : "end") } }).on("contextmenu.ripple", function (x) { n(x) }).on("touchmove", function () { clearTimeout(l); l = null }); var q, g, f = {}, d, v, e = 0, u = function () { var x = { fixedPos: null, get m() { return !f.fixedPos }, get adaptPos() { return f.dragging }, get maxDiameter() { return Math.sqrt(Math.pow(d[0], 2) + Math.pow(d[1], 2)) / q.outerWidth() * Math.ceil(f.adaptPos ? 100 : 200) + "%" }, scaleMode: "fixed", template: null, allowDragging: false, touchDelay: 100, callback: null }; a.each(x, function (y, z) { f[y] = y in i ? i[y] : z }) }, h = function (z) { d = [q.outerWidth(), q.outerHeight()]; u(); v = z; g = a("<span/>").addClass("legitRipple-ripple"); if (f.template) { g.append((typeof f.template === "object" ? f.template : q.children(".legitRipple-template").last()).clone().removeClass("legitRipple-template")).addClass("legitRipple-custom") } g.appendTo(q); s(z, false); var y = g.css("transition-duration").split(","), x = [parseFloat(y[0]) * 5.5 + "s"].concat(y.slice(1)).join(","); g.css("transition-duration", x).css("width", f.maxDiameter); g.on("transitionend webkitTransitionEnd oTransitionEnd", function () { if (a(this).data("oneEnded")) { a(this).off().remove() } else { a(this).data("oneEnded", true) } }) }, r = function (x) { var y; e++; if (f.scaleMode === "proportional") { var z = Math.pow(e, e / 100 * 0.6); y = z > 40 ? 40 : z } else { if (f.scaleMode == "fixed") { if (Math.abs(x[1] - v[1]) > 6) { t(); return } } } s(x, y) }, t = function () { g.css("width", g.css("width")).css("transition", "none").css("transition", "").css("width", g.css("width")).css("width", f.maxDiameter).css("opacity", "0"); q = null; e = 0 }, s = function (F, z) { var C = [], D = f.fixedPos === true ? [0.5, 0.5] : [(f.fixedPos ? f.fixedPos[0] : F[0] - q.offset().left) / d[0], (f.fixedPos ? f.fixedPos[1] : F[1] - q.offset().top) / d[1]], x = [0.5 - D[0], 0.5 - D[1]], A = [(100 / parseFloat(f.maxDiameter)), (100 / parseFloat(f.maxDiameter)) * (d[1] / d[0])], y = [x[0] * A[0], x[1] * A[1]]; var G = f.dragging || e === 0; if (G && q.css("display") == "inline") { var E = a("<span/>").text("Hi!").css("font-size", 0).prependTo(q), B = E.offset().left; E.remove(); C = [F[0] - B + "px", F[1] - q.offset().top + "px"] } if (G) { g.css("left", C[0] || D[0] * 100 + "%").css("top", C[1] || D[1] * 100 + "%") } g.css("transform", "translate3d(-50%, -50%, 0)" + (f.adaptPos ? "translate3d(" + y[0] * 100 + "%, " + y[1] * 100 + "%, 0)" : "") + (z ? "scale(" + z + ")" : "")); if (f.callback) { f.callback(q, g, D, f.maxDiameter) } }; return this }; a.ripple = function (b) { a.each(b, function (c, d) { a(c).ripple(d) }) }; a.ripple.destroy = function () { a(".legitRipple").removeClass("legitRipple").add(window).add(document).off(".ripple"); a(".legitRipple-ripple").remove() } }(jQuery));