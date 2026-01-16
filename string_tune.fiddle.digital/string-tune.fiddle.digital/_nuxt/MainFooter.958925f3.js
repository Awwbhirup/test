import {
    r as $,
    N as Vt,
    O as Wt,
    K as vt,
    s as Xt,
    j as At,
    k as _,
    P as Yt,
    Q as Gt,
    q as Ct,
    H as Jt,
    f as ct,
    L as Qt,
    g as lt,
    n as Ft,
    h as ut,
    o as H,
    c as X,
    a as v,
    A as zt,
    _ as dt,
    G as Zt,
    J as te,
    m as et,
    b as T,
    w as it,
    y as xt,
    d as ee,
    l as se,
    p as ne,
    e as re
} from "./entry.c7ee8776.js";
import {
    $ as Dt
} from "./index.4ae1b6b5.js";
import {
    _ as oe,
    a as ae,
    b as ie
} from "./GridRow.c8ff0ce9.js";
import {
    _ as ce
} from "./CurrentYear.vue.8dfa6fe6.js";
import {
    B as le
} from "./BaseImage.d75aef71.js";
const ue = () => null;

function de(...n) {
    const r = typeof n[n.length - 1] == "string" ? n.pop() : void 0;
    typeof n[0] != "string" && n.unshift(r);
    let [s, t, e = {}] = n;
    if (typeof s != "string") throw new TypeError("[nuxt] [asyncData] key must be a string.");
    if (typeof t != "function") throw new TypeError("[nuxt] [asyncData] handler must be a function.");
    e.server = e.server ? ? !0, e.default = e.default ? ? ue, e.lazy = e.lazy ? ? !1, e.immediate = e.immediate ? ? !0;
    const o = At(),
        u = () => o.isHydrating ? o.payload.data[s] : o.static.data[s],
        m = () => u() !== void 0;
    (!o._asyncData[s] || !e.immediate) && (o._asyncData[s] = {
        data: $(u() ? ? e.default()),
        pending: $(!m()),
        error: Vt(o.payload._errors, s),
        status: $("idle")
    });
    const a = { ...o._asyncData[s]
    };
    a.refresh = a.execute = (c = {}) => {
        if (o._asyncDataPromises[s]) {
            if (c.dedupe === !1) return o._asyncDataPromises[s];
            o._asyncDataPromises[s].cancelled = !0
        }
        if ((c._initial || o.isHydrating && c._initial !== !1) && m()) return u();
        a.pending.value = !0, a.status.value = "pending";
        const w = new Promise((d, k) => {
            try {
                d(t(o))
            } catch (R) {
                k(R)
            }
        }).then(d => {
            if (w.cancelled) return o._asyncDataPromises[s];
            let k = d;
            e.transform && (k = e.transform(d)), e.pick && (k = fe(k, e.pick)), a.data.value = k, a.error.value = null, a.status.value = "success"
        }).catch(d => {
            if (w.cancelled) return o._asyncDataPromises[s];
            a.error.value = d, a.data.value = _(e.default()), a.status.value = "error"
        }).finally(() => {
            w.cancelled || (a.pending.value = !1, o.payload.data[s] = a.data.value, a.error.value && (o.payload._errors[s] = Yt(a.error.value)), delete o._asyncDataPromises[s])
        });
        return o._asyncDataPromises[s] = w, o._asyncDataPromises[s]
    };
    const p = () => a.refresh({
            _initial: !0
        }),
        g = e.server !== !1 && o.payload.serverRendered; {
        const c = Gt();
        if (c && !c._nuxtOnBeforeMountCbs) {
            c._nuxtOnBeforeMountCbs = [];
            const d = c._nuxtOnBeforeMountCbs;
            c && (Wt(() => {
                d.forEach(k => {
                    k()
                }), d.splice(0, d.length)
            }), vt(() => d.splice(0, d.length)))
        }
        g && o.isHydrating && m() ? (a.pending.value = !1, a.status.value = a.error.value ? "error" : "success") : c && (o.payload.serverRendered && o.isHydrating || e.lazy) && e.immediate ? c._nuxtOnBeforeMountCbs.push(p) : e.immediate && p(), e.watch && Xt(e.watch, () => a.refresh());
        const w = o.hook("app:data:refresh", d => {
            if (!d || d.includes(s)) return a.refresh()
        });
        c && vt(w)
    }
    const h = Promise.resolve(o._asyncDataPromises[s]).then(() => a);
    return Object.assign(h, a), h
}

