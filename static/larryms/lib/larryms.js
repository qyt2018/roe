layui.define(["jquery", "layer", "laytpl", "element", "form"], function (e) {
    var x = layui.$, l = layui.layer, w = layui.laytpl, r = layui.device(), t = layui.element, n = layui.form,
        y = document, a = false, i = x(window), o = {modules: {}}, s = "larryms",
        c = ['<div class="larryms-message" id="messageBox">', '<div class="larryms-message-box clearfix">', '<i class="larry-icon {{d.ICONS}}"></i>', '<p class="resultmsg">{{d.MSG}}</p>', "</div>", "</div>"].join(""),
        g = function (e) {
            var r = new Array;
            if (e !== undefined) {
                scripts = y.getElementsByTagName("script");
                for (var t = 0; t < scripts.length; t++) {
                    if (e == scripts[t].src.substring(scripts[t].src.lastIndexOf("/") + 1)) {
                        var n = scripts[t].src.split("//")[1];
                        r["commonPath"] = n.substring(n.indexOf("/"), n.lastIndexOf("/layui/") + 1);
                        r["url"] = n.substring(n.indexOf("/"), n.lastIndexOf("/layui/") + 1) + "plus/";
                        r["index"] = t
                    }
                }
                r["obj"] = scripts
            } else {
                r["url"] = y.currentScript ? y.currentScript.src : function () {
                    var e = y.scripts, r = e.length - 1, t;
                    for (var n = r; n > 0; n--) {
                        if (e[n].readyState == "interactive") {
                            t = e[n].src;
                            break
                        }
                    }
                    return t || e[r].src
                }();
                if (r["url"] !== undefined && r["url"] !== "") {
                    r["names"] = r["url"].substring(r["url"].lastIndexOf("/") + 1)
                } else {
                    r["names"] = "layui.js"
                }
            }
            return r
        }, u = function () {
            this.version = "LarryMS 2.0.8 Stable", this.sysName = "LarryMS", this.tit = [this.sysName + "提示您", this.sysName + "错误提示", this.sysName + "参数配置错误提示", this.sysName + "数据源配置错误", "关闭失败提示", "操作成功", "操作失败", this.sysName + " Ajax 调试信息控制台"], this.config = {
                plusDir: "/common/plus/",
                jqDefined: undefined,
                jqUrl: undefined
            }, this.debug = false, this.screen = undefined, this.pageAnim = undefined, this.fonts = {
                font: undefined,
                url: undefined,
                online: false
            }, this.audioElm = undefined
        };
    layui.cache.NOTICEINDEX = 0;

    function f(e) {
        var r = document.getElementsByTagName("head")[0], t = document.getElementById(e);
        if (t !== null) {
            r.removeChild(t)
        }
    }

    u.prototype.ready = function (e) {
    };
    u.prototype.grantCheck = function (e, r, t) {
        var n = h(e, r, t);
        if (n) {
            return true
        } else {
            return false
        }
    };
    u.prototype.deviceType = function () {
        var e = this;
        if (r.android || r.ios || i.width() <= 768) {
            return {devices: "mobile", browser: e.typeFn.browserType()}
        } else if (i.width() > 768 && i.width() < 1e3) {
            return {devices: "pad", browser: e.typeFn.browserType()}
        } else {
            return {devices: "pc", browser: e.typeFn.browserType()}
        }
    };
    u.prototype.placeholder = function () {
        var e = this, r = "";
        x("input.larryms-input,.larryms-textarea,input.larry-input[type='text'],input.larry-input[type='password']").on("focus", function () {
            r = x(this).attr("placeholder");
            x(this).attr("placeholder", "")
        });
        x("input.larryms-input,.larryms-textarea,input.larry-input[type='text'],input.larry-input[type='password']").on("blur", function () {
            x(this).attr("placeholder", r)
        })
    };
    u.prototype.set = function (e) {
        var r = this;
        x.extend(true, r.config, e);
        return r
    };
    u.prototype.getPath = function (e) {
        var r = g(e);
        return r
    };
    u.prototype.init = function () {
        var e = this;
        e.placeholder();
        e.verify()
    };
    u.prototype.fontset = function (e) {
        var r = this;
        x.extend(true, r.fonts, e);
        var t = r.getPath("layui.js").commonPath;
        if (x(".fa").length > 0) {
            var n = t + "css/fonts/font-awesome.min.css";
            layui.link(n)
        }
        if (r.fonts.online) {
            if (r.fonts.url !== undefined) {
                layui.link(r.fonts.url)
            }
        } else {
            if (x(".larry-icon").length > 0) {
                var a = t + "css/fonts/larry-icon.css";
                layui.link(a)
            }
        }
    };
    u.prototype.plugin = function (e, r, t) {
        if (r === undefined) {
            r = function () {
                return true
            }
        }
        var n = false;
        if (x.isPlainObject(t)) {
            var a = ["plusDir", "jqDefined", "jqUrl"];
            t = this.configFilter(t, a);
            if (t.plusDir == undefined) {
                t.plusDir = g("layui.js").url
            }
            if (t.jqUrl == undefined) {
                t.jqUrl = g("layui.js").url
            }
            this.set(t)
        } else if (!x.isPlainObject(t) && t !== undefined) {
            this.error("第三方jQuery插件路径参数配置错误，请书写正确配置格式，否则将从默认路径加载插件！", this.tit[2], 0)
        } else {
            this.set({plusDir: g("layui.js").url, jqDefined: null, jqUrl: null})
        }
        if (typeof e == "string") {
            var i = e.lastIndexOf(".js");
            if (i !== -1) {
                e = e.substring(0, i) + ".js"
            } else {
                e = e + ".js"
            }
            var o = this.config.plusDir + e, l = y.createElement("script");
            l.type = "text/javascript";
            l.src = o;
            l.id = "larryms_" + e.substring(0, e.lastIndexOf(".js"));
            l.async = false;
            var s = document.getElementsByTagName("script"), c = document.getElementsByTagName("body")[0],
                u = s[s.length - 1];
            if (!this.config.jqDefined) {
                if (!window.jQuery && x) {
                    window.jQuery = x;
                    if (name != "layui.js") {
                        try {
                            c.insertBefore(l, u)
                        } catch (e) {
                        } finally {
                            c.insertBefore(l, u)
                        }
                    } else {
                        c.insertBefore(l, u)
                    }
                } else if (window.jQuery && x) {
                    if (name != "layui.js") {
                        try {
                            c.insertBefore(l, u)
                        } catch (e) {
                        } finally {
                            c.insertBefore(l, u)
                        }
                    } else {
                        c.insertBefore(l, u)
                    }
                } else {
                    return this.error("上下文环境中未检测jQuery对象，请正确配置自定义jq插件或手动在页面中引入 否则任何依赖jquery的第三方插件将不能正常运行！！！", this.tit[1], 0)
                }
                p();
                return this.success("成功执行第三方Jquery插件" + e + "的添加,请确认资源是否正确加载", "jq插件加载", 1)
            } else {
                var f = this.config.jqUrl + this.config.jqDefined, d = y.getElementsByTagName("head")[0];
                jq = y.createElement("script");
                jq.type = "text/javascript";
                jq.src = f;
                d.appendChild(jq);
                if (y.all) {
                    jq.onreadystatechange = function () {
                        var e = this.readyState;
                        if (e === "loaded" || e === "complete") {
                            window.jQuery = x;
                            if (name != "layui.js") {
                                try {
                                    c.insertBefore(l, u)
                                } catch (e) {
                                } finally {
                                    c.appendChild(l)
                                }
                            } else {
                                c.insertBefore(l, u)
                            }
                            p()
                        }
                    }
                } else {
                    jq.onload = function () {
                        window.jQuery = x;
                        if (name != "layui.js") {
                            try {
                                c.insertBefore(l, u)
                            } catch (e) {
                            } finally {
                                c.appendChild(l)
                            }
                        } else {
                            c.insertBefore(l, u)
                        }
                        p()
                    }
                }
                return this.success("成功执行第三方Jquery插件" + e + "的添加，请确认资源是否正确加载", this.sysName + "系统提示您：", 1)
            }
        } else {
            return this.error("请确保传入的是jQuery第三方插件名字符串而非其他类型", this.sysName + "系统提示您：", 0)
        }

        function p() {
            if (y.all) {
                l.onreadystatechange = function () {
                    var e = this.readyState;
                    if (e === "loaded" || e === "complete") {
                        r()
                    }
                }
            } else {
                l.onload = function () {
                    r()
                }
            }
            n = true
        }

        if (n) {
            return true
        }
    };
    u.prototype.fullSize = function () {
        var e = this, r = e.config, t = r.height, n
    };
    u.prototype.message = function (e, t, r, n) {
        var a = this, e = e || "default", t = t || "other", i = r || "larry-xiaolian1", o = 0, l;
        if (n !== undefined && n !== 0) {
            l = n * 1e3
        } else if (n == 0) {
            l = 0;
            o = 1
        } else {
            l = 1e3
        }
        if (e != "default") {
            if (t == "success" || t == "error" || t == "waring") {
                if (!r) {
                    if (t == "success") {
                        i = "larry-gou"
                    } else if (t == "error") {
                        i = "larry-cuowu3"
                    } else if (t == "waring") {
                        i = "larry-jinggao3"
                    }
                } else {
                    i = r
                }
            }
            s()
        } else {
            s()
        }

        function s() {
            return this.index = parent.layer.open({
                type: 1,
                skin: "larryms-message-layer",
                closeBtn: o,
                anim: Math.ceil(Math.random() * 6),
                shadeClose: false,
                shade: 0,
                title: false,
                time: l,
                area: ["600px", "auto"],
                resize: false,
                content: w(c).render({MSG: e, ICONS: i}),
                offset: "300px",
                success: function (e, r) {
                    if (t == "error") {
                        x("#messageBox").addClass("larry-message-error")
                    } else if (t == "waring") {
                        x("#messageBox").addClass("larry-message-waring")
                    }
                }
            })
        }
    };
    u.prototype.htmlRender = function (e, r) {
        var t = layui.cache.base + e + ".html";
        x.ajax({
            url: t, type: "get", dataType: "html", async: false, success: function (e) {
                x(r).html(e)
            }
        })
    };
    u.prototype.sysExportConsole = function (e, r, t, n) {
        var a = this, n = n || a.sysName;
        colors = ["red", "green", "blue", "#ff5722"], debugC = colors[Math.ceil(Math.random() * 4) - 1];
        console.log("%c{========" + n + "调试信息提示=========|", "color:" + debugC + "");
        console.log("code:=>" + r);
        if (r === 1 && t == "error") {
            console.log("status:=>false")
        } else if (r === 1 && t == "success") {
            console.log("status:=>true")
        }
        console.log(e);
        if (a.debug) {
            console.log("%c|---------------------------------------|}", "color:" + debugC + "")
        } else {
            console.log("%c|==================END==================}", "color:" + debugC + "")
        }
    };
    u.prototype.eventsCheck = function (e) {
        var r = {eventName: "", filter: ""};
        if (typeof e !== "string") {
            return larryms.error("事件名设置错误，请参考LarryMS API文档.", larryms.tit[2])
        }
        var t = e.indexOf("(");
        r.eventName = e.substr(0, t);
        r.filter = e.substring(t + 1, e.indexOf(")"));
        return r
    };
    u.prototype.elemCheck = function (e, r) {
        var t, n = this;
        if (r == "top_menu") {
            if (e === undefined) {
                t = "undefined";
                return t
            } else if (e == false) {
                t = "undefined";
                return t
            } else {
                if (typeof e !== "string" && typeof e !== "object") {
                    n.error(r + "参数未定义或设置出错", n.tit[1], 2);
                    t = "error";
                    return t
                }
            }
        } else {
            if (e !== undefined) {
                if (typeof e !== "string" && typeof e !== "object") {
                    n.error(r + "参数未定义或设置出错", n.tit[1], 2);
                    t = "error";
                    return t
                }
            } else {
                n.error("未设置【" + r + "】参数，请检查参数配置项", n.tit[1], 2);
                t = "error";
                return t
            }
        }
        if (typeof e === "string") {
            t = x("" + e + "")
        }
        if (typeof e === "object") {
            t = e
        }
        if (t.length === 0) {
            n.error("您虽然设置了" + r + "参数，但DOM中却查找不到定义的【" + e + "】元素,请仔细检查", n.tit[1], 2);
            t = "error";
            return t
        }
        var a = t.attr("lay-filter");
        if (r !== "larry-form-getValue") {
            if (a === undefined || a === "") {
                n.error("请为【" + e + "】容器设置lay-filter属性", n.tit[0], 2)
            }
        }
        return t
    };
    u.prototype.close = function (e) {
        return l.close(e)
    };
    u.prototype.load = function (e, r) {
        return l.load(e, r)
    };
    u.prototype.msg = function (e, r, t) {
        return l.msg(e, r, t)
    };
    u.prototype.error = function (e, r, t, n) {
        var a = this, e = e || false, n = n || 0, r = r || a.sysName;
        t = a.typeFn.isNumber(t) === true ? t : 0;
        if (t === 0) {
            var i = {code: 0, msg: e, title: r, time: n, status: false};
            if (a.debug) {
                a.sysExportConsole(e, t);
                console.log(i);
                console.log("%c【LarryMS================END================LarryMS】", "color:green")
            }
            return i
        } else if (t === 1) {
            if (a.debug) {
                a.sysExportConsole(e, t, "error")
            }
            return false
        } else {
            if (a.debug) {
                a.sysExportConsole(e, t)
            }
            return a.index = parent.layer.alert(e, {
                title: r,
                skin: "larry-debug",
                icon: 2,
                time: n,
                resize: false,
                zIndex: l.zIndex,
                anim: Math.ceil(Math.random() * 6)
            })
        }
    };
    u.prototype.success = function (e, r, t, n) {
        var a = this, e = e || true, n = n || 0, r = r || a.sysName;
        t = a.typeFn.isNumber(t) === true ? t : 0;
        if (t === 0) {
            if (a.debug) {
                a.sysExportConsole(e, t)
            }
            return {code: 0, msg: e, title: r, time: n, status: true}
        } else if (t === 1) {
            if (a.debug) {
                a.sysExportConsole(e, t, "success")
            }
            return true
        } else {
            if (a.debug) {
                a.sysExportConsole(e, t)
            }
            return a.index = parent.layer.alert(e, {
                title: r,
                skin: "larry-green",
                icon: 1,
                time: n,
                resize: false,
                zIndex: l.zIndex,
                anim: Math.ceil(Math.random() * 6)
            })
        }
    };
    u.prototype.tips = function (e, r, t) {
        return l.tips(e, r, t)
    };
    u.prototype.closeAll = function (e) {
        return l.closeAll(e)
    };
    u.prototype.alert = function (e, r) {
        l.alert(e, {end: r, scrollbar: false})
    };
    u.prototype.prompt = function (e, r) {
        return l.prompt(e, r)
    };
    u.prototype.photos = function (e, r, t) {
        return l.photos(e, r, t)
    };
    u.prototype.open = function (e, r) {
        var t = this, r = r !== undefined ? r : "current",
            n = {skin: "larry-green", anim: 0, maxmin: true, shade: .1, shadeClose: false};
        x.extend(n, e);
        if (r === "current") {
            var a = l.open(n);
            console.log(t.screen);
            if (t.screen < 2) {
                l.full(a)
            }
            if (!n.shadeClose) {
                x("#layui-layer-shade" + a).on("click", function () {
                    l.min(a);
                    x(this).hide();
                    layui.cache.layerIndex = a
                });
                var i = x("#layui-layer" + a).find(".layui-layer-max"),
                    o = x("#layui-layer" + a).find(".layui-layer-min");
                o.on("click", function () {
                    x("#layui-layer-shade" + a).hide();
                    layui.cache.layerIndex = a
                });
                i.on("click", function () {
                    x("#layui-layer-shade" + a).show()
                })
            }
            return a
        } else {
            return top.layer.open(n)
        }
    };
    u.prototype.confirm = function (e, r, t, n) {
        var a = this, i = {
            icon: 3,
            skin: "larry-debug",
            title: a.tit[0],
            closeBtn: 0,
            anim: Math.ceil(Math.random() * 6),
            btn: ["确定", "取消"]
        };
        x.extend(i, r);
        return index = l.confirm(e, i, function () {
            if (t && typeof t === "function") {
                t.call(this)
            }
            l.close(index)
        }, function () {
            if (n && typeof n === "function") {
                n.call(this)
            }
            a.close(index)
        })
    };
    u.prototype.escape = function (e) {
        return String(e || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
    };
    u.prototype.escape2Html = function (e) {
        var t = {lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"'};
        return e.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (e, r) {
            return t[r]
        })
    };
    u.prototype.convert = function (e) {
        var r = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"};
        var t = new RegExp("[" + Object.keys(r).join("") + "]", "g");
        return e.replace(t, function (e) {
            return r[e]
        })
    };
    u.prototype.content = function (e, t) {
        var a = this;
        var r = function (e) {
            return new RegExp("\\n*" + (e || "") + "(pre|hr|div|span|p|table|img|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5|fieldset|legend)([\\s\\S]*?)\\n*", "g")
        };
        e = a.escape(e || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/<br>/g, "\n").replace(/img\[([^\s]+?)\]/g, function (e) {
            return '<img src="' + e.replace(/(^img\[)|(\]$)/g, "") + '">'
        }).replace(/(\<pre\>)[\s\S]*?(\<\/pre\>)/g, function (e) {
            var r = e.replace(/(\<ol class=\"layui-code-ol\"\>)([\s\S]*?)(\<\/ol\>)/g, function (e, r, t, n) {
                return li = e.replace(/(\<li\>)([\s\S]*?)(\<\/li\>)/g, function (e, r, t) {
                    console.log(t);
                    console.log(r);
                    return "<li>" + a.convert(t || "") + "</li>"
                })
            });
            return r
        }).replace(/(\[pre\])[\s\S]*?(\[\/pre\])/g, function (e) {
            e = a.escape2Html(e);
            return '<pre class="layui-code" lay-skin="notepad">' + e.replace(/^(\[pre\])/g, "") + "</pre>"
        }).replace(/(\[quote\])[\s\S]*?(\[\/quote\])/g, function (e) {
            return '<div class="layui-elem-quote">' + e.replace(/^(\[quote\])|(\[\/quote\])/g, "") + "</div>"
        }).replace(/(\[p\])[\s\S]*?(\[\/p\])/g, function (e) {
            return '<p class="larryms-forum-p">' + e.replace(/^(\[p\])|(\[\/p\])/g, "") + "</p>"
        }).replace(/(\[li\])[\s\S]*?(\[\/li\])/g, function (e) {
            return '<li class="larryms-forum-li">' + e.replace(/^(\[li\])|(\[\/li\])/g, "") + "</li>"
        }).replace(/@(\S+)(\s+?|$)/g, '<a href="/jump.html?name=$1" class="fly-aite">@$1</a>$2').replace(/face\[([^\s\[\]]+?)\]/g, function (e) {
            var r = e.replace(/^face/g, "");
            return '<img class="larryms-face" alt="' + r + '" title="' + r + '" src="' + t[r] + '">'
        }).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function (e) {
            var r = (e.match(/a\(([\s\S]+?)\)\[/) || [])[1];
            var t = (e.match(/\)\[([\s\S]*?)\]/) || [])[1];
            if (!r) return e;
            var n = /^(http(s)*:\/\/)\b(?!(\w+\.)*(larryms.com|larrycms.com|larryms.cn|github.com|baidu.com))\b/.test(r.replace(/\s/g, ""));
            return '<a href="' + r + '" target="_blank"' + (n ? ' rel="nofollow"' : "") + ">" + (t || r) + "</a>"
        }).replace(/\<a\b[^>]+\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a\>/g, function (e, r, t) {
            var n = r;
            var a = t;
            if (!n) return e;
            var i = /^(http(s)*:\/\/)\b(?!(\w+\.)*(larryms.com|larrycms.com|larryms.cn|github.com|baidu.com|larrycrm.com|layui.com|thinkphp.cn|gitee.com|microsoft.com|kancloud.cn|php.net|cnblogs.com|csdn.net|qinshouwei.com|erpmb.com|tailakeji.com))\b/.test(n.replace(/\s/g, ""));
            if (i) {
                return '<a href="https://www.larryms.com/forums.html" target="_blank">' + a + "</a>"
            } else {
                return '<a href="' + n + '" target="_blank" rel="nofollow" >' + (a || n) + "</a>"
            }
        }).replace(/^(\n)\n/g, "<br>");
        return e
    };
    u.prototype.CheckIsColor = function (e) {
        var r = "^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$";
        var t = new RegExp(r);
        if (e.match(t) == null) {
            r = "^[rR][gG][Bb][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[)]{1}$";
            t = new RegExp(r);
            if (e.match(t) == null) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    };
    u.prototype.typeFn = {
        isString: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "String"
        }, isNumber: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Number"
        }, isBoolean: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Boolean"
        }, isFunction: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Function"
        }, isNull: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Null"
        }, isUndefined: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Undefined"
        }, isObj: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Object"
        }, isArray: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Array"
        }, isDate: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Date"
        }, isRegExp: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "RegExp"
        }, isError: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Error"
        }, isSymbol: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Symbol"
        }, isPromise: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Promise"
        }, isSet: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1) === "Set"
        }, isFalse: function (e) {
            if (e == "" || e == undefined || e == null || e == "null" || e == "undefined" || e == 0 || e == false || e == NaN) return true;
            return false
        }, isTrue: function (e) {
            return !this.isFalse(e)
        }, isIOS: function () {
            var e = navigator.userAgent;
            if (e.indexOf("Android") > -1 || e.indexOf("Linux") > -1) {
                return false
            } else if (e.indexOf("iPhone") > -1) {
                return true
            } else if (e.indexOf("iPad") > -1) {
                return false
            } else if (e.indexOf("Windows Phone") > -1) {
                return false
            } else {
                return false
            }
        }, isPC: function () {
            var e = navigator.userAgent;
            var r = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var t = true;
            for (var n = 0; n < r.length; n++) {
                if (e.indexOf(r[n]) > 0) {
                    t = false;
                    break
                }
            }
            return t
        }, browserType: function () {
            var e = navigator.userAgent;
            var r = e.indexOf("Opera") > -1;
            var t = e.indexOf("compatible") > -1 && e.indexOf("MSIE") > -1 && !r;
            var n = e.indexOf("Trident") > -1 && e.indexOf("rv:11.0") > -1;
            var a = e.indexOf("Edge") > -1 && !t;
            var i = e.indexOf("Firefox") > -1;
            var o = e.indexOf("Safari") > -1 && e.indexOf("Chrome") == -1;
            var l = e.indexOf("Chrome") > -1 && e.indexOf("Safari") > -1;
            if (t) {
                var s = new RegExp("MSIE (\\d+\\.\\d+);");
                s.test(e);
                var c = parseFloat(RegExp["$1"]);
                if (c == 7) return "IE7"; else if (c == 8) return "IE8"; else if (c == 9) return "IE9"; else if (c == 10) return "IE10"; else return "IE7以下"
            }
            if (n) return "IE11";
            if (a) return "Edge";
            if (i) return "FF";
            if (r) return "Opera";
            if (o) return "Safari";
            if (l) return "Chrome"
        }
    };
    u.prototype.isCardID = function (e) {
        var r = this;
        if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(e)) {
            return r.error("你输入的身份证长度或格式错误")
        }
        var t = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        if (!t[parseInt(e.substr(0, 2))]) {
            return r.error("你的身份证地区非法")
        }
        var n = (e.substr(6, 4) + "-" + Number(e.substr(10, 2)) + "-" + Number(e.substr(12, 2))).replace(/-/g, "/"),
            a = new Date(n);
        if (n != a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate()) {
            return r.error("身份证上的出生日期非法")
        }
        var i = 0, o = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], l = "10X98765432";
        for (var s = 0; s < e.length - 1; s++) {
            i += e[s] * o[s]
        }
        var c = l[i % 11];
        if (e[e.length - 1] != c) {
            return r.error("你输入的身份证号非法")
        }
        return r.success()
    };
    u.prototype.verify = function () {
        n.verify({
            pwd: [/^[a-zA-Z]\w{5,17}$/, "密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线"],
            postal: [/[1-9]\d{5}(?!\d)/, "请输入正确的邮政编码"],
            tel: [/^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/, "请输入正确的座机号码"],
            qq: [/^[1-9][0-9]{4,9}$/, "请输入正确的QQ号码"],
            english: [/^[a-zA-Z]+$/, "请输入英文"],
            chinese: [/^[\u4E00-\u9FA5]+$/, "请输入中文"],
            chineseName: [/^[\u4E00-\u9FA5]{2,4}$/, "请输入您的中文姓名"],
            amount: [/^([1-9][\d]{0,10}|0)(\.[\d]{1,2})?$/, "请输入正确的金额"],
            positiveInt: [/^[1-9]*[1-9][0-9]*$/, "请输入正整数"],
            bankCard: [/^\d{16}|\d{19}$/, "16位或19位银行卡号"]
        })
    };
    u.prototype.isVerify = function (e, r) {
        switch (r) {
            case"phone":
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(e)) {
                    return false
                } else {
                    return true
                }
            default:
                return false
        }
    };
    u.prototype.triggerVerify = function (e, r) {
    };
    u.prototype.stringFn = {
        trim: function (e, r) {
            r = r || 1;
            switch (r) {
                case 1:
                    return e.replace(/\s+/g, "");
                case 2:
                    return e.replace(/(^\s*)|(\s*$)/g, "");
                case 3:
                    return e.replace(/(^\s*)/g, "");
                case 4:
                    return e.replace(/(\s*$)/g, "");
                default:
                    return e
            }
        }, strLenCount: function (e) {
            var r = 0, t = e.length, n = -1;
            for (var a = 0; a < t; a++) {
                n = e.charCodeAt(a);
                if (n >= 0 && n <= 128) {
                    r += 1
                } else {
                    r += 3
                }
            }
            return r
        }, changeCase: function (e, r) {
            r = r || 5;
            switch (r) {
                case 1:
                    return e.replace(/\b\w+\b/g, function (e) {
                        return e.substring(0, 1).toUpperCase() + e.substring(1).toLowerCase()
                    });
                case 2:
                    return e.replace(/\b\w+\b/g, function (e) {
                        return e.substring(0, 1).toLowerCase() + e.substring(1).toUpperCase()
                    });
                case 3:
                    return e.split("").map(function (e) {
                        if (/[a-z]/.test(e)) {
                            return e.toUpperCase()
                        } else {
                            return e.toLowerCase()
                        }
                    }).join("");
                case 4:
                    return e.toUpperCase();
                case 5:
                    return e.toLowerCase();
                default:
                    return e
            }
        }, checkPwd: function (e) {
            var r = 0;
            if (e.length < 6) {
                return r
            }
            if (/[0-9]/.test(e)) {
                r++
            }
            if (/[a-z]/.test(e)) {
                r++
            }
            if (/[A-Z]/.test(e)) {
                r++
            }
            if (/[\.|-|_]/.test(e)) {
                r++
            }
            return r
        }, filterHtml: function (e) {
            e = e.replace(/&/gi, "&amp;");
            e = e.replace(/</gi, "&lt;");
            e = e.replace(/>/gi, "&gt;");
            e = e.replace(" ", "&nbsp;");
            e = e.replace(/(<script)/gi, "&lt;script").replace(/(<script>)/gi, "&lt;script&gt;").replace(/(<\/script>)/gi, "&lt;/script&gt;");
            return e
        }
    };
    u.prototype.configFilter = function (e, r) {
        var t = {};
        for (var n in e) {
            if (x.inArray(n, r) || x.inArray(n, r) == 0) {
                t[n] = e[n]
            }
        }
        return t
    };
    u.prototype.waring = function () {
    };
    u.prototype.ArrayFn = {
        contains: function (e, r) {
            if (!Array.prototype.indexOf) {
                Array.prototype.indexOf = function (e) {
                    var r = this.length >>> 0;
                    var t = Number(arguments[1]) || 0;
                    t = t < 0 ? Math.ceil(t) : Math.floor(t);
                    if (t < 0) t += r;
                    for (; t < r; t++) {
                        if (t in this && this[t] === e) return t
                    }
                    return -1
                }
            }
            return e.indexOf(r) != -1 ? true : false
        }, each: function (e, r) {
            r = r || Function;
            var t = [];
            var n = Array.prototype.slice.call(arguments, 1);
            for (var a = 0; a < e.length; a++) {
                var i = r.apply(e, [e[a], a].concat(n));
                if (i != null) t.push(i)
            }
        }, formArray: function (e) {
            var e = [];
            if (Array.isArray(ary)) {
                e = ary
            } else {
                e = Array.prototype.slice.call(ary)
            }
            return e
        }, max: function (e) {
            return Math.max.apply(null, e)
        }, min: function (e) {
            return Math.min.apply(null, e)
        }, sum: function (e) {
            return e.reduce(function (e, r, t, n) {
                return e + r
            })
        }, average: function (e) {
            return this.sum(e) / e.length
        }, remove: function (e, r) {
            var t = e.indexOf(r);
            if (t > -1) {
                e.splice(t, 1)
            }
            return e
        }, sort: function (t, n) {
            n = n || 1;
            return t.sort(function (e, r) {
                switch (n) {
                    case 1:
                        return e - r;
                    case 2:
                        return r - e;
                    case 3:
                        return Math.random() - .5;
                    default:
                        return t
                }
            })
        }, map: function (e, r, t) {
            var n = t || window;
            var a = [];
            for (var i = 0, o = e.length; i < o; ++i) {
                var l = r.call(n, e[i], i, this);
                if (l != null) a.push(l)
            }
            return a
        }, unique: function (e) {
            if (Array.hasOwnProperty("from")) {
                return Array.from(new Set(e))
            } else {
                var r = [], t = true;
                for (var n = 0; n < e.length; n++) {
                    if (e[n] !== e[n]) {
                        if (t && r.indexOf(e[n]) === -1) {
                            r.push(e[n]);
                            t = false
                        }
                    } else {
                        if (r.indexOf(e[n]) === -1) r.push(e[n])
                    }
                }
                return r
            }
        }
    };
    u.prototype.utils = {
        fixbar: function (t) {
            var e = "larryms-fixbar", r = "larryms-fixbar-top", n = x(document), a = x("body"), i, o;
            t = x.extend({showHeight: 200}, t);
            t.bar1 = t.bar1 === true ? "larry-shouye4" : t.bar1;
            t.bar2 = t.bar2 === true ? "larry-kefu" : t.bar2;
            t.bgcolor = t.bgcolor ? "background-color:" + t.bgcolor : "";
            t.custom = t.custom ? t.custom : "";
            var l = [t.bar1, t.bar2, "larry-fanhuidingbu"],
                s = x(['<ul class="' + e + '">', t.bar1 ? '<li class="backControl" lay-type="bar1" style="' + t.bgcolor + '" ' + t.custom + "><em>返回首页</em></li>" : "", t.bar2 ? '<li class="layui-icon ' + l[1] + '" lay-type="bar2" style="' + t.bgcolor + '" ' + t.custom + "></li>" : "", '<li class="larry-icon ' + l[2] + '" id="' + r + '" lay-type="top" style="' + t.bgcolor + '"></li>', "</ul>"].join("")),
                c = s.find("#" + r), u = s.find(".backControl");
            if (window.top !== window.self) {
                var f = self.frameElement, d = f.id;
                c.show();
                if (d == "ifr-0") {
                    u.hide()
                }
            }
            if (x("." + e)[0]) return;
            typeof t.css === "object" && s.css(t.css);
            a.append(s), scroll();
            s.find("li").on("click", function () {
                var e = x(this), r = e.attr("lay-type");
                if (r === "top") {
                    x("html,body").animate({scrollTop: 0}, 300)
                }
                t.click && t.click.call(this, r)
            })
        }, getUrlParams: function (e) {
            var r = new RegExp("(^|&)" + e + "=([^&]*)(&|$)");
            var t = decodeURI(window.location.search).substr(1).match(r);
            if (t != null) return t[2];
            return null
        }, getUrlAllParams: function (e) {
            var e = e ? e : window.location.href;
            var r = e.substring(e.indexOf("?") + 1), t = r.split("&"), n = {};
            for (var a = 0, i = t.length; a < i; a++) {
                var o = t[a].indexOf("=");
                if (o == -1) {
                    continue
                }
                var l = t[a].substring(0, o), s = window.decodeURIComponent(t[a].substring(o + 1));
                n[l] = s
            }
            return n
        }, delParamsUrl: function (e, r) {
            var t = e.split("?")[0] + "?";
            var n = e.split("?")[1];
            if (n.indexOf(r) > -1) {
                var a = {};
                var i = n.split("&");
                for (var o = 0; o < i.length; o++) {
                    i[o] = i[o].split("=");
                    a[i[o][0]] = i[o][1]
                }
                delete a[r];
                var e = t + JSON.stringify(a).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
                return e
            } else {
                return e
            }
        }, random: function (e, r) {
            if (arguments.length === 2) {
                return Math.floor(e + Math.random() * (r + 1 - e))
            } else {
                return null
            }
        }, numberToChinese: function (e) {
            var r = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
            var t = new Array("", "十", "百", "仟", "萬", "億", "点", "");
            var n = ("" + e).replace(/(^0*)/g, "").split("."), a = 0, i = "";
            for (var o = n[0].length - 1; o >= 0; o--) {
                switch (a) {
                    case 0:
                        i = t[7] + i;
                        break;
                    case 4:
                        if (!new RegExp("0{4}//d{" + (n[0].length - o - 1) + "}$").test(n[0])) i = t[4] + i;
                        break;
                    case 8:
                        i = t[5] + i;
                        t[7] = t[5];
                        a = 0;
                        break
                }
                if (a % 4 == 2 && n[0].charAt(o + 2) != 0 && n[0].charAt(o + 1) == 0) i = r[0] + i;
                if (n[0].charAt(o) != 0) i = r[n[0].charAt(o)] + t[a % 4] + i;
                a++
            }
            if (n.length > 1) {
                i += t[6];
                for (var o = 0; o < n[1].length; o++) i += r[n[1].charAt(o)]
            }
            if (i == "一十") i = "十";
            if (i.match(/^一/) && i.length == 3) i = i.replace("一", "");
            return i
        }, changeToChinese: function (e) {
            if (typeof e == "number") {
                e = new String(e)
            }
            e = e.replace(/,/g, "");
            e = e.replace(/ /g, "");
            e = e.replace(/￥/g, "");
            if (isNaN(e)) {
                return ""
            }
            var r = String(e).split(".");
            var t = "";
            for (var n = r[0].length - 1; n >= 0; n--) {
                if (r[0].length > 10) {
                    return ""
                }
                var a = "";
                var i = r[0].charAt(n);
                switch (i) {
                    case"0":
                        a = "零" + a;
                        break;
                    case"1":
                        a = "壹" + a;
                        break;
                    case"2":
                        a = "贰" + a;
                        break;
                    case"3":
                        a = "叁" + a;
                        break;
                    case"4":
                        a = "肆" + a;
                        break;
                    case"5":
                        a = "伍" + a;
                        break;
                    case"6":
                        a = "陆" + a;
                        break;
                    case"7":
                        a = "柒" + a;
                        break;
                    case"8":
                        a = "捌" + a;
                        break;
                    case"9":
                        a = "玖" + a;
                        break
                }
                switch (r[0].length - n - 1) {
                    case 0:
                        a = a + "元";
                        break;
                    case 1:
                        if (i != 0) a = a + "拾";
                        break;
                    case 2:
                        if (i != 0) a = a + "佰";
                        break;
                    case 3:
                        if (i != 0) a = a + "仟";
                        break;
                    case 4:
                        a = a + "万";
                        break;
                    case 5:
                        if (i != 0) a = a + "拾";
                        break;
                    case 6:
                        if (i != 0) a = a + "佰";
                        break;
                    case 7:
                        if (i != 0) a = a + "仟";
                        break;
                    case 8:
                        a = a + "亿";
                        break;
                    case 9:
                        a = a + "拾";
                        break
                }
                var t = a + t
            }
            if (e.indexOf(".") != -1) {
                if (r[1].length > 2) {
                    r[1] = r[1].substr(0, 2)
                }
                for (n = 0; n < r[1].length; n++) {
                    a = "";
                    i = r[1].charAt(n);
                    switch (i) {
                        case"0":
                            a = "零" + a;
                            break;
                        case"1":
                            a = "壹" + a;
                            break;
                        case"2":
                            a = "贰" + a;
                            break;
                        case"3":
                            a = "叁" + a;
                            break;
                        case"4":
                            a = "肆" + a;
                            break;
                        case"5":
                            a = "伍" + a;
                            break;
                        case"6":
                            a = "陆" + a;
                            break;
                        case"7":
                            a = "柒" + a;
                            break;
                        case"8":
                            a = "捌" + a;
                            break;
                        case"9":
                            a = "玖" + a;
                            break
                    }
                    if (n == 0) a = a + "角";
                    if (n == 1) a = a + "分";
                    t = t + a
                }
            }
            while (t.search("零零") != -1) t = t.replace("零零", "零");
            t = t.replace("零亿", "亿");
            t = t.replace("亿万", "亿");
            t = t.replace("零万", "万");
            t = t.replace("零元", "元");
            t = t.replace("零角", "");
            t = t.replace("零分", "");
            if (t.charAt(t.length - 1) == "元") {
                t = t + "整"
            }
            return t
        }
    };
    u.prototype.cleanCached = {
        clearAll: function () {
            m()
        }
    };
    u.prototype.getDay = function (e) {
        var r, t = e.getDay();
        switch (t) {
            case 1:
                r = 1;
                break;
            case 2:
                r = 2;
                break;
            case 3:
                r = 3;
                break;
            case 4:
                r = 4;
                break;
            case 5:
                r = 5;
                break;
            case 6:
                r = 6;
                break;
            default:
                r = 7
        }
        return r
    };
    u.prototype.fullScreen = {
        entry: function () {
            var e = document.documentElement;
            if (e.requestFullScreen) {
                e.requestFullScreen()
            } else if (e.mozRequestFullScreen) {
                e.mozRequestFullScreen()
            } else if (e.webkitRequestFullScreen) {
                e.webkitRequestFullScreen()
            }
        }, exit: function () {
            var e = document;
            if (e.exitFullscreen) {
                e.exitFullscreen()
            } else if (e.mozCancelFullScreen) {
                e.mozCancelFullScreen()
            } else if (e.webkitCancelFullScreen) {
                e.webkitCancelFullScreen()
            }
        }, fscreens: function () {
            var e = document.body;
            if (e.webkitRequestFullScreen) {
                e.webkitRequestFullScreen()
            } else if (e.mozRequestFullScreen) {
                e.mozRequestFullScreen()
            } else if (e.requestFullScreen) {
                e.requestFullscreen()
            } else {
            }
        }
    };
    u.prototype.getValue = function (e) {
        var r = this, t = "";
        var n = r.elemCheck(e, "larry-form-getValue"), a = n.attr("type");
        switch (a) {
            case"text":
                t = n.attr("value");
                break;
            case"select":
                t = n.attr("value");
                break;
            case"radio":
                t = n.attr("value");
                break;
            case"checkbox":
                t = n.val();
                break;
            default:
                break
        }
        return t
    };
    u.prototype.panel = function () {
        x(".larry-panel .tools").off("click").on("click", function () {
            if (x(this).hasClass("larry-unfold1")) {
                x(this).addClass("larry-fold9").removeClass("larry-unfold1");
                x(this).parent(".larry-panel-header").siblings(".larry-panel-body").slideToggle()
            } else {
                x(this).addClass("larry-unfold1").removeClass("larry-fold9");
                x(this).parent(".larry-panel-header").siblings(".larry-panel-body").slideToggle()
            }
        });
        x(".larry-panel .close").off("click").on("click", function () {
            x(this).parents(".larry-panel").parent().fadeOut()
        })
    };
    u.prototype.utf16to8 = function (e) {
        var r, t, n, a;
        r = "";
        n = e.length;
        for (t = 0; t < n; t++) {
            a = e.charCodeAt(t);
            if (a >= 1 && a <= 127) {
                r += e.charAt(t)
            } else if (a > 2047) {
                r += String.fromCharCode(224 | a >> 12 & 15);
                r += String.fromCharCode(128 | a >> 6 & 63);
                r += String.fromCharCode(128 | a >> 0 & 63)
            } else {
                r += String.fromCharCode(192 | a >> 6 & 31);
                r += String.fromCharCode(128 | a >> 0 & 63)
            }
        }
        return r
    };
    u.prototype.notice = function (e, r, t, n) {
        var a = this;
        var i = {
            title: false,
            msg: "You have a new message!",
            url: "",
            msgtype: "info",
            color: false,
            bgcolor: false,
            delay: 500
        }, o = {
            type: 1,
            font: "larry-icon",
            isicon: true,
            icon: "",
            action: 1,
            opentype: 2,
            navid: undefined,
            navgroup: undefined,
            navtitle: undefined,
            navfont: undefined,
            navicon: undefined,
            area: ["90%", "90%"],
            tabmode: "page",
            direction: {top: false, left: false, right: false, bottom: false},
            offset: ["10px", "10px"],
            position: "bottom-right",
            closable: true,
            time: 5e3,
            hide: "auto",
            audio: true,
            audioUrl: layui.cache.base + "images/msg.mp3",
            transition: {in: "pt-page-moveFromRightFade", out: "pt-page-fade"},
            theme: "larryms-notice-fade",
            tpl: "",
            end: null
        };
        var l = {ENTER: 13, ESC: 27, F1: 112, F12: 123, LEFT: 37, RIGHT: 39};
        x.extend(o, r);
        x.extend(i, e);
        var s = "larryms-msg-info";
        switch (i.msgtype) {
            case"info":
                s = "larryms-msg-info";
                o.icon = "larry-info";
                break;
            case"success":
                s = "larryms-msg-success";
                o.icon = "larry-caozuochenggong";
                break;
            case"error":
                s = "larryms-msg-error";
                o.icon = "larry-cuowu4";
                break;
            case"warning":
                s = "larryms-msg-warning";
                o.icon = "larry-jinggao5";
                break;
            case"danger":
                s = "larryms-msg-danger";
                o.icon = "larry-zhongyao";
                break;
            default:
                s = "larryms-msg-" + i.msgtype;
                break
        }
        var c = "";
        if (i.bgcolor !== false) {
            c = "background:" + i.bgcolor + ";"
        }
        if (i.color !== false) {
            c += "color:" + i.color + ";"
        }
        var u = "", f = "";
        if (o.action == 1) {
        } else if (o.action == 2) {
            if (o.opentype == 1) {
                u = 'data-action="layer" data-type="1"';
                f = '<cite class="layui-hide">' + i.msg + "</cite>"
            } else if (o.opentype == 2) {
                if (i.url == "") {
                    console.log("notice参数设置出错");
                    return false
                }
                u = 'data-action="layer" data-url="' + i.url + '" data-title="' + (i.title || o.navtitle) + '" data-type="2"';
                f = ""
            }
        } else if (o.action == 3) {
            u = 'larry-tab="page" data-action="tab" data-url="' + i.url + '"  data-id="' + o.navid + '" data-group="' + o.navgroup + '" data-icon="' + o.navicon + '" data-font="' + o.navfont + '"';
            f = '<cite class="layui-hide">' + o.navtitle + "</cite>"
        } else if (o.action == 4 && i.url !== "") {
            u = 'data-action="_blank" data-url="' + i.url + '"';
            f = ""
        } else {
        }
        var d = ['<div class="larryms-notice layui-card {{d.THEME}} {{d.MSGTYPE}} {{d.ANIM}}" id="larryms_notice{{d.INDEX}}" style="{{d.STYLES}}">', '<div class="layui-card-header {{d.TitStatus}}">{{d.TITLE}}</div>', '<i class="larry-icon larry-guanbi1 larryms-msg-close {{d.AUTOCLOSE}}"></i>', '<div class="layui-card-body" {{d.MSGATTR}}>{{d.CITE}}', '<i class="larryms-msg-icon {{d.FONT}} {{d.ICON}}"></i>', '<p class="larryms-msg-body">{{d.MSG}}</p>', "</div>", "</div>"].join("");
        var p = "";
        if (!i.title) {
            p = "layui-hide";
            i.title = ""
        }
        if (!o.isicon) {
            o.icon = "layui-hide";
            o.font = "none"
        }
        if (o.hide == "click") {
            o.hide = "layui-show"
        } else {
            o.hide = "layui-hide"
        }

        function y() {
        }

        var g = w(d).render({
            INDEX: layui.cache.NOTICEINDEX,
            THEME: o.theme,
            MSGTYPE: s,
            ANIM: o.transition.in,
            STYLES: c,
            TitStatus: p,
            TITLE: i.title,
            MSGATTR: u,
            CITE: f,
            AUTOCLOSE: o.hide,
            FONT: o.font,
            ICON: o.icon,
            MSG: i.msg
        });

        function m(e) {
            var r;
            if (x(e).data("group") !== undefined) {
                r = x(e).data("group")
            } else {
                r = "larry-temp"
            }
            var t = {
                href: x(e).data("url"),
                id: x(e).data("id"),
                font: x(e).children("i").data("font"),
                icon: x(e).children("i").data("icon"),
                group: r,
                title: x(e).children("cite").text(),
                addType: "page"
            };
            top.larryTab.tabAdd(t)
        }

        function h(e) {
            var r = e.data("url"), t = e.data("title"), n = e.data("type");
            if (t == "") {
                t = "信息"
            }
            if (n == 2) {
                var a = top.layer.open({
                    title: t,
                    type: 2,
                    skin: "larry-green",
                    closeBtn: 1,
                    shadeClose: false,
                    area: o.area,
                    maxmin: true,
                    content: r,
                    success: function () {
                    }
                })
            } else {
                top.layer.open({
                    title: t,
                    type: 1,
                    closeBtn: 1,
                    skin: "larryms-message-layer",
                    anim: Math.ceil(Math.random() * 6),
                    shadeClose: false,
                    shade: 0,
                    area: o.area,
                    maxmin: true,
                    content: e.children("cite").text()
                })
            }
        }

        function b(e) {
            var r = e.data("url");
            top.open(r)
        }

        function v(e) {
            if (e.data("action") == "tab") {
                m(e)
            } else if (e.data("action") == "layer") {
                h(e)
            } else if (e.data("action") == "_blank") {
                b(e)
            }
        }

        (function () {
            if (typeof n === "function") {
                n()
            }
            if (o.type == 1) {
                var e = top.document.body;
                if (!x(e).find(".larryms-notice-box").children(".larryms-notice").length) {
                    x(e).find(".larryms-notice-box").remove()
                }
                if (!x(e).find(".larryms-notice-box").length) {
                    x(e).append('<div class="larryms-notice-box notice-' + o.position + '" id="larryms-msg"></div>')
                }
                x(e).children("#larryms-msg").append(g);
                var r = "#" + x(g).attr("id");
                if (x(e).find(r).children(".larryms-msg-close").hasClass("layui-hide")) {
                    setTimeout(function () {
                        x(e).find(r).removeClass(o.transition.in).addClass(o.transition.out);
                        setTimeout(function () {
                            x(e).find(r).remove()
                        }, i.delay)
                    }, o.time)
                }
                x(e).find(".larryms-notice-box .larryms-msg-close").on("click", function () {
                    x(this).parents(".larryms-notice").remove();
                    if (!x(e).find(".larryms-notice-box").children(".larryms-notice").length) {
                        x(e).find(".larryms-notice-box").remove()
                    }
                });
                x(e).find(r).on("click", function () {
                    var e = x(this).children(".layui-card-body");
                    v(e);
                    x(this).remove();
                    if (typeof t == "function") {
                        t()
                    }
                });
                layui.cache.NOTICEINDEX++
            } else if (o.type == 2) {
                a.notify(i)
            }
            if (o.audio) {
                a.player(o.audioUrl)
            }
        })()
    };
    u.prototype.noticeAllClose = function () {
        if (x(top.document).find(".larryms-notice-box").length) {
            x(top.document).find(".larryms-notice-box").remove()
        }
    };
    u.prototype.notify = function (t) {
        if (window.Notification && window.Notification.permission !== "granted") {
            window.Notification.requestPermission()
        }
        Notification.requestPermission(function (e) {
            var r = new Notification("test", {body: t.msg})
        })
    };
    u.prototype.createAudio = function (e) {
        var r = this;
        audioElm = window.top.document.createElement("audio");
        var t = void 0;
        if (r.typeFn.isArray(e) && e.length > 0) {
            for (var n = 0; n < e.length; n++) {
                t = window.top.document.createElement("source");
                t.src = e[n];
                t.type = "audio/" + d(e[n]);
                audioElm.appendChild(t)
            }
        } else {
            audioElm.src = e
        }
        return audioElm
    };

    function d(e) {
        return e.match(/\.([^\\.]+)$/)[1]
    }

    u.prototype.player = function (e) {
        var r = this;
        if (!e) {
            return
        }
        r.audioElm = r.createAudio(e);
        window.top.document.body.appendChild(r.audioElm);
        x(r.audioElm).get(0).play();
        x(r.audioElm).get(0).addEventListener("ended", function () {
            x(r.audioElm).remove()
        }, false);
        return r
    };

    function p(e) {
        var r = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (r) {
            for (var t = r.length; t--;) document.cookie = r[t] + "=0;expires=" + new Date(0).toUTCString()
        }
    }

    function m(e) {
        layui.data(e, null);
        localStorage.clear();
        sessionStorage.clear();
        p()
    }

    function h(e, r, t) {
        e = larry.stringFn.trim(e);
        t = larry.stringFn.trim(t);
        r = larry.stringFn.trim(r);
        var n = t.substr(80, 32).toLowerCase();
        var a = x.md5("LarryMS" + e + r + "larryms.com");
        if (n == a) {
            return true
        } else {
            return false
        }
    }

    window.larry = new u;
    larry.init();
    e(s, larry)
});