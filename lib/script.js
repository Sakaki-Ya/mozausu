"use strict";

const canvas = new fabric.Canvas("c");
/**
 * 画像ファイル読込
 * 参考コード https://b.0218.jp/20150119133328.html
 */

let imgType;
$("#file").on("change", e => {
  fabric.textureSize = 2048;
  $("#view, #notImg, #overSize, #footer").hide();
  reset();
  const file = e.target.files;
  const fileType = file[0].type;
  const imgSize = file[0].size;

  if (!fileType.match("image.*")) {
    $("#notImg").fadeIn();
    $("#file")[0].value = "";
    return;
  }

  ;

  if (imgSize > 1700000) {
    $("#overSize").fadeIn();
    $("#file")[0].value = "";
    return;
  }

  ;
  if (imgSize > 1000000) fabric.textureSize = 4096;
  const fr = new FileReader(e);

  fr.onload = e => {
    if (fileType.match("image.png")) imgType = "png";
    input(e.target.result);
    $("#view").show();
    viewIn();
    $("#list").scrollLeft(0);
    arrowVisibility();
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
  fabric.Image.fromURL(url, origImg => {
    resizeToCanvas(origImg);
    canvas.add(origImg).renderAll();
    canvas.selection = origImg.selectable = false;
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
    const origImg = obj[0];
    const resizeScale = canvas.width / origImg.width;

    for (let i = 0; i < obj.length; i++) {
      obj[i].scale(resizeScale);
      canvas.setHeight(obj[i].height * resizeScale);
    }

    ;
    arrowVisibility();
    const optHeight = $("#optPanel").outerHeight();
    $("#cnvArea").css("padding-bottom", optHeight);
  }

  ;
};
/**
 * ブラー適用選択指定ツール起動
 */


$("#select").on("click", () => {
  if ($("#select").prop("checked")) {
    selectArea();
    return;
  }

  ;
  clear();
});
/**
 * ブラー適用範囲指定ツール
 * 参考コード http://jsfiddle.net/durga598/3rwxzwc3/1/
 */

let stroke, circle;

const selectArea = () => {
  canvas.hoverCursor = "crosshair";
  mode = "add";
  canvas.on("mouse:down", down);
  canvas.on("mouse:dblclick", copyObj);
  $("canvas").on("doubletap", copyObj);
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
      stroke: "rgba(0,177,235,.87)",
      strokeWidth: 2,
      objectCaching: false
    });
    canvas.add(stroke);
    mode = "edit";
    canvas.on("mouse:move", move);
  }

  ;

  if (mode === "edit") {
    const points = stroke.get("points");
    points.push({
      x: pos.x,
      y: pos.y
    });
  }

  ;

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

  ;
};

const move = e => {
  if (mode === "edit") {
    const pos = canvas.getPointer(e);
    const points = stroke.get("points");
    points[points.length - 1].x = pos.x;
    points[points.length - 1].y = pos.y;
    canvas.renderAll();
  }

  ;
};
/**
 * ブラー用に画像オブジェクトをコピー
 * 参考コード http://fabricjs.com/copypaste
 */


