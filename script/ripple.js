export function ripple() {
    let ripple, ripples, RippleEffect, loc, cover, coversize, style, x, y, i, num;
    ripples = document.querySelectorAll(".ripple");
    RippleEffect = function (a) {
        ripple = this;
        cover = document.createElement("span");
        coversize = ripple.offsetWidth;
        loc = ripple.getBoundingClientRect();
        x = a.pageX - loc.left - window.pageXOffset - (coversize / 2);
        y = a.pageY - loc.top - window.pageYOffset - (coversize / 2);
        var pos = "top:" + y + "px; left:" + x + "px; height:" + coversize + "px; width:" + coversize + "px;";
        ripple.appendChild(cover);
        cover.setAttribute("style", pos);
        cover.setAttribute("class", "rp-effect");
        setTimeout(function () {
            let list = document.getElementsByClassName("rp-effect");
            for (let i = list.length - 1; i >= 0; i--) {
                list[i].parentNode.removeChild(list[i])
            }
        }, 2000)
    };
    for (i = 0, num = ripples.length; i < num; i++) {
        ripple = ripples[i];
        ripple.addEventListener("mousedown", RippleEffect)
    }
};