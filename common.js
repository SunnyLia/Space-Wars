

var $ = window.Simple = function (t) { return "string" == typeof t ? document.getElementById(t) : t };
$.cookie = {
    get: function (t) {
        var e;
        return (
            function (t) {
                if (!t) return t;
                for (; t != unescape(t);)t = unescape(t);
                for (var e = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], i = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], n = 0;
                    n < e.length;
                    n++)t = t.replace(new RegExp(e[n], "gi"), i[n]);
                return t
            }((e = document.cookie.match(RegExp("(^|;\\s*)" + t + "=([^;]*)(;|$)"))) ? unescape(e[2]) : "")
        )
    },
    set: function (t, e, i, n, o) {
        var p = new Date;
        o ? (p.setTime(p.getTime() + 36e5 * o), document.cookie = t + "=" + e + "; expires = " + p.toGMTString() + ";path = " + (n || " / ") + ";" + (i ? "domain = " + i + "; " : "")) : document.cookie = t + " = " + e + ";path = " + (n || " / ") + ";" + (i ? "domain = " + i + "; " : "")
    },
    del: function (t, e, i) {
        document.cookie = t + "=; expires = Mon, 26 Jul 1997 05: 00: 00 GMT;path = " + (i || " / ") + ";" + (e ? "domain = " + e + "; " : "")
    },
    uin: function () {
        var t = $.cookie.get("uin");
        return t ? parseInt(t.substring(1, t.length), 10) : null
    }
},
    $.http = {
        getXHR: function () { return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest },
        ajax: function (url, para, cb, method, type) {
            var xhr = $.http.getXHR();
            return xhr.open(method, url), xhr.onreadystatechange = function () { 4 == xhr.readyState && (xhr.status >= 200 && xhr.status < 300 || 304 === xhr.status || 1223 === xhr.status || 0 === xhr.status ? void 0 === type && xhr.responseText ? cb(eval("(" + xhr.responseText + ")")) : (cb(xhr.responseText), !xhr.responseText && $.badjs._smid && $.badjs("HTTP Empty[xhr.status]:" + xhr.status, url, 0, $.badjs._smid)) : $.badjs._smid && $.badjs("HTTP Error[xhr.status]:" + xhr.status, url, 0, $.badjs._smid), xhr = null) }, xhr.send(para), xhr
        },
        post: function (t, e, i, n) {
            var o = "";
            for (var p in e) o += "&" + p + "=" + e[p];
            return $.http.ajax(t, o, i, "POST", n)
        },
        get: function (t, e, i, n) {
            var o = [];
            for (var p in e) o.push(p + "=" + e[p]);
            return -1 == t.indexOf("?") && (t += "?"), t += o.join("&"), $.http.ajax(t, null, i, "GET", n)
        },
        jsonp: function (t) {
            var e = document.createElement("script");
            e.src = t, document.getElementsByTagName("head")[0].appendChild(e)
        },
        loadScript: function (t, e, i) {
            var n = document.createElement("script");
            n.onload = n.onreadystatechange = function () {
                this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || ("function" == typeof e && e(), n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n))
            },
                n.src = t, document.getElementsByTagName("head")[0].appendChild(n)
        },
        preload: function (t) {
            var e = document.createElement("img");
            e.src = t, e = null
        }
    },
    $.get = $.http.get,
    $.post = $.http.post,
    $.jsonp = $.http.jsonp,
    $.browser = function (t) {
        if (void 0 === $.browser.info) {
            var e = { type: "" }, i = navigator.userAgent.toLowerCase();
            /webkit/.test(i) ? e = { type: "webkit", version: /webkit[\/ ]([\w.]+)/ } : /opera/.test(i) ? e = { type: "opera", version: /version/.test(i) ? /version[\/ ]([\w.]+)/ : /opera[\/ ]([\w.]+)/ } : /msie/.test(i) ? e = { type: "msie", version: /msie ([\w.]+)/ } : /mozilla/.test(i) && !/compatible/.test(i) && (e = { type: "ff", version: /rv:([\w.]+)/ }), e.version = (e.version && e.version.exec(i) || [0, "0"])[1], $.browser.info = e
        } return $.browser.info[t]
    },
    $.e = {
        _counter: 0,
        _uid: function () { return "h" + $.e._counter++ },
        add: function (t, e, i) {
            if ("object" != typeof t && (t = $(t)), document.addEventListener) t.addEventListener(e, i, !1);
            else if (document.attachEvent) {
                if (-1 != $.e._find(t, e, i)) return;
                var n = function (e) {
                    e || (e = window.event);
                    var n = {
                        _event: e, type: e.type, target: e.srcElement, currentTarget: t, relatedTarget: e.fromElement ? e.fromElement : e.toElement, eventPhase: e.srcElement == t ? 2 : 3, clientX: e.clientX, clientY: e.clientY, screenX: e.screenX, screenY: e.screenY, altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, keyCode: e.keyCode, data: e.data, origin: e.origin, stopPropagation:
                            function () { this._event.cancelBubble = !0 }, preventDefault:
                            function () { this._event.returnValue = !1 }
                    };
                    Function.prototype.call ? i.call(t, n) : (t._currentHandler = i, t._currentHandler(n), t._currentHandler = null)
                };
                t.attachEvent("on" + e, n);
                var o = { element: t, eventType: e, handler: i, wrappedHandler: n }, p = t.document || t, r = p.parentWindow, s = $.e._uid();
                r._allHandlers || (r._allHandlers = {}), r._allHandlers[s] = o, t._handlers || (t._handlers = []), t._handlers.push(s), r._onunloadHandlerRegistered || (r._onunloadHandlerRegistered = !0, r.attachEvent("onunload", $.e._removeAllHandlers))
            }
        },
        remove: function (t, e, i) {
            if (document.addEventListener) t.removeEventListener(e, i, !1);
            else if (document.attachEvent) {
                var n = $.e._find(t, e, i);
                if (-1 == n) return;
                var o = t.document || t, p = o.parentWindow, r = t._handlers[n], s = p._allHandlers[r];
                t.detachEvent("on" + e, s.wrappedHandler), t._handlers.splice(n, 1), delete p._allHandlers[r]
            }
        },
        _find: function (t, e, i) {
            var n = t._handlers;
            if (!n) return -1;
            for (var o = t.document || t, p = o.parentWindow, r = n.length - 1;
                r >= 0;
                r--) {
                var s = n[r], a = p._allHandlers[s];
                if (a.eventType == e && a.handler == i) return r
            } return -1
        },
        _removeAllHandlers: function () {
            var t = this;
            for (id in t._allHandlers) {
                var e = t._allHandlers[id];
                e.element.detachEvent("on" + e.eventType, e.wrappedHandler), delete t._allHandlers[id]
            }
        },
        src: function (t) { return t ? t.target : event.srcElement },
        stopPropagation: function (t) { t ? t.stopPropagation() : event.cancelBubble = !0 },
        trigger: function (t, e) {
            var i = { HTMLEvents: "abort,blur,change,error,focus,load,reset,resize,scroll,select,submit,unload", UIEevents: "keydown,keypress,keyup", MouseEvents: "click,mousedown,mousemove,mouseout,mouseover,mouseup" };
            if (document.createEvent) {
                var n = "";
                "mouseleave" == e && (e = "mouseout"), "mouseenter" == e && (e = "mouseover");
                for (var o in i) if (i[o].indexOf(e)) {
                    n = o;
                    break
                } var p = document.createEvent(n);
                p.initEvent(e, !0, !1), t.dispatchEvent(p)
            } else document.createEventObject && t.fireEvent("on" + e)
        }
    },
    $.bom = {
        query: function (t) {
            var e = window.location.search.match(new RegExp("(\\?|&)" + t + "=([^&]*)(&|$)"));
            return e ? decodeURIComponent(e[2]) : ""
        },
        getHash: function (t) {
            var e = window.location.hash.match(new RegExp("(#|&)" + t + "=([^&]*)(&|$)"));
            return e ? decodeURIComponent(e[2]) : ""
        }
    },
    $.winName = {
        set: function (t, e) {
            var i = window.name || "";
            i.match(new RegExp(";" + t + "=([^;]*)(;|$)")) ? window.name = i.replace(new RegExp(";" + t + "=([^;]*)"), ";" + t + "=" + e) : window.name = i + ";" + t + "=" + e
        },
        get: function (t) {
            var e = window.name || "", i = e.match(new RegExp(";" + t + "=([^;]*)(;|$)"));
            return i ? i[1] : ""
        },
        clear: function (t) {
            var e = window.name || "";
            window.name = e.replace(new RegExp(";" + t + "=([^;]*)"), "")
        }
    },
    $.localData = function () {
        function t() {
            var t = document.createElement("link");
            return t.style.display = "none", t.id = o, document.getElementsByTagName("head")[0].appendChild(t), t.addBehavior("#default#userdata"), t
        }
        function e() {
            if (void 0 === n) if (window.localStorage) n = localStorage;
            else try { n = t(), n.load(o) } catch (t) { return n = !1, !1 } return !0
        }
        function i(t) {
            return "string" == typeof t && p.test(t)
        }
        var n, o = "ptlogin2.qq.com", p = /^[0-9A-Za-z_-]*$/;
        return {
            set: function (t, p) {
                var r = !1;
                if (i(t) && e()) try { p += "", window.localStorage ? (n.setItem(t, p), r = !0) : (n.setAttribute(t, p), n.save(o), r = n.getAttribute(t) === p) } catch (t) { } return r
            },
            get: function (t) { if (i(t) && e()) try { return window.localStorage ? n.getItem(t) : n.getAttribute(t) } catch (t) { } return null },
            remove: function (t) { if (i(t) && e()) try { return window.localStorage ? n.removeItem(t) : n.removeAttribute(t), !0 } catch (t) { } return !1 }
        }
    }(),
    $.str = function () {
        var htmlDecodeDict = { quot: '"', lt: "<", gt: ">", amp: "&", nbsp: " ", "#34": '"', "#60": "<", "#62": ">", "#38": "&", "#160": " " },
            htmlEncodeDict = { '"': "#34", "<": "#60", ">": "#62", "&": "#38", " ": "#160" };
        return {
            decodeHtml: function (t) {
                return t += "", t.replace(/&(quot|lt|gt|amp|nbsp);/gi,
                    function (t, e) { return htmlDecodeDict[e] }).replace(/&#u([a-f\d]{4});/gi,
                        function (t, e) { return String.fromCharCode(parseInt("0x" + e)) }).replace(/&#(\d+);/gi,
                            function (t, e) { return String.fromCharCode(+e) })
            },
            encodeHtml: function (t) {
                return t += "", t.replace(/["<>& ]/g,
                    function (t) { return "&" + htmlEncodeDict[t] + ";" })
            },
            trim: function (t) {
                t += "";
                for (var t = t.replace(/^\s+/, ""), e = /\s/, i = t.length;
                    e.test(t.charAt(--i)););
                return t.slice(0, i + 1)
            },
            uin2hex: function (str) {
                var maxLength = 16;
                str = parseInt(str);
                for (var hex = str.toString(16), len = hex.length, i = len;
                    i < maxLength;
                    i++)hex = "0" + hex;
                for (var arr = [], j = 0;
                    j < maxLength;
                    j += 2)arr.push("\\x" + hex.substr(j, 2));
                var result = arr.join("");
                return eval('result="' + result + '"'), result
            },
            bin2String: function (t) {
                for (var e = [], i = 0, n = t.length;
                    i < n;
                    i++) {
                    var o = t.charCodeAt(i).toString(16);
                    1 == o.length && (o = "0" + o), e.push(o)
                } return e = "0x" + e.join(""), e = parseInt(e, 16)
            },
            str2bin: function (str) {
                for (var arr = [], i = 0;
                    i < str.length;
                    i += 2)arr.push(eval("'\\x" + str.charAt(i) + str.charAt(i + 1) + "'"));
                return arr.join("")
            },
            utf8ToUincode: function (t) {
                var e = "";
                try {
                    var n = t.length, o = [];
                    for (i = 0;
                        i < n;
                        i += 2)o.push("%" + t.substr(i, 2));
                    e = decodeURIComponent(o.join("")), e = $.str.decodeHtml(e)
                } catch (t) { e = "" } return e
            },
            json2str: function (t) {
                var e = "";
                if ("undefined" != typeof JSON) e = JSON.stringify(t);
                else {
                    var i = [];
                    for (var n in t) i.push('"' + n + '":"' + t[n] + '"');
                    e = "{" + i.join(",") + "}"
                } return e
            },
            time33: function (t) {
                for (var e = 0, i = 0, n = t.length;
                    i < n;
                    i++)e = (33 * e + t.charCodeAt(i)) % 4294967296;
                return e
            },
            hash33: function (t) {
                for (var e = 0, i = 0, n = t.length;
                    i < n;
                    ++i)e += (e << 5) + t.charCodeAt(i);
                return 2147483647 & e
            }
        }
    }(),
    $.css = function () {
        var t = document.documentElement;
        return {
            getComputedStyle: function (t) { return window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle },
            getCurrentPixelStyle: function (t, e) {
                if (window.getComputedStyle) var i = parseInt(window.getComputedStyle(t)[e]);
                else {
                    var i = t.currentStyle[e] || 0;
                    if ("auto" === i) switch (e || "") { case "width": case "height": return t.offsetHeight }var n = t.style.left, o = t.runtimeStyle.left;
                    t.runtimeStyle.left = t.currentStyle.left, t.style.left = "fontSize" === e ? "1em" : i, i = t.style.pixelLeft + "px", t.style.left = n, t.runtimeStyle.left = o
                } return parseInt(i)
            },
            getPageScrollTop: function () { return window.pageYOffset || t.scrollTop || document.body.scrollTop || 0 },
            getPageScrollLeft: function () { return window.pageXOffset || t.scrollLeft || document.body.scrollLeft || 0 },
            getOffsetPosition: function (e) {
                e = $(e);
                var i = 0, n = 0;
                if (t.getBoundingClientRect && e.getBoundingClientRect) {
                    var o = e.getBoundingClientRect(), p = t.clientTop || document.body.clientTop || 0, r = t.clientLeft || document.body.clientLeft || 0;
                    i = o.top + this.getPageScrollTop() - p, n = o.left + this.getPageScrollLeft() - r
                } else do { i += e.offsetTop || 0, n += e.offsetLeft || 0, e = e.offsetParent } while (e);
                return { left: n, top: i }
            },
            getWidth: function (t) { return $(t).offsetWidth },
            getHeight: function (t) { return $(t).offsetHeight },
            show: function (t) { t.style.display = "block" },
            hide: function (t) { t.style.display = "none" },
            hasClass: function (t, e) { if (!t.className) return !1; for (var i = t.className.split(" "), n = 0, o = i.length; n < o; n++)if (e == i[n]) return !0; return !1 },
            addClass: function (t, e) { $.css.updateClass(t, e, !1) },
            removeClass: function (t, e) { $.css.updateClass(t, !1, e) },
            updateClass: function (t, e, i) {
                for (var n = t.className.split(" "), o = {},
                    p = 0, r = n.length;
                    p < r;
                    p++)n[p] && (o[n[p]] = !0);
                if (e) {
                    var s = e.split(" ");
                    for (p = 0, r = s.length;
                        p < r;
                        p++)s[p] && (o[s[p]] = !0)
                } if (i) {
                    var a = i.split(" ");
                    for (p = 0, r = a.length;
                        p < r;
                        p++)a[p] && delete o[a[p]]
                } var l = [];
                for (var c in o) l.push(c);
                t.className = l.join(" ")
            },
            setClass: function (t, e) { t.className = e }
        }
    }(),
    $.animate = {
        fade: function (t, e, i, n, o) {
            if (t = $(t)) {
                t.effect || (t.effect = {});
                var p = Object.prototype.toString.call(e), r = 100;
                isNaN(e) ? "[object Object]" == p && e && e.to && (isNaN(e.to) || (r = e.to), isNaN(e.from) || (t.style.opacity = e.from / 100, t.style.filter = "alpha(opacity=" + e.from + ")")) : r = e, void 0 === t.effect.fade && (t.effect.fade = 0), window.clearInterval(t.effect.fade);
                var i = i || 1, n = n || 20, s = window.navigator.userAgent.toLowerCase(),
                    a = function (t) {
                        var e;
                        if (-1 != s.indexOf("msie")) {
                            var i = (t.currentStyle || {}).filter || "";
                            e = i.indexOf("opacity") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) + "" : "100"
                        } else {
                            var n = t.ownerDocument.defaultView;
                            n = n && n.getComputedStyle, e = 100 * (n && n(t, null).opacity || 1)
                        } return parseFloat(e)
                    }(t), l = a < r ? 1 : -1;
                -1 != s.indexOf("msie") && n < 15 && (i = Math.floor(15 * i / n), n = 15);
                var c = function () {
                    a += i * l, (Math.round(a) - r) * l >= 0 ? (t.style.opacity = r / 100, t.style.filter = "alpha(opacity=" + r + ")", window.clearInterval(t.effect.fade), "function" == typeof o && o(t)) : (t.style.opacity = a / 100, t.style.filter = "alpha(opacity = " + a + ")")
                };
                t.effect.fade = window.setInterval(c, n)
            }
        },
        animate: function (t, e, i, n, o) {
            if (t = $(t)) {
                t.effect || (t.effect = {}), void 0 === t.effect.animate && (t.effect.animate = 0);
                for (var p in e) e[p] = parseInt(e[p]) || 0;
                window.clearInterval(t.effect.animate);
                var i = i || 10, n = n || 20, r = function (t) { return { left: t.offsetLeft, top: t.offsetTop } }(t), s = { width: t.clientWidth, height: t.clientHeight, left: r.left, top: r.top }, a = [];
                if (-1 == window.navigator.userAgent.toLowerCase().indexOf("msie") || "BackCompat" != document.compatMode) {
                    var l = document.defaultView ? document.defaultView.getComputedStyle(t, null) : t.currentStyle, c = e.width || 0 == e.width ? parseInt(e.width) : null, u = e.height || 0 == e.height ? parseInt(e.height) : null;
                    "number" == typeof c && (a.push("width"), e.width = c - l.paddingLeft.replace(/\D/g, "") - l.paddingRight.replace(/\D/g, "")), "number" == typeof u && (a.push("height"), e.height = u - l.paddingTop.replace(/\D/g, "") - l.paddingBottom.replace(/\D/g, "")), n < 15 && (i = Math.floor(15 * i / n), n = 15)
                } var g = e.left || 0 == e.left ? parseInt(e.left) : null, d = e.top || 0 == e.top ? parseInt(e.top) : null;
                "number" == typeof g && (a.push("left"), t.style.position = "absolute"), "number" == typeof d && (a.push("top"), t.style.position = "absolute");
                for (var h = [], f = a.length, p = 0;
                    p < f;
                    p++)h[a[p]] = s[a[p]] < e[a[p]] ? 1 : -1;
                var _ = t.style, m = function () {
                    for (var n = !0, p = 0;
                        p < f;
                        p++)s[a[p]] = s[a[p]] + h[a[p]] * Math.abs(e[a[p]] - s[a[p]]) * i / 100, (Math.round(s[a[p]]) - e[a[p]]) * h[a[p]] >= 0 ? (n = n && !0, _[a[p]] = e[a[p]] + "px") : (n = n && !1, _[a[p]] = s[a[p]] + "px");
                    n && (window.clearInterval(t.effect.animate), "function" == typeof o && o(t))
                };
                t.effect.animate = window.setInterval(m, n)
            }
        },
        animate2: function (t, e, i, n, o) {
            var p = i || 1, r = n || 20, s = $(t), a = $.css.getComputedStyle(s), l = {}, c = {};
            for (var u in e) l[u] = a[u].replace(/[-\d\s]/g, "") || e[u].replace(/[-\d\s]/g, "") || "", e[u] = parseFloat(e[u]), c[u] = parseFloat(a[u]);
            var g = 100 / p, d = 0, h = setInterval(
                function () {
                    if (d++ >= g) return void clearInterval(h);
                    for (var t in e) s.style[t] = (e[t] - c[t]) * d / g + c[t] + l[t]
                }, r)
        }
    },
    $.check = {
        isHttps: function () {
            return "https:" == document.location.protocol
        },
        isSsl: function () {
            return /^ssl./i.test(document.location.host)
        },
        isIpad: function () {
            return /ipad/i.test(navigator.userAgent.toLowerCase())
        },
        isQQ: function (t) {
            return /^[1-9]{1}\d{4,9}$/.test(t)
        },
        isQQMail: function (t) {
            return /^[1-9]{1}\d{4,9}@qq\.com$/.test(t)
        },
        isNullQQ: function (t) {
            return /^\d{1,4}$/.test(t)
        },
        isNick: function (t) {
            return /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(t)
        },
        isName: function (t) {
            return "<请输入帐号>" != t && /[\u4E00-\u9FA5]{1,8}/.test(t)
        },
        isPhone: function (t) {
            return /^(?:86|886|)1\d{10}\s*$/.test(t)
        },
        isSeaPhone: function (t) {
            return /^(00)?(?:852|853|886(0)?\d{1})\d{8}$/.test(t)
        },
        isMail: function (t) {
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t)
        },
        isQiyeQQ800: function (t) {
            return /^(800)\d{7}$/.test(t)
        },
        isPassword: function (t) {
            return t && t.length >= 16
        },
        isForeignPhone: function (t) {
            return /^00\d{7,}/.test(t)
        },
        needVip: function (t) {
            for (var e = ["21001601", "21000110", "21000121", "46000101", "716027609", "716027610", "549000912", "637009801"], i = !0, n = 0, o = e.length;
                n < o; n++)if (e[n] == t) {
                    i = !1;
                    break
                } return i
        },
        isPaipai: function () {
            return /paipai.com$/.test(window.location.hostname)
        },
        is_weibo_appid: function (t) {
            return 46000101 == t || 607000101 == t || 558032501 == t || 682023901 == t
        }
    },
    document.getElementsByClassName || (document.getElementsByClassName = function (t) {
        for (var e = [], i = new RegExp("(^| )" + t + "( |$)"), n = document.getElementsByTagName("*"), o = 0, p = n.length; o < p; o++)i.test(n[o].className) && e.push(n[o]);
        return e
    })




