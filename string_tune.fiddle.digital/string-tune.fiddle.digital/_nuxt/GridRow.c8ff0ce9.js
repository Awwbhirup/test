import {
    _ as X
} from "./nuxt-link.ca149e20.js";
import {
    f as $,
    r as o,
    g as Y,
    n as A,
    o as s,
    c as n,
    l as r,
    A as h,
    t as k,
    m as l,
    G as f,
    y as G,
    w as R,
    F as E,
    p as V,
    e as j,
    a as y,
    _ as F
} from "./entry.c7ee8776.js";
const v = e => (V("data-v-f9a9769b"), e = e(), j(), e),
    D = ["aria-label", "title", "string-outside-container", "disabled", "string-cursor-class"],
    M = v(() => y("span", {
        class: "glare"
    }, null, -1)),
    O = ["aria-label", "title", "string-outside-container", "disabled", "string-cursor-class"],
    q = v(() => y("span", {
        class: "glare"
    }, null, -1)),
    J = ["aria-label", "title", "href", "target", "disabled", "string-cursor-class", "string-outside-container"],
    K = v(() => y("span", {
        class: "glare"
    }, null, -1)),
    P = v(() => y("span", {
        class: "glare"
    }, null, -1)),
    Q = $({
        __name: "BaseButton",
        props: {
            stringId: {
                type: String,
                default: ""
            },
            bubbleSize: {
                type: String,
                default: "0.2rem"
            },
            url: {
                type: String,
                default: ""
            },
            target: {
                type: String,
                default: "_self"
            },
            routeurl: {
                type: String,
                default: ""
            },
            text: {
                type: String,
                default: ""
            },
            secondary: {
                type: Boolean,
                default: !1
            },
            min: {
                type: Boolean,
                default: !1
            },
            small: {
                type: Boolean,
                default: !1
            },
            outsideContainer: {
                type: Boolean,
                default: !1
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            submit: {
                type: Object,
                default: null
            },
            ariaLabelledby: {
                type: String,
                default: ""
            },
            extraClass: {
                type: String,
                default: ""
            },
            cursorTarget: {
                type: String,
                default: ""
            },
            passThrough: {
                type: Boolean,
                default: !1
            }
        },
        emits: ["click"],
        setup(e, {
            emit: c
        }) {
            const x = e,
                m = t => {
                    c("click", t)
                },
                S = o(),
                C = o(),
                B = o(),
                L = o(),
                b = o(1),
                g = o(1);

            function z(t, i, d, N, W) {
                const H = t.split("|").map(T => T.trim()).filter(Boolean);
                let w = 0;
                for (const T of H) {
                    let a = T,
                        I = !1;
                    a.startsWith("-") && (I = !0, a = a.slice(1));
                    let u = 0;
                    a === "selfHeight" ? u = i.offsetHeight : a.endsWith("px") ? u = parseFloat(a) : a.endsWith("%") ? u = parseFloat(a) / 100 * d : a.endsWith("rem") ? u = parseFloat(a) * N : a.endsWith("sh") ? u = parseFloat(a) * W.height / 100 : u = parseFloat(a), w += I ? -u : u
                }
                return w
            }
            return Y(() => {
                A(() => {
                    let t;
                    if (S.value != null && (t = S.value), C.value != null && (t = C.value), B.value != null && (t = B.value), L.value != null && (t = L.value.$el), t) {
                        let i = t.getBoundingClientRect(),
                            d = z(x.bubbleSize, t, window.innerHeight, parseFloat(getComputedStyle(document.documentElement).fontSize), i);
                        b.value = (i.width + d * 2) / i.width - 1, g.value = (i.height + d * 2) / i.height - 1
                    }
                })
            }), (t, i) => {
                const d = X;
                return s(), n(E, null, [!e.routeurl && !e.url && e.submit == null ? (s(), n("button", {
                    key: 0,
                    "aria-label": e.ariaLabelledby,
                    title: e.ariaLabelledby,
                    class: r(["button -p -m-m", [{
                        "-secondary": e.secondary,
                        "-disabled": e.disabled,
                        "-min": e.min,
                        "-passthrough": e.passThrough
                    }, e.extraClass]]),
                    "string-outside-container": e.outsideContainer,
                    disabled: e.disabled,
                    onClick: m,
                    string: "spotlight|cursor",
                    "string-cursor-class": e.cursorTarget,
                    ref_key: "button",
                    ref: S,
                    style: h({
                        "--skX": b.value,
                        "--skY": g.value
                    })
                }, [M, e.text ? (s(), n("span", {
                    key: 0,
                    class: r({
                        "-m": e.small
                    })
                }, k(e.text), 3)) : l("", !0), e.text ? l("", !0) : f(t.$slots, "default", {
                    key: 1
                })], 14, D)) : l("", !0), !e.routeurl && !e.url && e.submit != null ? (s(), n("button", {
                    key: 1,
                    "aria-label": e.ariaLabelledby,
                    title: e.ariaLabelledby,
                    class: r(["button -p -m-m", [{
                        "-secondary": e.secondary,
                        "-disabled": e.disabled,
                        "-min": e.min,
                        "-passthrough": e.passThrough
                    }, e.extraClass]]),
                    type: "submit",
                    "string-outside-container": e.outsideContainer,
                    disabled: e.disabled,
                    onClick: m,
                    string: "spotlight|cursor",
                    "string-cursor-class": e.cursorTarget,
                    ref_key: "buttonSubmit",
                    ref: C,
                    style: h({
                        "--skX": b.value,
                        "--skY": g.value
                    })
                }, [q, e.text ? (s(), n("span", {
                    key: 0,
                    class: r({
                        "-m": e.small
                    })
                }, k(e.text), 3)) : l("", !0), e.text ? l("", !0) : f(t.$slots, "default", {
                    key: 1
                })], 14, O)) : l("", !0), e.url ? (s(), n("a", {
                    key: 2,
                    "aria-label": e.ariaLabelledby,
                    title: e.ariaLabelledby,
                    href: e.url,
                    class: r(["button -p -m-m -nl", [{
                        "-secondary": e.secondary,
                        "-disabled": e.disabled,
                        "-min": e.min,
                        "-passthrough": e.passThrough
                    }, e.extraClass]]),
                    target: e.target,
                    disabled: e.disabled,
                    onClick: m,
                    string: "spotlight|cursor",
                    "string-cursor-class": e.cursorTarget,
                    "string-outside-container": e.outsideContainer,
                    ref_key: "buttonA",
                    ref: B,
                    style: h({
                        "--skX": b.value,
                        "--skY": g.value
                    })
                }, [K, e.text ? (s(), n("span", {
                    key: 0,
                    class: r({
                        "-m": e.small
                    })
                }, k(e.text), 3)) : l("", !0), e.text ? l("", !0) : f(t.$slots, "default", {
                    key: 1
                })], 14, J)) : l("", !0), e.routeurl ? (s(), G(d, {
                    key: 3,
                    "aria-label": e.ariaLabelledby,
                    title: e.ariaLabelledby,
                    to: e.routeurl,
                    class: r(["button -p -m-m -nl", [{
                        "-secondary": e.secondary,
                        "-disabled": e.disabled,
                        "-min": e.min,
                        "-passthrough": e.passThrough
                    }, e.extraClass]]),
                    "string-outside-container": e.outsideContainer,
                    disabled: e.disabled,
                    onClick: m,
                    string: "spotlight|cursor",
                    "string-id": e.stringId,
                    "string-cursor-class": e.cursorTarget,
                    ref_key: "buttonNuxtLink",
                    ref: L,
                    style: h({
                        "--skX": b.value,
                        "--skY": g.value
                    })
                }, {
                    default: R(() => [P, e.text ? (s(), n("span", {
                        key: 0,
                        class: r({
                            "-m": e.small
                        })
                    }, k(e.text), 3)) : l("", !0), e.text ? l("", !0) : f(t.$slots, "default", {
                        key: 1
                    })]),
                    _: 3
                }, 8, ["aria-label", "title", "to", "class", "string-outside-container", "disabled", "string-id", "string-cursor-class", "style"])) : l("", !0)], 64)
            }
        }
    });
const te = F(Q, [
        ["__scopeId", "data-v-f9a9769b"]
    ]),
    U = ["href"],
    ae = $({
        __name: "BaseIcon",
        props: {
            src: {
                type: String,
                default: ""
            }
        },
        setup(e) {
            return (c, x) => (s(), n("svg", null, [y("use", {
                href: `#${e.src}`
            }, null, 8, U)]))
        }
    });
const Z = ["id"],
    p = $({
        __name: "GridRow",
        props: {
            id: {}
        },
        setup(e) {
            return (c, x) => (s(), n("div", {
                class: "-w",
                id: c.id
            }, [f(c.$slots, "default", {}, void 0, !0)], 8, Z))
        }
    });
const le = F(p, [
    ["__scopeId", "data-v-e764b164"]
]);
export {
    te as _, ae as a, le as b
};