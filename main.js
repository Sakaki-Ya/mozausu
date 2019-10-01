"use strict";

function _instanceof(left, right) {
    if (
        right != null &&
        typeof Symbol !== "undefined" &&
        right[Symbol.hasInstance]
    ) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

var canvas = new fabric.Canvas("c"); // fabric.textureSize = 4096;

/**
 * 画像ファイル読込
 * 参考コード https://b.0218.jp/20150119133328.html
 */

var imgType;
$("#file").on("change", function (e) {
    $("#view, #notImg, #overSize, #footer").hide();
    reset();
    var file = e.target.files;
    var fileType = file[0].type;
    var imgSize = file[0].size;

    if (!fileType.match("image.*")) {
        $("#notImg").fadeIn();
        $("#file")[0].value = "";
        return;
    }

    if (imgSize > 1500000) {
        $("#overSize").fadeIn();
        $("#file")[0].value = "";
        return;
    }

    var fr = new FileReader(e);

    fr.onload = function (e) {
        if (fileType.match("image.png")) imgType = "png";
        input(e.target.result);
        $("#view").show();
        viewIn();
        $("#list").scrollLeft(0);
        arrowVisibility();
        var optHeight = $("#optPanel").outerHeight();
        $("#cnvArea").css("padding-bottom", optHeight);
    };

    fr.readAsDataURL(e.target.files[0]);
});
/**
 * ベース画像を Canvas に描画
 * @param url 画像URL
 * @return void
 */

var input = function input(url) {
    fabric.Image.fromURL(url, function (origImg) {
        resizeToCanvas(origImg);
        canvas.add(origImg).renderAll();
        canvas.selection = origImg.selectable = false;
    });
};
/**
 * Canvas のサイズに合わせて画像をリサイズ
 * @return void
 */

var resizeToCanvas = function resizeToCanvas(imgObj) {
    canvas.setWidth($(".container").width());
    var resizeScale = canvas.width / imgObj.width;
    imgObj.scale(resizeScale);
    canvas.setHeight(imgObj.height * resizeScale);
};
/**
 * ウインドウサイズのリサイズに合わせてキャンバスと描画済みオブジェクトをリサイズ
 */

var mode = "";
$(window).on("resize", function () {
    return resize();
});

var resize = function resize() {
    if ($("#view").is(":visible") && mode === "") {
        canvas.setWidth($(".container").width());
        var obj = canvas.getObjects();
        var origImg = obj[0];
        var resizeScale = canvas.width / origImg.width;

        for (var i = 0; i < obj.length; i++) {
            obj[i].scale(resizeScale);
            canvas.setHeight(obj[i].height * resizeScale);
        }

        arrowVisibility();
        var optHeight = $("#optPanel").outerHeight();
        $("#cnvArea").css("padding-bottom", optHeight);
    }
};
/**
 * ブラー適用選択指定ツール起動
 */

$("#select").on("click", function () {
    if ($("#select").prop("checked")) {
        selectArea();
        return;
    }

    clear();
});
/**
 * ブラー適用範囲指定ツール
 * 参考コード http://jsfiddle.net/durga598/3rwxzwc3/1/
 */

var selectArea = function selectArea() {
    canvas.hoverCursor = "crosshair";
    mode = "add";
    canvas.on("mouse:down", down);
    canvas.on("mouse:dblclick", copyObj);
    $("canvas").on("doubletap", copyObj);
};

var stroke, circle;
var down = function down(e) {
    var pos = canvas.getPointer(e);

    if (mode === "add") {
        stroke = new fabric.Polygon(
            [
                {
                    x: pos.x,
                    y: pos.y
                }
            ],
            {
                left: pos.x,
                top: pos.y,
                fill: false,
                stroke: "rgba(0,177,235,.87)",
                strokeWidth: 2,
                objectCaching: false
            }
        );
        canvas.add(stroke);
        mode = "edit";
        canvas.on("mouse:move", move);
    }

    if (mode === "edit") {
        var points = stroke.get("points");
        points.push({
            x: pos.x,
            y: pos.y
        });
    }

    if (mode === "add" || mode === "edit") {
        circle = new fabric.Circle({
            left: pos.x,
            top: pos.y,
            originX: "center",
            originY: "center",
            fill: "rgba(0,87,145,.87)",
            radius: 4,
            selectable: false
        });
        canvas.add(circle);
    }
};

var move = function move(e) {
    if (mode == "edit") {
        var pos = canvas.getPointer(e);
        var points = stroke.get("points");
        points[points.length - 1].x = pos.x;
        points[points.length - 1].y = pos.y;
        canvas.renderAll();
    }
};
/**
 * ブラー用に画像オブジェクトをコピー
 * 参考コード http://fabricjs.com/copypaste
 */

var copyObj = function copyObj() {
    var obj = canvas.getObjects();
    var origImg = obj[0];
    origImg.clone(function (copy) {
        copy.set({
            scaleX: origImg.scaleX,
            scaleY: origImg.scaleY
        });
        copy.selectable = false;
        clippingObj(copy);
    });
};
/**
 * ブラー用画像オブジェクトから指定した範囲を切り抜き
 * 参考コード http://fabricjs.com/clippath-part1
 */

var clippingObj = function clippingObj(copy) {
    var polygon = new fabric.Polygon(stroke.get("points"));
    var polyScale = copy.width / (copy.width * copy.scaleX);
    polygon.scale(polyScale);
    polygon.set({
        left: -(copy.width / 2) + polygon.left * polyScale,
        top: -(copy.height / 2) + polygon.top * polyScale
    });
    copy.clipPath = polygon;
    canvas.remove(stroke);
    var obj = canvas.getObjects();

    for (var i = 1; i < obj.length; i++) {
        canvas.remove(obj[i]);
    }

    $("#select").prop("disabled", true);
    $("#onOff").prop("disabled", false);
    $("#value")[0].value = 0.25;
    mode = "";
    canvas.hoverCursor = "all-scroll";
    $(".valueItem").show();
    valueIn();
    blurObj(copy);
};
/**
 * 切り抜いた画像オブジェクトにブラーを適用
 */

var blurObj = function blurObj(copy) {
    var filter = new fabric.Image.filters.Blur({
        blur: parseFloat($("#value").val())
    });
    copy.filters.push(filter);
    copy.applyFilters();
    canvas.add(copy).renderAll();
    $("#value").on(
        "input",
        {
            copy: copy
        },
        slide
    );
};
/**
 * スライダー操作でブラーの強さを調節
 */

var slide = function slide(e) {
    return blurValue(e.data.copy, parseFloat(e.target.value, 10));
};

var blurValue = function blurValue(copy, value) {
    var obj = canvas.getObjects();
    var bulrCache = obj[1];
    copy.filters[0]["blur"] = value;
    copy.applyFilters();
    canvas
        .remove(bulrCache)
        .add(copy)
        .renderAll();
};
/**
 * ズームボタン
 */

var zoom = canvas.getZoom();
$("#zoomIn").on("click", function () {
    if (zoom < 2) {
        zoom += 0.1;
        canvas.setZoom(zoom);
    }
});
$("#zoomOut").on("click", function () {
    if (zoom > 0.5) {
        zoom -= 0.1;
        canvas.setZoom(zoom);
    }
});
/**
 * ドラッグでキャンバス内の表示位置を調整
 */

var panning;
var prevX;
var prevY;
canvas.on("mouse:down", function (e) {
    if (canvas.hoverCursor === "all-scroll") {
        panning = true;

        if (_instanceof(e.e, TouchEvent)) {
            var _e$e$touches$ = e.e.touches[0],
                clientX = _e$e$touches$.clientX,
                clientY = _e$e$touches$.clientY;
            prevX = clientX;
            prevY = clientY;
        }
    }
});
canvas.on("mouse:move", function (e) {
    if (panning) {
        var delta;

        if (_instanceof(e.e, TouchEvent)) {
            var _e$e$touches$2 = e.e.touches[0],
                clientX = _e$e$touches$2.clientX,
                clientY = _e$e$touches$2.clientY;
            delta = new fabric.Point(clientX - prevX, clientY - prevY);
            prevX = clientX;
            prevY = clientY;
            canvas.relativePan(delta);
            return;
        }

        delta = new fabric.Point(e.e.movementX, e.e.movementY);
        canvas.relativePan(delta);
    }
});
canvas.on("mouse:up", function () {
    panning = false;
});
/**
 * ブラーを一時off
 */

$("#onOff").on("click", function () {
    var obj = canvas.getObjects();
    if (!obj.length === 2) return;
    var blurObj = obj[1];

    if ($("#onOff").prop("checked") === true) {
        blurObj.opacity = 0;
        canvas
            .remove(blurObj)
            .add(blurObj)
            .renderAll();
        return;
    }

    blurObj.opacity = 1;
    canvas
        .remove(blurObj)
        .add(blurObj)
        .renderAll();
});
/**
 * ストロークとブラーオブジェクトをクリア
 */

$("#clear").on("click", function () {
    return clear();
});

var clear = function clear() {
    var obj = canvas.getObjects();
    var origImg = obj[0];
    reset();
    canvas.add(origImg).renderAll();
    origImg.selectable = false;

    if ($(".valueItem").is(":visible")) {
        valueOut();
        $(".valueItem").fadeOut(700);
    }
};
/**
 * 拡大率、チェックボックス、スライダー、カーソル、範囲指定ツールのモード、イベントハンドラをクリア
 */

var reset = function reset() {
    canvas.clear();
    zoom = 1;
    canvas.setZoom(zoom);
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    $("#select").prop("disabled", false);
    $("#select").prop("checked", false);
    $("#onOff").prop("disabled", true);
    $("#onOff").prop("checked", false);
    $("#value")[0].value = 0.25;
    canvas.hoverCursor = "all-scroll";
    mode = "";
    canvas
        .off("mouse:down", down)
        .off("mouse:move", move)
        .off("mouse:dblclick", copyObj);
    $("canvas").off("doubletap", copyObj);
    $("#value").off("input", slide);
};
/**
 * 画像保存
 */

$("#dl").on("click", function () {
    // const lastZoom = canvas.getZoom()
    // const lastVpt = canvas.getVpCenter();
    zoom = 1;
    canvas.setZoom(zoom);
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    var obj = canvas.getObjects();
    var origImg = obj[0];
    canvas.width = origImg.width;
    canvas.height = origImg.height;
    var resizeScale = canvas.width / origImg.width;

    for (var i = 0; i < obj.length; i++) {
        obj[i].scale(resizeScale);
    }

    if (imgType === "png") {
        var _dataURL = canvas.toDataURL({
            format: "png"
        });

        imgDownload(
            _dataURL
            /* , lastZoom, lastVpt */
        );
        return;
    }

    var dataURL = canvas.toDataURL({
        format: "jpeg",
        quality: 1
    });
    imgDownload(
        dataURL
        /* , lastZoom, lastVpt */
    );
});

var imgDownload = function imgDownload(
    dataURL
    /* , lastZoom, lastVpt */
) {
    var origName = $("#file")[0].files[0].name;
    var a = document.createElement("a");
    a.href = dataURL;
    a.download = "mozausu-" + origName;
    a.click(); // zoom = canvas.getZoom();
    // canvas.setZoom(lastZoom);
    // console.log(lastVpt);

    resize();
};
/**
 * キャンバスを閉じる
 */

$("#close").on("click", async function () {
    if ($(".valueItem").is(":visible")) {
        valueOut();
        $(".valueItem").fadeOut();
    }

    await viewOut();
    $("#view").hide();
    reset();
    $("#footer").fadeIn();
    $("#file")[0].value = "";
});
/**
 * オプションボタン両端の矢印表示制御
 */

$("#list").scroll(function () {
    return arrowVisibility();
});

var arrowVisibility = function arrowVisibility() {
    var scrollPosition = $("#list").scrollLeft();
    var maxPostion =
        $("#list").get(0).scrollWidth - $("#list").get(0).clientWidth;
    var leftVisibility = "visible";
    var rightVisibility = "visible";
    if (scrollPosition === 0) leftVisibility = "hidden";
    if (scrollPosition === maxPostion) rightVisibility = "hidden";
    $("#arrowLeft").css("visibility", leftVisibility);
    $("#arrowRight").css("visibility", rightVisibility);
};
/**
 * 矢印ボタンのスクロール制御
 */

$("#arrowLeft").on("click", function () {
    var scrollPosition = $("#list").scrollLeft();

    if (scrollPosition > 0) {
        $("#list").scrollLeft(scrollPosition - 40);
        return;
    }

    $("#list").scrollLeft(0);
});
$("#arrowRight").on("click", function () {
    var scrollPosition = $("#list").scrollLeft();
    var maxScroll = $("#list").get(0).scrollWidth - $("#list").get(0).clientWidth;

    if (scrollPosition < maxScroll) {
        $("#list").scrollLeft(scrollPosition + 40);
        return;
    }

    $("#list").scrollLeft(maxScroll);
});
/**
 * モーダルウィンドウ
 */

var modal = 0;
$("#openHowto").on("click", function () {
    $("#video").prop("src", "https://www.youtube.com/embed/lnz3_87nbqM");
    $("#howto").show();
    $("body").prop("id", "inModal");
    modal = 1;
    modalIn($("#howto")[0]);
});
$("#openPolicy").on("click", function () {
    $("#policy").show();
    $("body").prop("id", "inModal");
    modal = 1;
    modalIn($("#policy")[0]);
});
$(".closeModals").on("click", function () {
    if ($("#howto").is(":visible")) closeModal($("#howto")[0]);
    if ($("#policy").is(":visible")) closeModal($("#policy")[0]);
});
$(window).on("click", function (e) {
    if ($(e.target).closest("#modalArea").length) return;
    modal += 1;

    if (modal === 3) {
        if ($("#howto").is(":visible")) closeModal($("#howto")[0]);
        if ($("#policy").is(":visible")) closeModal($("#policy")[0]);
    }
});

var closeModal = function closeModal(modalWindow) {
    modalOut(modalWindow);
    $(modalWindow).fadeOut(700);
    $("#video").prop("src", "");
    $("body").removeAttr("id", "inModal");
    modal = 0;
};
/**
 * モーショングラフィックス
 */

var viewIn = function viewIn() {
    anime({
        targets: "canvas",
        scale: [0, 1]
    }),
        anime({
            targets: "#list li, .arrow",
            translateY: ["+=600px", "0"],
            delay: anime.stagger(55)
        });
};

var valueIn = function valueIn() {
    anime({
        targets: ".valueItem",
        translateX: ["-=1200px", "0%"],
        duration: 1200,
        easing: "spring(1, 100, 13, 30)"
    });
};

var valueOut = function valueOut() {
    anime({
        targets: ".valueItem",
        translateX: ["0%", "+=1200px"],
        duration: 900,
        easing: "spring(1, 100, 13, 30)"
    });
};

var viewOut = function viewOut() {
    return (
        anime({
            targets: "canvas",
            scale: [1, 0],
            duration: 400
        }),
        anime({
            targets: "#list li, .arrow",
            translateY: ["0%", "+=600px"],
            delay: anime.stagger(55),
            duration: 400
        }).finished
    );
};

var modalIn = function modalIn(obj) {
    anime({
        targets: obj,
        translateY: ["-=600px", "0%"]
    });
};

var modalOut = function modalOut(obj) {
    anime({
        targets: obj,
        translateY: ["0%", "+=600px"],
        duration: 900
    });
};
