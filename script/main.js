/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./script/doubletap.js":
/*!*****************************!*\
  !*** ./script/doubletap.js ***!
  \*****************************/
/*! exports provided: doubletap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"doubletap\", function() { return doubletap; });\nfunction doubletap() {\r\n    (function (a) {\r\n        a.event.special.doubletap = {\r\n            bindType: \"touchend\",\r\n            delegateType: \"touchend\",\r\n            handle: function (e) {\r\n                var d = e.handleObj,\r\n                    f = jQuery.data(e.target),\r\n                    c = new Date().getTime(),\r\n                    g = f.lastTouch ? c - f.lastTouch : 0,\r\n                    b = b == null ? 300 : b;\r\n                if (g < b && g > 30) {\r\n                    f.lastTouch = null;\r\n                    e.type = d.origType;\r\n                    [\"clientX\", \"clientY\", \"pageX\", \"pageY\"].forEach(function (h) {\r\n                        e[h] = e.originalEvent.changedTouches[0][h]\r\n                    });\r\n                    d.handler.apply(this, arguments)\r\n                } else {\r\n                    f.lastTouch = c\r\n                }\r\n            }\r\n        }\r\n    })(jQuery);\r\n};\n\n//# sourceURL=webpack:///./script/doubletap.js?");

/***/ }),

/***/ "./script/index.js":
/*!*************************!*\
  !*** ./script/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ripple__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ripple */ \"./script/ripple.js\");\n/* harmony import */ var _doubletap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./doubletap */ \"./script/doubletap.js\");\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./script */ \"./script/script.js\");\n// import { fontawesome } from \"./fontawesome\";\r\n// import { anime } from \"./anime\";\r\n// import { fabric } from \"./fabric\";\r\n\r\n\r\n\r\n// fontawesome();\r\n// anime();\r\n// fabric();\r\nObject(_ripple__WEBPACK_IMPORTED_MODULE_0__[\"ripple\"])();\r\nObject(_doubletap__WEBPACK_IMPORTED_MODULE_1__[\"doubletap\"])();\r\nObject(_script__WEBPACK_IMPORTED_MODULE_2__[\"script\"])();\n\n//# sourceURL=webpack:///./script/index.js?");

/***/ }),

/***/ "./script/ripple.js":
/*!**************************!*\
  !*** ./script/ripple.js ***!
  \**************************/
/*! exports provided: ripple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ripple\", function() { return ripple; });\nfunction ripple() {\r\n    let ripple, ripples, RippleEffect, loc, cover, coversize, style, x, y, i, num;\r\n    ripples = document.querySelectorAll(\".ripple\");\r\n    RippleEffect = function (a) {\r\n        ripple = this;\r\n        cover = document.createElement(\"span\");\r\n        coversize = ripple.offsetWidth;\r\n        loc = ripple.getBoundingClientRect();\r\n        x = a.pageX - loc.left - window.pageXOffset - (coversize / 2);\r\n        y = a.pageY - loc.top - window.pageYOffset - (coversize / 2);\r\n        var pos = \"top:\" + y + \"px; left:\" + x + \"px; height:\" + coversize + \"px; width:\" + coversize + \"px;\";\r\n        ripple.appendChild(cover);\r\n        cover.setAttribute(\"style\", pos);\r\n        cover.setAttribute(\"class\", \"rp-effect\");\r\n        setTimeout(function () {\r\n            let list = document.getElementsByClassName(\"rp-effect\");\r\n            for (let i = list.length - 1; i >= 0; i--) {\r\n                list[i].parentNode.removeChild(list[i])\r\n            }\r\n        }, 2000)\r\n    };\r\n    for (i = 0, num = ripples.length; i < num; i++) {\r\n        ripple = ripples[i];\r\n        ripple.addEventListener(\"mousedown\", RippleEffect)\r\n    }\r\n};\n\n//# sourceURL=webpack:///./script/ripple.js?");

/***/ }),

/***/ "./script/script.js":
/*!**************************!*\
  !*** ./script/script.js ***!
  \**************************/