function fe(n, r) {
    const s = {};
    for (const t of r) s[t] = n[t];
    return s
}
const kt = Object.freeze({
    ignoreUnknown: !1,
    respectType: !1,
    respectFunctionNames: !1,
    respectFunctionProperties: !1,
    unorderedObjects: !0,
    unorderedArrays: !1,
    unorderedSets: !1,
    excludeKeys: void 0,
    excludeValues: void 0,
    replacer: void 0
});

function he(n, r) {
    r ? r = { ...kt,
        ...r
    } : r = kt;
    const s = Rt(r);
    return s.dispatch(n), s.toString()
}
const pe = Object.freeze(["prototype", "__proto__", "constructor"]);

function Rt(n) {
    let r = "",
        s = new Map;
    const t = e => {
        r += e
    };
    return {
        toString() {
            return r
        },
        getContext() {
            return s
        },
        dispatch(e) {
            return n.replacer && (e = n.replacer(e)), this[e === null ? "null" : typeof e](e)
        },
        object(e) {
            if (e && typeof e.toJSON == "function") return this.object(e.toJSON());
            const o = Object.prototype.toString.call(e);
            let u = "";
            const m = o.length;
            m < 10 ? u = "unknown:[" + o + "]" : u = o.slice(8, m - 1), u = u.toLowerCase();
            let a = null;
            if ((a = s.get(e)) === void 0) s.set(e, s.size);
            else return this.dispatch("[CIRCULAR:" + a + "]");
            if (typeof Buffer < "u" && Buffer.isBuffer && Buffer.isBuffer(e)) return t("buffer:"), t(e.toString("utf8"));
            if (u !== "object" && u !== "function" && u !== "asyncfunction") this[u] ? this[u](e) : n.ignoreUnknown || this.unkown(e, u);
            else {
                let p = Object.keys(e);
                n.unorderedObjects && (p = p.sort());
                let g = [];
                n.respectType !== !1 && !Bt(e) && (g = pe), n.excludeKeys && (p = p.filter(c => !n.excludeKeys(c)), g = g.filter(c => !n.excludeKeys(c))), t("object:" + (p.length + g.length) + ":");
                const h = c => {
                    this.dispatch(c), t(":"), n.excludeValues || this.dispatch(e[c]), t(",")
                };
                for (const c of p) h(c);
                for (const c of g) h(c)
            }
        },
        array(e, o) {
            if (o = o === void 0 ? n.unorderedArrays !== !1 : o, t("array:" + e.length + ":"), !o || e.length <= 1) {
                for (const a of e) this.dispatch(a);
                return
            }
            const u = new Map,
                m = e.map(a => {
                    const p = Rt(n);
                    p.dispatch(a);
                    for (const [g, h] of p.getContext()) u.set(g, h);
                    return p.toString()
                });
            return s = u, m.sort(), this.array(m, !1)
        },
        date(e) {
            return t("date:" + e.toJSON())
        },
        symbol(e) {
            return t("symbol:" + e.toString())
        },
        unkown(e, o) {
            if (t(o), !!e && (t(":"), e && typeof e.entries == "function")) return this.array(Array.from(e.entries()), !0)
        },
        error(e) {
            return t("error:" + e.toString())
        },
        boolean(e) {
            return t("bool:" + e)
        },
        string(e) {
            t("string:" + e.length + ":"), t(e)
        },
        function(e) {
            t("fn:"), Bt(e) ? this.dispatch("[native]") : this.dispatch(e.toString()), n.respectFunctionNames !== !1 && this.dispatch("function-name:" + String(e.name)), n.respectFunctionProperties && this.object(e)
        },
        number(e) {
            return t("number:" + e)
        },
        xml(e) {
            return t("xml:" + e.toString())
        },
        null() {
            return t("Null")
        },
        undefined() {
            return t("Undefined")
        },
        regexp(e) {
            return t("regex:" + e.toString())
        },
        uint8array(e) {
            return t("uint8array:"), this.dispatch(Array.prototype.slice.call(e))
        },
        uint8clampedarray(e) {
            return t("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(e))
        },
        int8array(e) {
            return t("int8array:"), this.dispatch(Array.prototype.slice.call(e))
        },
        uint16array(e) {
            return t("uint16array:"), this.dispatch(Array.prototype.slice.call(e))
        },
        int16array(e) {
            return t("int16array:"), this.dispatch(Array.prototype.slice.call(e))
        },
        uint32array(e) {
            return t("uint32array:"), this.dispatch(Array.prototype.slice.call(e))
        },
        int32array(e) {
            return t("int32array:"), this.dispatch(Array.prototype.slice.call(e))
        },
        float32array(e) {
            return t("float32array:"), this.dispatch(Array.prototype.slice.call(e))
        },
        float64array(e) {
            return t("float64array:"), this.dispatch(Array.prototype.slice.call(e))
        },
        arraybuffer(e) {
            return t("arraybuffer:"), this.dispatch(new Uint8Array(e))
        },
        url(e) {
            return t("url:" + e.toString())
        },
        map(e) {
            t("map:");
            const o = [...e];
            return this.array(o, n.unorderedSets !== !1)
        },
        set(e) {
            t("set:");
            const o = [...e];
            return this.array(o, n.unorderedSets !== !1)
        },
        file(e) {
            return t("file:"), this.dispatch([e.name, e.size, e.type, e.lastModfied])
        },
        blob() {
            if (n.ignoreUnknown) return t("[blob]");
            throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)
        },
        domwindow() {
            return t("domwindow")
        },
        bigint(e) {
            return t("bigint:" + e.toString())
        },
        process() {
            return t("process")
        },
        timer() {
            return t("timer")
        },
        pipe() {
            return t("pipe")
        },
        tcp() {
            return t("tcp")
        },
        udp() {
            return t("udp")
        },
        tty() {
            return t("tty")
        },
        statwatcher() {
            return t("statwatcher")
        },
        securecontext() {
            return t("securecontext")
        },
        connection() {
            return t("connection")
        },
        zlib() {
            return t("zlib")
        },
        context() {
            return t("context")
        },
        nodescript() {
            return t("nodescript")
        },
        httpparser() {
            return t("httpparser")
        },
        dataview() {
            return t("dataview")
        },
        signal() {
            return t("signal")
        },
        fsevent() {
            return t("fsevent")
        },
        tlswrap() {
            return t("tlswrap")
        }
    }
}
const It = "[native code] }",
    me = It.length;

