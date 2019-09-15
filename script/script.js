const canvas = new fabric.Canvas("c");
// fabric.textureSize = 4096;

/**
 * 画像ファイル読込
 * 参考コード https://b.0218.jp/20150119133328.html
 */
let imgType;
$("#file").on("change", (e) => {
    $("#view, #notImg, #overSize, #footer").hide();
    reset();
    const file = e.target.files;
    const fileType = file[0].type;
    const imgSize = file[0].size;
    if (!fileType.match("image.*")) {
        $("#notImg").show();
        $("#file")[0].value = "";
        return;
    };
    if (imgSize > 1500000) {
        $("#overSize").show();
        $("#file")[0].value = "";
        return;
    };
    const fr = new FileReader(e);
    fr.onload = (e) => {
        if (fileType.match("image.png"))
            imgType = "png";
        input(e.target.result);
        $("#view").show();
        viewIn();
        $("#list").scrollLeft(0);
        fixArrowVisibility();
        const optHeight = $("#optPanel").outerHeight();
        $("#cnvArea").css("padding-bottom", optHeight);
    };
    fr.readAsDataURL(e.target.files[0]);
});

/**
 * ベース画像を Canvas に描画
 * @param url 画像URL
 * @return void
 */
const input = url => {
    fabric.Image.fromURL(url, oImg => {
        resizeToCanvas(oImg);
        canvas.clear();
        canvas.add(oImg).renderAll();
        canvas.selection = oImg.selectable = false;
    });
};

/**
 * Canvas のサイズに合わせて画像をリサイズ
 * @return void
 */
const resizeToCanvas = imgObj => {
    canvas.setWidth($(".container").width());
    const resizeScale = canvas.width / imgObj.width;
    imgObj.scale(resizeScale);
    canvas.setHeight(imgObj.height * resizeScale);
};

/**
 * ウインドウサイズのリサイズに合わせてキャンバスと描画済みオブジェクトをリサイズ
 */
let mode = "";
$(window).on("resize", () => resize());
const resize = () => {
    if ($("#view").is(":visible") && mode === "") {
        canvas.setWidth($(".container").width());
        const obj = canvas.getObjects();
        const oImg = obj[0];
        const resizeScale = canvas.width / oImg.width;
        for (let i = 0; i < obj.length; i++) {
            obj[i].scale(resizeScale);
            canvas.setHeight(obj[i].height * resizeScale);
        };
        fixArrowVisibility();
        const optHeight = $("#optPanel").outerHeight();
        $("#cnvArea").css("padding-bottom", optHeight);
    };
};

/**
 * ブラー適用選択指定ツール起動
 */
$("#select").on("click", () => {
    if ($("#select").prop("checked")) {
        checkOnAnime($(".fa-pencil-alt")[0]);
        selectArea();
        return;
    };
    checkOffAnime($(".fa-pencil-alt")[0]);
    clear();
});

/**
 * ブラー適用範囲指定ツール
 * 参考コード http://jsfiddle.net/durga598/3rwxzwc3/1/
 */
const selectArea = () => {
    canvas.hoverCursor = "crosshair";
    mode = "add";
    canvas.on("mouse:down", down);
};
const down = e => {
    const pos = canvas.getPointer(e);
    if (mode === "add") {
        stroke = new fabric.Polygon([{
            x: pos.x,
            y: pos.y
        }], {
            left: pos.x,
            top: pos.y,
            fill: false,
            stroke: "rgba(0, 115, 239, 0.8)",
            strokeWidth: 2,
            objectCaching: false
        });
        canvas.add(stroke);
        mode = "edit";
        canvas.on("mouse:move", move);
    };
    if (mode === "edit") {
        const points = stroke.get("points");
        points.push({
            x: pos.x,
            y: pos.y,
        });
    };
    if (mode === "add" || mode === "edit") {
        circle = new fabric.Circle({
            left: pos.x,
            top: pos.y,
            originX: "center",
            originY: "center",
            fill: "rgba(0, 43, 171, 0.8)",
            radius: 4,
            selectable: false
        });
        canvas.add(circle);
    };
    if (mode === "edit")
        canvas.on("mouse:dblclick", copyObj);
};
const move = e => {
    if (mode == "edit") {
        const pos = canvas.getPointer(e);
        const points = stroke.get("points");
        points[points.length - 1].x = pos.x;
        points[points.length - 1].y = pos.y;
        canvas.renderAll();
    };
};

