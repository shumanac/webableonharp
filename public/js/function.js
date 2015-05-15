function ParticleSlider(a) {
        var b = this;
        if (b.sliderId = "particle-slider", b.color = "#fff", b.hoverColor = "#88f", b.width = 0, b.height = 0, b.ptlGap = 0, b.ptlSize = 1, b.slideDelay = 10, b.arrowPadding = 10, b.showArrowControls = !0, b.onNextSlide = null, b.onWidthChange = null, b.onHeightChange = null, b.onSizeChange = null, b.monochrome = !1, b.mouseForce = 1e4, b.restless = !0, b.imgs = [], a)
            for (var c = ["color", "hoverColor", "width", "height", "ptlGap", "ptlSize", "slideDelay", "arrowPadding", "sliderId", "showArrowControls", "onNextSlide", "monochrome", "mouseForce", "restless", "imgs", "onSizeChange", "onWidthChange", "onHeightChange"], d = 0, e = c.length; e > d; d++) a[c[d]] && (b[c[d]] = a[c[d]]);
        if (b.$container = b.$("#" + b.sliderId), b.$$children = b.$container.childNodes, b.$controlsContainer = b.$(".controls"), b.$$slides = b.$(".slide", b.$(".slides").childNodes, !0), b.$controlLeft = null, b.$controlRight = null, b.$canv = b.$(".draw"), b.$srcCanv = document.createElement("canvas"), b.$srcCanv.style.display = "none", b.$container.appendChild(b.$srcCanv), b.$prevCanv = document.createElement("canvas"), b.$prevCanv.style.display = "none", b.$container.appendChild(b.$prevCanv), b.$nextCanv = document.createElement("canvas"), b.$nextCanv.style.display = "none", b.$container.appendChild(b.$nextCanv), b.$overlay = document.createElement("p"), b.$container.appendChild(b.$overlay), b.imgControlPrev = null, b.imgControlNext = null, b.$$slides.length <= 1 && (b.showArrowControls = !1), b.$controlsContainer && b.$controlsContainer.childNodes && 1 == b.showArrowControls ? (b.$controlLeft = b.$(".left", b.$controlsContainer.childNodes), b.$controlRight = b.$(".right", b.$controlsContainer.childNodes), b.imgControlPrev = new Image, b.imgControlNext = new Image, b.imgControlPrev.onload = function() {
                b.$prevCanv.height = this.height, b.$prevCanv.width = this.width, b.loadingStep()
            }, b.imgControlNext.onload = function() {
                b.$nextCanv.height = this.height, b.$nextCanv.width = this.width, b.loadingStep()
            }, b.imgControlPrev.src = b.$controlLeft.getAttribute("data-src"), b.imgControlNext.src = b.$controlRight.getAttribute("data-src")) : b.showArrowControls = !1, b.width <= 0 && (b.width = b.$container.clientWidth), b.height <= 0 && (b.height = b.$container.clientHeight), b.mouseDownRegion = 0, b.colorArr = b.parseColor(b.color), b.hoverColorArr = b.parseColor(b.hoverColor), b.mx = -1, b.my = -1, b.swipeOffset = 0, b.cw = b.getCw(), b.ch = b.getCh(), b.frame = 0, b.nextFrameTimer = null, b.nextSlideTimer = !1, b.currImg = 0, b.lastImg = 0, b.imagesLoaded = 0, b.pxlBuffer = {
                first: null
            }, b.recycleBuffer = {
                first: null
            }, b.ctx = b.$canv.getContext("2d"), b.srcCtx = b.$srcCanv.getContext("2d"), b.prevCtx = b.$prevCanv.getContext("2d"), b.nextCtx = b.$nextCanv.getContext("2d"), b.$canv.width = b.cw, b.$canv.height = b.ch, b.shuffle = function() {
                for (var a, b, c = 0, d = this.length; d > c; c++) b = Math.floor(Math.random() * d), a = this[c], this[c] = this[b], this[b] = a
            }, Array.prototype.shuffle = b.shuffle, b.$canv.onmouseout = function() {
                b.mx = -1, b.my = -1, b.mouseDownRegion = 0
            }, b.$canv.onmousemove = function(a) {
                function c(a) {
                    var c = 0,
                        d = 0,
                        e = "string" == typeof a ? b.$(a) : a;
                    if (e) {
                        c = e.offsetLeft, d = e.offsetTop;
                        for (var f = document.getElementsByTagName("body")[0]; e.offsetParent && e != f;) c += e.offsetParent.offsetLeft, d += e.offsetParent.offsetTop, e = e.offsetParent
                    }
                    this.x = c, this.y = d
                }
                var d = new c(b.$container);
                b.mx = a.clientX - d.x, b.my = a.clientY - d.y
            }, b.$canv.onmousedown = function() {
                if (b.imgs.length > 1) {
                    var a = 0;
                    b.mx >= 0 && b.mx < 2 * b.arrowPadding + b.$prevCanv.width ? a = -1 : b.mx > 0 && b.mx > b.cw - (2 * b.arrowPadding + b.$nextCanv.width) && (a = 1), b.mouseDownRegion = a
                }
            }, b.$canv.onmouseup = function() {
                if (b.imgs.length > 1) {
                    var a = "";
                    b.mx >= 0 && b.mx < 2 * b.arrowPadding + b.$prevCanv.width ? a = -1 : b.mx > 0 && b.mx > b.cw - (2 * b.arrowPadding + b.$nextCanv.width) && (a = 1), 0 != a && 0 != b.mouseDownRegion && (a != b.mouseDownRegion && (a *= -1), b.nextSlideTimer && clearTimeout(b.nextSlideTimer), b.nextSlide(a)), b.mouseDownRegion = 0
                }
            }, 0 == b.imgs.length)
            for (var d = 0, e = b.$$slides.length; e > d; d++) {
                var f = new Image;
                b.imgs.push(f), f.src = b.$$slides[d].getAttribute("data-src")
            }
        b.imgs.length > 0 && (b.imgs[0].onload = function() {
            b.loadingStep()
        }), b.nextFrame()
    }! function(a) {
        "use strict";
        a.jribbble = {};
        var b = function(b, c) {
                a.ajax({
                    type: "GET",
                    url: "http://api.dribbble.com" + b,
                    data: c[1] || {},
                    dataType: "jsonp",
                    success: function(a) {
                        c[0](void 0 === a ? {
                            error: !0
                        } : a)
                    }
                })
            },
            c = {
                getShotById: "/shots/$/",
                getReboundsOfShot: "/shots/$/rebounds/",
                getShotsByList: "/shots/$/",
                getShotsByPlayerId: "/players/$/shots/",
                getShotsThatPlayerFollows: "/players/$/shots/following/",
                getPlayerById: "/players/$/",
                getPlayerFollowers: "/players/$/followers/",
                getPlayerFollowing: "/players/$/following/",
                getPlayerDraftees: "/players/$/draftees/",
                getCommentsOfShot: "/shots/$/comments/",
                getShotsThatPlayerLikes: "/players/$/shots/likes/"
            },
            d = function(a) {
                return function() {
                    var c = [].slice.call(arguments),
                        d = a.replace("$", c.shift());
                    b(d, c)
                }
            };
        for (var e in c) a.jribbble[e] = d(c[e])
    }(jQuery, window, document),
    function(a, b, c) {
        "function" == typeof define && define.amd ? define(["jquery"], function(d) {
            return c(d, a, b), d.mobile
        }) : c(a.jQuery, a, b)
    }(this, document, function(a, b, c) {
        ! function(a) {
            a.extend(a.support, {
                orientation: "orientation" in b && "onorientationchange" in b
            })
        }(a),
        function(a) {
            a.event.special.throttledresize = {
                setup: function() {
                    a(this).bind("resize", f)
                },
                teardown: function() {
                    a(this).unbind("resize", f)
                }
            };
            var b, c, d, e = 250,
                f = function() {
                    c = (new Date).getTime(), d = c - g, d >= e ? (g = c, a(this).trigger("throttledresize")) : (b && clearTimeout(b), b = setTimeout(f, e - d))
                },
                g = 0
        }(a),
        function(a, b) {
            function d() {
                var a = e();
                a !== f && (f = a, l.trigger(m))
            }
            var e, f, g, h, i, j, k, l = a(b),
                m = "orientationchange",
                n = {
                    0: !0,
                    180: !0
                };
            a.support.orientation && (i = b.innerWidth || l.width(), j = b.innerHeight || l.height(), k = 50, g = i > j && i - j > k, h = n[b.orientation], (g && h || !g && !h) && (n = {
                "-90": !0,
                90: !0
            })), a.event.special.orientationchange = a.extend({}, a.event.special.orientationchange, {
                setup: function() {
                    return a.support.orientation && !a.event.special.orientationchange.disabled ? !1 : (f = e(), void l.bind("throttledresize", d))
                },
                teardown: function() {
                    return a.support.orientation && !a.event.special.orientationchange.disabled ? !1 : void l.unbind("throttledresize", d)
                },
                add: function(a) {
                    var b = a.handler;
                    a.handler = function(a) {
                        return a.orientation = e(), b.apply(this, arguments)
                    }
                }
            }), a.event.special.orientationchange.orientation = e = function() {
                var d = !0,
                    e = c.documentElement;
                return d = a.support.orientation ? n[b.orientation] : e && e.clientWidth / e.clientHeight < 1.1, d ? "portrait" : "landscape"
            }, a.fn[m] = function(a) {
                return a ? this.bind(m, a) : this.trigger(m)
            }, a.attrFn && (a.attrFn[m] = !0)
        }(a, this),
        function(a, b, c, d) {
            function e(a) {
                for (; a && "undefined" != typeof a.originalEvent;) a = a.originalEvent;
                return a
            }

            function f(b, c) {
                var f, g, h, i, j, k, l, m, n, o = b.type;
                if (b = a.Event(b), b.type = c, f = b.originalEvent, g = a.event.props, o.search(/^(mouse|click)/) > -1 && (g = E), f)
                    for (l = g.length, i; l;) i = g[--l], b[i] = f[i];
                if (o.search(/mouse(down|up)|click/) > -1 && !b.which && (b.which = 1), -1 !== o.search(/^touch/) && (h = e(f), o = h.touches, j = h.changedTouches, k = o && o.length ? o[0] : j && j.length ? j[0] : d))
                    for (m = 0, n = C.length; n > m; m++) i = C[m], b[i] = k[i];
                return b
            }

            function g(b) {
                for (var c, d, e = {}; b;) {
                    c = a.data(b, z);
                    for (d in c) c[d] && (e[d] = e.hasVirtualBinding = !0);
                    b = b.parentNode
                }
                return e
            }

            function h(b, c) {
                for (var d; b;) {
                    if (d = a.data(b, z), d && (!c || d[c])) return b;
                    b = b.parentNode
                }
                return null
            }

            function i() {
                M = !1
            }

            function j() {
                M = !0
            }

            function k() {
                Q = 0, K.length = 0, L = !1, j()
            }

            function l() {
                i()
            }

            function m() {
                n(), G = setTimeout(function() {
                    G = 0, k()
                }, a.vmouse.resetTimerDuration)
            }

            function n() {
                G && (clearTimeout(G), G = 0)
            }

            function o(b, c, d) {
                var e;
                return (d && d[b] || !d && h(c.target, b)) && (e = f(c, b), a(c.target).trigger(e)), e
            }

            function p(b) {
                var c, d = a.data(b.target, A);
                L || Q && Q === d || (c = o("v" + b.type, b), c && (c.isDefaultPrevented() && b.preventDefault(), c.isPropagationStopped() && b.stopPropagation(), c.isImmediatePropagationStopped() && b.stopImmediatePropagation()))
            }

            function q(b) {
                var c, d, f, h = e(b).touches;
                h && 1 === h.length && (c = b.target, d = g(c), d.hasVirtualBinding && (Q = P++, a.data(c, A, Q), n(), l(), J = !1, f = e(b).touches[0], H = f.pageX, I = f.pageY, o("vmouseover", b, d), o("vmousedown", b, d)))
            }

            function r(a) {
                M || (J || o("vmousecancel", a, g(a.target)), J = !0, m())
            }

            function s(b) {
                if (!M) {
                    var c = e(b).touches[0],
                        d = J,
                        f = a.vmouse.moveDistanceThreshold,
                        h = g(b.target);
                    J = J || Math.abs(c.pageX - H) > f || Math.abs(c.pageY - I) > f, J && !d && o("vmousecancel", b, h), o("vmousemove", b, h), m()
                }
            }

            function t(a) {
                if (!M) {
                    j();
                    var b, c, d = g(a.target);
                    o("vmouseup", a, d), J || (b = o("vclick", a, d), b && b.isDefaultPrevented() && (c = e(a).changedTouches[0], K.push({
                        touchID: Q,
                        x: c.clientX,
                        y: c.clientY
                    }), L = !0)), o("vmouseout", a, d), J = !1, m()
                }
            }

            function u(b) {
                var c, d = a.data(b, z);
                if (d)
                    for (c in d)
                        if (d[c]) return !0;
                return !1
            }

            function v() {}

            function w(b) {
                var c = b.substr(1);
                return {
                    setup: function() {
                        u(this) || a.data(this, z, {});
                        var d = a.data(this, z);
                        d[b] = !0, F[b] = (F[b] || 0) + 1, 1 === F[b] && O.bind(c, p), a(this).bind(c, v), N && (F.touchstart = (F.touchstart || 0) + 1, 1 === F.touchstart && O.bind("touchstart", q).bind("touchend", t).bind("touchmove", s).bind("scroll", r))
                    },
                    teardown: function() {
                        --F[b], F[b] || O.unbind(c, p), N && (--F.touchstart, F.touchstart || O.unbind("touchstart", q).unbind("touchmove", s).unbind("touchend", t).unbind("scroll", r));
                        var d = a(this),
                            e = a.data(this, z);
                        e && (e[b] = !1), d.unbind(c, v), u(this) || d.removeData(z)
                    }
                }
            }
            var x, y, z = "virtualMouseBindings",
                A = "virtualTouchID",
                B = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
                C = "clientX clientY pageX pageY screenX screenY".split(" "),
                D = a.event.mouseHooks ? a.event.mouseHooks.props : [],
                E = a.event.props.concat(D),
                F = {},
                G = 0,
                H = 0,
                I = 0,
                J = !1,
                K = [],
                L = !1,
                M = !1,
                N = "addEventListener" in c,
                O = a(c),
                P = 1,
                Q = 0;
            for (a.vmouse = {
                    moveDistanceThreshold: 10,
                    clickDistanceThreshold: 10,
                    resetTimerDuration: 1500
                }, y = 0; y < B.length; y++) a.event.special[B[y]] = w(B[y]);
            N && c.addEventListener("click", function(b) {
                var c, d, e, f, g, h, i = K.length,
                    j = b.target;
                if (i)
                    for (c = b.clientX, d = b.clientY, x = a.vmouse.clickDistanceThreshold, e = j; e;) {
                        for (f = 0; i > f; f++)
                            if (g = K[f], h = 0, e === j && Math.abs(g.x - c) < x && Math.abs(g.y - d) < x || a.data(e, A) === g.touchID) return b.preventDefault(), void b.stopPropagation();
                        e = e.parentNode
                    }
            }, !0)
        }(a, b, c),
        function(a) {
            a.mobile = {}
        }(a),
        function(a) {
            var b = {
                touch: "ontouchend" in c
            };
            a.mobile.support = a.mobile.support || {}, a.extend(a.support, b), a.extend(a.mobile.support, b)
        }(a),
        function(a, b, d) {
            function e(b, c, e, f) {
                var g = e.type;
                e.type = c, f ? a.event.trigger(e, d, b) : a.event.dispatch.call(b, e), e.type = g
            }
            var f = a(c),
                g = a.mobile.support.touch,
                h = "touchmove scroll",
                i = g ? "touchstart" : "mousedown",
                j = g ? "touchend" : "mouseup",
                k = g ? "touchmove" : "mousemove";
            a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(b, c) {
                a.fn[c] = function(a) {
                    return a ? this.bind(c, a) : this.trigger(c)
                }, a.attrFn && (a.attrFn[c] = !0)
            }), a.event.special.scrollstart = {
                enabled: !0,
                setup: function() {
                    function b(a, b) {
                        c = b, e(f, c ? "scrollstart" : "scrollstop", a)
                    }
                    var c, d, f = this,
                        g = a(f);
                    g.bind(h, function(e) {
                        a.event.special.scrollstart.enabled && (c || b(e, !0), clearTimeout(d), d = setTimeout(function() {
                            b(e, !1)
                        }, 50))
                    })
                },
                teardown: function() {
                    a(this).unbind(h)
                }
            }, a.event.special.tap = {
                tapholdThreshold: 750,
                emitTapOnTaphold: !0,
                setup: function() {
                    var b = this,
                        c = a(b),
                        d = !1;
                    c.bind("vmousedown", function(g) {
                        function h() {
                            clearTimeout(k)
                        }

                        function i() {
                            h(), c.unbind("vclick", j).unbind("vmouseup", h), f.unbind("vmousecancel", i)
                        }

                        function j(a) {
                            i(), d || l !== a.target ? d && a.preventDefault() : e(b, "tap", a)
                        }
                        if (d = !1, g.which && 1 !== g.which) return !1;
                        var k, l = g.target;
                        c.bind("vmouseup", h).bind("vclick", j), f.bind("vmousecancel", i), k = setTimeout(function() {
                            a.event.special.tap.emitTapOnTaphold || (d = !0), e(b, "taphold", a.Event("taphold", {
                                target: l
                            }))
                        }, a.event.special.tap.tapholdThreshold)
                    })
                },
                teardown: function() {
                    a(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), f.unbind("vmousecancel")
                }
            }, a.event.special.swipe = {
                scrollSupressionThreshold: 30,
                durationThreshold: 1e3,
                horizontalDistanceThreshold: 30,
                verticalDistanceThreshold: 30,
                getLocation: function(a) {
                    var c = b.pageXOffset,
                        d = b.pageYOffset,
                        e = a.clientX,
                        f = a.clientY;
                    return 0 === a.pageY && Math.floor(f) > Math.floor(a.pageY) || 0 === a.pageX && Math.floor(e) > Math.floor(a.pageX) ? (e -= c, f -= d) : (f < a.pageY - d || e < a.pageX - c) && (e = a.pageX - c, f = a.pageY - d), {
                        x: e,
                        y: f
                    }
                },
                start: function(b) {
                    var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
                        d = a.event.special.swipe.getLocation(c);
                    return {
                        time: (new Date).getTime(),
                        coords: [d.x, d.y],
                        origin: a(b.target)
                    }
                },
                stop: function(b) {
                    var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
                        d = a.event.special.swipe.getLocation(c);
                    return {
                        time: (new Date).getTime(),
                        coords: [d.x, d.y]
                    }
                },
                handleSwipe: function(b, c, d, f) {
                    if (c.time - b.time < a.event.special.swipe.durationThreshold && Math.abs(b.coords[0] - c.coords[0]) > a.event.special.swipe.horizontalDistanceThreshold && Math.abs(b.coords[1] - c.coords[1]) < a.event.special.swipe.verticalDistanceThreshold) {
                        var g = b.coords[0] > c.coords[0] ? "swipeleft" : "swiperight";
                        return e(d, "swipe", a.Event("swipe", {
                            target: f,
                            swipestart: b,
                            swipestop: c
                        }), !0), e(d, g, a.Event(g, {
                            target: f,
                            swipestart: b,
                            swipestop: c
                        }), !0), !0
                    }
                    return !1
                },
                eventInProgress: !1,
                setup: function() {
                    var b, c = this,
                        d = a(c),
                        e = {};
                    b = a.data(this, "mobile-events"), b || (b = {
                        length: 0
                    }, a.data(this, "mobile-events", b)), b.length++, b.swipe = e, e.start = function(b) {
                        if (!a.event.special.swipe.eventInProgress) {
                            a.event.special.swipe.eventInProgress = !0;
                            var d, g = a.event.special.swipe.start(b),
                                h = b.target,
                                i = !1;
                            e.move = function(b) {
                                g && (d = a.event.special.swipe.stop(b), i || (i = a.event.special.swipe.handleSwipe(g, d, c, h), i && (a.event.special.swipe.eventInProgress = !1)), Math.abs(g.coords[0] - d.coords[0]) > a.event.special.swipe.scrollSupressionThreshold && b.preventDefault())
                            }, e.stop = function() {
                                i = !0, a.event.special.swipe.eventInProgress = !1, f.off(k, e.move), e.move = null
                            }, f.on(k, e.move).one(j, e.stop)
                        }
                    }, d.on(i, e.start)
                },
                teardown: function() {
                    var b, c;
                    b = a.data(this, "mobile-events"), b && (c = b.swipe, delete b.swipe, b.length--, 0 === b.length && a.removeData(this, "mobile-events")), c && (c.start && a(this).off(i, c.start), c.move && f.off(k, c.move), c.stop && f.off(j, c.stop))
                }
            }, a.each({
                scrollstop: "scrollstart",
                taphold: "tap",
                swipeleft: "swipe.left",
                swiperight: "swipe.right"
            }, function(b, c) {
                a.event.special[b] = {
                    setup: function() {
                        a(this).bind(c, a.noop)
                    },
                    teardown: function() {
                        a(this).unbind(c)
                    }
                }
            })
        }(a, this),
        function(a) {
            a.extend(a.mobile, {
                version: "1.4.3",
                subPageUrlKey: "ui-page",
                hideUrlBar: !0,
                keepNative: ":jqmData(role='none'), :jqmData(role='nojs')",
                activePageClass: "ui-page-active",
                activeBtnClass: "ui-btn-active",
                focusClass: "ui-focus",
                ajaxEnabled: !0,
                hashListeningEnabled: !0,
                linkBindingEnabled: !0,
                defaultPageTransition: "fade",
                maxTransitionWidth: !1,
                minScrollBack: 0,
                defaultDialogTransition: "pop",
                pageLoadErrorMessage: "Error Loading Page",
                pageLoadErrorMessageTheme: "a",
                phonegapNavigationEnabled: !1,
                autoInitializePage: !0,
                pushStateEnabled: !0,
                ignoreContentEnabled: !1,
                buttonMarkup: {
                    hoverDelay: 200
                },
                dynamicBaseEnabled: !0,
                pageContainer: a(),
                allowCrossDomainPages: !1,
                dialogHashKey: "&ui-state=dialog"
            })
        }(a, this),
        function(a, b, c) {
            var d = {},
                e = a.find,
                f = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
                g = /:jqmData\(([^)]*)\)/g;
            a.extend(a.mobile, {
                ns: "",
                getAttribute: function(b, c) {
                    var d;
                    b = b.jquery ? b[0] : b, b && b.getAttribute && (d = b.getAttribute("data-" + a.mobile.ns + c));
                    try {
                        d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : f.test(d) ? JSON.parse(d) : d
                    } catch (e) {}
                    return d
                },
                nsNormalizeDict: d,
                nsNormalize: function(b) {
                    return d[b] || (d[b] = a.camelCase(a.mobile.ns + b))
                },
                closestPageData: function(a) {
                    return a.closest(":jqmData(role='page'), :jqmData(role='dialog')").data("mobile-page")
                }
            }), a.fn.jqmData = function(b, d) {
                var e;
                return "undefined" != typeof b && (b && (b = a.mobile.nsNormalize(b)), e = arguments.length < 2 || d === c ? this.data(b) : this.data(b, d)), e
            }, a.jqmData = function(b, c, d) {
                var e;
                return "undefined" != typeof c && (e = a.data(b, c ? a.mobile.nsNormalize(c) : c, d)), e
            }, a.fn.jqmRemoveData = function(b) {
                return this.removeData(a.mobile.nsNormalize(b))
            }, a.jqmRemoveData = function(b, c) {
                return a.removeData(b, a.mobile.nsNormalize(c))
            }, a.find = function(b, c, d, f) {
                return b.indexOf(":jqmData") > -1 && (b = b.replace(g, "[data-" + (a.mobile.ns || "") + "$1]")), e.call(this, b, c, d, f)
            }, a.extend(a.find, e)
        }(a, this),
        function(a, b) {
            function d(b, c) {
                var d, f, g, h = b.nodeName.toLowerCase();
                return "area" === h ? (d = b.parentNode, f = d.name, b.href && f && "map" === d.nodeName.toLowerCase() ? (g = a("img[usemap=#" + f + "]")[0], !!g && e(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || c : c) && e(b)
            }

            function e(b) {
                return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
                    return "hidden" === a.css(this, "visibility")
                }).length
            }
            var f = 0,
                g = /^ui-id-\d+$/;
            a.ui = a.ui || {}, a.extend(a.ui, {
                version: "c0ab71056b936627e8a7821f03c044aec6280a40",
                keyCode: {
                    BACKSPACE: 8,
                    COMMA: 188,
                    DELETE: 46,
                    DOWN: 40,
                    END: 35,
                    ENTER: 13,
                    ESCAPE: 27,
                    HOME: 36,
                    LEFT: 37,
                    PAGE_DOWN: 34,
                    PAGE_UP: 33,
                    PERIOD: 190,
                    RIGHT: 39,
                    SPACE: 32,
                    TAB: 9,
                    UP: 38
                }
            }), a.fn.extend({
                focus: function(b) {
                    return function(c, d) {
                        return "number" == typeof c ? this.each(function() {
                            var b = this;
                            setTimeout(function() {
                                a(b).focus(), d && d.call(b)
                            }, c)
                        }) : b.apply(this, arguments)
                    }
                }(a.fn.focus),
                scrollParent: function() {
                    var b;
                    return b = a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                        return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
                    }).eq(0) : this.parents().filter(function() {
                        return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
                    }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(this[0].ownerDocument || c) : b
                },
                uniqueId: function() {
                    return this.each(function() {
                        this.id || (this.id = "ui-id-" + ++f)
                    })
                },
                removeUniqueId: function() {
                    return this.each(function() {
                        g.test(this.id) && a(this).removeAttr("id")
                    })
                }
            }), a.extend(a.expr[":"], {
                data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
                    return function(c) {
                        return !!a.data(c, b)
                    }
                }) : function(b, c, d) {
                    return !!a.data(b, d[3])
                },
                focusable: function(b) {
                    return d(b, !isNaN(a.attr(b, "tabindex")))
                },
                tabbable: function(b) {
                    var c = a.attr(b, "tabindex"),
                        e = isNaN(c);
                    return (e || c >= 0) && d(b, !e)
                }
            }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(c, d) {
                function e(b, c, d, e) {
                    return a.each(f, function() {
                        c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), e && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
                    }), c
                }
                var f = "Width" === d ? ["Left", "Right"] : ["Top", "Bottom"],
                    g = d.toLowerCase(),
                    h = {
                        innerWidth: a.fn.innerWidth,
                        innerHeight: a.fn.innerHeight,
                        outerWidth: a.fn.outerWidth,
                        outerHeight: a.fn.outerHeight
                    };
                a.fn["inner" + d] = function(c) {
                    return c === b ? h["inner" + d].call(this) : this.each(function() {
                        a(this).css(g, e(this, c) + "px")
                    })
                }, a.fn["outer" + d] = function(b, c) {
                    return "number" != typeof b ? h["outer" + d].call(this, b) : this.each(function() {
                        a(this).css(g, e(this, b, !0, c) + "px")
                    })
                }
            }), a.fn.addBack || (a.fn.addBack = function(a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
                return function(c) {
                    return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
                }
            }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.support.selectstart = "onselectstart" in c.createElement("div"), a.fn.extend({
                disableSelection: function() {
                    return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
                        a.preventDefault()
                    })
                },
                enableSelection: function() {
                    return this.unbind(".ui-disableSelection")
                },
                zIndex: function(d) {
                    if (d !== b) return this.css("zIndex", d);
                    if (this.length)
                        for (var e, f, g = a(this[0]); g.length && g[0] !== c;) {
                            if (e = g.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (f = parseInt(g.css("zIndex"), 10), !isNaN(f) && 0 !== f)) return f;
                            g = g.parent()
                        }
                    return 0
                }
            }), a.ui.plugin = {
                add: function(b, c, d) {
                    var e, f = a.ui[b].prototype;
                    for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
                },
                call: function(a, b, c, d) {
                    var e, f = a.plugins[b];
                    if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))
                        for (e = 0; e < f.length; e++) a.options[f[e][0]] && f[e][1].apply(a.element, c)
                }
            }
        }(a),
        function(a, b) {
            var d = function(b, c) {
                var d = b.parent(),
                    e = [],
                    f = d.children(":jqmData(role='header')"),
                    g = b.children(":jqmData(role='header')"),
                    h = d.children(":jqmData(role='footer')"),
                    i = b.children(":jqmData(role='footer')");
                return 0 === g.length && f.length > 0 && (e = e.concat(f.toArray())), 0 === i.length && h.length > 0 && (e = e.concat(h.toArray())), a.each(e, function(b, d) {
                    c -= a(d).outerHeight()
                }), Math.max(0, c)
            };
            a.extend(a.mobile, {
                window: a(b),
                document: a(c),
                keyCode: a.ui.keyCode,
                behaviors: {},
                silentScroll: function(c) {
                    "number" !== a.type(c) && (c = a.mobile.defaultHomeScroll), a.event.special.scrollstart.enabled = !1, setTimeout(function() {
                        b.scrollTo(0, c), a.mobile.document.trigger("silentscroll", {
                            x: 0,
                            y: c
                        })
                    }, 20), setTimeout(function() {
                        a.event.special.scrollstart.enabled = !0
                    }, 150)
                },
                getClosestBaseUrl: function(b) {
                    var c = a(b).closest(".ui-page").jqmData("url"),
                        d = a.mobile.path.documentBase.hrefNoHash;
                    return a.mobile.dynamicBaseEnabled && c && a.mobile.path.isPath(c) || (c = d), a.mobile.path.makeUrlAbsolute(c, d)
                },
                removeActiveLinkClass: function(b) {
                    !a.mobile.activeClickedLink || a.mobile.activeClickedLink.closest("." + a.mobile.activePageClass).length && !b || a.mobile.activeClickedLink.removeClass(a.mobile.activeBtnClass), a.mobile.activeClickedLink = null
                },
                getInheritedTheme: function(a, b) {
                    for (var c, d, e = a[0], f = "", g = /ui-(bar|body|overlay)-([a-z])\b/; e && (c = e.className || "", !(c && (d = g.exec(c)) && (f = d[2])));) e = e.parentNode;
                    return f || b || "a"
                },
                enhanceable: function(a) {
                    return this.haveParents(a, "enhance")
                },
                hijackable: function(a) {
                    return this.haveParents(a, "ajax")
                },
                haveParents: function(b, c) {
                    if (!a.mobile.ignoreContentEnabled) return b;
                    var d, e, f, g, h, i = b.length,
                        j = a();
                    for (g = 0; i > g; g++) {
                        for (e = b.eq(g), f = !1, d = b[g]; d;) {
                            if (h = d.getAttribute ? d.getAttribute("data-" + a.mobile.ns + c) : "", "false" === h) {
                                f = !0;
                                break
                            }
                            d = d.parentNode
                        }
                        f || (j = j.add(e))
                    }
                    return j
                },
                getScreenHeight: function() {
                    return b.innerHeight || a.mobile.window.height()
                },
                resetActivePageHeight: function(b) {
                    var c = a("." + a.mobile.activePageClass),
                        e = c.height(),
                        f = c.outerHeight(!0);
                    b = d(c, "number" == typeof b ? b : a.mobile.getScreenHeight()), c.css("min-height", ""), c.height() < b && c.css("min-height", b - (f - e))
                },
                loading: function() {
                    var b = this.loading._widget || a(a.mobile.loader.prototype.defaultHtml).loader(),
                        c = b.loader.apply(b, arguments);
                    return this.loading._widget = b, c
                }
            }), a.addDependents = function(b, c) {
                var d = a(b),
                    e = d.jqmData("dependents") || a();
                d.jqmData("dependents", a(e).add(c))
            }, a.fn.extend({
                removeWithDependents: function() {
                    a.removeWithDependents(this)
                },
                enhanceWithin: function() {
                    var b, c = {},
                        d = a.mobile.page.prototype.keepNativeSelector(),
                        e = this;
                    a.mobile.nojs && a.mobile.nojs(this), a.mobile.links && a.mobile.links(this), a.mobile.degradeInputsWithin && a.mobile.degradeInputsWithin(this), a.fn.buttonMarkup && this.find(a.fn.buttonMarkup.initSelector).not(d).jqmEnhanceable().buttonMarkup(), a.fn.fieldcontain && this.find(":jqmData(role='fieldcontain')").not(d).jqmEnhanceable().fieldcontain(), a.each(a.mobile.widgets, function(b, f) {
                        if (f.initSelector) {
                            var g = a.mobile.enhanceable(e.find(f.initSelector));
                            g.length > 0 && (g = g.not(d)), g.length > 0 && (c[f.prototype.widgetName] = g)
                        }
                    });
                    for (b in c) c[b][b]();
                    return this
                },
                addDependents: function(b) {
                    a.addDependents(this, b)
                },
                getEncodedText: function() {
                    return a("<a>").text(this.text()).html()
                },
                jqmEnhanceable: function() {
                    return a.mobile.enhanceable(this)
                },
                jqmHijackable: function() {
                    return a.mobile.hijackable(this)
                }
            }), a.removeWithDependents = function(b) {
                var c = a(b);
                (c.jqmData("dependents") || a()).remove(), c.remove()
            }, a.addDependents = function(b, c) {
                var d = a(b),
                    e = d.jqmData("dependents") || a();
                d.jqmData("dependents", a(e).add(c))
            }, a.find.matches = function(b, c) {
                return a.find(b, null, null, c)
            }, a.find.matchesSelector = function(b, c) {
                return a.find(c, null, null, [b]).length > 0
            }
        }(a, this),
        function(a) {
            var b = a("meta[name=viewport]"),
                c = b.attr("content"),
                d = c + ",maximum-scale=1, user-scalable=no",
                e = c + ",maximum-scale=10, user-scalable=yes",
                f = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(c);
            a.mobile.zoom = a.extend({}, {
                enabled: !f,
                locked: !1,
                disable: function(c) {
                    f || a.mobile.zoom.locked || (b.attr("content", d), a.mobile.zoom.enabled = !1, a.mobile.zoom.locked = c || !1)
                },
                enable: function(c) {
                    f || a.mobile.zoom.locked && c !== !0 || (b.attr("content", e), a.mobile.zoom.enabled = !0, a.mobile.zoom.locked = !1)
                },
                restore: function() {
                    f || (b.attr("content", c), a.mobile.zoom.enabled = !0)
                }
            })
        }(a),
        function(a, b) {
            function c(a) {
                e = a.originalEvent, i = e.accelerationIncludingGravity, f = Math.abs(i.x), g = Math.abs(i.y), h = Math.abs(i.z), !b.orientation && (f > 7 || (h > 6 && 8 > g || 8 > h && g > 6) && f > 5) ? d.enabled && d.disable() : d.enabled || d.enable()
            }
            a.mobile.iosorientationfixEnabled = !0;
            var d, e, f, g, h, i, j = navigator.userAgent;
            return /iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(j) && j.indexOf("AppleWebKit") > -1 ? (d = a.mobile.zoom, void a.mobile.document.on("mobileinit", function() {
                a.mobile.iosorientationfixEnabled && a.mobile.window.bind("orientationchange.iosorientationfix", d.enable).bind("devicemotion.iosorientationfix", c)
            })) : void(a.mobile.iosorientationfixEnabled = !1)
        }(a, this)
    }), ! function(a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
    }(function(a) {
        function b(b) {
            var g = b || window.event,
                h = i.call(arguments, 1),
                j = 0,
                l = 0,
                m = 0,
                n = 0,
                o = 0,
                p = 0;
            if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
                if (1 === g.deltaMode) {
                    var q = a.data(this, "mousewheel-line-height");
                    j *= q, m *= q, l *= q
                } else if (2 === g.deltaMode) {
                    var r = a.data(this, "mousewheel-page-height");
                    j *= r, m *= r, l *= r
                }
                if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                    var s = this.getBoundingClientRect();
                    o = b.clientX - s.left, p = b.clientY - s.top
                }
                return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
            }
        }

        function c() {
            f = null
        }

        function d(a, b) {
            return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
        }
        var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            i = Array.prototype.slice;
        if (a.event.fixHooks)
            for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
        var k = a.event.special.mousewheel = {
            version: "3.1.12",
            setup: function() {
                if (this.addEventListener)
                    for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
                else this.onmousewheel = b;
                a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
                else this.onmousewheel = null;
                a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
            },
            getLineHeight: function(b) {
                var c = a(b),
                    d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
                return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
            },
            getPageHeight: function(b) {
                return a(b).height()
            },
            settings: {
                adjustOldDeltas: !0,
                normalizeOffset: !0
            }
        };
        a.fn.extend({
            mousewheel: function(a) {
                return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
            },
            unmousewheel: function(a) {
                return this.unbind("mousewheel", a)
            }
        })
    }), ! function(a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
    }(function(a) {
        a.extend(a.fn, {
            validate: function(b) {
                if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
                var c = a.data(this[0], "validator");
                return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.validateDelegate(":submit", "click", function(b) {
                    c.settings.submitHandler && (c.submitButton = b.target), a(b.target).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(b.target).attr("formnovalidate") && (c.cancelSubmit = !0)
                }), this.submit(function(b) {
                    function d() {
                        var d;
                        return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), !1) : !0
                    }
                    return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
                })), c)
            },
            valid: function() {
                var b, c;
                return a(this[0]).is("form") ? b = this.validate().form() : (b = !0, c = a(this[0].form).validate(), this.each(function() {
                    b = c.element(this) && b
                })), b
            },
            removeAttrs: function(b) {
                var c = {},
                    d = this;
                return a.each(b.split(/\s/), function(a, b) {
                    c[b] = d.attr(b), d.removeAttr(b)
                }), c
            },
            rules: function(b, c) {
                var d, e, f, g, h, i, j = this[0];
                if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                        break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(b, c) {
                            i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required")
                        }), i) : (delete e[j.name], f)
                }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                    required: h
                }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                    remote: h
                })), g
            }
        }), a.extend(a.expr[":"], {
            blank: function(b) {
                return !a.trim("" + a(b).val())
            },
            filled: function(b) {
                return !!a.trim("" + a(b).val())
            },
            unchecked: function(b) {
                return !a(b).prop("checked")
            }
        }), a.validator = function(b, c) {
            this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
        }, a.validator.format = function(b, c) {
            return 1 === arguments.length ? function() {
                var c = a.makeArray(arguments);
                return c.unshift(b), a.validator.format.apply(this, c)
            } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
                b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
                    return c
                })
            }), b)
        }, a.extend(a.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusInvalid: !0,
                errorContainer: a([]),
                errorLabelContainer: a([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function(a) {
                    this.lastActive = a, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
                },
                onfocusout: function(a) {
                    this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
                },
                onkeyup: function(a, b) {
                    (9 !== b.which || "" !== this.elementValue(a)) && (a.name in this.submitted || a === this.lastElement) && this.element(a)
                },
                onclick: function(a) {
                    a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
                },
                highlight: function(b, c, d) {
                    "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
                },
                unhighlight: function(b, c, d) {
                    "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
                }
            },
            setDefaults: function(b) {
                a.extend(a.validator.defaults, b)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date ( ISO ).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: a.validator.format("Please enter no more than {0} characters."),
                minlength: a.validator.format("Please enter at least {0} characters."),
                rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
                range: a.validator.format("Please enter a value between {0} and {1}."),
                max: a.validator.format("Please enter a value less than or equal to {0}."),
                min: a.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function() {
                    function b(b) {
                        var c = a.data(this[0].form, "validator"),
                            d = "on" + b.type.replace(/^validate/, ""),
                            e = c.settings;
                        e[d] && !this.is(e.ignore) && e[d].call(c, this[0], b)
                    }
                    this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var c, d = this.groups = {};
                    a.each(this.settings.groups, function(b, c) {
                        "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
                            d[c] = b
                        })
                    }), c = this.settings.rules, a.each(c, function(b, d) {
                        c[b] = a.validator.normalizeRule(d)
                    }), a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", b).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", b), this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
                },
                form: function() {
                    return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function() {
                    this.prepareForm();
                    for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                    return this.valid()
                },
                element: function(b) {
                    var c = this.clean(b),
                        d = this.validationTargetFor(c),
                        e = !0;
                    return this.lastElement = d, void 0 === d ? delete this.invalid[c.name] : (this.prepareElement(d), this.currentElements = a(d), e = this.check(d) !== !1, e ? delete this.invalid[d.name] : this.invalid[d.name] = !0), a(b).attr("aria-invalid", !e), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e
                },
                showErrors: function(b) {
                    if (b) {
                        a.extend(this.errorMap, b), this.errorList = [];
                        for (var c in b) this.errorList.push({
                            message: b[c],
                            element: this.findByName(c)[0]
                        });
                        this.successList = a.grep(this.successList, function(a) {
                            return !(a.name in b)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function() {
                    a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
                },
                numberOfInvalids: function() {
                    return this.objectLength(this.invalid)
                },
                objectLength: function(a) {
                    var b, c = 0;
                    for (b in a) c++;
                    return c
                },
                hideErrors: function() {
                    this.hideThese(this.toHide)
                },
                hideThese: function(a) {
                    a.not(this.containers).text(""), this.addWrapper(a).hide()
                },
                valid: function() {
                    return 0 === this.size()
                },
                size: function() {
                    return this.errorList.length
                },
                focusInvalid: function() {
                    if (this.settings.focusInvalid) try {
                        a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (b) {}
                },
                findLastActive: function() {
                    var b = this.lastActive;
                    return b && 1 === a.grep(this.errorList, function(a) {
                        return a.element.name === b.name
                    }).length && b
                },
                elements: function() {
                    var b = this,
                        c = {};
                    return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                        return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0)
                    })
                },
                clean: function(b) {
                    return a(b)[0]
                },
                errors: function() {
                    var b = this.settings.errorClass.split(" ").join(".");
                    return a(this.settings.errorElement + "." + b, this.errorContext)
                },
                reset: function() {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([])
                },
                prepareForm: function() {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function(a) {
                    this.reset(), this.toHide = this.errorsFor(a)
                },
                elementValue: function(b) {
                    var c, d = a(b),
                        e = b.type;
                    return "radio" === e || "checkbox" === e ? a("input[name='" + b.name + "']:checked").val() : "number" === e && "undefined" != typeof b.validity ? b.validity.badInput ? !1 : d.val() : (c = d.val(), "string" == typeof c ? c.replace(/\r/g, "") : c)
                },
                check: function(b) {
                    b = this.validationTargetFor(this.clean(b));
                    var c, d, e, f = a(b).rules(),
                        g = a.map(f, function(a, b) {
                            return b
                        }).length,
                        h = !1,
                        i = this.elementValue(b);
                    for (d in f) {
                        e = {
                            method: d,
                            parameters: f[d]
                        };
                        try {
                            if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                                h = !0;
                                continue
                            }
                            if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                            if (!c) return this.formatAndAdd(b, e), !1
                        } catch (j) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j
                        }
                    }
                    return h ? void 0 : (this.objectLength(f) && this.successList.push(b), !0)
                },
                customDataMessage: function(b, c) {
                    return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
                },
                customMessage: function(a, b) {
                    var c = this.settings.messages[a];
                    return c && (c.constructor === String ? c : c[b])
                },
                findDefined: function() {
                    for (var a = 0; a < arguments.length; a++)
                        if (void 0 !== arguments[a]) return arguments[a];
                    return void 0
                },
                defaultMessage: function(b, c) {
                    return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
                },
                formatAndAdd: function(b, c) {
                    var d = this.defaultMessage(b, c.method),
                        e = /\$?\{(\d+)\}/g;
                    "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({
                        message: d,
                        element: b,
                        method: c.method
                    }), this.errorMap[b.name] = d, this.submitted[b.name] = d
                },
                addWrapper: function(a) {
                    return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
                },
                defaultShowErrors: function() {
                    var a, b, c;
                    for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                    if (this.settings.unhighlight)
                        for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function() {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function() {
                    return a(this.errorList).map(function() {
                        return this.element
                    })
                },
                showLabel: function(b, c) {
                    var d, e, f, g = this.errorsFor(b),
                        h = this.idOrName(b),
                        i = a(b).attr("aria-describedby");
                    g.length ? (g.removeClass(this.settings.validClass).addClass(this.settings.errorClass), g.html(c)) : (g = a("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(c || ""), d = g, this.settings.wrapper && (d = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), g.is("label") ? g.attr("for", h) : 0 === g.parents("label[for='" + h + "']").length && (f = g.attr("id"), i ? i.match(new RegExp("\b" + f + "\b")) || (i += " " + f) : i = f, a(b).attr("aria-describedby", i), e = this.groups[b.name], e && a.each(this.groups, function(b, c) {
                        c === e && a("[name='" + b + "']", this.currentForm).attr("aria-describedby", g.attr("id"))
                    }))), !c && this.settings.success && (g.text(""), "string" == typeof this.settings.success ? g.addClass(this.settings.success) : this.settings.success(g, b)), this.toShow = this.toShow.add(g)
                },
                errorsFor: function(b) {
                    var c = this.idOrName(b),
                        d = a(b).attr("aria-describedby"),
                        e = "label[for='" + c + "'], label[for='" + c + "'] *";
                    return d && (e = e + ", #" + d.replace(/\s+/g, ", #")), this.errors().filter(e)
                },
                idOrName: function(a) {
                    return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
                },
                validationTargetFor: function(a) {
                    return this.checkable(a) && (a = this.findByName(a.name).not(this.settings.ignore)[0]), a
                },
                checkable: function(a) {
                    return /radio|checkbox/i.test(a.type)
                },
                findByName: function(b) {
                    return a(this.currentForm).find("[name='" + b + "']")
                },
                getLength: function(b, c) {
                    switch (c.nodeName.toLowerCase()) {
                        case "select":
                            return a("option:selected", c).length;
                        case "input":
                            if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                    }
                    return b.length
                },
                depend: function(a, b) {
                    return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
                },
                dependTypes: {
                    "boolean": function(a) {
                        return a
                    },
                    string: function(b, c) {
                        return !!a(b, c.form).length
                    },
                    "function": function(a, b) {
                        return a(b)
                    }
                },
                optional: function(b) {
                    var c = this.elementValue(b);
                    return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
                },
                startRequest: function(a) {
                    this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
                },
                stopRequest: function(b, c) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function(b) {
                    return a.data(b, "previousValue") || a.data(b, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(b, "remote")
                    })
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function(b, c) {
                b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
            },
            classRules: function(b) {
                var c = {},
                    d = a(b).attr("class");
                return d && a.each(d.split(" "), function() {
                    this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
                }), c
            },
            attributeRules: function(b) {
                var c, d, e = {},
                    f = a(b),
                    g = b.getAttribute("type");
                for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), /min|max/.test(c) && (null === g || /number|range|text/.test(g)) && (d = Number(d)), d || 0 === d ? e[c] = d : g === c && "range" !== g && (e[c] = !0);
                return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
            },
            dataRules: function(b) {
                var c, d, e = {},
                    f = a(b);
                for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), void 0 !== d && (e[c] = d);
                return e
            },
            staticRules: function(b) {
                var c = {},
                    d = a.data(b.form, "validator");
                return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
            },
            normalizeRules: function(b, c) {
                return a.each(b, function(d, e) {
                    if (e === !1) return void delete b[d];
                    if (e.param || e.depends) {
                        var f = !0;
                        switch (typeof e.depends) {
                            case "string":
                                f = !!a(e.depends, c.form).length;
                                break;
                            case "function":
                                f = e.depends.call(c, c)
                        }
                        f ? b[d] = void 0 !== e.param ? e.param : !0 : delete b[d]
                    }
                }), a.each(b, function(d, e) {
                    b[d] = a.isFunction(e) ? e(c) : e
                }), a.each(["minlength", "maxlength"], function() {
                    b[this] && (b[this] = Number(b[this]))
                }), a.each(["rangelength", "range"], function() {
                    var c;
                    b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
                }), a.validator.autoCreateRanges && (b.min && b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), b.minlength && b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
            },
            normalizeRule: function(b) {
                if ("string" == typeof b) {
                    var c = {};
                    a.each(b.split(/\s/), function() {
                        c[this] = !0
                    }), b = c
                }
                return b
            },
            addMethod: function(b, c, d) {
                a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
            },
            methods: {
                required: function(b, c, d) {
                    if (!this.depend(d, c)) return "dependency-mismatch";
                    if ("select" === c.nodeName.toLowerCase()) {
                        var e = a(c).val();
                        return e && e.length > 0
                    }
                    return this.checkable(c) ? this.getLength(b, c) > 0 : a.trim(b).length > 0
                },
                email: function(a, b) {
                    return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
                },
                url: function(a, b) {
                    return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
                },
                date: function(a, b) {
                    return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
                },
                dateISO: function(a, b) {
                    return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
                },
                number: function(a, b) {
                    return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
                },
                digits: function(a, b) {
                    return this.optional(b) || /^\d+$/.test(a)
                },
                creditcard: function(a, b) {
                    if (this.optional(b)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(a)) return !1;
                    var c, d, e = 0,
                        f = 0,
                        g = !1;
                    if (a = a.replace(/\D/g, ""), a.length < 13 || a.length > 19) return !1;
                    for (c = a.length - 1; c >= 0; c--) d = a.charAt(c), f = parseInt(d, 10), g && (f *= 2) > 9 && (f -= 9), e += f, g = !g;
                    return e % 10 === 0
                },
                minlength: function(b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                    return this.optional(c) || e >= d
                },
                maxlength: function(b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                    return this.optional(c) || d >= e
                },
                rangelength: function(b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                    return this.optional(c) || e >= d[0] && e <= d[1]
                },
                min: function(a, b, c) {
                    return this.optional(b) || a >= c
                },
                max: function(a, b, c) {
                    return this.optional(b) || c >= a
                },
                range: function(a, b, c) {
                    return this.optional(b) || a >= c[0] && a <= c[1]
                },
                equalTo: function(b, c, d) {
                    var e = a(d);
                    return this.settings.onfocusout && e.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        a(c).valid()
                    }), b === e.val()
                },
                remote: function(b, c, d) {
                    if (this.optional(c)) return "dependency-mismatch";
                    var e, f, g = this.previousValue(c);
                    return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), g.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = g.message, d = "string" == typeof d && {
                        url: d
                    } || d, g.old === b ? g.valid : (g.old = b, e = this, this.startRequest(c), f = {}, f[c.name] = b, a.ajax(a.extend(!0, {
                        url: d,
                        mode: "abort",
                        port: "validate" + c.name,
                        dataType: "json",
                        data: f,
                        context: e.currentForm,
                        success: function(d) {
                            var f, h, i, j = d === !0 || "true" === d;
                            e.settings.messages[c.name].remote = g.originalMessage, j ? (i = e.formSubmitted, e.prepareElement(c), e.formSubmitted = i, e.successList.push(c), delete e.invalid[c.name], e.showErrors()) : (f = {}, h = d || e.defaultMessage(c, "remote"), f[c.name] = g.message = a.isFunction(h) ? h(b) : h, e.invalid[c.name] = !0, e.showErrors(f)), g.valid = j, e.stopRequest(c, j)
                        }
                    }, d)), "pending")
                }
            }
        }), a.format = function() {
            throw "$.format has been deprecated. Please use $.validator.format instead."
        };
        var b, c = {};
        a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) {
            var e = a.port;
            "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
        }) : (b = a.ajax, a.ajax = function(d) {
            var e = ("mode" in d ? d : a.ajaxSettings).mode,
                f = ("port" in d ? d : a.ajaxSettings).port;
            return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
        }), a.extend(a.fn, {
            validateDelegate: function(b, c, d) {
                return this.bind(c, function(c) {
                    var e = a(c.target);
                    return e.is(b) ? d.apply(e, arguments) : void 0
                })
            }
        })
    });
