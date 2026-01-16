import {
    _ as ze
} from "./BaseImage.d75aef71.js";
import {
    f as ye,
    L as He,
    r as E,
    g as $e,
    n as re,
    h as Se,
    o as m,
    c as v,
    a as x,
    A as ee,
    k as ue,
    _ as Ce,
    x as Pe,
    q as ce,
    b as T,
    w as z,
    t as O,
    l as H,
    T as he,
    z as xe,
    F as V,
    i as W,
    y as Ie,
    M as Te,
    B as ke,
    m as De,
    d as de,
    j as Be,
    p as Ue,
    e as Ve
} from "./entry.c7ee8776.js";
import {
    $ as M
} from "./index.4ae1b6b5.js";
import {
    a as qe,
    u as Ye,
    b as Ke
} from "./MainFooter.958925f3.js";
import {
    b as Oe
} from "./GridRow.c8ff0ce9.js";
import {
    _ as Ae
} from "./nuxt-link.ca149e20.js";
import {
    S as We
} from "./database.feaaf565.js";
import {
    S as Ee
} from "./string-storage.34efabf1.js";
import {
    u as je
} from "./index.3e29bb70.js";
import "./CurrentYear.vue.8dfa6fe6.js";
const Ge = ["d"],
    Xe = 1e-4,
    Je = 1,
    Qe = .18,
    Ze = ye({
        __name: "StringImpulseMirror",
        props: {
            id: {},
            thickness: {},
            sensitivity: {},
            maxBend: {},
            kEdge: {},
            kMid: {},
            aspectRatio: {},
            heightFallbackPx: {}
        },
        setup(P) {
            const $ = P;
            He(c => ({
                "355b2c85": ue(te)
            }));
            const j = $.id,
                te = $.thickness ? ? 1,
                q = $.sensitivity ? ? 1.1,
                G = $.maxBend ? ? .45,
                X = $.kEdge ? ? .6,
                F = $.kMid ? ? .9,
                J = $.aspectRatio ? ? "8 / 1",
                L = $.heightFallbackPx ? ? 80,
                me = `${L}px`,
                b = E(null);
            let B = 0,
                ne = 0,
                g = 0,
                Y = Number.NaN,
                D = 0,
                f = null;
            const se = E("M 0 0.5 L 1 0.5");

            function pe(c) {
                const I = c.match(/^\s*([0-9.]+)\s*\/\s*([0-9.]+)\s*$/);
                if (!I) return null;
                const d = parseFloat(I[1]),
                    _ = parseFloat(I[2]);
                return d > 0 && _ > 0 ? d / _ : null
            }
            const oe = pe(J) ? ? 8 / 1;

            function fe(c) {
                const I = .5 + c,
                    d = .5 + c * X,
                    _ = .5 + c * F,
                    N = (g * 2 - 1) * Je,
                    e = .5 + Math.max(-1, Math.min(1, N)) * Qe,
                    t = -.28,
                    s = -.22,
                    o = e + t,
                    a = e + s,
                    h = e - s,
                    n = e - t,
                    u = r => Math.round(r * 1e3) / 1e3;
                return `M 0 0.5 C ${u(o)} ${u(d)} ${u(a)} ${u(_)} ${u(e)} ${u(I)} C ${u(h)} ${u(_)} ${u(n)} ${u(d)} 1 0.5`
            }

            function _e() {
                const c = Math.max(-G, Math.min(G, ne));
                Number.isFinite(B) && (!Number.isFinite(Y) || Math.abs(c - Y) > Xe) && (Y = c, se.value = fe(Y))
            }

            function K() {
                D || (D = requestAnimationFrame(() => {
                    D = 0, _e()
                }))
            }

            function ve() {
                const c = b.value,
                    I = c.getBoundingClientRect();
                let d = I.height;
                if (!d) {
                    const _ = I.width || c.clientWidth;
                    _ && (d = _ / oe)
                }
                return d || L
            }

            function A() {
                const c = Math.max(1, ve());
                B = q / c
            }
            async function ae() {
                await new Promise(c => requestAnimationFrame(() => requestAnimationFrame(c)))
            }
            var R = null;
            const U = `object:impulse:${j}`,
                C = c => {
                    ne = c.y * B, K()
                },
                Q = c => {
                    g = c.value || 0, K()
                };
            return $e(async () => {
                await re(), await ae(), A(), window.ResizeObserver && (f = new ResizeObserver(c => {
                    const I = c[0];
                    let d = 0;
                    const _ = I.contentBoxSize;
                    if (_) {
                        const k = Array.isArray(_) ? _[0] : _;
                        d = k && k.blockSize ? k.blockSize : 0
                    }
                    if (!d) {
                        const k = I.contentRect;
                        d = k.height || (k.width ? k.width / oe : 0)
                    }!d && b.value && (d = b.value.clientHeight || 0), d || (d = L);
                    const N = q / Math.max(1, d);
                    Math.abs(N - B) > 1e-6 && (B = N, K())
                }), b.value && f.observe(b.value)), R = M.getInstance(), R.on(U + ":move", C), R.on(U + ":side", Q), K(), setTimeout(() => R.onResize(!0), 32)
            }), Se(() => {
                R.off(U + ":move", C), f && b.value && f.unobserve(b.value), f = null, D && cancelAnimationFrame(D)
            }), (c, I) => (m(), v("svg", {
                viewBox: "0 0 1 1",
                preserveAspectRatio: "none",
                class: "string-svg",
                style: ee({
                    "--room": me
                }),
                ref_key: "svgEl",
                ref: b
            }, [x("path", {
                class: "string",
                d: se.value,
                "vector-effect": "non-scaling-stroke"
            }, null, 8, Ge)], 4))
        }
    });