/**
 * ブラー用に画像オブジェクトをコピー
 * 参考コード http://fabricjs.com/copypaste
 */
const copyObj = () => {
    const obj = canvas.getObjects();
    const oImg = obj[0];
    oImg.clone(copy => {
        copy.set({
            scaleX: oImg.scaleX,
            scaleY: oImg.scaleY
        });
        copy.selectable = false;
        clippingObj(copy);
    });
};

/**
 * ブラー用画像オブジェクトから指定した範囲を切り抜き
 * 参考コード http://fabricjs.com/clippath-part1
 */
const clippingObj = copy => {
    const polygon = new fabric.Polygon(stroke.get("points"));
    const polyScale = copy.width / (copy.width * copy.scaleX);
    polygon.scale(polyScale);
    polygon.set({
        left: (-(copy.width / 2)) + (polygon.left * polyScale),
        top: (-(copy.height / 2)) + (polygon.top * polyScale)
    });
    copy.clipPath = polygon;
    canvas.remove(stroke);
    const obj = canvas.getObjects();
    for (let i = 1; i < obj.length; i++)
        canvas.remove(obj[i]);
    checkOffAnime($(".fa-pencil-alt")[0]);
    checkOnAnime($(".fa-eye-slash")[0]);
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
const blurObj = copy => {
    const filter = new fabric.Image.filters.Blur({
        blur: parseFloat($("#value").val())
    });
    copy.filters.push(filter);
    copy.applyFilters();
    canvas.add(copy).renderAll();

    $("#value").on("input", { copy }, slide);
};

/**
 * スライダー操作でブラーの強さを調節
 */
const slide = e => blurValue(e.data.copy, parseFloat(e.target.value, 10));
const blurValue = (copy, value) => {
    const obj = canvas.getObjects();
    const bulrCache = obj[1];
    copy.filters[0]["blur"] = value;
    copy.applyFilters();
    canvas.remove(bulrCache).add(copy).renderAll();
};

/**
 * キャンバス上のオブジェクトとイベントリスナーを削除、スライダーを初期位置に設定
 */
const reset = () => {
    canvas.clear();
    canvas.off("mouse:down", down).off("mouse:move", move).off("mouse:dblclick", copyObj);
    $("#value").off("input", slide);
    zoom = 1;
    canvas.setZoom(zoom);
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    $("#value")[0].value = 0.25;
    $("#select").prop("disabled", false);
    $("#select").prop("checked", false);
    $("#onOff").prop("disabled", true);
    $("#onOff").prop("checked", false);
    canvas.hoverCursor = "all-scroll";
    mode = "";
};

/**
 * ズームボタン
 */
let zoom = canvas.getZoom();
$("#zoomIn").on("click", () => {
    if (zoom < 2) {
        zoom += .1;
        canvas.setZoom(zoom);
    };
});
$("#zoomOut").on("click", () => {
    if (zoom > .5) {
        zoom -= .1;
        canvas.setZoom(zoom);
    };
});

/**
 * ドラッグでキャンバス内の表示位置を調整
 */
let panning;
let prevX;
let prevY;
canvas.on("mouse:down", e => {
    if (canvas.hoverCursor === "all-scroll") {
        panning = true;
        if (e.e instanceof TouchEvent) {
            const { clientX, clientY } = e.e.touches[0];
            prevX = clientX;
            prevY = clientY;
        };
    };
});
canvas.on("mouse:move", e => {
    if (panning) {
        let delta;
        if (e.e instanceof TouchEvent) {
            const { clientX, clientY } = e.e.touches[0];
            delta = new fabric.Point(clientX - prevX, clientY - prevY);
            prevX = clientX;
            prevY = clientY;
            canvas.relativePan(delta);
            return;
        };
        delta = new fabric.Point(e.e.movementX, e.e.movementY);
        canvas.relativePan(delta);
    };
});
canvas.on("mouse:up", () => {
    panning = false;
});

/**
 * ブラーを一時off
 */
$("#onOff").on("click", () => {
    const obj = canvas.getObjects();
    if (obj.length === 2) {
        const blurObj = obj[1];
        if ($("#onOff").prop("checked") == true) {
            checkOffAnime($(".fa-eye-slash")[0]);
            blurObj.opacity = 0;
            canvas.remove(blurObj).add(blurObj).renderAll();
            return;
        };
        checkOnAnime($(".fa-eye-slash")[0]);
        blurObj.opacity = 1;
        canvas.remove(blurObj).add(blurObj).renderAll();
    };
});

/**
 * ストロークとブラーオブジェクトをクリア
 */
$("#clear").on("click", () => clear());
const clear = async () => {
    const obj = canvas.getObjects();
    const oImg = obj[0];
    canvas.clear();
    canvas.off("mouse:down", down).off("mouse:move", move).off("mouse:dblclick", copyObj);
    $("#value").off("input", slide);
    canvas.add(oImg).renderAll();
    oImg.selectable = false;
    zoom = 1;
    canvas.setZoom(zoom);
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    $("#select").prop("disabled", false);
    $("#select").prop("checked", false);
    $("#onOff").prop("disabled", true);
    $("#onOff").prop("checked", false);
    checkOffAnime($(".fa-pencil-alt")[0]);
    checkOffAnime($(".fa-eye-slash")[0]);
    if ($(".valueItem").is(":visible")) {
        await valueOut();
        $(".valueItem").hide();
    };
    $("#value")[0].value = 0.25;
    canvas.hoverCursor = "all-scroll";
    mode = "";
};

/**
 * 画像保存
 */
$("#dl").on("click", () => {
    // const lastZoom = canvas.getZoom()
    // const lastVpt = canvas.getVpCenter();
    canvas.setZoom(1);
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const obj = canvas.getObjects();
    const oImg = obj[0];
    canvas.width = oImg.width;
    canvas.height = oImg.height;
    const resizeScale = canvas.width / oImg.width;
    for (let i = 0; i < obj.length; i++)
        obj[i].scale(resizeScale);
    if (imgType === "png") {
        const dataURL = canvas.toDataURL({ format: "png" });
        imgDownload(dataURL/* , lastZoom, lastVpt */);
        return;
    };
    const dataURL = canvas.toDataURL({
        format: "jpeg",
        quality: 1
    });
    imgDownload(dataURL/* , lastZoom, lastVpt */);
});
const imgDownload = (dataURL/* , lastZoom, lastVpt */) => {
    const name = $("#file")[0].files[0].name;
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = `mozausu-${name}`;
    a.click();
    // zoom = canvas.getZoom();
    // canvas.setZoom(lastZoom);
    // console.log(lastVpt);
    resize();
};

/**
 * キャンバスを閉じる
 */
$("#close").on("click", () => {
    viewOut();
    $("#view").fadeOut(700);
    $("#file")[0].value = "";
    reset();
    $("#footer").fadeIn(700);
});

/**
 * オプションボタン両端の矢印表示制御
 */
$("#list").scroll(() => fixArrowVisibility());
const fixArrowVisibility = () => {
    const scrollPosition = $("#list").scrollLeft();
    const maxPostion = $("#list").get(0).scrollWidth - $("#list").get(0).clientWidth;
    let arrowLeftVisibility = "visible";
    let arrowRightVisibility = "visible";
    if (scrollPosition === 0)
        arrowLeftVisibility = "hidden";
    if (scrollPosition === maxPostion)
        arrowRightVisibility = "hidden";
    $("#arrowLeft").css("visibility", arrowLeftVisibility);
    $("#arrowRight").css("visibility", arrowRightVisibility);
};

/**
 * 矢印ボタン スクロール制御
 */
$("#arrowLeft").on("click", () => {
    const scrollPosition = $("#list").scrollLeft();
    if (scrollPosition > 0) {
        $("#list").scrollLeft(scrollPosition - 40);
        return;
    };
    $("#list").scrollLeft(0);
});
$("#arrowRight").on("click", () => {
    const scrollPosition = $("#list").scrollLeft();
    const maxScroll = $("#list").get(0).scrollWidth - $("#list").get(0).clientWidth;
    if (scrollPosition < maxScroll) {
        $("#list").scrollLeft(scrollPosition + 40);
        return;
    };
    $("#list").scrollLeft(maxScroll);
});

/**
* モーダルウィンドウ
*/
let modal = 0;
$("#howtoBtn").on("click", () => {
    $("body").attr("id", "inModal");
    $("#howto").show();
    modalIn($("#howto")[0]);
    modal = 1;
});
$("#policyBtn").on("click", () => {
    $("body").attr("id", "inModal");
    $("#policy").show();
    modalIn($("#policy")[0]);
    modal = 1;
});
$(".modalClose").on("click", () => {
    if ($("#howto").is(":visible")) {
        modalOut($("#howto")[0]);
        $("#howto").fadeOut(400);
    };
    if ($("#policy").is(":visible")) {
        modalOut($("#policy")[0]);
        $("#policy").fadeOut(400);
    };
    $("body").removeAttr("id", "inModal");
    modal = 0;
});
$(document).on("click touchend", e => {
    if ($(e.target).closest(".modals").length) return;
    modal += 1;
    if (modal === 3) {
        if ($("#howto").is(":visible")) {
            modalOut($("#howto")[0]);
            $("#howto").fadeOut(400);
        };
        if ($("#policy").is(":visible")) {
            modalOut($("#policy")[0]);
            $("#policy").fadeOut(400);
        };
        $("body").removeAttr("id", "inModal");
        modal = 0;
    };
});

/**
* モーショングラフィックス
*/
const viewIn = () => {
    anime({
        targets: "#c",
        scale: [0, 1]
    }), anime({
        targets: "#list li, .arrow",
        translateY: ["500px", "0"],
        delay: anime.stagger(55)
    }), anime({
        targets: "#description",
        translateX: ["1200px", "0%"]
    });
};
const valueIn = () => {
    anime({
        targets: ".valueItem",
        translateX: ["500px", "0%"],
        duration: 1200
    });
};
const valueOut = () => {
    return anime({
        targets: ".valueItem",
        translateX: ["0%", "1200px"],
        duration: 900
    }).finished;
};
const viewOut = () => {
    anime({
        targets: "#c",
        scale: [1, 0],
        duration: 500
    }), anime({
        targets: ".valueItem",
        translateX: ["0%", "1200px"],
        duration: 500
    }), anime({
        targets: "#list li, .arrow",
        translateY: ["0%", "500px"],
        delay: anime.stagger(55),
        duration: 500
    }), anime({
        targets: "#description",
        translateX: ["0%", "1200px"],
        duration: 500
    });
};
const checkOnAnime = obj => {
    anime({
        targets: obj,
        rotateY: "1turn",
        duration: 900
    });
};
const checkOffAnime = obj => {
    anime({
        targets: obj,
        rotateY: "0turn",
        duration: 900
    });
};
const modalIn = obj => {
    anime({
        targets: obj,
        translateY: ["500px", "0%"],
    });
};
const modalOut = obj => {
    anime({
        targets: obj,
        translateY: ["0%", "500px"],
        duration: 900
    });
};

/**
* リップルエフェクト
*/
$("#fileButton").on("click", () => {
    $("#fileButton").ripple();
});
$(".icons").on("click", () => {
    $(".icons").ripple();
});