/*! exports provided: script */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"script\", function() { return script; });\nconst script = () => {\r\n    const canvas = new fabric.Canvas(\"c\");\r\n    // fabric.textureSize = 4096;\r\n\r\n    /**\r\n     * 画像ファイル読込\r\n     * 参考コード https://b.0218.jp/20150119133328.html\r\n     */\r\n    let imgType;\r\n    $(\"#file\").on(\"change\", e => {\r\n        $(\"#view, #notImg, #overSize, #footer\").hide();\r\n        reset();\r\n        const file = e.target.files;\r\n        const fileType = file[0].type;\r\n        const imgSize = file[0].size;\r\n        if (!fileType.match(\"image.*\")) {\r\n            $(\"#notImg\").fadeIn();\r\n            $(\"#file\")[0].value = \"\";\r\n            return;\r\n        };\r\n        if (imgSize > 1500000) {\r\n            $(\"#overSize\").fadeIn();\r\n            $(\"#file\")[0].value = \"\";\r\n            return;\r\n        };\r\n        const fr = new FileReader(e);\r\n        fr.onload = (e) => {\r\n            if (fileType.match(\"image.png\")) imgType = \"png\";\r\n            input(e.target.result);\r\n            $(\"#view\").show();\r\n            viewIn();\r\n            $(\"#list\").scrollLeft(0);\r\n            arrowVisibility();\r\n            const optHeight = $(\"#optPanel\").outerHeight();\r\n            $(\"#cnvArea\").css(\"padding-bottom\", optHeight);\r\n        };\r\n        fr.readAsDataURL(e.target.files[0]);\r\n    });\r\n\r\n    /**\r\n     * ベース画像を Canvas に描画\r\n     * @param url 画像URL\r\n     * @return void\r\n     */\r\n    const input = url => {\r\n        fabric.Image.fromURL(url, origImg => {\r\n            resizeToCanvas(origImg);\r\n            canvas.add(origImg).renderAll();\r\n            canvas.selection = origImg.selectable = false;\r\n        });\r\n    };\r\n\r\n    /**\r\n     * Canvas のサイズに合わせて画像をリサイズ\r\n     * @return void\r\n     */\r\n    const resizeToCanvas = imgObj => {\r\n        canvas.setWidth($(\".container\").width());\r\n        const resizeScale = canvas.width / imgObj.width;\r\n        imgObj.scale(resizeScale);\r\n        canvas.setHeight(imgObj.height * resizeScale);\r\n    };\r\n\r\n    /**\r\n     * ウインドウサイズのリサイズに合わせてキャンバスと描画済みオブジェクトをリサイズ\r\n     */\r\n    let mode = \"\";\r\n    $(window).on(\"resize\", () => resize());\r\n    const resize = () => {\r\n        if ($(\"#view\").is(\":visible\") && mode === \"\") {\r\n            canvas.setWidth($(\".container\").width());\r\n            const obj = canvas.getObjects();\r\n            const origImg = obj[0];\r\n            const resizeScale = canvas.width / origImg.width;\r\n            for (let i = 0; i < obj.length; i++) {\r\n                obj[i].scale(resizeScale);\r\n                canvas.setHeight(obj[i].height * resizeScale);\r\n            };\r\n            arrowVisibility();\r\n            const optHeight = $(\"#optPanel\").outerHeight();\r\n            $(\"#cnvArea\").css(\"padding-bottom\", optHeight);\r\n        };\r\n    };\r\n\r\n    /**\r\n     * ブラー適用選択指定ツール起動\r\n     */\r\n    $(\"#select\").on(\"click\", () => {\r\n        if ($(\"#select\").prop(\"checked\")) {\r\n            selectArea();\r\n            return;\r\n        };\r\n        clear();\r\n    });\r\n\r\n    /**\r\n     * ブラー適用範囲指定ツール\r\n     * 参考コード http://jsfiddle.net/durga598/3rwxzwc3/1/\r\n     */\r\n    let stroke, circle;\r\n    const selectArea = () => {\r\n        canvas.hoverCursor = \"crosshair\";\r\n        mode = \"add\";\r\n        canvas.on(\"mouse:down\", down);\r\n        canvas.on(\"mouse:dblclick\", copyObj);\r\n        $(\"canvas\").on(\"doubletap\", copyObj);\r\n    };\r\n    const down = e => {\r\n        const pos = canvas.getPointer(e);\r\n        if (mode === \"add\") {\r\n            stroke = new fabric.Polygon([{\r\n                x: pos.x,\r\n                y: pos.y\r\n            }], {\r\n                left: pos.x,\r\n                top: pos.y,\r\n                fill: false,\r\n                stroke: \"rgba(0,177,235,.87)\",\r\n                strokeWidth: 2,\r\n                objectCaching: false\r\n            });\r\n            canvas.add(stroke);\r\n            mode = \"edit\";\r\n            canvas.on(\"mouse:move\", move);\r\n        };\r\n        if (mode === \"edit\") {\r\n            const points = stroke.get(\"points\");\r\n            points.push({\r\n                x: pos.x,\r\n                y: pos.y,\r\n            });\r\n        };\r\n        if (mode === \"add\" || mode === \"edit\") {\r\n            circle = new fabric.Circle({\r\n                left: pos.x,\r\n                top: pos.y,\r\n                originX: \"center\",\r\n                originY: \"center\",\r\n                fill: \"rgba(0,87,145,.87)\",\r\n                radius: 4,\r\n                selectable: false\r\n            });\r\n            canvas.add(circle);\r\n        };\r\n    };\r\n    const move = e => {\r\n        if (mode == \"edit\") {\r\n            const pos = canvas.getPointer(e);\r\n            const points = stroke.get(\"points\");\r\n            points[points.length - 1].x = pos.x;\r\n            points[points.length - 1].y = pos.y;\r\n            canvas.renderAll();\r\n        };\r\n    };\r\n\r\n    /**\r\n     * ブラー用に画像オブジェクトをコピー\r\n     * 参考コード http://fabricjs.com/copypaste\r\n     */\r\n    const copyObj = () => {\r\n        const obj = canvas.getObjects();\r\n        const origImg = obj[0];\r\n        origImg.clone(copy => {\r\n            copy.set({\r\n                scaleX: origImg.scaleX,\r\n                scaleY: origImg.scaleY\r\n            });\r\n            copy.selectable = false;\r\n            clippingObj(copy);\r\n        });\r\n    };\r\n\r\n    /**\r\n     * ブラー用画像オブジェクトから指定した範囲を切り抜き\r\n     * 参考コード http://fabricjs.com/clippath-part1\r\n     */\r\n    const clippingObj = copy => {\r\n        const polygon = new fabric.Polygon(stroke.get(\"points\"));\r\n        const polyScale = copy.width / (copy.width * copy.scaleX);\r\n        polygon.scale(polyScale);\r\n        polygon.set({\r\n            left: (-(copy.width / 2)) + (polygon.left * polyScale),\r\n            top: (-(copy.height / 2)) + (polygon.top * polyScale)\r\n        });\r\n        copy.clipPath = polygon;\r\n        canvas.remove(stroke);\r\n        const obj = canvas.getObjects();\r\n        for (let i = 1; i < obj.length; i++)\r\n            canvas.remove(obj[i]);\r\n        $(\"#select\").prop(\"disabled\", true);\r\n        $(\"#onOff\").prop(\"disabled\", false);\r\n        $(\"#value\")[0].value = 0.25;\r\n        mode = \"\";\r\n        canvas.hoverCursor = \"all-scroll\";\r\n        $(\".valueItem\").show();\r\n        valueIn();\r\n        blurObj(copy);\r\n    };\r\n\r\n    /**\r\n     * 切り抜いた画像オブジェクトにブラーを適用\r\n     */\r\n    const blurObj = copy => {\r\n        const filter = new fabric.Image.filters.Blur({\r\n            blur: parseFloat($(\"#value\").val())\r\n        });\r\n        copy.filters.push(filter);\r\n        copy.applyFilters();\r\n        canvas.add(copy).renderAll();\r\n\r\n        $(\"#value\").on(\"input\", { copy }, slide);\r\n    };\r\n\r\n    /**\r\n     * スライダー操作でブラーの強さを調節\r\n     */\r\n    const slide = e => blurValue(e.data.copy, parseFloat(e.target.value, 10));\r\n    const blurValue = (copy, value) => {\r\n        const obj = canvas.getObjects();\r\n        const bulrCache = obj[1];\r\n        copy.filters[0][\"blur\"] = value;\r\n        copy.applyFilters();\r\n        canvas.remove(bulrCache).add(copy).renderAll();\r\n    };\r\n\r\n    /**\r\n     * ズームボタン\r\n     */\r\n    let zoom = canvas.getZoom();\r\n    $(\"#zoomIn\").on(\"click\", () => {\r\n        if (zoom < 2) {\r\n            zoom += .1;\r\n            canvas.setZoom(zoom);\r\n        };\r\n    });\r\n    $(\"#zoomOut\").on(\"click\", () => {\r\n        if (zoom > .5) {\r\n            zoom -= .1;\r\n            canvas.setZoom(zoom);\r\n        };\r\n    });\r\n\r\n    /**\r\n     * ドラッグでキャンバス内の表示位置を調整\r\n     */\r\n    let panning;\r\n    let prevX;\r\n    let prevY;\r\n    canvas.on(\"mouse:down\", e => {\r\n        if (canvas.hoverCursor === \"all-scroll\") {\r\n            panning = true;\r\n            if (window.TouchEvent && e.e instanceof TouchEvent) {\r\n                const { clientX, clientY } = e.e.touches[0];\r\n                prevX = clientX;\r\n                prevY = clientY;\r\n            };\r\n        };\r\n    });\r\n    canvas.on(\"mouse:move\", e => {\r\n        if (panning) {\r\n            let delta;\r\n            if (window.TouchEvent && e.e instanceof TouchEvent) {\r\n                const { clientX, clientY } = e.e.touches[0];\r\n                delta = new fabric.Point(clientX - prevX, clientY - prevY);\r\n                prevX = clientX;\r\n                prevY = clientY;\r\n                canvas.relativePan(delta);\r\n                return;\r\n            };\r\n            delta = new fabric.Point(e.e.movementX, e.e.movementY);\r\n            canvas.relativePan(delta);\r\n        };\r\n    });\r\n    canvas.on(\"mouse:up\", () => {\r\n        panning = false;\r\n    });\r\n\r\n    /**\r\n     * ブラーを一時off\r\n     */\r\n    $(\"#onOff\").on(\"click\", () => {\r\n        const obj = canvas.getObjects();\r\n        if (!obj.length === 2) return;\r\n        const blurObj = obj[1];\r\n        if ($(\"#onOff\").prop(\"checked\") === true) {\r\n            blurObj.opacity = 0;\r\n            canvas.remove(blurObj).add(blurObj).renderAll();\r\n            return;\r\n        };\r\n        blurObj.opacity = 1;\r\n        canvas.remove(blurObj).add(blurObj).renderAll();\r\n    });\r\n\r\n    /**\r\n     * ストロークとブラーオブジェクトをクリア\r\n     */\r\n    $(\"#clear\").on(\"click\", () => clear());\r\n    const clear = () => {\r\n        const obj = canvas.getObjects();\r\n        const origImg = obj[0];\r\n        reset();\r\n        canvas.add(origImg).renderAll();\r\n        origImg.selectable = false;\r\n        if ($(\".valueItem\").is(\":visible\")) {\r\n            valueOut();\r\n            $(\".valueItem\").fadeOut(700);\r\n        };\r\n    };\r\n\r\n    /**\r\n     * 拡大率、チェックボックス、スライダー、カーソル、範囲指定ツールのモード、イベントハンドラをクリア\r\n     */\r\n    const reset = () => {\r\n        canvas.clear();\r\n        zoom = 1;\r\n        canvas.setZoom(zoom);\r\n        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);\r\n        $(\"#select\").prop(\"disabled\", false);\r\n        $(\"#select\").prop(\"checked\", false);\r\n        $(\"#onOff\").prop(\"disabled\", true);\r\n        $(\"#onOff\").prop(\"checked\", false);\r\n        $(\"#value\")[0].value = 0.25;\r\n        canvas.hoverCursor = \"all-scroll\";\r\n        mode = \"\";\r\n        canvas.off(\"mouse:down\", down).off(\"mouse:move\", move).off(\"mouse:dblclick\", copyObj);\r\n        $(\"canvas\").off(\"doubletap\", copyObj);\r\n        $(\"#value\").off(\"input\", slide);\r\n    };\r\n\r\n    /**\r\n     * 画像保存\r\n     */\r\n    $(\"#dl\").on(\"click\", () => {\r\n        zoom = 1;\r\n        canvas.setZoom(zoom);\r\n        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);\r\n        const obj = canvas.getObjects();\r\n        const origImg = obj[0];\r\n        canvas.width = origImg.width;\r\n        canvas.height = origImg.height;\r\n        const resizeScale = canvas.width / origImg.width;\r\n        for (let i = 0; i < obj.length; i++)\r\n            obj[i].scale(resizeScale);\r\n        if (imgType === \"png\") {\r\n            const dataURL = canvas.toDataURL({ format: \"png\" });\r\n            imgDownload(dataURL);\r\n            return;\r\n        };\r\n        const dataURL = canvas.toDataURL({\r\n            format: \"jpeg\",\r\n            quality: 1\r\n        });\r\n        imgDownload(dataURL);\r\n    });\r\n    const imgDownload = dataURL => {\r\n        if (canvas.msToBlob) { //for IE\r\n            const blob = canvas.msToBlob();\r\n            window.navigator.msSaveBlob(blob, 'download.png');\r\n            resize();\r\n            return;\r\n        };\r\n        const origName = $(\"#file\")[0].files[0].name;\r\n        const a = $(\"#hideDl\")[0];\r\n        a.href = dataURL;\r\n        a.download = `mozausu-${origName}`;\r\n        a.click();\r\n        resize();\r\n    };\r\n\r\n    /**\r\n     * キャンバスを閉じる\r\n     */\r\n    $(\"#close\").on(\"click\", async () => {\r\n        if ($(\".valueItem\").is(\":visible\")) {\r\n            valueOut();\r\n            $(\".valueItem\").fadeOut();\r\n        };\r\n        await viewOut();\r\n        $(\"#view\").hide();\r\n        reset();\r\n        $(\"#footer\").fadeIn();\r\n        $(\"#file\")[0].value = \"\";\r\n    });\r\n\r\n    /**\r\n     * オプションボタン両端の矢印表示制御\r\n     */\r\n    $(\"#list\").scroll(() => arrowVisibility());\r\n    const arrowVisibility = () => {\r\n        const scrollPosition = $(\"#list\").scrollLeft();\r\n        const maxPostion = $(\"#list\").get(0).scrollWidth - $(\"#list\").get(0).clientWidth;\r\n        let leftVisibility = \"visible\";\r\n        let rightVisibility = \"visible\";\r\n        if (scrollPosition === 0) leftVisibility = \"hidden\";\r\n        if (scrollPosition === maxPostion) rightVisibility = \"hidden\";\r\n        $(\"#arrowLeft\").css(\"visibility\", leftVisibility);\r\n        $(\"#arrowRight\").css(\"visibility\", rightVisibility);\r\n    };\r\n\r\n    /**\r\n     * 矢印ボタンのスクロール制御\r\n     */\r\n    $(\"#arrowLeft\").on(\"click\", () => {\r\n        const scrollPosition = $(\"#list\").scrollLeft();\r\n        if (scrollPosition > 0) {\r\n            $(\"#list\").scrollLeft(scrollPosition - 40);\r\n            return;\r\n        };\r\n        $(\"#list\").scrollLeft(0);\r\n    });\r\n    $(\"#arrowRight\").on(\"click\", () => {\r\n        const scrollPosition = $(\"#list\").scrollLeft();\r\n        const maxScroll = $(\"#list\").get(0).scrollWidth - $(\"#list\").get(0).clientWidth;\r\n        if (scrollPosition < maxScroll) {\r\n            $(\"#list\").scrollLeft(scrollPosition + 40);\r\n            return;\r\n        };\r\n        $(\"#list\").scrollLeft(maxScroll);\r\n    });\r\n\r\n    /**\r\n    * モーダルウィンドウ\r\n    */\r\n    let modal = 0;\r\n    $(\"#openHowto\").on(\"click\", () => {\r\n        $(\"#video\").prop(\"src\", \"https://www.youtube.com/embed/lnz3_87nbqM\");\r\n        $(\"#howto\").show();\r\n        $(\"body\").prop(\"id\", \"inModal\");\r\n        modal = 1;\r\n        modalIn($(\"#howto\")[0]);\r\n    });\r\n    $(\"#openPolicy\").on(\"click\", () => {\r\n        $(\"#policy\").show();\r\n        $(\"body\").prop(\"id\", \"inModal\");\r\n        modal = 1;\r\n        modalIn($(\"#policy\")[0]);\r\n    });\r\n    $(\".closeModals\").on(\"click\", () => {\r\n        if ($(\"#howto\").is(\":visible\")) closeModal($(\"#howto\")[0]);\r\n        if ($(\"#policy\").is(\":visible\")) closeModal($(\"#policy\")[0]);\r\n    });\r\n    $(window).on(\"click\", e => {\r\n        if ($(e.target).closest(\"#modalArea\").length) return;\r\n        modal += 1;\r\n        if (modal === 3) {\r\n            if ($(\"#howto\").is(\":visible\")) closeModal($(\"#howto\")[0]);\r\n            if ($(\"#policy\").is(\":visible\")) closeModal($(\"#policy\")[0]);\r\n        };\r\n    });\r\n    const closeModal = modalWindow => {\r\n        modalOut(modalWindow);\r\n        $(modalWindow).fadeOut(700);\r\n        $(\"#video\").prop(\"src\", \"\");\r\n        $(\"body\").removeAttr(\"id\", \"inModal\");\r\n        modal = 0;\r\n    };\r\n\r\n    /**\r\n    * モーショングラフィックス\r\n    */\r\n    const viewIn = () => {\r\n        anime({\r\n            targets: \"canvas\",\r\n            scale: [0, 1]\r\n        }), anime({\r\n            targets: \"#list li, .arrow\",\r\n            translateY: [\"+=600px\", \"0\"],\r\n            delay: anime.stagger(55)\r\n        });\r\n    };\r\n    const valueIn = () => {\r\n        anime({\r\n            targets: \".valueItem\",\r\n            translateX: [\"-=1200px\", \"0%\"],\r\n            duration: 1200,\r\n            easing: 'spring(1, 100, 13, 30)'\r\n        });\r\n    };\r\n    const valueOut = () => {\r\n        anime({\r\n            targets: \".valueItem\",\r\n            translateX: [\"0%\", \"+=1200px\"],\r\n            duration: 900,\r\n            easing: 'spring(1, 100, 13, 30)'\r\n        });\r\n    };\r\n    const viewOut = () => {\r\n        return anime({\r\n            targets: \"canvas\",\r\n            scale: [1, 0],\r\n            duration: 250\r\n        }), anime({\r\n            targets: \"#list li, .arrow\",\r\n            translateY: [\"0%\", \"+=600px\"],\r\n            delay: anime.stagger(55),\r\n            duration: 250\r\n        }).finished;\r\n    };\r\n    const modalIn = obj => {\r\n        anime({\r\n            targets: obj,\r\n            translateY: [\"-=600px\", \"0%\"],\r\n        });\r\n    };\r\n    const modalOut = obj => {\r\n        anime({\r\n            targets: obj,\r\n            translateY: [\"0%\", \"+=600px\"],\r\n            duration: 900\r\n        });\r\n    };\r\n};\n\n//# sourceURL=webpack:///./script/script.js?");

/***/ })

/******/ });