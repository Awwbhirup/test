import {
    f as V,
    r as E,
    s as b,
    g as C,
    h as T,
    o as f,
    c as p,
    a as $,
    l as x,
    j as N,
    _ as k,
    m as O
} from "./entry.c7ee8776.js";
const j = ["loop", "autoplay", "preload"],
    q = V({
        __name: "BaseVideo",
        props: {
            src: {
                default: ""
            },
            fit: {
                type: Boolean,
                default: !1
            },
            lazy: {
                type: Boolean,
                default: !0
            },
            active: {
                type: Boolean,
                default: !0
            },
            playOnce: {
                type: Boolean,
                default: !1
            },
            autoplay: {
                type: Boolean,
                default: !1
            },
            framed: {
                type: Boolean,
                default: !1
            }
        },
        emits: ["loaded", "ended"],
        setup(l, {
            expose: B,
            emit: y
        }) {
            const t = l,
                A = N().$globalClass,
                a = E(null),
                v = E(null);
            let r = !1,
                _ = !1,
                u = !1,
                o = !1,
                n = null,
                m = !1;
            const i = async () => {
                    var e;
                    try {
                        await ((e = a.value) == null ? void 0 : e.play())
                    } catch {}
                },
                h = () => {
                    a.value && !a.value.paused && a.value.pause()
                },
                L = () => {
                    const e = a.value;
                    if (e) {
                        e.removeEventListener("canplaythrough", w), e.removeEventListener("ended", z), e.paused || e.pause(), e.removeAttribute("src");
                        try {
                            e.load()
                        } catch {}
                        _ = !1, r = !1, m = !1
                    }
                },
                w = () => {
                    _ = !0, t.autoplay && (i(), o = !1), (t.active && u || o) && (i(), o = !1), m || (y("loaded", {
                        video: a.value
                    }), m = !0)
                },
                z = () => {
                    y("ended", {
                        video: a.value
                    })
                },
                d = () => {
                    r || !a.value || (a.value.addEventListener("canplaythrough", w, {
                        once: !1
                    }), a.value.addEventListener("ended", z, {
                        once: !1
                    }), a.value.src = t.src, a.value.load(), r = !0)
                },
                g = () => {
                    if (t.autoplay) {
                        i(), o = !1;
                        return
                    }
                    if (!u) {
                        h(), o = !1;
                        return
                    }
                    if (!t.active) {
                        h(), o = !1;
                        return
                    }
                    r || d(), _ || a.value && a.value.readyState >= 3 ? (i(), o = !1) : o = !0
                },
                P = () => {
                    n && (n.disconnect(), n = null), v.value && (typeof window < "u" && "IntersectionObserver" in window ? (n = new IntersectionObserver(S, {
                        threshold: .25
                    }), n.observe(v.value)) : (u = !0, g()))
                },
                S = e => {
                    const c = e[0];
                    c && (u = c.isIntersecting, u && t.lazy && !r && d(), g())
                };
            b(() => t.active, () => {
                t.active && !r && d(), g()
            }), b(() => t.playOnce, e => {
                a.value && (a.value.loop = !e)
            });
            var I = A.getId().toString();
            return C(() => {
                var e = a.value;
                e == null || e.setAttribute("data-video-id", I), e && (e.preload = t.lazy ? "none" : "metadata", e.loop = !t.playOnce, t.framed && setTimeout(() => {
                    var c = document.querySelectorAll(`[data-video-id="${I}"]`);
                    c.forEach(s => {
                        try {
                            s && (s.src = t.src, s == null || s.load(), s == null || s.play())
                        } catch {}
                    })
                }, 2200), t.autoplay == !1 && P(), t.lazy || d())
            }), T(() => {
                n == null || n.disconnect(), n = null, setTimeout(() => {
                    L()
                }, 500)
            }), B({
                play: () => {
                    r || d(), i()
                },
                pause: () => h(),
                load: () => d(),
                el: a
            }), (e, c) => (f(), p("div", {
                class: x(["video-wrap", {
                    "-fit": e.fit
                }]),
                ref_key: "wrapper",
                ref: v
            }, [$("video", {
                muted: "",
                playsinline: "",
                loop: !e.playOnce,
                autoplay: e.autoplay,
                ref_key: "video",
                ref: a,
                preload: e.lazy ? "metadata" : "auto"
            }, null, 8, j)], 2))
        }
    });
const H = k(q, [
        ["__scopeId", "data-v-32fe59fd"]
    ]),
    M = ["string-lazy", "alt"],
    R = ["src", "alt"],
    U = V({
        __name: "BaseImage",
        props: {
            src: {
                type: String,
                default: ""
            },
            alt: {
                type: String,
                default: "StringTune"
            },
            fit: {
                type: Boolean,
                default: !1
            },
            nolazy: {
                type: Boolean,
                default: !1
            }
        },
        setup(l) {
            return (B, y) => (f(), p("figure", {
                class: x({
                    "-fit": l.fit
                })
            }, [l.nolazy ? O("", !0) : (f(), p("img", {
                key: 0,
                string: "lazy",
                "string-lazy": l.src,
                alt: l.alt
            }, null, 8, M)), l.nolazy ? (f(), p("img", {
                key: 1,
                src: l.src,
                alt: l.alt
            }, null, 8, R)) : O("", !0)], 2))
        }
    });
const J = k(U, [
    ["__scopeId", "data-v-4d7534c3"]
]);
export {
    J as B, H as _
};