const copyObj = () => {
  const obj = canvas.getObjects();
  const origImg = obj[0];
  origImg.clone(copy => {
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


const clippingObj = copy => {
  const polygon = new fabric.Polygon(stroke.get("points"));
  const polyScale = copy.width / (copy.width * copy.scaleX);
  polygon.scale(polyScale);
  polygon.set({
    left: -(copy.width / 2) + polygon.left * polyScale,
    top: -(copy.height / 2) + polygon.top * polyScale
  });
  copy.clipPath = polygon;
  canvas.remove(stroke);
  const circles = canvas.getObjects();

  for (let i = 1; i < circles.length; i++) canvas.remove(circles[i]);

  $("#select").prop("disabled", true);
  $("#onOff").prop("disabled", false);
  $("#value")[0].value = 0.25;
  mode = "";
  canvas.hoverCursor = "all-scroll";
  $(".valueItem").fadeIn();
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
  $("#value").on("input", {
    copy
  }, slide);
};
/**
 * スライダー操作でブラーの強さを調節
 */


const slide = e => blurValue(e.data.copy, parseFloat(e.target.value));

const blurValue = (copy, value) => {
  const obj = canvas.getObjects();
  const bulrCache = obj[1];
  copy.filters[0]["blur"] = value;
  copy.applyFilters();
  canvas.remove(bulrCache).add(copy).renderAll();
};
/**
 * ズームボタン
 */


let zoom = canvas.getZoom();
$("#zoomIn").on("click", () => {
  if (zoom < 2) {
    zoom += .1;
    canvas.setZoom(zoom);
  }

  ;
});
$("#zoomOut").on("click", () => {
  if (zoom > .5) {
    zoom -= .1;
    canvas.setZoom(zoom);
  }

  ;
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

    if (window.TouchEvent && e.e instanceof TouchEvent) {
      const {
        clientX,
        clientY
      } = e.e.touches[0];
      prevX = clientX;
      prevY = clientY;
    }

    ;
  }

  ;
});
canvas.on("mouse:move", e => {
  if (panning) {
    let delta;

    if (window.TouchEvent && e.e instanceof TouchEvent) {
      const {
        clientX,
        clientY
      } = e.e.touches[0];
      delta = new fabric.Point(clientX - prevX, clientY - prevY);
      prevX = clientX;
      prevY = clientY;
      canvas.relativePan(delta);
      return;
    }

    ;
    delta = new fabric.Point(e.e.movementX, e.e.movementY);
    canvas.relativePan(delta);
  }

  ;
});
canvas.on("mouse:up", () => {
  panning = false;
});
/**
 * ブラーを一時off
 */

$("#onOff").on("click", () => {
  const obj = canvas.getObjects();
  if (obj.length !== 2) return;
  const blurObj = obj[1];

  if ($("#onOff").prop("checked") === true) {
    blurObj.opacity = 0;
    canvas.remove(blurObj).add(blurObj).renderAll();
    return;
  }

  ;
  blurObj.opacity = 1;
  canvas.remove(blurObj).add(blurObj).renderAll();
});
/**
 * ストロークとブラーオブジェクトをクリア
 */

$("#clear").on("click", () => clear());

const clear = () => {
  const obj = canvas.getObjects();
  const origImg = obj[0];
  reset();
  canvas.add(origImg).renderAll();
  origImg.selectable = false;
};
/**
 * 拡大率、チェックボックス、スライダー、カーソル、範囲指定ツールのモード、イベントハンドラをクリア
 */


const reset = () => {
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
  canvas.off("mouse:down", down).off("mouse:move", move).off("mouse:dblclick", copyObj);
  $("canvas").off("doubletap", copyObj);
  $("#value").off("input", slide);
  valueOut();
  $(".valueItem").fadeOut(1200);
};
/**
 * 画像保存
 */


$("#dl").on("click", () => {
  zoom = 1;
  canvas.setZoom(zoom);
  canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  const obj = canvas.getObjects();
  const origImg = obj[0];
  canvas.width = origImg.width;
  canvas.height = origImg.height;
  const resizeScale = canvas.width / origImg.width;

  for (let i = 0; i < obj.length; i++) obj[i].scale(resizeScale);

  if (imgType === "png") {
    const dataURL = canvas.toDataURL({
      format: "png"
    });
    imgDownload(dataURL);
    return;
  }

  ;
  const dataURL = canvas.toDataURL({
    format: "jpeg",
    quality: 1
  });
  imgDownload(dataURL);
});

const imgDownload = dataURL => {
  const origName = $("#file")[0].files[0].name;
  const a = $("#hideDl")[0];
  a.href = dataURL;
  a.download = `mozausu-${origName}`;
  a.click();
  resize();
};
/**
 * キャンバスを閉じる
 */


$("#close").on("click", async () => {
  reset();
  await viewOut();
  $("#view").hide();
  $("#footer").fadeIn();
  $("#file")[0].value = "";
});
/**
 * オプションボタン両端の矢印表示制御
 */

$("#list").scroll(() => arrowVisibility());

const arrowVisibility = () => {
  const scrollPosition = $("#list").scrollLeft();
  const maxPostion = $("#list").get(0).scrollWidth - $("#list").get(0).clientWidth;
  let leftVisibility = "visible";
  let rightVisibility = "visible";
  if (scrollPosition === 0) leftVisibility = "hidden";
  if (scrollPosition === maxPostion) rightVisibility = "hidden";
  $("#arrowLeft").css("visibility", leftVisibility);
  $("#arrowRight").css("visibility", rightVisibility);
};
/**
 * 矢印ボタンのスクロール制御
 */


$("#arrowLeft").on("click", () => {
  const scrollPosition = $("#list").scrollLeft();

  if (scrollPosition > 0) {
    $("#list").scrollLeft(scrollPosition - 40);
    return;
  }

  ;
  $("#list").scrollLeft(0);
});
$("#arrowRight").on("click", () => {
  const scrollPosition = $("#list").scrollLeft();
  const maxScroll = $("#list").get(0).scrollWidth - $("#list").get(0).clientWidth;

  if (scrollPosition < maxScroll) {
    $("#list").scrollLeft(scrollPosition + 40);
    return;
  }

  ;
  $("#list").scrollLeft(maxScroll);
});
/**
* モーダルウィンドウ
*/

$(".openHowto").on("click", () => {
  $("#video").prop("src", "https://www.youtube.com/embed/wMVCsQZpD2w");
  if ($("#optPanel").is(":visible")) $("#optPanel").fadeOut(100);
  $("body").prop("id", "inModal");
  $("#howto").addClass("is-active");
  modalIn($("#howto")[0]);
});
$("#openPolicy").on("click", () => {
  $("body").prop("id", "inModal");
  $("#policy").addClass("is-active");
  modalIn($("#policy")[0]);
});
$(".closeModal, .modal-background").on("click", async () => {
  let modal;
  $("body").removeAttr("id", "inModal");

  if ($("#howto").is(":visible")) {
    $("#video").prop("src", "");
    modal = $("#howto");
  }

  ;
  if ($("#policy").is(":visible")) modal = $("#policy");
  await modalOut(modal[0]);
  if ($("#view").is(":visible")) $("#optPanel").fadeIn(100);
  modal.removeClass("is-active");
});
/**
* モーショングラフィックス
*/

const viewIn = () => {
  anime({
    targets: "canvas",
    scale: [0, 1]
  }), anime({
    targets: "#list li, .arrow",
    translateY: ["+=600px", "0"],
    delay: anime.stagger(55)
  });
};

const valueIn = () => {
  anime({
    targets: ".valueItem",
    translateX: ["-=1200px", "0%"],
    duration: 1200,
    easing: 'spring(1, 100, 13, 30)'
  });
};

const valueOut = () => {
  anime({
    targets: ".valueItem",
    translateX: ["0%", "+=1200px"],
    duration: 1200,
    easing: 'spring(1, 100, 13, 30)'
  });
};

const viewOut = () => {
  return anime({
    targets: "canvas",
    scale: [1, 0],
    duration: 250
  }), anime({
    targets: "#list li, .arrow",
    translateY: ["0%", "+=600px"],
    delay: anime.stagger(55),
    duration: 250
  }).finished;
};

const modalIn = modal => {
  anime({
    targets: modal,
    translateY: ["-=900px", "0%"]
  });
};

const modalOut = modal => {
  return anime({
    targets: modal,
    translateY: ["0%", "+=900px"],
    duration: 900
  }).finished;
};