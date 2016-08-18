var _fbEventAnalysis = null ;
(function() {
    function c() {
        this.config = {};
        this.config.debug = _fb_config.debug || false;
        this.config.type = _fb_config.type || 1;
        this.config.rootDomain = "ojuju.com";
        this.config.httpRequest = "http://tongji.ojuju.com/log_collection/1.gif";
        this.config.cookieUid = "_ojuju_fb_uid";
        this.config.cookieNewUv = "_ojuju_fb_newuv";
        this.config.cookieUvTime = "_ojuju_fb_uv_time";
        this.config.searchDngine = {
            "dngine": {
                "other": 0,
                "baidu": 1,
                "google": 2,
                "360": 3,
                "sogou": 4,
                "soso": 5,
                "youdao": 6,
                "yahoo": 7,
                "bing": 8,
                "gougou": 9,
                "haosou": 10,
            },
            "keyword": {
                0: "other",
                1: "wd",
                2: "q",
                3: "q",
                4: "query",
                5: "w",
                6: "q",
                7: "p",
                8: "q",
                9: "q",
                10: "q",
            }
        };
        this.config.os = {
            "other": 0,
        };
        this.config.browser = {
            "other": 0,
            "msie": 1,
            "firefox": 2,
            "chrome": 3,
            "safari": 4,
            "opera": 5,
            "maxthon": 6,
            "360se": 7,
            "micromessenger": 8,
        };
        this.config.domainSet = {
            "www.ojuju.com": "1",
            "ad.ojuju.com": "2",
            "msg.ojuju.com": "3",
            "shop.ojuju.com": "4",
            "api.ojuju.com": "5",
            "org.ojuju.com": "6",
            "plan.ojuju.com": "7",
            "adserver.test.advert.com": "8",
            "www.test.ojuju.com": "9",
        }
    }
    function b() {
        this.params = {};
        this.config = {};
        this.init = function() {
            this.config = this._fbConfig.config;
            this.makeParams()
        }
        ;
        this.makeParams = function() {
            this.params.log_type = this.config.type;
            if (document) {
                this.params.domain = 0;
                this.params.referrer = this.getReferrerUrl() || "";
                this.params.url = this.getUrl() || "";
                this.params.title = document.title || ""
            }
            if (window && window.screen) {
                this.params.rlt = (window.screen.height || 0) + "*" + (window.screen.width || 0);
                this.params.depth = window.screen.colorDepth || 0
            }
            if (navigator) {
                this.params.lang = navigator.language || ""
            }
            this.params.referrer = this.trim(this.params.referrer);
            if (this.params.referrer.length < 1) {
                this.params.ref_type = 1
            } else {
                if (this.params.referrer.indexOf(this.config.rootDomain) > -1) {
                    this.params.ref_type = 2
                } else {
                    this.params.ref_type = 3
                }
            }
            this.params.ref_sr = this.getSearchDngine(this.params.referrer);
            this.params.ref_wd = this.getSearchKeyword();
            this.params.browser = this.getBrowserInfo();
            this.params.os = this.getOs();
            this.params.client_type = this.getClient();
            this.params.newuv = this.getNewUv();
            this.params.uid = this._fbCookie.getCookie(this.config.cookieUid) || 0;
            this.params.ucs = this.getPageCharset() || "";
            this.params.device_id = "";
            this.getMapParams(this.params, (_fb_map || []));
            this.params.rnd = this.getRandom()
        }
        ;
        this.getRandom = function() {
            return Math.random()
        }
        ;
        this.getDomainIndex = function() {
            return this.config.domainSet[document.domain] || ""
        }
        ;
        this.getUrl = function() {
            var d = document.URL || "";
            if (!d) {
                return ""
            }
            return d
        }
        ;
        this.getReferrerUrl = function() {
            var d = this.getReferrerUrlSrc();
            if (!d) {
                return ""
            }
            return d
        }
        ;
        this.getReferrerUrlSrc = function() {
            var f = "";
            var d = document.referrer || "";
            var g = window.parent.document.referrer;
            var e = top.document.referrer;
            if (e) {
                f = e
            } else {
                if (g) {
                    f = g
                } else {
                    if (d) {
                        f = d
                    }
                }
            }
            return f
        }
        ;
        this.urlFilter = function(f) {
            var e = "";
            f = f.toLowerCase();
            if (f != "" && f.indexOf(this.config.rootDomain) != -1) {
                if (f.indexOf("http://") != -1 && f.substring(0, 7) == "http://") {
                    f = f.substring(7)
                } else {
                    if (f.indexOf("https://") != -1 && f.substring(0, 8) == "https://") {
                        f = f.substring(8)
                    }
                }
                var h = f.indexOf("/");
                var i = f.substring(0, h);
                var d = f.substring(h);
                var g = this.config.domainSet[i];
                if (g) {
                    e = "(" + g + ")" + d
                }
                return e
            } else {
                return f
            }
        }
        ;
        this.getSearchKeyword = function() {
            var g = this.getReferrerUrlSrc();
            var i = this.getSearchDngine(g, true) || "";
            var e = this.getSearchDngine(g) || 0;
            var h = this.config.searchDngine.keyword[e];
            var f = 0;
            var d = "";
            if ((f = g.indexOf(h + "=")) > -1) {
                d = g.substring(f + (h.length + 1), g.length);
                if ((f = d.indexOf("&")) > -1) {
                    d = d.substring(0, f)
                }
            }
            if (d.length < 1 && e < 1) {
                if ((f = g.indexOf("?word=")) > -1 || (f = g.indexOf("&word=")) > -1) {
                    d = g.substring(f + 6, g.length);
                    if ((f = d.indexOf("&")) > -1) {
                        d.substring(0, f)
                    }
                }
            }
            return d
        }
        ;
        this.getSearchDngine = function(g, h) {
            h = (h) || false;
            var e = /\.(\w+)(\.[a-z0-9\-]+){1,2}\//ig.exec(g);
            var d = this.config.searchDngine["dngine"]["other"];
            if (!e) {
                return ( !h ? d : "other")
            }
            var f = this.config.searchDngine["dngine"][e[1]];
            return (!h) ? ((f > d) ? f : d) : e[1]
        }
        ;
        this.getBrowserInfo = function() {
            var k = "";
            var g = navigator.userAgent.toLowerCase();
            var h = /(msie) ([\d.]+);/i;
            var i = /(firefox)\/([\d.]+)/i;
            var f = /(chrome)\/([\d.]+)/i;
            var e = /(safari)\/([\d.]+)/i;
            var d = /(opera).([\d.]+)/i;
            var l = /(maxthon) ([\d.]+)/i;
            var j = /(360se)/i;
            var m = /(MicroMessenger)\/([\d.]+)/i;
            this.getVersion = function(n) {
                return ( (n && this.config.browser[n]) || this.config.browser["other"])
            }
            ;
            this.getCharFilter = function(n) {
                return ( (n && n.substring(0, n.indexOf("."))) || 0)
            }
            ;
            if (g.indexOf("360se") > -1) {
                k = g.match(j);
                return this.getVersion(k[1]) + "#" + this.getCharFilter(k[2])
            }
            if (g.indexOf("maxthon") > -1) {
                k = g.match(l);
                return this.getVersion(k[1]) + "#" + this.getCharFilter(k[2])
            }
            if (g.indexOf("firefox") > -1) {
                k = g.match(i);
                return this.getVersion(k[1]) + "#" + this.getCharFilter(k[2])
            }
            if (g.indexOf("chrome") > -1) {
                k = g.match(f);
                return this.getVersion(k[1]) + "#" + this.getCharFilter(k[2])
            }
            if (g.indexOf("safari") > -1 && g.indexOf("chrome") < 0) {
                k = g.match(e);
                return this.getVersion(k[1]) + "#" + this.getCharFilter(k[2])
            }
            if (g.indexOf("opera") > -1) {
                k = g.match(d);
                return this.getVersion(k[1]) + "#" + this.getCharFilter(k[2])
            }
            if (g.indexOf("msie") > -1) {
                k = g.match(h);
                return this.getVersion(k[1]) + "#" + this.getCharFilter(k[2])
            }
            if (g.indexOf("MicroMessenger".toLowerCase()) > -1) {
                k = g.match(m);
                return this.getVersion(k[1]) + "#" + this.getCharFilter(k[2])
            }
            return "0#0"
        }
        ;
        this.getOs = function() {
            if (!navigator) {
                return "other".toLowerCase()
            }
            var g = navigator.userAgent;
            var i = (navigator.platform == "Win32") || (navigator.platform == "Windows");
            var k = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
            var f = (navigator.platform == "X11") && !i && !k;
            var e = (String(navigator.platform).indexOf("Linux") > -1);
            var n = /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i;
            var j = (g.match(n));
            if (j && j[0]) {
                return j[0].toLowerCase()
            }
            if (k) {
                return "Mac".toLowerCase()
            }
            if (f) {
                return "Unix".toLowerCase()
            }
            if (e) {
                return "Linux".toLowerCase()
            }
            if (i) {
                var h = g.indexOf("Windows NT 5.0") > -1 || g.indexOf("Windows 2000") > -1;
                if (h) {
                    return "Win2000".toLowerCase()
                }
                var o = g.indexOf("Windows NT 5.1") > -1 || g.indexOf("Windows XP") > -1;
                if (o) {
                    return "WinXP".toLowerCase()
                }
                var d = g.indexOf("Windows NT 5.2") > -1 || g.indexOf("Windows 2003") > -1;
                if (d) {
                    return "Win2003".toLowerCase()
                }
                var l = g.indexOf("Windows NT 6.0") > -1 || g.indexOf("Windows Vista") > -1;
                if (l) {
                    return "WinVista".toLowerCase()
                }
                var m = g.indexOf("Windows NT 6.1") > -1 || g.indexOf("Windows 7") > -1;
                if (m) {
                    return "Win7".toLowerCase()
                }
            }
            return "other".toLowerCase()
        }
        ;
        this.getClient = function() {
            if (!navigator) {
                return 0
            }
            var e = navigator.userAgent.toLowerCase();
            var d = (navigator.platform && navigator.platform.toLowerCase()) || "";
            var f = -1;
            if (!!e.match(/AppleWebKit.*Mobile.*/i) || !!e.match(/AppleWebKit/i) || !!e.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows\s*Phone|Phone)/i)) {
                if (e.indexOf("Android".toLowerCase()) > -1 || e.indexOf("Linux".toLowerCase()) > -1) {
                    f = 11
                } else {
                    if (e.indexOf("iPhone".toLowerCase()) > -1 || e.indexOf("Mac".toLowerCase()) > -1) {
                        f = 12
                    } else {
                        if (e.indexOf("iPad".toLowerCase()) > -1) {
                            f = 13
                        } else {
                            if (e.indexOf("iPod".toLowerCase()) > -1) {
                                f = 14
                            } else {
                                if (e.indexOf("Backerry".toLowerCase()) > -1) {
                                    f = 15
                                } else {
                                    if (e.indexOf("Symbian".toLowerCase()) > -1) {
                                        f = 16
                                    } else {
                                        if (e.match(/Windows\s*Phone/i)) {
                                            f = 17
                                        } else {
                                            if (e.indexOf("Safari".toLowerCase()) === -1) {
                                                f = 18
                                            } else {
                                                if (!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i)) {
                                                    f = 19
                                                } else {
                                                    f = 10
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (d.indexOf("Win".toLowerCase()) > -1) {
                    f = 2
                } else {
                    if (d.indexOf("Mac".toLowerCase()) > -1) {
                        f = 3
                    } else {
                        if ((d.indexOf("X11".toLowerCase()) > -1) || d.indexOf("Linux".toLowerCase()) > -1) {
                            f = 4
                        } else {
                            f = 1
                        }
                    }
                }
            }
            return f
        }
        ;
        this.getNewUv = function() {
            var f = this.config.cookieNewUv;
            var d = 0;
            if (this._fbCookie.getCookie(f)) {
                d = 1
            } else {
                var e = new Date();
                var g = e.getFullYear().toString() + (e.getMonth() + 1).toString() + e.getDate().toString();
                var h = this._fbCookie.getCookie(this.config.cookieUvTime);
                if (h && (g > h)) {
                    d = 1;
                    this._fbCookie.setCookie(f, "1", "d3650", "/", this.config.rootDomain)
                }
            }
            return d
        }
        ;
        this.getPageCharset = function() {
            var d = "";
            if (navigator.userAgent.indexOf("MSIE") != -1) {
                d = document.charset
            } else {
                if (navigator.userAgent.indexOf("Firefox") != -1) {
                    d = document.characterSet
                } else {
                    d = document.charset || "";
                    d = (d.length < 1) ? document.characterSet : d
                }
            }
            return d
        }
        ;
        this.getMapParams = function(f, d) {
            if (d && d[0] && d[0][0]) {
                if (d[0][0] == "type") {
                    for (var e in d) {
                        f["_setAdd_" + d[e][0]] = d[e][1]
                    }
                    return true
                }
            }
            return false
        }
        ;
        this.getArgs = function(f) {
            var d = "";
            for (var e in f) {
                if (d != "") {
                    d += "&"
                }
                d += e + "=" + encodeURIComponent(((String(f[e])) || "").replace(/\|/ig, "$"))
            }
            return d
        }
        ;
        this.sendData = function(e) {
            var d = new Image(1,1);
            d.src = this.config.httpRequest + "?" + e
        }
    }
    b.prototype._fbConfig = new c();
    b.prototype._fbCookie = new a();
    b.prototype.trim = function(d) {
        return d.replace(/(^\s*)|(\s*$)/g, "")
    }
    ;
    b.prototype.j = function() {
        for (var d in arguments) {
            console.log(arguments[d])
        }
    }
    ;
    function a() {
        this.setCookie = function(d, g, i, h, f) {
            var e = this.getSec(i);
            var j = new Date();
            j.setTime(j.getTime() + e * 1);
            h = h || "/";
            f = f || "";
            document.cookie = d + "=" + escape(g) + ";expires=" + j.toGMTString() + ";path=" + h + (f.length >= 3 ? ";domain=" + f : "")
        }
        ;
        this.getCookie = function(e) {
            var d, f = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
            if (d = document.cookie.match(f)) {
                return unescape(d[2])
            } else {
                return null
            }
        }
        ;
        this.delCookie = function(d) {
            var f = new Date();
            f.setTime(f.getTime() - 1);
            var e = getCookie(d);
            if (e != null ) {
                document.cookie = d + "=" + e + ";expires=" + f.toGMTString()
            }
        }
        ;
        this.getSec = function(e) {
            var f = e.substring(1, e.length) * 1;
            var d = e.substring(0, 1);
            if (d == "s") {
                return f * 1000
            } else {
                if (d == "h") {
                    return f * 60 * 60 * 1000
                } else {
                    if (d == "d") {
                        return f * 24 * 60 * 60 * 1000
                    } else {
                        return 30 * 24 * 60 * 60 * 1000
                    }
                }
            }
        }
    }
    _fbEventAnalysis = new b()
})(_fbEventAnalysis);
_fbEventAnalysis.sendWebLog = function() {
    this.init();
    this.params.log_type = 1;
    if (_fbEventAnalysis.config.debug == true) {
        this.j(this.params)
    }
    this.sendData(this.getArgs(this.params))
}
;
_fbEventAnalysis.sendZoneLog = function(b) {
    if (!b.event_id) {
        return false
    }
    var a = {};
    this.params.log_type = 2;
    a.log_type = this.params.log_type;
    a.uid = b.uid || this.params.uid;
    a.e_id = b.event_id || 0;
    a.e_s_id = b.event_sub_id || 0;
    this.getMapParams(a, (b._fb_map || []));
    a.rnd = this.params.rnd;
    if (_fbEventAnalysis.config.debug == true) {
        this.j(a)
    }
    this.sendData(this.getArgs(a))
}
;
_fbEventAnalysis.sendWebLog();