function Bt(n) {
    return typeof n != "function" ? !1 : Function.prototype.toString.call(n).slice(-me) === It
}
class q {
    constructor(r, s) {
        r = this.words = r || [], this.sigBytes = s === void 0 ? r.length * 4 : s
    }
    toString(r) {
        return (r || ge).stringify(this)
    }
    concat(r) {
        if (this.clamp(), this.sigBytes % 4)
            for (let s = 0; s < r.sigBytes; s++) {
                const t = r.words[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                this.words[this.sigBytes + s >>> 2] |= t << 24 - (this.sigBytes + s) % 4 * 8
            } else
                for (let s = 0; s < r.sigBytes; s += 4) this.words[this.sigBytes + s >>> 2] = r.words[s >>> 2];
        return this.sigBytes += r.sigBytes, this
    }
    clamp() {
        this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8, this.words.length = Math.ceil(this.sigBytes / 4)
    }
    clone() {
        return new q([...this.words])
    }
}
const ge = {
        stringify(n) {
            const r = [];
            for (let s = 0; s < n.sigBytes; s++) {
                const t = n.words[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                r.push((t >>> 4).toString(16), (t & 15).toString(16))
            }
            return r.join("")
        }
    },
    ye = {
        stringify(n) {
            const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                s = [];
            for (let t = 0; t < n.sigBytes; t += 3) {
                const e = n.words[t >>> 2] >>> 24 - t % 4 * 8 & 255,
                    o = n.words[t + 1 >>> 2] >>> 24 - (t + 1) % 4 * 8 & 255,
                    u = n.words[t + 2 >>> 2] >>> 24 - (t + 2) % 4 * 8 & 255,
                    m = e << 16 | o << 8 | u;
                for (let a = 0; a < 4 && t * 8 + a * 6 < n.sigBytes * 8; a++) s.push(r.charAt(m >>> 6 * (3 - a) & 63))
            }
            return s.join("")
        }
    },
    _e = {
        parse(n) {
            const r = n.length,
                s = [];
            for (let t = 0; t < r; t++) s[t >>> 2] |= (n.charCodeAt(t) & 255) << 24 - t % 4 * 8;
            return new q(s, r)
        }
    },
    be = {
        parse(n) {
            return _e.parse(unescape(encodeURIComponent(n)))
        }
    };
class we {
    constructor() {
        this._data = new q, this._nDataBytes = 0, this._minBufferSize = 0, this.blockSize = 512 / 32
    }
    reset() {
        this._data = new q, this._nDataBytes = 0
    }
    _append(r) {
        typeof r == "string" && (r = be.parse(r)), this._data.concat(r), this._nDataBytes += r.sigBytes
    }
    _doProcessBlock(r, s) {}
    _process(r) {
        let s, t = this._data.sigBytes / (this.blockSize * 4);
        r ? t = Math.ceil(t) : t = Math.max((t | 0) - this._minBufferSize, 0);
        const e = t * this.blockSize,
            o = Math.min(e * 4, this._data.sigBytes);
        if (e) {
            for (let u = 0; u < e; u += this.blockSize) this._doProcessBlock(this._data.words, u);
            s = this._data.words.splice(0, e), this._data.sigBytes -= o
        }
        return new q(s, o)
    }
}
class ve extends we {
    update(r) {
        return this._append(r), this._process(), this
    }
    finalize(r) {
        r && this._append(r)
    }
}
const Mt = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225],
    xe = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998],
    K = [];