const et = Ce(Ze, [
        ["__scopeId", "data-v-4ea9058c"]
    ]),
    Me = P => (Ue("data-v-f11f6923"), P = P(), Ve(), P),
    tt = {
        class: "c-welcome",
        string: "",
        "string-id": "skills-welcome"
    },
    nt = {
        class: "v -mm -up"
    },
    st = Me(() => x("span", null, "Skill", -1)),
    ot = Me(() => x("span", null, [de("Hub"), x("span", {
        class: "-m"
    }, [de("Downloads"), x("br"), de("Available")])], -1)),
    at = [st, ot],
    it = Me(() => x("div", {
        class: "impulse-trigger-wrapper"
    }, [x("div", {
        string: "impulse",
        "string-position-strength": "2.225",
        "string-position-tension": "0.8175",
        "string-position-friction": "0.0735",
        "string-continuous-push": "true",
        "string-id": "skills-string-impulse"
    })], -1)),
    lt = {
        id: "mainList",
        class: "main-list"
    },
    ct = ["data-key", "data-name", "id"],
    rt = {
        class: "stick-wrap"
    },
    ut = {
        class: "category-list -list -mm -up"
    },
    dt = ["onClick"],
    mt = {
        class: "skills-list -list -mm -up"
    },
    pt = ["data-label", "onClick"],
    ft = {
        class: "modules -mm -up"
    },
    _t = ["onMouseenter", "onMouseleave"],
    vt = "@fiddle-digital/string-tune",
    we = 0,
    gt = ye({
        __name: "SkillsWelcome",
        async setup(P) {
            let $, j;
            async function te(e) {
                var o;
                const {
                    data: t,
                    error: s
                } = await Ye(`https://registry.npmjs.org/${e}/latest`, "$0CACaC3k65");
                return s.value ? (console.error("Failed to fetch latest version:", s.value), null) : (o = t.value) == null ? void 0 : o.version
            }
            const q = ([$, j] = Pe(() => te(vt)), $ = await $, j(), $),
                X = Be().$globalClass,
                F = E(!1),
                J = E(null),
                L = E(null);

            function me(e, t) {
                J.value = e, L.value = t ? ? null
            }

            function b(e) {
                J.value = null, L.value = null
            }
            const B = e => {
                    const t = document.querySelector(`[data-name="${e.name}"]`);
                    if (!t) return;
                    const s = M.getInstance();
                    let o = 0,
                        a = t;
                    for (; a;) o += a.offsetTop, a = a.offsetParent;
                    const n = o + t.offsetHeight / 2 - window.innerHeight / 2;
                    s.scrollTo(Math.max(0, n))
                },
                ne = e => {
                    e.direction == "enter-top" && X.emit("reservation", !0), e.direction == "exit-top" && X.emit("reservation", !1)
                },
                g = E("none"),
                Y = (e, t = 0) => {
                    const s = e.getBoundingClientRect(),
                        o = window.pageYOffset || document.documentElement.scrollTop || 0,
                        a = s.top + o + s.height / 2 - window.innerHeight / 2 + t;
                    return Math.max(0, Math.round(a))
                },
                D = () => {
                    g.value = g.value === "list" ? "grid" : "list", Ee.getInstance().local.set("shList", g.value === "list" ? "1" : "0"), re(() => {
                        const t = g.value === "list" ? document.getElementById("mainList") : document.getElementById("catalogue");
                        if (t && Y(t), window.innerWidth > 1024) M.getInstance().scrollTo(0), setTimeout(() => {
                            M.getInstance().scrollTo(0)
                        }, 100);
                        else {
                            const s = document.getElementById("scroll-container");
                            if (!s) return;
                            const o = 0;
                            s.scrollTo({
                                top: o,
                                behavior: "smooth"
                            })
                        }
                        setTimeout(() => {
                            M.getInstance().canRebuild = !0, M.getInstance().onResize(!0)
                        }, 1600), U(), Q(), _()
                    })
                },
                f = E([]),
                se = [1, 5, 9],
                pe = (e, t) => 1,
                oe = (e, t, s) => 1,
                fe = ce(() => {
                    const e = [];
                    return f.value.forEach((t, s) => {
                        e.push({
                            kind: "cat",
                            catIndex: s,
                            name: t.name,
                            rowSpan: pe()
                        }), t.items.forEach((o, a) => {
                            e.push({
                                url: o.url,
                                kind: "item",
                                catIndex: s,
                                itemIndex: a,
                                name: o.name,
                                rowSpan: oe()
                            })
                        })
                    }), e
                }),
                _e = e => String(e + 1).padStart(2, "0"),
                K = ce(() => {
                    const e = fe.value,
                        t = e.length;
                    if (t === 0) return [];
                    let s = [0, 0, 0];
                    if (t === 1) s = [1, 0, 0];
                    else if (t === 2) s = [1, 1, 0];
                    else if (t === 3) s = [1, 1, 1];
                    else {
                        const i = Math.ceil((t + 1) / 3);
                        let l = i,
                            S = i,
                            w = t - l - S;
                        w < 0 ? (l = Math.ceil(t / 2), S = t - l, w = 0) : w >= l && (l = Math.ceil(t / 3) + 1, S = l, w = t - l - S, w < 0 && (l = Math.ceil(t / 2), S = l, w = t - l - S, w < 0 && (w = 0))), s = [l, S, Math.max(0, w)]
                    }
                    const o = s[0] + s[1] + s[2];
                    o !== t && (s[2] += t - o);
                    const a = [];
                    let h = 0;
                    for (let i = 0; i < 3; i++) {
                        let l = Math.min(h + s[i], t);
                        if (i < 2 && l < t && l - 1 >= h) {
                            const S = e[l - 1],
                                w = e[l];
                            S && w && S.kind === "cat" && w.kind === "item" && w.catIndex === S.catIndex && (l = Math.min(l + 1, t))
                        }
                        l < h && (l = h), a.push([h, l]), h = l
                    }
                    const n = [we, we, we],
                        u = [1, 1, 1],
                        r = [!1, !1, !1],
                        p = [];
                    for (let i = 0; i < 3; i++) {
                        const [l, S] = a[i], w = Math.max(0, Math.min(l, t)), be = Math.max(0, Math.min(S, t)), ie = se[i];
                        for (let Z = w; Z < be; Z++) {
                            const y = e[Z];
                            if (!y) continue;
                            const le = n[i],
                                Re = u[i];
                            if (y.kind === "cat") {
                                p.push({
                                    kind: "cat",
                                    key: `c-${y.catIndex}-@${ie}-${le}`,
                                    catIndex: y.catIndex,
                                    left: ie,
                                    top: le,
                                    order: Re,
                                    name: y.name,
                                    className: `c c-${y.catIndex+1}`
                                });
                                const ge = Z + 1 < be ? e[Z + 1] : null;
                                ge && ge.kind === "item" && ge.catIndex === y.catIndex || (n[i] += 1), u[i] += 1;
                                continue
                            }
                            const Ne = !r[i];
                            p.push({
                                url: y.url,
                                kind: "item",
                                key: `i-${y.catIndex}-${y.itemIndex}-@${ie}-${le}`,
                                catIndex: y.catIndex,
                                itemIndex: y.itemIndex,
                                left: ie,
                                top: le,
                                order: Re,
                                label: _e(y.itemIndex),
                                name: y.name,
                                className: `i c-${y.catIndex+1}${Ne?" -i-top-1":""}`
                            }), r[i] = !0, n[i] += 1, u[i] += 1
                        }
                    }
                    return p
                }),
                ve = ce(() => f.value.map((e, t) => ({
                    cat: e,
                    top: t + 1
                }))),
                A = new Map,
                ae = E({}),
                R = E(null);

            function U() {
                A.clear();
                const e = document.getElementById("mainList");
                if (!e) return;
                e.querySelectorAll(".i[data-key]").forEach(s => {
                    const o = s.dataset.key;
                    o && A.set(o, s)
                })
            }
            let C = null;

            function Q() {
                if (C) {
                    for (const [, e] of A) C.unobserve(e);
                    for (const [, e] of A) C.observe(e)
                }
            }
            let c = !1,
                I = 0;
            const d = () => window.innerHeight / 2;

            function _() {
                const e = d();
                for (const [s, o] of A) {
                    const a = o.getBoundingClientRect();
                    if (a.top <= e && a.bottom >= e) {
                        R.value = s;
                        return
                    }
                }
                let t = null;
                for (const [s, o] of A) {
                    const a = o.getBoundingClientRect(),
                        h = (a.top + a.bottom) / 2,
                        n = Math.abs(h - e);
                    (!t || n < t.dist) && (t = {
                        key: s,
                        dist: n
                    })
                }
                R.value = (t == null ? void 0 : t.key) ? ? null
            }

            function N() {
                c || (c = !0, I = requestAnimationFrame(() => {
                    c = !1, _()
                }))
            }
            const k = ce(() => {
                if (!R.value) return null;
                const e = R.value.match(/^m-(\d+)-(\d+)$/);
                if (!e) return null;
                const t = Number(e[1]),
                    s = Number(e[2]),
                    o = f.value[t],
                    a = o == null ? void 0 : o.items[s];
                return !o || !a ? null : {
                    catIndex: t,
                    modules: o.items[s].modules,
                    modulesShow: o.items[s].modulesShow,
                    itemIndex: s,
                    category: o.name,
                    name: a.name,
                    url: a.url == "" ? "" : `/tutorials/${encodeURIComponent(o.name.toLowerCase().replaceAll(" ","-"))}/${encodeURIComponent(a.name.toLowerCase().replaceAll(" ","-"))}`
                }
            });
            return $e(() => {
                let e = Ee.getInstance();
                e.local.get("shList") == "1" || e.local.get("shList") == null || e.local.get("shList") == "" ? g.value = "list" : g.value = "grid", setTimeout(() => {
                    M.getInstance().canRebuild = !0, M.getInstance().onResize(!0)
                }, 1800);
                const t = new We;
                f.value = t.toPresentation(), M.getInstance().on("object:inview:skills-welcome", ne), re(() => {
                    M.getInstance().on("screen:mobile", o => {
                        F.value = o
                    })
                }), C = new IntersectionObserver(s => {
                    const o = { ...ae.value
                    };
                    for (const a of s) {
                        const h = a.target.dataset.key;
                        h && (o[h] = a.isIntersecting)
                    }
                    ae.value = o, _()
                }, {
                    root: null,
                    threshold: .25,
                    rootMargin: "8% 0px 8% 0px"
                }), re(() => {
                    U(), Q(), _()
                }), M.getInstance().on("scroll", N), window.addEventListener("resize", () => {
                    U(), Q(), N()
                }, {
                    passive: !0
                })
            }), Se(() => {
                if (setTimeout(() => {
                        X.emit("reservation", !1)
                    }, 900), C) {
                    for (const [, e] of A) C.unobserve(e);
                    C.disconnect(), C = null
                }
                cancelAnimationFrame(I), window.removeEventListener("resize", N)
            }), (e, t) => {
                const s = ze,
                    o = et,
                    a = qe,
                    h = Oe;
                return m(), v("section", tt, [T(h, {
                    class: H({
                        "-def": g.value === "list"
                    })
                }, {
                    default: z(() => [x("span", nt, "v_ " + O(ue(q)), 1), x("h1", {
                        class: H(["-h2 -m-h3", {
                            "-static": g.value === "grid"
                        }])
                    }, at, 2), x("span", {
                        class: H(["view -m", {
                            "-static": g.value === "grid"
                        }]),
                        onClick: D
                    }, "Change view", 2), it, T(he, {
                        name: "-t-list",
                        duration: {
                            enter: 1500,
                            leave: 1500
                        }
                    }, {
                        default: z(() => [xe(x("div", lt, [(m(!0), v(V, null, W(ve.value, ({
                            cat: n,
                            top: u
                        }, r) => (m(), v("div", {
                            class: "category-wrap",
                            key: `cat-${r}`,
                            style: ee({
                                "--top": u
                            }),
                            string: "",
                            "string-repeat": "",
                            "string-offset-top": "-50%",
                            "string-offset-bottom": "-50%"
                        }, [(m(!0), v(V, null, W(n.items, (p, i) => {
                            var l;
                            return m(), v("div", {
                                class: "i",
                                style: ee({
                                    "--delay-backwards": n.items.length - i,
                                    "--delay-forwards": i
                                }),
                                key: `item-${r}-${i}`,
                                "data-key": `m-${r}-${i}`,
                                "data-name": p.name,
                                id: `m-${r}-${i}`,
                                string: "progress|lerp"
                            }, [(m(), Ie(Te(p.url == "" ? "div" : ue(Ae)), {
                                class: H(["-nl", [{
                                    "-pointed": p.name == ((l = k.value) == null ? void 0 : l.name)
                                }]]),
                                to: `/skill-hub/${encodeURIComponent(n.url.toLowerCase())}/${encodeURIComponent(p.url.toLowerCase())}`,
                                string: "cursor",
                                "string-cursor-class": p.url == "" ? "cursor-soon" : "cursor-route"
                            }, {
                                default: z(() => [T(s, {
                                    src: p.videoUrl == "" ? "/videos/tutorials/none.mp4" : p.videoUrl
                                }, null, 8, ["src"])]),
                                _: 2
                            }, 1032, ["to", "string-cursor-class", "class"]))], 12, ct)
                        }), 128))], 4))), 128))], 512), [
                            [ke, g.value == "list"]
                        ])]),
                        _: 1
                    }), T(he, {
                        name: "-t-list",
                        duration: {
                            enter: 1500,
                            leave: 1500
                        }
                    }, {
                        default: z(() => [xe(x("div", rt, [T(a, {
                            cols: "14",
                            mcols: "6"
                        }, {
                            default: z(() => {
                                var n, u;
                                return [T(o, {
                                    id: "skills-string-impulse",
                                    sensitivity: .5,
                                    maxBend: .5,
                                    kEdge: .4,
                                    kMid: 1,
                                    heightFallbackPx: 80
                                }), x("nav", ut, [(m(!0), v(V, null, W(f.value, r => {
                                    var p;
                                    return m(), v("span", {
                                        class: H([{
                                            "-active": ((p = k.value) == null ? void 0 : p.category) === r.name
                                        }]),
                                        onClick: i => B(r.items[0])
                                    }, O(r.name), 11, dt)
                                }), 256))]), x("nav", mt, [(m(!0), v(V, null, W((n = f.value.filter(r => {
                                    var p;
                                    return r.name === ((p = k.value) == null ? void 0 : p.category)
                                })[0]) == null ? void 0 : n.items, (r, p) => {
                                    var i, l;
                                    return m(), v("span", {
                                        class: H({
                                            "-active": r.name == ((i = k.value) == null ? void 0 : i.name)
                                        }),
                                        "data-label": "0" + (p + 1) + ".",
                                        onClick: S => B(r)
                                    }, O(`${r==null?void 0:r.name} ${r.name==((l=k.value)==null?void 0:l.name)?" /":""}`), 11, pt)
                                }), 256))]), x("div", ft, [(m(!0), v(V, null, W((u = k.value) == null ? void 0 : u.modulesShow, r => (m(), v("span", null, O(r.name), 1))), 256))])]
                            }),
                            _: 1
                        })], 512), [
                            [ke, g.value === "list"]
                        ])]),
                        _: 1
                    }), T(he, {
                        name: "-t-catalogue",
                        duration: {
                            enter: 1500,
                            leave: 1500
                        }
                    }, {
                        default: z(() => [xe(T(a, {
                            id: "catalogue",
                            cols: "14",
                            mcols: "6",
                            class: "catalogue -mm -up"
                        }, {
                            default: z(() => [(m(!0), v(V, null, W(K.value, (n, u) => (m(), v(V, {
                                key: n.key
                            }, [n.kind === "cat" ? (m(), v("div", {
                                key: 0,
                                class: H([{
                                    "-focus": L.value == n.catIndex
                                }, n.className]),
                                style: ee({
                                    "--top": F.value ? u : n.top,
                                    "--left": F.value ? 1 : n.left,
                                    "--order": String(n.order).padStart(2, "0")
                                })
                            }, [x("span", null, O(n.name), 1)], 6)) : (m(), v("div", {
                                key: 1,
                                class: H([{
                                    "-focus": L.value == n.catIndex
                                }, n.className]),
                                style: ee({
                                    "--top": F.value ? u - 1 : n.top,
                                    "--left": F.value ? 1 : n.left,
                                    "--order": n.order
                                }),
                                onMouseenter: r => me(n.key, n.catIndex),
                                onMouseleave: r => b(n.key)
                            }, [!F.value && g.value == "grid" ? (m(), Ie(s, {
                                key: 0,
                                src: f.value[n.catIndex].items[n.itemIndex].videoUrl == "" ? "/videos/tutorials/none.mp4" : f.value[n.catIndex].items[n.itemIndex].videoUrl,
                                lazy: !0,
                                active: J.value === n.key
                            }, null, 8, ["src", "active"])) : De("", !0), (m(), Ie(Te(f.value[n.catIndex].items[n.itemIndex].url == "" ? "span" : ue(Ae)), {
                                class: "-nl",
                                to: `/skill-hub/${encodeURIComponent(f.value[n.catIndex].url.toLowerCase())}/${encodeURIComponent(f.value[n.catIndex].items[n.itemIndex].url.toLowerCase())}`,
                                "data-label": n.label
                            }, {
                                default: z(() => [de(O(f.value[n.catIndex].items[n.itemIndex].name), 1)]),
                                _: 2
                            }, 1032, ["to", "data-label"]))], 46, _t))], 64))), 128))]),
                            _: 1
                        }, 512), [
                            [ke, g.value == "grid"]
                        ])]),
                        _: 1
                    })]),
                    _: 1
                }, 8, ["class"])])
            }
        }
    });
const ht = Ce(gt, [
        ["__scopeId", "data-v-f11f6923"]
    ]),
    xt = {
        class: "page skills-page"
    },
    Fe = "StringTune : Skill Hub",
    Le = "StringTune is a cutting-edge JavaScript library designed to deliver high-performance, modular web effects. Whether you're looking to add smooth parallax scrolling, dynamic cursor interactions, progress tracking, or autoplay videos, StringTune empowers developers with a powerful, attribute-driven approach. It simplifies the creation of visually captivating websites while remaining intuitive for both beginner and advanced developers.",
    It = ye({
        __name: "index",
        setup(P) {
            return Be().$globalClass, je({
                title: () => Fe,
                description: () => Le,
                twitterCard: () => "summary_large_image",
                twitterTitle: () => Fe,
                twitterDescription: () => Le,
                twitterImage: () => "/share-screen.jpg"
            }), $e(() => {}), Se(() => {}), (j, te) => {
                const q = ht,
                    G = Ke;
                return m(), v("main", xt, [T(q), T(G, {
                    id: "footer-skills"
                })])
            }
        }
    });
const Et = Ce(It, [
    ["__scopeId", "data-v-45945a75"]
]);
export {
    Et as
    default
};