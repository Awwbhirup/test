var Te = Object.defineProperty;
var Se = (m, n, t) => n in m ? Te(m, n, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : m[n] = t;
var N = (m, n, t) => (Se(m, typeof n != "symbol" ? n + "" : n, t), t);
import {
    _ as xe
} from "./IconList.8f88358e.js";
import {
    f as Y,
    J as ae,
    q as pe,
    r as h,
    g as Z,
    n as oe,
    h as ce,
    o as _,
    c as $,
    b as i,
    w as D,
    a as g,
    k as s,
    m as C,
    y as O,
    d as K,
    t as ne,
    l as ue,
    j as Q,
    p as he,
    e as ge,
    _ as ie,
    T as se,
    R as Ie,
    W as Le,
    X as Ae,
    Y as $e,
    Z as Me,
    u as De,
    $ as Be,
    s as Ne,
    F as ze,
    a0 as He
} from "./entry.c7ee8776.js";
import {
    a as le,
    _ as fe,
    b as ve
} from "./GridRow.c8ff0ce9.js";
import {
    _ as be
} from "./nuxt-link.ca149e20.js";
import {
    $ as I,
    E as Re,
    b as Je,
    u as Ve,
    l as Xe,
    c as Ge,
    g as Pe,
    a as Oe,
    x as We,
    n as Fe,
    h as je,
    S as qe,
    M as Ue,
    Z as Ke,
    t as Ye,
    i as Ze,
    J as Qe,
    o as et
} from "./index.4ae1b6b5.js";
import {
    B as _e,
    _ as ye
} from "./BaseImage.d75aef71.js";
import {
    _ as tt
} from "./CharAvatar.b10b80f6.js";
import {
    S as nt
} from "./string-storage.34efabf1.js";
const st = m => (he("data-v-ec238ecf"), m = m(), ge(), m),
    ot = {
        href: "https://fiddle.digital",
        target: "_blank",
        class: "fdda -nl"
    },
    at = {
        class: "info"
    },
    ct = {
        class: "i",
        style: {
            "--t-delay": "0.15"
        }
    },
    it = st(() => g("span", {
        class: "-mm"
    }, "i", -1)),
    lt = {
        key: 0,
        style: {
            "--t-delay": "0"
        }
    },
    rt = {
        key: 4,
        class: "scroll-progress -mm -up"
    },
    dt = Y({
        __name: "MainHeader",
        setup(m) {
            const t = Q().$globalClass,
                e = ae(),
                r = pe(() => e.path),
                f = h(null);
            var c = h(!1);
            const l = () => {
                I.getInstance().canRebuild = !1, c.value = !c.value, t.emit("container-minimize", c.value), t.emit("katana:mouse:strength", {
                    instanceId: "hero-sword",
                    translation: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                })
            };
            let o = h(!1),
                a = h(!1),
                d = h(!0),
                v = h(!1),
                L = k => {
                    k > 1 ? d.value = !1 : d.value = !0, k > window.innerHeight ? (a.value = !0, t.emit("show-stats", !0)) : (a.value = !1, t.emit("show-stats", !1)), k > window.innerHeight * 2 ? o.value = !0 : o.value = !1
                },
                w = () => {
                    setTimeout(() => {
                        t.emit("container-minimize", !1), t.emit("header-back"), t.emit("light-on", !1)
                    }, 900)
                },
                z = h(!1),
                M = h(!1);
            const B = h(""),
                E = h(0),
                A = k => {
                    oe(() => {
                        k.target.tagName.toLowerCase() == "header" && (I.getInstance().invalidateCenter("skill-hub"), I.getInstance().invalidateCenter("info-button"))
                    })
                };
            return Z(() => {
                var k;
                oe(() => {
                    let p = I.getInstance();
                    p.on("screen:mobile", x => {
                        M.value = x
                    }), p.on("scroll", L), p.on("scroll-position", x => {
                        p.scrollHeight - p.containerHeight > 0 ? E.value = x.valPct : E.value = 100
                    })
                }), (k = f.value) == null || k.addEventListener("transitionend", A), t.on("header:set-tutorial-class", p => {
                    B.value = p
                }), t.on("header-back", () => {
                    c.value = !1
                }), t.on("light-on", p => {
                    z.value = p
                }), t.on("reservation", p => {
                    v.value = p
                })
            }), ce(() => {
                var k;
                (k = f.value) == null || k.removeEventListener("transitionend", A)
            }), (k, p) => {
                const x = le,
                    V = be,
                    H = fe,
                    X = ve;
                return _(), $("header", {
                    ref_key: "header",
                    ref: f,
                    class: ue([B.value, {
                        "-min": s(a),
                        "-fdda": s(d),
                        "-light": s(z),
                        "-info": s(c),
                        "-reservation": s(v)
                    }]),
                    "string-copy-from": "footer-home"
                }, [i(X, null, {
                    default: D(() => [g("a", ot, [i(x, {
                        src: "logo-fdda"
                    })]), s(r) == "/" ? (_(), $("a", {
                        key: 0,
                        href: "/",
                        class: "symbol -nl",
                        "aria-label": "StringTune",
                        title: "StringTune",
                        onClick: p[0] || (p[0] = (...b) => s(w) && s(w)(...b))
                    }, [g("span", null, [i(_e, {
                        src: "/images/logo-sword.png",
                        nolazy: ""
                    }), i(x, {
                        src: "logo-string"
                    })])])) : C("", !0), s(r) != "/" ? (_(), O(V, {
                        key: 1,
                        href: "/",
                        class: "symbol -nl",
                        "aria-label": "StringTune",
                        title: "StringTune",
                        onClick: s(w)
                    }, {
                        default: D(() => [g("span", null, [i(_e, {
                            src: "/images/logo-sword.png",
                            nolazy: ""
                        }), i(x, {
                            src: "logo-string"
                        })])]),
                        _: 1
                    }, 8, ["onClick"])) : C("", !0), s(r) == "/" ? (_(), $("a", {
                        key: 2,
                        href: "/",
                        class: "logo -nl",
                        "aria-label": "StringTune",
                        title: "StringTune",
                        onClick: p[1] || (p[1] = (...b) => s(w) && s(w)(...b))
                    }, "StringTune")) : C("", !0), s(r) != "/" ? (_(), O(V, {
                        key: 3,
                        href: "/",
                        class: "logo -nl",
                        "aria-label": "StringTune",
                        title: "StringTune",
                        onClick: s(w)
                    }, {
                        default: D(() => [K("StringTune")]),
                        _: 1
                    }, 8, ["onClick"])) : C("", !0), g("nav", at, [g("div", ct, [i(H, {
                        stringId: "info-button",
                        onClick: l,
                        ariaLabelledby: "",
                        cursorTarget: "cursor-modal",
                        outsideContainer: ""
                    }, {
                        default: D(() => [it]),
                        _: 1
                    })]), s(M) ? C("", !0) : (_(), $("div", lt, [i(H, {
                        stringId: "skill-hub",
                        onClick: s(w),
                        ariaLabelledby: "",
                        text: "Skill Hub",
                        routeurl: "/skill-hub",
                        cursorTarget: "cursor-route",
                        extraClass: "route",
                        outsideContainer: ""
                    }, null, 8, ["onClick"])]))]), s(M) ? C("", !0) : (_(), $("span", rt, ne(E.value) + "%", 1))]),
                    _: 1
                })], 2)
            }
        }
    });
const ut = ie(dt, [
        ["__scopeId", "data-v-ec238ecf"]
    ]),
    mt = {
        key: 0,
        class: "stats"
    },
    pt = {
        class: "top -mm -up",
        style: {
            "--l-delay": "0.15"
        }
    },
    ht = {
        class: "fps -mm -up",
        style: {
            "--l-delay": "0"
        }
    },
    gt = Y({
        __name: "Stats",
        setup(m) {
            const t = Q().$globalClass,
                e = ae(),
                r = pe(() => e.path),
                f = h(0),
                c = h(0);
            let l = h(!1);
            const o = h("‖"),
                a = h(!1);
            return Z(() => {
                t.on("show-stats", d => {
                    l.value = d
                }), I.getInstance().on("fps", d => {
                    f.value = d
                }), I.getInstance().on("scroll-position", d => {
                    a.value == !1 && (c.value < d.val ? o.value = "→" : o.value = "←"), a.value = !1, c.value = d.val
                }), I.getInstance().on("scroll:stop", () => {
                    a.value = !0, o.value = "•"
                })
            }), ce(() => {}), (d, v) => (_(), O(se, {
                name: "-t-stats",
                duration: {
                    enter: 900,
                    leave: 900
                }
            }, {
                default: D(() => [s(l) && s(r) == "/" ? (_(), $("div", mt, [g("span", pt, "FPS: " + ne(f.value), 1), g("span", ht, ne(o.value) + " Top: " + ne(c.value) + " px", 1)])) : C("", !0)]),
                _: 1
            }))
        }
    });
const ft = ie(gt, [
        ["__scopeId", "data-v-82e0bf05"]
    ]),
    ee = m => (he("data-v-6498c4d7"), m = m(), ge(), m),
    _t = {
        class: "pop-info -black"
    },
    vt = ee(() => g("span", null, "StringTune", -1)),
    bt = [vt],
    yt = ee(() => g("span", null, "StringTune", -1)),
    kt = {
        class: "close"
    },
    Ct = ee(() => g("span", {
        class: "-mm"
    }, "Close", -1)),
    wt = {
        class: "nav",
        style: {
            "--t-step": "0.075"
        }
    },
    Et = {
        class: "b-wrap b-1",
        style: {
            "--t-delay": "var(--t-step) * 0"
        }
    },
    Tt = {
        key: 0,
        class: "devider",
        style: {
            "--t-delay": "var(--t-step) * 1"
        }
    },
    St = {
        class: "b-wrap b-2",
        style: {
            "--t-delay": "var(--t-step) * 2"
        }
    },
    xt = {
        class: "b-wrap b-3",
        style: {
            "--t-delay": "var(--t-step) * 3"
        }
    },
    It = {
        key: 1,
        class: "devider",
        style: {
            "--t-delay": "var(--t-step) * 4"
        }
    },
    Lt = {
        class: "b-wrap b-4",
        style: {
            "--t-delay": "var(--t-step) * 5"
        }
    },
    At = {
        class: "b-wrap b-5",
        style: {
            "--t-delay": "var(--t-step) * 6"
        }
    },
    $t = {
        class: "about -h4 -m-p",
        string: "split",
        "string-split": "line|word"
    },
    Mt = ee(() => g("span", {
        class: "indent"
    }, null, -1)),
    Dt = ee(() => g("span", {
        class: "copy -mm -up"
    }, [K("© "), g("a", {
        href: "https://fiddle.digital",
        target: "_blank"
    }, "Fiddle.Digital"), K(" Product")], -1)),
    Bt = Y({
        __name: "PopInfo",
        setup(m) {
            const t = Q().$globalClass,
                e = ae(),
                r = pe(() => e.path),
                f = () => {
                    t.emit("container-minimize", !1), t.emit("header-back"), t.emit("katana:mouse:strength", {
                        instanceId: "hero-sword",
                        translation: {
                            x: -8,
                            y: 8,
                            z: 0
                        },
                        rotation: {
                            x: .5,
                            y: -.25,
                            z: .025
                        }
                    }), setTimeout(() => {
                        I.getInstance().canRebuild = !0, I.getInstance().onResize(!0)
                    }, 1200)
                };
            let c = () => {
                    t.emit("container-minimize", !1), t.emit("header-back"), t.emit("light-on", !1)
                },
                l = h(!1);
            return Z(() => {
                oe(() => {
                    I.getInstance().on("screen:mobile", a => {
                        l.value = a
                    })
                })
            }), (o, a) => {
                const d = be,
                    v = le,
                    L = fe,
                    w = tt,
                    z = Ie("split-class"),
                    M = ve;
                return _(), $("div", _t, [i(M, null, {
                    default: D(() => [!s(l) && s(r) == "/" ? (_(), $("a", {
                        key: 0,
                        href: "/",
                        class: "logo -h3 -nl",
                        string: "spotlight|cursor",
                        "aria-label": "StringTune",
                        title: "StringTune",
                        onClick: a[0] || (a[0] = (...B) => s(c) && s(c)(...B)),
                        "string-outside-container": ""
                    }, bt)) : C("", !0), !s(l) && s(r) != "/" ? (_(), O(d, {
                        key: 1,
                        href: "/",
                        class: "logo -h3 -nl",
                        string: "spotlight|cursor",
                        "aria-label": "StringTune",
                        title: "StringTune",
                        onClick: s(c),
                        "string-outside-container": ""
                    }, {
                        default: D(() => [yt]),
                        _: 1
                    }, 8, ["onClick"])) : C("", !0), g("div", kt, [g("button", {
                        onClick: f
                    }, [Ct, i(v, {
                        src: "icon-24_close"
                    })])]), g("nav", wt, [g("div", Et, [i(L, {
                        ariaLabelledby: "",
                        text: "Skill Hub",
                        routeurl: "/skill-hub",
                        cursorTarget: "cursor-route",
                        extraClass: "route",
                        onClick: s(c),
                        outsideContainer: "",
                        passThrough: ""
                    }, null, 8, ["onClick"])]), s(l) ? C("", !0) : (_(), $("span", Tt)), g("div", St, [i(L, {
                        ariaLabelledby: "",
                        text: "Documentation",
                        url: "https://string-tune-docs.fiddle.digital/#/",
                        target: "_blank",
                        cursorTarget: "cursor-newtab",
                        extraClass: "newtab",
                        onClick: s(c),
                        outsideContainer: "",
                        passThrough: ""
                    }, null, 8, ["onClick"])]), g("div", xt, [i(L, {
                        ariaLabelledby: "",
                        text: "StringTune Demo",
                        url: "https://tune-demo.fiddle.digital/",
                        target: "_blank",
                        cursorTarget: "cursor-newtab",
                        extraClass: "newtab",
                        onClick: s(c),
                        outsideContainer: "",
                        passThrough: ""
                    }, null, 8, ["onClick"])]), s(l) ? C("", !0) : (_(), $("span", It)), g("div", Lt, [i(L, {
                        ariaLabelledby: "",
                        url: "https://github.com/Fiddle-Digital",
                        target: "_blank",
                        cursorTarget: "cursor-newtab",
                        onClick: s(c),
                        outsideContainer: "",
                        passThrough: ""
                    }, {
                        default: D(() => [i(v, {
                            src: "icon-20_git"
                        })]),
                        _: 1
                    }, 8, ["onClick"])]), g("div", At, [i(L, {
                        ariaLabelledby: "",
                        url: "https://discord.gg/RweVq2zK5t",
                        target: "_blank",
                        cursorTarget: "cursor-newtab",
                        onClick: s(c),
                        outsideContainer: "",
                        passThrough: ""
                    }, {
                        default: D(() => [i(v, {
                            class: "discord i-1",
                            src: "icon-20_discord"
                        }), i(v, {
                            class: "discord i-2",
                            src: "icon-20_discord"
                        }), i(v, {
                            class: "discord i-3",
                            src: "icon-20_discord"
                        })]),
                        _: 1
                    }, 8, ["onClick"])])]), i(w, {
                        character: "2",
                        outsideContainer: ""
                    }), g("span", $t, [Mt, i(z, {
                        class: "-highlight"
                    }, {
                        default: D(() => [K("StringTune")]),
                        _: 1
                    }), K(" is a modular JavaScript library designed for the convenient and fast application of commonly used animations and animation hooks in web development. It offers a flexible system that allows you to combine, customize, or create your own effects without limitations. ")]), Dt]),
                    _: 1
                })])
            }
        }
    });
const Nt = ie(Bt, [
        ["__scopeId", "data-v-6498c4d7"]
    ]),
    ke = m => (he("data-v-2d0f5086"), m = m(), ge(), m),
    zt = {
        class: "twa-modal -light"
    },
    Ht = {
        class: "modal-body -black"
    },
    Rt = ke(() => g("p", {
        class: "-m"
    }, "Nominated for Studio of the Year and Site of the Year on Awwwards.", -1)),
    Jt = ke(() => g("span", {
        class: "-mm"
    }, "Big honour for us. 🥂", -1)),
    Vt = {
        class: "bttns"
    },
    Xt = Y({
        __name: "TWA",
        setup(m) {
            const t = Q().$globalClass;
            return Z(() => {}), ce(() => {}), (e, r) => {
                const f = ye,
                    c = fe,
                    l = le;
                return _(), $("div", zt, [i(f, {
                    src: "/videos/twas/annual.mp4"
                }), g("div", Ht, [Rt, Jt, g("div", Vt, [i(c, {
                    url: "https://www.awwwards.com/annual-awards/user/9f262adf-7d2f-41e0-a056-2f7a3770f86e",
                    ariaLabelledby: "Vote / Studio",
                    text: "Vote / Studio",
                    target: "_blank",
                    secondary: "",
                    small: ""
                }), i(c, {
                    url: "https://www.awwwards.com/annual-awards/site/cd9d16b3-30c4-4c18-8879-20b584547666",
                    ariaLabelledby: "Vote / Site",
                    text: "Vote / Site",
                    target: "_blank",
                    secondary: "",
                    small: ""
                })])]), g("div", {
                    class: "close",
                    onClick: r[0] || (r[0] = o => s(t).emit("twa-close"))
                }, [i(l, {
                    src: "icon-24_close"
                })])])
            }
        }
    });
const Gt = ie(Xt, [
    ["__scopeId", "data-v-2d0f5086"]
]);

function Pt(m) {
    window[`ga-disable-${m}`] = !0
}

function Ot(m) {
    const n = `ga-disable-${m}`;
    n in window && delete window[n]
}

function Wt() {
    const m = Le().public.gtag,
        n = Ae(m);
    let t;
    t = $e;
    const e = l => {
            const o = [...n];
            let a = o.find(d => d.id === l);
            return a || (l ? (a = {
                id: l
            }, o.unshift(a)) : a = o[0]), a || console.error("[nuxt-gtag] Missing Google tag ID"), {
                tag: a,
                tags: o
            }
        },
        r = l => {
            {
                const {
                    tag: o,
                    tags: a
                } = e(l);
                if (!o) return;
                window.dataLayer || Me({
                    tags: a
                }), document.head.querySelector("script[data-gtag]") || De({
                    script: [{
                        src: Be(m.url, {
                            id: o.id
                        }),
                        "data-gtag": ""
                    }]
                })
            }
        };

    function f(l) {
        {
            const {
                tag: o
            } = e(l);
            o && Pt(o.id)
        }
    }

    function c(l) {
        {
            const {
                tag: o
            } = e(l);
            o && Ot(o.id)
        }
    }
    return {
        gtag: t,
        initialize: r,
        disableAnalytics: f,
        enableAnalytics: c
    }
}
let P = null;
const W = class W {
    constructor() {
        N(this, "localStorage");
        N(this, "onAcceptEvents", []);
        N(this, "onAcceptAllEvents", []);
        N(this, "onDeniedEvents", []);
        N(this, "onSettingsChangeEvents", []);
        N(this, "onSaveSettingsEvents", []);
        N(this, "onOpenSettingsEvents", []);
        N(this, "cookieConsent", "");
        N(this, "settings", {});
        P = document, this.localStorage = localStorage
    }
    static getInstance() {
        return W.instance || (W.instance = new W), W.instance
    }
    acceptAll() {
        this.cookieConsent = "acceptAll", this.localStorage.setItem("cookieConsent", "acceptAll"), this.onAcceptAllEvents.forEach(n => n())
    }
    accept() {
        this.cookieConsent = "accept", this.localStorage.setItem("cookieConsent", "accept"), this.onAcceptEvents.forEach(n => n())
    }
    deny() {
        this.cookieConsent = "deny", this.localStorage.setItem("cookieConsent", "deny"), this.onDeniedEvents.forEach(n => n()), this.deleteAllCookies()
    }
    check() {
        const n = this.localStorage.getItem("cookieConsent");
        switch (n != null && (this.cookieConsent = n), this.cookieConsent) {
            case "accept":
                this.accept();
                break;
            case "acceptAll":
                this.acceptAll();
                break;
            case "deny":
                this.deny();
                break
        }
    }
    set(n, t, e = {}) {
        if (this.cookieConsent === "deny") {
            console.warn("An attempt to write a cookie without the user's consent");
            return
        }
        e = {
            path: "/",
            ...e
        }, e.expires instanceof Date && (e.expires = e.expires.toUTCString());
        let r = encodeURIComponent(n) + "=" + encodeURIComponent(t);
        for (const f in e) {
            r += "; " + f;
            const c = e[f];
            c !== !0 && (r += "=" + c)
        }
        document.cookie = r
    }
    get(n) {
        const t = document.cookie.match(new RegExp("(?:^|; )" + n.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
        return t ? decodeURIComponent(t[1]) : void 0
    }
    has(n) {
        return document.cookie.match(new RegExp("(?:^|; )" + n.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))
    }
    delete(n) {
        this.set(n, "", {
            "max-age": -1
        })
    }
    on(n, t) {
        switch (n) {
            case "accept":
                this.onAcceptEvents.push(t);
                break;
            case "acceptAll":
                this.onAcceptAllEvents.push(t);
                break;
            case "deny":
                this.onDeniedEvents.push(t);
                break;
            case "settingsChange":
                this.onSettingsChangeEvents.push(t);
                break;
            case "saveSettings":
                this.onSaveSettingsEvents.push(t);
                break;
            case "openSettings":
                this.onOpenSettingsEvents.push(t);
                break
        }
    }
    deleteAllCookies() {
        const n = document.cookie.split(";");
        for (const t of n) {
            const e = t.indexOf("="),
                r = e > -1 ? t.substr(0, e) : t;
            document.cookie = r + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
    }
    use(n, t) {
        this.settings[n] = t
    }
    showSettings(n) {
        const {
            title: t,
            description: e,
            privacyLink: r,
            subtitle: f,
            email: c,
            contact: l
        } = n, o = document.createElement("div");
        o.className = "fdcm--popup fdcm--setup -light-theme";
        const a = document.createElement("span");
        a.className = "fdcm--overlay", setTimeout(() => {
            a.className = "fdcm--overlay -ready"
        }, 0), a.onclick = () => {
            document.body.removeChild(o)
        };
        const d = document.createElement("div");
        d.id = "cookie-settings-container", d.className = "fdcm--setting-container", setTimeout(() => {
            d.className = "fdcm--setting-container -ready"
        }, 0);
        const v = document.createElement("div");
        v.classList.add("fdcm--header");
        const L = document.createElement("div");
        L.classList.add("fdcm--title"), L.innerHTML = t || "Cookie Settings";
        const w = document.createElement("button");
        w.classList.add("fdcm--icon-close"), w.onclick = () => {
            a.className = "fdcm--overlay -leave", d.className = "fdcm--setting-container -leave", setTimeout(() => {
                document.body.removeChild(o)
            }, 300)
        }, v.appendChild(L), v.appendChild(w), d.appendChild(v);
        const z = document.createElement("div");
        z.className = "fdcm--title", z.innerHTML = f || "Subtitle";
        const M = document.createElement("div");
        if (M.className = "fdcm--description", M.innerHTML = e || "We use cookies to improve your experience on our site. Please review and accept cookies.", r) {
            const b = document.createElement("a");
            b.href = r, b.innerHTML = "Privacy Policy", b.target = "_blank", M.appendChild(b)
        }
        const B = document.createElement("div");
        B.className = "fdcm--body";
        const E = document.createElement("div");
        E.className = "fdcm--body-scroll";
        const A = document.createElement("div");
        A.className = "fdcm--settings";
        const k = Object.entries(this.settings);
        for (const [b, R] of k) {
            const y = document.createElement("div");
            y.classList.add("fdcm--settings-item"), R.readOnly && y.classList.add("-readonly");
            const T = document.createElement("div");
            T.classList.add("fdcm--item-head"), T.addEventListener("click", () => {
                y.classList.toggle("-opened")
            });
            const F = document.createElement("label");
            F.classList.add("fdcm--label-wrap");
            const G = document.createElement("div");
            G.classList.add("fdcm--toggle-container");
            const te = document.createElement("div");
            te.classList.add("fdcm--toggle");
            const j = document.createElement("span");
            j.innerHTML = b, j.classList.add("fdcm--toggle-label"), j.classList.add("fdcm--subtitle");
            const u = document.createElement("input");
            u.type = "checkbox", u.checked = R.value, u.setAttribute("data-key", b), u.readOnly = R.readOnly, u.onchange = re => {
                re.target.checked ? R.accept() : R.deny(), this.onSettingsChangeEvents.forEach(de => {
                    de()
                })
            };
            const S = document.createElement("div");
            S.classList.add("fdcm--item-conent");
            const J = document.createElement("p");
            J.innerHTML = R.description, G.appendChild(u), G.appendChild(te), F.appendChild(G), F.appendChild(j), T.appendChild(F);
            const q = document.createElement("div");
            q.classList.add("fdcm--icon-dropdown"), T.appendChild(q), y.appendChild(T), A.appendChild(y), S.appendChild(J), y.appendChild(S)
        }
        const p = document.createElement("div");
        if (p.className = "fdcm--contact", p.innerHTML = (l == null ? void 0 : l.description) || "For any queries in relation to our policy on cookies and your choices, please ", c) {
            const b = document.createElement("a");
            b.href = `mailto:${c}`, b.innerHTML = "contact us", b.className = "fdcm--link -secondary", p.appendChild(b)
        }
        E.appendChild(z), E.appendChild(M), E.appendChild(A), E.appendChild(p), B.appendChild(E), d.appendChild(B);
        const x = document.createElement("div");
        x.className = "fdcm--actions";
        const V = document.createElement("button");
        V.innerHTML = "Accept all", V.className = "accept-all fdcm--button -primary", V.onclick = () => {
            this.acceptAll(), P.getElementById("cookie-consent-container") != null && (P.getElementById("cookie-consent-container").classList.add("-leave"), setTimeout(() => {
                document.body.removeChild(P.getElementById("cookie-consent-container"))
            }, 300)), o != null && (a.className = "fdcm--overlay -leave", d.className = "fdcm--setting-container -leave", setTimeout(() => {
                document.body.removeChild(o)
            }, 300))
        };
        const H = document.createElement("button");
        H.innerHTML = "Reject all", H.className = "regect-all fdcm--button -secondary", H.onclick = () => {
            this.deny(), a.className = "fdcm--overlay -leave", d.className = "fdcm--setting-container -leave", P.getElementById("cookie-consent-container").classList.add("-leave"), setTimeout(() => {
                document.body.removeChild(P.getElementById("cookie-consent-container")), document.body.removeChild(o)
            }, 300)
        };
        const X = document.createElement("button");
        X.innerHTML = "Save settings", X.className = "save-settings fdcm--button -secondary", X.onclick = () => {
            const b = Object.keys(this.settings).filter(y => {
                    const T = A.querySelector(`input[type="checkbox"][data-key="${y}"]`);
                    return T && T.checked
                }),
                R = Object.keys(this.settings).filter(y => {
                    const T = A.querySelector(`input[type="checkbox"][data-key="${y}"]`);
                    return T && !T.checked
                });
            this.onSaveSettingsEvents.forEach(y => {
                y({
                    enabled: b,
                    disabled: R
                })
            }), P.getElementById("cookie-consent-container") != null && (P.getElementById("cookie-consent-container").classList.add("-leave"), setTimeout(() => {
                document.body.removeChild(P.getElementById("cookie-consent-container"))
            }, 300)), a.className = "fdcm--overlay -leave", d.className = "fdcm--setting-container -leave", setTimeout(() => {
                document.body.removeChild(o)
            }, 300)
        }, x.appendChild(V), x.appendChild(H), x.appendChild(X), d.appendChild(x), o.appendChild(a), o.appendChild(d), document.body.appendChild(o)
    }
    show(n, t) {
        const e = document.createElement("div");
        e.id = "cookie-consent-container", e.className = "fdcm--container fdcm--setup -light-theme";
        const r = document.createElement("div");
        r.classList.add("fdcm--title"), r.innerHTML = n || "Cookie Consent", e.appendChild(r);
        const f = document.createElement("div");
        f.className = "fdcm--description", f.innerHTML = t || "We use cookies to improve your experience on our site. ";
        const c = document.createElement("button");
        c.id = "fdcm--open-advanced", c.className = "fdcm--link", c.innerHTML = "Customize Settings", c.onclick = () => {
            this.onOpenSettingsEvents.forEach(d => {
                d()
            })
        }, f.appendChild(c), e.appendChild(f);
        const l = document.createElement("div");
        l.className = "fdcm--actions";
        const o = document.createElement("button");
        o.innerHTML = "Accept all", o.className = "accept-all fdcm--button -primary", o.onclick = () => {
            this.acceptAll(), e.className = "fdcm--container fdcm--setup -light-theme -leave", setTimeout(() => {
                document.body.removeChild(e)
            }, 300)
        };
        const a = document.createElement("button");
        a.innerHTML = "Reject all", a.className = "reject-all fdcm--button -secondary", a.onclick = () => {
            this.deny(), e.className = "fdcm--container fdcm--setup -light-theme -leave", setTimeout(() => {
                document.body.removeChild(e)
            }, 300)
        }, l.appendChild(o), l.appendChild(a), e.appendChild(l), document.body.appendChild(e)
    }
};
N(W, "instance");
let me = W;
const Ft = {
        key: 0,
        class: "cursor -mm",
        "string-cursor": ""
    },
    nn = Y({
        __name: "default",
        setup(m) {
            const t = Q().$globalClass;
            var e = null;
            const r = h(!1),
                f = ae();
            Ne(() => f.path, () => {
                t.emit("page-change")
            }), t.on("container-minimize", u => {
                r.value = u, e && (r.value ? (e.scrollMobileMode = "disable", e.scrollDesktopMode = "disable") : (e.scrollMobileMode = "default", e.scrollDesktopMode = "smooth", setTimeout(() => {
                    e.canRebuild = !0, e.scrollMobileMode = "default", e.scrollDesktopMode = "smooth", e == null || e.onResize(!0)
                }, 1200)))
            });
            const c = h(),
                l = h(!1);
            let o = h(!1);
            const a = h(!1),
                d = h(!0);
            var v, L, w;
            const z = () => {
                    r.value && (t.emit("container-minimize", !1), t.emit("header-back"), t.emit("katana:mouse:strength", {
                        instanceId: "hero-sword",
                        translation: {
                            x: -8,
                            y: 8,
                            z: 0
                        },
                        rotation: {
                            x: .5,
                            y: -.25,
                            z: .025
                        }
                    }), setTimeout(() => {
                        I.getInstance().canRebuild = !0, I.getInstance().onResize(!0)
                    }, 1200))
                },
                M = h(!1),
                B = h(!1),
                E = h(!1),
                A = h(!1),
                k = h(!1),
                p = h(!0),
                x = () => {
                    M.value = !0, y()
                },
                V = () => {
                    B.value = !0, y()
                },
                H = u => {
                    p.value && u.katanaId == "hero-sword" && (E.value = !0, A.value = !1, y())
                },
                X = u => {
                    p.value && u.katanaId == "hero-sword" && (E.value = !0, A.value = !0, y())
                },
                b = u => {
                    p.value && u.katanaId == "hero-sword" && (E.value = !1, A.value = !1, y())
                },
                R = () => {
                    k.value && (e.scrollDesktopMode = "smooth", e.scrollMobileMode = "default", d.value = !1, t.emit("page-start"), clearTimeout(w), w = setTimeout(() => {
                        p.value = !1
                    }, 900))
                },
                y = () => {
                    const u = E.value ? A.value : !0;
                    (p.value ? M.value && B.value : !0) && u && (R(), I.getInstance().scrollPosition = 0, v.classList.add("-ready"))
                };
            t.on("katana:mount", H), t.on("katana:ready", X), t.on("katana:unmount", b);
            const {
                initialize: T,
                disableAnalytics: F,
                enableAnalytics: G
            } = Wt(), te = () => {
                let u = nt.getInstance();
                const S = me.getInstance();
                S.use("Google Analytics", {
                    accept: () => {
                        u.local.set("gaAccept", "1")
                    },
                    deny: () => {
                        u.local.set("gaAccept", "0")
                    },
                    value: !0,
                    description: "Google Analytics cookies are used to collect information about how visitors interact with our website. These cookies track data such as the number of visitors, the pages they visit, and the sources that referred them to our site. The data gathered is aggregated and anonymized, helping us understand website usage patterns and improve user experience. These cookies do not identify individual users and all information is used for statistical analysis only."
                }), u.local.has("cookies-accept") == !1 && S.show("Cookies", "This website collects cookies to deliver better user experience and analyze our website traffic and performance; we never collect any personal data."), (localStorage.getItem("cookieConsent") == "acceptAll" || localStorage.getItem("cookieConsent") == "accept") && u.local.get("gaAccept") == "1" && (T("G-DXCJDBJ3DX"), G("G-DXCJDBJ3DX")), S.on("openSettings", () => {
                    S.showSettings({
                        title: "Cookies settings",
                        subtitle: "Cookies",
                        description: "This website collects cookies to deliver better user experience and analyze our website traffic and performance; we never collect any personal data.",
                        email: "hello@fiddle.digital"
                    })
                }), S.on("acceptAll", () => {
                    u.local.set("gaAccept", "1"), u.local.set("cookies-accept", "true"), T("G-DXCJDBJ3DX"), G("G-DXCJDBJ3DX")
                }), S.on("deny", () => {
                    u.local.set("cookies-accept", "true"), F("G-DXCJDBJ3DX")
                }), S.on("accept", () => {
                    u.local.set("cookies-accept", "true"), u.local.get("gaAccept") == "1" && (T("G-DXCJDBJ3DX"), G("G-DXCJDBJ3DX"))
                }), S.on("saveSettings", () => {
                    u.local.set("cookies-accept", "true"), u.local.get("gaAccept") == "1" && (T("G-DXCJDBJ3DX"), G("G-DXCJDBJ3DX"))
                })
            }, j = h(0);
            return Z(() => {
                te(), a.value = !0, oe(() => {
                    e = I.getInstance(), e.scrollDesktopMode = "smooth", e.scrollContainer = c.value, e.setupSettings({
                        "cursor-lerp": .75
                    }), e.use(Re), e.use(Je), e.use(Ve), e.use(Xe, {}), e.use(Ge), e.use(Pe), e.use(Oe), e.use(We), e.use(Fe), e.use(je), e.use(qe), e.use(Ue), e.use(Ke, {
                        lerp: .25
                    }), e.use(Ye), e.use(Ze, {
                        lerp: .75
                    }), e.use(Qe), e.use(et, {
                        settings: {
                            mobile: {
                                min: 0,
                                max: 1024,
                                enable: !0
                            },
                            desktop: {
                                min: 1025,
                                max: void 0,
                                enable: !0
                            }
                        }
                    }), e.on("screen:mobile", J => {
                        o.value = J
                    }), e.start(60), e.on("fps", J => {
                        j.value = J
                    })
                }), v = document.documentElement, v.classList.add("-loaded"), setTimeout(() => {
                    l.value = !0
                }, 2100), t.on("twa-close", () => {
                    l.value = !1
                }), t.on("page-change", () => {
                    d.value = !0, E.value = !1, A.value = !1, v = document.documentElement, v.classList.contains("-ready") && v.classList.remove("-ready"), e.scrollDesktopMode = "disable", e.scrollMobileMode = "disable", clearTimeout(L), L = setTimeout(() => {
                        e.onResize(!0), y()
                    }, 1200)
                }), setTimeout(() => {
                    k.value = !0, e.onResize(!0), y()
                }, 1200);
                let u = document.documentElement.clientHeight * .01,
                    S = document.documentElement.clientWidth * .01;
                document.documentElement.style.setProperty("--vh", `${u}px`), document.documentElement.style.setProperty("--vw", `${S}px`), window.innerWidth > 1024 && window.addEventListener("resize", () => {
                    let J = document.documentElement.clientHeight * .01,
                        q = document.documentElement.clientWidth * .01;
                    document.documentElement.style.setProperty("--vh", `${J}px`), document.documentElement.style.setProperty("--vw", `${q}px`)
                })
            }), ce(() => {
                e = I.getInstance(), e.destroy(), t.off("katana:mount", H), t.off("katana:ready", X), t.off("katana:unmount", b)
            }), (u, S) => {
                const J = xe,
                    q = He,
                    re = ut,
                    de = ft,
                    Ce = Nt,
                    we = ye,
                    U = le,
                    Ee = Gt;
                return _(), $(ze, null, [i(J), g("div", {
                    ref_key: "container",
                    ref: c,
                    id: "scroll-container",
                    class: ue(["scroll-container", [{
                        "-min": s(r)
                    }]]),
                    onClick: z
                }, [i(q)], 2), i(re, {
                    string: "scroller"
                }), i(de), i(se, {
                    name: "-t-info",
                    duration: {
                        enter: 1200,
                        leave: 1200
                    }
                }, {
                    default: D(() => [s(r) ? (_(), O(Ce, {
                        key: 0
                    })) : C("", !0)]),
                    _: 1
                }), i(se, {
                    name: "-t-transition",
                    duration: {
                        enter: 0,
                        leave: 900
                    }
                }, {
                    default: D(() => [s(d) ? (_(), $("div", {
                        key: 0,
                        class: ue(["page-overlay", {
                            "-mounted": s(a)
                        }])
                    }, [s(p) ? (_(), O(we, {
                        key: 0,
                        src: "/videos/slash.mp4",
                        active: "",
                        onLoaded: x,
                        onEnded: V,
                        "play-once": !0
                    })) : C("", !0), s(a) && s(p) ? (_(), O(U, {
                        key: 1,
                        src: "logo-string"
                    })) : C("", !0)], 2)) : C("", !0)]),
                    _: 1
                }), s(o) ? C("", !0) : (_(), $("div", Ft, [i(U, {
                    src: "icon-24_blank",
                    class: "c-newtab"
                }), i(U, {
                    src: "icon-24_spread",
                    class: "c-modal"
                }), i(U, {
                    src: "icon-24_enter",
                    class: "c-route"
                }), i(U, {
                    src: "icon-24_download",
                    class: "c-download"
                }), i(U, {
                    src: "icon-24_soon",
                    class: "c-soon"
                })])), i(se, {
                    name: "-t-twa"
                }, {
                    default: D(() => [s(l) ? (_(), O(Ee, {
                        key: 0
                    })) : C("", !0)]),
                    _: 1
                })], 64)
            }
        }
    });
export {
    nn as
    default
};