var psParticle = function(a) {
    this.ps = a, this.ttl = null, this.color = a.colorArr, this.next = null, this.prev = null, this.gravityX = 0, this.gravityY = 0, this.x = Math.random() * a.cw, this.y = Math.random() * a.ch, this.velocityX = 10 * Math.random() - 5, this.velocityY = 10 * Math.random() - 5
};
psParticle.prototype.move = function() {
        var a = this.ps,
            b = this;
        if (null != this.ttl && this.ttl-- <= 0) a.swapList(b, a.pxlBuffer, a.recycleBuffer), this.ttl = null;
        else {
            var c = this.gravityX + a.swipeOffset - this.x,
                d = this.gravityY - this.y,
                e = Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2)),
                f = Math.atan2(d, c),
                g = .01 * e;
            1 == a.restless ? g += .1 * Math.random() - .05 : .01 > g && (this.x = this.gravityX + .25, this.y = this.gravityY + .25);
            var h = 0,
                i = 0;
            if (a.mx >= 0 && a.mouseForce) {
                var j = this.x - a.mx,
                    k = this.y - a.my;
                h = Math.min(a.mouseForce / (Math.pow(j, 2) + Math.pow(k, 2)), a.mouseForce), i = Math.atan2(k, j), "function" == typeof this.color && (i += Math.PI, h *= .001 + .1 * Math.random() - .05)
            } else h = 0, i = 0;
            this.velocityX += g * Math.cos(f) + h * Math.cos(i), this.velocityY += g * Math.sin(f) + h * Math.sin(i), this.velocityX *= .92, this.velocityY *= .92, this.x += this.velocityX, this.y += this.velocityY
        }
    }, ParticleSlider.prototype.Particle = psParticle, ParticleSlider.prototype.swapList = function(a, b, c) {
        var d = this;
        null == a ? a = new d.Particle(d) : b.first == a ? null != a.next ? (a.next.prev = null, b.first = a.next) : b.first = null : null == a.next ? a.prev.next = null : (a.prev.next = a.next, a.next.prev = a.prev), null == c.first ? (c.first = a, a.prev = null, a.next = null) : (a.next = c.first, c.first.prev = a, c.first = a, a.prev = null)
    }, ParticleSlider.prototype.parseColor = function(a) {
        var b, a = a.replace(" ", "");
        if (b = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(a)) b = [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)];
        else if (b = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(a)) b = [17 * parseInt(b[1], 16), 17 * parseInt(b[2], 16), 17 * parseInt(b[3], 16)];
        else if (b = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*.[\d]+)\)/.exec(a)) b = [+b[1], +b[2], +b[3], +b[4]];
        else {
            if (!(b = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(a))) return null;
            b = [+b[1], +b[2], +b[3]]
        }
        return isNaN(b[3]) && (b[3] = 1), b[3] *= 255, b
    }, ParticleSlider.prototype.loadingStep = function() {
        var a = this;
        a.imagesLoaded++, (a.imagesLoaded >= 3 || 0 == a.showArrowControls) && (a.resize(), a.slideDelay > 0 && (a.nextSlideTimer = setTimeout(function() {
            a.nextSlide()
        }, 1e3 * a.slideDelay)))
    }, ParticleSlider.prototype.$ = function(a, b, c) {
        var d = this;
        if ("." == a[0]) {
            var e = a.substr(1);
            b || (b = d.$$children);
            for (var f = [], g = 0, h = b.length; h > g; g++) b[g].className && b[g].className == e && f.push(b[g]);
            return 0 == f.length ? null : 1 != f.length || c ? f : f[0]
        }
        return document.getElementById(a.substr(1))
    }, ParticleSlider.prototype.nextFrame = function() {
        var a = this;
        if (null == a.nextFrameTimer) {
            a.nextFrameTimer = setTimeout(function() {
                a.nextFrame()
            }, 33), a.swipeOffset = 1 == a.mouseDownRegion && a.mx < a.cw / 2 || -1 == a.mouseDownRegion && a.mx > a.cw / 2 ? a.mx - a.cw / 2 : 0;
            for (var b = a.pxlBuffer.first, c = null; null != b;) c = b.next, b.move(), b = c;
            if (a.drawParticles(), a.frame++ % 25 == 0 && (a.cw != a.getCw() || a.ch != a.getCh())) {
                var d = a.getCh(),
                    e = a.getCw();
                a.ch != e && "function" == typeof a.onWidthChange && a.onWidthChange(a, e), a.ch != d && "function" == typeof a.onHeightChange && a.onHeightChange(a, d), "function" == typeof a.onSizeChange && a.onSizeChange(a, e, d), a.resize()
            }
            a.nextFrameTimer = null
        } else a.nextFrameTimer = setTimeout(function() {
            a.nextFrame()
        }, 10)
    }, ParticleSlider.prototype.nextSlide = function(a) {
        var b = this;
        null != b.nextSlideTimer && b.imgs.length > 1 ? (b.currImg = (b.currImg + b.imgs.length + (a ? a : 1)) % b.imgs.length, b.resize(), b.slideDelay > 0 && (b.nextSlideTimer = setTimeout(function() {
            b.nextSlide()
        }, 1e3 * b.slideDelay))) : b.slideDelay > 0 && (b.nextSlideTimer = setTimeout(function() {
            b.nextSlide()
        }, 1e3 * b.slideDelay)), "function" == typeof b.onNextSlide && b.onNextSlide(b.currImg)
    }, ParticleSlider.prototype.drawParticles = function() {
        for (var a, b, c, d, e, f, g = this, h = g.ctx.createImageData(g.cw, g.ch), i = h.data, j = g.pxlBuffer.first; null != j;) {
            for (b = ~~j.x, c = ~~j.y, d = b; d < b + g.ptlSize && d >= 0 && d < g.cw; d++)
                for (e = c; e < c + g.ptlSize && e >= 0 && e < g.ch; e++) a = 4 * (e * h.width + d), f = "function" == typeof j.color ? j.color() : j.color, i[a + 0] = f[0], i[a + 1] = f[1], i[a + 2] = f[2], i[a + 3] = f[3];
            j = j.next
        }
        h.data = i, g.ctx.putImageData(h, 0, 0)
    }, ParticleSlider.prototype.getPixelFromImageData = function(a, b, c) {
        for (var d = this, e = [], f = 0; f < a.width; f += d.ptlGap + 1)
            for (var g = 0; g < a.height; g += d.ptlGap + 1) i = 4 * (g * a.width + f), a.data[i + 3] > 0 && e.push({
                x: b + f,
                y: c + g,
                color: 1 == d.monochrome ? [d.colorArr[0], d.colorArr[1], d.colorArr[2], d.colorArr[3]] : [a.data[i], a.data[i + 1], a.data[i + 2], a.data[i + 3]]
            });
        return e
    }, ParticleSlider.prototype.init = function(a) {
        var b = this;
        if (b.imgs.length > 0) {
            b.$srcCanv.width = b.imgs[b.currImg].width, b.$srcCanv.height = b.imgs[b.currImg].height, b.srcCtx.clearRect(0, 0, b.$srcCanv.width, b.$srcCanv.height), b.srcCtx.drawImage(b.imgs[b.currImg], 0, 0);
            var c = b.getPixelFromImageData(b.srcCtx.getImageData(0, 0, b.$srcCanv.width, b.$srcCanv.height), ~~(b.cw / 2 - b.$srcCanv.width / 2), ~~(b.ch / 2 - b.$srcCanv.height / 2));
            if (1 == b.showArrowControls) {
                b.prevCtx.clearRect(0, 0, b.$prevCanv.width, b.$prevCanv.height), b.prevCtx.drawImage(b.imgControlPrev, 0, 0);
                for (var d = b.getPixelFromImageData(b.prevCtx.getImageData(0, 0, b.$prevCanv.width, b.$prevCanv.height), b.arrowPadding, ~~(b.ch / 2 - b.$prevCanv.height / 2)), e = 0, f = d.length; f > e; e++) d[e].color = function() {
                    return b.mx >= 0 && b.mx < 2 * b.arrowPadding + b.$prevCanv.width ? b.hoverColorArr : b.colorArr
                }, c.push(d[e]);
                b.nextCtx.clearRect(0, 0, b.$nextCanv.width, b.$nextCanv.height), b.nextCtx.drawImage(b.imgControlNext, 0, 0);
                for (var g = b.getPixelFromImageData(b.nextCtx.getImageData(0, 0, b.$nextCanv.width, b.$nextCanv.height), b.cw - b.arrowPadding - b.$nextCanv.width, ~~(b.ch / 2 - b.$nextCanv.height / 2)), e = 0, f = g.length; f > e; e++) g[e].color = function() {
                    return b.mx > 0 && b.mx > b.cw - (2 * b.arrowPadding + b.$nextCanv.width) ? b.hoverColorArr : b.colorArr
                }, c.push(g[e])
            }(b.currImg != b.lastImg || 1 == a) && (c.shuffle(), b.lastImg = b.currImg);
            for (var h = b.pxlBuffer.first, e = 0, f = c.length; f > e; e++) {
                var i = null;
                null != h ? (i = h, h = h.next) : (b.swapList(b.recycleBuffer.first, b.recycleBuffer, b.pxlBuffer), i = b.pxlBuffer.first), i.gravityX = c[e].x, i.gravityY = c[e].y, i.color = c[e].color
            }
            for (; null != h;) h.ttl = ~~(10 * Math.random()), h.gravityY = ~~(b.ch * Math.random()), h.gravityX = ~~(b.cw * Math.random()), h = h.next;
            b.$overlay.innerHTML = b.$$slides[b.currImg].innerHTML
        }
    }, ParticleSlider.prototype.getCw = function() {
        var a = this;
        return a.getCwOR ? a.getCwOR() : Math.min(document.body.clientWidth, a.width, a.$container.clientWidth)
    }, ParticleSlider.prototype.getCh = function() {
        var a = this;
        return a.getChOR ? a.getChOR() : Math.min(document.body.clientHeight, a.height, a.$container.clientHeight)
    }, ParticleSlider.prototype.resize = function() {
        var a = this;
        a.cw = a.getCw(), a.ch = a.getCh(), a.$canv.width = a.cw, a.$canv.height = a.ch, a.init()
    }, ParticleSlider.prototype.setColor = function(a) {
        var b = this;
        b.colorArr = b.parseColor(a)
    }, ParticleSlider.prototype.setHoverColor = function(a) {
        var b = this;
        b.hoverColorArr = b.parseColor(a)
    }, window.Modernizr = function(a, b, c) {
        function d(a) {
            t.cssText = a
        }

        function e(a, b) {
            return d(x.join(a + ";") + (b || ""))
        }

        function f(a, b) {
            return typeof a === b
        }

        function g(a, b) {
            return !!~("" + a).indexOf(b)
        }

        function h(a, b) {
            for (var d in a) {
                var e = a[d];
                if (!g(e, "-") && t[e] !== c) return "pfx" == b ? e : !0
            }
            return !1
        }

        function i(a, b, d) {
            for (var e in a) {
                var g = b[a[e]];
                if (g !== c) return d === !1 ? a[e] : f(g, "function") ? g.bind(d || b) : g
            }
            return !1
        }

        function j(a, b, c) {
            var d = a.charAt(0).toUpperCase() + a.slice(1),
                e = (a + " " + z.join(d + " ") + d).split(" ");
            return f(b, "string") || f(b, "undefined") ? h(e, b) : (e = (a + " " + A.join(d + " ") + d).split(" "), i(e, b, c))
        }

        function k() {
            o.input = function(c) {
                for (var d = 0, e = c.length; e > d; d++) E[c[d]] = c[d] in u;
                return E.list && (E.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), E
            }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), o.inputtypes = function(a) {
                for (var d, e, f, g = 0, h = a.length; h > g; g++) u.setAttribute("type", e = a[g]), d = "text" !== u.type, d && (u.value = v, u.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(e) && u.style.WebkitAppearance !== c ? (q.appendChild(u), f = b.defaultView, d = f.getComputedStyle && "textfield" !== f.getComputedStyle(u, null).WebkitAppearance && 0 !== u.offsetHeight, q.removeChild(u)) : /^(search|tel)$/.test(e) || (d = /^(url|email)$/.test(e) ? u.checkValidity && u.checkValidity() === !1 : u.value != v)), D[a[g]] = !!d;
                return D
            }("search tel url email datetime date month week time datetime-local number range color".split(" "))
        }
        var l, m, n = "2.8.3",
            o = {},
            p = !0,
            q = b.documentElement,
            r = "modernizr",
            s = b.createElement(r),
            t = s.style,
            u = b.createElement("input"),
            v = ":)",
            w = {}.toString,
            x = " -webkit- -moz- -o- -ms- ".split(" "),
            y = "Webkit Moz O ms",
            z = y.split(" "),
            A = y.toLowerCase().split(" "),
            B = {
                svg: "http://www.w3.org/2000/svg"
            },
            C = {},
            D = {},
            E = {},
            F = [],
            G = F.slice,
            H = function(a, c, d, e) {
                var f, g, h, i, j = b.createElement("div"),
                    k = b.body,
                    l = k || b.createElement("body");
                if (parseInt(d, 10))
                    for (; d--;) h = b.createElement("div"), h.id = e ? e[d] : r + (d + 1), j.appendChild(h);
                return f = ["&#173;", '<style id="s', r, '">', a, "</style>"].join(""), j.id = r, (k ? j : l).innerHTML += f, l.appendChild(j), k || (l.style.background = "", l.style.overflow = "hidden", i = q.style.overflow, q.style.overflow = "hidden", q.appendChild(l)), g = c(j, a), k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l), q.style.overflow = i), !!g
            },
            I = function() {
                function a(a, e) {
                    e = e || b.createElement(d[a] || "div"), a = "on" + a;
                    var g = a in e;
                    return g || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(a, ""), g = f(e[a], "function"), f(e[a], "undefined") || (e[a] = c), e.removeAttribute(a))), e = null, g
                }
                var d = {
                    select: "input",
                    change: "input",
                    submit: "form",
                    reset: "form",
                    error: "img",
                    load: "img",
                    abort: "img"
                };
                return a
            }(),
            J = {}.hasOwnProperty;
        m = f(J, "undefined") || f(J.call, "undefined") ? function(a, b) {
            return b in a && f(a.constructor.prototype[b], "undefined")
        } : function(a, b) {
            return J.call(a, b)
        }, Function.prototype.bind || (Function.prototype.bind = function(a) {
            var b = this;
            if ("function" != typeof b) throw new TypeError;
            var c = G.call(arguments, 1),
                d = function() {
                    if (this instanceof d) {
                        var e = function() {};
                        e.prototype = b.prototype;
                        var f = new e,
                            g = b.apply(f, c.concat(G.call(arguments)));
                        return Object(g) === g ? g : f
                    }
                    return b.apply(a, c.concat(G.call(arguments)))
                };
            return d
        }), C.flexbox = function() {
            return j("flexWrap")
        }, C.flexboxlegacy = function() {
            return j("boxDirection")
        }, C.canvas = function() {
            var a = b.createElement("canvas");
            return !!a.getContext && !!a.getContext("2d")
        }, C.canvastext = function() {
            return !!o.canvas && !!f(b.createElement("canvas").getContext("2d").fillText, "function")
        }, C.webgl = function() {
            return !!a.WebGLRenderingContext
        }, C.touch = function() {
            var c;
            return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : H(["@media (", x.join("touch-enabled),("), r, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                c = 9 === a.offsetTop
            }), c
        }, C.geolocation = function() {
            return "geolocation" in navigator
        }, C.postmessage = function() {
            return !!a.postMessage
        }, C.websqldatabase = function() {
            return !!a.openDatabase
        }, C.indexedDB = function() {
            return !!j("indexedDB", a)
        }, C.hashchange = function() {
            return I("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
        }, C.history = function() {
            return !!a.history && !!history.pushState
        }, C.draganddrop = function() {
            var a = b.createElement("div");
            return "draggable" in a || "ondragstart" in a && "ondrop" in a
        }, C.websockets = function() {
            return "WebSocket" in a || "MozWebSocket" in a
        }, C.rgba = function() {
            return d("background-color:rgba(150,255,150,.5)"), g(t.backgroundColor, "rgba")
        }, C.hsla = function() {
            return d("background-color:hsla(120,40%,100%,.5)"), g(t.backgroundColor, "rgba") || g(t.backgroundColor, "hsla")
        }, C.multiplebgs = function() {
            return d("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(t.background)
        }, C.backgroundsize = function() {
            return j("backgroundSize")
        }, C.borderimage = function() {
            return j("borderImage")
        }, C.borderradius = function() {
            return j("borderRadius")
        }, C.boxshadow = function() {
            return j("boxShadow")
        }, C.textshadow = function() {
            return "" === b.createElement("div").style.textShadow
        }, C.opacity = function() {
            return e("opacity:.55"), /^0.55$/.test(t.opacity)
        }, C.cssanimations = function() {
            return j("animationName")
        }, C.csscolumns = function() {
            return j("columnCount")
        }, C.cssgradients = function() {
            var a = "background-image:",
                b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                c = "linear-gradient(left top,#9f9, white);";
            return d((a + "-webkit- ".split(" ").join(b + a) + x.join(c + a)).slice(0, -a.length)), g(t.backgroundImage, "gradient")
        }, C.cssreflections = function() {
            return j("boxReflect")
        }, C.csstransforms = function() {
            return !!j("transform")
        }, C.csstransforms3d = function() {
            var a = !!j("perspective");
            return a && "webkitPerspective" in q.style && H("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b) {
                a = 9 === b.offsetLeft && 3 === b.offsetHeight
            }), a
        }, C.csstransitions = function() {
            return j("transition")
        }, C.fontface = function() {
            var a;
            return H('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
                var e = b.getElementById("smodernizr"),
                    f = e.sheet || e.styleSheet,
                    g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
                a = /src/i.test(g) && 0 === g.indexOf(d.split(" ")[0])
            }), a
        }, C.generatedcontent = function() {
            var a;
            return H(["#", r, "{font:0/0 a}#", r, ':after{content:"', v, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
                a = b.offsetHeight >= 3
            }), a
        }, C.video = function() {
            var a = b.createElement("video"),
                c = !1;
            try {
                (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
            } catch (d) {}
            return c
        }, C.audio = function() {
            var a = b.createElement("audio"),
                c = !1;
            try {
                (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""))
            } catch (d) {}
            return c
        }, C.localstorage = function() {
            try {
                return localStorage.setItem(r, r), localStorage.removeItem(r), !0
            } catch (a) {
                return !1
            }
        }, C.sessionstorage = function() {
            try {
                return sessionStorage.setItem(r, r), sessionStorage.removeItem(r), !0
            } catch (a) {
                return !1
            }
        }, C.webworkers = function() {
            return !!a.Worker
        }, C.applicationcache = function() {
            return !!a.applicationCache
        }, C.svg = function() {
            return !!b.createElementNS && !!b.createElementNS(B.svg, "svg").createSVGRect
        }, C.inlinesvg = function() {
            var a = b.createElement("div");
            return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == B.svg
        }, C.smil = function() {
            return !!b.createElementNS && /SVGAnimate/.test(w.call(b.createElementNS(B.svg, "animate")))
        }, C.svgclippaths = function() {
            return !!b.createElementNS && /SVGClipPath/.test(w.call(b.createElementNS(B.svg, "clipPath")))
        };
        for (var K in C) m(C, K) && (l = K.toLowerCase(), o[l] = C[K](), F.push((o[l] ? "" : "no-") + l));
        return o.input || k(), o.addTest = function(a, b) {
                if ("object" == typeof a)
                    for (var d in a) m(a, d) && o.addTest(d, a[d]);
                else {
                    if (a = a.toLowerCase(), o[a] !== c) return o;
                    b = "function" == typeof b ? b() : b, "undefined" != typeof p && p && (q.className += " " + (b ? "" : "no-") + a), o[a] = b
                }
                return o
            }, d(""), s = u = null,
            function(a, b) {
                function c(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
                }

                function d() {
                    var a = s.elements;
                    return "string" == typeof a ? a.split(" ") : a
                }

                function e(a) {
                    var b = r[a[p]];
                    return b || (b = {}, q++, a[p] = q, r[q] = b), b
                }

                function f(a, c, d) {
                    if (c || (c = b), k) return c.createElement(a);
                    d || (d = e(c));
                    var f;
                    return f = d.cache[a] ? d.cache[a].cloneNode() : o.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), !f.canHaveChildren || n.test(a) || f.tagUrn ? f : d.frag.appendChild(f)
                }

                function g(a, c) {
                    if (a || (a = b), k) return a.createDocumentFragment();
                    c = c || e(a);
                    for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++) f.createElement(h[g]);
                    return f
                }

                function h(a, b) {
                    b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                        return s.shivMethods ? f(c, a, b) : b.createElem(c)
                    }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-]+/g, function(a) {
                        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                    }) + ");return n}")(s, b.frag)
                }

                function i(a) {
                    a || (a = b);
                    var d = e(a);
                    return s.shivCSS && !j && !d.hasCSS && (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || h(a, d), a
                }
                var j, k, l = "3.7.0",
                    m = a.html5 || {},
                    n = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    o = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    p = "_html5shiv",
                    q = 0,
                    r = {};
                ! function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", j = "hidden" in a, k = 1 == a.childNodes.length || function() {
                            b.createElement("a");
                            var a = b.createDocumentFragment();
                            return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                        }()
                    } catch (c) {
                        j = !0, k = !0
                    }
                }();
                var s = {
                    elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
                    version: l,
                    shivCSS: m.shivCSS !== !1,
                    supportsUnknownElements: k,
                    shivMethods: m.shivMethods !== !1,
                    type: "default",
                    shivDocument: i,
                    createElement: f,
                    createDocumentFragment: g
                };
                a.html5 = s, i(b)
            }(this, b), o._version = n, o._prefixes = x, o._domPrefixes = A, o._cssomPrefixes = z, o.hasEvent = I, o.testProp = function(a) {
                return h([a])
            }, o.testAllProps = j, o.testStyles = H, q.className = q.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + F.join(" ") : ""), o
    }(this, this.document),
    function(a, b, c) {
        function d(a) {
            return "[object Function]" == q.call(a)
        }

        function e(a) {
            return "string" == typeof a
        }

        function f() {}

        function g(a) {
            return !a || "loaded" == a || "complete" == a || "uninitialized" == a
        }

        function h() {
            var a = r.shift();
            s = 1, a ? a.t ? o(function() {
                ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
            }, 0) : (a(), h()) : s = 0
        }

        function i(a, c, d, e, f, i, j) {
            function k(b) {
                if (!n && g(l.readyState) && (t.r = n = 1, !s && h(), l.onload = l.onreadystatechange = null, b)) {
                    "img" != a && o(function() {
                        v.removeChild(l)
                    }, 50);
                    for (var d in A[c]) A[c].hasOwnProperty(d) && A[c][d].onload()
                }
            }
            var j = j || m.errorTimeout,
                l = b.createElement(a),
                n = 0,
                q = 0,
                t = {
                    t: d,
                    s: c,
                    e: f,
                    a: i,
                    x: j
                };
            1 === A[c] && (q = 1, A[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
                k.call(this, q)
            }, r.splice(e, 0, t), "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null : p), o(k, j)) : A[c].push(l))
        }

        function j(a, b, c, d, f) {
            return s = 0, b = b || "j", e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a), 1 == r.length && h()), this
        }

        function k() {
            var a = m;
            return a.loader = {
                load: j,
                i: 0
            }, a
        }
        var l, m, n = b.documentElement,
            o = a.setTimeout,
            p = b.getElementsByTagName("script")[0],
            q = {}.toString,
            r = [],
            s = 0,
            t = "MozAppearance" in n.style,
            u = t && !!b.createRange().compareNode,
            v = u ? n : p.parentNode,
            n = a.opera && "[object Opera]" == q.call(a.opera),
            n = !!b.attachEvent && !n,
            w = t ? "object" : n ? "script" : "img",
            x = n ? "script" : w,
            y = Array.isArray || function(a) {
                return "[object Array]" == q.call(a)
            },
            z = [],
            A = {},
            B = {
                timeout: function(a, b) {
                    return b.length && (a.timeout = b[0]), a
                }
            };
        m = function(a) {
            function b(a) {
                var b, c, d, a = a.split("!"),
                    e = z.length,
                    f = a.pop(),
                    g = a.length,
                    f = {
                        url: f,
                        origUrl: f,
                        prefixes: a
                    };
                for (c = 0; g > c; c++) d = a[c].split("="), (b = B[d.shift()]) && (f = b(f, d));
                for (c = 0; e > c; c++) f = z[c](f);
                return f
            }

            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec = !0 : A[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                    k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), A[i.url] = 2
                })))
            }

            function h(a, b) {
                function c(a, c) {
                    if (a) {
                        if (e(a)) c || (l = function() {
                            var a = [].slice.call(arguments);
                            m.apply(this, a), n()
                        }), g(a, l, b, 0, j);
                        else if (Object(a) === a)
                            for (i in h = function() {
                                    var b, c = 0;
                                    for (b in a) a.hasOwnProperty(b) && c++;
                                    return c
                                }(), a) a.hasOwnProperty(i) && (!c && !--h && (d(l) ? l = function() {
                                var a = [].slice.call(arguments);
                                m.apply(this, a), n()
                            } : l[i] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b), n()
                                }
                            }(m[i])), g(a[i], l, b, i, j))
                    } else !c && n()
                }
                var h, i, j = !!a.test,
                    k = a.load || a.both,
                    l = a.callback || f,
                    m = l,
                    n = a.complete || f;
                c(j ? a.yep : a.nope, !!k), k && c(k)
            }
            var i, j, l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (y(a))
                for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l)
        }, m.addPrefix = function(a, b) {
            B[a] = b
        }, m.addFilter = function(a) {
            z.push(a)
        }, m.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", l = function() {
            b.removeEventListener("DOMContentLoaded", l, 0), b.readyState = "complete"
        }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
            var k, l, n = b.createElement("script"),
                e = e || m.errorTimeout;
            n.src = a;
            for (l in d) n.setAttribute(l, d[l]);
            c = j ? h : c || f, n.onreadystatechange = n.onload = function() {
                !k && g(n.readyState) && (k = 1, c(), n.onload = n.onreadystatechange = null)
            }, o(function() {
                k || (k = 1, c(1))
            }, e), i ? n.onload() : p.parentNode.insertBefore(n, p)
        }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
            var j, e = b.createElement("link"),
                c = i ? h : c || f;
            e.href = a, e.rel = "stylesheet", e.type = "text/css";
            for (j in d) e.setAttribute(j, d[j]);
            g || (p.parentNode.insertBefore(e, p), o(c, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    },
    function(a, b, c) {
        var d = a.jQuery || a.Zepto || a.ender || a.elo;
        "undefined" != typeof module && module.exports ? module.exports = c(d) : a[b] = c(d)
    }(this, "Response", function(a) {
        function b(a) {
            return a === +a
        }

        function c(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        }

        function d(a, b) {
            var c = this.call();
            return c >= (a || 0) && (!b || b >= c)
        }

        function e(a, b, c) {
            for (var d = [], e = a.length, f = 0; e > f;) d[f] = b.call(c, a[f], f++, a);
            return d
        }

        function f(a) {
            return a ? i("string" == typeof a ? a.split(" ") : a) : []
        }

        function g(a, b, c) {
            if (null == a) return a;
            for (var d = a.length, e = 0; d > e;) b.call(c || a[e], a[e], e++, a);
            return a
        }

        function h(a, b, c) {
            null == b && (b = ""), null == c && (c = "");
            for (var d = [], e = a.length, f = 0; e > f; f++) null == a[f] || d.push(b + a[f] + c);
            return d
        }

        function i(a, b, c) {
            var d, e, f, g = [],
                h = 0,
                i = 0,
                j = "function" == typeof b,
                k = !0 === c;
            for (e = a && a.length, c = k ? null : c; e > i; i++) f = a[i], d = j ? !b.call(c, f, i, a) : b ? typeof f !== b : !f, d === k && (g[h++] = f);
            return g
        }

        function j(a, c) {
            if (null == a || null == c) return a;
            if ("object" == typeof c && b(c.length)) _.apply(a, i(c, "undefined", !0));
            else
                for (var d in c) cb.call(c, d) && void 0 !== c[d] && (a[d] = c[d]);
            return a
        }

        function k(a, c, d) {
            return null == a ? a : ("object" == typeof a && !a.nodeType && b(a.length) ? g(a, c, d) : c.call(d || a, a), a)
        }

        function l(a) {
            var b = T.devicePixelRatio;
            return null == a ? b || (l(2) ? 2 : l(1.5) ? 1.5 : l(1) ? 1 : 0) : isFinite(a) ? b && b > 0 ? b >= a : (a = "only all and (min--moz-device-pixel-ratio:" + a + ")", zb(a) ? !0 : zb(a.replace("-moz-", ""))) : !1
        }

        function m(a) {
            return a.replace(tb, "$1").replace(sb, function(a, b) {
                return b.toUpperCase()
            })
        }

        function n(a) {
            return "data-" + (a ? a.replace(tb, "$1").replace(rb, "$1-$2").toLowerCase() : a)
        }

        function o(a) {
            var b;
            return "string" == typeof a && a ? "false" === a ? !1 : "true" === a ? !0 : "null" === a ? null : "undefined" === a || (b = +a) || 0 === b || "NaN" === a ? b : a : a
        }

        function p(a) {
            return !a || a.nodeType ? a : a[0]
        }

        function q(a, b, c) {
            var d, e, f, g, h;
            if (a.attributes)
                for (d = "boolean" == typeof c ? /^data-/ : d, g = 0, h = a.attributes.length; h > g;)(f = a.attributes[g++]) && (e = "" + f.name, d && d.test(e) !== c || null == f.value || b.call(a, f.value, e, f))
        }

        function r(a) {
            var b;
            if (a && 1 === a.nodeType) return (b = Y && a.dataset) ? b : (b = {}, q(a, function(a, c) {
                b[m(c)] = "" + a
            }, !0), b)
        }

        function s(a, b, c) {
            for (var d in b) cb.call(b, d) && c(a, d, b[d])
        }

        function t(a, b, c) {
            if (a = p(a), a && a.setAttribute) {
                if (void 0 === b && c === b) return r(a);
                var d = db(b) && n(b[0]);
                if ("object" != typeof b || d) {
                    if (b = d || n(b), !b) return;
                    return void 0 === c ? (b = a.getAttribute(b), null == b ? c : d ? o(b) : "" + b) : (a.setAttribute(b, c = "" + c), c)
                }
                b && s(a, b, t)
            }
        }

        function u(a, b) {
            b = f(b), k(a, function(a) {
                g(b, function(b) {
                    a.removeAttribute(n(b))
                })
            })
        }

        function v(a) {
            for (var b, c = [], d = 0, e = a.length; e > d;)(b = a[d++]) && c.push("[" + n(b.replace(qb, "").replace(".", "\\.")) + "]");
            return c.join()
        }

        function w(b) {
            return a(v(f(b)))
        }

        function x() {
            return window.pageXOffset || V.scrollLeft
        }

        function y() {
            return window.pageYOffset || V.scrollTop
        }

        function z(a, b) {
            var c = a.getBoundingClientRect ? a.getBoundingClientRect() : {};
            return b = "number" == typeof b ? b || 0 : 0, {
                top: (c.top || 0) - b,
                left: (c.left || 0) - b,
                bottom: (c.bottom || 0) + b,
                right: (c.right || 0) + b
            }
        }

        function A(a, b) {
            var c = z(p(a), b);
            return !!c && c.right >= 0 && c.left <= Ab()
        }

        function B(a, b) {
            var c = z(p(a), b);
            return !!c && c.bottom >= 0 && c.top <= Bb()
        }

        function C(a, b) {
            var c = z(p(a), b);
            return !!c && c.bottom >= 0 && c.top <= Bb() && c.right >= 0 && c.left <= Ab()
        }

        function D(a) {
            var b = {
                    img: 1,
                    input: 1,
                    source: 3,
                    embed: 3,
                    track: 3,
                    iframe: 5,
                    audio: 5,
                    video: 5,
                    script: 5
                },
                c = b[a.nodeName.toLowerCase()] || -1;
            return 4 > c ? c : null != a.getAttribute("src") ? 5 : -5
        }

        function E(a, b, c) {
            var d;
            if (!a || null == b) throw new TypeError("@store");
            return c = "string" == typeof c && c, k(a, function(a) {
                d = c ? a.getAttribute(c) : 0 < D(a) ? a.getAttribute("src") : a.innerHTML, null == d ? u(a, b) : t(a, b, d)
            }), N
        }

        function F(a, b) {
            var c = [];
            return a && b && g(f(b), function(b) {
                c.push(t(a, b))
            }, a), c
        }

        function G(a, b) {
            return "string" == typeof a && "function" == typeof b && (fb[a] = b, gb[a] = 1), N
        }

        function H(a) {
            return X.on("resize", a), N
        }

        function I(a, b) {
            var c, d, e = wb.crossover;
            return "function" == typeof a && (c = b, b = a, a = c), d = a ? "" + a + e : e, X.on(d, b), N
        }

        function J(a) {
            return k(a, function(a) {
                W(a), H(a)
            }), N
        }

        function K(a) {
            return k(a, function(a) {
                if ("object" != typeof a) throw new TypeError("@create");
                var b, c = ub(O).configure(a),
                    d = c.verge,
                    e = c.breakpoints,
                    f = vb("scroll"),
                    h = vb("resize");
                e.length && (b = e[0] || e[1] || !1, W(function() {
                    function a() {
                        c.reset(), g(c.$e, function(a, b) {
                            c[b].decideValue().updateDOM()
                        }).trigger(i)
                    }

                    function e() {
                        g(c.$e, function(a, b) {
                            C(c[b].$e, d) && c[b].updateDOM()
                        })
                    }
                    var i = wb.allLoaded,
                        j = !!c.lazy;
                    g(c.target().$e, function(a, b) {
                        c[b] = ub(c).prepareData(a), (!j || C(c[b].$e, d)) && c[b].updateDOM()
                    }), c.dynamic && (c.custom || lb > b) && H(a, h), j && (X.on(f, e), c.$e.one(i, function() {
                        X.off(f, e)
                    }))
                }))
            }), N
        }

        function L(a) {
            return P[Q] === N && (P[Q] = R), "function" == typeof a && a.call(P, N), N
        }
        if ("function" != typeof a) try {
            return void console.warn("response.js aborted due to missing dependency")
        } catch (M) {}
        var N, O, P = this,
            Q = "Response",
            R = P[Q],
            S = "init" + Q,
            T = window,
            U = document,
            V = U.documentElement,
            W = a.domReady || a,
            X = a(T),
            Y = "undefined" != typeof DOMStringMap,
            Z = Array.prototype,
            $ = Object.prototype,
            _ = Z.push,
            ab = Z.concat,
            bb = $.toString,
            cb = $.hasOwnProperty,
            db = Array.isArray || function(a) {
                return "[object Array]" === bb.call(a)
            },
            eb = {
                width: [0, 320, 481, 641, 961, 1025, 1281],
                height: [0, 481],
                ratio: [1, 1.5, 2]
            },
            fb = {},
            gb = {},
            hb = {
                all: []
            },
            ib = 1,
            jb = screen.width,
            kb = screen.height,
            lb = jb > kb ? jb : kb,
            mb = jb + kb - lb,
            nb = function() {
                return jb
            },
            ob = function() {
                return kb
            },
            pb = /[^a-z0-9_\-\.]/gi,
            qb = /^[\W\s]+|[\W\s]+$|/g,
            rb = /([a-z])([A-Z])/g,
            sb = /-(.)/g,
            tb = /^data-(.+)$/,
            ub = Object.create || function(a) {
                function b() {}
                return b.prototype = a, new b
            },
            vb = function(a, b) {
                return b = b || Q, a.replace(qb, "") + "." + b.replace(qb, "")
            },
            wb = {
                allLoaded: vb("allLoaded"),
                crossover: vb("crossover")
            },
            xb = T.matchMedia || T.msMatchMedia,
            yb = xb ? c(xb, T) : function() {
                return {}
            },
            zb = xb ? function(a) {
                return !!xb.call(T, a)
            } : function() {
                return !1
            },
            Ab = function() {
                var a = V.clientWidth,
                    b = T.innerWidth;
                return b > a ? b : a
            },
            Bb = function() {
                var a = V.clientHeight,
                    b = T.innerHeight;
                return b > a ? b : a
            },
            Cb = c(d, Ab),
            Db = c(d, Bb),
            Eb = {
                band: c(d, nb),
                wave: c(d, ob)
            };
        return O = function() {
            function b(a) {
                return "string" == typeof a ? a.toLowerCase().replace(pb, "") : ""
            }

            function c(a, b) {
                return a - b
            }
            var d = wb.crossover,
                k = Math.min;
            return {
                $e: 0,
                mode: 0,
                breakpoints: null,
                prefix: null,
                prop: "width",
                keys: [],
                dynamic: null,
                custom: 0,
                values: [],
                fn: 0,
                verge: null,
                newValue: 0,
                currValue: 1,
                aka: null,
                lazy: null,
                i: 0,
                uid: null,
                reset: function() {
                    for (var a = this.breakpoints, b = a.length, c = 0; !c && b--;) this.fn(a[b]) && (c = b);
                    return c !== this.i && (X.trigger(d).trigger(this.prop + d), this.i = c || 0), this
                },
                configure: function(a) {
                    j(this, a);
                    var d, l, m, n, o, p = !0,
                        q = this.prop;
                    if (this.uid = ib++, null == this.verge && (this.verge = k(lb, 500)), !(this.fn = fb[q])) throw new TypeError("@create");
                    if (null == this.dynamic && (this.dynamic = "device" !== q.slice(0, 6)), this.custom = gb[q], m = this.prefix ? i(e(f(this.prefix), b)) : ["min-" + q + "-"], n = 1 < m.length ? m.slice(1) : 0, this.prefix = m[0], l = this.breakpoints, db(l)) {
                        if (g(l, function(a) {
                                if (!a && 0 !== a) throw "invalid breakpoint";
                                p = p && isFinite(a)
                            }), p && l.sort(c), !l.length) throw new TypeError(".breakpoints")
                    } else if (l = eb[q] || eb[q.split("-").pop()], !l) throw new TypeError(".prop");
                    if (this.breakpoints = l, this.keys = h(this.breakpoints, this.prefix), this.aka = null, n) {
                        for (o = [], d = n.length; d--;) o.push(h(this.breakpoints, n[d]));
                        this.aka = o, this.keys = ab.apply(this.keys, o)
                    }
                    return hb.all = hb.all.concat(hb[this.uid] = this.keys), this
                },
                target: function() {
                    return this.$e = a(v(hb[this.uid])), E(this.$e, S), this.keys.push(S), this
                },
                decideValue: function() {
                    for (var a = null, b = this.breakpoints, c = b.length, d = c; null == a && d--;) this.fn(b[d]) && (a = this.values[d]);
                    return this.newValue = "string" == typeof a ? a : this.values[c], this
                },
                prepareData: function(b) {
                    if (this.$e = a(b), this.mode = D(b), this.values = F(this.$e, this.keys), this.aka)
                        for (var c = this.aka.length; c--;) this.values = j(this.values, F(this.$e, this.aka[c]));
                    return this.decideValue()
                },
                updateDOM: function() {
                    return this.currValue === this.newValue ? this : (this.currValue = this.newValue, 0 < this.mode ? this.$e[0].setAttribute("src", this.newValue) : null == this.newValue ? this.$e.empty && this.$e.empty() : this.$e.html ? this.$e.html(this.newValue) : (this.$e.empty && this.$e.empty(), this.$e[0].innerHTML = this.newValue), this)
                }
            }
        }(), fb.width = Cb, fb.height = Db, fb["device-width"] = Eb.band, fb["device-height"] = Eb.wave, fb["device-pixel-ratio"] = l, N = {
            deviceMin: function() {
                return mb
            },
            deviceMax: function() {
                return lb
            },
            noConflict: L,
            create: K,
            addTest: G,
            datatize: n,
            camelize: m,
            render: o,
            store: E,
            access: F,
            target: w,
            object: ub,
            crossover: I,
            action: J,
            resize: H,
            ready: W,
            affix: h,
            sift: i,
            dpr: l,
            deletes: u,
            scrollX: x,
            scrollY: y,
            deviceW: nb,
            deviceH: ob,
            device: Eb,
            inX: A,
            inY: B,
            route: k,
            merge: j,
            media: yb,
            mq: zb,
            wave: Db,
            band: Cb,
            map: e,
            each: g,
            inViewport: C,
            dataset: t,
            viewportH: Bb,
            viewportW: Ab
        }, W(function() {
            var b = t(U.body, "responsejs"),
                c = T.JSON && JSON.parse || a.parseJSON;
            b = b && c ? c(b) : b, b && b.create && K(b.create), V.className = V.className.replace(/(^|\s)(no-)?responsejs(\s|$)/, "$1$3") + " responsejs "
        }), N
    }),
    function(a) {
        var b, c;
        a(document).ready(function() {
            d(), e(), a("html").hasClass("cssanimations") && k(), a("#xmas").length > 0 && l(), f(), Modernizr.canvas && a("#particle-slider").length > 0 && g(), h(), i(), j(), m(), a(window).trigger("throttledresize")
        });
        var d = function() {
                Response.create({
                    mode: "markup",
                    prop: "width",
                    prefix: "r",
                    breakpoints: [0, 350, 750, 1e3, 1200, 1400, 1600]
                }), Response.create({
                    mode: "src",
                    prop: "width",
                    prefix: "src",
                    breakpoints: [0, 350, 750, 1e3, 1200, 1400, 1600]
                })
            },
            e = function() {
                a(window).on("throttledresize", function() {
                    var b = a(".mobile-menu-link, .mobile-nav ul li a"),
                        c = a(".mobile-nav"),
                        d = a("#menu-icon");
                    b.on("click", function(b) {
                        a(this).hasClass("mobile-menu-link") ? (b.preventDefault(), c.toggleClass("menu-open"), d.toggleClass("active")) : (c.toggleClass("menu-open"), d.toggleClass("active"))
                    })
                })
            },
            f = function() {
                for (var b, c = ["msTouchAction", "msWrapFlow", "msWrapMargin", "msWrapThrough", "msOverflowStyle", "msScrollChaining", "msScrollLimit", "msScrollLimitXMin", "msScrollLimitYMin", "msScrollLimitXMax", "msScrollLimitYMax", "msScrollRails", "msScrollSnapPointsX", "msScrollSnapPointsY", "msScrollSnapType", "msScrollSnapX", "msScrollSnapY", "msScrollTranslation", "msFlexbox", "msFlex", "msFlexOrder"], d = ["msTextCombineHorizontal"], e = document, f = e.body, g = f.style, h = null, i = 0; i < c.length; i++) b = c[i], void 0 != g[b] && (h = "ie10");
                for (var i = 0; i < d.length; i++) b = d[i], void 0 != g[b] && (h = "ie11");
                h && (a(".logo-wrapper svg").css("display", "block"), a("html").removeClass("canvas"))
            },
            g = function() {
                var b = {
                    active: !1
                };
                a(window).on("throttledresize", function() {
                    Response.band(1200) && (b.active || (b = new ParticleSlider, b.active = !0))
                }), ParticleSlider.prototype.getCwOR = function() {
                    var b = a("#particle-slider");
                    return b.width()
                }, ParticleSlider.prototype.getChOR = function() {
                    var b = a("#particle-slider");
                    return b.height()
                };
                var c = ParticleSlider.prototype.nextFrame;
                ParticleSlider.prototype.nextFrame = function() {
                    var a = this;
                    a.active ? c.call(this) : setTimeout(function() {
                        window.requestAnimationFrame(function() {
                            a.nextFrame()
                        })
                    }, 15)
                }
            },
            h = function() {
                var b = a("#work div.full-section-content");
                a.jribbble.getShotsByPlayerId("greenchameleon", function(c) {
                    var d = c.shots,
                        e = 12,
                        f = a("<ul>");
                    a.each(d, function(b, c) {
                        if (c.image_400_url) {
                            var d = a("<li>"),
                                g = a("<a>", {
                                    href: c.url,
                                    target: "_blank",
                                    title: "Dribbble.com - " + c.title
                                });
                            if (Response.band(0, 1399)) var h = a("<img>", {
                                src: c.image_400_url,
                                alt: c.title
                            });
                            else var h = a("<img>", {
                                src: c.image_url,
                                alt: c.title
                            });
                            if (g.append(h), d.append(g), f.append(d), e--, 0 >= e) return !1
                        }
                    }), b.append(f)
                })
            },
            i = function() {
                function a() {
                    {
                        var a = [{
                                featureType: "landscape",
                                stylers: [{
                                    saturation: -100
                                }, {
                                    lightness: 65
                                }, {
                                    visibility: "on"
                                }]
                            }, {
                                featureType: "poi",
                                stylers: [{
                                    saturation: -100
                                }, {
                                    lightness: 51
                                }, {
                                    visibility: "simplified"
                                }]
                            }, {
                                featureType: "road.highway",
                                stylers: [{
                                    saturation: -100
                                }, {
                                    visibility: "simplified"
                                }]
                            }, {
                                featureType: "road.arterial",
                                stylers: [{
                                    saturation: -100
                                }, {
                                    lightness: 30
                                }, {
                                    visibility: "on"
                                }]
                            }, {
                                featureType: "road.local",
                                stylers: [{
                                    saturation: -100
                                }, {
                                    lightness: 40
                                }, {
                                    visibility: "on"
                                }]
                            }, {
                                featureType: "transit",
                                stylers: [{
                                    saturation: -100
                                }, {
                                    visibility: "simplified"
                                }]
                            }, {
                                featureType: "administrative.province",
                                stylers: [{
                                    visibility: "off"
                                }]
                            }, {
                                featureType: "water",
                                elementType: "labels",
                                stylers: [{
                                    visibility: "on"
                                }, {
                                    lightness: -25
                                }, {
                                    saturation: -100
                                }]
                            }, {
                                featureType: "water",
                                elementType: "geometry",
                                stylers: [{
                                    hue: "#ffff00"
                                }, {
                                    lightness: -25
                                }, {
                                    saturation: -97
                                }]
                            }],
                            b = {
                                center: {
                                    lat: 51.447555,
                                    lng: -2.596024
                                },
                                zoom: 13,
                                styles: a
                            },
                            c = new google.maps.Map(document.getElementById("contact-map"), b),
                            d = navigator.userAgent.toLowerCase().indexOf("trident") > -1,
                            e = d ? "" : "images/svg/pointer.svg",
                            f = {
                                name: "Green Chameleon",
                                position: {
                                    lat: 51.44147,
                                    lng: -2.608083
                                },
                                map: c,
                                icon: e
                            };
                        new google.maps.Marker(f)
                    }
                }
                google.maps.event.addDomListener(window, "load", a)
            },
            j = function() {
                a("#contact-form").validate({
                    rules: {
                        contactname: "required",
                        contactemail: {
                            required: !0,
                            email: !0
                        },
                        contactphone: {
                            minlength: 5
                        },
                        contactmessage: "required"
                    },
                    messages: {
                        contactname: "Please enter your name",
                        contactemail: {
                            required: "Please enter your email address",
                            email: "Please enter a valid email address"
                        },
                        contactphone: {
                            digits: "Please only use numbers for your phone number",
                            minlength: "Please enter a full and valid phone number",
                            maxlength: "Please enter a full and valid phone number"
                        },
                        contactmessage: "Please let us know how we can help"
                    }
                }), a("#contact-form").on("submit", function(c) {
                    c.preventDefault(), a(this).valid() && b(this)
                }), a("#remove-sent").on("click", function(a) {
                    a.preventDefault(), d()
                });
                var b = function(b) {
                        var d = a(b).serializeArray();
                        a.ajax({
                            url: "../inc/contact.php",
                            type: "POST",
                            data: d,
                            success: function() {
                                c()
                            },
                            error: function(a, b, c) {
                                console.error(c)
                            }
                        })
                    },
                    c = function() {
                        var b = a("#contact .form-content"),
                            c = a("#contact .sent-content");
                        b.removeClass("active"), c.addClass("active"), c.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                            e()
                        })
                    },
                    d = function() {
                        var b = a("#contact .form-content"),
                            c = a("#contact .sent-content");
                        b.addClass("active"), c.removeClass("active")
                    },
                    e = function() {
                        a("#contact-form")[0].reset()
                    }
            },
            k = function() {
                a("div#wrapper").removeClass("wrapper").addClass("trans-wrapper");
                var b = a("<div>", {
                    "class": "trans-curtain"
                });
                a("div#wrapper").append(b);
                var c = ["#intro", "#latest", "#work", "#contact"];
                a.each(c, function(b, c) {
                    $section = a(a("section" + c)[0]);
                    var d = "overlay" === $section.data("trans") ? "trans-overlay" : "trans-page";
                    $section.addClass(d), $section.data("trans-order", b)
                }), a("section" + c[0]).addClass("trans-page-current"), a.each(c, function(b, c) {
                    a('a[href^="' + c + '"]').on("click", function(b) {
                        b.preventDefault();
                        var c = a(this),
                            e = c.attr("href");
                        d(e)
                    })
                });
                var d = function(b) {
                        var c = a(a.find("section.trans-page-current")[0]);
                        if ("#" + c.attr("id") === b) return !1;
                        var d = a("section" + b),
                            g = f(c.data("trans-order"), d.data("trans-order"));
                        c.length > 0 && e(c, "trans-page-current", "", "trans-page-old " + g.trans_out, "out"), e(d, "", "trans-page-current", g.trans_in, "in")
                    },
                    e = function(b, c, d, e, f) {
                        var g = d + " " + e;
                        c.trim() && b.removeClass(c.trim()), g.trim() && b.addClass(g.trim()), a("body").trigger("pageTransitionStart", [{
                            id: b.attr("id"),
                            state: f
                        }]), b.one("webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend", function() {
                            a("body").trigger("pageTransitionEnd", [{
                                id: a(this).attr("id"),
                                state: f
                            }]), a(this).removeClass(e)
                        })
                    },
                    f = function(a, b) {
                        return b > a ? {
                            trans_in: "trans-moveFromBottomFade",
                            trans_out: "trans-moveToTopFade"
                        } : {
                            trans_in: "trans-moveFromTopFade",
                            trans_out: "trans-moveToBottomFade"
                        }
                    };
                mousewheelActive = !0, a(window).on("mousewheel", {
                    mousewheel: {
                        debounce: {
                            leading: !0,
                            trailing: !1,
                            maxDelay: 500
                        }
                    }
                }, function(b) {
                    mousewheelActive && a(window).scrollTop() + -1 * b.deltaY === -1 ? (mousewheelActive = !1, g(-1)) : mousewheelActive && a(window).scrollTop() + a(window).height() + -1 * b.deltaY >= a(document).height() && (mousewheelActive = !1, g(1))
                });
                var g = function(a) {
                        var b = h(),
                            c = b + a,
                            e = i(c);
                        e ? d("#" + e) : mousewheelActive = !0
                    },
                    h = function() {
                        var b = a(a.find("section.trans-page-current")[0]);
                        return b.data("trans-order")
                    },
                    i = function(b) {
                        var c = "";
                        return a("section.trans-page").each(function(d, e) {
                            return a(e).data("trans-order") === b ? (c = a(e).attr("id"), !1) : void 0
                        }), c
                    };
                a("body").on("pageTransitionEnd", function(a, b) {
                    "latest" === b.id && "in" === b.state ? "undefined" != typeof video && video.play() : "intro" === b.id && "in" === b.state && "undefined" != typeof ps && (ps.active = !0), setTimeout(function() {
                        mousewheelActive = !0
                    }, 200)
                }), a("body").on("pageTransitionStart", function(a, b) {
                    "latest" === b.id && "out" === b.state ? "undefined" != typeof video && video.pause() : "intro" === b.id && "out" === b.state && "undefined" != typeof ps && (ps.active = !1)
                })
            },
            l = function() {
                function a() {
                    f.clearRect(0, 0, e.width, e.height);
                    for (var c = 0; i > c; c++) {
                        var j = d[c],
                            k = g,
                            l = h,
                            m = 250,
                            n = j.x,
                            o = j.y,
                            p = Math.sqrt((n - k) * (n - k) + (o - l) * (o - l));
                        if (m > p) {
                            var q = m / (p * p),
                                r = (k - n) / p,
                                s = (l - o) / p,
                                t = q;
                            j.velX -= t * r, j.velY -= t * s
                        } else j.velX *= .98, j.velY <= j.speed && (j.velY = j.speed), j.velX += Math.cos(j.step += .05) * j.stepSize;
                        f.fillStyle = "rgba(255,255,255," + j.opacity + ")", j.y += j.velY, j.x += j.velX, (j.y >= e.height || j.y <= 0) && b(j), (j.x >= e.width || j.x <= 0) && b(j), f.beginPath(), f.arc(j.x, j.y, j.size, 0, 2 * Math.PI), f.fill()
                    }
                    requestAnimationFrame(a)
                }

                function b(a) {
                    a.x = Math.floor(Math.random() * e.width), a.y = 0, a.size = 3 * Math.random() + 2, a.speed = 1 * Math.random() + .5, a.velY = a.speed, a.velX = 0, a.opacity = .5 * Math.random() + .3
                }

                function c() {
                    for (var b = 0; i > b; b++) {
                        var c = Math.floor(Math.random() * e.width),
                            f = Math.floor(Math.random() * e.height),
                            g = 3 * Math.random() + 4,
                            h = 1 * Math.random() + .5,
                            j = .5 * Math.random() + .3;
                        d.push({
                            speed: h,
                            velY: h,
                            velX: 0,
                            x: c,
                            y: f,
                            size: g,
                            stepSize: Math.random() / 160,
                            step: 0,
                            opacity: j
                        })
                    }
                    a()
                }! function() {
                    var a = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                        window.setTimeout(a, 1e3 / 60)
                    };
                    window.requestAnimationFrame = a
                }();
                var d = [],
                    e = document.getElementById("xmas"),
                    f = e.getContext("2d"),
                    g = -100,
                    h = -100;
                if (Response.band(0, 999)) var i = 125;
                else var i = 450;
                e.width = window.innerWidth, e.height = window.innerHeight, e.addEventListener("mousemove", function(a) {
                    g = a.clientX, h = a.clientY
                }), window.addEventListener("resize", function() {
                    e.width = window.innerWidth, e.height = window.innerHeight
                }), c()
            },
            m = function() {
                a(window).on("throttledresize.initSizes", function() {
                    b = a(window).height(), c = a(window).width(), c > b ? a("html").addClass("orientation-landscape").removeClass("orientation-portrait") : a("html").addClass("orientation-portrait").removeClass("orientation-landscape")
                })
            }
    }(jQuery);