class ke extends ve {
    constructor() {
        super(...arguments), this._hash = new q([...Mt])
    }
    reset() {
        super.reset(), this._hash = new q([...Mt])
    }
    _doProcessBlock(r, s) {
        const t = this._hash.words;
        let e = t[0],
            o = t[1],
            u = t[2],
            m = t[3],
            a = t[4],
            p = t[5],
            g = t[6],
            h = t[7];
        for (let c = 0; c < 64; c++) {
            if (c < 16) K[c] = r[s + c] | 0;
            else {
                const B = K[c - 15],
                    U = (B << 25 | B >>> 7) ^ (B << 14 | B >>> 18) ^ B >>> 3,
                    C = K[c - 2],
                    D = (C << 15 | C >>> 17) ^ (C << 13 | C >>> 19) ^ C >>> 10;
                K[c] = U + K[c - 7] + D + K[c - 16]
            }
            const w = a & p ^ ~a & g,
                d = e & o ^ e & u ^ o & u,
                k = (e << 30 | e >>> 2) ^ (e << 19 | e >>> 13) ^ (e << 10 | e >>> 22),
                R = (a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25),
                z = h + R + w + xe[c] + K[c],
                S = k + d;
            h = g, g = p, p = a, a = m + z | 0, m = u, u = o, o = e, e = z + S | 0
        }
        t[0] = t[0] + e | 0, t[1] = t[1] + o | 0, t[2] = t[2] + u | 0, t[3] = t[3] + m | 0, t[4] = t[4] + a | 0, t[5] = t[5] + p | 0, t[6] = t[6] + g | 0, t[7] = t[7] + h | 0
    }
    finalize(r) {
        super.finalize(r);
        const s = this._nDataBytes * 8,
            t = this._data.sigBytes * 8;
        return this._data.words[t >>> 5] |= 128 << 24 - t % 32, this._data.words[(t + 64 >>> 9 << 4) + 14] = Math.floor(s / 4294967296), this._data.words[(t + 64 >>> 9 << 4) + 15] = s, this._data.sigBytes = this._data.words.length * 4, this._process(), this._hash
    }
}

function Be(n) {
    return new ke().finalize(n).toString(ye)
}

function Me(n, r = {}) {
    const s = typeof n == "string" ? n : he(n, r);
    return Be(s).slice(0, 10)
}

