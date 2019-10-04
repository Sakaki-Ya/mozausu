export function doubletap() {
    (function (a) {
        a.event.special.doubletap = {
            bindType: "touchend",
            delegateType: "touchend",
            handle: function (e) {
                var d = e.handleObj,
                    f = jQuery.data(e.target),
                    c = new Date().getTime(),
                    g = f.lastTouch ? c - f.lastTouch : 0,
                    b = b == null ? 300 : b;
                if (g < b && g > 30) {
                    f.lastTouch = null;
                    e.type = d.origType;
                    ["clientX", "clientY", "pageX", "pageY"].forEach(function (h) {
                        e[h] = e.originalEvent.changedTouches[0][h]
                    });
                    d.handler.apply(this, arguments)
                } else {
                    f.lastTouch = c
                }
            }
        }
    })(jQuery);
};