function is(n, r, s) {
    var U;
    const [t = {}, e] = typeof r == "string" ? [{}, r] : [r, s], o = Ct(() => {
        let C = n;
        return typeof C == "function" && (C = C()), _(C)
    }), u = t.key || Me([e, ((U = _(t.method)) == null ? void 0 : U.toUpperCase()) || "GET", _(t.baseURL), typeof o.value == "string" ? o.value : "", _(t.params || t.query)]);
    if (!u || typeof u != "string") throw new TypeError("[nuxt] [useFetch] key must be a string: " + u);
    if (!n) throw new Error("[nuxt] [useFetch] request is missing.");
    const m = u === e ? "$f" + u : u;
    if (!t.baseURL && typeof o.value == "string" && o.value.startsWith("//")) throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
    const {
        server: a,
        lazy: p,
        default: g,
        transform: h,
        pick: c,
        watch: w,
        immediate: d,
        ...k
    } = t, R = Jt({ ...k,
        cache: typeof t.cache == "boolean" ? void 0 : t.cache
    }), z = {
        server: a,
        lazy: p,
        default: g,
        transform: h,
        pick: c,
        immediate: d,
        watch: w === !1 ? [] : [R, o, ...w || []]
    };
    let S;
    return de(m, () => {
        var D;
        return (D = S == null ? void 0 : S.abort) == null || D.call(S), S = typeof AbortController < "u" ? new AbortController : {}, typeof o.value == "string" && o.value.startsWith("/"), (t.$fetch || globalThis.$fetch)(o.value, {
            signal: S.signal,
            ...R
        })
    }, z)
}
const Se = ["string-id"],
    Ae = ["d"],
    Ce = 1024,
    Fe = 1e-4,
    ze = 1,
    De = .18,
    Re = .75,
    St = .1,
    Ie = ct({
        __name: "StringImpulse",
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
        setup(n) {
            const r = n;
            Qt(i => ({
                "6a90ba4d": _(t)
            }));
            const s = r.id,
                t = r.thickness ? ? 1,
                e = r.sensitivity ? ? 1.1,
                o = r.maxBend ? ? .45,
                u = r.kEdge ? ? .6,
                m = r.kMid ? ? .9,
                a = r.aspectRatio ? ? "8 / 1",
                p = r.heightFallbackPx ? ? 80,
                g = `${p}px`,
                h = $(null),
                c = $("M 0 0.5 L 1 0.5");
            let w = 0,
                d = 0,
                k = Number.NaN,
                R = .5,
                z = 0,
                S = null,
                B = null,
                U = !1,
                C = null;
            const D = (i, l = 0) => Number.isFinite(i) ? Number(i) : l,
                Y = (i, l, y) => Math.max(l, Math.min(y, i));

            function Pt(i) {
                const l = i.match(/^\s*([0-9.]+)\s*\/\s*([0-9.]+)\s*$/);
                if (!l) return null;
                const y = parseFloat(l[1]),
                    f = parseFloat(l[2]);
                return y > 0 && f > 0 ? y / f : null
            }
            const ft = Pt(a) ? ? 8 / 1;

            function Et(i) {
                const l = D(i, 0),
                    y = .5 + l,
                    f = .5 + l * u,
                    b = .5 + l * m,
                    A = (Y(D(R, .5), 0, 1) * 2 - 1) * ze,
                    M = .5 + Y(A, -1, 1) * De,
                    P = -.28,
                    E = -.22,
                    L = M + P,
                    N = M + E,
                    W = M - E,
                    O = M - P,
                    F = Z => Math.round(D(Z, 0) * 1e3) / 1e3;
                return `M 0 0.5 C ${F(L)} ${F(f)} ${F(N)} ${F(b)} ${F(M)} ${F(y)} C ${F(W)} ${F(b)} ${F(O)} ${F(f)} 1 0.5`
            }

            function st() {
                const i = Y(D(d, 0), -o, o);
                Number.isFinite(w) && (!Number.isFinite(k) || Math.abs(i - k) > Fe) && (k = i, c.value = Et(k))
            }

            function G() {
                z || (z = requestAnimationFrame(() => {
                    z = 0, st()
                }))
            }

            function Lt() {
                const i = h.value,
                    l = i.getBoundingClientRect();
                let y = l.height;
                if (!y) {
                    const f = l.width || i.clientWidth;
                    f && (y = f / ft)
                }
                return y || p
            }

            function Tt() {
                const i = Math.max(1, Lt());
                w = e / i
            }
            async function Nt() {
                await new Promise(i => requestAnimationFrame(() => requestAnimationFrame(i)))
            }
            const j = `object:impulse:${s}`,
                ht = i => {
                    d = D(i == null ? void 0 : i.y, 0) * D(w, 0), G()
                },
                pt = i => {
                    R = Y(D(i == null ? void 0 : i.value, .5), 0, 1), G()
                },
                mt = i => {
                    R = (Y(D(i == null ? void 0 : i.rotation, 0), -18, 18) + 18) / 36, G()
                };

            function $t() {
                B && (gt(), B.on(j + ":move", ht), B.on(j + ":side", pt), B.on(j + ":rotate", mt), G())
            }

            function gt() {
                B && (B.off(j + ":move", ht), B.off(j + ":side", pt), B.off(j + ":rotate", mt), z && cancelAnimationFrame(z), z = 0)
            }

            function nt() {
                const i = yt();
                U = i;
                const l = i ? "mobile" : "desktop";
                l !== C && (C = l, $t())
            }

            function yt() {
                return typeof window > "u" ? !1 : (typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)").matches : !1) || window.innerWidth <= Ce
            }
            const _t = () => {
                    nt()
                },
                rt = i => i * i * (3 - 2 * i);
            let V = 0,
                J = null;

            function Ot(i) {
                J && cancelAnimationFrame(J);
                const l = .5,
                    f = 1 - .08;
                V += i;
                let b = performance.now();

                function A(x) {
                    const M = Math.min((x - b) / 16.67, 2);
                    b = x, V -= l * d, V *= f, d += V * M, st(), Math.abs(V) < 1e-4 && Math.abs(d) < 1e-4 ? (J = null, d = 0, V = 0, st()) : J = requestAnimationFrame(A)
                }
                J = requestAnimationFrame(A)
            }

            function Q(i, l, y) {
                const f = new MouseEvent(i, {
                    bubbles: !0,
                    cancelable: !1,
                    clientX: Math.round(l),
                    clientY: Math.round(y),
                    buttons: i === "mousedown" ? 1 : 0
                });
                document.body.dispatchEvent(f)
            }

            function Ht(i, l, y, f, b = 160, A = 6, x = 18) {
                const M = (y - i) * .08,
                    P = (f - l) * .08;
                Q("mousemove", i, l), requestAnimationFrame(() => {
                    Q("mousemove", i + M, l + P), requestAnimationFrame(() => {
                        Q("mousemove", i + M * 2, l + P * 2)
                    })
                });
                const E = performance.now();

                function L(N) {
                    const W = Math.min(1, (N - E) / b),
                        O = rt(W),
                        F = i + (y - i) * O,
                        Z = l + (f - l) * O,
                        ot = i + (y - i) * rt(Math.max(0, (N - E - 16) / b)),
                        at = l + (f - l) * rt(Math.max(0, (N - E - 16) / b)),
                        bt = Math.hypot(F - ot, Z - at);
                    if (bt > St) {
                        const wt = St / bt,
                            Kt = ot + (F - ot) * wt,
                            jt = at + (Z - at) * wt;
                        Q("mousemove", Kt, jt)
                    } else Q("mousemove", F, Z);
                    W < 1 && requestAnimationFrame(L)
                }
                requestAnimationFrame(L)
            }

            function qt(i, l = .38, y = 160) {
                if (yt()) {
                    const N = l * Re;
                    Ot(N);
                    return
                }
                const f = i.getBoundingClientRect(),
                    b = f.left + f.width * .5,
                    A = f.top + f.height * .5,
                    x = Math.max(8, Math.min(64, f.height * l)),
                    M = b - x * .55,
                    P = A - x,
                    E = b + x * .55,
                    L = A + x;
                Ht(M, P, E, L, y)
            }

            function Ut(i, l, y = {}) {
                const f = y.once ? ? !0;
                let b = null,
                    A = !1;
                const x = () => {
                        A = !1;
                        const L = i.getBoundingClientRect();
                        if (L.width === 0 && L.height === 0) return;
                        const N = L.top + L.height * .5,
                            W = window.innerHeight * .5,
                            O = N < W;
                        if (b === null) {
                            b = O;
                            return
                        }
                        O !== b && (b = O, l(), f && E())
                    },
                    M = () => {
                        A || (A = !0, requestAnimationFrame(x))
                    },
                    P = () => {
                        b = null, M()
                    };
                B.on("scroll", M), window.addEventListener("resize", P), requestAnimationFrame(x);

                function E() {
                    B.off("scroll", M), window.removeEventListener("resize", P)
                }
                return E
            }
            let tt = null;
            return lt(async () => {
                if (await Ft(), await Nt(), Tt(), B = Dt.getInstance(), h.value) {
                    let l = h.value;
                    tt = Ut(l, () => {
                        U && qt(h.value, .35, 180)
                    }, {
                        once: !1
                    })
                }
                const i = l => {
                    if (l.length) {
                        const y = l[0];
                        let f = 0;
                        const b = y.contentBoxSize;
                        if (b) {
                            const x = Array.isArray(b) ? b[0] : b;
                            f = x && x.blockSize ? x.blockSize : 0
                        }
                        if (!f) {
                            const x = y.contentRect;
                            f = x.height || (x.width ? x.width / ft : 0)
                        }!f && h.value && (f = h.value.clientHeight || 0), f || (f = p);
                        const A = e / Math.max(1, f);
                        Math.abs(A - w) > 1e-6 && (w = A)
                    }
                    nt(), G()
                };
                window.ResizeObserver && (S = new ResizeObserver(i), h.value && S.observe(h.value)), window.addEventListener("resize", _t, {
                    passive: !0
                }), nt(), i([]), setTimeout(() => B.onResize(!0), 32)
            }), ut(() => {
                gt(), tt && tt(), tt = null, S && h.value && S.unobserve(h.value), S = null, window.removeEventListener("resize", _t)
            }), (i, l) => (H(), X("svg", {
                viewBox: "0 0 1 1",
                preserveAspectRatio: "none",
                class: "string-svg",
                style: zt({
                    "--room": g
                }),
                string: "impulse",
                "string-position-strength": "2.225",
                "string-position-tension": "0.8175",
                "string-position-friction": "0.0735",
                "string-continuous-push": "true",
                "string-id": _(s),
                ref_key: "svgEl",
                ref: h
            }, [v("path", {
                class: "string",
                d: c.value,
                "vector-effect": "non-scaling-stroke"
            }, null, 8, Ae)], 12, Se))
        }
    });
const Pe = dt(Ie, [
        ["__scopeId", "data-v-3acded25"]
    ]),
    Ee = ct({
        __name: "GridContent",
        props: {
            cols: {
                type: String,
                default: "1"
            },
            mcols: {
                type: String,
                default: "1"
            },
            rows: {
                type: String,
                default: "1"
            }
        },
        setup(n) {
            const r = n;
            let s = $(1),
                t = () => {
                    window.innerWidth >= 1024 ? s.value = r.cols : s.value = r.mcols
                };
            return lt(() => {
                t(), window.addEventListener("resize", t)
            }), ut(() => {
                window.removeEventListener("resize", t)
            }), (e, o) => (H(), X("div", {
                class: "-gc",
                style: zt([{
                    "--columns": _(s),
                    "--rows": n.rows
                }])
            }, [Zt(e.$slots, "default", {}, void 0, !0)], 4))
        }
    });
const cs = dt(Ee, [
        ["__scopeId", "data-v-3a044df5"]
    ]),
    I = n => (ne("data-v-8efeae1e"), n = n(), re(), n),
    Le = ["string-id"],
    Te = {
        key: 0,
        class: "overlay"
    },
    Ne = {
        width: "0",
        height: "0"
    },
    $e = {
        id: "trapezium",
        clipPathUnits: "objectBoundingBox"
    },
    Oe = ["d"],
    He = I(() => v("svg", {
        viewBox: "0 0 8 8",
        preserveAspectRatio: "none"
    }, [v("polygon", {
        points: "4 0 6 0.535898385 7.46410162 2 8 4 7.46410162 6 6 7.46410162 4 8 2 7.46410162 0.535898385 6 0 4 0.535898385 2 2 0.535898385",
        "vector-effect": "non-scaling-stroke"
    })], -1)),
    qe = I(() => v("span", {
        class: "heading -l -h3 -m-h5"
    }, "Attribute", -1)),
    Ue = I(() => v("span", {
        class: "heading -r -h3 -m-h5"
    }, "driven.", -1)),
    Ke = I(() => v("p", {
        class: "statement -st-1 -h6 -m-p"
    }, "No JS until you truly need it.", -1)),
    je = I(() => v("p", {
        class: "statement -st-2 -h6 -m-p"
    }, "Captivating websites with ease.", -1)),
    Ve = I(() => v("p", {
        class: "statement -st-3 -h6 -m-p"
    }, "Build your own modules to extend its power.", -1)),
    We = I(() => v("a", {
        href: "https://tympanus.net/codrops/2025/03/19/stringtune-the-javascript-library-born-from-a-design-agencys-workflow/",
        target: "_blank",
        class: "own-modules -mm -up"
    }, "Learn how", -1)),
    Xe = I(() => v("span", {
        class: "devider"
    }, null, -1)),
    Ye = I(() => v("span", {
        class: "the-name -lrg -tac"
    }, [v("span", null, "String"), v("span", null, "Tune")], -1)),
    Ge = I(() => v("span", {
        class: "sub -su-1 -mm -up"
    }, "© Fiddle.Digital Product", -1)),
    Je = I(() => v("span", {
        class: "sub -su-2 -mm -up"
    }, "For smooth scrolling and core web animations", -1)),
    Qe = I(() => v("span", {
        class: "sub -su-3 -mm -up"
    }, "CSS-First. JS-Light", -1)),
    Ze = {
        class: "sub -su-4 -mm -up"
    },
    ts = {
        key: 1,
        class: "polygon",
        string: "progress",
        "string-id": "polygon",
        "string-self-disable": ""
    },
    es = ct({
        __name: "MainFooter",
        props: {
            id: {
                type: String,
                default: "footer"
            },
            home: {
                type: Boolean,
                default: !1
            }
        },
        setup(n) {
            const r = n,
                t = At().$globalClass,
                e = te();
            Ct(() => e.path);
            const o = $(!1);
            let u = () => {
                    setTimeout(() => {
                        t.emit("container-minimize", !1), t.emit("header-back"), t.emit("light-on", !1), o.value = !0
                    }, 900)
                },
                m = $(!1),
                a = $(0);
            const p = g => {
                g.katanaId == "footer" && (t.emit("katana:fog:set", {
                    instanceId: "footer",
                    key: "idle"
                }), t.emit("katana:mouse:strength", {
                    instanceId: "footer",
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
                }), t.emit("katana:light:progress", {
                    instanceId: "footer",
                    id: "ambient-hemisphere",
                    from: {
                        intensity: 0
                    },
                    to: {
                        intensity: 10
                    },
                    progress: 1
                }), t.emit("katana:light:progress", {
                    instanceId: "footer",
                    id: "ambient",
                    from: {
                        intensity: 0
                    },
                    to: {
                        intensity: 10
                    },
                    progress: 1
                }))
            };
            return lt(() => {
                Ft(() => {
                    let g = Dt.getInstance();
                    t.on("katana:ready", p), g.on("screen:mobile", h => {
                        m.value = h
                    }), g.on("object:progress:" + r.id, h => {
                        a.value = h
                    }), setTimeout(() => {
                        o.value = !0
                    }, 1200)
                })
            }), ut(() => {
                t.off("page-change", u), t.off("katana:ready", p)
            }), (g, h) => {
                const c = Pe,
                    w = oe,
                    d = ae,
                    k = ce,
                    R = le,
                    z = ie;
                return H(), X("footer", {
                    class: se(["-dark", {
                        "-home": n.home
                    }]),
                    string: "progress",
                    "string-id": n.id,
                    "string-exit-vp": "top",
                    "string-exit-el": "top",
                    "string-offset-top": "25%"
                }, [!_(m) && n.home ? (H(), X("span", Te, [(H(), X("svg", Ne, [v("defs", null, [v("clipPath", $e, [v("path", {
                    d: " M " + (.5 - Math.pow(_(a), 8) * .5) + " " + (1 - Math.pow(_(a), 1) * 1) + "  C " + (.3 - Math.pow(_(a), 4) * .3) + " " + (1 - Math.pow(_(a), 1) * 1) + " " + (.4 - Math.pow(_(a), 4) * .4) + " " + (1 - Math.pow(_(a), 1) * 1) + "  0 1   L 1 1 C " + (.6 + Math.pow(_(a), 4) * .4) + " " + (1 - Math.pow(_(a), 1) * 1) + " " + (.7 + Math.pow(_(a), 4) * .3) + " " + (1 - Math.pow(_(a), 1) * 1) + " " + (.5 + Math.pow(_(a), 8) * .5) + " " + (1 - Math.pow(_(a), 1) * 1) + "  Z "
                }, null, 8, Oe)])])]))])) : et("", !0), He, T(z, null, {
                    default: it(() => [o.value ? (H(), xt(c, {
                        key: 0,
                        id: "footer-string-impulse",
                        sensitivity: 1,
                        maxBend: .5,
                        kEdge: .4,
                        kMid: 1,
                        heightFallbackPx: 80
                    })) : et("", !0), qe, Ue, Ke, je, Ve, We, v("nav", null, [T(w, {
                        onClick: _(u),
                        ariaLabelledby: "",
                        text: "Skill Hub",
                        routeurl: "/skill-hub",
                        cursorTarget: "cursor-route",
                        extraClass: "route b-1"
                    }, null, 8, ["onClick"]), Xe, T(w, {
                        ariaLabelledby: "",
                        url: "https://github.com/Fiddle-Digital",
                        target: "_blank",
                        cursorTarget: "cursor-newtab",
                        extraClass: "b-2"
                    }, {
                        default: it(() => [T(d, {
                            src: "icon-20_git"
                        })]),
                        _: 1
                    }), T(w, {
                        ariaLabelledby: "",
                        url: "https://discord.gg/RweVq2zK5t",
                        target: "_blank",
                        cursorTarget: "cursor-newtab",
                        extraClass: "b-3"
                    }, {
                        default: it(() => [T(d, {
                            class: "discord i-1",
                            src: "icon-20_discord"
                        }), T(d, {
                            class: "discord i-2",
                            src: "icon-20_discord"
                        }), T(d, {
                            class: "discord i-3",
                            src: "icon-20_discord"
                        })]),
                        _: 1
                    })]), Ye, T(d, {
                        src: "fidoru-76x20",
                        class: "fidoru"
                    }), Ge, Je, Qe, v("span", Ze, [ee("‘"), T(k, {
                        format: "YY"
                    })]), _(m) ? et("", !0) : (H(), X("div", ts, [T(d, {
                        src: "logo-string"
                    })])), _(m) ? et("", !0) : (H(), xt(R, {
                        key: 2,
                        class: "kw",
                        src: "/images/general/kw.webp",
                        string: "parallax",
                        "string-parallax": "-0.2"
                    }))]),
                    _: 1
                })], 10, Le)
            }
        }
    });
const ls = dt(es, [
    ["__scopeId", "data-v-8efeae1e"]
]);
export {
    Pe as _, cs as a, ls as b, is as u
};