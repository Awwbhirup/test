var Gd = Object.defineProperty;
var Yd = (t, e, n) => e in t ? Gd(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : t[e] = n;
var Wn = (t, e, n) => (Yd(t, typeof e != "symbol" ? e + "" : e, n), n);

function $a(t, e) {
    const n = Object.create(null),
        r = t.split(",");
    for (let s = 0; s < r.length; s++) n[r[s]] = !0;
    return e ? s => !!n[s.toLowerCase()] : s => !!n[s]
}
const we = {},
    Qn = [],
    Ct = () => {},
    Jd = () => !1,
    Xd = /^on[^a-z]/,
    gs = t => Xd.test(t),
    Ia = t => t.startsWith("onUpdate:"),
    Fe = Object.assign,
    Oa = (t, e) => {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1)
    },
    Qd = Object.prototype.hasOwnProperty,
    ce = (t, e) => Qd.call(t, e),
    Z = Array.isArray,
    Zn = t => _s(t) === "[object Map]",
    qu = t => _s(t) === "[object Set]",
    Zd = t => _s(t) === "[object RegExp]",
    te = t => typeof t == "function",
    Ce = t => typeof t == "string",
    Fa = t => typeof t == "symbol",
    ye = t => t !== null && typeof t == "object",
    Ma = t => ye(t) && te(t.then) && te(t.catch),
    Wu = Object.prototype.toString,
    _s = t => Wu.call(t),
    ep = t => _s(t).slice(8, -1),
    Vu = t => _s(t) === "[object Object]",
    La = t => Ce(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t,
    Vr = $a(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    wi = t => {
        const e = Object.create(null);
        return n => e[n] || (e[n] = t(n))
    },
    tp = /-(\w)/g,
    Lt = wi(t => t.replace(tp, (e, n) => n ? n.toUpperCase() : "")),
    np = /\B([A-Z])/g,
    vr = wi(t => t.replace(np, "-$1").toLowerCase()),
    Ei = wi(t => t.charAt(0).toUpperCase() + t.slice(1)),
    Ki = wi(t => t ? `on${Ei(t)}` : ""),
    ns = (t, e) => !Object.is(t, e),
    Kr = (t, e) => {
        for (let n = 0; n < t.length; n++) t[n](e)
    },
    Vs = (t, e, n) => {
        Object.defineProperty(t, e, {
            configurable: !0,
            enumerable: !1,
            value: n
        })
    },
    rp = t => {
        const e = parseFloat(t);
        return isNaN(e) ? t : e
    },
    Ku = t => {
        const e = Ce(t) ? Number(t) : NaN;
        return isNaN(e) ? t : e
    };
let Cl;
const So = () => Cl || (Cl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});

function xi(t) {
    if (Z(t)) {
        const e = {};
        for (let n = 0; n < t.length; n++) {
            const r = t[n],
                s = Ce(r) ? ap(r) : xi(r);
            if (s)
                for (const i in s) e[i] = s[i]
        }
        return e
    } else {
        if (Ce(t)) return t;
        if (ye(t)) return t
    }
}
const sp = /;(?![^(]*\))/g,
    ip = /:([^]+)/,
    op = /\/\*[^]*?\*\//g;

function ap(t) {
    const e = {};
    return t.replace(op, "").split(sp).forEach(n => {
        if (n) {
            const r = n.split(ip);
            r.length > 1 && (e[r[0].trim()] = r[1].trim())
        }
    }), e
}

function ki(t) {
    let e = "";
    if (Ce(t)) e = t;
    else if (Z(t))
        for (let n = 0; n < t.length; n++) {
            const r = ki(t[n]);
            r && (e += r + " ")
        } else if (ye(t))
            for (const n in t) t[n] && (e += n + " ");
    return e.trim()
}

function lp(t) {
    if (!t) return null;
    let {
        class: e,
        style: n
    } = t;
    return e && !Ce(e) && (t.class = ki(e)), n && (t.style = xi(n)), t
}
const cp = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    up = $a(cp);

function zu(t) {
    return !!t || t === ""
}
const Vw = t => Ce(t) ? t : t == null ? "" : Z(t) || ye(t) && (t.toString === Wu || !te(t.toString)) ? JSON.stringify(t, Gu, 2) : String(t),
    Gu = (t, e) => e && e.__v_isRef ? Gu(t, e.value) : Zn(e) ? {
        [`Map(${e.size})`]: [...e.entries()].reduce((n, [r, s]) => (n[`${r} =>`] = s, n), {})
    } : qu(e) ? {
        [`Set(${e.size})`]: [...e.values()]
    } : ye(e) && !Z(e) && !Vu(e) ? String(e) : e;
let Et;
class fp {
    constructor(e = !1) {
        this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Et, !e && Et && (this.index = (Et.scopes || (Et.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(e) {
        if (this._active) {
            const n = Et;
            try {
                return Et = this, e()
            } finally {
                Et = n
            }
        }
    }
    on() {
        Et = this
    }
    off() {
        Et = this.parent
    }
    stop(e) {
        if (this._active) {
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.scopes)
                for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !e) {
                const s = this.parent.scopes.pop();
                s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index)
            }
            this.parent = void 0, this._active = !1
        }
    }
}

function hp(t, e = Et) {
    e && e.active && e.effects.push(t)
}

function dp() {
    return Et
}
const Na = t => {
        const e = new Set(t);
        return e.w = 0, e.n = 0, e
    },
    Yu = t => (t.w & mn) > 0,
    Ju = t => (t.n & mn) > 0,
    pp = ({
        deps: t
    }) => {
        if (t.length)
            for (let e = 0; e < t.length; e++) t[e].w |= mn
    },
    gp = t => {
        const {
            deps: e
        } = t;
        if (e.length) {
            let n = 0;
            for (let r = 0; r < e.length; r++) {
                const s = e[r];
                Yu(s) && !Ju(s) ? s.delete(t) : e[n++] = s, s.w &= ~mn, s.n &= ~mn
            }
            e.length = n
        }
    },
    Ks = new WeakMap;
let Mr = 0,
    mn = 1;
const To = 30;
let xt;
const Mn = Symbol(""),
    Po = Symbol("");
class Da {
    constructor(e, n = null, r) {
        this.fn = e, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, hp(this, r)
    }
    run() {
        if (!this.active) return this.fn();
        let e = xt,
            n = fn;
        for (; e;) {
            if (e === this) return;
            e = e.parent
        }
        try {
            return this.parent = xt, xt = this, fn = !0, mn = 1 << ++Mr, Mr <= To ? pp(this) : Sl(this), this.fn()
        } finally {
            Mr <= To && gp(this), mn = 1 << --Mr, xt = this.parent, fn = n, this.parent = void 0, this.deferStop && this.stop()
        }
    }
    stop() {
        xt === this ? this.deferStop = !0 : this.active && (Sl(this), this.onStop && this.onStop(), this.active = !1)
    }
}

function Sl(t) {
    const {
        deps: e
    } = t;
    if (e.length) {
        for (let n = 0; n < e.length; n++) e[n].delete(t);
        e.length = 0
    }
}
let fn = !0;
const Xu = [];

function mr() {
    Xu.push(fn), fn = !1
}

function yr() {
    const t = Xu.pop();
    fn = t === void 0 ? !0 : t
}

function at(t, e, n) {
    if (fn && xt) {
        let r = Ks.get(t);
        r || Ks.set(t, r = new Map);
        let s = r.get(n);
        s || r.set(n, s = Na()), Qu(s)
    }
}

function Qu(t, e) {
    let n = !1;
    Mr <= To ? Ju(t) || (t.n |= mn, n = !Yu(t)) : n = !t.has(xt), n && (t.add(xt), xt.deps.push(t))
}

function zt(t, e, n, r, s, i) {
    const o = Ks.get(t);
    if (!o) return;
    let a = [];
    if (e === "clear") a = [...o.values()];
    else if (n === "length" && Z(t)) {
        const l = Number(r);
        o.forEach((c, u) => {
            (u === "length" || u >= l) && a.push(c)
        })
    } else switch (n !== void 0 && a.push(o.get(n)), e) {
        case "add":
            Z(t) ? La(n) && a.push(o.get("length")) : (a.push(o.get(Mn)), Zn(t) && a.push(o.get(Po)));
            break;
        case "delete":
            Z(t) || (a.push(o.get(Mn)), Zn(t) && a.push(o.get(Po)));
            break;
        case "set":
            Zn(t) && a.push(o.get(Mn));
            break
    }
    if (a.length === 1) a[0] && Ro(a[0]);
    else {
        const l = [];
        for (const c of a) c && l.push(...c);
        Ro(Na(l))
    }
}

function Ro(t, e) {
    const n = Z(t) ? t : [...t];
    for (const r of n) r.computed && Tl(r);
    for (const r of n) r.computed || Tl(r)
}

function Tl(t, e) {
    (t !== xt || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run())
}

function _p(t, e) {
    var n;
    return (n = Ks.get(t)) == null ? void 0 : n.get(e)
}
const vp = $a("__proto__,__v_isRef,__isVue"),
    Zu = new Set(Object.getOwnPropertyNames(Symbol).filter(t => t !== "arguments" && t !== "caller").map(t => Symbol[t]).filter(Fa)),
    mp = ja(),
    yp = ja(!1, !0),
    bp = ja(!0),
    Pl = wp();

function wp() {
    const t = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(e => {
        t[e] = function(...n) {
            const r = le(this);
            for (let i = 0, o = this.length; i < o; i++) at(r, "get", i + "");
            const s = r[e](...n);
            return s === -1 || s === !1 ? r[e](...n.map(le)) : s
        }
    }), ["push", "pop", "shift", "unshift", "splice"].forEach(e => {
        t[e] = function(...n) {
            mr();
            const r = le(this)[e].apply(this, n);
            return yr(), r
        }
    }), t
}

function Ep(t) {
    const e = le(this);
    return at(e, "has", t), e.hasOwnProperty(t)
}

function ja(t = !1, e = !1) {
    return function(r, s, i) {
        if (s === "__v_isReactive") return !t;
        if (s === "__v_isReadonly") return t;
        if (s === "__v_isShallow") return e;
        if (s === "__v_raw" && i === (t ? e ? Dp : sf : e ? rf : nf).get(r)) return r;
        const o = Z(r);
        if (!t) {
            if (o && ce(Pl, s)) return Reflect.get(Pl, s, i);
            if (s === "hasOwnProperty") return Ep
        }
        const a = Reflect.get(r, s, i);
        return (Fa(s) ? Zu.has(s) : vp(s)) || (t || at(r, "get", s), e) ? a : De(a) ? o && La(s) ? a : a.value : ye(a) ? t ? of (a) : Gt(a) : a
    }
}
const xp = ef(),
    kp = ef(!0);

function ef(t = !1) {
    return function(n, r, s, i) {
        let o = n[r];
        if (Dn(o) && De(o) && !De(s)) return !1;
        if (!t && (!zs(s) && !Dn(s) && (o = le(o), s = le(s)), !Z(n) && De(o) && !De(s))) return o.value = s, !0;
        const a = Z(n) && La(r) ? Number(r) < n.length : ce(n, r),
            l = Reflect.set(n, r, s, i);
        return n === le(i) && (a ? ns(s, o) && zt(n, "set", r, s) : zt(n, "add", r, s)), l
    }
}

function Cp(t, e) {
    const n = ce(t, e);
    t[e];
    const r = Reflect.deleteProperty(t, e);
    return r && n && zt(t, "delete", e, void 0), r
}

function Sp(t, e) {
    const n = Reflect.has(t, e);
    return (!Fa(e) || !Zu.has(e)) && at(t, "has", e), n
}

function Tp(t) {
    return at(t, "iterate", Z(t) ? "length" : Mn), Reflect.ownKeys(t)
}
const tf = {
        get: mp,
        set: xp,
        deleteProperty: Cp,
        has: Sp,
        ownKeys: Tp
    },
    Pp = {
        get: bp,
        set(t, e) {
            return !0
        },
        deleteProperty(t, e) {
            return !0
        }
    },
    Rp = Fe({}, tf, {
        get: yp,
        set: kp
    }),
    Ha = t => t,
    Ci = t => Reflect.getPrototypeOf(t);

function Es(t, e, n = !1, r = !1) {
    t = t.__v_raw;
    const s = le(t),
        i = le(e);
    n || (e !== i && at(s, "get", e), at(s, "get", i));
    const {
        has: o
    } = Ci(s), a = r ? Ha : n ? qa : rs;
    if (o.call(s, e)) return a(t.get(e));
    if (o.call(s, i)) return a(t.get(i));
    t !== s && t.get(e)
}

function xs(t, e = !1) {
    const n = this.__v_raw,
        r = le(n),
        s = le(t);
    return e || (t !== s && at(r, "has", t), at(r, "has", s)), t === s ? n.has(t) : n.has(t) || n.has(s)
}

function ks(t, e = !1) {
    return t = t.__v_raw, !e && at(le(t), "iterate", Mn), Reflect.get(t, "size", t)
}

function Rl(t) {
    t = le(t);
    const e = le(this);
    return Ci(e).has.call(e, t) || (e.add(t), zt(e, "add", t, t)), this
}

function Al(t, e) {
    e = le(e);
    const n = le(this),
        {
            has: r,
            get: s
        } = Ci(n);
    let i = r.call(n, t);
    i || (t = le(t), i = r.call(n, t));
    const o = s.call(n, t);
    return n.set(t, e), i ? ns(e, o) && zt(n, "set", t, e) : zt(n, "add", t, e), this
}

function $l(t) {
    const e = le(this),
        {
            has: n,
            get: r
        } = Ci(e);
    let s = n.call(e, t);
    s || (t = le(t), s = n.call(e, t)), r && r.call(e, t);
    const i = e.delete(t);
    return s && zt(e, "delete", t, void 0), i
}

function Il() {
    const t = le(this),
        e = t.size !== 0,
        n = t.clear();
    return e && zt(t, "clear", void 0, void 0), n
}

function Cs(t, e) {
    return function(r, s) {
        const i = this,
            o = i.__v_raw,
            a = le(o),
            l = e ? Ha : t ? qa : rs;
        return !t && at(a, "iterate", Mn), o.forEach((c, u) => r.call(s, l(c), l(u), i))
    }
}

function Ss(t, e, n) {
    return function(...r) {
        const s = this.__v_raw,
            i = le(s),
            o = Zn(i),
            a = t === "entries" || t === Symbol.iterator && o,
            l = t === "keys" && o,
            c = s[t](...r),
            u = n ? Ha : e ? qa : rs;
        return !e && at(i, "iterate", l ? Po : Mn), {
            next() {
                const {
                    value: f,
                    done: h
                } = c.next();
                return h ? {
                    value: f,
                    done: h
                } : {
                    value: a ? [u(f[0]), u(f[1])] : u(f),
                    done: h
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function Zt(t) {
    return function(...e) {
        return t === "delete" ? !1 : this
    }
}

function Ap() {
    const t = {
            get(i) {
                return Es(this, i)
            },
            get size() {
                return ks(this)
            },
            has: xs,
            add: Rl,
            set: Al,
            delete: $l,
            clear: Il,
            forEach: Cs(!1, !1)
        },
        e = {
            get(i) {
                return Es(this, i, !1, !0)
            },
            get size() {
                return ks(this)
            },
            has: xs,
            add: Rl,
            set: Al,
            delete: $l,
            clear: Il,
            forEach: Cs(!1, !0)
        },
        n = {
            get(i) {
                return Es(this, i, !0)
            },
            get size() {
                return ks(this, !0)
            },
            has(i) {
                return xs.call(this, i, !0)
            },
            add: Zt("add"),
            set: Zt("set"),
            delete: Zt("delete"),
            clear: Zt("clear"),
            forEach: Cs(!0, !1)
        },
        r = {
            get(i) {
                return Es(this, i, !0, !0)
            },
            get size() {
                return ks(this, !0)
            },
            has(i) {
                return xs.call(this, i, !0)
            },
            add: Zt("add"),
            set: Zt("set"),
            delete: Zt("delete"),
            clear: Zt("clear"),
            forEach: Cs(!0, !0)
        };
    return ["keys", "values", "entries", Symbol.iterator].forEach(i => {
        t[i] = Ss(i, !1, !1), n[i] = Ss(i, !0, !1), e[i] = Ss(i, !1, !0), r[i] = Ss(i, !0, !0)
    }), [t, n, e, r]
}
const [$p, Ip, Op, Fp] = Ap();

function Ua(t, e) {
    const n = e ? t ? Fp : Op : t ? Ip : $p;
    return (r, s, i) => s === "__v_isReactive" ? !t : s === "__v_isReadonly" ? t : s === "__v_raw" ? r : Reflect.get(ce(n, s) && s in r ? n : r, s, i)
}
const Mp = {
        get: Ua(!1, !1)
    },
    Lp = {
        get: Ua(!1, !0)
    },
    Np = {
        get: Ua(!0, !1)
    },
    nf = new WeakMap,
    rf = new WeakMap,
    sf = new WeakMap,
    Dp = new WeakMap;

function jp(t) {
    switch (t) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0
    }
}

function Hp(t) {
    return t.__v_skip || !Object.isExtensible(t) ? 0 : jp(ep(t))
}

function Gt(t) {
    return Dn(t) ? t : Ba(t, !1, tf, Mp, nf)
}

function vs(t) {
    return Ba(t, !1, Rp, Lp, rf)
}

function of (t) {
    return Ba(t, !0, Pp, Np, sf)
}

function Ba(t, e, n, r, s) {
    if (!ye(t) || t.__v_raw && !(e && t.__v_isReactive)) return t;
    const i = s.get(t);
    if (i) return i;
    const o = Hp(t);
    if (o === 0) return t;
    const a = new Proxy(t, o === 2 ? r : n);
    return s.set(t, a), a
}

function er(t) {
    return Dn(t) ? er(t.__v_raw) : !!(t && t.__v_isReactive)
}

function Dn(t) {
    return !!(t && t.__v_isReadonly)
}

function zs(t) {
    return !!(t && t.__v_isShallow)
}

function af(t) {
    return er(t) || Dn(t)
}

function le(t) {
    const e = t && t.__v_raw;
    return e ? le(e) : t
}

function lf(t) {
    return Vs(t, "__v_skip", !0), t
}
const rs = t => ye(t) ? Gt(t) : t,
    qa = t => ye(t) ? of (t) : t;

function cf(t) {
    fn && xt && (t = le(t), Qu(t.dep || (t.dep = Na())))
}

function uf(t, e) {
    t = le(t);
    const n = t.dep;
    n && Ro(n)
}

function De(t) {
    return !!(t && t.__v_isRef === !0)
}

function St(t) {
    return ff(t, !1)
}

function ss(t) {
    return ff(t, !0)
}

function ff(t, e) {
    return De(t) ? t : new Up(t, e)
}
class Up {
    constructor(e, n) {
        this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? e : le(e), this._value = n ? e : rs(e)
    }
    get value() {
        return cf(this), this._value
    }
    set value(e) {
        const n = this.__v_isShallow || zs(e) || Dn(e);
        e = n ? e : le(e), ns(e, this._rawValue) && (this._rawValue = e, this._value = n ? e : rs(e), uf(this))
    }
}

function xe(t) {
    return De(t) ? t.value : t
}
const Bp = {
    get: (t, e, n) => xe(Reflect.get(t, e, n)),
    set: (t, e, n, r) => {
        const s = t[e];
        return De(s) && !De(n) ? (s.value = n, !0) : Reflect.set(t, e, n, r)
    }
};

function hf(t) {
    return er(t) ? t : new Proxy(t, Bp)
}
class qp {
    constructor(e, n, r) {
        this._object = e, this._key = n, this._defaultValue = r, this.__v_isRef = !0
    }
    get value() {
        const e = this._object[this._key];
        return e === void 0 ? this._defaultValue : e
    }
    set value(e) {
        this._object[this._key] = e
    }
    get dep() {
        return _p(le(this._object), this._key)
    }
}
class Wp {
    constructor(e) {
        this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0
    }
    get value() {
        return this._getter()
    }
}

function Vp(t, e, n) {
    return De(t) ? t : te(t) ? new Wp(t) : ye(t) && arguments.length > 1 ? Kp(t, e, n) : St(t)
}

function Kp(t, e, n) {
    const r = t[e];
    return De(r) ? r : new qp(t, e, n)
}
class zp {
    constructor(e, n, r, s) {
        this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Da(e, () => {
            this._dirty || (this._dirty = !0, uf(this))
        }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = r
    }
    get value() {
        const e = le(this);
        return cf(e), (e._dirty || !e._cacheable) && (e._dirty = !1, e._value = e.effect.run()), e._value
    }
    set value(e) {
        this._setter(e)
    }
}

function Gp(t, e, n = !1) {
    let r, s;
    const i = te(t);
    return i ? (r = t, s = Ct) : (r = t.get, s = t.set), new zp(r, s, i || !s, n)
}

function hn(t, e, n, r) {
    let s;
    try {
        s = r ? t(...r) : t()
    } catch (i) {
        br(i, e, n)
    }
    return s
}

function _t(t, e, n, r) {
    if (te(t)) {
        const i = hn(t, e, n, r);
        return i && Ma(i) && i.catch(o => {
            br(o, e, n)
        }), i
    }
    const s = [];
    for (let i = 0; i < t.length; i++) s.push(_t(t[i], e, n, r));
    return s
}

function br(t, e, n, r = !0) {
    const s = e ? e.vnode : null;
    if (e) {
        let i = e.parent;
        const o = e.proxy,
            a = n;
        for (; i;) {
            const c = i.ec;
            if (c) {
                for (let u = 0; u < c.length; u++)
                    if (c[u](t, o, a) === !1) return
            }
            i = i.parent
        }
        const l = e.appContext.config.errorHandler;
        if (l) {
            hn(l, null, 10, [t, o, a]);
            return
        }
    }
    Yp(t, n, s, r)
}

function Yp(t, e, n, r = !0) {
    console.error(t)
}
let is = !1,
    Ao = !1;
const Ge = [];
let $t = 0;
const tr = [];
let Ht = null,
    An = 0;
const df = Promise.resolve();
let Wa = null;

function Un(t) {
    const e = Wa || df;
    return t ? e.then(this ? t.bind(this) : t) : e
}

function Jp(t) {
    let e = $t + 1,
        n = Ge.length;
    for (; e < n;) {
        const r = e + n >>> 1;
        os(Ge[r]) < t ? e = r + 1 : n = r
    }
    return e
}

function Si(t) {
    (!Ge.length || !Ge.includes(t, is && t.allowRecurse ? $t + 1 : $t)) && (t.id == null ? Ge.push(t) : Ge.splice(Jp(t.id), 0, t), pf())
}

function pf() {
    !is && !Ao && (Ao = !0, Wa = df.then(_f))
}

function Xp(t) {
    const e = Ge.indexOf(t);
    e > $t && Ge.splice(e, 1)
}

function gf(t) {
    Z(t) ? tr.push(...t) : (!Ht || !Ht.includes(t, t.allowRecurse ? An + 1 : An)) && tr.push(t), pf()
}

function Ol(t, e = is ? $t + 1 : 0) {
    for (; e < Ge.length; e++) {
        const n = Ge[e];
        n && n.pre && (Ge.splice(e, 1), e--, n())
    }
}

function Gs(t) {
    if (tr.length) {
        const e = [...new Set(tr)];
        if (tr.length = 0, Ht) {
            Ht.push(...e);
            return
        }
        for (Ht = e, Ht.sort((n, r) => os(n) - os(r)), An = 0; An < Ht.length; An++) Ht[An]();
        Ht = null, An = 0
    }
}
const os = t => t.id == null ? 1 / 0 : t.id,
    Qp = (t, e) => {
        const n = os(t) - os(e);
        if (n === 0) {
            if (t.pre && !e.pre) return -1;
            if (e.pre && !t.pre) return 1
        }
        return n
    };

function _f(t) {
    Ao = !1, is = !0, Ge.sort(Qp);
    const e = Ct;
    try {
        for ($t = 0; $t < Ge.length; $t++) {
            const n = Ge[$t];
            n && n.active !== !1 && hn(n, null, 14)
        }
    } finally {
        $t = 0, Ge.length = 0, Gs(), is = !1, Wa = null, (Ge.length || tr.length) && _f()
    }
}

function Zp(t, e, ...n) {
    if (t.isUnmounted) return;
    const r = t.vnode.props || we;
    let s = n;
    const i = e.startsWith("update:"),
        o = i && e.slice(7);
    if (o && o in r) {
        const u = `${o==="modelValue"?"model":o}Modifiers`,
            {
                number: f,
                trim: h
            } = r[u] || we;
        h && (s = n.map(d => Ce(d) ? d.trim() : d)), f && (s = n.map(rp))
    }
    let a, l = r[a = Ki(e)] || r[a = Ki(Lt(e))];
    !l && i && (l = r[a = Ki(vr(e))]), l && _t(l, t, 6, s);
    const c = r[a + "Once"];
    if (c) {
        if (!t.emitted) t.emitted = {};
        else if (t.emitted[a]) return;
        t.emitted[a] = !0, _t(c, t, 6, s)
    }
}

function vf(t, e, n = !1) {
    const r = e.emitsCache,
        s = r.get(t);
    if (s !== void 0) return s;
    const i = t.emits;
    let o = {},
        a = !1;
    if (!te(t)) {
        const l = c => {
            const u = vf(c, e, !0);
            u && (a = !0, Fe(o, u))
        };
        !n && e.mixins.length && e.mixins.forEach(l), t.extends && l(t.extends), t.mixins && t.mixins.forEach(l)
    }
    return !i && !a ? (ye(t) && r.set(t, null), null) : (Z(i) ? i.forEach(l => o[l] = null) : Fe(o, i), ye(t) && r.set(t, o), o)
}

function Ti(t, e) {
    return !t || !gs(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), ce(t, e[0].toLowerCase() + e.slice(1)) || ce(t, vr(e)) || ce(t, e))
}
let je = null,
    Pi = null;

function Ys(t) {
    const e = je;
    return je = t, Pi = t && t.type.__scopeId || null, e
}

function Kw(t) {
    Pi = t
}

function zw() {
    Pi = null
}

function Va(t, e = je, n) {
    if (!e || t._n) return t;
    const r = (...s) => {
        r._d && Gl(-1);
        const i = Ys(e);
        let o;
        try {
            o = t(...s)
        } finally {
            Ys(i), r._d && Gl(1)
        }
        return o
    };
    return r._n = !0, r._c = !0, r._d = !0, r
}

function zi(t) {
    const {
        type: e,
        vnode: n,
        proxy: r,
        withProxy: s,
        props: i,
        propsOptions: [o],
        slots: a,
        attrs: l,
        emit: c,
        render: u,
        renderCache: f,
        data: h,
        setupState: d,
        ctx: _,
        inheritAttrs: y
    } = t;
    let E, m;
    const g = Ys(t);
    try {
        if (n.shapeFlag & 4) {
            const b = s || r;
            E = dt(u.call(b, b, f, i, d, h, _)), m = l
        } else {
            const b = e;
            E = dt(b.length > 1 ? b(i, {
                attrs: l,
                slots: a,
                emit: c
            }) : b(i, null)), m = e.props ? l : tg(l)
        }
    } catch (b) {
        Yr.length = 0, br(b, t, 1), E = Te(tt)
    }
    let x = E;
    if (m && y !== !1) {
        const b = Object.keys(m),
            {
                shapeFlag: S
            } = x;
        b.length && S & 7 && (o && b.some(Ia) && (m = ng(m, o)), x = Yt(x, m))
    }
    return n.dirs && (x = Yt(x), x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs), n.transition && (x.transition = n.transition), E = x, Ys(g), E
}

function eg(t) {
    let e;
    for (let n = 0; n < t.length; n++) {
        const r = t[n];
        if (cr(r)) {
            if (r.type !== tt || r.children === "v-if") {
                if (e) return;
                e = r
            }
        } else return
    }
    return e
}
const tg = t => {
        let e;
        for (const n in t)(n === "class" || n === "style" || gs(n)) && ((e || (e = {}))[n] = t[n]);
        return e
    },
    ng = (t, e) => {
        const n = {};
        for (const r in t)(!Ia(r) || !(r.slice(9) in e)) && (n[r] = t[r]);
        return n
    };

function rg(t, e, n) {
    const {
        props: r,
        children: s,
        component: i
    } = t, {
        props: o,
        children: a,
        patchFlag: l
    } = e, c = i.emitsOptions;
    if (e.dirs || e.transition) return !0;
    if (n && l >= 0) {
        if (l & 1024) return !0;
        if (l & 16) return r ? Fl(r, o, c) : !!o;
        if (l & 8) {
            const u = e.dynamicProps;
            for (let f = 0; f < u.length; f++) {
                const h = u[f];
                if (o[h] !== r[h] && !Ti(c, h)) return !0
            }
        }
    } else return (s || a) && (!a || !a.$stable) ? !0 : r === o ? !1 : r ? o ? Fl(r, o, c) : !0 : !!o;
    return !1
}

function Fl(t, e, n) {
    const r = Object.keys(e);
    if (r.length !== Object.keys(t).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const i = r[s];
        if (e[i] !== t[i] && !Ti(n, i)) return !0
    }
    return !1
}

function Ka({
    vnode: t,
    parent: e
}, n) {
    for (; e && e.subTree === t;)(t = e.vnode).el = n, e = e.parent
}
const mf = t => t.__isSuspense,
    sg = {
        name: "Suspense",
        __isSuspense: !0,
        process(t, e, n, r, s, i, o, a, l, c) {
            t == null ? ig(e, n, r, s, i, o, a, l, c) : og(t, e, n, r, s, o, a, l, c)
        },
        hydrate: ag,
        create: Ga,
        normalize: lg
    },
    za = sg;

function as(t, e) {
    const n = t.props && t.props[e];
    te(n) && n()
}

function ig(t, e, n, r, s, i, o, a, l) {
    const {
        p: c,
        o: {
            createElement: u
        }
    } = l, f = u("div"), h = t.suspense = Ga(t, s, r, e, f, n, i, o, a, l);
    c(null, h.pendingBranch = t.ssContent, f, null, r, h, i, o), h.deps > 0 ? (as(t, "onPending"), as(t, "onFallback"), c(null, t.ssFallback, e, n, r, null, i, o), nr(h, t.ssFallback)) : h.resolve(!1, !0)
}

function og(t, e, n, r, s, i, o, a, {
    p: l,
    um: c,
    o: {
        createElement: u
    }
}) {
    const f = e.suspense = t.suspense;
    f.vnode = e, e.el = t.el;
    const h = e.ssContent,
        d = e.ssFallback,
        {
            activeBranch: _,
            pendingBranch: y,
            isInFallback: E,
            isHydrating: m
        } = f;
    if (y) f.pendingBranch = h, kt(h, y) ? (l(y, h, f.hiddenContainer, null, s, f, i, o, a), f.deps <= 0 ? f.resolve() : E && (l(_, d, n, r, s, null, i, o, a), nr(f, d))) : (f.pendingId++, m ? (f.isHydrating = !1, f.activeBranch = y) : c(y, s, f), f.deps = 0, f.effects.length = 0, f.hiddenContainer = u("div"), E ? (l(null, h, f.hiddenContainer, null, s, f, i, o, a), f.deps <= 0 ? f.resolve() : (l(_, d, n, r, s, null, i, o, a), nr(f, d))) : _ && kt(h, _) ? (l(_, h, n, r, s, f, i, o, a), f.resolve(!0)) : (l(null, h, f.hiddenContainer, null, s, f, i, o, a), f.deps <= 0 && f.resolve()));
    else if (_ && kt(h, _)) l(_, h, n, r, s, f, i, o, a), nr(f, h);
    else if (as(e, "onPending"), f.pendingBranch = h, f.pendingId++, l(null, h, f.hiddenContainer, null, s, f, i, o, a), f.deps <= 0) f.resolve();
    else {
        const {
            timeout: g,
            pendingId: x
        } = f;
        g > 0 ? setTimeout(() => {
            f.pendingId === x && f.fallback(d)
        }, g) : g === 0 && f.fallback(d)
    }
}

function Ga(t, e, n, r, s, i, o, a, l, c, u = !1) {
    const {
        p: f,
        m: h,
        um: d,
        n: _,
        o: {
            parentNode: y,
            remove: E
        }
    } = c;
    let m;
    const g = cg(t);
    g && e != null && e.pendingBranch && (m = e.pendingId, e.deps++);
    const x = t.props ? Ku(t.props.timeout) : void 0,
        b = {
            vnode: t,
            parent: e,
            parentComponent: n,
            isSVG: o,
            container: r,
            hiddenContainer: s,
            anchor: i,
            deps: 0,
            pendingId: 0,
            timeout: typeof x == "number" ? x : -1,
            activeBranch: null,
            pendingBranch: null,
            isInFallback: !0,
            isHydrating: u,
            isUnmounted: !1,
            effects: [],
            resolve(S = !1, $ = !1) {
                const {
                    vnode: O,
                    activeBranch: k,
                    pendingBranch: H,
                    pendingId: D,
                    effects: z,
                    parentComponent: M,
                    container: J
                } = b;
                if (b.isHydrating) b.isHydrating = !1;
                else if (!S) {
                    const re = k && H.transition && H.transition.mode === "out-in";
                    re && (k.transition.afterLeave = () => {
                        D === b.pendingId && h(H, J, se, 0)
                    });
                    let {
                        anchor: se
                    } = b;
                    k && (se = _(k), d(k, M, b, !0)), re || h(H, J, se, 0)
                }
                nr(b, H), b.pendingBranch = null, b.isInFallback = !1;
                let j = b.parent,
                    fe = !1;
                for (; j;) {
                    if (j.pendingBranch) {
                        j.effects.push(...z), fe = !0;
                        break
                    }
                    j = j.parent
                }
                fe || gf(z), b.effects = [], g && e && e.pendingBranch && m === e.pendingId && (e.deps--, e.deps === 0 && !$ && e.resolve()), as(O, "onResolve")
            },
            fallback(S) {
                if (!b.pendingBranch) return;
                const {
                    vnode: $,
                    activeBranch: O,
                    parentComponent: k,
                    container: H,
                    isSVG: D
                } = b;
                as($, "onFallback");
                const z = _(O),
                    M = () => {
                        b.isInFallback && (f(null, S, H, z, k, null, D, a, l), nr(b, S))
                    },
                    J = S.transition && S.transition.mode === "out-in";
                J && (O.transition.afterLeave = M), b.isInFallback = !0, d(O, k, null, !0), J || M()
            },
            move(S, $, O) {
                b.activeBranch && h(b.activeBranch, S, $, O), b.container = S
            },
            next() {
                return b.activeBranch && _(b.activeBranch)
            },
            registerDep(S, $) {
                const O = !!b.pendingBranch;
                O && b.deps++;
                const k = S.vnode.el;
                S.asyncDep.catch(H => {
                    br(H, S, 0)
                }).then(H => {
                    if (S.isUnmounted || b.isUnmounted || b.pendingId !== S.suspenseId) return;
                    S.asyncResolved = !0;
                    const {
                        vnode: D
                    } = S;
                    No(S, H, !1), k && (D.el = k);
                    const z = !k && S.subTree.el;
                    $(S, D, y(k || S.subTree.el), k ? null : _(S.subTree), b, o, l), z && E(z), Ka(S, D.el), O && --b.deps === 0 && b.resolve()
                })
            },
            unmount(S, $) {
                b.isUnmounted = !0, b.activeBranch && d(b.activeBranch, n, S, $), b.pendingBranch && d(b.pendingBranch, n, S, $)
            }
        };
    return b
}

function ag(t, e, n, r, s, i, o, a, l) {
    const c = e.suspense = Ga(e, r, n, t.parentNode, document.createElement("div"), null, s, i, o, a, !0),
        u = l(t, c.pendingBranch = e.ssContent, n, c, i, o);
    return c.deps === 0 && c.resolve(!1, !0), u
}

function lg(t) {
    const {
        shapeFlag: e,
        children: n
    } = t, r = e & 32;
    t.ssContent = Ml(r ? n.default : n), t.ssFallback = r ? Ml(n.fallback) : Te(tt)
}

function Ml(t) {
    let e;
    if (te(t)) {
        const n = lr && t._c;
        n && (t._d = !1, It()), t = t(), n && (t._d = !0, e = gt, Bf())
    }
    return Z(t) && (t = eg(t)), t = dt(t), e && !t.dynamicChildren && (t.dynamicChildren = e.filter(n => n !== t)), t
}

function yf(t, e) {
    e && e.pendingBranch ? Z(t) ? e.effects.push(...t) : e.effects.push(t) : gf(t)
}

function nr(t, e) {
    t.activeBranch = e;
    const {
        vnode: n,
        parentComponent: r
    } = t, s = n.el = e.el;
    r && r.subTree === n && (r.vnode.el = s, Ka(r, s))
}

function cg(t) {
    var e;
    return ((e = t.props) == null ? void 0 : e.suspensible) != null && t.props.suspensible !== !1
}

function ug(t, e) {
    return Ri(t, null, e)
}

function fg(t, e) {
    return Ri(t, null, {
        flush: "post"
    })
}
const Ts = {};

function rr(t, e, n) {
    return Ri(t, e, n)
}

function Ri(t, e, {
    immediate: n,
    deep: r,
    flush: s,
    onTrack: i,
    onTrigger: o
} = we) {
    var a;
    const l = dp() === ((a = Ie) == null ? void 0 : a.scope) ? Ie : null;
    let c, u = !1,
        f = !1;
    if (De(t) ? (c = () => t.value, u = zs(t)) : er(t) ? (c = () => t, r = !0) : Z(t) ? (f = !0, u = t.some(b => er(b) || zs(b)), c = () => t.map(b => {
            if (De(b)) return b.value;
            if (er(b)) return On(b);
            if (te(b)) return hn(b, l, 2)
        })) : te(t) ? e ? c = () => hn(t, l, 2) : c = () => {
            if (!(l && l.isUnmounted)) return h && h(), _t(t, l, 3, [d])
        } : c = Ct, e && r) {
        const b = c;
        c = () => On(b())
    }
    let h, d = b => {
            h = g.onStop = () => {
                hn(b, l, 4)
            }
        },
        _;
    if (ur)
        if (d = Ct, e ? n && _t(e, l, 3, [c(), f ? [] : void 0, d]) : c(), s === "sync") {
            const b = t_();
            _ = b.__watcherHandles || (b.__watcherHandles = [])
        } else return Ct;
    let y = f ? new Array(t.length).fill(Ts) : Ts;
    const E = () => {
        if (g.active)
            if (e) {
                const b = g.run();
                (r || u || (f ? b.some((S, $) => ns(S, y[$])) : ns(b, y))) && (h && h(), _t(e, l, 3, [b, y === Ts ? void 0 : f && y[0] === Ts ? [] : y, d]), y = b)
            } else g.run()
    };
    E.allowRecurse = !!e;
    let m;
    s === "sync" ? m = E : s === "post" ? m = () => We(E, l && l.suspense) : (E.pre = !0, l && (E.id = l.uid), m = () => Si(E));
    const g = new Da(c, m);
    e ? n ? E() : y = g.run() : s === "post" ? We(g.run.bind(g), l && l.suspense) : g.run();
    const x = () => {
        g.stop(), l && l.scope && Oa(l.scope.effects, g)
    };
    return _ && _.push(x), x
}

function hg(t, e, n) {
    const r = this.proxy,
        s = Ce(t) ? t.includes(".") ? bf(r, t) : () => r[t] : t.bind(r, r);
    let i;
    te(e) ? i = e : (i = e.handler, n = e);
    const o = Ie;
    yn(this);
    const a = Ri(s, i.bind(r), n);
    return o ? yn(o) : dn(), a
}

function bf(t, e) {
    const n = e.split(".");
    return () => {
        let r = t;
        for (let s = 0; s < n.length && r; s++) r = r[n[s]];
        return r
    }
}

function On(t, e) {
    if (!ye(t) || t.__v_skip || (e = e || new Set, e.has(t))) return t;
    if (e.add(t), De(t)) On(t.value, e);
    else if (Z(t))
        for (let n = 0; n < t.length; n++) On(t[n], e);
    else if (qu(t) || Zn(t)) t.forEach(n => {
        On(n, e)
    });
    else if (Vu(t))
        for (const n in t) On(t[n], e);
    return t
}

function Gw(t, e) {
    const n = je;
    if (n === null) return t;
    const r = Fi(n) || n.proxy,
        s = t.dirs || (t.dirs = []);
    for (let i = 0; i < e.length; i++) {
        let [o, a, l, c = we] = e[i];
        o && (te(o) && (o = {
            mounted: o,
            updated: o
        }), o.deep && On(a), s.push({
            dir: o,
            instance: r,
            value: a,
            oldValue: void 0,
            arg: l,
            modifiers: c
        }))
    }
    return t
}

function At(t, e, n, r) {
    const s = t.dirs,
        i = e && e.dirs;
    for (let o = 0; o < s.length; o++) {
        const a = s[o];
        i && (a.oldValue = i[o].value);
        let l = a.dir[r];
        l && (mr(), _t(l, n, 8, [t.el, a, t, e]), yr())
    }
}

function dg() {
    const t = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return $i(() => {
        t.isMounted = !0
    }), Ii(() => {
        t.isUnmounting = !0
    }), t
}
const ht = [Function, Array],
    wf = {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        onBeforeEnter: ht,
        onEnter: ht,
        onAfterEnter: ht,
        onEnterCancelled: ht,
        onBeforeLeave: ht,
        onLeave: ht,
        onAfterLeave: ht,
        onLeaveCancelled: ht,
        onBeforeAppear: ht,
        onAppear: ht,
        onAfterAppear: ht,
        onAppearCancelled: ht
    },
    pg = {
        name: "BaseTransition",
        props: wf,
        setup(t, {
            slots: e
        }) {
            const n = Bn(),
                r = dg();
            let s;
            return () => {
                const i = e.default && xf(e.default(), !0);
                if (!i || !i.length) return;
                let o = i[0];
                if (i.length > 1) {
                    for (const y of i)
                        if (y.type !== tt) {
                            o = y;
                            break
                        }
                }
                const a = le(t),
                    {
                        mode: l
                    } = a;
                if (r.isLeaving) return Gi(o);
                const c = Ll(o);
                if (!c) return Gi(o);
                const u = $o(c, a, r, n);
                Js(c, u);
                const f = n.subTree,
                    h = f && Ll(f);
                let d = !1;
                const {
                    getTransitionKey: _
                } = c.type;
                if (_) {
                    const y = _();
                    s === void 0 ? s = y : y !== s && (s = y, d = !0)
                }
                if (h && h.type !== tt && (!kt(c, h) || d)) {
                    const y = $o(h, a, r, n);
                    if (Js(h, y), l === "out-in") return r.isLeaving = !0, y.afterLeave = () => {
                        r.isLeaving = !1, n.update.active !== !1 && n.update()
                    }, Gi(o);
                    l === "in-out" && c.type !== tt && (y.delayLeave = (E, m, g) => {
                        const x = Ef(r, h);
                        x[String(h.key)] = h, E._leaveCb = () => {
                            m(), E._leaveCb = void 0, delete u.delayedLeave
                        }, u.delayedLeave = g
                    })
                }
                return o
            }
        }
    },
    gg = pg;

function Ef(t, e) {
    const {
        leavingVNodes: n
    } = t;
    let r = n.get(e.type);
    return r || (r = Object.create(null), n.set(e.type, r)), r
}

function $o(t, e, n, r) {
    const {
        appear: s,
        mode: i,
        persisted: o = !1,
        onBeforeEnter: a,
        onEnter: l,
        onAfterEnter: c,
        onEnterCancelled: u,
        onBeforeLeave: f,
        onLeave: h,
        onAfterLeave: d,
        onLeaveCancelled: _,
        onBeforeAppear: y,
        onAppear: E,
        onAfterAppear: m,
        onAppearCancelled: g
    } = e, x = String(t.key), b = Ef(n, t), S = (k, H) => {
        k && _t(k, r, 9, H)
    }, $ = (k, H) => {
        const D = H[1];
        S(k, H), Z(k) ? k.every(z => z.length <= 1) && D() : k.length <= 1 && D()
    }, O = {
        mode: i,
        persisted: o,
        beforeEnter(k) {
            let H = a;
            if (!n.isMounted)
                if (s) H = y || a;
                else return;
            k._leaveCb && k._leaveCb(!0);
            const D = b[x];
            D && kt(t, D) && D.el._leaveCb && D.el._leaveCb(), S(H, [k])
        },
        enter(k) {
            let H = l,
                D = c,
                z = u;
            if (!n.isMounted)
                if (s) H = E || l, D = m || c, z = g || u;
                else return;
            let M = !1;
            const J = k._enterCb = j => {
                M || (M = !0, j ? S(z, [k]) : S(D, [k]), O.delayedLeave && O.delayedLeave(), k._enterCb = void 0)
            };
            H ? $(H, [k, J]) : J()
        },
        leave(k, H) {
            const D = String(t.key);
            if (k._enterCb && k._enterCb(!0), n.isUnmounting) return H();
            S(f, [k]);
            let z = !1;
            const M = k._leaveCb = J => {
                z || (z = !0, H(), J ? S(_, [k]) : S(d, [k]), k._leaveCb = void 0, b[D] === t && delete b[D])
            };
            b[D] = t, h ? $(h, [k, M]) : M()
        },
        clone(k) {
            return $o(k, e, n, r)
        }
    };
    return O
}

function Gi(t) {
    if (ms(t)) return t = Yt(t), t.children = null, t
}

function Ll(t) {
    return ms(t) ? t.children ? t.children[0] : void 0 : t
}

function Js(t, e) {
    t.shapeFlag & 6 && t.component ? Js(t.component.subTree, e) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e
}

function xf(t, e = !1, n) {
    let r = [],
        s = 0;
    for (let i = 0; i < t.length; i++) {
        let o = t[i];
        const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
        o.type === Qe ? (o.patchFlag & 128 && s++, r = r.concat(xf(o.children, e, a))) : (e || o.type !== tt) && r.push(a != null ? Yt(o, {
            key: a
        }) : o)
    }
    if (s > 1)
        for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
    return r
}

function bn(t, e) {
    return te(t) ? (() => Fe({
        name: t.name
    }, e, {
        setup: t
    }))() : t
}
const Ln = t => !!t.type.__asyncLoader;

function Nl(t) {
    te(t) && (t = {
        loader: t
    });
    const {
        loader: e,
        loadingComponent: n,
        errorComponent: r,
        delay: s = 200,
        timeout: i,
        suspensible: o = !0,
        onError: a
    } = t;
    let l = null,
        c, u = 0;
    const f = () => (u++, l = null, h()),
        h = () => {
            let d;
            return l || (d = l = e().catch(_ => {
                if (_ = _ instanceof Error ? _ : new Error(String(_)), a) return new Promise((y, E) => {
                    a(_, () => y(f()), () => E(_), u + 1)
                });
                throw _
            }).then(_ => d !== l && l ? l : (_ && (_.__esModule || _[Symbol.toStringTag] === "Module") && (_ = _.default), c = _, _)))
        };
    return bn({
        name: "AsyncComponentWrapper",
        __asyncLoader: h,
        get __asyncResolved() {
            return c
        },
        setup() {
            const d = Ie;
            if (c) return () => Yi(c, d);
            const _ = g => {
                l = null, br(g, d, 13, !r)
            };
            if (o && d.suspense || ur) return h().then(g => () => Yi(g, d)).catch(g => (_(g), () => r ? Te(r, {
                error: g
            }) : null));
            const y = St(!1),
                E = St(),
                m = St(!!s);
            return s && setTimeout(() => {
                m.value = !1
            }, s), i != null && setTimeout(() => {
                if (!y.value && !E.value) {
                    const g = new Error(`Async component timed out after ${i}ms.`);
                    _(g), E.value = g
                }
            }, i), h().then(() => {
                y.value = !0, d.parent && ms(d.parent.vnode) && Si(d.parent.update)
            }).catch(g => {
                _(g), E.value = g
            }), () => {
                if (y.value && c) return Yi(c, d);
                if (E.value && r) return Te(r, {
                    error: E.value
                });
                if (n && !m.value) return Te(n)
            }
        }
    })
}

function Yi(t, e) {
    const {
        ref: n,
        props: r,
        children: s,
        ce: i
    } = e.vnode, o = Te(t, r, s);
    return o.ref = n, o.ce = i, delete e.vnode.ce, o
}
const ms = t => t.type.__isKeepAlive,
    _g = {
        name: "KeepAlive",
        __isKeepAlive: !0,
        props: {
            include: [String, RegExp, Array],
            exclude: [String, RegExp, Array],
            max: [String, Number]
        },
        setup(t, {
            slots: e
        }) {
            const n = Bn(),
                r = n.ctx;
            if (!r.renderer) return () => {
                const g = e.default && e.default();
                return g && g.length === 1 ? g[0] : g
            };
            const s = new Map,
                i = new Set;
            let o = null;
            const a = n.suspense,
                {
                    renderer: {
                        p: l,
                        m: c,
                        um: u,
                        o: {
                            createElement: f
                        }
                    }
                } = r,
                h = f("div");
            r.activate = (g, x, b, S, $) => {
                const O = g.component;
                c(g, x, b, 0, a), l(O.vnode, g, x, b, O, a, S, g.slotScopeIds, $), We(() => {
                    O.isDeactivated = !1, O.a && Kr(O.a);
                    const k = g.props && g.props.onVnodeMounted;
                    k && rt(k, O.parent, g)
                }, a)
            }, r.deactivate = g => {
                const x = g.component;
                c(g, h, null, 1, a), We(() => {
                    x.da && Kr(x.da);
                    const b = g.props && g.props.onVnodeUnmounted;
                    b && rt(b, x.parent, g), x.isDeactivated = !0
                }, a)
            };

            function d(g) {
                Ji(g), u(g, n, a, !0)
            }

            function _(g) {
                s.forEach((x, b) => {
                    const S = Do(x.type);
                    S && (!g || !g(S)) && y(b)
                })
            }

            function y(g) {
                const x = s.get(g);
                !o || !kt(x, o) ? d(x) : o && Ji(o), s.delete(g), i.delete(g)
            }
            rr(() => [t.include, t.exclude], ([g, x]) => {
                g && _(b => Lr(g, b)), x && _(b => !Lr(x, b))
            }, {
                flush: "post",
                deep: !0
            });
            let E = null;
            const m = () => {
                E != null && s.set(E, Xi(n.subTree))
            };
            return $i(m), Tf(m), Ii(() => {
                s.forEach(g => {
                    const {
                        subTree: x,
                        suspense: b
                    } = n, S = Xi(x);
                    if (g.type === S.type && g.key === S.key) {
                        Ji(S);
                        const $ = S.component.da;
                        $ && We($, b);
                        return
                    }
                    d(g)
                })
            }), () => {
                if (E = null, !e.default) return null;
                const g = e.default(),
                    x = g[0];
                if (g.length > 1) return o = null, g;
                if (!cr(x) || !(x.shapeFlag & 4) && !(x.shapeFlag & 128)) return o = null, x;
                let b = Xi(x);
                const S = b.type,
                    $ = Do(Ln(b) ? b.type.__asyncResolved || {} : S),
                    {
                        include: O,
                        exclude: k,
                        max: H
                    } = t;
                if (O && (!$ || !Lr(O, $)) || k && $ && Lr(k, $)) return o = b, x;
                const D = b.key == null ? S : b.key,
                    z = s.get(D);
                return b.el && (b = Yt(b), x.shapeFlag & 128 && (x.ssContent = b)), E = D, z ? (b.el = z.el, b.component = z.component, b.transition && Js(b, b.transition), b.shapeFlag |= 512, i.delete(D), i.add(D)) : (i.add(D), H && i.size > parseInt(H, 10) && y(i.values().next().value)), b.shapeFlag |= 256, o = b, mf(x.type) ? x : b
            }
        }
    },
    vg = _g;

function Lr(t, e) {
    return Z(t) ? t.some(n => Lr(n, e)) : Ce(t) ? t.split(",").includes(e) : Zd(t) ? t.test(e) : !1
}

function kf(t, e) {
    Sf(t, "a", e)
}

function Cf(t, e) {
    Sf(t, "da", e)
}

function Sf(t, e, n = Ie) {
    const r = t.__wdc || (t.__wdc = () => {
        let s = n;
        for (; s;) {
            if (s.isDeactivated) return;
            s = s.parent
        }
        return t()
    });
    if (Ai(e, r, n), n) {
        let s = n.parent;
        for (; s && s.parent;) ms(s.parent.vnode) && mg(r, e, n, s), s = s.parent
    }
}

function mg(t, e, n, r) {
    const s = Ai(e, t, r, !0);
    Ya(() => {
        Oa(r[e], s)
    }, n)
}

function Ji(t) {
    t.shapeFlag &= -257, t.shapeFlag &= -513
}

function Xi(t) {
    return t.shapeFlag & 128 ? t.ssContent : t
}

function Ai(t, e, n = Ie, r = !1) {
    if (n) {
        const s = n[t] || (n[t] = []),
            i = e.__weh || (e.__weh = (...o) => {
                if (n.isUnmounted) return;
                mr(), yn(n);
                const a = _t(e, n, t, o);
                return dn(), yr(), a
            });
        return r ? s.unshift(i) : s.push(i), i
    }
}
const Jt = t => (e, n = Ie) => (!ur || t === "sp") && Ai(t, (...r) => e(...r), n),
    yg = Jt("bm"),
    $i = Jt("m"),
    bg = Jt("bu"),
    Tf = Jt("u"),
    Ii = Jt("bum"),
    Ya = Jt("um"),
    wg = Jt("sp"),
    Eg = Jt("rtg"),
    xg = Jt("rtc");

function Pf(t, e = Ie) {
    Ai("ec", t, e)
}
const Ja = "components";

function Yw(t, e) {
    return Af(Ja, t, !0, e) || t
}
const Rf = Symbol.for("v-ndc");

function kg(t) {
    return Ce(t) ? Af(Ja, t, !1) || t : t || Rf
}

function Af(t, e, n = !0, r = !1) {
    const s = je || Ie;
    if (s) {
        const i = s.type;
        if (t === Ja) {
            const a = Do(i, !1);
            if (a && (a === e || a === Lt(e) || a === Ei(Lt(e)))) return i
        }
        const o = Dl(s[t] || i[t], e) || Dl(s.appContext[t], e);
        return !o && r ? i : o
    }
}

function Dl(t, e) {
    return t && (t[e] || t[Lt(e)] || t[Ei(Lt(e))])
}

function Jw(t, e, n, r) {
    let s;
    const i = n && n[r];
    if (Z(t) || Ce(t)) {
        s = new Array(t.length);
        for (let o = 0, a = t.length; o < a; o++) s[o] = e(t[o], o, void 0, i && i[o])
    } else if (typeof t == "number") {
        s = new Array(t);
        for (let o = 0; o < t; o++) s[o] = e(o + 1, o, void 0, i && i[o])
    } else if (ye(t))
        if (t[Symbol.iterator]) s = Array.from(t, (o, a) => e(o, a, void 0, i && i[a]));
        else {
            const o = Object.keys(t);
            s = new Array(o.length);
            for (let a = 0, l = o.length; a < l; a++) {
                const c = o[a];
                s[a] = e(t[c], c, a, i && i[a])
            }
        }
    else s = [];
    return n && (n[r] = s), s
}

function Xw(t, e, n = {}, r, s) {
    if (je.isCE || je.parent && Ln(je.parent) && je.parent.isCE) return e !== "default" && (n.name = e), Te("slot", n, r && r());
    let i = t[e];
    i && i._c && (i._d = !1), It();
    const o = i && $f(i(n)),
        a = Wt(Qe, {
            key: n.key || o && o.key || `_${e}`
        }, o || (r ? r() : []), o && t._ === 1 ? 64 : -2);
    return !s && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a
}

function $f(t) {
    return t.some(e => cr(e) ? !(e.type === tt || e.type === Qe && !$f(e.children)) : !0) ? t : null
}
const Io = t => t ? Yf(t) ? Fi(t) || t.proxy : Io(t.parent) : null,
    zr = Fe(Object.create(null), {
        $: t => t,
        $el: t => t.vnode.el,
        $data: t => t.data,
        $props: t => t.props,
        $attrs: t => t.attrs,
        $slots: t => t.slots,
        $refs: t => t.refs,
        $parent: t => Io(t.parent),
        $root: t => Io(t.root),
        $emit: t => t.emit,
        $options: t => Xa(t),
        $forceUpdate: t => t.f || (t.f = () => Si(t.update)),
        $nextTick: t => t.n || (t.n = Un.bind(t.proxy)),
        $watch: t => hg.bind(t)
    }),
    Qi = (t, e) => t !== we && !t.__isScriptSetup && ce(t, e),
    Cg = {
        get({
            _: t
        }, e) {
            const {
                ctx: n,
                setupState: r,
                data: s,
                props: i,
                accessCache: o,
                type: a,
                appContext: l
            } = t;
            let c;
            if (e[0] !== "$") {
                const d = o[e];
                if (d !== void 0) switch (d) {
                    case 1:
                        return r[e];
                    case 2:
                        return s[e];
                    case 4:
                        return n[e];
                    case 3:
                        return i[e]
                } else {
                    if (Qi(r, e)) return o[e] = 1, r[e];
                    if (s !== we && ce(s, e)) return o[e] = 2, s[e];
                    if ((c = t.propsOptions[0]) && ce(c, e)) return o[e] = 3, i[e];
                    if (n !== we && ce(n, e)) return o[e] = 4, n[e];
                    Oo && (o[e] = 0)
                }
            }
            const u = zr[e];
            let f, h;
            if (u) return e === "$attrs" && at(t, "get", e), u(t);
            if ((f = a.__cssModules) && (f = f[e])) return f;
            if (n !== we && ce(n, e)) return o[e] = 4, n[e];
            if (h = l.config.globalProperties, ce(h, e)) return h[e]
        },
        set({
            _: t
        }, e, n) {
            const {
                data: r,
                setupState: s,
                ctx: i
            } = t;
            return Qi(s, e) ? (s[e] = n, !0) : r !== we && ce(r, e) ? (r[e] = n, !0) : ce(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (i[e] = n, !0)
        },
        has({
            _: {
                data: t,
                setupState: e,
                accessCache: n,
                ctx: r,
                appContext: s,
                propsOptions: i
            }
        }, o) {
            let a;
            return !!n[o] || t !== we && ce(t, o) || Qi(e, o) || (a = i[0]) && ce(a, o) || ce(r, o) || ce(zr, o) || ce(s.config.globalProperties, o)
        },
        defineProperty(t, e, n) {
            return n.get != null ? t._.accessCache[e] = 0 : ce(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n)
        }
    };

function Qw() {
    return Sg().attrs
}

function Sg() {
    const t = Bn();
    return t.setupContext || (t.setupContext = Xf(t))
}

function jl(t) {
    return Z(t) ? t.reduce((e, n) => (e[n] = null, e), {}) : t
}

function Zw(t) {
    const e = Bn();
    let n = t();
    return dn(), Ma(n) && (n = n.catch(r => {
        throw yn(e), r
    })), [n, () => yn(e)]
}
let Oo = !0;

function Tg(t) {
    const e = Xa(t),
        n = t.proxy,
        r = t.ctx;
    Oo = !1, e.beforeCreate && Hl(e.beforeCreate, t, "bc");
    const {
        data: s,
        computed: i,
        methods: o,
        watch: a,
        provide: l,
        inject: c,
        created: u,
        beforeMount: f,
        mounted: h,
        beforeUpdate: d,
        updated: _,
        activated: y,
        deactivated: E,
        beforeDestroy: m,
        beforeUnmount: g,
        destroyed: x,
        unmounted: b,
        render: S,
        renderTracked: $,
        renderTriggered: O,
        errorCaptured: k,
        serverPrefetch: H,
        expose: D,
        inheritAttrs: z,
        components: M,
        directives: J,
        filters: j
    } = e;
    if (c && Pg(c, r, null), o)
        for (const se in o) {
            const ie = o[se];
            te(ie) && (r[se] = ie.bind(n))
        }
    if (s) {
        const se = s.call(n, n);
        ye(se) && (t.data = Gt(se))
    }
    if (Oo = !0, i)
        for (const se in i) {
            const ie = i[se],
                Re = te(ie) ? ie.bind(n, n) : te(ie.get) ? ie.get.bind(n, n) : Ct,
                Ue = !te(ie) && te(ie.set) ? ie.set.bind(n) : Ct,
                Be = pt({
                    get: Re,
                    set: Ue
                });
            Object.defineProperty(r, se, {
                enumerable: !0,
                configurable: !0,
                get: () => Be.value,
                set: he => Be.value = he
            })
        }
    if (a)
        for (const se in a) If(a[se], r, n, se);
    if (l) {
        const se = te(l) ? l.call(n) : l;
        Reflect.ownKeys(se).forEach(ie => {
            Nn(ie, se[ie])
        })
    }
    u && Hl(u, t, "c");

    function re(se, ie) {
        Z(ie) ? ie.forEach(Re => se(Re.bind(n))) : ie && se(ie.bind(n))
    }
    if (re(yg, f), re($i, h), re(bg, d), re(Tf, _), re(kf, y), re(Cf, E), re(Pf, k), re(xg, $), re(Eg, O), re(Ii, g), re(Ya, b), re(wg, H), Z(D))
        if (D.length) {
            const se = t.exposed || (t.exposed = {});
            D.forEach(ie => {
                Object.defineProperty(se, ie, {
                    get: () => n[ie],
                    set: Re => n[ie] = Re
                })
            })
        } else t.exposed || (t.exposed = {});
    S && t.render === Ct && (t.render = S), z != null && (t.inheritAttrs = z), M && (t.components = M), J && (t.directives = J)
}

function Pg(t, e, n = Ct) {
    Z(t) && (t = Fo(t));
    for (const r in t) {
        const s = t[r];
        let i;
        ye(s) ? "default" in s ? i = et(s.from || r, s.default, !0) : i = et(s.from || r) : i = et(s), De(i) ? Object.defineProperty(e, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: o => i.value = o
        }) : e[r] = i
    }
}

function Hl(t, e, n) {
    _t(Z(t) ? t.map(r => r.bind(e.proxy)) : t.bind(e.proxy), e, n)
}

function If(t, e, n, r) {
    const s = r.includes(".") ? bf(n, r) : () => n[r];
    if (Ce(t)) {
        const i = e[t];
        te(i) && rr(s, i)
    } else if (te(t)) rr(s, t.bind(n));
    else if (ye(t))
        if (Z(t)) t.forEach(i => If(i, e, n, r));
        else {
            const i = te(t.handler) ? t.handler.bind(n) : e[t.handler];
            te(i) && rr(s, i, t)
        }
}

function Xa(t) {
    const e = t.type,
        {
            mixins: n,
            extends: r
        } = e,
        {
            mixins: s,
            optionsCache: i,
            config: {
                optionMergeStrategies: o
            }
        } = t.appContext,
        a = i.get(e);
    let l;
    return a ? l = a : !s.length && !n && !r ? l = e : (l = {}, s.length && s.forEach(c => Xs(l, c, o, !0)), Xs(l, e, o)), ye(e) && i.set(e, l), l
}

function Xs(t, e, n, r = !1) {
    const {
        mixins: s,
        extends: i
    } = e;
    i && Xs(t, i, n, !0), s && s.forEach(o => Xs(t, o, n, !0));
    for (const o in e)
        if (!(r && o === "expose")) {
            const a = Rg[o] || n && n[o];
            t[o] = a ? a(t[o], e[o]) : e[o]
        }
    return t
}
const Rg = {
    data: Ul,
    props: Bl,
    emits: Bl,
    methods: Nr,
    computed: Nr,
    beforeCreate: Je,
    created: Je,
    beforeMount: Je,
    mounted: Je,
    beforeUpdate: Je,
    updated: Je,
    beforeDestroy: Je,
    beforeUnmount: Je,
    destroyed: Je,
    unmounted: Je,
    activated: Je,
    deactivated: Je,
    errorCaptured: Je,
    serverPrefetch: Je,
    components: Nr,
    directives: Nr,
    watch: $g,
    provide: Ul,
    inject: Ag
};

function Ul(t, e) {
    return e ? t ? function() {
        return Fe(te(t) ? t.call(this, this) : t, te(e) ? e.call(this, this) : e)
    } : e : t
}

function Ag(t, e) {
    return Nr(Fo(t), Fo(e))
}

function Fo(t) {
    if (Z(t)) {
        const e = {};
        for (let n = 0; n < t.length; n++) e[t[n]] = t[n];
        return e
    }
    return t
}

function Je(t, e) {
    return t ? [...new Set([].concat(t, e))] : e
}

function Nr(t, e) {
    return t ? Fe(Object.create(null), t, e) : e
}

function Bl(t, e) {
    return t ? Z(t) && Z(e) ? [...new Set([...t, ...e])] : Fe(Object.create(null), jl(t), jl(e ? ? {})) : e
}

function $g(t, e) {
    if (!t) return e;
    if (!e) return t;
    const n = Fe(Object.create(null), t);
    for (const r in e) n[r] = Je(t[r], e[r]);
    return n
}

function Of() {
    return {
        app: null,
        config: {
            isNativeTag: Jd,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let Ig = 0;

function Og(t, e) {
    return function(r, s = null) {
        te(r) || (r = Fe({}, r)), s != null && !ye(s) && (s = null);
        const i = Of(),
            o = new Set;
        let a = !1;
        const l = i.app = {
            _uid: Ig++,
            _component: r,
            _props: s,
            _container: null,
            _context: i,
            _instance: null,
            version: Qf,
            get config() {
                return i.config
            },
            set config(c) {},
            use(c, ...u) {
                return o.has(c) || (c && te(c.install) ? (o.add(c), c.install(l, ...u)) : te(c) && (o.add(c), c(l, ...u))), l
            },
            mixin(c) {
                return i.mixins.includes(c) || i.mixins.push(c), l
            },
            component(c, u) {
                return u ? (i.components[c] = u, l) : i.components[c]
            },
            directive(c, u) {
                return u ? (i.directives[c] = u, l) : i.directives[c]
            },
            mount(c, u, f) {
                if (!a) {
                    const h = Te(r, s);
                    return h.appContext = i, u && e ? e(h, c) : t(h, c, f), a = !0, l._container = c, c.__vue_app__ = l, Fi(h.component) || h.component.proxy
                }
            },
            unmount() {
                a && (t(null, l._container), delete l._container.__vue_app__)
            },
            provide(c, u) {
                return i.provides[c] = u, l
            },
            runWithContext(c) {
                ls = l;
                try {
                    return c()
                } finally {
                    ls = null
                }
            }
        };
        return l
    }
}
let ls = null;

function Nn(t, e) {
    if (Ie) {
        let n = Ie.provides;
        const r = Ie.parent && Ie.parent.provides;
        r === n && (n = Ie.provides = Object.create(r)), n[t] = e
    }
}

function et(t, e, n = !1) {
    const r = Ie || je;
    if (r || ls) {
        const s = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : ls._context.provides;
        if (s && t in s) return s[t];
        if (arguments.length > 1) return n && te(e) ? e.call(r && r.proxy) : e
    }
}

function Ff() {
    return !!(Ie || je || ls)
}

function Fg(t, e, n, r = !1) {
    const s = {},
        i = {};
    Vs(i, Oi, 1), t.propsDefaults = Object.create(null), Mf(t, e, s, i);
    for (const o in t.propsOptions[0]) o in s || (s[o] = void 0);
    n ? t.props = r ? s : vs(s) : t.type.props ? t.props = s : t.props = i, t.attrs = i
}

function Mg(t, e, n, r) {
    const {
        props: s,
        attrs: i,
        vnode: {
            patchFlag: o
        }
    } = t, a = le(s), [l] = t.propsOptions;
    let c = !1;
    if ((r || o > 0) && !(o & 16)) {
        if (o & 8) {
            const u = t.vnode.dynamicProps;
            for (let f = 0; f < u.length; f++) {
                let h = u[f];
                if (Ti(t.emitsOptions, h)) continue;
                const d = e[h];
                if (l)
                    if (ce(i, h)) d !== i[h] && (i[h] = d, c = !0);
                    else {
                        const _ = Lt(h);
                        s[_] = Mo(l, a, _, d, t, !1)
                    }
                else d !== i[h] && (i[h] = d, c = !0)
            }
        }
    } else {
        Mf(t, e, s, i) && (c = !0);
        let u;
        for (const f in a)(!e || !ce(e, f) && ((u = vr(f)) === f || !ce(e, u))) && (l ? n && (n[f] !== void 0 || n[u] !== void 0) && (s[f] = Mo(l, a, f, void 0, t, !0)) : delete s[f]);
        if (i !== a)
            for (const f in i)(!e || !ce(e, f)) && (delete i[f], c = !0)
    }
    c && zt(t, "set", "$attrs")
}

function Mf(t, e, n, r) {
    const [s, i] = t.propsOptions;
    let o = !1,
        a;
    if (e)
        for (let l in e) {
            if (Vr(l)) continue;
            const c = e[l];
            let u;
            s && ce(s, u = Lt(l)) ? !i || !i.includes(u) ? n[u] = c : (a || (a = {}))[u] = c : Ti(t.emitsOptions, l) || (!(l in r) || c !== r[l]) && (r[l] = c, o = !0)
        }
    if (i) {
        const l = le(n),
            c = a || we;
        for (let u = 0; u < i.length; u++) {
            const f = i[u];
            n[f] = Mo(s, l, f, c[f], t, !ce(c, f))
        }
    }
    return o
}

function Mo(t, e, n, r, s, i) {
    const o = t[n];
    if (o != null) {
        const a = ce(o, "default");
        if (a && r === void 0) {
            const l = o.default;
            if (o.type !== Function && !o.skipFactory && te(l)) {
                const {
                    propsDefaults: c
                } = s;
                n in c ? r = c[n] : (yn(s), r = c[n] = l.call(null, e), dn())
            } else r = l
        }
        o[0] && (i && !a ? r = !1 : o[1] && (r === "" || r === vr(n)) && (r = !0))
    }
    return r
}

function Lf(t, e, n = !1) {
    const r = e.propsCache,
        s = r.get(t);
    if (s) return s;
    const i = t.props,
        o = {},
        a = [];
    let l = !1;
    if (!te(t)) {
        const u = f => {
            l = !0;
            const [h, d] = Lf(f, e, !0);
            Fe(o, h), d && a.push(...d)
        };
        !n && e.mixins.length && e.mixins.forEach(u), t.extends && u(t.extends), t.mixins && t.mixins.forEach(u)
    }
    if (!i && !l) return ye(t) && r.set(t, Qn), Qn;
    if (Z(i))
        for (let u = 0; u < i.length; u++) {
            const f = Lt(i[u]);
            ql(f) && (o[f] = we)
        } else if (i)
            for (const u in i) {
                const f = Lt(u);
                if (ql(f)) {
                    const h = i[u],
                        d = o[f] = Z(h) || te(h) ? {
                            type: h
                        } : Fe({}, h);
                    if (d) {
                        const _ = Kl(Boolean, d.type),
                            y = Kl(String, d.type);
                        d[0] = _ > -1, d[1] = y < 0 || _ < y, (_ > -1 || ce(d, "default")) && a.push(f)
                    }
                }
            }
    const c = [o, a];
    return ye(t) && r.set(t, c), c
}

function ql(t) {
    return t[0] !== "$"
}

function Wl(t) {
    const e = t && t.toString().match(/^\s*(function|class) (\w+)/);
    return e ? e[2] : t === null ? "null" : ""
}

function Vl(t, e) {
    return Wl(t) === Wl(e)
}

function Kl(t, e) {
    return Z(e) ? e.findIndex(n => Vl(n, t)) : te(e) && Vl(e, t) ? 0 : -1
}
const Nf = t => t[0] === "_" || t === "$stable",
    Qa = t => Z(t) ? t.map(dt) : [dt(t)],
    Lg = (t, e, n) => {
        if (e._n) return e;
        const r = Va((...s) => Qa(e(...s)), n);
        return r._c = !1, r
    },
    Df = (t, e, n) => {
        const r = t._ctx;
        for (const s in t) {
            if (Nf(s)) continue;
            const i = t[s];
            if (te(i)) e[s] = Lg(s, i, r);
            else if (i != null) {
                const o = Qa(i);
                e[s] = () => o
            }
        }
    },
    jf = (t, e) => {
        const n = Qa(e);
        t.slots.default = () => n
    },
    Ng = (t, e) => {
        if (t.vnode.shapeFlag & 32) {
            const n = e._;
            n ? (t.slots = le(e), Vs(e, "_", n)) : Df(e, t.slots = {})
        } else t.slots = {}, e && jf(t, e);
        Vs(t.slots, Oi, 1)
    },
    Dg = (t, e, n) => {
        const {
            vnode: r,
            slots: s
        } = t;
        let i = !0,
            o = we;
        if (r.shapeFlag & 32) {
            const a = e._;
            a ? n && a === 1 ? i = !1 : (Fe(s, e), !n && a === 1 && delete s._) : (i = !e.$stable, Df(e, s)), o = e
        } else e && (jf(t, e), o = {
            default: 1
        });
        if (i)
            for (const a in s) !Nf(a) && !(a in o) && delete s[a]
    };

function Qs(t, e, n, r, s = !1) {
    if (Z(t)) {
        t.forEach((h, d) => Qs(h, e && (Z(e) ? e[d] : e), n, r, s));
        return
    }
    if (Ln(r) && !s) return;
    const i = r.shapeFlag & 4 ? Fi(r.component) || r.component.proxy : r.el,
        o = s ? null : i,
        {
            i: a,
            r: l
        } = t,
        c = e && e.r,
        u = a.refs === we ? a.refs = {} : a.refs,
        f = a.setupState;
    if (c != null && c !== l && (Ce(c) ? (u[c] = null, ce(f, c) && (f[c] = null)) : De(c) && (c.value = null)), te(l)) hn(l, a, 12, [o, u]);
    else {
        const h = Ce(l),
            d = De(l);
        if (h || d) {
            const _ = () => {
                if (t.f) {
                    const y = h ? ce(f, l) ? f[l] : u[l] : l.value;
                    s ? Z(y) && Oa(y, i) : Z(y) ? y.includes(i) || y.push(i) : h ? (u[l] = [i], ce(f, l) && (f[l] = u[l])) : (l.value = [i], t.k && (u[t.k] = l.value))
                } else h ? (u[l] = o, ce(f, l) && (f[l] = o)) : d && (l.value = o, t.k && (u[t.k] = o))
            };
            o ? (_.id = -1, We(_, n)) : _()
        }
    }
}
let en = !1;
const Ps = t => /svg/.test(t.namespaceURI) && t.tagName !== "foreignObject",
    Rs = t => t.nodeType === 8;

function jg(t) {
    const {
        mt: e,
        p: n,
        o: {
            patchProp: r,
            createText: s,
            nextSibling: i,
            parentNode: o,
            remove: a,
            insert: l,
            createComment: c
        }
    } = t, u = (m, g) => {
        if (!g.hasChildNodes()) {
            n(null, m, g), Gs(), g._vnode = m;
            return
        }
        en = !1, f(g.firstChild, m, null, null, null), Gs(), g._vnode = m, en && console.error("Hydration completed but contains mismatches.")
    }, f = (m, g, x, b, S, $ = !1) => {
        const O = Rs(m) && m.data === "[",
            k = () => y(m, g, x, b, S, O),
            {
                type: H,
                ref: D,
                shapeFlag: z,
                patchFlag: M
            } = g;
        let J = m.nodeType;
        g.el = m, M === -2 && ($ = !1, g.dynamicChildren = null);
        let j = null;
        switch (H) {
            case ar:
                J !== 3 ? g.children === "" ? (l(g.el = s(""), o(m), m), j = m) : j = k() : (m.data !== g.children && (en = !0, m.data = g.children), j = i(m));
                break;
            case tt:
                J !== 8 || O ? j = k() : j = i(m);
                break;
            case sr:
                if (O && (m = i(m), J = m.nodeType), J === 1 || J === 3) {
                    j = m;
                    const fe = !g.children.length;
                    for (let re = 0; re < g.staticCount; re++) fe && (g.children += j.nodeType === 1 ? j.outerHTML : j.data), re === g.staticCount - 1 && (g.anchor = j), j = i(j);
                    return O ? i(j) : j
                } else k();
                break;
            case Qe:
                O ? j = _(m, g, x, b, S, $) : j = k();
                break;
            default:
                if (z & 1) J !== 1 || g.type.toLowerCase() !== m.tagName.toLowerCase() ? j = k() : j = h(m, g, x, b, S, $);
                else if (z & 6) {
                    g.slotScopeIds = S;
                    const fe = o(m);
                    if (e(g, fe, null, x, b, Ps(fe), $), j = O ? E(m) : i(m), j && Rs(j) && j.data === "teleport end" && (j = i(j)), Ln(g)) {
                        let re;
                        O ? (re = Te(Qe), re.anchor = j ? j.previousSibling : fe.lastChild) : re = m.nodeType === 3 ? zf("") : Te("div"), re.el = m, g.component.subTree = re
                    }
                } else z & 64 ? J !== 8 ? j = k() : j = g.type.hydrate(m, g, x, b, S, $, t, d) : z & 128 && (j = g.type.hydrate(m, g, x, b, Ps(o(m)), S, $, t, f))
        }
        return D != null && Qs(D, null, b, g), j
    }, h = (m, g, x, b, S, $) => {
        $ = $ || !!g.dynamicChildren;
        const {
            type: O,
            props: k,
            patchFlag: H,
            shapeFlag: D,
            dirs: z
        } = g, M = O === "input" && z || O === "option";
        if (M || H !== -1) {
            if (z && At(g, null, x, "created"), k)
                if (M || !$ || H & 48)
                    for (const j in k)(M && j.endsWith("value") || gs(j) && !Vr(j)) && r(m, j, null, k[j], !1, void 0, x);
                else k.onClick && r(m, "onClick", null, k.onClick, !1, void 0, x);
            let J;
            if ((J = k && k.onVnodeBeforeMount) && rt(J, x, g), z && At(g, null, x, "beforeMount"), ((J = k && k.onVnodeMounted) || z) && yf(() => {
                    J && rt(J, x, g), z && At(g, null, x, "mounted")
                }, b), D & 16 && !(k && (k.innerHTML || k.textContent))) {
                let j = d(m.firstChild, g, m, x, b, S, $);
                for (; j;) {
                    en = !0;
                    const fe = j;
                    j = j.nextSibling, a(fe)
                }
            } else D & 8 && m.textContent !== g.children && (en = !0, m.textContent = g.children)
        }
        return m.nextSibling
    }, d = (m, g, x, b, S, $, O) => {
        O = O || !!g.dynamicChildren;
        const k = g.children,
            H = k.length;
        for (let D = 0; D < H; D++) {
            const z = O ? k[D] : k[D] = dt(k[D]);
            if (m) m = f(m, z, b, S, $, O);
            else {
                if (z.type === ar && !z.children) continue;
                en = !0, n(null, z, x, null, b, S, Ps(x), $)
            }
        }
        return m
    }, _ = (m, g, x, b, S, $) => {
        const {
            slotScopeIds: O
        } = g;
        O && (S = S ? S.concat(O) : O);
        const k = o(m),
            H = d(i(m), g, k, x, b, S, $);
        return H && Rs(H) && H.data === "]" ? i(g.anchor = H) : (en = !0, l(g.anchor = c("]"), k, H), H)
    }, y = (m, g, x, b, S, $) => {
        if (en = !0, g.el = null, $) {
            const H = E(m);
            for (;;) {
                const D = i(m);
                if (D && D !== H) a(D);
                else break
            }
        }
        const O = i(m),
            k = o(m);
        return a(m), n(null, g, k, O, x, b, Ps(k), S), O
    }, E = m => {
        let g = 0;
        for (; m;)
            if (m = i(m), m && Rs(m) && (m.data === "[" && g++, m.data === "]")) {
                if (g === 0) return i(m);
                g--
            }
        return m
    };
    return [u, f]
}
const We = yf;

function Hg(t) {
    return Hf(t)
}

function Ug(t) {
    return Hf(t, jg)
}

function Hf(t, e) {
    const n = So();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: s,
        patchProp: i,
        createElement: o,
        createText: a,
        createComment: l,
        setText: c,
        setElementText: u,
        parentNode: f,
        nextSibling: h,
        setScopeId: d = Ct,
        insertStaticContent: _
    } = t, y = (p, v, w, T = null, R = null, A = null, q = !1, F = null, N = !!v.dynamicChildren) => {
        if (p === v) return;
        p && !kt(p, v) && (T = P(p), he(p, R, A, !0), p = null), v.patchFlag === -2 && (N = !1, v.dynamicChildren = null);
        const {
            type: I,
            ref: X,
            shapeFlag: Y
        } = v;
        switch (I) {
            case ar:
                E(p, v, w, T);
                break;
            case tt:
                m(p, v, w, T);
                break;
            case sr:
                p == null && g(v, w, T, q);
                break;
            case Qe:
                M(p, v, w, T, R, A, q, F, N);
                break;
            default:
                Y & 1 ? S(p, v, w, T, R, A, q, F, N) : Y & 6 ? J(p, v, w, T, R, A, q, F, N) : (Y & 64 || Y & 128) && I.process(p, v, w, T, R, A, q, F, N, L)
        }
        X != null && R && Qs(X, p && p.ref, A, v || p, !v)
    }, E = (p, v, w, T) => {
        if (p == null) r(v.el = a(v.children), w, T);
        else {
            const R = v.el = p.el;
            v.children !== p.children && c(R, v.children)
        }
    }, m = (p, v, w, T) => {
        p == null ? r(v.el = l(v.children || ""), w, T) : v.el = p.el
    }, g = (p, v, w, T) => {
        [p.el, p.anchor] = _(p.children, v, w, T, p.el, p.anchor)
    }, x = ({
        el: p,
        anchor: v
    }, w, T) => {
        let R;
        for (; p && p !== v;) R = h(p), r(p, w, T), p = R;
        r(v, w, T)
    }, b = ({
        el: p,
        anchor: v
    }) => {
        let w;
        for (; p && p !== v;) w = h(p), s(p), p = w;
        s(v)
    }, S = (p, v, w, T, R, A, q, F, N) => {
        q = q || v.type === "svg", p == null ? $(v, w, T, R, A, q, F, N) : H(p, v, R, A, q, F, N)
    }, $ = (p, v, w, T, R, A, q, F) => {
        let N, I;
        const {
            type: X,
            props: Y,
            shapeFlag: Q,
            transition: ne,
            dirs: ae
        } = p;
        if (N = p.el = o(p.type, A, Y && Y.is, Y), Q & 8 ? u(N, p.children) : Q & 16 && k(p.children, N, null, T, R, A && X !== "foreignObject", q, F), ae && At(p, null, T, "created"), O(N, p, p.scopeId, q, T), Y) {
            for (const pe in Y) pe !== "value" && !Vr(pe) && i(N, pe, null, Y[pe], A, p.children, T, R, be);
            "value" in Y && i(N, "value", null, Y.value), (I = Y.onVnodeBeforeMount) && rt(I, T, p)
        }
        ae && At(p, null, T, "beforeMount");
        const _e = (!R || R && !R.pendingBranch) && ne && !ne.persisted;
        _e && ne.beforeEnter(N), r(N, v, w), ((I = Y && Y.onVnodeMounted) || _e || ae) && We(() => {
            I && rt(I, T, p), _e && ne.enter(N), ae && At(p, null, T, "mounted")
        }, R)
    }, O = (p, v, w, T, R) => {
        if (w && d(p, w), T)
            for (let A = 0; A < T.length; A++) d(p, T[A]);
        if (R) {
            let A = R.subTree;
            if (v === A) {
                const q = R.vnode;
                O(p, q, q.scopeId, q.slotScopeIds, R.parent)
            }
        }
    }, k = (p, v, w, T, R, A, q, F, N = 0) => {
        for (let I = N; I < p.length; I++) {
            const X = p[I] = F ? ln(p[I]) : dt(p[I]);
            y(null, X, v, w, T, R, A, q, F)
        }
    }, H = (p, v, w, T, R, A, q) => {
        const F = v.el = p.el;
        let {
            patchFlag: N,
            dynamicChildren: I,
            dirs: X
        } = v;
        N |= p.patchFlag & 16;
        const Y = p.props || we,
            Q = v.props || we;
        let ne;
        w && wn(w, !1), (ne = Q.onVnodeBeforeUpdate) && rt(ne, w, v, p), X && At(v, p, w, "beforeUpdate"), w && wn(w, !0);
        const ae = R && v.type !== "foreignObject";
        if (I ? D(p.dynamicChildren, I, F, w, T, ae, A) : q || ie(p, v, F, null, w, T, ae, A, !1), N > 0) {
            if (N & 16) z(F, v, Y, Q, w, T, R);
            else if (N & 2 && Y.class !== Q.class && i(F, "class", null, Q.class, R), N & 4 && i(F, "style", Y.style, Q.style, R), N & 8) {
                const _e = v.dynamicProps;
                for (let pe = 0; pe < _e.length; pe++) {
                    const $e = _e[pe],
                        bt = Y[$e],
                        qn = Q[$e];
                    (qn !== bt || $e === "value") && i(F, $e, bt, qn, R, p.children, w, T, be)
                }
            }
            N & 1 && p.children !== v.children && u(F, v.children)
        } else !q && I == null && z(F, v, Y, Q, w, T, R);
        ((ne = Q.onVnodeUpdated) || X) && We(() => {
            ne && rt(ne, w, v, p), X && At(v, p, w, "updated")
        }, T)
    }, D = (p, v, w, T, R, A, q) => {
        for (let F = 0; F < v.length; F++) {
            const N = p[F],
                I = v[F],
                X = N.el && (N.type === Qe || !kt(N, I) || N.shapeFlag & 70) ? f(N.el) : w;
            y(N, I, X, null, T, R, A, q, !0)
        }
    }, z = (p, v, w, T, R, A, q) => {
        if (w !== T) {
            if (w !== we)
                for (const F in w) !Vr(F) && !(F in T) && i(p, F, w[F], null, q, v.children, R, A, be);
            for (const F in T) {
                if (Vr(F)) continue;
                const N = T[F],
                    I = w[F];
                N !== I && F !== "value" && i(p, F, I, N, q, v.children, R, A, be)
            }
            "value" in T && i(p, "value", w.value, T.value)
        }
    }, M = (p, v, w, T, R, A, q, F, N) => {
        const I = v.el = p ? p.el : a(""),
            X = v.anchor = p ? p.anchor : a("");
        let {
            patchFlag: Y,
            dynamicChildren: Q,
            slotScopeIds: ne
        } = v;
        ne && (F = F ? F.concat(ne) : ne), p == null ? (r(I, w, T), r(X, w, T), k(v.children, w, X, R, A, q, F, N)) : Y > 0 && Y & 64 && Q && p.dynamicChildren ? (D(p.dynamicChildren, Q, w, R, A, q, F), (v.key != null || R && v === R.subTree) && Za(p, v, !0)) : ie(p, v, w, X, R, A, q, F, N)
    }, J = (p, v, w, T, R, A, q, F, N) => {
        v.slotScopeIds = F, p == null ? v.shapeFlag & 512 ? R.ctx.activate(v, w, T, q, N) : j(v, w, T, R, A, q, N) : fe(p, v, N)
    }, j = (p, v, w, T, R, A, q) => {
        const F = p.component = Yg(p, T, R);
        if (ms(p) && (F.ctx.renderer = L), Jg(F), F.asyncDep) {
            if (R && R.registerDep(F, re), !p.el) {
                const N = F.subTree = Te(tt);
                m(null, N, v, w)
            }
            return
        }
        re(F, p, v, w, R, A, q)
    }, fe = (p, v, w) => {
        const T = v.component = p.component;
        if (rg(p, v, w))
            if (T.asyncDep && !T.asyncResolved) {
                se(T, v, w);
                return
            } else T.next = v, Xp(T.update), T.update();
        else v.el = p.el, T.vnode = v
    }, re = (p, v, w, T, R, A, q) => {
        const F = () => {
                if (p.isMounted) {
                    let {
                        next: X,
                        bu: Y,
                        u: Q,
                        parent: ne,
                        vnode: ae
                    } = p, _e = X, pe;
                    wn(p, !1), X ? (X.el = ae.el, se(p, X, q)) : X = ae, Y && Kr(Y), (pe = X.props && X.props.onVnodeBeforeUpdate) && rt(pe, ne, X, ae), wn(p, !0);
                    const $e = zi(p),
                        bt = p.subTree;
                    p.subTree = $e, y(bt, $e, f(bt.el), P(bt), p, R, A), X.el = $e.el, _e === null && Ka(p, $e.el), Q && We(Q, R), (pe = X.props && X.props.onVnodeUpdated) && We(() => rt(pe, ne, X, ae), R)
                } else {
                    let X;
                    const {
                        el: Y,
                        props: Q
                    } = v, {
                        bm: ne,
                        m: ae,
                        parent: _e
                    } = p, pe = Ln(v);
                    if (wn(p, !1), ne && Kr(ne), !pe && (X = Q && Q.onVnodeBeforeMount) && rt(X, _e, v), wn(p, !0), Y && ue) {
                        const $e = () => {
                            p.subTree = zi(p), ue(Y, p.subTree, p, R, null)
                        };
                        pe ? v.type.__asyncLoader().then(() => !p.isUnmounted && $e()) : $e()
                    } else {
                        const $e = p.subTree = zi(p);
                        y(null, $e, w, T, p, R, A), v.el = $e.el
                    }
                    if (ae && We(ae, R), !pe && (X = Q && Q.onVnodeMounted)) {
                        const $e = v;
                        We(() => rt(X, _e, $e), R)
                    }(v.shapeFlag & 256 || _e && Ln(_e.vnode) && _e.vnode.shapeFlag & 256) && p.a && We(p.a, R), p.isMounted = !0, v = w = T = null
                }
            },
            N = p.effect = new Da(F, () => Si(I), p.scope),
            I = p.update = () => N.run();
        I.id = p.uid, wn(p, !0), I()
    }, se = (p, v, w) => {
        v.component = p;
        const T = p.vnode.props;
        p.vnode = v, p.next = null, Mg(p, v.props, T, w), Dg(p, v.children, w), mr(), Ol(), yr()
    }, ie = (p, v, w, T, R, A, q, F, N = !1) => {
        const I = p && p.children,
            X = p ? p.shapeFlag : 0,
            Y = v.children,
            {
                patchFlag: Q,
                shapeFlag: ne
            } = v;
        if (Q > 0) {
            if (Q & 128) {
                Ue(I, Y, w, T, R, A, q, F, N);
                return
            } else if (Q & 256) {
                Re(I, Y, w, T, R, A, q, F, N);
                return
            }
        }
        ne & 8 ? (X & 16 && be(I, R, A), Y !== I && u(w, Y)) : X & 16 ? ne & 16 ? Ue(I, Y, w, T, R, A, q, F, N) : be(I, R, A, !0) : (X & 8 && u(w, ""), ne & 16 && k(Y, w, T, R, A, q, F, N))
    }, Re = (p, v, w, T, R, A, q, F, N) => {
        p = p || Qn, v = v || Qn;
        const I = p.length,
            X = v.length,
            Y = Math.min(I, X);
        let Q;
        for (Q = 0; Q < Y; Q++) {
            const ne = v[Q] = N ? ln(v[Q]) : dt(v[Q]);
            y(p[Q], ne, w, null, R, A, q, F, N)
        }
        I > X ? be(p, R, A, !0, !1, Y) : k(v, w, T, R, A, q, F, N, Y)
    }, Ue = (p, v, w, T, R, A, q, F, N) => {
        let I = 0;
        const X = v.length;
        let Y = p.length - 1,
            Q = X - 1;
        for (; I <= Y && I <= Q;) {
            const ne = p[I],
                ae = v[I] = N ? ln(v[I]) : dt(v[I]);
            if (kt(ne, ae)) y(ne, ae, w, null, R, A, q, F, N);
            else break;
            I++
        }
        for (; I <= Y && I <= Q;) {
            const ne = p[Y],
                ae = v[Q] = N ? ln(v[Q]) : dt(v[Q]);
            if (kt(ne, ae)) y(ne, ae, w, null, R, A, q, F, N);
            else break;
            Y--, Q--
        }
        if (I > Y) {
            if (I <= Q) {
                const ne = Q + 1,
                    ae = ne < X ? v[ne].el : T;
                for (; I <= Q;) y(null, v[I] = N ? ln(v[I]) : dt(v[I]), w, ae, R, A, q, F, N), I++
            }
        } else if (I > Q)
            for (; I <= Y;) he(p[I], R, A, !0), I++;
        else {
            const ne = I,
                ae = I,
                _e = new Map;
            for (I = ae; I <= Q; I++) {
                const lt = v[I] = N ? ln(v[I]) : dt(v[I]);
                lt.key != null && _e.set(lt.key, I)
            }
            let pe, $e = 0;
            const bt = Q - ae + 1;
            let qn = !1,
                El = 0;
            const kr = new Array(bt);
            for (I = 0; I < bt; I++) kr[I] = 0;
            for (I = ne; I <= Y; I++) {
                const lt = p[I];
                if ($e >= bt) {
                    he(lt, R, A, !0);
                    continue
                }
                let Pt;
                if (lt.key != null) Pt = _e.get(lt.key);
                else
                    for (pe = ae; pe <= Q; pe++)
                        if (kr[pe - ae] === 0 && kt(lt, v[pe])) {
                            Pt = pe;
                            break
                        }
                Pt === void 0 ? he(lt, R, A, !0) : (kr[Pt - ae] = I + 1, Pt >= El ? El = Pt : qn = !0, y(lt, v[Pt], w, null, R, A, q, F, N), $e++)
            }
            const xl = qn ? Bg(kr) : Qn;
            for (pe = xl.length - 1, I = bt - 1; I >= 0; I--) {
                const lt = ae + I,
                    Pt = v[lt],
                    kl = lt + 1 < X ? v[lt + 1].el : T;
                kr[I] === 0 ? y(null, Pt, w, kl, R, A, q, F, N) : qn && (pe < 0 || I !== xl[pe] ? Be(Pt, w, kl, 2) : pe--)
            }
        }
    }, Be = (p, v, w, T, R = null) => {
        const {
            el: A,
            type: q,
            transition: F,
            children: N,
            shapeFlag: I
        } = p;
        if (I & 6) {
            Be(p.component.subTree, v, w, T);
            return
        }
        if (I & 128) {
            p.suspense.move(v, w, T);
            return
        }
        if (I & 64) {
            q.move(p, v, w, L);
            return
        }
        if (q === Qe) {
            r(A, v, w);
            for (let Y = 0; Y < N.length; Y++) Be(N[Y], v, w, T);
            r(p.anchor, v, w);
            return
        }
        if (q === sr) {
            x(p, v, w);
            return
        }
        if (T !== 2 && I & 1 && F)
            if (T === 0) F.beforeEnter(A), r(A, v, w), We(() => F.enter(A), R);
            else {
                const {
                    leave: Y,
                    delayLeave: Q,
                    afterLeave: ne
                } = F, ae = () => r(A, v, w), _e = () => {
                    Y(A, () => {
                        ae(), ne && ne()
                    })
                };
                Q ? Q(A, ae, _e) : _e()
            }
        else r(A, v, w)
    }, he = (p, v, w, T = !1, R = !1) => {
        const {
            type: A,
            props: q,
            ref: F,
            children: N,
            dynamicChildren: I,
            shapeFlag: X,
            patchFlag: Y,
            dirs: Q
        } = p;
        if (F != null && Qs(F, null, w, p, !0), X & 256) {
            v.ctx.deactivate(p);
            return
        }
        const ne = X & 1 && Q,
            ae = !Ln(p);
        let _e;
        if (ae && (_e = q && q.onVnodeBeforeUnmount) && rt(_e, v, p), X & 6) yt(p.component, w, T);
        else {
            if (X & 128) {
                p.suspense.unmount(w, T);
                return
            }
            ne && At(p, null, v, "beforeUnmount"), X & 64 ? p.type.remove(p, v, w, R, L, T) : I && (A !== Qe || Y > 0 && Y & 64) ? be(I, v, w, !1, !0) : (A === Qe && Y & 384 || !R && X & 16) && be(N, v, w), T && Me(p)
        }(ae && (_e = q && q.onVnodeUnmounted) || ne) && We(() => {
            _e && rt(_e, v, p), ne && At(p, null, v, "unmounted")
        }, w)
    }, Me = p => {
        const {
            type: v,
            el: w,
            anchor: T,
            transition: R
        } = p;
        if (v === Qe) {
            Ae(w, T);
            return
        }
        if (v === sr) {
            b(p);
            return
        }
        const A = () => {
            s(w), R && !R.persisted && R.afterLeave && R.afterLeave()
        };
        if (p.shapeFlag & 1 && R && !R.persisted) {
            const {
                leave: q,
                delayLeave: F
            } = R, N = () => q(w, A);
            F ? F(p.el, A, N) : N()
        } else A()
    }, Ae = (p, v) => {
        let w;
        for (; p !== v;) w = h(p), s(p), p = w;
        s(v)
    }, yt = (p, v, w) => {
        const {
            bum: T,
            scope: R,
            update: A,
            subTree: q,
            um: F
        } = p;
        T && Kr(T), R.stop(), A && (A.active = !1, he(q, p, v, w)), F && We(F, v), We(() => {
            p.isUnmounted = !0
        }, v), v && v.pendingBranch && !v.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === v.pendingId && (v.deps--, v.deps === 0 && v.resolve())
    }, be = (p, v, w, T = !1, R = !1, A = 0) => {
        for (let q = A; q < p.length; q++) he(p[q], v, w, T, R)
    }, P = p => p.shapeFlag & 6 ? P(p.component.subTree) : p.shapeFlag & 128 ? p.suspense.next() : h(p.anchor || p.el), W = (p, v, w) => {
        p == null ? v._vnode && he(v._vnode, null, null, !0) : y(v._vnode || null, p, v, null, null, null, w), Ol(), Gs(), v._vnode = p
    }, L = {
        p: y,
        um: he,
        m: Be,
        r: Me,
        mt: j,
        mc: k,
        pc: ie,
        pbc: D,
        n: P,
        o: t
    };
    let G, ue;
    return e && ([G, ue] = e(L)), {
        render: W,
        hydrate: G,
        createApp: Og(W, G)
    }
}

function wn({
    effect: t,
    update: e
}, n) {
    t.allowRecurse = e.allowRecurse = n
}

function Za(t, e, n = !1) {
    const r = t.children,
        s = e.children;
    if (Z(r) && Z(s))
        for (let i = 0; i < r.length; i++) {
            const o = r[i];
            let a = s[i];
            a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = s[i] = ln(s[i]), a.el = o.el), n || Za(o, a)), a.type === ar && (a.el = o.el)
        }
}

function Bg(t) {
    const e = t.slice(),
        n = [0];
    let r, s, i, o, a;
    const l = t.length;
    for (r = 0; r < l; r++) {
        const c = t[r];
        if (c !== 0) {
            if (s = n[n.length - 1], t[s] < c) {
                e[r] = s, n.push(r);
                continue
            }
            for (i = 0, o = n.length - 1; i < o;) a = i + o >> 1, t[n[a]] < c ? i = a + 1 : o = a;
            c < t[n[i]] && (i > 0 && (e[r] = n[i - 1]), n[i] = r)
        }
    }
    for (i = n.length, o = n[i - 1]; i-- > 0;) n[i] = o, o = e[o];
    return n
}
const qg = t => t.__isTeleport,
    Gr = t => t && (t.disabled || t.disabled === ""),
    zl = t => typeof SVGElement < "u" && t instanceof SVGElement,
    Lo = (t, e) => {
        const n = t && t.to;
        return Ce(n) ? e ? e(n) : null : n
    },
    Wg = {
        __isTeleport: !0,
        process(t, e, n, r, s, i, o, a, l, c) {
            const {
                mc: u,
                pc: f,
                pbc: h,
                o: {
                    insert: d,
                    querySelector: _,
                    createText: y,
                    createComment: E
                }
            } = c, m = Gr(e.props);
            let {
                shapeFlag: g,
                children: x,
                dynamicChildren: b
            } = e;
            if (t == null) {
                const S = e.el = y(""),
                    $ = e.anchor = y("");
                d(S, n, r), d($, n, r);
                const O = e.target = Lo(e.props, _),
                    k = e.targetAnchor = y("");
                O && (d(k, O), o = o || zl(O));
                const H = (D, z) => {
                    g & 16 && u(x, D, z, s, i, o, a, l)
                };
                m ? H(n, $) : O && H(O, k)
            } else {
                e.el = t.el;
                const S = e.anchor = t.anchor,
                    $ = e.target = t.target,
                    O = e.targetAnchor = t.targetAnchor,
                    k = Gr(t.props),
                    H = k ? n : $,
                    D = k ? S : O;
                if (o = o || zl($), b ? (h(t.dynamicChildren, b, H, s, i, o, a), Za(t, e, !0)) : l || f(t, e, H, D, s, i, o, a, !1), m) k || As(e, n, S, c, 1);
                else if ((e.props && e.props.to) !== (t.props && t.props.to)) {
                    const z = e.target = Lo(e.props, _);
                    z && As(e, z, null, c, 0)
                } else k && As(e, $, O, c, 1)
            }
            Uf(e)
        },
        remove(t, e, n, r, {
            um: s,
            o: {
                remove: i
            }
        }, o) {
            const {
                shapeFlag: a,
                children: l,
                anchor: c,
                targetAnchor: u,
                target: f,
                props: h
            } = t;
            if (f && i(u), (o || !Gr(h)) && (i(c), a & 16))
                for (let d = 0; d < l.length; d++) {
                    const _ = l[d];
                    s(_, e, n, !0, !!_.dynamicChildren)
                }
        },
        move: As,
        hydrate: Vg
    };

function As(t, e, n, {
    o: {
        insert: r
    },
    m: s
}, i = 2) {
    i === 0 && r(t.targetAnchor, e, n);
    const {
        el: o,
        anchor: a,
        shapeFlag: l,
        children: c,
        props: u
    } = t, f = i === 2;
    if (f && r(o, e, n), (!f || Gr(u)) && l & 16)
        for (let h = 0; h < c.length; h++) s(c[h], e, n, 2);
    f && r(a, e, n)
}

function Vg(t, e, n, r, s, i, {
    o: {
        nextSibling: o,
        parentNode: a,
        querySelector: l
    }
}, c) {
    const u = e.target = Lo(e.props, l);
    if (u) {
        const f = u._lpa || u.firstChild;
        if (e.shapeFlag & 16)
            if (Gr(e.props)) e.anchor = c(o(t), e, a(t), n, r, s, i), e.targetAnchor = f;
            else {
                e.anchor = o(t);
                let h = f;
                for (; h;)
                    if (h = o(h), h && h.nodeType === 8 && h.data === "teleport anchor") {
                        e.targetAnchor = h, u._lpa = e.targetAnchor && o(e.targetAnchor);
                        break
                    }
                c(f, e, u, n, r, s, i)
            }
        Uf(e)
    }
    return e.anchor && o(e.anchor)
}
const eE = Wg;

function Uf(t) {
    const e = t.ctx;
    if (e && e.ut) {
        let n = t.children[0].el;
        for (; n !== t.targetAnchor;) n.nodeType === 1 && n.setAttribute("data-v-owner", e.uid), n = n.nextSibling;
        e.ut()
    }
}
const Qe = Symbol.for("v-fgt"),
    ar = Symbol.for("v-txt"),
    tt = Symbol.for("v-cmt"),
    sr = Symbol.for("v-stc"),
    Yr = [];
let gt = null;

function It(t = !1) {
    Yr.push(gt = t ? null : [])
}

function Bf() {
    Yr.pop(), gt = Yr[Yr.length - 1] || null
}
let lr = 1;

function Gl(t) {
    lr += t
}

function qf(t) {
    return t.dynamicChildren = lr > 0 ? gt || Qn : null, Bf(), lr > 0 && gt && gt.push(t), t
}

function tE(t, e, n, r, s, i) {
    return qf(Vf(t, e, n, r, s, i, !0))
}

function Wt(t, e, n, r, s) {
    return qf(Te(t, e, n, r, s, !0))
}

function cr(t) {
    return t ? t.__v_isVNode === !0 : !1
}

function kt(t, e) {
    return t.type === e.type && t.key === e.key
}
const Oi = "__vInternal",
    Wf = ({
        key: t
    }) => t ? ? null,
    Hs = ({
        ref: t,
        ref_key: e,
        ref_for: n
    }) => (typeof t == "number" && (t = "" + t), t != null ? Ce(t) || De(t) || te(t) ? {
        i: je,
        r: t,
        k: e,
        f: !!n
    } : t : null);

function Vf(t, e = null, n = null, r = 0, s = null, i = t === Qe ? 0 : 1, o = !1, a = !1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: t,
        props: e,
        key: e && Wf(e),
        ref: e && Hs(e),
        scopeId: Pi,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: je
    };
    return a ? (el(l, n), i & 128 && t.normalize(l)) : n && (l.shapeFlag |= Ce(n) ? 8 : 16), lr > 0 && !o && gt && (l.patchFlag > 0 || i & 6) && l.patchFlag !== 32 && gt.push(l), l
}
const Te = Kg;

function Kg(t, e = null, n = null, r = 0, s = null, i = !1) {
    if ((!t || t === Rf) && (t = tt), cr(t)) {
        const a = Yt(t, e, !0);
        return n && el(a, n), lr > 0 && !i && gt && (a.shapeFlag & 6 ? gt[gt.indexOf(t)] = a : gt.push(a)), a.patchFlag |= -2, a
    }
    if (Zg(t) && (t = t.__vccOpts), e) {
        e = Kf(e);
        let {
            class: a,
            style: l
        } = e;
        a && !Ce(a) && (e.class = ki(a)), ye(l) && (af(l) && !Z(l) && (l = Fe({}, l)), e.style = xi(l))
    }
    const o = Ce(t) ? 1 : mf(t) ? 128 : qg(t) ? 64 : ye(t) ? 4 : te(t) ? 2 : 0;
    return Vf(t, e, n, r, s, o, i, !0)
}

function Kf(t) {
    return t ? af(t) || Oi in t ? Fe({}, t) : t : null
}

function Yt(t, e, n = !1) {
    const {
        props: r,
        ref: s,
        patchFlag: i,
        children: o
    } = t, a = e ? Gf(r || {}, e) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: t.type,
        props: a,
        key: a && Wf(a),
        ref: e && e.ref ? n && s ? Z(s) ? s.concat(Hs(e)) : [s, Hs(e)] : Hs(e) : s,
        scopeId: t.scopeId,
        slotScopeIds: t.slotScopeIds,
        children: o,
        target: t.target,
        targetAnchor: t.targetAnchor,
        staticCount: t.staticCount,
        shapeFlag: t.shapeFlag,
        patchFlag: e && t.type !== Qe ? i === -1 ? 16 : i | 16 : i,
        dynamicProps: t.dynamicProps,
        dynamicChildren: t.dynamicChildren,
        appContext: t.appContext,
        dirs: t.dirs,
        transition: t.transition,
        component: t.component,
        suspense: t.suspense,
        ssContent: t.ssContent && Yt(t.ssContent),
        ssFallback: t.ssFallback && Yt(t.ssFallback),
        el: t.el,
        anchor: t.anchor,
        ctx: t.ctx,
        ce: t.ce
    }
}

function zf(t = " ", e = 0) {
    return Te(ar, null, t, e)
}

function nE(t, e) {
    const n = Te(sr, null, t);
    return n.staticCount = e, n
}

function rE(t = "", e = !1) {
    return e ? (It(), Wt(tt, null, t)) : Te(tt, null, t)
}

function dt(t) {
    return t == null || typeof t == "boolean" ? Te(tt) : Z(t) ? Te(Qe, null, t.slice()) : typeof t == "object" ? ln(t) : Te(ar, null, String(t))
}

function ln(t) {
    return t.el === null && t.patchFlag !== -1 || t.memo ? t : Yt(t)
}

function el(t, e) {
    let n = 0;
    const {
        shapeFlag: r
    } = t;
    if (e == null) e = null;
    else if (Z(e)) n = 16;
    else if (typeof e == "object")
        if (r & 65) {
            const s = e.default;
            s && (s._c && (s._d = !1), el(t, s()), s._c && (s._d = !0));
            return
        } else {
            n = 32;
            const s = e._;
            !s && !(Oi in e) ? e._ctx = je : s === 3 && je && (je.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024))
        }
    else te(e) ? (e = {
        default: e,
        _ctx: je
    }, n = 32) : (e = String(e), r & 64 ? (n = 16, e = [zf(e)]) : n = 8);
    t.children = e, t.shapeFlag |= n
}

function Gf(...t) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
        const r = t[n];
        for (const s in r)
            if (s === "class") e.class !== r.class && (e.class = ki([e.class, r.class]));
            else if (s === "style") e.style = xi([e.style, r.style]);
        else if (gs(s)) {
            const i = e[s],
                o = r[s];
            o && i !== o && !(Z(i) && i.includes(o)) && (e[s] = i ? [].concat(i, o) : o)
        } else s !== "" && (e[s] = r[s])
    }
    return e
}

function rt(t, e, n, r = null) {
    _t(t, e, 7, [n, r])
}
const zg = Of();
let Gg = 0;

function Yg(t, e, n) {
    const r = t.type,
        s = (e ? e.appContext : t.appContext) || zg,
        i = {
            uid: Gg++,
            vnode: t,
            type: r,
            parent: e,
            appContext: s,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new fp(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: e ? e.provides : Object.create(s.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Lf(r, s),
            emitsOptions: vf(r, s),
            emit: null,
            emitted: null,
            propsDefaults: we,
            inheritAttrs: r.inheritAttrs,
            ctx: we,
            data: we,
            props: we,
            attrs: we,
            slots: we,
            refs: we,
            setupState: we,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null
        };
    return i.ctx = {
        _: i
    }, i.root = e ? e.root : i, i.emit = Zp.bind(null, i), t.ce && t.ce(i), i
}
let Ie = null;
const Bn = () => Ie || je;
let tl, Vn, Yl = "__VUE_INSTANCE_SETTERS__";
(Vn = So()[Yl]) || (Vn = So()[Yl] = []), Vn.push(t => Ie = t), tl = t => {
    Vn.length > 1 ? Vn.forEach(e => e(t)) : Vn[0](t)
};
const yn = t => {
        tl(t), t.scope.on()
    },
    dn = () => {
        Ie && Ie.scope.off(), tl(null)
    };

function Yf(t) {
    return t.vnode.shapeFlag & 4
}
let ur = !1;

function Jg(t, e = !1) {
    ur = e;
    const {
        props: n,
        children: r
    } = t.vnode, s = Yf(t);
    Fg(t, n, s, e), Ng(t, r);
    const i = s ? Xg(t, e) : void 0;
    return ur = !1, i
}

function Xg(t, e) {
    const n = t.type;
    t.accessCache = Object.create(null), t.proxy = lf(new Proxy(t.ctx, Cg));
    const {
        setup: r
    } = n;
    if (r) {
        const s = t.setupContext = r.length > 1 ? Xf(t) : null;
        yn(t), mr();
        const i = hn(r, t, 0, [t.props, s]);
        if (yr(), dn(), Ma(i)) {
            if (i.then(dn, dn), e) return i.then(o => {
                No(t, o, e)
            }).catch(o => {
                br(o, t, 0)
            });
            t.asyncDep = i
        } else No(t, i, e)
    } else Jf(t, e)
}

function No(t, e, n) {
    te(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : ye(e) && (t.setupState = hf(e)), Jf(t, n)
}
let Jl;

function Jf(t, e, n) {
    const r = t.type;
    if (!t.render) {
        if (!e && Jl && !r.render) {
            const s = r.template || Xa(t).template;
            if (s) {
                const {
                    isCustomElement: i,
                    compilerOptions: o
                } = t.appContext.config, {
                    delimiters: a,
                    compilerOptions: l
                } = r, c = Fe(Fe({
                    isCustomElement: i,
                    delimiters: a
                }, o), l);
                r.render = Jl(s, c)
            }
        }
        t.render = r.render || Ct
    }
    yn(t), mr(), Tg(t), yr(), dn()
}

function Qg(t) {
    return t.attrsProxy || (t.attrsProxy = new Proxy(t.attrs, {
        get(e, n) {
            return at(t, "get", "$attrs"), e[n]
        }
    }))
}

function Xf(t) {
    const e = n => {
        t.exposed = n || {}
    };
    return {
        get attrs() {
            return Qg(t)
        },
        slots: t.slots,
        emit: t.emit,
        expose: e
    }
}

function Fi(t) {
    if (t.exposed) return t.exposeProxy || (t.exposeProxy = new Proxy(hf(lf(t.exposed)), {
        get(e, n) {
            if (n in e) return e[n];
            if (n in zr) return zr[n](t)
        },
        has(e, n) {
            return n in e || n in zr
        }
    }))
}

function Do(t, e = !0) {
    return te(t) ? t.displayName || t.name : t.name || e && t.__name
}

function Zg(t) {
    return te(t) && "__vccOpts" in t
}
const pt = (t, e) => Gp(t, e, ur);

function ft(t, e, n) {
    const r = arguments.length;
    return r === 2 ? ye(e) && !Z(e) ? cr(e) ? Te(t, null, [e]) : Te(t, e) : Te(t, null, e) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && cr(n) && (n = [n]), Te(t, e, n))
}
const e_ = Symbol.for("v-scx"),
    t_ = () => et(e_),
    Qf = "3.3.4",
    n_ = "http://www.w3.org/2000/svg",
    $n = typeof document < "u" ? document : null,
    Xl = $n && $n.createElement("template"),
    r_ = {
        insert: (t, e, n) => {
            e.insertBefore(t, n || null)
        },
        remove: t => {
            const e = t.parentNode;
            e && e.removeChild(t)
        },
        createElement: (t, e, n, r) => {
            const s = e ? $n.createElementNS(n_, t) : $n.createElement(t, n ? {
                is: n
            } : void 0);
            return t === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s
        },
        createText: t => $n.createTextNode(t),
        createComment: t => $n.createComment(t),
        setText: (t, e) => {
            t.nodeValue = e
        },
        setElementText: (t, e) => {
            t.textContent = e
        },
        parentNode: t => t.parentNode,
        nextSibling: t => t.nextSibling,
        querySelector: t => $n.querySelector(t),
        setScopeId(t, e) {
            t.setAttribute(e, "")
        },
        insertStaticContent(t, e, n, r, s, i) {
            const o = n ? n.previousSibling : e.lastChild;
            if (s && (s === i || s.nextSibling))
                for (; e.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)););
            else {
                Xl.innerHTML = r ? `<svg>${t}</svg>` : t;
                const a = Xl.content;
                if (r) {
                    const l = a.firstChild;
                    for (; l.firstChild;) a.appendChild(l.firstChild);
                    a.removeChild(l)
                }
                e.insertBefore(a, n)
            }
            return [o ? o.nextSibling : e.firstChild, n ? n.previousSibling : e.lastChild]
        }
    };

function s_(t, e, n) {
    const r = t._vtc;
    r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e
}

function i_(t, e, n) {
    const r = t.style,
        s = Ce(n);
    if (n && !s) {
        if (e && !Ce(e))
            for (const i in e) n[i] == null && jo(r, i, "");
        for (const i in n) jo(r, i, n[i])
    } else {
        const i = r.display;
        s ? e !== n && (r.cssText = n) : e && t.removeAttribute("style"), "_vod" in t && (r.display = i)
    }
}
const Ql = /\s*!important$/;

function jo(t, e, n) {
    if (Z(n)) n.forEach(r => jo(t, e, r));
    else if (n == null && (n = ""), e.startsWith("--")) t.setProperty(e, n);
    else {
        const r = o_(t, e);
        Ql.test(n) ? t.setProperty(vr(r), n.replace(Ql, ""), "important") : t[r] = n
    }
}
const Zl = ["Webkit", "Moz", "ms"],
    Zi = {};

function o_(t, e) {
    const n = Zi[e];
    if (n) return n;
    let r = Lt(e);
    if (r !== "filter" && r in t) return Zi[e] = r;
    r = Ei(r);
    for (let s = 0; s < Zl.length; s++) {
        const i = Zl[s] + r;
        if (i in t) return Zi[e] = i
    }
    return e
}
const ec = "http://www.w3.org/1999/xlink";

function a_(t, e, n, r, s) {
    if (r && e.startsWith("xlink:")) n == null ? t.removeAttributeNS(ec, e.slice(6, e.length)) : t.setAttributeNS(ec, e, n);
    else {
        const i = up(e);
        n == null || i && !zu(n) ? t.removeAttribute(e) : t.setAttribute(e, i ? "" : n)
    }
}

function l_(t, e, n, r, s, i, o) {
    if (e === "innerHTML" || e === "textContent") {
        r && o(r, s, i), t[e] = n ? ? "";
        return
    }
    const a = t.tagName;
    if (e === "value" && a !== "PROGRESS" && !a.includes("-")) {
        t._value = n;
        const c = a === "OPTION" ? t.getAttribute("value") : t.value,
            u = n ? ? "";
        c !== u && (t.value = u), n == null && t.removeAttribute(e);
        return
    }
    let l = !1;
    if (n === "" || n == null) {
        const c = typeof t[e];
        c === "boolean" ? n = zu(n) : n == null && c === "string" ? (n = "", l = !0) : c === "number" && (n = 0, l = !0)
    }
    try {
        t[e] = n
    } catch {}
    l && t.removeAttribute(e)
}

function c_(t, e, n, r) {
    t.addEventListener(e, n, r)
}

function u_(t, e, n, r) {
    t.removeEventListener(e, n, r)
}

function f_(t, e, n, r, s = null) {
    const i = t._vei || (t._vei = {}),
        o = i[e];
    if (r && o) o.value = r;
    else {
        const [a, l] = h_(e);
        if (r) {
            const c = i[e] = g_(r, s);
            c_(t, a, c, l)
        } else o && (u_(t, a, o, l), i[e] = void 0)
    }
}
const tc = /(?:Once|Passive|Capture)$/;

function h_(t) {
    let e;
    if (tc.test(t)) {
        e = {};
        let r;
        for (; r = t.match(tc);) t = t.slice(0, t.length - r[0].length), e[r[0].toLowerCase()] = !0
    }
    return [t[2] === ":" ? t.slice(3) : vr(t.slice(2)), e]
}
let eo = 0;
const d_ = Promise.resolve(),
    p_ = () => eo || (d_.then(() => eo = 0), eo = Date.now());

function g_(t, e) {
    const n = r => {
        if (!r._vts) r._vts = Date.now();
        else if (r._vts <= n.attached) return;
        _t(__(r, n.value), e, 5, [r])
    };
    return n.value = t, n.attached = p_(), n
}

function __(t, e) {
    if (Z(e)) {
        const n = t.stopImmediatePropagation;
        return t.stopImmediatePropagation = () => {
            n.call(t), t._stopped = !0
        }, e.map(r => s => !s._stopped && r && r(s))
    } else return e
}
const nc = /^on[a-z]/,
    v_ = (t, e, n, r, s = !1, i, o, a, l) => {
        e === "class" ? s_(t, r, s) : e === "style" ? i_(t, n, r) : gs(e) ? Ia(e) || f_(t, e, n, r, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : m_(t, e, r, s)) ? l_(t, e, r, i, o, a, l) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), a_(t, e, r, s))
    };

function m_(t, e, n, r) {
    return r ? !!(e === "innerHTML" || e === "textContent" || e in t && nc.test(e) && te(n)) : e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA" || nc.test(e) && Ce(n) ? !1 : e in t
}

function sE(t) {
    const e = Bn();
    if (!e) return;
    const n = e.ut = (s = t(e.proxy)) => {
            Array.from(document.querySelectorAll(`[data-v-owner="${e.uid}"]`)).forEach(i => Uo(i, s))
        },
        r = () => {
            const s = t(e.proxy);
            Ho(e.subTree, s), n(s)
        };
    fg(r), $i(() => {
        const s = new MutationObserver(r);
        s.observe(e.subTree.el.parentNode, {
            childList: !0
        }), Ya(() => s.disconnect())
    })
}

function Ho(t, e) {
    if (t.shapeFlag & 128) {
        const n = t.suspense;
        t = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
            Ho(n.activeBranch, e)
        })
    }
    for (; t.component;) t = t.component.subTree;
    if (t.shapeFlag & 1 && t.el) Uo(t.el, e);
    else if (t.type === Qe) t.children.forEach(n => Ho(n, e));
    else if (t.type === sr) {
        let {
            el: n,
            anchor: r
        } = t;
        for (; n && (Uo(n, e), n !== r);) n = n.nextSibling
    }
}

function Uo(t, e) {
    if (t.nodeType === 1) {
        const n = t.style;
        for (const r in e) n.setProperty(`--${r}`, e[r])
    }
}
const tn = "transition",
    Cr = "animation",
    Mi = (t, {
        slots: e
    }) => ft(gg, y_(t), e);
Mi.displayName = "Transition";
const Zf = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};
Mi.props = Fe({}, wf, Zf);
const En = (t, e = []) => {
        Z(t) ? t.forEach(n => n(...e)) : t && t(...e)
    },
    rc = t => t ? Z(t) ? t.some(e => e.length > 1) : t.length > 1 : !1;

function y_(t) {
    const e = {};
    for (const M in t) M in Zf || (e[M] = t[M]);
    if (t.css === !1) return e;
    const {
        name: n = "v",
        type: r,
        duration: s,
        enterFromClass: i = `${n}-enter-from`,
        enterActiveClass: o = `${n}-enter-active`,
        enterToClass: a = `${n}-enter-to`,
        appearFromClass: l = i,
        appearActiveClass: c = o,
        appearToClass: u = a,
        leaveFromClass: f = `${n}-leave-from`,
        leaveActiveClass: h = `${n}-leave-active`,
        leaveToClass: d = `${n}-leave-to`
    } = t, _ = b_(s), y = _ && _[0], E = _ && _[1], {
        onBeforeEnter: m,
        onEnter: g,
        onEnterCancelled: x,
        onLeave: b,
        onLeaveCancelled: S,
        onBeforeAppear: $ = m,
        onAppear: O = g,
        onAppearCancelled: k = x
    } = e, H = (M, J, j) => {
        xn(M, J ? u : a), xn(M, J ? c : o), j && j()
    }, D = (M, J) => {
        M._isLeaving = !1, xn(M, f), xn(M, d), xn(M, h), J && J()
    }, z = M => (J, j) => {
        const fe = M ? O : g,
            re = () => H(J, M, j);
        En(fe, [J, re]), sc(() => {
            xn(J, M ? l : i), nn(J, M ? u : a), rc(fe) || ic(J, r, y, re)
        })
    };
    return Fe(e, {
        onBeforeEnter(M) {
            En(m, [M]), nn(M, i), nn(M, o)
        },
        onBeforeAppear(M) {
            En($, [M]), nn(M, l), nn(M, c)
        },
        onEnter: z(!1),
        onAppear: z(!0),
        onLeave(M, J) {
            M._isLeaving = !0;
            const j = () => D(M, J);
            nn(M, f), x_(), nn(M, h), sc(() => {
                M._isLeaving && (xn(M, f), nn(M, d), rc(b) || ic(M, r, E, j))
            }), En(b, [M, j])
        },
        onEnterCancelled(M) {
            H(M, !1), En(x, [M])
        },
        onAppearCancelled(M) {
            H(M, !0), En(k, [M])
        },
        onLeaveCancelled(M) {
            D(M), En(S, [M])
        }
    })
}

function b_(t) {
    if (t == null) return null;
    if (ye(t)) return [to(t.enter), to(t.leave)]; {
        const e = to(t);
        return [e, e]
    }
}

function to(t) {
    return Ku(t)
}

function nn(t, e) {
    e.split(/\s+/).forEach(n => n && t.classList.add(n)), (t._vtc || (t._vtc = new Set)).add(e)
}

function xn(t, e) {
    e.split(/\s+/).forEach(r => r && t.classList.remove(r));
    const {
        _vtc: n
    } = t;
    n && (n.delete(e), n.size || (t._vtc = void 0))
}

function sc(t) {
    requestAnimationFrame(() => {
        requestAnimationFrame(t)
    })
}
let w_ = 0;

function ic(t, e, n, r) {
    const s = t._endId = ++w_,
        i = () => {
            s === t._endId && r()
        };
    if (n) return setTimeout(i, n);
    const {
        type: o,
        timeout: a,
        propCount: l
    } = E_(t, e);
    if (!o) return r();
    const c = o + "end";
    let u = 0;
    const f = () => {
            t.removeEventListener(c, h), i()
        },
        h = d => {
            d.target === t && ++u >= l && f()
        };
    setTimeout(() => {
        u < l && f()
    }, a + 1), t.addEventListener(c, h)
}

function E_(t, e) {
    const n = window.getComputedStyle(t),
        r = _ => (n[_] || "").split(", "),
        s = r(`${tn}Delay`),
        i = r(`${tn}Duration`),
        o = oc(s, i),
        a = r(`${Cr}Delay`),
        l = r(`${Cr}Duration`),
        c = oc(a, l);
    let u = null,
        f = 0,
        h = 0;
    e === tn ? o > 0 && (u = tn, f = o, h = i.length) : e === Cr ? c > 0 && (u = Cr, f = c, h = l.length) : (f = Math.max(o, c), u = f > 0 ? o > c ? tn : Cr : null, h = u ? u === tn ? i.length : l.length : 0);
    const d = u === tn && /\b(transform|all)(,|$)/.test(r(`${tn}Property`).toString());
    return {
        type: u,
        timeout: f,
        propCount: h,
        hasTransform: d
    }
}

function oc(t, e) {
    for (; t.length < e.length;) t = t.concat(t);
    return Math.max(...e.map((n, r) => ac(n) + ac(t[r])))
}

function ac(t) {
    return Number(t.slice(0, -1).replace(",", ".")) * 1e3
}

function x_() {
    return document.body.offsetHeight
}
const iE = {
    beforeMount(t, {
        value: e
    }, {
        transition: n
    }) {
        t._vod = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : Sr(t, e)
    },
    mounted(t, {
        value: e
    }, {
        transition: n
    }) {
        n && e && n.enter(t)
    },
    updated(t, {
        value: e,
        oldValue: n
    }, {
        transition: r
    }) {
        !e != !n && (r ? e ? (r.beforeEnter(t), Sr(t, !0), r.enter(t)) : r.leave(t, () => {
            Sr(t, !1)
        }) : Sr(t, e))
    },
    beforeUnmount(t, {
        value: e
    }) {
        Sr(t, e)
    }
};

function Sr(t, e) {
    t.style.display = e ? t._vod : "none"
}
const eh = Fe({
    patchProp: v_
}, r_);
let Jr, lc = !1;

function k_() {
    return Jr || (Jr = Hg(eh))
}

function C_() {
    return Jr = lc ? Jr : Ug(eh), lc = !0, Jr
}
const S_ = (...t) => {
        const e = k_().createApp(...t),
            {
                mount: n
            } = e;
        return e.mount = r => {
            const s = th(r);
            if (!s) return;
            const i = e._component;
            !te(i) && !i.render && !i.template && (i.template = s.innerHTML), s.innerHTML = "";
            const o = n(s, !1, s instanceof SVGElement);
            return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o
        }, e
    },
    T_ = (...t) => {
        const e = C_().createApp(...t),
            {
                mount: n
            } = e;
        return e.mount = r => {
            const s = th(r);
            if (s) return n(s, !0, s instanceof SVGElement)
        }, e
    };

function th(t) {
    return Ce(t) ? document.querySelector(t) : t
}
const P_ = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
    R_ = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
    A_ = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;

function $_(t, e) {
    if (t === "__proto__" || t === "constructor" && e && typeof e == "object" && "prototype" in e) {
        I_(t);
        return
    }
    return e
}

function I_(t) {
    console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`)
}

function Zs(t, e = {}) {
    if (typeof t != "string") return t;
    const n = t.trim();
    if (t[0] === '"' && t.endsWith('"') && !t.includes("\\")) return n.slice(1, -1);
    if (n.length <= 9) {
        const r = n.toLowerCase();
        if (r === "true") return !0;
        if (r === "false") return !1;
        if (r === "undefined") return;
        if (r === "null") return null;
        if (r === "nan") return Number.NaN;
        if (r === "infinity") return Number.POSITIVE_INFINITY;
        if (r === "-infinity") return Number.NEGATIVE_INFINITY
    }
    if (!A_.test(t)) {
        if (e.strict) throw new SyntaxError("[destr] Invalid JSON");
        return t
    }
    try {
        if (P_.test(t) || R_.test(t)) {
            if (e.strict) throw new Error("[destr] Possible prototype pollution");
            return JSON.parse(t, $_)
        }
        return JSON.parse(t)
    } catch (r) {
        if (e.strict) throw r;
        return t
    }
}
const O_ = /#/g,
    F_ = /&/g,
    M_ = /\//g,
    L_ = /=/g,
    nl = /\+/g,
    N_ = /%5e/gi,
    D_ = /%60/gi,
    j_ = /%7c/gi,
    H_ = /%20/gi;

function U_(t) {
    return encodeURI("" + t).replace(j_, "|")
}

function Bo(t) {
    return U_(typeof t == "string" ? t : JSON.stringify(t)).replace(nl, "%2B").replace(H_, "+").replace(O_, "%23").replace(F_, "%26").replace(D_, "`").replace(N_, "^").replace(M_, "%2F")
}

function no(t) {
    return Bo(t).replace(L_, "%3D")
}

function ei(t = "") {
    try {
        return decodeURIComponent("" + t)
    } catch {
        return "" + t
    }
}

function B_(t) {
    return ei(t.replace(nl, " "))
}

function q_(t) {
    return ei(t.replace(nl, " "))
}

function W_(t = "") {
    const e = {};
    t[0] === "?" && (t = t.slice(1));
    for (const n of t.split("&")) {
        const r = n.match(/([^=]+)=?(.*)/) || [];
        if (r.length < 2) continue;
        const s = B_(r[1]);
        if (s === "__proto__" || s === "constructor") continue;
        const i = q_(r[2] || "");
        e[s] === void 0 ? e[s] = i : Array.isArray(e[s]) ? e[s].push(i) : e[s] = [e[s], i]
    }
    return e
}

function V_(t, e) {
    return (typeof e == "number" || typeof e == "boolean") && (e = String(e)), e ? Array.isArray(e) ? e.map(n => `${no(t)}=${Bo(n)}`).join("&") : `${no(t)}=${Bo(e)}` : no(t)
}

function K_(t) {
    return Object.keys(t).filter(e => t[e] !== void 0).map(e => V_(e, t[e])).filter(Boolean).join("&")
}
const z_ = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/,
    G_ = /^[\s\w\0+.-]{2,}:([/\\]{2})?/,
    Y_ = /^([/\\]\s*){2,}[^/\\]/,
    J_ = /^[\s\0]*(blob|data|javascript|vbscript):$/i,
    X_ = /\/$|\/\?|\/#/,
    Q_ = /^\.?\//;

function Li(t, e = {}) {
    return typeof e == "boolean" && (e = {
        acceptRelative: e
    }), e.strict ? z_.test(t) : G_.test(t) || (e.acceptRelative ? Y_.test(t) : !1)
}

function Z_(t) {
    return !!t && J_.test(t)
}

function qo(t = "", e) {
    return e ? X_.test(t) : t.endsWith("/")
}

function nh(t = "", e) {
    if (!e) return (qo(t) ? t.slice(0, -1) : t) || "/";
    if (!qo(t, !0)) return t || "/";
    let n = t,
        r = "";
    const s = t.indexOf("#");
    s >= 0 && (n = t.slice(0, s), r = t.slice(s));
    const [i, ...o] = n.split("?");
    return ((i.endsWith("/") ? i.slice(0, -1) : i) || "/") + (o.length > 0 ? `?${o.join("?")}` : "") + r
}

function Wo(t = "", e) {
    if (!e) return t.endsWith("/") ? t : t + "/";
    if (qo(t, !0)) return t || "/";
    let n = t,
        r = "";
    const s = t.indexOf("#");
    if (s >= 0 && (n = t.slice(0, s), r = t.slice(s), !n)) return r;
    const [i, ...o] = n.split("?");
    return i + "/" + (o.length > 0 ? `?${o.join("?")}` : "") + r
}

function ev(t = "") {
    return t.startsWith("/")
}

function cc(t = "") {
    return ev(t) ? t : "/" + t
}

function tv(t, e) {
    if (rh(e) || Li(t)) return t;
    const n = nh(e);
    return t.startsWith(n) ? t : Ni(n, t)
}

function uc(t, e) {
    if (rh(e)) return t;
    const n = nh(e);
    if (!t.startsWith(n)) return t;
    const r = t.slice(n.length);
    return r[0] === "/" ? r : "/" + r
}

function rl(t, e) {
    const n = sl(t),
        r = { ...W_(n.search),
            ...e
        };
    return n.search = K_(r), sv(n)
}

function rh(t) {
    return !t || t === "/"
}

function nv(t) {
    return t && t !== "/"
}

function Ni(t, ...e) {
    let n = t || "";
    for (const r of e.filter(s => nv(s)))
        if (n) {
            const s = r.replace(Q_, "");
            n = Wo(n) + s
        } else n = r;
    return n
}

function rv(t, e, n = {}) {
    return n.trailingSlash || (t = Wo(t), e = Wo(e)), n.leadingSlash || (t = cc(t), e = cc(e)), n.encoding || (t = ei(t), e = ei(e)), t === e
}
const sh = Symbol.for("ufo:protocolRelative");

function sl(t = "", e) {
    const n = t.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
    if (n) {
        const [, f, h = ""] = n;
        return {
            protocol: f.toLowerCase(),
            pathname: h,
            href: f + h,
            auth: "",
            host: "",
            search: "",
            hash: ""
        }
    }
    if (!Li(t, {
            acceptRelative: !0
        })) return e ? sl(e + t) : fc(t);
    const [, r = "", s, i = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
    let [, o = "", a = ""] = i.match(/([^#/?]*)(.*)?/) || [];
    r === "file:" && (a = a.replace(/\/(?=[A-Za-z]:)/, ""));
    const {
        pathname: l,
        search: c,
        hash: u
    } = fc(a);
    return {
        protocol: r.toLowerCase(),
        auth: s ? s.slice(0, Math.max(0, s.length - 1)) : "",
        host: o,
        pathname: l,
        search: c,
        hash: u,
        [sh]: !r
    }
}

function fc(t = "") {
    const [e = "", n = "", r = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
    return {
        pathname: e,
        search: n,
        hash: r
    }
}

function sv(t) {
    const e = t.pathname || "",
        n = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "",
        r = t.hash || "",
        s = t.auth ? t.auth + "@" : "",
        i = t.host || "";
    return (t.protocol || t[sh] ? (t.protocol || "") + "//" : "") + s + i + e + n + r
}
class iv extends Error {
    constructor(e, n) {
        super(e, n), this.name = "FetchError", n != null && n.cause && !this.cause && (this.cause = n.cause)
    }
}

function ov(t) {
    var l, c, u, f, h;
    const e = ((l = t.error) == null ? void 0 : l.message) || ((c = t.error) == null ? void 0 : c.toString()) || "",
        n = ((u = t.request) == null ? void 0 : u.method) || ((f = t.options) == null ? void 0 : f.method) || "GET",
        r = ((h = t.request) == null ? void 0 : h.url) || String(t.request) || "/",
        s = `[${n}] ${JSON.stringify(r)}`,
        i = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>",
        o = `${s}: ${i}${e?` ${e}`:""}`,
        a = new iv(o, t.error ? {
            cause: t.error
        } : void 0);
    for (const d of ["request", "options", "response"]) Object.defineProperty(a, d, {
        get() {
            return t[d]
        }
    });
    for (const [d, _] of [
            ["data", "_data"],
            ["status", "status"],
            ["statusCode", "status"],
            ["statusText", "statusText"],
            ["statusMessage", "statusText"]
        ]) Object.defineProperty(a, d, {
        get() {
            return t.response && t.response[_]
        }
    });
    return a
}
const av = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));

function hc(t = "GET") {
    return av.has(t.toUpperCase())
}

function lv(t) {
    if (t === void 0) return !1;
    const e = typeof t;
    return e === "string" || e === "number" || e === "boolean" || e === null ? !0 : e !== "object" ? !1 : Array.isArray(t) ? !0 : t.buffer ? !1 : t.constructor && t.constructor.name === "Object" || typeof t.toJSON == "function"
}
const cv = new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]),
    uv = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;

function fv(t = "") {
    if (!t) return "json";
    const e = t.split(";").shift() || "";
    return uv.test(e) ? "json" : cv.has(e) || e.startsWith("text/") ? "text" : "blob"
}

function hv(t, e, n = globalThis.Headers) {
    const r = { ...e,
        ...t
    };
    if (e != null && e.params && (t != null && t.params) && (r.params = { ...e == null ? void 0 : e.params,
            ...t == null ? void 0 : t.params
        }), e != null && e.query && (t != null && t.query) && (r.query = { ...e == null ? void 0 : e.query,
            ...t == null ? void 0 : t.query
        }), e != null && e.headers && (t != null && t.headers)) {
        r.headers = new n((e == null ? void 0 : e.headers) || {});
        for (const [s, i] of new n((t == null ? void 0 : t.headers) || {})) r.headers.set(s, i)
    }
    return r
}
const dv = new Set([408, 409, 425, 429, 500, 502, 503, 504]),
    pv = new Set([101, 204, 205, 304]);

function ih(t = {}) {
    const {
        fetch: e = globalThis.fetch,
        Headers: n = globalThis.Headers,
        AbortController: r = globalThis.AbortController
    } = t;
    async function s(a) {
        const l = a.error && a.error.name === "AbortError" && !a.options.timeout || !1;
        if (a.options.retry !== !1 && !l) {
            let u;
            typeof a.options.retry == "number" ? u = a.options.retry : u = hc(a.options.method) ? 0 : 1;
            const f = a.response && a.response.status || 500;
            if (u > 0 && (Array.isArray(a.options.retryStatusCodes) ? a.options.retryStatusCodes.includes(f) : dv.has(f))) {
                const h = a.options.retryDelay || 0;
                return h > 0 && await new Promise(d => setTimeout(d, h)), i(a.request, { ...a.options,
                    retry: u - 1,
                    timeout: a.options.timeout
                })
            }
        }
        const c = ov(a);
        throw Error.captureStackTrace && Error.captureStackTrace(c, i), c
    }
    const i = async function(l, c = {}) {
            var h;
            const u = {
                request: l,
                options: hv(c, t.defaults, n),
                response: void 0,
                error: void 0
            };
            if (u.options.method = (h = u.options.method) == null ? void 0 : h.toUpperCase(), u.options.onRequest && await u.options.onRequest(u), typeof u.request == "string" && (u.options.baseURL && (u.request = tv(u.request, u.options.baseURL)), (u.options.query || u.options.params) && (u.request = rl(u.request, { ...u.options.params,
                    ...u.options.query
                }))), u.options.body && hc(u.options.method) && (lv(u.options.body) ? (u.options.body = typeof u.options.body == "string" ? u.options.body : JSON.stringify(u.options.body), u.options.headers = new n(u.options.headers || {}), u.options.headers.has("content-type") || u.options.headers.set("content-type", "application/json"), u.options.headers.has("accept") || u.options.headers.set("accept", "application/json")) : ("pipeTo" in u.options.body && typeof u.options.body.pipeTo == "function" || typeof u.options.body.pipe == "function") && ("duplex" in u.options || (u.options.duplex = "half"))), !u.options.signal && u.options.timeout) {
                const d = new r;
                setTimeout(() => d.abort(), u.options.timeout), u.options.signal = d.signal
            }
            try {
                u.response = await e(u.request, u.options)
            } catch (d) {
                return u.error = d, u.options.onRequestError && await u.options.onRequestError(u), await s(u)
            }
            if (u.response.body && !pv.has(u.response.status) && u.options.method !== "HEAD") {
                const d = (u.options.parseResponse ? "json" : u.options.responseType) || fv(u.response.headers.get("content-type") || "");
                switch (d) {
                    case "json":
                        {
                            const _ = await u.response.text(),
                                y = u.options.parseResponse || Zs;u.response._data = y(_);
                            break
                        }
                    case "stream":
                        {
                            u.response._data = u.response.body;
                            break
                        }
                    default:
                        u.response._data = await u.response[d]()
                }
            }
            return u.options.onResponse && await u.options.onResponse(u), !u.options.ignoreResponseError && u.response.status >= 400 && u.response.status < 600 ? (u.options.onResponseError && await u.options.onResponseError(u), await s(u)) : u.response
        },
        o = async function(l, c) {
            return (await i(l, c))._data
        };
    return o.raw = i, o.native = (...a) => e(...a), o.create = (a = {}) => ih({ ...t,
        defaults: { ...t.defaults,
            ...a
        }
    }), o
}
const il = function() {
        if (typeof globalThis < "u") return globalThis;
        if (typeof self < "u") return self;
        if (typeof window < "u") return window;
        if (typeof global < "u") return global;
        throw new Error("unable to locate global object")
    }(),
    gv = il.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),
    _v = il.Headers,
    vv = il.AbortController,
    mv = ih({
        fetch: gv,
        Headers: _v,
        AbortController: vv
    }),
    yv = mv,
    bv = () => {
        var t;
        return ((t = window == null ? void 0 : window.__NUXT__) == null ? void 0 : t.config) || {}
    },
    ti = bv().app,
    wv = () => ti.baseURL,
    Ev = () => ti.buildAssetsDir,
    xv = (...t) => Ni(oh(), Ev(), ...t),
    oh = (...t) => {
        const e = ti.cdnURL || ti.baseURL;
        return t.length ? Ni(e, ...t) : e
    };
globalThis.__buildAssetsURL = xv, globalThis.__publicAssetsURL = oh;

function Vo(t, e = {}, n) {
    for (const r in t) {
        const s = t[r],
            i = n ? `${n}:${r}` : r;
        typeof s == "object" && s !== null ? Vo(s, e, i) : typeof s == "function" && (e[i] = s)
    }
    return e
}
const kv = {
        run: t => t()
    },
    Cv = () => kv,
    ah = typeof console.createTask < "u" ? console.createTask : Cv;

function Sv(t, e) {
    const n = e.shift(),
        r = ah(n);
    return t.reduce((s, i) => s.then(() => r.run(() => i(...e))), Promise.resolve())
}

function Tv(t, e) {
    const n = e.shift(),
        r = ah(n);
    return Promise.all(t.map(s => r.run(() => s(...e))))
}

function ro(t, e) {
    for (const n of [...t]) n(e)
}
class Pv {
    constructor() {
        this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this)
    }
    hook(e, n, r = {}) {
        if (!e || typeof n != "function") return () => {};
        const s = e;
        let i;
        for (; this._deprecatedHooks[e];) i = this._deprecatedHooks[e], e = i.to;
        if (i && !r.allowDeprecated) {
            let o = i.message;
            o || (o = `${s} hook has been deprecated` + (i.to ? `, please use ${i.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = new Set), this._deprecatedMessages.has(o) || (console.warn(o), this._deprecatedMessages.add(o))
        }
        if (!n.name) try {
            Object.defineProperty(n, "name", {
                get: () => "_" + e.replace(/\W+/g, "_") + "_hook_cb",
                configurable: !0
            })
        } catch {}
        return this._hooks[e] = this._hooks[e] || [], this._hooks[e].push(n), () => {
            n && (this.removeHook(e, n), n = void 0)
        }
    }
    hookOnce(e, n) {
        let r, s = (...i) => (typeof r == "function" && r(), r = void 0, s = void 0, n(...i));
        return r = this.hook(e, s), r
    }
    removeHook(e, n) {
        if (this._hooks[e]) {
            const r = this._hooks[e].indexOf(n);
            r !== -1 && this._hooks[e].splice(r, 1), this._hooks[e].length === 0 && delete this._hooks[e]
        }
    }
    deprecateHook(e, n) {
        this._deprecatedHooks[e] = typeof n == "string" ? {
            to: n
        } : n;
        const r = this._hooks[e] || [];
        delete this._hooks[e];
        for (const s of r) this.hook(e, s)
    }
    deprecateHooks(e) {
        Object.assign(this._deprecatedHooks, e);
        for (const n in e) this.deprecateHook(n, e[n])
    }
    addHooks(e) {
        const n = Vo(e),
            r = Object.keys(n).map(s => this.hook(s, n[s]));
        return () => {
            for (const s of r.splice(0, r.length)) s()
        }
    }
    removeHooks(e) {
        const n = Vo(e);
        for (const r in n) this.removeHook(r, n[r])
    }
    removeAllHooks() {
        for (const e in this._hooks) delete this._hooks[e]
    }
    callHook(e, ...n) {
        return n.unshift(e), this.callHookWith(Sv, e, ...n)
    }
    callHookParallel(e, ...n) {
        return n.unshift(e), this.callHookWith(Tv, e, ...n)
    }
    callHookWith(e, n, ...r) {
        const s = this._before || this._after ? {
            name: n,
            args: r,
            context: {}
        } : void 0;
        this._before && ro(this._before, s);
        const i = e(n in this._hooks ? [...this._hooks[n]] : [], r);
        return i instanceof Promise ? i.finally(() => {
            this._after && s && ro(this._after, s)
        }) : (this._after && s && ro(this._after, s), i)
    }
    beforeEach(e) {
        return this._before = this._before || [], this._before.push(e), () => {
            if (this._before !== void 0) {
                const n = this._before.indexOf(e);
                n !== -1 && this._before.splice(n, 1)
            }
        }
    }
    afterEach(e) {
        return this._after = this._after || [], this._after.push(e), () => {
            if (this._after !== void 0) {
                const n = this._after.indexOf(e);
                n !== -1 && this._after.splice(n, 1)
            }
        }
    }
}

function lh() {
    return new Pv
}

function Rv(t = {}) {
    let e, n = !1;
    const r = o => {
        if (e && e !== o) throw new Error("Context conflict")
    };
    let s;
    if (t.asyncContext) {
        const o = t.AsyncLocalStorage || globalThis.AsyncLocalStorage;
        o ? s = new o : console.warn("[unctx] `AsyncLocalStorage` is not provided.")
    }
    const i = () => {
        if (s && e === void 0) {
            const o = s.getStore();
            if (o !== void 0) return o
        }
        return e
    };
    return {
        use: () => {
            const o = i();
            if (o === void 0) throw new Error("Context is not available");
            return o
        },
        tryUse: () => i(),
        set: (o, a) => {
            a || r(o), e = o, n = !0
        },
        unset: () => {
            e = void 0, n = !1
        },
        call: (o, a) => {
            r(o), e = o;
            try {
                return s ? s.run(o, a) : a()
            } finally {
                n || (e = void 0)
            }
        },
        async callAsync(o, a) {
            e = o;
            const l = () => {
                    e = o
                },
                c = () => e === o ? l : void 0;
            Ko.add(c);
            try {
                const u = s ? s.run(o, a) : a();
                return n || (e = void 0), await u
            } finally {
                Ko.delete(c)
            }
        }
    }
}

function Av(t = {}) {
    const e = {};
    return {
        get(n, r = {}) {
            return e[n] || (e[n] = Rv({ ...t,
                ...r
            })), e[n], e[n]
        }
    }
}
const ni = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : typeof window < "u" ? window : {},
    dc = "__unctx__",
    $v = ni[dc] || (ni[dc] = Av()),
    Iv = (t, e = {}) => $v.get(t, e),
    pc = "__unctx_async_handlers__",
    Ko = ni[pc] || (ni[pc] = new Set);

function ri(t) {
    const e = [];
    for (const s of Ko) {
        const i = s();
        i && e.push(i)
    }
    const n = () => {
        for (const s of e) s()
    };
    let r = t();
    return r && typeof r == "object" && "catch" in r && (r = r.catch(s => {
        throw n(), s
    })), [r, n]
}
const ch = Iv("nuxt-app", {
        asyncContext: !1
    }),
    Ov = "__nuxt_plugin";

function Fv(t) {
    let e = 0;
    const n = {
        provide: void 0,
        globalName: "nuxt",
        versions: {
            get nuxt() {
                return "3.7.3"
            },
            get vue() {
                return n.vueApp.version
            }
        },
        payload: Gt({
            data: {},
            state: {},
            _errors: {},
            ...window.__NUXT__ ? ? {}
        }),
        static: {
            data: {}
        },
        runWithContext: s => Nv(n, s),
        isHydrating: !0,
        deferHydration() {
            if (!n.isHydrating) return () => {};
            e++;
            let s = !1;
            return () => {
                if (!s && (s = !0, e--, e === 0)) return n.isHydrating = !1, n.callHook("app:suspense:resolve")
            }
        },
        _asyncDataPromises: {},
        _asyncData: {},
        _payloadRevivers: {},
        ...t
    };
    n.hooks = lh(), n.hook = n.hooks.hook, n.callHook = n.hooks.callHook, n.provide = (s, i) => {
        const o = "$" + s;
        $s(n, o, i), $s(n.vueApp.config.globalProperties, o, i)
    }, $s(n.vueApp, "$nuxt", n), $s(n.vueApp.config.globalProperties, "$nuxt", n); {
        window.addEventListener("nuxt.preloadError", i => {
            n.callHook("app:chunkError", {
                error: i.payload
            })
        }), window.useNuxtApp = window.useNuxtApp || Ne;
        const s = n.hook("app:error", (...i) => {
            console.error("[nuxt] error caught during app initialization", ...i)
        });
        n.hook("app:mounted", s)
    }
    const r = Gt(n.payload.config);
    return n.provide("config", r), n
}
async function Mv(t, e) {
    if (e.hooks && t.hooks.addHooks(e.hooks), typeof e == "function") {
        const {
            provide: n
        } = await t.runWithContext(() => e(t)) || {};
        if (n && typeof n == "object")
            for (const r in n) t.provide(r, n[r])
    }
}
async function Lv(t, e) {
    const n = [],
        r = [];
    for (const s of e) {
        const i = Mv(t, s);
        s.parallel ? n.push(i.catch(o => r.push(o))) : await i
    }
    if (await Promise.all(n), r.length) throw r[0]
} /*! @__NO_SIDE_EFFECTS__ */
function Xt(t) {
    return typeof t == "function" ? t : (delete t.name, Object.assign(t.setup || (() => {}), t, {
        [Ov]: !0
    }))
}

function Nv(t, e, n) {
    const r = () => n ? e(...n) : e();
    return ch.set(t), t.vueApp.runWithContext(r)
} /*! @__NO_SIDE_EFFECTS__ */
function Ne() {
    var e;
    let t;
    if (Ff() && (t = (e = Bn()) == null ? void 0 : e.appContext.app.$nuxt), t = t || ch.tryUse(), !t) throw new Error("[nuxt] instance unavailable");
    return t
} /*! @__NO_SIDE_EFFECTS__ */
function Di() {
    return Ne().$config
}

function $s(t, e, n) {
    Object.defineProperty(t, e, {
        get: () => n
    })
}
const Dv = "modulepreload",
    jv = function(t, e) {
        return t[0] === "." ? new URL(t, e).href : t
    },
    gc = {},
    Hv = function(e, n, r) {
        if (!n || n.length === 0) return e();
        const s = document.getElementsByTagName("link");
        return Promise.all(n.map(i => {
            if (i = jv(i, r), i in gc) return;
            gc[i] = !0;
            const o = i.endsWith(".css"),
                a = o ? '[rel="stylesheet"]' : "";
            if (!!r)
                for (let u = s.length - 1; u >= 0; u--) {
                    const f = s[u];
                    if (f.href === i && (!o || f.rel === "stylesheet")) return
                } else if (document.querySelector(`link[href="${i}"]${a}`)) return;
            const c = document.createElement("link");
            if (c.rel = o ? "stylesheet" : Dv, o || (c.as = "script", c.crossOrigin = ""), c.href = i, document.head.appendChild(c), o) return new Promise((u, f) => {
                c.addEventListener("load", u), c.addEventListener("error", () => f(new Error(`Unable to preload CSS for ${i}`)))
            })
        })).then(() => e()).catch(i => {
            const o = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (o.payload = i, window.dispatchEvent(o), !o.defaultPrevented) throw i
        })
    },
    qe = (...t) => Hv(...t).catch(e => {
        const n = new Event("nuxt.preloadError");
        throw n.payload = e, window.dispatchEvent(n), e
    }),
    Uv = -1,
    Bv = -2,
    qv = -3,
    Wv = -4,
    Vv = -5,
    Kv = -6;

function zv(t, e) {
    return Gv(JSON.parse(t), e)
}

function Gv(t, e) {
    if (typeof t == "number") return s(t, !0);
    if (!Array.isArray(t) || t.length === 0) throw new Error("Invalid input");
    const n = t,
        r = Array(n.length);

    function s(i, o = !1) {
        if (i === Uv) return;
        if (i === qv) return NaN;
        if (i === Wv) return 1 / 0;
        if (i === Vv) return -1 / 0;
        if (i === Kv) return -0;
        if (o) throw new Error("Invalid input");
        if (i in r) return r[i];
        const a = n[i];
        if (!a || typeof a != "object") r[i] = a;
        else if (Array.isArray(a))
            if (typeof a[0] == "string") {
                const l = a[0],
                    c = e == null ? void 0 : e[l];
                if (c) return r[i] = c(s(a[1]));
                switch (l) {
                    case "Date":
                        r[i] = new Date(a[1]);
                        break;
                    case "Set":
                        const u = new Set;
                        r[i] = u;
                        for (let d = 1; d < a.length; d += 1) u.add(s(a[d]));
                        break;
                    case "Map":
                        const f = new Map;
                        r[i] = f;
                        for (let d = 1; d < a.length; d += 2) f.set(s(a[d]), s(a[d + 1]));
                        break;
                    case "RegExp":
                        r[i] = new RegExp(a[1], a[2]);
                        break;
                    case "Object":
                        r[i] = Object(a[1]);
                        break;
                    case "BigInt":
                        r[i] = BigInt(a[1]);
                        break;
                    case "null":
                        const h = Object.create(null);
                        r[i] = h;
                        for (let d = 1; d < a.length; d += 2) h[a[d]] = s(a[d + 1]);
                        break;
                    default:
                        throw new Error(`Unknown type ${l}`)
                }
            } else {
                const l = new Array(a.length);
                r[i] = l;
                for (let c = 0; c < a.length; c += 1) {
                    const u = a[c];
                    u !== Bv && (l[c] = s(u))
                }
            }
        else {
            const l = {};
            r[i] = l;
            for (const c in a) {
                const u = a[c];
                l[c] = s(u)
            }
        }
        return r[i]
    }
    return s(0)
}

function Yv(t) {
    return Array.isArray(t) ? t : [t]
}
const Jv = ["title", "titleTemplate", "script", "style", "noscript"],
    Us = ["base", "meta", "link", "style", "script", "noscript"],
    Xv = ["title", "titleTemplate", "templateParams", "base", "htmlAttrs", "bodyAttrs", "meta", "link", "style", "script", "noscript"],
    Qv = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"],
    uh = ["tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"],
    Zv = typeof window < "u";

function fh(t) {
    let e = 9;
    for (let n = 0; n < t.length;) e = Math.imul(e ^ t.charCodeAt(n++), 9 ** 9);
    return ((e ^ e >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase()
}

function _c(t) {
    return t._h || fh(t._d ? t._d : `${t.tag}:${t.textContent||t.innerHTML||""}:${Object.entries(t.props).map(([e,n])=>`${e}:${String(n)}`).join(",")}`)
}

function hh(t, e) {
    const {
        props: n,
        tag: r
    } = t;
    if (Qv.includes(r)) return r;
    if (r === "link" && n.rel === "canonical") return "canonical";
    if (n.charset) return "charset";
    const s = ["id"];
    r === "meta" && s.push("name", "property", "http-equiv");
    for (const i of s)
        if (typeof n[i] < "u") {
            const o = String(n[i]);
            return e && !e(o) ? !1 : `${r}:${i}:${o}`
        }
    return !1
}

function vc(t, e) {
    return t == null ? e || null : typeof t == "function" ? t(e) : t
}

function dh(t, e) {
    const n = [],
        r = e.resolveKeyData || (i => i.key),
        s = e.resolveValueData || (i => i.value);
    for (const [i, o] of Object.entries(t)) n.push(...(Array.isArray(o) ? o : [o]).map(a => {
        const l = {
                key: i,
                value: a
            },
            c = s(l);
        return typeof c == "object" ? dh(c, e) : Array.isArray(c) ? c : {
            [typeof e.key == "function" ? e.key(l) : e.key]: r(l),
            [typeof e.value == "function" ? e.value(l) : e.value]: c
        }
    }).flat());
    return n
}

function ph(t, e) {
    return Object.entries(t).map(([n, r]) => {
        if (typeof r == "object" && (r = ph(r, e)), e.resolve) {
            const s = e.resolve({
                key: n,
                value: r
            });
            if (s) return s
        }
        return typeof r == "number" && (r = r.toString()), typeof r == "string" && e.wrapValue && (r = r.replace(new RegExp(e.wrapValue, "g"), `\\${e.wrapValue}`), r = `${e.wrapValue}${r}${e.wrapValue}`), `${n}${e.keyValueSeparator||""}${r}`
    }).join(e.entrySeparator || "")
}
const Ye = t => ({
        keyValue: t,
        metaKey: "property"
    }),
    so = t => ({
        keyValue: t
    }),
    ol = {
        appleItunesApp: {
            unpack: {
                entrySeparator: ", ",
                resolve({
                    key: t,
                    value: e
                }) {
                    return `${Kt(t)}=${e}`
                }
            }
        },
        articleExpirationTime: Ye("article:expiration_time"),
        articleModifiedTime: Ye("article:modified_time"),
        articlePublishedTime: Ye("article:published_time"),
        bookReleaseDate: Ye("book:release_date"),
        charset: {
            metaKey: "charset"
        },
        contentSecurityPolicy: {
            unpack: {
                entrySeparator: "; ",
                resolve({
                    key: t,
                    value: e
                }) {
                    return `${Kt(t)} ${e}`
                }
            },
            metaKey: "http-equiv"
        },
        contentType: {
            metaKey: "http-equiv"
        },
        defaultStyle: {
            metaKey: "http-equiv"
        },
        fbAppId: Ye("fb:app_id"),
        msapplicationConfig: so("msapplication-Config"),
        msapplicationTileColor: so("msapplication-TileColor"),
        msapplicationTileImage: so("msapplication-TileImage"),
        ogAudioSecureUrl: Ye("og:audio:secure_url"),
        ogAudioUrl: Ye("og:audio"),
        ogImageSecureUrl: Ye("og:image:secure_url"),
        ogImageUrl: Ye("og:image"),
        ogSiteName: Ye("og:site_name"),
        ogVideoSecureUrl: Ye("og:video:secure_url"),
        ogVideoUrl: Ye("og:video"),
        profileFirstName: Ye("profile:first_name"),
        profileLastName: Ye("profile:last_name"),
        profileUsername: Ye("profile:username"),
        refresh: {
            metaKey: "http-equiv",
            unpack: {
                entrySeparator: ";",
                keyValueSeparator: "=",
                resolve({
                    key: t,
                    value: e
                }) {
                    if (t === "seconds") return `${e}`
                }
            }
        },
        robots: {
            unpack: {
                entrySeparator: ", ",
                resolve({
                    key: t,
                    value: e
                }) {
                    return typeof e == "boolean" ? `${Kt(t)}` : `${Kt(t)}:${e}`
                }
            }
        },
        xUaCompatible: {
            metaKey: "http-equiv"
        }
    },
    gh = ["og", "book", "article", "profile"];

function _h(t) {
    var n;
    const e = Kt(t).split(":")[0];
    return gh.includes(e) ? "property" : ((n = ol[t]) == null ? void 0 : n.metaKey) || "name"
}

function em(t) {
    var e;
    return ((e = ol[t]) == null ? void 0 : e.keyValue) || Kt(t)
}

function Kt(t) {
    const e = t.replace(/([A-Z])/g, "-$1").toLowerCase(),
        n = e.split("-")[0];
    return gh.includes(n) || n === "twitter" ? t.replace(/([A-Z])/g, ":$1").toLowerCase() : e
}

function zo(t) {
    if (Array.isArray(t)) return t.map(n => zo(n));
    if (typeof t != "object" || Array.isArray(t)) return t;
    const e = {};
    for (const [n, r] of Object.entries(t)) e[Kt(n)] = zo(r);
    return e
}

function tm(t, e) {
    const n = ol[e];
    return e === "refresh" ? `${t.seconds};url=${t.url}` : ph(zo(t), {
        entrySeparator: ", ",
        resolve({
            value: r,
            key: s
        }) {
            if (r === null) return "";
            if (typeof r == "boolean") return `${s}`
        },
        ...n == null ? void 0 : n.unpack
    })
}
const vh = ["og:image", "og:video", "og:audio", "twitter:image"];

function mh(t) {
    const e = {};
    return Object.entries(t).forEach(([n, r]) => {
        String(r) !== "false" && n && (e[n] = r)
    }), e
}

function mc(t, e) {
    const n = mh(e),
        r = Kt(t),
        s = _h(r);
    if (vh.includes(r)) {
        const i = {};
        return Object.entries(n).forEach(([a, l]) => {
            i[`${t}${a==="url"?"":`${a.charAt(0).toUpperCase()}${a.slice(1)}`}`] = l
        }), yh(i).sort((a, l) => {
            var c, u;
            return (((c = a[s]) == null ? void 0 : c.length) || 0) - (((u = l[s]) == null ? void 0 : u.length) || 0)
        })
    }
    return [{
        [s]: r,
        ...n
    }]
}

function yh(t) {
    const e = [],
        n = {};
    Object.entries(t).forEach(([s, i]) => {
        if (!Array.isArray(i)) {
            if (typeof i == "object" && i) {
                if (vh.includes(Kt(s))) {
                    e.push(...mc(s, i));
                    return
                }
                n[s] = mh(i)
            } else n[s] = i;
            return
        }
        i.forEach(o => {
            e.push(...typeof o == "string" ? yh({
                [s]: o
            }) : mc(s, o))
        })
    });
    const r = dh(n, {
        key({
            key: s
        }) {
            return _h(s)
        },
        value({
            key: s
        }) {
            return s === "charset" ? "charset" : "content"
        },
        resolveKeyData({
            key: s
        }) {
            return em(s)
        },
        resolveValueData({
            value: s,
            key: i
        }) {
            return s === null ? "_null" : typeof s == "object" ? tm(s, i) : typeof s == "number" ? s.toString() : s
        }
    });
    return [...e, ...r].map(s => (s.content === "_null" && (s.content = null), s))
}
async function nm(t, e, n) {
    const r = {
        tag: t,
        props: await bh(typeof e == "object" && typeof e != "function" && !(e instanceof Promise) ? { ...e
        } : {
            [
                ["script", "noscript", "style"].includes(t) ? "innerHTML" : "textContent"
            ]: e
        }, ["templateParams", "titleTemplate"].includes(t))
    };
    return uh.forEach(s => {
        const i = typeof r.props[s] < "u" ? r.props[s] : n[s];
        typeof i < "u" && ((!["innerHTML", "textContent"].includes(s) || Jv.includes(r.tag)) && (r[s] = i), delete r.props[s])
    }), r.props.body && (r.tagPosition = "bodyClose", delete r.props.body), r.props.children && (r.innerHTML = r.props.children, delete r.props.children), r.tag === "script" && (typeof r.innerHTML == "object" && (r.innerHTML = JSON.stringify(r.innerHTML), r.props.type = r.props.type || "application/json"), r.innerHTML && ["application/ld+json", "application/json"].includes(r.props.type) && (r.innerHTML = r.innerHTML.replace(/</g, "\\u003C"))), Array.isArray(r.props.content) ? r.props.content.map(s => ({ ...r,
        props: { ...r.props,
            content: s
        }
    })) : r
}

function rm(t) {
    return typeof t == "object" && !Array.isArray(t) && (t = Object.keys(t).filter(e => t[e])), (Array.isArray(t) ? t.join(" ") : t).split(" ").filter(e => e.trim()).filter(Boolean).join(" ")
}
async function bh(t, e) {
    for (const n of Object.keys(t)) {
        if (n === "class") {
            t[n] = rm(t[n]);
            continue
        }
        if (t[n] instanceof Promise && (t[n] = await t[n]), !e && !uh.includes(n)) {
            const r = String(t[n]),
                s = n.startsWith("data-");
            r === "true" || r === "" ? t[n] = s ? "true" : !0 : t[n] || (s && r === "false" ? t[n] = "false" : delete t[n])
        }
    }
    return t
}
const sm = 10;
async function im(t) {
    const e = [];
    return Object.entries(t.resolvedInput).filter(([n, r]) => typeof r < "u" && Xv.includes(n)).forEach(([n, r]) => {
        const s = Yv(r);
        e.push(...s.map(i => nm(n, i, t)).flat())
    }), (await Promise.all(e)).flat().filter(Boolean).map((n, r) => (n._e = t._i, t.mode && (n._m = t.mode), n._p = (t._i << sm) + r, n))
}
const yc = {
        base: -10,
        title: 10
    },
    bc = {
        critical: -80,
        high: -10,
        low: 20
    };

function si(t) {
    let e = 100;
    const n = t.tagPriority;
    return typeof n == "number" ? n : (t.tag === "meta" ? (t.props["http-equiv"] === "content-security-policy" && (e = -30), t.props.charset && (e = -20), t.props.name === "viewport" && (e = -15)) : t.tag === "link" && t.props.rel === "preconnect" ? e = 20 : t.tag in yc && (e = yc[t.tag]), typeof n == "string" && n in bc ? e + bc[n] : e)
}
const om = [{
        prefix: "before:",
        offset: -1
    }, {
        prefix: "after:",
        offset: 1
    }],
    rn = "%separator";

function Tn(t, e, n) {
    if (typeof t != "string" || !t.includes("%")) return t;

    function r(o) {
        let a;
        return ["s", "pageTitle"].includes(o) ? a = e.pageTitle : o.includes(".") ? a = o.split(".").reduce((l, c) => l && l[c] || void 0, e) : a = e[o], typeof a < "u" ? (a || "").replace(/"/g, '\\"') : !1
    }
    let s = t;
    try {
        s = decodeURI(t)
    } catch {}
    return (s.match(/%(\w+\.+\w+)|%(\w+)/g) || []).sort().reverse().forEach(o => {
        const a = r(o.slice(1));
        typeof a == "string" && (t = t.replace(new RegExp(`\\${o}(\\W|$)`, "g"), (l, c) => `${a}${c}`).trim())
    }), t.includes(rn) && (t.endsWith(rn) && (t = t.slice(0, -rn.length).trim()), t.startsWith(rn) && (t = t.slice(rn.length).trim()), t = t.replace(new RegExp(`\\${rn}\\s*\\${rn}`, "g"), rn), t = Tn(t, {
        separator: n
    }, n)), t
}
async function am(t) {
    const e = {
        tag: t.tagName.toLowerCase(),
        props: await bh(t.getAttributeNames().reduce((n, r) => ({ ...n,
            [r]: t.getAttribute(r)
        }), {})),
        innerHTML: t.innerHTML
    };
    return e._d = hh(e), e
}
async function wh(t, e = {}) {
    var u;
    const n = e.document || t.resolvedOptions.document;
    if (!n) return;
    const r = {
        shouldRender: t.dirty,
        tags: []
    };
    if (await t.hooks.callHook("dom:beforeRender", r), !r.shouldRender) return;
    const s = (await t.resolveTags()).map(f => ({
        tag: f,
        id: Us.includes(f.tag) ? _c(f) : f.tag,
        shouldRender: !0
    }));
    let i = t._dom;
    if (!i) {
        i = {
            elMap: {
                htmlAttrs: n.documentElement,
                bodyAttrs: n.body
            }
        };
        for (const f of ["body", "head"]) {
            const h = (u = n == null ? void 0 : n[f]) == null ? void 0 : u.children;
            for (const d of [...h].filter(_ => Us.includes(_.tagName.toLowerCase()))) i.elMap[d.getAttribute("data-hid") || _c(await am(d))] = d
        }
    }
    i.pendingSideEffects = { ...i.sideEffects || {}
    }, i.sideEffects = {};

    function o(f, h, d) {
        const _ = `${f}:${h}`;
        i.sideEffects[_] = d, delete i.pendingSideEffects[_]
    }

    function a({
        id: f,
        $el: h,
        tag: d
    }) {
        const _ = d.tag.endsWith("Attrs");
        i.elMap[f] = h, _ || (["textContent", "innerHTML"].forEach(y => {
            d[y] && d[y] !== h[y] && (h[y] = d[y])
        }), o(f, "el", () => {
            i.elMap[f].remove(), delete i.elMap[f]
        })), Object.entries(d.props).forEach(([y, E]) => {
            const m = `attr:${y}`;
            if (y === "class")
                for (const g of (E || "").split(" ").filter(Boolean)) _ && o(f, `${m}:${g}`, () => h.classList.remove(g)), !h.classList.contains(g) && h.classList.add(g);
            else h.getAttribute(y) !== E && h.setAttribute(y, E === !0 ? "" : String(E)), _ && o(f, m, () => h.removeAttribute(y))
        })
    }
    const l = [],
        c = {
            bodyClose: void 0,
            bodyOpen: void 0,
            head: void 0
        };
    for (const f of s) {
        const {
            tag: h,
            shouldRender: d,
            id: _
        } = f;
        if (d) {
            if (h.tag === "title") {
                n.title = h.textContent;
                continue
            }
            f.$el = f.$el || i.elMap[_], f.$el ? a(f) : Us.includes(h.tag) && l.push(f)
        }
    }
    for (const f of l) {
        const h = f.tag.tagPosition || "head";
        f.$el = n.createElement(f.tag.tag), a(f), c[h] = c[h] || n.createDocumentFragment(), c[h].appendChild(f.$el)
    }
    for (const f of s) await t.hooks.callHook("dom:renderTag", f, n, o);
    c.head && n.head.appendChild(c.head), c.bodyOpen && n.body.insertBefore(c.bodyOpen, n.body.firstChild), c.bodyClose && n.body.appendChild(c.bodyClose), Object.values(i.pendingSideEffects).forEach(f => f()), t._dom = i, t.dirty = !1, await t.hooks.callHook("dom:rendered", {
        renders: s
    })
}
async function lm(t, e = {}) {
    const n = e.delayFn || (r => setTimeout(r, 10));
    return t._domUpdatePromise = t._domUpdatePromise || new Promise(r => n(async () => {
        await wh(t, e), delete t._domUpdatePromise, r()
    }))
}

function cm(t) {
    return e => {
        var r, s;
        const n = ((s = (r = e.resolvedOptions.document) == null ? void 0 : r.head.querySelector('script[id="unhead:payload"]')) == null ? void 0 : s.innerHTML) || !1;
        return n && e.push(JSON.parse(n)), {
            mode: "client",
            hooks: {
                "entries:updated": function(i) {
                    lm(i, t)
                }
            }
        }
    }
}
const um = ["templateParams", "htmlAttrs", "bodyAttrs"],
    fm = {
        hooks: {
            "tag:normalise": function({
                tag: t
            }) {
                ["hid", "vmid", "key"].forEach(r => {
                    t.props[r] && (t.key = t.props[r], delete t.props[r])
                });
                const n = hh(t) || (t.key ? `${t.tag}:${t.key}` : !1);
                n && (t._d = n)
            },
            "tags:resolve": function(t) {
                const e = {};
                t.tags.forEach(r => {
                    const s = (r.key ? `${r.tag}:${r.key}` : r._d) || r._p,
                        i = e[s];
                    if (i) {
                        let a = r == null ? void 0 : r.tagDuplicateStrategy;
                        if (!a && um.includes(r.tag) && (a = "merge"), a === "merge") {
                            const l = i.props;
                            ["class", "style"].forEach(c => {
                                r.props[c] && l[c] && (c === "style" && !l[c].endsWith(";") && (l[c] += ";"), r.props[c] = `${l[c]} ${r.props[c]}`)
                            }), e[s].props = { ...l,
                                ...r.props
                            };
                            return
                        } else if (r._e === i._e) {
                            i._duped = i._duped || [], r._d = `${i._d}:${i._duped.length+1}`, i._duped.push(r);
                            return
                        } else if (si(r) > si(i)) return
                    }
                    const o = Object.keys(r.props).length + (r.innerHTML ? 1 : 0) + (r.textContent ? 1 : 0);
                    if (Us.includes(r.tag) && o === 0) {
                        delete e[s];
                        return
                    }
                    e[s] = r
                });
                const n = [];
                Object.values(e).forEach(r => {
                    const s = r._duped;
                    delete r._duped, n.push(r), s && n.push(...s)
                }), t.tags = n, t.tags = t.tags.filter(r => !(r.tag === "meta" && (r.props.name || r.props.property) && !r.props.content))
            }
        }
    },
    hm = {
        mode: "server",
        hooks: {
            "tags:resolve": function(t) {
                const e = {};
                t.tags.filter(n => ["titleTemplate", "templateParams", "title"].includes(n.tag) && n._m === "server").forEach(n => {
                    e[n.tag] = n.tag.startsWith("title") ? n.textContent : n.props
                }), Object.keys(e).length && t.tags.push({
                    tag: "script",
                    innerHTML: JSON.stringify(e),
                    props: {
                        id: "unhead:payload",
                        type: "application/json"
                    }
                })
            }
        }
    },
    wc = ["script", "link", "bodyAttrs"];

function Ec(t) {
    const e = {},
        n = {};
    return Object.entries(t.props).forEach(([r, s]) => {
        r.startsWith("on") && typeof s == "function" ? n[r] = s : e[r] = s
    }), {
        props: e,
        eventHandlers: n
    }
}
const dm = {
        hooks: {
            "ssr:render": function(t) {
                t.tags = t.tags.map(e => (!wc.includes(e.tag) || !Object.entries(e.props).find(([n, r]) => n.startsWith("on") && typeof r == "function") || (e.props = Ec(e).props), e))
            },
            "tags:resolve": function(t) {
                t.tags = t.tags.map(e => {
                    if (!wc.includes(e.tag)) return e;
                    const {
                        props: n,
                        eventHandlers: r
                    } = Ec(e);
                    return Object.keys(r).length && (e.props = n, e._eventHandlers = r), e
                })
            },
            "dom:renderTag": function(t, e, n) {
                if (!t.tag._eventHandlers) return;
                const r = t.tag.tag === "bodyAttrs" ? e.defaultView : t.$el;
                Object.entries(t.tag._eventHandlers).forEach(([s, i]) => {
                    const o = `${t.tag._d||t.tag._p}:${s}`,
                        a = s.slice(2).toLowerCase(),
                        l = `data-h-${a}`;
                    if (n(t.id, o, () => {}), t.$el.hasAttribute(l)) return;
                    const c = i;
                    t.$el.setAttribute(l, ""), r.addEventListener(a, c), t.entry && n(t.id, o, () => {
                        r.removeEventListener(a, c), t.$el.removeAttribute(l)
                    })
                })
            }
        }
    },
    pm = ["link", "style", "script", "noscript"],
    gm = {
        hooks: {
            "tag:normalise": ({
                tag: t
            }) => {
                t.key && pm.includes(t.tag) && (t.props["data-hid"] = t._h = fh(t.key))
            }
        }
    },
    _m = {
        hooks: {
            "tags:resolve": t => {
                const e = n => {
                    var r;
                    return (r = t.tags.find(s => s._d === n)) == null ? void 0 : r._p
                };
                for (const {
                        prefix: n,
                        offset: r
                    } of om)
                    for (const s of t.tags.filter(i => typeof i.tagPriority == "string" && i.tagPriority.startsWith(n))) {
                        const i = e(s.tagPriority.replace(n, ""));
                        typeof i < "u" && (s._p = i + r)
                    }
                t.tags.sort((n, r) => n._p - r._p).sort((n, r) => si(n) - si(r))
            }
        }
    },
    vm = {
        hooks: {
            "tags:resolve": t => {
                var o;
                const {
                    tags: e
                } = t, n = (o = e.find(a => a.tag === "title")) == null ? void 0 : o.textContent, r = e.findIndex(a => a.tag === "templateParams"), s = r !== -1 ? e[r].props : {}, i = s.separator || "|";
                delete s.separator, s.pageTitle = Tn(s.pageTitle || n || "", s, i);
                for (const a of e) a.processTemplateParams !== !1 && (["titleTemplate", "title"].includes(a.tag) && typeof a.textContent == "string" ? a.textContent = Tn(a.textContent, s, i) : a.tag === "meta" && typeof a.props.content == "string" ? a.props.content = Tn(a.props.content, s, i) : a.tag === "link" && typeof a.props.href == "string" ? a.props.href = Tn(a.props.href, s, i) : a.processTemplateParams === !0 && (a.innerHTML ? a.innerHTML = Tn(a.innerHTML, s, i) : a.textContent && (a.textContent = Tn(a.textContent, s, i))));
                t.tags = e.filter(a => a.tag !== "templateParams")
            }
        }
    },
    mm = {
        hooks: {
            "tags:resolve": t => {
                const {
                    tags: e
                } = t;
                let n = e.findIndex(s => s.tag === "titleTemplate");
                const r = e.findIndex(s => s.tag === "title");
                if (r !== -1 && n !== -1) {
                    const s = vc(e[n].textContent, e[r].textContent);
                    s !== null ? e[r].textContent = s || e[r].textContent : delete e[r]
                } else if (n !== -1) {
                    const s = vc(e[n].textContent);
                    s !== null && (e[n].textContent = s, e[n].tag = "title", n = -1)
                }
                n !== -1 && delete e[n], t.tags = e.filter(Boolean)
            }
        }
    };
let Eh;

function ym(t = {}) {
    const e = bm(t);
    return e.use(cm()), Eh = e
}

function xc(t, e) {
    return !t || t === "server" && e || t === "client" && !e
}

function bm(t = {}) {
    const e = lh();
    e.addHooks(t.hooks || {}), t.document = t.document || (Zv ? document : void 0);
    const n = !t.document;
    t.plugins = [fm, hm, dm, gm, _m, vm, mm, ...(t == null ? void 0 : t.plugins) || []];
    const r = () => {
        o.dirty = !0, e.callHook("entries:updated", o)
    };
    let s = 0,
        i = [];
    const o = {
        dirty: !1,
        resolvedOptions: t,
        hooks: e,
        headEntries() {
            return i
        },
        use(a) {
            const l = typeof a == "function" ? a(o) : a;
            xc(l.mode, n) && e.addHooks(l.hooks || {})
        },
        push(a, l) {
            l == null || delete l.head;
            const c = {
                _i: s++,
                input: a,
                ...l
            };
            return xc(c.mode, n) && (i.push(c), r()), {
                dispose() {
                    i = i.filter(u => u._i !== c._i), e.callHook("entries:updated", o), r()
                },
                patch(u) {
                    i = i.map(f => (f._i === c._i && (f.input = c.input = u), f)), r()
                }
            }
        },
        async resolveTags() {
            const a = {
                tags: [],
                entries: [...i]
            };
            await e.callHook("entries:resolve", a);
            for (const l of a.entries) {
                const c = l.resolvedInput || l.input;
                if (l.resolvedInput = await (l.transform ? l.transform(c) : c), l.resolvedInput)
                    for (const u of await im(l)) {
                        const f = {
                            tag: u,
                            entry: l,
                            resolvedOptions: o.resolvedOptions
                        };
                        await e.callHook("tag:normalise", f), a.tags.push(f.tag)
                    }
            }
            return await e.callHook("tags:beforeResolve", a), await e.callHook("tags:resolve", a), a.tags
        },
        ssr: n
    };
    return t.plugins.forEach(a => o.use(a)), o.hooks.callHook("init", o), o
}

function wm() {
    return Eh
}
const Em = Qf.startsWith("3");

function xm(t) {
    return typeof t == "function" ? t() : xe(t)
}

function ii(t, e = "") {
    if (t instanceof Promise) return t;
    const n = xm(t);
    return !t || !n ? n : Array.isArray(n) ? n.map(r => ii(r, e)) : typeof n == "object" ? Object.fromEntries(Object.entries(n).map(([r, s]) => r === "titleTemplate" || r.startsWith("on") ? [r, xe(s)] : [r, ii(s, r)])) : n
}
const km = {
        hooks: {
            "entries:resolve": function(t) {
                for (const e of t.entries) e.resolvedInput = ii(e.input)
            }
        }
    },
    xh = "usehead";

function Cm(t) {
    return {
        install(n) {
            Em && (n.config.globalProperties.$unhead = t, n.config.globalProperties.$head = t, n.provide(xh, t))
        }
    }.install
}

function Sm(t = {}) {
    t.domDelayFn = t.domDelayFn || (n => Un(() => setTimeout(() => n(), 0)));
    const e = ym(t);
    return e.use(km), e.install = Cm(e), e
}
const Go = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {},
    Yo = "__unhead_injection_handler__";

function Tm(t) {
    Go[Yo] = t
}

function Pm() {
    if (Yo in Go) return Go[Yo]();
    const t = et(xh);
    return t || wm()
}

function Rm(t, e = {}) {
    const n = e.head || Pm();
    if (n) return n.ssr ? n.push(t, e) : Am(n, t, e)
}

function Am(t, e, n = {}) {
    const r = St(!1),
        s = St({});
    ug(() => {
        s.value = r.value ? {} : ii(e)
    });
    const i = t.push(s.value, n);
    return rr(s, a => {
        i.patch(a)
    }), Bn() && (Ii(() => {
        i.dispose()
    }), Cf(() => {
        r.value = !0
    }), kf(() => {
        r.value = !1
    })), i
}
const $m = !1,
    Jo = !1,
    Im = !1,
    Om = "#FiddleDigital-StringTune-Promo";
async function Fm(t) {
    const e = fetch(t).then(n => n.text().then(kh));
    try {
        return await e
    } catch (n) {
        console.warn("[nuxt] Cannot load payload ", t, n)
    }
    return null
}
let Is = null;
async function Mm() {
    if (Is) return Is;
    const t = document.getElementById("__NUXT_DATA__");
    if (!t) return {};
    const e = kh(t.textContent || ""),
        n = t.dataset.src ? await Fm(t.dataset.src) : void 0;
    return Is = { ...e,
        ...n,
        ...window.__NUXT__
    }, Is
}

function kh(t) {
    return zv(t, Ne()._payloadRevivers)
}

function Lm(t, e) {
    Ne()._payloadRevivers[t] = e
}

function io(t) {
    if (t === null || typeof t != "object") return !1;
    const e = Object.getPrototypeOf(t);
    return e !== null && e !== Object.prototype && Object.getPrototypeOf(e) !== null || Symbol.iterator in t ? !1 : Symbol.toStringTag in t ? Object.prototype.toString.call(t) === "[object Module]" : !0
}

function Xo(t, e, n = ".", r) {
    if (!io(e)) return Xo(t, {}, n, r);
    const s = Object.assign({}, e);
    for (const i in t) {
        if (i === "__proto__" || i === "constructor") continue;
        const o = t[i];
        o != null && (r && r(s, i, o, n) || (Array.isArray(o) && Array.isArray(s[i]) ? s[i] = [...o, ...s[i]] : io(o) && io(s[i]) ? s[i] = Xo(o, s[i], (n ? `${n}.` : "") + i.toString(), r) : s[i] = o))
    }
    return s
}

function Nm(t) {
    return (...e) => e.reduce((n, r) => Xo(n, r, "", t), {})
}
const Dm = Nm();

function jm(t, e) {
    try {
        return e in t
    } catch {
        return !1
    }
}
var Hm = Object.defineProperty,
    Um = (t, e, n) => e in t ? Hm(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : t[e] = n,
    Pn = (t, e, n) => (Um(t, typeof e != "symbol" ? e + "" : e, n), n);
class Qo extends Error {
    constructor(e, n = {}) {
        super(e, n), Pn(this, "statusCode", 500), Pn(this, "fatal", !1), Pn(this, "unhandled", !1), Pn(this, "statusMessage"), Pn(this, "data"), Pn(this, "cause"), n.cause && !this.cause && (this.cause = n.cause)
    }
    toJSON() {
        const e = {
            message: this.message,
            statusCode: ea(this.statusCode, 500)
        };
        return this.statusMessage && (e.statusMessage = Ch(this.statusMessage)), this.data !== void 0 && (e.data = this.data), e
    }
}
Pn(Qo, "__h3_error__", !0);

function Zo(t) {
    if (typeof t == "string") return new Qo(t);
    if (Bm(t)) return t;
    const e = new Qo(t.message ? ? t.statusMessage ? ? "", {
        cause: t.cause || t
    });
    if (jm(t, "stack")) try {
        Object.defineProperty(e, "stack", {
            get() {
                return t.stack
            }
        })
    } catch {
        try {
            e.stack = t.stack
        } catch {}
    }
    if (t.data && (e.data = t.data), t.statusCode ? e.statusCode = ea(t.statusCode, e.statusCode) : t.status && (e.statusCode = ea(t.status, e.statusCode)), t.statusMessage ? e.statusMessage = t.statusMessage : t.statusText && (e.statusMessage = t.statusText), e.statusMessage) {
        const n = e.statusMessage;
        Ch(e.statusMessage) !== n && console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.")
    }
    return t.fatal !== void 0 && (e.fatal = t.fatal), t.unhandled !== void 0 && (e.unhandled = t.unhandled), e
}

function Bm(t) {
    var e;
    return ((e = t == null ? void 0 : t.constructor) == null ? void 0 : e.__h3_error__) === !0
}
const qm = /[^\u0009\u0020-\u007E]/g;

function Ch(t = "") {
    return t.replace(qm, "")
}

function ea(t, e = 200) {
    return !t || (typeof t == "string" && (t = Number.parseInt(t, 10)), t < 100 || t > 999) ? e : t
}
const Sh = Symbol("layout-meta"),
    ys = Symbol("route"),
    wr = () => {
        var t;
        return (t = Ne()) == null ? void 0 : t.$router
    },
    Th = () => Ff() ? et(ys, Ne()._route) : Ne()._route; /*! @__NO_SIDE_EFFECTS__ */
const Wm = () => {
        try {
            if (Ne()._processingMiddleware) return !0
        } catch {
            return !0
        }
        return !1
    },
    oE = (t, e) => {
        t || (t = "/");
        const n = typeof t == "string" ? t : rl(t.path || "/", t.query || {}) + (t.hash || "");
        if (e != null && e.open) {
            {
                const {
                    target: a = "_blank",
                    windowFeatures: l = {}
                } = e.open, c = Object.entries(l).filter(([u, f]) => f !== void 0).map(([u, f]) => `${u.toLowerCase()}=${f}`).join(", ");
                open(n, a, c)
            }
            return Promise.resolve()
        }
        const r = (e == null ? void 0 : e.external) || Li(n, {
            acceptRelative: !0
        });
        if (r) {
            if (!(e != null && e.external)) throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
            const a = sl(n).protocol;
            if (a && Z_(a)) throw new Error(`Cannot navigate to a URL with '${a}' protocol.`)
        }
        const s = Wm();
        if (!r && s) return t;
        const i = wr(),
            o = Ne();
        return r ? (e != null && e.replace ? location.replace(n) : location.href = n, s ? o.isHydrating ? new Promise(() => {}) : !1 : Promise.resolve()) : e != null && e.replace ? i.replace(t) : i.push(t)
    },
    ji = () => Vp(Ne().payload, "error"),
    Yn = t => {
        const e = al(t);
        try {
            const n = Ne(),
                r = ji();
            n.hooks.callHook("app:error", e), r.value = r.value || e
        } catch {
            throw e
        }
        return e
    },
    Vm = async (t = {}) => {
        const e = Ne(),
            n = ji();
        e.callHook("app:error:cleared", t), t.redirect && await wr().replace(t.redirect), n.value = null
    },
    Km = t => !!(t && typeof t == "object" && "__nuxt_error" in t),
    al = t => {
        const e = Zo(t);
        return e.__nuxt_error = !0, e
    },
    kc = {
        NuxtError: t => al(t),
        EmptyShallowRef: t => ss(t === "_" ? void 0 : t === "0n" ? BigInt(0) : Zs(t)),
        EmptyRef: t => St(t === "_" ? void 0 : t === "0n" ? BigInt(0) : Zs(t)),
        ShallowRef: t => ss(t),
        ShallowReactive: t => vs(t),
        Ref: t => St(t),
        Reactive: t => Gt(t)
    },
    zm = Xt({
        name: "nuxt:revive-payload:client",
        order: -30,
        async setup(t) {
            let e, n;
            for (const r in kc) Lm(r, kc[r]);
            Object.assign(t.payload, ([e, n] = ri(() => t.runWithContext(Mm)), e = await e, n(), e)), window.__NUXT__ = t.payload
        }
    });

function Gm(t = {}) {
    const e = t.path || window.location.pathname;
    let n = {};
    try {
        n = Zs(sessionStorage.getItem("nuxt:reload") || "{}")
    } catch {}
    if (t.force || (n == null ? void 0 : n.path) !== e || (n == null ? void 0 : n.expires) < Date.now()) {
        try {
            sessionStorage.setItem("nuxt:reload", JSON.stringify({
                path: e,
                expires: Date.now() + (t.ttl ? ? 1e4)
            }))
        } catch {}
        if (t.persistState) try {
            sessionStorage.setItem("nuxt:reload:state", JSON.stringify({
                state: Ne().payload.state
            }))
        } catch {}
        window.location.pathname !== e ? window.location.href = e : window.location.reload()
    }
}
const Ym = [],
    Jm = Xt({
        name: "nuxt:head",
        enforce: "pre",
        setup(t) {
            const e = Sm({
                plugins: Ym
            });
            Tm(() => Ne().vueApp._context.provides.usehead), t.vueApp.use(e); {
                let n = !0;
                const r = async () => {
                    n = !1, await wh(e)
                };
                e.hooks.hook("dom:beforeRender", s => {
                    s.shouldRender = !n
                }), t.hooks.hook("page:start", () => {
                    n = !0
                }), t.hooks.hook("page:finish", () => {
                    t.isHydrating || r()
                }), t.hooks.hook("app:error", r), t.hooks.hook("app:suspense:resolve", r)
            }
        }
    });
/*!
 * vue-router v4.2.4
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
const zn = typeof window < "u";

function Xm(t) {
    return t.__esModule || t[Symbol.toStringTag] === "Module"
}
const de = Object.assign;

function oo(t, e) {
    const n = {};
    for (const r in e) {
        const s = e[r];
        n[r] = Tt(s) ? s.map(t) : t(s)
    }
    return n
}
const Xr = () => {},
    Tt = Array.isArray,
    Qm = /\/$/,
    Zm = t => t.replace(Qm, "");

function ao(t, e, n = "/") {
    let r, s = {},
        i = "",
        o = "";
    const a = e.indexOf("#");
    let l = e.indexOf("?");
    return a < l && a >= 0 && (l = -1), l > -1 && (r = e.slice(0, l), i = e.slice(l + 1, a > -1 ? a : e.length), s = t(i)), a > -1 && (r = r || e.slice(0, a), o = e.slice(a, e.length)), r = ry(r ? ? e, n), {
        fullPath: r + (i && "?") + i + o,
        path: r,
        query: s,
        hash: o
    }
}

function ey(t, e) {
    const n = e.query ? t(e.query) : "";
    return e.path + (n && "?") + n + (e.hash || "")
}

function Cc(t, e) {
    return !e || !t.toLowerCase().startsWith(e.toLowerCase()) ? t : t.slice(e.length) || "/"
}

function ty(t, e, n) {
    const r = e.matched.length - 1,
        s = n.matched.length - 1;
    return r > -1 && r === s && fr(e.matched[r], n.matched[s]) && Ph(e.params, n.params) && t(e.query) === t(n.query) && e.hash === n.hash
}

function fr(t, e) {
    return (t.aliasOf || t) === (e.aliasOf || e)
}

function Ph(t, e) {
    if (Object.keys(t).length !== Object.keys(e).length) return !1;
    for (const n in t)
        if (!ny(t[n], e[n])) return !1;
    return !0
}

function ny(t, e) {
    return Tt(t) ? Sc(t, e) : Tt(e) ? Sc(e, t) : t === e
}

function Sc(t, e) {
    return Tt(e) ? t.length === e.length && t.every((n, r) => n === e[r]) : t.length === 1 && t[0] === e
}

function ry(t, e) {
    if (t.startsWith("/")) return t;
    if (!t) return e;
    const n = e.split("/"),
        r = t.split("/"),
        s = r[r.length - 1];
    (s === ".." || s === ".") && r.push("");
    let i = n.length - 1,
        o, a;
    for (o = 0; o < r.length; o++)
        if (a = r[o], a !== ".")
            if (a === "..") i > 1 && i--;
            else break;
    return n.slice(0, i).join("/") + "/" + r.slice(o - (o === r.length ? 1 : 0)).join("/")
}
var cs;
(function(t) {
    t.pop = "pop", t.push = "push"
})(cs || (cs = {}));
var Qr;
(function(t) {
    t.back = "back", t.forward = "forward", t.unknown = ""
})(Qr || (Qr = {}));

function sy(t) {
    if (!t)
        if (zn) {
            const e = document.querySelector("base");
            t = e && e.getAttribute("href") || "/", t = t.replace(/^\w+:\/\/[^\/]+/, "")
        } else t = "/";
    return t[0] !== "/" && t[0] !== "#" && (t = "/" + t), Zm(t)
}
const iy = /^[^#]+#/;

function oy(t, e) {
    return t.replace(iy, "#") + e
}

function ay(t, e) {
    const n = document.documentElement.getBoundingClientRect(),
        r = t.getBoundingClientRect();
    return {
        behavior: e.behavior,
        left: r.left - n.left - (e.left || 0),
        top: r.top - n.top - (e.top || 0)
    }
}
const Hi = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset
});

function ly(t) {
    let e;
    if ("el" in t) {
        const n = t.el,
            r = typeof n == "string" && n.startsWith("#"),
            s = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!s) return;
        e = ay(s, t)
    } else e = t;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(e) : window.scrollTo(e.left != null ? e.left : window.pageXOffset, e.top != null ? e.top : window.pageYOffset)
}

function Tc(t, e) {
    return (history.state ? history.state.position - e : -1) + t
}
const ta = new Map;

function cy(t, e) {
    ta.set(t, e)
}

function uy(t) {
    const e = ta.get(t);
    return ta.delete(t), e
}
let fy = () => location.protocol + "//" + location.host;

function Rh(t, e) {
    const {
        pathname: n,
        search: r,
        hash: s
    } = e, i = t.indexOf("#");
    if (i > -1) {
        let a = s.includes(t.slice(i)) ? t.slice(i).length : 1,
            l = s.slice(a);
        return l[0] !== "/" && (l = "/" + l), Cc(l, "")
    }
    return Cc(n, t) + r + s
}

function hy(t, e, n, r) {
    let s = [],
        i = [],
        o = null;
    const a = ({
        state: h
    }) => {
        const d = Rh(t, location),
            _ = n.value,
            y = e.value;
        let E = 0;
        if (h) {
            if (n.value = d, e.value = h, o && o === _) {
                o = null;
                return
            }
            E = y ? h.position - y.position : 0
        } else r(d);
        s.forEach(m => {
            m(n.value, _, {
                delta: E,
                type: cs.pop,
                direction: E ? E > 0 ? Qr.forward : Qr.back : Qr.unknown
            })
        })
    };

    function l() {
        o = n.value
    }

    function c(h) {
        s.push(h);
        const d = () => {
            const _ = s.indexOf(h);
            _ > -1 && s.splice(_, 1)
        };
        return i.push(d), d
    }

    function u() {
        const {
            history: h
        } = window;
        h.state && h.replaceState(de({}, h.state, {
            scroll: Hi()
        }), "")
    }

    function f() {
        for (const h of i) h();
        i = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", u)
    }
    return window.addEventListener("popstate", a), window.addEventListener("beforeunload", u, {
        passive: !0
    }), {
        pauseListeners: l,
        listen: c,
        destroy: f
    }
}

function Pc(t, e, n, r = !1, s = !1) {
    return {
        back: t,
        current: e,
        forward: n,
        replaced: r,
        position: window.history.length,
        scroll: s ? Hi() : null
    }
}

function dy(t) {
    const {
        history: e,
        location: n
    } = window, r = {
        value: Rh(t, n)
    }, s = {
        value: e.state
    };
    s.value || i(r.value, {
        back: null,
        current: r.value,
        forward: null,
        position: e.length - 1,
        replaced: !0,
        scroll: null
    }, !0);

    function i(l, c, u) {
        const f = t.indexOf("#"),
            h = f > -1 ? (n.host && document.querySelector("base") ? t : t.slice(f)) + l : fy() + t + l;
        try {
            e[u ? "replaceState" : "pushState"](c, "", h), s.value = c
        } catch (d) {
            console.error(d), n[u ? "replace" : "assign"](h)
        }
    }

    function o(l, c) {
        const u = de({}, e.state, Pc(s.value.back, l, s.value.forward, !0), c, {
            position: s.value.position
        });
        i(l, u, !0), r.value = l
    }

    function a(l, c) {
        const u = de({}, s.value, e.state, {
            forward: l,
            scroll: Hi()
        });
        i(u.current, u, !0);
        const f = de({}, Pc(r.value, l, null), {
            position: u.position + 1
        }, c);
        i(l, f, !1), r.value = l
    }
    return {
        location: r,
        state: s,
        push: a,
        replace: o
    }
}

function Ah(t) {
    t = sy(t);
    const e = dy(t),
        n = hy(t, e.state, e.location, e.replace);

    function r(i, o = !0) {
        o || n.pauseListeners(), history.go(i)
    }
    const s = de({
        location: "",
        base: t,
        go: r,
        createHref: oy.bind(null, t)
    }, e, n);
    return Object.defineProperty(s, "location", {
        enumerable: !0,
        get: () => e.location.value
    }), Object.defineProperty(s, "state", {
        enumerable: !0,
        get: () => e.state.value
    }), s
}

function py(t) {
    return t = location.host ? t || location.pathname + location.search : "", t.includes("#") || (t += "#"), Ah(t)
}

function gy(t) {
    return typeof t == "string" || t && typeof t == "object"
}

function $h(t) {
    return typeof t == "string" || typeof t == "symbol"
}
const Rt = {
        path: "/",
        name: void 0,
        params: {},
        query: {},
        hash: "",
        fullPath: "/",
        matched: [],
        meta: {},
        redirectedFrom: void 0
    },
    Ih = Symbol("");
var Rc;
(function(t) {
    t[t.aborted = 4] = "aborted", t[t.cancelled = 8] = "cancelled", t[t.duplicated = 16] = "duplicated"
})(Rc || (Rc = {}));

function hr(t, e) {
    return de(new Error, {
        type: t,
        [Ih]: !0
    }, e)
}

function Dt(t, e) {
    return t instanceof Error && Ih in t && (e == null || !!(t.type & e))
}
const Ac = "[^/]+?",
    _y = {
        sensitive: !1,
        strict: !1,
        start: !0,
        end: !0
    },
    vy = /[.+*?^${}()[\]/\\]/g;

function my(t, e) {
    const n = de({}, _y, e),
        r = [];
    let s = n.start ? "^" : "";
    const i = [];
    for (const c of t) {
        const u = c.length ? [] : [90];
        n.strict && !c.length && (s += "/");
        for (let f = 0; f < c.length; f++) {
            const h = c[f];
            let d = 40 + (n.sensitive ? .25 : 0);
            if (h.type === 0) f || (s += "/"), s += h.value.replace(vy, "\\$&"), d += 40;
            else if (h.type === 1) {
                const {
                    value: _,
                    repeatable: y,
                    optional: E,
                    regexp: m
                } = h;
                i.push({
                    name: _,
                    repeatable: y,
                    optional: E
                });
                const g = m || Ac;
                if (g !== Ac) {
                    d += 10;
                    try {
                        new RegExp(`(${g})`)
                    } catch (b) {
                        throw new Error(`Invalid custom RegExp for param "${_}" (${g}): ` + b.message)
                    }
                }
                let x = y ? `((?:${g})(?:/(?:${g}))*)` : `(${g})`;
                f || (x = E && c.length < 2 ? `(?:/${x})` : "/" + x), E && (x += "?"), s += x, d += 20, E && (d += -8), y && (d += -20), g === ".*" && (d += -50)
            }
            u.push(d)
        }
        r.push(u)
    }
    if (n.strict && n.end) {
        const c = r.length - 1;
        r[c][r[c].length - 1] += .7000000000000001
    }
    n.strict || (s += "/?"), n.end ? s += "$" : n.strict && (s += "(?:/|$)");
    const o = new RegExp(s, n.sensitive ? "" : "i");

    function a(c) {
        const u = c.match(o),
            f = {};
        if (!u) return null;
        for (let h = 1; h < u.length; h++) {
            const d = u[h] || "",
                _ = i[h - 1];
            f[_.name] = d && _.repeatable ? d.split("/") : d
        }
        return f
    }

    function l(c) {
        let u = "",
            f = !1;
        for (const h of t) {
            (!f || !u.endsWith("/")) && (u += "/"), f = !1;
            for (const d of h)
                if (d.type === 0) u += d.value;
                else if (d.type === 1) {
                const {
                    value: _,
                    repeatable: y,
                    optional: E
                } = d, m = _ in c ? c[_] : "";
                if (Tt(m) && !y) throw new Error(`Provided param "${_}" is an array but it is not repeatable (* or + modifiers)`);
                const g = Tt(m) ? m.join("/") : m;
                if (!g)
                    if (E) h.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : f = !0);
                    else throw new Error(`Missing required param "${_}"`);
                u += g
            }
        }
        return u || "/"
    }
    return {
        re: o,
        score: r,
        keys: i,
        parse: a,
        stringify: l
    }
}

function yy(t, e) {
    let n = 0;
    for (; n < t.length && n < e.length;) {
        const r = e[n] - t[n];
        if (r) return r;
        n++
    }
    return t.length < e.length ? t.length === 1 && t[0] === 40 + 40 ? -1 : 1 : t.length > e.length ? e.length === 1 && e[0] === 40 + 40 ? 1 : -1 : 0
}

function by(t, e) {
    let n = 0;
    const r = t.score,
        s = e.score;
    for (; n < r.length && n < s.length;) {
        const i = yy(r[n], s[n]);
        if (i) return i;
        n++
    }
    if (Math.abs(s.length - r.length) === 1) {
        if ($c(r)) return 1;
        if ($c(s)) return -1
    }
    return s.length - r.length
}

function $c(t) {
    const e = t[t.length - 1];
    return t.length > 0 && e[e.length - 1] < 0
}
const wy = {
        type: 0,
        value: ""
    },
    Ey = /[a-zA-Z0-9_]/;

function xy(t) {
    if (!t) return [
        []
    ];
    if (t === "/") return [
        [wy]
    ];
    if (!t.startsWith("/")) throw new Error(`Invalid path "${t}"`);

    function e(d) {
        throw new Error(`ERR (${n})/"${c}": ${d}`)
    }
    let n = 0,
        r = n;
    const s = [];
    let i;

    function o() {
        i && s.push(i), i = []
    }
    let a = 0,
        l, c = "",
        u = "";

    function f() {
        c && (n === 0 ? i.push({
            type: 0,
            value: c
        }) : n === 1 || n === 2 || n === 3 ? (i.length > 1 && (l === "*" || l === "+") && e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), i.push({
            type: 1,
            value: c,
            regexp: u,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?"
        })) : e("Invalid state to consume buffer"), c = "")
    }

    function h() {
        c += l
    }
    for (; a < t.length;) {
        if (l = t[a++], l === "\\" && n !== 2) {
            r = n, n = 4;
            continue
        }
        switch (n) {
            case 0:
                l === "/" ? (c && f(), o()) : l === ":" ? (f(), n = 1) : h();
                break;
            case 4:
                h(), n = r;
                break;
            case 1:
                l === "(" ? n = 2 : Ey.test(l) ? h() : (f(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--);
                break;
            case 2:
                l === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + l : n = 3 : u += l;
                break;
            case 3:
                f(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--, u = "";
                break;
            default:
                e("Unknown state");
                break
        }
    }
    return n === 2 && e(`Unfinished custom RegExp for param "${c}"`), f(), o(), s
}

function ky(t, e, n) {
    const r = my(xy(t.path), n),
        s = de(r, {
            record: t,
            parent: e,
            children: [],
            alias: []
        });
    return e && !s.record.aliasOf == !e.record.aliasOf && e.children.push(s), s
}

function Cy(t, e) {
    const n = [],
        r = new Map;
    e = Fc({
        strict: !1,
        end: !0,
        sensitive: !1
    }, e);

    function s(u) {
        return r.get(u)
    }

    function i(u, f, h) {
        const d = !h,
            _ = Sy(u);
        _.aliasOf = h && h.record;
        const y = Fc(e, u),
            E = [_];
        if ("alias" in u) {
            const x = typeof u.alias == "string" ? [u.alias] : u.alias;
            for (const b of x) E.push(de({}, _, {
                components: h ? h.record.components : _.components,
                path: b,
                aliasOf: h ? h.record : _
            }))
        }
        let m, g;
        for (const x of E) {
            const {
                path: b
            } = x;
            if (f && b[0] !== "/") {
                const S = f.record.path,
                    $ = S[S.length - 1] === "/" ? "" : "/";
                x.path = f.record.path + (b && $ + b)
            }
            if (m = ky(x, f, y), h ? h.alias.push(m) : (g = g || m, g !== m && g.alias.push(m), d && u.name && !Oc(m) && o(u.name)), _.children) {
                const S = _.children;
                for (let $ = 0; $ < S.length; $++) i(S[$], m, h && h.children[$])
            }
            h = h || m, (m.record.components && Object.keys(m.record.components).length || m.record.name || m.record.redirect) && l(m)
        }
        return g ? () => {
            o(g)
        } : Xr
    }

    function o(u) {
        if ($h(u)) {
            const f = r.get(u);
            f && (r.delete(u), n.splice(n.indexOf(f), 1), f.children.forEach(o), f.alias.forEach(o))
        } else {
            const f = n.indexOf(u);
            f > -1 && (n.splice(f, 1), u.record.name && r.delete(u.record.name), u.children.forEach(o), u.alias.forEach(o))
        }
    }

    function a() {
        return n
    }

    function l(u) {
        let f = 0;
        for (; f < n.length && by(u, n[f]) >= 0 && (u.record.path !== n[f].record.path || !Oh(u, n[f]));) f++;
        n.splice(f, 0, u), u.record.name && !Oc(u) && r.set(u.record.name, u)
    }

    function c(u, f) {
        let h, d = {},
            _, y;
        if ("name" in u && u.name) {
            if (h = r.get(u.name), !h) throw hr(1, {
                location: u
            });
            y = h.record.name, d = de(Ic(f.params, h.keys.filter(g => !g.optional).map(g => g.name)), u.params && Ic(u.params, h.keys.map(g => g.name))), _ = h.stringify(d)
        } else if ("path" in u) _ = u.path, h = n.find(g => g.re.test(_)), h && (d = h.parse(_), y = h.record.name);
        else {
            if (h = f.name ? r.get(f.name) : n.find(g => g.re.test(f.path)), !h) throw hr(1, {
                location: u,
                currentLocation: f
            });
            y = h.record.name, d = de({}, f.params, u.params), _ = h.stringify(d)
        }
        const E = [];
        let m = h;
        for (; m;) E.unshift(m.record), m = m.parent;
        return {
            name: y,
            path: _,
            params: d,
            matched: E,
            meta: Py(E)
        }
    }
    return t.forEach(u => i(u)), {
        addRoute: i,
        resolve: c,
        removeRoute: o,
        getRoutes: a,
        getRecordMatcher: s
    }
}

function Ic(t, e) {
    const n = {};
    for (const r of e) r in t && (n[r] = t[r]);
    return n
}

function Sy(t) {
    return {
        path: t.path,
        redirect: t.redirect,
        name: t.name,
        meta: t.meta || {},
        aliasOf: void 0,
        beforeEnter: t.beforeEnter,
        props: Ty(t),
        children: t.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components" in t ? t.components || null : t.component && {
            default: t.component
        }
    }
}

function Ty(t) {
    const e = {},
        n = t.props || !1;
    if ("component" in t) e.default = n;
    else
        for (const r in t.components) e[r] = typeof n == "object" ? n[r] : n;
    return e
}

function Oc(t) {
    for (; t;) {
        if (t.record.aliasOf) return !0;
        t = t.parent
    }
    return !1
}

function Py(t) {
    return t.reduce((e, n) => de(e, n.meta), {})
}

function Fc(t, e) {
    const n = {};
    for (const r in t) n[r] = r in e ? e[r] : t[r];
    return n
}

function Oh(t, e) {
    return e.children.some(n => n === t || Oh(t, n))
}
const Fh = /#/g,
    Ry = /&/g,
    Ay = /\//g,
    $y = /=/g,
    Iy = /\?/g,
    Mh = /\+/g,
    Oy = /%5B/g,
    Fy = /%5D/g,
    Lh = /%5E/g,
    My = /%60/g,
    Nh = /%7B/g,
    Ly = /%7C/g,
    Dh = /%7D/g,
    Ny = /%20/g;

function ll(t) {
    return encodeURI("" + t).replace(Ly, "|").replace(Oy, "[").replace(Fy, "]")
}

function Dy(t) {
    return ll(t).replace(Nh, "{").replace(Dh, "}").replace(Lh, "^")
}

function na(t) {
    return ll(t).replace(Mh, "%2B").replace(Ny, "+").replace(Fh, "%23").replace(Ry, "%26").replace(My, "`").replace(Nh, "{").replace(Dh, "}").replace(Lh, "^")
}

function jy(t) {
    return na(t).replace($y, "%3D")
}

function Hy(t) {
    return ll(t).replace(Fh, "%23").replace(Iy, "%3F")
}

function Uy(t) {
    return t == null ? "" : Hy(t).replace(Ay, "%2F")
}

function oi(t) {
    try {
        return decodeURIComponent("" + t)
    } catch {}
    return "" + t
}

function By(t) {
    const e = {};
    if (t === "" || t === "?") return e;
    const r = (t[0] === "?" ? t.slice(1) : t).split("&");
    for (let s = 0; s < r.length; ++s) {
        const i = r[s].replace(Mh, " "),
            o = i.indexOf("="),
            a = oi(o < 0 ? i : i.slice(0, o)),
            l = o < 0 ? null : oi(i.slice(o + 1));
        if (a in e) {
            let c = e[a];
            Tt(c) || (c = e[a] = [c]), c.push(l)
        } else e[a] = l
    }
    return e
}

function Mc(t) {
    let e = "";
    for (let n in t) {
        const r = t[n];
        if (n = jy(n), r == null) {
            r !== void 0 && (e += (e.length ? "&" : "") + n);
            continue
        }(Tt(r) ? r.map(i => i && na(i)) : [r && na(r)]).forEach(i => {
            i !== void 0 && (e += (e.length ? "&" : "") + n, i != null && (e += "=" + i))
        })
    }
    return e
}

function qy(t) {
    const e = {};
    for (const n in t) {
        const r = t[n];
        r !== void 0 && (e[n] = Tt(r) ? r.map(s => s == null ? null : "" + s) : r == null ? r : "" + r)
    }
    return e
}
const Wy = Symbol(""),
    Lc = Symbol(""),
    cl = Symbol(""),
    ul = Symbol(""),
    ra = Symbol("");

function Tr() {
    let t = [];

    function e(r) {
        return t.push(r), () => {
            const s = t.indexOf(r);
            s > -1 && t.splice(s, 1)
        }
    }

    function n() {
        t = []
    }
    return {
        add: e,
        list: () => t.slice(),
        reset: n
    }
}

function cn(t, e, n, r, s) {
    const i = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
    return () => new Promise((o, a) => {
        const l = f => {
                f === !1 ? a(hr(4, {
                    from: n,
                    to: e
                })) : f instanceof Error ? a(f) : gy(f) ? a(hr(2, {
                    from: e,
                    to: f
                })) : (i && r.enterCallbacks[s] === i && typeof f == "function" && i.push(f), o())
            },
            c = t.call(r && r.instances[s], e, n, l);
        let u = Promise.resolve(c);
        t.length < 3 && (u = u.then(l)), u.catch(f => a(f))
    })
}

function lo(t, e, n, r) {
    const s = [];
    for (const i of t)
        for (const o in i.components) {
            let a = i.components[o];
            if (!(e !== "beforeRouteEnter" && !i.instances[o]))
                if (Vy(a)) {
                    const c = (a.__vccOpts || a)[e];
                    c && s.push(cn(c, n, r, i, o))
                } else {
                    let l = a();
                    s.push(() => l.then(c => {
                        if (!c) return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${i.path}"`));
                        const u = Xm(c) ? c.default : c;
                        i.components[o] = u;
                        const h = (u.__vccOpts || u)[e];
                        return h && cn(h, n, r, i, o)()
                    }))
                }
        }
    return s
}

function Vy(t) {
    return typeof t == "object" || "displayName" in t || "props" in t || "__vccOpts" in t
}

function Nc(t) {
    const e = et(cl),
        n = et(ul),
        r = pt(() => e.resolve(xe(t.to))),
        s = pt(() => {
            const {
                matched: l
            } = r.value, {
                length: c
            } = l, u = l[c - 1], f = n.matched;
            if (!u || !f.length) return -1;
            const h = f.findIndex(fr.bind(null, u));
            if (h > -1) return h;
            const d = Dc(l[c - 2]);
            return c > 1 && Dc(u) === d && f[f.length - 1].path !== d ? f.findIndex(fr.bind(null, l[c - 2])) : h
        }),
        i = pt(() => s.value > -1 && Yy(n.params, r.value.params)),
        o = pt(() => s.value > -1 && s.value === n.matched.length - 1 && Ph(n.params, r.value.params));

    function a(l = {}) {
        return Gy(l) ? e[xe(t.replace) ? "replace" : "push"](xe(t.to)).catch(Xr) : Promise.resolve()
    }
    return {
        route: r,
        href: pt(() => r.value.href),
        isActive: i,
        isExactActive: o,
        navigate: a
    }
}
const Ky = bn({
        name: "RouterLink",
        compatConfig: {
            MODE: 3
        },
        props: {
            to: {
                type: [String, Object],
                required: !0
            },
            replace: Boolean,
            activeClass: String,
            exactActiveClass: String,
            custom: Boolean,
            ariaCurrentValue: {
                type: String,
                default: "page"
            }
        },
        useLink: Nc,
        setup(t, {
            slots: e
        }) {
            const n = Gt(Nc(t)),
                {
                    options: r
                } = et(cl),
                s = pt(() => ({
                    [jc(t.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
                    [jc(t.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
                }));
            return () => {
                const i = e.default && e.default(n);
                return t.custom ? i : ft("a", {
                    "aria-current": n.isExactActive ? t.ariaCurrentValue : null,
                    href: n.href,
                    onClick: n.navigate,
                    class: s.value
                }, i)
            }
        }
    }),
    zy = Ky;

function Gy(t) {
    if (!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey) && !t.defaultPrevented && !(t.button !== void 0 && t.button !== 0)) {
        if (t.currentTarget && t.currentTarget.getAttribute) {
            const e = t.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(e)) return
        }
        return t.preventDefault && t.preventDefault(), !0
    }
}

function Yy(t, e) {
    for (const n in e) {
        const r = e[n],
            s = t[n];
        if (typeof r == "string") {
            if (r !== s) return !1
        } else if (!Tt(s) || s.length !== r.length || r.some((i, o) => i !== s[o])) return !1
    }
    return !0
}

function Dc(t) {
    return t ? t.aliasOf ? t.aliasOf.path : t.path : ""
}
const jc = (t, e, n) => t ? ? e ? ? n,
    Jy = bn({
        name: "RouterView",
        inheritAttrs: !1,
        props: {
            name: {
                type: String,
                default: "default"
            },
            route: Object
        },
        compatConfig: {
            MODE: 3
        },
        setup(t, {
            attrs: e,
            slots: n
        }) {
            const r = et(ra),
                s = pt(() => t.route || r.value),
                i = et(Lc, 0),
                o = pt(() => {
                    let c = xe(i);
                    const {
                        matched: u
                    } = s.value;
                    let f;
                    for (;
                        (f = u[c]) && !f.components;) c++;
                    return c
                }),
                a = pt(() => s.value.matched[o.value]);
            Nn(Lc, pt(() => o.value + 1)), Nn(Wy, a), Nn(ra, s);
            const l = St();
            return rr(() => [l.value, a.value, t.name], ([c, u, f], [h, d, _]) => {
                u && (u.instances[f] = c, d && d !== u && c && c === h && (u.leaveGuards.size || (u.leaveGuards = d.leaveGuards), u.updateGuards.size || (u.updateGuards = d.updateGuards))), c && u && (!d || !fr(u, d) || !h) && (u.enterCallbacks[f] || []).forEach(y => y(c))
            }, {
                flush: "post"
            }), () => {
                const c = s.value,
                    u = t.name,
                    f = a.value,
                    h = f && f.components[u];
                if (!h) return Hc(n.default, {
                    Component: h,
                    route: c
                });
                const d = f.props[u],
                    _ = d ? d === !0 ? c.params : typeof d == "function" ? d(c) : d : null,
                    E = ft(h, de({}, _, e, {
                        onVnodeUnmounted: m => {
                            m.component.isUnmounted && (f.instances[u] = null)
                        },
                        ref: l
                    }));
                return Hc(n.default, {
                    Component: E,
                    route: c
                }) || E
            }
        }
    });

function Hc(t, e) {
    if (!t) return null;
    const n = t(e);
    return n.length === 1 ? n[0] : n
}
const jh = Jy;

function Xy(t) {
    const e = Cy(t.routes, t),
        n = t.parseQuery || By,
        r = t.stringifyQuery || Mc,
        s = t.history,
        i = Tr(),
        o = Tr(),
        a = Tr(),
        l = ss(Rt);
    let c = Rt;
    zn && t.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const u = oo.bind(null, P => "" + P),
        f = oo.bind(null, Uy),
        h = oo.bind(null, oi);

    function d(P, W) {
        let L, G;
        return $h(P) ? (L = e.getRecordMatcher(P), G = W) : G = P, e.addRoute(G, L)
    }

    function _(P) {
        const W = e.getRecordMatcher(P);
        W && e.removeRoute(W)
    }

    function y() {
        return e.getRoutes().map(P => P.record)
    }

    function E(P) {
        return !!e.getRecordMatcher(P)
    }

    function m(P, W) {
        if (W = de({}, W || l.value), typeof P == "string") {
            const w = ao(n, P, W.path),
                T = e.resolve({
                    path: w.path
                }, W),
                R = s.createHref(w.fullPath);
            return de(w, T, {
                params: h(T.params),
                hash: oi(w.hash),
                redirectedFrom: void 0,
                href: R
            })
        }
        let L;
        if ("path" in P) L = de({}, P, {
            path: ao(n, P.path, W.path).path
        });
        else {
            const w = de({}, P.params);
            for (const T in w) w[T] == null && delete w[T];
            L = de({}, P, {
                params: f(w)
            }), W.params = f(W.params)
        }
        const G = e.resolve(L, W),
            ue = P.hash || "";
        G.params = u(h(G.params));
        const p = ey(r, de({}, P, {
                hash: Dy(ue),
                path: G.path
            })),
            v = s.createHref(p);
        return de({
            fullPath: p,
            hash: ue,
            query: r === Mc ? qy(P.query) : P.query || {}
        }, G, {
            redirectedFrom: void 0,
            href: v
        })
    }

    function g(P) {
        return typeof P == "string" ? ao(n, P, l.value.path) : de({}, P)
    }

    function x(P, W) {
        if (c !== P) return hr(8, {
            from: W,
            to: P
        })
    }

    function b(P) {
        return O(P)
    }

    function S(P) {
        return b(de(g(P), {
            replace: !0
        }))
    }

    function $(P) {
        const W = P.matched[P.matched.length - 1];
        if (W && W.redirect) {
            const {
                redirect: L
            } = W;
            let G = typeof L == "function" ? L(P) : L;
            return typeof G == "string" && (G = G.includes("?") || G.includes("#") ? G = g(G) : {
                path: G
            }, G.params = {}), de({
                query: P.query,
                hash: P.hash,
                params: "path" in G ? {} : P.params
            }, G)
        }
    }

    function O(P, W) {
        const L = c = m(P),
            G = l.value,
            ue = P.state,
            p = P.force,
            v = P.replace === !0,
            w = $(L);
        if (w) return O(de(g(w), {
            state: typeof w == "object" ? de({}, ue, w.state) : ue,
            force: p,
            replace: v
        }), W || L);
        const T = L;
        T.redirectedFrom = W;
        let R;
        return !p && ty(r, G, L) && (R = hr(16, {
            to: T,
            from: G
        }), Be(G, G, !0, !1)), (R ? Promise.resolve(R) : D(T, G)).catch(A => Dt(A) ? Dt(A, 2) ? A : Ue(A) : ie(A, T, G)).then(A => {
            if (A) {
                if (Dt(A, 2)) return O(de({
                    replace: v
                }, g(A.to), {
                    state: typeof A.to == "object" ? de({}, ue, A.to.state) : ue,
                    force: p
                }), W || T)
            } else A = M(T, G, !0, v, ue);
            return z(T, G, A), A
        })
    }

    function k(P, W) {
        const L = x(P, W);
        return L ? Promise.reject(L) : Promise.resolve()
    }

    function H(P) {
        const W = Ae.values().next().value;
        return W && typeof W.runWithContext == "function" ? W.runWithContext(P) : P()
    }

    function D(P, W) {
        let L;
        const [G, ue, p] = Qy(P, W);
        L = lo(G.reverse(), "beforeRouteLeave", P, W);
        for (const w of G) w.leaveGuards.forEach(T => {
            L.push(cn(T, P, W))
        });
        const v = k.bind(null, P, W);
        return L.push(v), be(L).then(() => {
            L = [];
            for (const w of i.list()) L.push(cn(w, P, W));
            return L.push(v), be(L)
        }).then(() => {
            L = lo(ue, "beforeRouteUpdate", P, W);
            for (const w of ue) w.updateGuards.forEach(T => {
                L.push(cn(T, P, W))
            });
            return L.push(v), be(L)
        }).then(() => {
            L = [];
            for (const w of p)
                if (w.beforeEnter)
                    if (Tt(w.beforeEnter))
                        for (const T of w.beforeEnter) L.push(cn(T, P, W));
                    else L.push(cn(w.beforeEnter, P, W));
            return L.push(v), be(L)
        }).then(() => (P.matched.forEach(w => w.enterCallbacks = {}), L = lo(p, "beforeRouteEnter", P, W), L.push(v), be(L))).then(() => {
            L = [];
            for (const w of o.list()) L.push(cn(w, P, W));
            return L.push(v), be(L)
        }).catch(w => Dt(w, 8) ? w : Promise.reject(w))
    }

    function z(P, W, L) {
        a.list().forEach(G => H(() => G(P, W, L)))
    }

    function M(P, W, L, G, ue) {
        const p = x(P, W);
        if (p) return p;
        const v = W === Rt,
            w = zn ? history.state : {};
        L && (G || v ? s.replace(P.fullPath, de({
            scroll: v && w && w.scroll
        }, ue)) : s.push(P.fullPath, ue)), l.value = P, Be(P, W, L, v), Ue()
    }
    let J;

    function j() {
        J || (J = s.listen((P, W, L) => {
            if (!yt.listening) return;
            const G = m(P),
                ue = $(G);
            if (ue) {
                O(de(ue, {
                    replace: !0
                }), G).catch(Xr);
                return
            }
            c = G;
            const p = l.value;
            zn && cy(Tc(p.fullPath, L.delta), Hi()), D(G, p).catch(v => Dt(v, 12) ? v : Dt(v, 2) ? (O(v.to, G).then(w => {
                Dt(w, 20) && !L.delta && L.type === cs.pop && s.go(-1, !1)
            }).catch(Xr), Promise.reject()) : (L.delta && s.go(-L.delta, !1), ie(v, G, p))).then(v => {
                v = v || M(G, p, !1), v && (L.delta && !Dt(v, 8) ? s.go(-L.delta, !1) : L.type === cs.pop && Dt(v, 20) && s.go(-1, !1)), z(G, p, v)
            }).catch(Xr)
        }))
    }
    let fe = Tr(),
        re = Tr(),
        se;

    function ie(P, W, L) {
        Ue(P);
        const G = re.list();
        return G.length ? G.forEach(ue => ue(P, W, L)) : console.error(P), Promise.reject(P)
    }

    function Re() {
        return se && l.value !== Rt ? Promise.resolve() : new Promise((P, W) => {
            fe.add([P, W])
        })
    }

    function Ue(P) {
        return se || (se = !P, j(), fe.list().forEach(([W, L]) => P ? L(P) : W()), fe.reset()), P
    }

    function Be(P, W, L, G) {
        const {
            scrollBehavior: ue
        } = t;
        if (!zn || !ue) return Promise.resolve();
        const p = !L && uy(Tc(P.fullPath, 0)) || (G || !L) && history.state && history.state.scroll || null;
        return Un().then(() => ue(P, W, p)).then(v => v && ly(v)).catch(v => ie(v, P, W))
    }
    const he = P => s.go(P);
    let Me;
    const Ae = new Set,
        yt = {
            currentRoute: l,
            listening: !0,
            addRoute: d,
            removeRoute: _,
            hasRoute: E,
            getRoutes: y,
            resolve: m,
            options: t,
            push: b,
            replace: S,
            go: he,
            back: () => he(-1),
            forward: () => he(1),
            beforeEach: i.add,
            beforeResolve: o.add,
            afterEach: a.add,
            onError: re.add,
            isReady: Re,
            install(P) {
                const W = this;
                P.component("RouterLink", zy), P.component("RouterView", jh), P.config.globalProperties.$router = W, Object.defineProperty(P.config.globalProperties, "$route", {
                    enumerable: !0,
                    get: () => xe(l)
                }), zn && !Me && l.value === Rt && (Me = !0, b(s.location).catch(ue => {}));
                const L = {};
                for (const ue in Rt) Object.defineProperty(L, ue, {
                    get: () => l.value[ue],
                    enumerable: !0
                });
                P.provide(cl, W), P.provide(ul, vs(L)), P.provide(ra, l);
                const G = P.unmount;
                Ae.add(P), P.unmount = function() {
                    Ae.delete(P), Ae.size < 1 && (c = Rt, J && J(), J = null, l.value = Rt, Me = !1, se = !1), G()
                }
            }
        };

    function be(P) {
        return P.reduce((W, L) => W.then(() => H(L)), Promise.resolve())
    }
    return yt
}

function Qy(t, e) {
    const n = [],
        r = [],
        s = [],
        i = Math.max(e.matched.length, t.matched.length);
    for (let o = 0; o < i; o++) {
        const a = e.matched[o];
        a && (t.matched.find(c => fr(c, a)) ? r.push(a) : n.push(a));
        const l = t.matched[o];
        l && (e.matched.find(c => fr(c, l)) || s.push(l))
    }
    return [n, r, s]
}

function Zy() {
    return et(ul)
}
const ct = {
        layout: "empty"
    },
    Uc = [{
        name: "canvas-test",
        path: "/canvas-test",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./canvas-test.697c5d10.js"), ["./canvas-test.697c5d10.js", "./index.3e29bb70.js", "./three.module.16edf5a4.js", "./AssetCache.751b977c.js", "./KatanaPartNames.c7ff50de.js", "./canvas-test.33cc4d07.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "index",
        path: "/",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./index.7c191915.js"), ["./index.7c191915.js", "./GridRow.c8ff0ce9.js", "./nuxt-link.ca149e20.js", "./GridRow.4f926f95.css", "./index.4ae1b6b5.js", "./three.module.16edf5a4.js", "./KatanaPartNames.c7ff50de.js", "./AssetCache.751b977c.js", "./BaseImage.d75aef71.js", "./BaseImage.9a0fcbb2.css", "./MainFooter.958925f3.js", "./CurrentYear.vue.8dfa6fe6.js", "./MainFooter.fc0024b1.css", "./CharAvatar.b10b80f6.js", "./CharAvatar.559e0020.css", "./SceneCanvas.8a5fd1d1.js", "./SceneCanvas.4fe56d08.css", "./WavyText.55e8abfb.js", "./WavyText.6975c5ac.css", "./index.3e29bb70.js", "./index.04ee8f0f.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "onlycanvas",
        path: "/onlycanvas",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./onlycanvas.f6710286.js"), ["./onlycanvas.f6710286.js", "./index.3e29bb70.js", "./three.module.16edf5a4.js", "./AssetCache.751b977c.js", "./KatanaPartNames.c7ff50de.js", "./onlycanvas.e666084c.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "onlycanvasrec",
        path: "/onlycanvasrec",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./onlycanvasrec.96b4e7a3.js"), ["./onlycanvasrec.96b4e7a3.js", "./index.4ae1b6b5.js", "./onlycanvasrec.9a3f2d98.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "onlycanvasw",
        path: "/onlycanvasw",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./onlycanvasw.7201bc73.js"), ["./onlycanvasw.7201bc73.js", "./index.3e29bb70.js", "./three.module.16edf5a4.js", "./AssetCache.751b977c.js", "./onlycanvasw.8dc6aa3c.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "skill-hub-category-slug",
        path: "/skill-hub/:category()/:slug()",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./_slug_.ffa6d3af.js"), ["./_slug_.ffa6d3af.js", "./nuxt-link.ca149e20.js", "./GridRow.c8ff0ce9.js", "./GridRow.4f926f95.css", "./CurrentYear.vue.8dfa6fe6.js", "./index.3e29bb70.js", "./index.4ae1b6b5.js", "./database.feaaf565.js", "./_slug_.0fcc4061.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "skill-hub",
        path: "/skill-hub",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./index.1e34fb54.js"), ["./index.1e34fb54.js", "./BaseImage.d75aef71.js", "./BaseImage.9a0fcbb2.css", "./index.4ae1b6b5.js", "./MainFooter.958925f3.js", "./GridRow.c8ff0ce9.js", "./nuxt-link.ca149e20.js", "./GridRow.4f926f95.css", "./CurrentYear.vue.8dfa6fe6.js", "./MainFooter.fc0024b1.css", "./database.feaaf565.js", "./string-storage.34efabf1.js", "./index.3e29bb70.js", "./index.6accc8a4.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: (ct == null ? void 0 : ct.name) ? ? "temp-222",
        path: (ct == null ? void 0 : ct.path) ? ? "/temp/222",
        meta: ct || {},
        alias: (ct == null ? void 0 : ct.alias) || [],
        redirect: (ct == null ? void 0 : ct.redirect) || void 0,
        component: () => qe(() =>
            import ("./222.02fdbe7a.js"), ["./222.02fdbe7a.js", "./index.3e29bb70.js", "./222.ecf85093.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "temp-3d",
        path: "/temp/3d",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./3d.087b63ca.js"), ["./3d.087b63ca.js", "./index.3e29bb70.js"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "temp-chromatic-aberration",
        path: "/temp/chromatic-aberration",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./chromatic-aberration.0242d700.js"), ["./chromatic-aberration.0242d700.js", "./three.module.16edf5a4.js", "./chromatic-aberration.79ea7cc1.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "temp-mask",
        path: "/temp/mask",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./mask.6c89d6cb.js"), ["./mask.6c89d6cb.js", "./SceneCanvas.8a5fd1d1.js", "./index.4ae1b6b5.js", "./SceneCanvas.4fe56d08.css", "./index.3e29bb70.js", "./mask.a4581b3d.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "temp-test-test",
        path: "/temp/test-test",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./test-test.fe09d47a.js"), ["./test-test.fe09d47a.js", "./WavyText.55e8abfb.js", "./index.4ae1b6b5.js", "./WavyText.6975c5ac.css", "./test-test.bb827e98.css"],
            import.meta.url).then(t => t.default || t)
    }, {
        name: "test2",
        path: "/test2",
        meta: {},
        alias: [],
        redirect: void 0,
        component: () => qe(() =>
            import ("./test2.6fa2373f.js"), ["./test2.6fa2373f.js", "./test2.02500e32.css"],
            import.meta.url).then(t => t.default || t)
    }],
    e0 = {
        scrollBehavior(t, e, n) {
            var c;
            const r = Ne(),
                s = ((c = wr().options) == null ? void 0 : c.scrollBehaviorType) ? ? "auto";
            let i = n || void 0;
            const o = typeof t.meta.scrollToTop == "function" ? t.meta.scrollToTop(t, e) : t.meta.scrollToTop;
            if (!i && e && t && o !== !1 && t0(e, t) && (i = {
                    left: 0,
                    top: 0
                }), t.path === e.path) {
                if (e.hash && !t.hash) return {
                    left: 0,
                    top: 0
                };
                if (t.hash) return {
                    el: t.hash,
                    top: Bc(t.hash),
                    behavior: s
                }
            }
            const a = u => !!(u.meta.pageTransition ? ? Jo),
                l = a(e) && a(t) ? "page:transition:finish" : "page:finish";
            return new Promise(u => {
                r.hooks.hookOnce(l, async () => {
                    await Un(), t.hash && (i = {
                        el: t.hash,
                        top: Bc(t.hash),
                        behavior: s
                    }), u(i)
                })
            })
        }
    };

function Bc(t) {
    try {
        const e = document.querySelector(t);
        if (e) return parseFloat(getComputedStyle(e).scrollMarginTop)
    } catch {}
    return 0
}

function t0(t, e) {
    return e.path !== t.path || JSON.stringify(t.params) !== JSON.stringify(e.params)
}
const n0 = {
        linkActiveClass: "-active",
        linkExactActiveClass: "-exact-active"
    },
    nt = { ...n0,
        ...e0
    },
    r0 = async t => {
        var l;
        let e, n;
        if (!((l = t.meta) != null && l.validate)) return;
        const r = Ne(),
            s = wr();
        if (([e, n] = ri(() => Promise.resolve(t.meta.validate(t))), e = await e, n(), e) === !0) return;
        const o = al({
                statusCode: 404,
                statusMessage: `Page Not Found: ${t.fullPath}`
            }),
            a = s.beforeResolve(c => {
                if (a(), c === t) {
                    const u = s.afterEach(async () => {
                        u(), await r.runWithContext(() => Yn(o)), window.history.pushState({}, "", t.fullPath)
                    });
                    return !1
                }
            })
    },
    s0 = [r0],
    Zr = {};

function i0(t, e, n) {
    const {
        pathname: r,
        search: s,
        hash: i
    } = e, o = t.indexOf("#");
    if (o > -1) {
        const c = i.includes(t.slice(o)) ? t.slice(o).length : 1;
        let u = i.slice(c);
        return u[0] !== "/" && (u = "/" + u), uc(u, "")
    }
    const a = uc(r, t),
        l = !n || rv(a, n, {
            trailingSlash: !0
        }) ? a : n;
    return l + (l.includes("?") ? "" : s) + i
}
const o0 = Xt({
        name: "nuxt:router",
        enforce: "pre",
        async setup(t) {
            var y, E;
            let e, n, r = Di().app.baseURL;
            nt.hashMode && !r.includes("#") && (r += "#");
            const s = ((y = nt.history) == null ? void 0 : y.call(nt, r)) ? ? (nt.hashMode ? py(r) : Ah(r)),
                i = ((E = nt.routes) == null ? void 0 : E.call(nt, Uc)) ? ? Uc;
            let o;
            const a = i0(r, window.location, t.payload.path),
                l = Xy({ ...nt,
                    scrollBehavior: (m, g, x) => {
                        var b;
                        if (g === Rt) {
                            o = x;
                            return
                        }
                        return l.options.scrollBehavior = nt.scrollBehavior, (b = nt.scrollBehavior) == null ? void 0 : b.call(nt, m, Rt, o || x)
                    },
                    history: s,
                    routes: i
                });
            t.vueApp.use(l);
            const c = ss(l.currentRoute.value);
            l.afterEach((m, g) => {
                c.value = g
            }), Object.defineProperty(t.vueApp.config.globalProperties, "previousRoute", {
                get: () => c.value
            });
            const u = ss(l.resolve(a)),
                f = () => {
                    u.value = l.currentRoute.value
                };
            t.hook("page:finish", f), l.afterEach((m, g) => {
                var x, b, S, $;
                ((b = (x = m.matched[0]) == null ? void 0 : x.components) == null ? void 0 : b.default) === (($ = (S = g.matched[0]) == null ? void 0 : S.components) == null ? void 0 : $.default) && f()
            });
            const h = {};
            for (const m in u.value) Object.defineProperty(h, m, {
                get: () => u.value[m]
            });
            t._route = vs(h), t._middleware = t._middleware || {
                global: [],
                named: {}
            };
            const d = ji();
            try {
                [e, n] = ri(() => l.isReady()), await e, n()
            } catch (m) {
                [e, n] = ri(() => t.runWithContext(() => Yn(m))), await e, n()
            }
            const _ = t.payload.state._layout;
            return l.beforeEach(async (m, g) => {
                var x;
                m.meta = Gt(m.meta), t.isHydrating && _ && !Dn(m.meta.layout) && (m.meta.layout = _), t._processingMiddleware = !0; {
                    const b = new Set([...s0, ...t._middleware.global]);
                    for (const S of m.matched) {
                        const $ = S.meta.middleware;
                        if ($)
                            if (Array.isArray($))
                                for (const O of $) b.add(O);
                            else b.add($)
                    }
                    for (const S of b) {
                        const $ = typeof S == "string" ? t._middleware.named[S] || await ((x = Zr[S]) == null ? void 0 : x.call(Zr).then(k => k.default || k)) : S;
                        if (!$) throw new Error(`Unknown route middleware: '${S}'.`);
                        const O = await t.runWithContext(() => $(m, g));
                        if (!t.payload.serverRendered && t.isHydrating && (O === !1 || O instanceof Error)) {
                            const k = O || Zo({
                                statusCode: 404,
                                statusMessage: `Page Not Found: ${a}`
                            });
                            return await t.runWithContext(() => Yn(k)), !1
                        }
                        if (O !== !0 && (O || O === !1)) return O
                    }
                }
            }), l.onError(() => {
                delete t._processingMiddleware
            }), l.afterEach(async (m, g, x) => {
                delete t._processingMiddleware, !t.isHydrating && d.value && await t.runWithContext(Vm), m.matched.length === 0 && await t.runWithContext(() => Yn(Zo({
                    statusCode: 404,
                    fatal: !1,
                    statusMessage: `Page not found: ${m.fullPath}`
                })))
            }), t.hooks.hookOnce("app:created", async () => {
                try {
                    await l.replace({ ...l.resolve(a),
                        name: void 0,
                        force: !0
                    }), l.options.scrollBehavior = nt.scrollBehavior
                } catch (m) {
                    await t.runWithContext(() => Yn(m))
                }
            }), {
                provide: {
                    router: l
                }
            }
        }
    }),
    a0 = Xt({
        name: "nuxt:global-components"
    }),
    Fn = {
        default: () => qe(() =>
            import ("./default.352500c0.js"), ["./default.352500c0.js", "./IconList.8f88358e.js", "./GridRow.c8ff0ce9.js", "./nuxt-link.ca149e20.js", "./GridRow.4f926f95.css", "./index.4ae1b6b5.js", "./BaseImage.d75aef71.js", "./BaseImage.9a0fcbb2.css", "./CharAvatar.b10b80f6.js", "./CharAvatar.559e0020.css", "./string-storage.34efabf1.js", "./default.f6c13154.css"],
            import.meta.url).then(t => t.default || t),
        empty: () => qe(() =>
            import ("./empty.21c28db6.js"), ["./empty.21c28db6.js", "./IconList.8f88358e.js", "./index.4ae1b6b5.js", "./empty.98fa7f0b.css"],
            import.meta.url).then(t => t.default || t)
    },
    l0 = Xt({
        name: "nuxt:prefetch",
        setup(t) {
            const e = wr();
            t.hooks.hook("app:mounted", () => {
                e.beforeEach(async n => {
                    var s;
                    const r = (s = n == null ? void 0 : n.meta) == null ? void 0 : s.layout;
                    r && typeof Fn[r] == "function" && await Fn[r]()
                })
            }), t.hooks.hook("link:prefetch", n => {
                var o, a, l, c;
                if (Li(n)) return;
                const r = e.resolve(n);
                if (!r) return;
                const s = (o = r == null ? void 0 : r.meta) == null ? void 0 : o.layout;
                let i = Array.isArray((a = r == null ? void 0 : r.meta) == null ? void 0 : a.middleware) ? (l = r == null ? void 0 : r.meta) == null ? void 0 : l.middleware : [(c = r == null ? void 0 : r.meta) == null ? void 0 : c.middleware];
                i = i.filter(u => typeof u == "string");
                for (const u of i) typeof Zr[u] == "function" && Zr[u]();
                s && typeof Fn[s] == "function" && Fn[s]()
            })
        }
    });

function co(...t) {
    var e;
    (e = window.dataLayer) == null || e.push(arguments)
}

function c0({
    tags: t
}) {
    window.dataLayer = window.dataLayer || [];
    for (const e of t)
        for (const n of e.initCommands ? ? []) co(...n);
    co("js", new Date);
    for (const e of t) co("config", e.id, e.config ? ? {})
}

function u0(t) {
    const e = le(t),
        n = e.tags.filter(Boolean).map(r => typeof r == "string" ? {
            id: r
        } : r);
    if (e.id) {
        const {
            id: r,
            config: s,
            initCommands: i
        } = e;
        n.unshift({
            id: r,
            config: s,
            initCommands: i
        })
    }
    return n
}
const f0 = Xt({
        parallel: !0,
        setup() {
            const t = Di().public.gtag,
                e = u0(t);
            if (!e.length || (c0({
                    tags: e
                }), !t.enabled)) return;
            const n = t.loadingStrategy === "async" ? "async" : "defer";
            Rm({
                script: [{
                    src: rl(t.url, {
                        id: e[0].id
                    }),
                    [n]: !0,
                    "data-gtag": ""
                }]
            })
        }
    }),
    h0 = Xt({
        name: "nuxt:chunk-reload",
        setup(t) {
            const e = wr(),
                n = Di(),
                r = new Set;
            e.beforeEach(() => {
                r.clear()
            }), t.hook("app:chunkError", ({
                error: s
            }) => {
                r.add(s)
            }), e.onError((s, i) => {
                if (r.has(s)) {
                    const a = "href" in i && i.href.startsWith("#") ? n.app.baseURL + i.href : Ni(n.app.baseURL, i.fullPath);
                    Gm({
                        path: a,
                        persistState: !0
                    })
                }
            })
        }
    });
class d0 {
    constructor() {
        Wn(this, "handlers");
        Wn(this, "state");
        Wn(this, "userId", "");
        Wn(this, "tutorials", []);
        Wn(this, "globalId", 1);
        this.state = Gt({
            theme: ""
        }), this.handlers = {}
    }
    getId() {
        return this.globalId++
    }
    getSplitText(e, n = (r, s, i) => {}) {
        if (e.length == 0) return "";
        let r = 0;
        const s = document.createElement("span"),
            i = e.split(" ");
        return i.forEach((o, a) => {
            const l = document.createElement("span");
            l.classList.add("-splitted-wrap");
            const c = Array.from(o);
            if (c.forEach((u, f) => {
                    const h = document.createElement("span");
                    h.innerText = u, h.classList.add("-splitted-char"), h.style.setProperty("--char-index", String(r)), l.appendChild(h), r++, n(h, f, c.length)
                }), s.appendChild(l), a !== i.length - 1) {
                const u = document.createElement("span");
                u.innerHTML = " ", l.appendChild(u)
            }
        }), s.innerHTML
    }
    on(e, n) {
        this.handlers[e] || (this.handlers[e] = []), this.handlers[e].push(n)
    }
    off(e, n) {
        this.handlers[e] && (this.handlers[e] = this.handlers[e].filter(r => r !== n))
    }
    emit(e, ...n) {
        this.handlers[e] && this.handlers[e].forEach(r => r(...n))
    }
}
const p0 = Xt(t => {
    const e = new d0;
    t.provide("globalClass", e)
});
var C = typeof window < "u" ? window : void 0,
    ot = typeof globalThis < "u" ? globalThis : C,
    Hh = Array.prototype,
    qc = Hh.forEach,
    Wc = Hh.indexOf,
    ut = ot == null ? void 0 : ot.navigator,
    U = ot == null ? void 0 : ot.document,
    it = ot == null ? void 0 : ot.location,
    sa = ot == null ? void 0 : ot.fetch,
    ia = ot != null && ot.XMLHttpRequest && "withCredentials" in new ot.XMLHttpRequest ? ot.XMLHttpRequest : void 0,
    Vc = ot == null ? void 0 : ot.AbortController,
    st = ut == null ? void 0 : ut.userAgent,
    ee = C ? ? {},
    Ut = {
        DEBUG: !1,
        LIB_VERSION: "1.279.3"
    };

function Kc(t, e, n, r, s, i, o) {
    try {
        var a = t[i](o),
            l = a.value
    } catch (c) {
        return void n(c)
    }
    a.done ? e(l) : Promise.resolve(l).then(r, s)
}

function zc(t) {
    return function() {
        var e = this,
            n = arguments;
        return new Promise(function(r, s) {
            var i = t.apply(e, n);

            function o(l) {
                Kc(i, r, s, o, a, "next", l)
            }

            function a(l) {
                Kc(i, r, s, o, a, "throw", l)
            }
            o(void 0)
        })
    }
}

function K() {
    return K = Object.assign ? Object.assign.bind() : function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e];
            for (var r in n)({}).hasOwnProperty.call(n, r) && (t[r] = n[r])
        }
        return t
    }, K.apply(null, arguments)
}

function Uh(t, e) {
    if (t == null) return {};
    var n = {};
    for (var r in t)
        if ({}.hasOwnProperty.call(t, r)) {
            if (e.indexOf(r) !== -1) continue;
            n[r] = t[r]
        }
    return n
}
var g0 = ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"];

function oe(t, e) {
    return t.indexOf(e) !== -1
}
var Ui = function(t) {
        return t.trim()
    },
    oa = function(t) {
        return t.replace(/^\$/, "")
    },
    _0 = Array.isArray,
    Bh = Object.prototype,
    qh = Bh.hasOwnProperty,
    Bi = Bh.toString,
    me = _0 || function(t) {
        return Bi.call(t) === "[object Array]"
    },
    pn = t => typeof t == "function",
    ze = t => t === Object(t) && !me(t),
    Jn = t => {
        if (ze(t)) {
            for (var e in t)
                if (qh.call(t, e)) return !1;
            return !0
        }
        return !1
    },
    B = t => t === void 0,
    Le = t => Bi.call(t) == "[object String]",
    aa = t => Le(t) && t.trim().length === 0,
    Qt = t => t === null,
    ke = t => B(t) || Qt(t),
    Nt = t => Bi.call(t) == "[object Number]",
    gn = t => Bi.call(t) === "[object Boolean]",
    v0 = t => t instanceof FormData,
    m0 = t => oe(g0, t);

function la(t) {
    return t === null || typeof t != "object"
}

function ai(t, e) {
    return Object.prototype.toString.call(t) === "[object " + e + "]"
}

function Wh(t) {
    return !B(Event) && function(e, n) {
        try {
            return e instanceof n
        } catch {
            return !1
        }
    }(t, Event)
}
var y0 = [!0, "true", 1, "1", "yes"],
    uo = t => oe(y0, t),
    b0 = [!1, "false", 0, "0", "no"];

function Ot(t, e, n, r, s) {
    return e > n && (r.warn("min cannot be greater than max."), e = n), Nt(t) ? t > n ? (r.warn(" cannot be  greater than max: " + n + ". Using max value instead."), n) : t < e ? (r.warn(" cannot be less than min: " + e + ". Using min value instead."), e) : t : (r.warn(" must be a number. using max or fallback. max: " + n + ", fallback: " + s), Ot(s || n, e, n, r))
}
class w0 {
    constructor(e) {
        this.t = e, this.i = {}, this.o = () => {
            Object.keys(this.i).forEach(n => {
                var r = this.h(n) + this.m;
                r >= this.S ? delete this.i[n] : this.$(n, r)
            })
        }, this.h = n => this.i[String(n)], this.$ = (n, r) => {
            this.i[String(n)] = r
        }, this.consumeRateLimit = n => {
            var r, s, i = (r = this.h(n)) !== null && r !== void 0 ? r : this.S;
            if ((i = Math.max(i - 1, 0)) === 0) return !0;
            this.$(n, i);
            var o = i === 0;
            return o && ((s = this.k) == null || s.call(this, n)), o
        }, this.k = this.t.k, this.S = Ot(this.t.bucketSize, 0, 100, this.t.P), this.m = Ot(this.t.refillRate, 0, this.S, this.t.P), this.T = Ot(this.t.refillInterval, 0, 864e5, this.t.P), this.I = setInterval(() => {
            this.o()
        }, this.T)
    }
    stop() {
        this.I && (clearInterval(this.I), this.I = void 0)
    }
}
var Os, Gc, fo, E0 = t => t instanceof Error;

function x0(t) {
    var e = globalThis._posthogChunkIds;
    if (e) {
        var n = Object.keys(e);
        return fo && n.length === Gc || (Gc = n.length, fo = n.reduce((r, s) => {
            Os || (Os = {});
            var i = Os[s];
            if (i) r[i[0]] = i[1];
            else
                for (var o = t(s), a = o.length - 1; a >= 0; a--) {
                    var l = o[a],
                        c = l == null ? void 0 : l.filename,
                        u = e[s];
                    if (c && u) {
                        r[c] = u, Os[s] = [c, u];
                        break
                    }
                }
            return r
        }, {})), fo
    }
}
var dr = "?";

function ca(t, e, n, r) {
    var s = {
        platform: "web:javascript",
        filename: t,
        function: e === "<anonymous>" ? dr : e,
        in_app: !0
    };
    return B(n) || (s.lineno = n), B(r) || (s.colno = r), s
}
var Vh = (t, e) => {
        var n = t.indexOf("safari-extension") !== -1,
            r = t.indexOf("safari-web-extension") !== -1;
        return n || r ? [t.indexOf("@") !== -1 ? t.split("@")[0] : dr, n ? "safari-extension:" + e : "safari-web-extension:" + e] : [t, e]
    },
    k0 = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,
    C0 = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    S0 = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    T0 = t => {
        var e = k0.exec(t);
        if (e) {
            var [, n, r, s] = e;
            return ca(n, dr, +r, +s)
        }
        var i = C0.exec(t);
        if (i) {
            if (i[2] && i[2].indexOf("eval") === 0) {
                var o = S0.exec(i[2]);
                o && (i[2] = o[1], i[3] = o[2], i[4] = o[3])
            }
            var [a, l] = Vh(i[1] || dr, i[2]);
            return ca(l, a, i[3] ? +i[3] : void 0, i[4] ? +i[4] : void 0)
        }
    },
    P0 = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
    R0 = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    A0 = t => {
        var e = P0.exec(t);
        if (e) {
            if (e[3] && e[3].indexOf(" > eval") > -1) {
                var n = R0.exec(e[3]);
                n && (e[1] = e[1] || "eval", e[3] = n[1], e[4] = n[2], e[5] = "")
            }
            var r = e[3],
                s = e[1] || dr;
            return [s, r] = Vh(s, r), ca(r, s, e[4] ? +e[4] : void 0, e[5] ? +e[5] : void 0)
        }
    },
    Yc = /\(error: (.*)\)/,
    Jc = 50;

function $0() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
    return function(r, s) {
        s === void 0 && (s = 0);
        for (var i = [], o = r.split(`
`), a = s; a < o.length; a++) {
            var l = o[a];
            if (!(l.length > 1024)) {
                var c = Yc.test(l) ? l.replace(Yc, "$1") : l;
                if (!c.match(/\S*Error: /)) {
                    for (var u of e) {
                        var f = u(c);
                        if (f) {
                            i.push(f);
                            break
                        }
                    }
                    if (i.length >= Jc) break
                }
            }
        }
        return function(h) {
            if (!h.length) return [];
            var d = Array.from(h);
            return d.reverse(), d.slice(0, Jc).map(_ => {
                return K({}, _, {
                    filename: _.filename || (y = d, y[y.length - 1] || {}).filename,
                    function: _.function || dr
                });
                var y
            })
        }(i)
    }
}
class I0 {
    constructor(e, n, r) {
        e === void 0 && (e = []), n === void 0 && (n = []), r === void 0 && (r = []), this.coercers = e, this.modifiers = r, this.stackParser = $0(...n)
    }
    buildFromUnknown(e, n) {
        n === void 0 && (n = {});
        var r = n && n.mechanism || {
                handled: !0,
                type: "generic"
            },
            s = this.buildCoercingContext(r, n, 0).apply(e),
            i = this.buildParsingContext(),
            o = this.parseStacktrace(s, i);
        return {
            $exception_list: this.convertToExceptionList(o, r),
            $exception_level: "error"
        }
    }
    modifyFrames(e) {
        var n = this;
        return zc(function*() {
            for (var r of e) r.stacktrace && r.stacktrace.frames && me(r.stacktrace.frames) && (r.stacktrace.frames = yield n.applyModifiers(r.stacktrace.frames));
            return e
        })()
    }
    coerceFallback(e) {
        var n;
        return {
            type: "Error",
            value: "Unknown error",
            stack: (n = e.syntheticException) == null ? void 0 : n.stack,
            synthetic: !0
        }
    }
    parseStacktrace(e, n) {
        var r, s;
        return e.cause != null && (r = this.parseStacktrace(e.cause, n)), e.stack != "" && e.stack != null && (s = this.applyChunkIds(this.stackParser(e.stack, e.synthetic ? 1 : 0), n.chunkIdMap)), K({}, e, {
            cause: r,
            stack: s
        })
    }
    applyChunkIds(e, n) {
        return e.map(r => (r.filename && n && (r.chunk_id = n[r.filename]), r))
    }
    applyCoercers(e, n) {
        for (var r of this.coercers)
            if (r.match(e)) return r.coerce(e, n);
        return this.coerceFallback(n)
    }
    applyModifiers(e) {
        var n = this;
        return zc(function*() {
            var r = e;
            for (var s of n.modifiers) r = yield s(r);
            return r
        })()
    }
    convertToExceptionList(e, n) {
        var r, s, i, o = {
            type: e.type,
            value: e.value,
            mechanism: {
                type: (r = n.type) !== null && r !== void 0 ? r : "generic",
                handled: (s = n.handled) === null || s === void 0 || s,
                synthetic: (i = e.synthetic) !== null && i !== void 0 && i
            }
        };
        e.stack && (o.stacktrace = {
            type: "raw",
            frames: e.stack
        });
        var a = [o];
        return e.cause != null && a.push(...this.convertToExceptionList(e.cause, K({}, n, {
            handled: !0
        }))), a
    }
    buildParsingContext() {
        return {
            chunkIdMap: x0(this.stackParser)
        }
    }
    buildCoercingContext(e, n, r) {
        r === void 0 && (r = 0);
        var s = (i, o) => {
            if (o <= 4) {
                var a = this.buildCoercingContext(e, n, o);
                return this.applyCoercers(i, a)
            }
        };
        return K({}, n, {
            syntheticException: r == 0 ? n.syntheticException : void 0,
            mechanism: e,
            apply: i => s(i, r),
            next: i => s(i, r + 1)
        })
    }
}
class O0 {
    match(e) {
        return this.isDOMException(e) || this.isDOMError(e)
    }
    coerce(e, n) {
        var r = Le(e.stack);
        return {
            type: this.getType(e),
            value: this.getValue(e),
            stack: r ? e.stack : void 0,
            cause: e.cause ? n.next(e.cause) : void 0,
            synthetic: !1
        }
    }
    getType(e) {
        return this.isDOMError(e) ? "DOMError" : "DOMException"
    }
    getValue(e) {
        var n = e.name || (this.isDOMError(e) ? "DOMError" : "DOMException");
        return e.message ? n + ": " + e.message : n
    }
    isDOMException(e) {
        return ai(e, "DOMException")
    }
    isDOMError(e) {
        return ai(e, "DOMError")
    }
}
class F0 {
    match(e) {
        return (n => n instanceof Error)(e)
    }
    coerce(e, n) {
        return {
            type: this.getType(e),
            value: this.getMessage(e, n),
            stack: this.getStack(e),
            cause: e.cause ? n.next(e.cause) : void 0,
            synthetic: !1
        }
    }
    getType(e) {
        return e.name || e.constructor.name
    }
    getMessage(e, n) {
        var r = e.message;
        return r.error && typeof r.error.message == "string" ? String(r.error.message) : String(r)
    }
    getStack(e) {
        return e.stacktrace || e.stack || void 0
    }
}
class M0 {
    constructor() {}
    match(e) {
        return ai(e, "ErrorEvent") && e.error != null
    }
    coerce(e, n) {
        var r, s = n.apply(e.error);
        return s || {
            type: "ErrorEvent",
            value: e.message,
            stack: (r = n.syntheticException) == null ? void 0 : r.stack,
            synthetic: !0
        }
    }
}
var L0 = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
class N0 {
    match(e) {
        return typeof e == "string"
    }
    coerce(e, n) {
        var r, [s, i] = this.getInfos(e);
        return {
            type: s ? ? "Error",
            value: i ? ? e,
            stack: (r = n.syntheticException) == null ? void 0 : r.stack,
            synthetic: !0
        }
    }
    getInfos(e) {
        var n = "Error",
            r = e,
            s = e.match(L0);
        return s && (n = s[1], r = s[2]), [n, r]
    }
}
var D0 = ["fatal", "error", "warning", "log", "info", "debug"];

function Kh(t, e) {
    e === void 0 && (e = 40);
    var n = Object.keys(t);
    if (n.sort(), !n.length) return "[object has no keys]";
    for (var r = n.length; r > 0; r--) {
        var s = n.slice(0, r).join(", ");
        if (!(s.length > e)) return r === n.length || s.length <= e ? s : s.slice(0, e) + "..."
    }
    return ""
}
class j0 {
    match(e) {
        return typeof e == "object" && e !== null
    }
    coerce(e, n) {
        var r, s = this.getErrorPropertyFromObject(e);
        return s ? n.apply(s) : {
            type: this.getType(e),
            value: this.getValue(e),
            stack: (r = n.syntheticException) == null ? void 0 : r.stack,
            level: this.isSeverityLevel(e.level) ? e.level : "error",
            synthetic: !0
        }
    }
    getType(e) {
        return Wh(e) ? e.constructor.name : "Error"
    }
    getValue(e) {
        if ("name" in e && typeof e.name == "string") {
            var n = "'" + e.name + "' captured as exception";
            return "message" in e && typeof e.message == "string" && (n += " with message: '" + e.message + "'"), n
        }
        if ("message" in e && typeof e.message == "string") return e.message;
        var r = this.getObjectClassName(e);
        return (r && r !== "Object" ? "'" + r + "'" : "Object") + " captured as exception with keys: " + Kh(e)
    }
    isSeverityLevel(e) {
        return Le(e) && !aa(e) && D0.indexOf(e) >= 0
    }
    getErrorPropertyFromObject(e) {
        for (var n in e)
            if (Object.prototype.hasOwnProperty.call(e, n)) {
                var r = e[n];
                if (E0(r)) return r
            }
    }
    getObjectClassName(e) {
        try {
            var n = Object.getPrototypeOf(e);
            return n ? n.constructor.name : void 0
        } catch {
            return
        }
    }
}
class H0 {
    match(e) {
        return Wh(e)
    }
    coerce(e, n) {
        var r, s = e.constructor.name;
        return {
            type: s,
            value: s + " captured as exception with keys: " + Kh(e),
            stack: (r = n.syntheticException) == null ? void 0 : r.stack,
            synthetic: !0
        }
    }
}
class U0 {
    match(e) {
        return la(e)
    }
    coerce(e, n) {
        var r;
        return {
            type: "Error",
            value: "Primitive value captured as exception: " + String(e),
            stack: (r = n.syntheticException) == null ? void 0 : r.stack,
            synthetic: !0
        }
    }
}
class B0 {
    match(e) {
        return ai(e, "PromiseRejectionEvent")
    }
    coerce(e, n) {
        var r, s = this.getUnhandledRejectionReason(e);
        return la(s) ? {
            type: "UnhandledRejection",
            value: "Non-Error promise rejection captured with value: " + String(s),
            stack: (r = n.syntheticException) == null ? void 0 : r.stack,
            synthetic: !0
        } : n.apply(s)
    }
    getUnhandledRejectionReason(e) {
        if (la(e)) return e;
        try {
            if ("reason" in e) return e.reason;
            if ("detail" in e && "reason" in e.detail) return e.detail.reason
        } catch {}
        return e
    }
}
var zh = t => {
        var e = {
            R: function(n) {
                if (C && (Ut.DEBUG || ee.POSTHOG_DEBUG) && !B(C.console) && C.console) {
                    for (var r = ("__rrweb_original__" in C.console[n]) ? C.console[n].__rrweb_original__ : C.console[n], s = arguments.length, i = new Array(s > 1 ? s - 1 : 0), o = 1; o < s; o++) i[o - 1] = arguments[o];
                    r(t, ...i)
                }
            },
            info: function() {
                for (var n = arguments.length, r = new Array(n), s = 0; s < n; s++) r[s] = arguments[s];
                e.R("log", ...r)
            },
            warn: function() {
                for (var n = arguments.length, r = new Array(n), s = 0; s < n; s++) r[s] = arguments[s];
                e.R("warn", ...r)
            },
            error: function() {
                for (var n = arguments.length, r = new Array(n), s = 0; s < n; s++) r[s] = arguments[s];
                e.R("error", ...r)
            },
            critical: function() {
                for (var n = arguments.length, r = new Array(n), s = 0; s < n; s++) r[s] = arguments[s];
                console.error(t, ...r)
            },
            uninitializedWarning: n => {
                e.error("You must initialize PostHog before calling " + n)
            },
            createLogger: n => zh(t + " " + n)
        };
        return e
    },
    V = zh("[PostHog.js]"),
    He = V.createLogger,
    q0 = He("[ExternalScriptsLoader]"),
    Xc = (t, e, n) => {
        if (t.config.disable_external_dependency_loading) return q0.warn(e + " was requested but loading of external scripts is disabled."), n("Loading of external scripts is disabled");
        var r = U == null ? void 0 : U.querySelectorAll("script");
        if (r) {
            for (var s, i = function() {
                    if (r[o].src === e) {
                        var l = r[o];
                        return l.__posthog_loading_callback_fired ? {
                            v: n()
                        } : (l.addEventListener("load", c => {
                            l.__posthog_loading_callback_fired = !0, n(void 0, c)
                        }), l.onerror = c => n(c), {
                            v: void 0
                        })
                    }
                }, o = 0; o < r.length; o++)
                if (s = i()) return s.v
        }
        var a = () => {
            if (!U) return n("document not found");
            var l = U.createElement("script");
            if (l.type = "text/javascript", l.crossOrigin = "anonymous", l.src = e, l.onload = f => {
                    l.__posthog_loading_callback_fired = !0, n(void 0, f)
                }, l.onerror = f => n(f), t.config.prepare_external_dependency_script && (l = t.config.prepare_external_dependency_script(l)), !l) return n("prepare_external_dependency_script returned null");
            var c, u = U.querySelectorAll("body > script");
            u.length > 0 ? (c = u[0].parentNode) == null || c.insertBefore(l, u[0]) : U.body.appendChild(l)
        };
        U != null && U.body ? a() : U == null || U.addEventListener("DOMContentLoaded", a)
    };
ee.__PosthogExtensions__ = ee.__PosthogExtensions__ || {}, ee.__PosthogExtensions__.loadExternalDependency = (t, e, n) => {
    var r = "/static/" + e + ".js?v=" + t.version;
    if (e === "remote-config" && (r = "/array/" + t.config.token + "/config.js"), e === "toolbar") {
        var s = 3e5;
        r = r + "&t=" + Math.floor(Date.now() / s) * s
    }
    var i = t.requestRouter.endpointFor("assets", r);
    Xc(t, i, n)
}, ee.__PosthogExtensions__.loadSiteApp = (t, e, n) => {
    var r = t.requestRouter.endpointFor("api", e);
    Xc(t, r, n)
};
var li = {};

function _n(t, e, n) {
    if (me(t)) {
        if (qc && t.forEach === qc) t.forEach(e, n);
        else if ("length" in t && t.length === +t.length) {
            for (var r = 0, s = t.length; r < s; r++)
                if (r in t && e.call(n, t[r], r) === li) return
        }
    }
}

function ve(t, e, n) {
    if (!ke(t)) {
        if (me(t)) return _n(t, e, n);
        if (v0(t)) {
            for (var r of t.entries())
                if (e.call(n, r[1], r[0]) === li) return
        } else
            for (var s in t)
                if (qh.call(t, s) && e.call(n, t[s], s) === li) return
    }
}
var Pe = function(t) {
        for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
        return _n(n, function(s) {
            for (var i in s) s[i] !== void 0 && (t[i] = s[i])
        }), t
    },
    Er = function(t) {
        for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
        return _n(n, function(s) {
            _n(s, function(i) {
                t.push(i)
            })
        }), t
    };

function Bs(t) {
    for (var e = Object.keys(t), n = e.length, r = new Array(n); n--;) r[n] = [e[n], t[e[n]]];
    return r
}
var Qc = function(t) {
        try {
            return t()
        } catch {
            return
        }
    },
    W0 = function(t) {
        return function() {
            try {
                for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                return t.apply(this, n)
            } catch (s) {
                V.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), V.critical(s)
            }
        }
    },
    fl = function(t) {
        var e = {};
        return ve(t, function(n, r) {
            (Le(n) && n.length > 0 || Nt(n)) && (e[r] = n)
        }), e
    };

function V0(t, e) {
    return n = t, r = i => Le(i) && !Qt(e) ? i.slice(0, e) : i, s = new Set,
        function i(o, a) {
            return o !== Object(o) ? r ? r(o, a) : o : s.has(o) ? void 0 : (s.add(o), me(o) ? (l = [], _n(o, c => {
                l.push(i(c))
            })) : (l = {}, ve(o, (c, u) => {
                s.has(c) || (l[u] = i(c, u))
            })), l);
            var l
        }(n);
    var n, r, s
}
var K0 = ["herokuapp.com", "vercel.app", "netlify.app"];

function z0(t) {
    var e = t == null ? void 0 : t.hostname;
    if (!Le(e)) return !1;
    var n = e.split(".").slice(-2).join(".");
    for (var r of K0)
        if (n === r) return !1;
    return !0
}

function Gh(t, e) {
    for (var n = 0; n < t.length; n++)
        if (e(t[n])) return t[n]
}

function Oe(t, e, n, r) {
    var {
        capture: s = !1,
        passive: i = !0
    } = r ? ? {};
    t == null || t.addEventListener(e, n, {
        capture: s,
        passive: i
    })
}
var Yh = "$people_distinct_id",
    Dr = "__alias",
    jr = "__timers",
    Zc = "$autocapture_disabled_server_side",
    ua = "$heatmaps_enabled_server_side",
    eu = "$exception_capture_enabled_server_side",
    fa = "$error_tracking_suppression_rules",
    tu = "$error_tracking_capture_extension_exceptions",
    nu = "$web_vitals_enabled_server_side",
    Jh = "$dead_clicks_enabled_server_side",
    ru = "$web_vitals_allowed_metrics",
    ho = "$session_recording_remote_config",
    ci = "$sesid",
    Xh = "$session_is_sampled",
    Xn = "$enabled_feature_flags",
    Hr = "$early_access_features",
    ha = "$feature_flag_details",
    Ur = "$stored_person_properties",
    Rn = "$stored_group_properties",
    da = "$surveys",
    Fs = "$surveys_activated",
    ui = "$flag_call_reported",
    Bt = "$user_state",
    pa = "$client_session_props",
    ga = "$capture_rate_limit",
    _a = "$initial_campaign_params",
    va = "$initial_referrer_info",
    fi = "$initial_person_info",
    hi = "$epp",
    Qh = "__POSTHOG_TOOLBAR__",
    Pr = "$posthog_cookieless",
    G0 = [Yh, Dr, "__cmpns", jr, "$session_recording_enabled_server_side", ua, ci, Xn, fa, Bt, Hr, ha, Rn, Ur, da, ui, pa, ga, _a, va, hi, fi];

function su(t) {
    return t instanceof Element && (t.id === Qh || !(t.closest == null || !t.closest(".toolbar-global-fade-container")))
}

function qi(t) {
    return !!t && t.nodeType === 1
}

function vn(t, e) {
    return !!t && !!t.tagName && t.tagName.toLowerCase() === e.toLowerCase()
}

function Zh(t) {
    return !!t && t.nodeType === 3
}

function ed(t) {
    return !!t && t.nodeType === 11
}

function hl(t) {
    return t ? Ui(t).split(/\s+/) : []
}

function iu(t) {
    var e = C == null ? void 0 : C.location.href;
    return !!(e && t && t.some(n => e.match(n)))
}

function di(t) {
    var e = "";
    switch (typeof t.className) {
        case "string":
            e = t.className;
            break;
        case "object":
            e = (t.className && "baseVal" in t.className ? t.className.baseVal : null) || t.getAttribute("class") || "";
            break;
        default:
            e = ""
    }
    return hl(e)
}

function td(t) {
    return ke(t) ? null : Ui(t).split(/(\s+)/).filter(e => us(e)).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255)
}

function Wi(t) {
    var e = "";
    return ma(t) && !od(t) && t.childNodes && t.childNodes.length && ve(t.childNodes, function(n) {
        var r;
        Zh(n) && n.textContent && (e += (r = td(n.textContent)) !== null && r !== void 0 ? r : "")
    }), Ui(e)
}

function nd(t) {
    return B(t.target) ? t.srcElement || null : (e = t.target) != null && e.shadowRoot ? t.composedPath()[0] || null : t.target || null;
    var e
}
var dl = ["a", "button", "form", "input", "select", "textarea", "label"];

function rd(t, e) {
    if (B(e)) return !0;
    var n, r = function(i) {
        if (e.some(o => i.matches(o))) return {
            v: !0
        }
    };
    for (var s of t)
        if (n = r(s)) return n.v;
    return !1
}

function sd(t) {
    var e = t.parentNode;
    return !(!e || !qi(e)) && e
}
var ou = [".ph-no-rageclick", ".ph-no-capture"],
    pl = t => !t || vn(t, "html") || !qi(t),
    id = (t, e) => {
        if (!C || pl(t)) return {
            parentIsUsefulElement: !1,
            targetElementList: []
        };
        for (var n = !1, r = [t], s = t; s.parentNode && !vn(s, "body");)
            if (ed(s.parentNode)) r.push(s.parentNode.host), s = s.parentNode.host;
            else {
                var i = sd(s);
                if (!i) break;
                if (e || dl.indexOf(i.tagName.toLowerCase()) > -1) n = !0;
                else {
                    var o = C.getComputedStyle(i);
                    o && o.getPropertyValue("cursor") === "pointer" && (n = !0)
                }
                r.push(i), s = i
            }
        return {
            parentIsUsefulElement: n,
            targetElementList: r
        }
    };

function Y0(t, e, n, r, s) {
    var i, o, a, l;
    if (n === void 0 && (n = void 0), !C || pl(t) || (i = n) != null && i.url_allowlist && !iu(n.url_allowlist) || (o = n) != null && o.url_ignorelist && iu(n.url_ignorelist)) return !1;
    if ((a = n) != null && a.dom_event_allowlist) {
        var c = n.dom_event_allowlist;
        if (c && !c.some(_ => e.type === _)) return !1
    }
    var {
        parentIsUsefulElement: u,
        targetElementList: f
    } = id(t, r);
    if (! function(_, y) {
            var E = y == null ? void 0 : y.element_allowlist;
            if (B(E)) return !0;
            var m, g = function(b) {
                if (E.some(S => b.tagName.toLowerCase() === S)) return {
                    v: !0
                }
            };
            for (var x of _)
                if (m = g(x)) return m.v;
            return !1
        }(f, n) || !rd(f, (l = n) == null ? void 0 : l.css_selector_allowlist)) return !1;
    var h = C.getComputedStyle(t);
    if (h && h.getPropertyValue("cursor") === "pointer" && e.type === "click") return !0;
    var d = t.tagName.toLowerCase();
    switch (d) {
        case "html":
            return !1;
        case "form":
            return (s || ["submit"]).indexOf(e.type) >= 0;
        case "input":
        case "select":
        case "textarea":
            return (s || ["change", "click"]).indexOf(e.type) >= 0;
        default:
            return u ? (s || ["click"]).indexOf(e.type) >= 0 : (s || ["click"]).indexOf(e.type) >= 0 && (dl.indexOf(d) > -1 || t.getAttribute("contenteditable") === "true")
    }
}

function ma(t) {
    for (var e = t; e.parentNode && !vn(e, "body"); e = e.parentNode) {
        var n = di(e);
        if (oe(n, "ph-sensitive") || oe(n, "ph-no-capture")) return !1
    }
    if (oe(di(t), "ph-include")) return !0;
    var r = t.type || "";
    if (Le(r)) switch (r.toLowerCase()) {
        case "hidden":
        case "password":
            return !1
    }
    var s = t.name || t.id || "";
    return !(Le(s) && /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(s.replace(/[^a-zA-Z0-9]/g, "")))
}

function od(t) {
    return !!(vn(t, "input") && !["button", "checkbox", "submit", "reset"].includes(t.type) || vn(t, "select") || vn(t, "textarea") || t.getAttribute("contenteditable") === "true")
}
var ad = "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})",
    J0 = new RegExp("^(?:" + ad + ")$"),
    X0 = new RegExp(ad),
    ld = "\\d{3}-?\\d{2}-?\\d{4}",
    Q0 = new RegExp("^(" + ld + ")$"),
    Z0 = new RegExp("(" + ld + ")");

function us(t, e) {
    return e === void 0 && (e = !0), !(ke(t) || Le(t) && (t = Ui(t), (e ? J0 : X0).test((t || "").replace(/[- ]/g, "")) || (e ? Q0 : Z0).test(t)))
}

function cd(t) {
    var e = Wi(t);
    return us(e = (e + " " + ud(t)).trim()) ? e : ""
}

function ud(t) {
    var e = "";
    return t && t.childNodes && t.childNodes.length && ve(t.childNodes, function(n) {
        var r;
        if (n && ((r = n.tagName) == null ? void 0 : r.toLowerCase()) === "span") try {
            var s = Wi(n);
            e = (e + " " + s).trim(), n.childNodes && n.childNodes.length && (e = (e + " " + ud(n)).trim())
        } catch (i) {
            V.error("[AutoCapture]", i)
        }
    }), e
}

function eb(t) {
    return function(e) {
        var n = e.map(r => {
            var s, i, o = "";
            if (r.tag_name && (o += r.tag_name), r.attr_class)
                for (var a of (r.attr_class.sort(), r.attr_class)) o += "." + a.replace(/"/g, "");
            var l = K({}, r.text ? {
                    text: r.text
                } : {}, {
                    "nth-child": (s = r.nth_child) !== null && s !== void 0 ? s : 0,
                    "nth-of-type": (i = r.nth_of_type) !== null && i !== void 0 ? i : 0
                }, r.href ? {
                    href: r.href
                } : {}, r.attr_id ? {
                    attr_id: r.attr_id
                } : {}, r.attributes),
                c = {};
            return Bs(l).sort((u, f) => {
                var [h] = u, [d] = f;
                return h.localeCompare(d)
            }).forEach(u => {
                var [f, h] = u;
                return c[au(f.toString())] = au(h.toString())
            }), o += ":", o += Bs(c).map(u => {
                var [f, h] = u;
                return f + '="' + h + '"'
            }).join("")
        });
        return n.join(";")
    }(function(e) {
        return e.map(n => {
            var r, s, i = {
                text: (r = n.$el_text) == null ? void 0 : r.slice(0, 400),
                tag_name: n.tag_name,
                href: (s = n.attr__href) == null ? void 0 : s.slice(0, 2048),
                attr_class: tb(n),
                attr_id: n.attr__id,
                nth_child: n.nth_child,
                nth_of_type: n.nth_of_type,
                attributes: {}
            };
            return Bs(n).filter(o => {
                var [a] = o;
                return a.indexOf("attr__") === 0
            }).forEach(o => {
                var [a, l] = o;
                return i.attributes[a] = l
            }), i
        })
    }(t))
}

function au(t) {
    return t.replace(/"|\\"/g, '\\"')
}

function tb(t) {
    var e = t.attr__class;
    return e ? me(e) ? e : hl(e) : void 0
}
class fd {
    constructor() {
        this.clicks = []
    }
    isRageClick(e, n, r) {
        var s = this.clicks[this.clicks.length - 1];
        if (s && Math.abs(e - s.x) + Math.abs(n - s.y) < 30 && r - s.timestamp < 1e3) {
            if (this.clicks.push({
                    x: e,
                    y: n,
                    timestamp: r
                }), this.clicks.length === 3) return !0
        } else this.clicks = [{
            x: e,
            y: n,
            timestamp: r
        }];
        return !1
    }
}
var po = "$copy_autocapture",
    Vt = function(t) {
        return t.GZipJS = "gzip-js", t.Base64 = "base64", t
    }({}),
    pi = t => {
        var e = U == null ? void 0 : U.createElement("a");
        return B(e) ? null : (e.href = t, e)
    },
    nb = function(t, e) {
        var n, r;
        e === void 0 && (e = "&");
        var s = [];
        return ve(t, function(i, o) {
            B(i) || B(o) || o === "undefined" || (n = encodeURIComponent((a => a instanceof File)(i) ? i.name : i.toString()), r = encodeURIComponent(o), s[s.length] = r + "=" + n)
        }), s.join(e)
    },
    gi = function(t, e) {
        for (var n, r = ((t.split("#")[0] || "").split(/\?(.*)/)[1] || "").replace(/^\?+/g, "").split("&"), s = 0; s < r.length; s++) {
            var i = r[s].split("=");
            if (i[0] === e) {
                n = i;
                break
            }
        }
        if (!me(n) || n.length < 2) return "";
        var o = n[1];
        try {
            o = decodeURIComponent(o)
        } catch {
            V.error("Skipping decoding for malformed query param: " + o)
        }
        return o.replace(/\+/g, " ")
    },
    bs = function(t, e, n) {
        if (!t || !e || !e.length) return t;
        for (var r = t.split("#"), s = r[0] || "", i = r[1], o = s.split("?"), a = o[1], l = o[0], c = (a || "").split("&"), u = [], f = 0; f < c.length; f++) {
            var h = c[f].split("=");
            me(h) && (e.includes(h[0]) ? u.push(h[0] + "=" + n) : u.push(c[f]))
        }
        var d = l;
        return a != null && (d += "?" + u.join("&")), i != null && (d += "#" + i), d
    },
    _i = function(t, e) {
        var n = t.match(new RegExp(e + "=([^&]*)"));
        return n ? n[1] : null
    },
    lu = He("[AutoCapture]");

function go(t, e) {
    return e.length > t ? e.slice(0, t) + "..." : e
}

function rb(t) {
    if (t.previousElementSibling) return t.previousElementSibling;
    var e = t;
    do e = e.previousSibling; while (e && !qi(e));
    return e
}

function sb(t, e, n, r) {
    var s = t.tagName.toLowerCase(),
        i = {
            tag_name: s
        };
    dl.indexOf(s) > -1 && !n && (s.toLowerCase() === "a" || s.toLowerCase() === "button" ? i.$el_text = go(1024, cd(t)) : i.$el_text = go(1024, Wi(t)));
    var o = di(t);
    o.length > 0 && (i.classes = o.filter(function(u) {
        return u !== ""
    })), ve(t.attributes, function(u) {
        var f;
        if ((!od(t) || ["name", "id", "class", "aria-label"].indexOf(u.name) !== -1) && (r == null || !r.includes(u.name)) && !e && us(u.value) && (f = u.name, !Le(f) || f.substring(0, 10) !== "_ngcontent" && f.substring(0, 7) !== "_nghost")) {
            var h = u.value;
            u.name === "class" && (h = hl(h).join(" ")), i["attr__" + u.name] = go(1024, h)
        }
    });
    for (var a = 1, l = 1, c = t; c = rb(c);) a++, c.tagName === t.tagName && l++;
    return i.nth_child = a, i.nth_of_type = l, i
}

function ib(t, e) {
    for (var n, r, {
            e: s,
            maskAllElementAttributes: i,
            maskAllText: o,
            elementAttributeIgnoreList: a,
            elementsChainAsString: l
        } = e, c = [t], u = t; u.parentNode && !vn(u, "body");) ed(u.parentNode) ? (c.push(u.parentNode.host), u = u.parentNode.host) : (c.push(u.parentNode), u = u.parentNode);
    var f, h = [],
        d = {},
        _ = !1,
        y = !1;
    if (ve(c, b => {
            var S = ma(b);
            b.tagName.toLowerCase() === "a" && (_ = b.getAttribute("href"), _ = S && _ && us(_) && _), oe(di(b), "ph-no-capture") && (y = !0), h.push(sb(b, i, o, a));
            var $ = function(O) {
                if (!ma(O)) return {};
                var k = {};
                return ve(O.attributes, function(H) {
                    if (H.name && H.name.indexOf("data-ph-capture-attribute") === 0) {
                        var D = H.name.replace("data-ph-capture-attribute-", ""),
                            z = H.value;
                        D && z && us(z) && (k[D] = z)
                    }
                }), k
            }(b);
            Pe(d, $)
        }), y) return {
        props: {},
        explicitNoCapture: y
    };
    if (o || (t.tagName.toLowerCase() === "a" || t.tagName.toLowerCase() === "button" ? h[0].$el_text = cd(t) : h[0].$el_text = Wi(t)), _) {
        var E, m;
        h[0].attr__href = _;
        var g = (E = pi(_)) == null ? void 0 : E.host,
            x = C == null || (m = C.location) == null ? void 0 : m.host;
        g && x && g !== x && (f = _)
    }
    return {
        props: Pe({
            $event_type: s.type,
            $ce_version: 1
        }, l ? {} : {
            $elements: h
        }, {
            $elements_chain: eb(h)
        }, (n = h[0]) != null && n.$el_text ? {
            $el_text: (r = h[0]) == null ? void 0 : r.$el_text
        } : {}, f && s.type === "click" ? {
            $external_click_url: f
        } : {}, d)
    }
}
class ob {
    constructor(e) {
        this.C = !1, this.O = null, this.rageclicks = new fd, this.F = !1, this.instance = e, this.M = null
    }
    get A() {
        var e, n, r = ze(this.instance.config.autocapture) ? this.instance.config.autocapture : {};
        return r.url_allowlist = (e = r.url_allowlist) == null ? void 0 : e.map(s => new RegExp(s)), r.url_ignorelist = (n = r.url_ignorelist) == null ? void 0 : n.map(s => new RegExp(s)), r
    }
    j() {
        if (this.isBrowserSupported()) {
            if (C && U) {
                var e = r => {
                    r = r || (C == null ? void 0 : C.event);
                    try {
                        this.D(r)
                    } catch (s) {
                        lu.error("Failed to capture event", s)
                    }
                };
                if (Oe(U, "submit", e, {
                        capture: !0
                    }), Oe(U, "change", e, {
                        capture: !0
                    }), Oe(U, "click", e, {
                        capture: !0
                    }), this.A.capture_copied_text) {
                    var n = r => {
                        r = r || (C == null ? void 0 : C.event), this.D(r, po)
                    };
                    Oe(U, "copy", n, {
                        capture: !0
                    }), Oe(U, "cut", n, {
                        capture: !0
                    })
                }
            }
        } else lu.info("Disabling Automatic Event Collection because this browser is not supported")
    }
    startIfEnabled() {
        this.isEnabled && !this.C && (this.j(), this.C = !0)
    }
    onRemoteConfig(e) {
        e.elementsChainAsString && (this.F = e.elementsChainAsString), this.instance.persistence && this.instance.persistence.register({
            [Zc]: !!e.autocapture_opt_out
        }), this.O = !!e.autocapture_opt_out, this.startIfEnabled()
    }
    setElementSelectors(e) {
        this.M = e
    }
    getElementSelectors(e) {
        var n, r = [];
        return (n = this.M) == null || n.forEach(s => {
            var i = U == null ? void 0 : U.querySelectorAll(s);
            i == null || i.forEach(o => {
                e === o && r.push(s)
            })
        }), r
    }
    get isEnabled() {
        var e, n, r = (e = this.instance.persistence) == null ? void 0 : e.props[Zc],
            s = this.O;
        if (Qt(s) && !gn(r) && !this.instance.L()) return !1;
        var i = (n = this.O) !== null && n !== void 0 ? n : !!r;
        return !!this.instance.config.autocapture && !i
    }
    D(e, n) {
        if (n === void 0 && (n = "$autocapture"), this.isEnabled) {
            var r, s = nd(e);
            Zh(s) && (s = s.parentNode || null), n === "$autocapture" && e.type === "click" && e instanceof MouseEvent && this.instance.config.rageclick && (r = this.rageclicks) != null && r.isRageClick(e.clientX, e.clientY, new Date().getTime()) && function(h, d) {
                if (!C || pl(h)) return !1;
                var _, y;
                if ((_ = gn(d) ? !!d && ou : (y = d == null ? void 0 : d.css_selector_ignorelist) !== null && y !== void 0 ? y : ou) === !1) return !1;
                var {
                    targetElementList: E
                } = id(h, !1);
                return !rd(E, _)
            }(s, this.instance.config.rageclick) && this.D(e, "$rageclick");
            var i = n === po;
            if (s && Y0(s, e, this.A, i, i ? ["copy", "cut"] : void 0)) {
                var {
                    props: o,
                    explicitNoCapture: a
                } = ib(s, {
                    e,
                    maskAllElementAttributes: this.instance.config.mask_all_element_attributes,
                    maskAllText: this.instance.config.mask_all_text,
                    elementAttributeIgnoreList: this.A.element_attribute_ignorelist,
                    elementsChainAsString: this.F
                });
                if (a) return !1;
                var l = this.getElementSelectors(s);
                if (l && l.length > 0 && (o.$element_selectors = l), n === po) {
                    var c, u = td(C == null || (c = C.getSelection()) == null ? void 0 : c.toString()),
                        f = e.type || "clipboard";
                    if (!u) return !1;
                    o.$selected_content = u, o.$copy_type = f
                }
                return this.instance.capture(n, o), !0
            }
        }
    }
    isBrowserSupported() {
        return pn(U == null ? void 0 : U.querySelectorAll)
    }
}
Math.trunc || (Math.trunc = function(t) {
    return t < 0 ? Math.ceil(t) : Math.floor(t)
}), Number.isInteger || (Number.isInteger = function(t) {
    return Nt(t) && isFinite(t) && Math.floor(t) === t
});
var cu = "0123456789abcdef";
class vi {
    constructor(e) {
        if (this.bytes = e, e.length !== 16) throw new TypeError("not 128-bit length")
    }
    static fromFieldsV7(e, n, r, s) {
        if (!Number.isInteger(e) || !Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(s) || e < 0 || n < 0 || r < 0 || s < 0 || e > 0xffffffffffff || n > 4095 || r > 1073741823 || s > 4294967295) throw new RangeError("invalid field value");
        var i = new Uint8Array(16);
        return i[0] = e / Math.pow(2, 40), i[1] = e / Math.pow(2, 32), i[2] = e / Math.pow(2, 24), i[3] = e / Math.pow(2, 16), i[4] = e / Math.pow(2, 8), i[5] = e, i[6] = 112 | n >>> 8, i[7] = n, i[8] = 128 | r >>> 24, i[9] = r >>> 16, i[10] = r >>> 8, i[11] = r, i[12] = s >>> 24, i[13] = s >>> 16, i[14] = s >>> 8, i[15] = s, new vi(i)
    }
    toString() {
        for (var e = "", n = 0; n < this.bytes.length; n++) e = e + cu.charAt(this.bytes[n] >>> 4) + cu.charAt(15 & this.bytes[n]), n !== 3 && n !== 5 && n !== 7 && n !== 9 || (e += "-");
        if (e.length !== 36) throw new Error("Invalid UUIDv7 was generated");
        return e
    }
    clone() {
        return new vi(this.bytes.slice(0))
    }
    equals(e) {
        return this.compareTo(e) === 0
    }
    compareTo(e) {
        for (var n = 0; n < 16; n++) {
            var r = this.bytes[n] - e.bytes[n];
            if (r !== 0) return Math.sign(r)
        }
        return 0
    }
}
class ab {
    constructor() {
        this.N = 0, this.U = 0, this.H = new lb
    }
    generate() {
        var e = this.generateOrAbort();
        if (B(e)) {
            this.N = 0;
            var n = this.generateOrAbort();
            if (B(n)) throw new Error("Could not generate UUID after timestamp reset");
            return n
        }
        return e
    }
    generateOrAbort() {
        var e = Date.now();
        if (e > this.N) this.N = e, this.B();
        else {
            if (!(e + 1e4 > this.N)) return;
            this.U++, this.U > 4398046511103 && (this.N++, this.B())
        }
        return vi.fromFieldsV7(this.N, Math.trunc(this.U / Math.pow(2, 30)), this.U & Math.pow(2, 30) - 1, this.H.nextUint32())
    }
    B() {
        this.U = 1024 * this.H.nextUint32() + (1023 & this.H.nextUint32())
    }
}
var uu, hd = t => {
    if (typeof UUIDV7_DENY_WEAK_RNG < "u" && UUIDV7_DENY_WEAK_RNG) throw new Error("no cryptographically strong RNG available");
    for (var e = 0; e < t.length; e++) t[e] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
    return t
};
C && !B(C.crypto) && crypto.getRandomValues && (hd = t => crypto.getRandomValues(t));
class lb {
    constructor() {
        this.q = new Uint32Array(8), this.W = 1 / 0
    }
    nextUint32() {
        return this.W >= this.q.length && (hd(this.q), this.W = 0), this.q[this.W++]
    }
}
var un = () => cb().toString(),
    cb = () => (uu || (uu = new ab)).generate(),
    Rr = "",
    ub = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;

function fb(t, e) {
    if (e) {
        var n = function(s, i) {
            if (i === void 0 && (i = U), Rr) return Rr;
            if (!i || ["localhost", "127.0.0.1"].includes(s)) return "";
            for (var o = s.split("."), a = Math.min(o.length, 8), l = "dmn_chk_" + un(); !Rr && a--;) {
                var c = o.slice(a).join("."),
                    u = l + "=1;domain=." + c + ";path=/";
                i.cookie = u + ";max-age=3", i.cookie.includes(l) && (i.cookie = u + ";max-age=0", Rr = c)
            }
            return Rr
        }(t);
        if (!n) {
            var r = (s => {
                var i = s.match(ub);
                return i ? i[0] : ""
            })(t);
            r !== n && V.info("Warning: cookie subdomain discovery mismatch", r, n), n = r
        }
        return n ? "; domain=." + n : ""
    }
    return ""
}
var Mt = {
        G: () => !!U,
        V: function(t) {
            V.error("cookieStore error: " + t)
        },
        J: function(t) {
            if (U) {
                try {
                    for (var e = t + "=", n = U.cookie.split(";").filter(i => i.length), r = 0; r < n.length; r++) {
                        for (var s = n[r]; s.charAt(0) == " ";) s = s.substring(1, s.length);
                        if (s.indexOf(e) === 0) return decodeURIComponent(s.substring(e.length, s.length))
                    }
                } catch {}
                return null
            }
        },
        K: function(t) {
            var e;
            try {
                e = JSON.parse(Mt.J(t)) || {}
            } catch {}
            return e
        },
        Y: function(t, e, n, r, s) {
            if (U) try {
                var i = "",
                    o = "",
                    a = fb(U.location.hostname, r);
                if (n) {
                    var l = new Date;
                    l.setTime(l.getTime() + 24 * n * 60 * 60 * 1e3), i = "; expires=" + l.toUTCString()
                }
                s && (o = "; secure");
                var c = t + "=" + encodeURIComponent(JSON.stringify(e)) + i + "; SameSite=Lax; path=/" + a + o;
                return c.length > 3686.4 && V.warn("cookieStore warning: large cookie, len=" + c.length), U.cookie = c, c
            } catch {
                return
            }
        },
        X: function(t, e) {
            if (U != null && U.cookie) try {
                Mt.Y(t, "", -1, e)
            } catch {
                return
            }
        }
    },
    _o = null,
    Se = {
        G: function() {
            if (!Qt(_o)) return _o;
            var t = !0;
            if (B(C)) t = !1;
            else try {
                var e = "__mplssupport__";
                Se.Y(e, "xyz"), Se.J(e) !== '"xyz"' && (t = !1), Se.X(e)
            } catch {
                t = !1
            }
            return t || V.error("localStorage unsupported; falling back to cookie store"), _o = t, t
        },
        V: function(t) {
            V.error("localStorage error: " + t)
        },
        J: function(t) {
            try {
                return C == null ? void 0 : C.localStorage.getItem(t)
            } catch (e) {
                Se.V(e)
            }
            return null
        },
        K: function(t) {
            try {
                return JSON.parse(Se.J(t)) || {}
            } catch {}
            return null
        },
        Y: function(t, e) {
            try {
                C == null || C.localStorage.setItem(t, JSON.stringify(e))
            } catch (n) {
                Se.V(n)
            }
        },
        X: function(t) {
            try {
                C == null || C.localStorage.removeItem(t)
            } catch (e) {
                Se.V(e)
            }
        }
    },
    hb = ["distinct_id", ci, Xh, hi, fi],
    Ms = K({}, Se, {
        K: function(t) {
            try {
                var e = {};
                try {
                    e = Mt.K(t) || {}
                } catch {}
                var n = Pe(e, JSON.parse(Se.J(t) || "{}"));
                return Se.Y(t, n), n
            } catch {}
            return null
        },
        Y: function(t, e, n, r, s, i) {
            try {
                Se.Y(t, e, void 0, void 0, i);
                var o = {};
                hb.forEach(a => {
                    e[a] && (o[a] = e[a])
                }), Object.keys(o).length && Mt.Y(t, o, n, r, s, i)
            } catch (a) {
                Se.V(a)
            }
        },
        X: function(t, e) {
            try {
                C == null || C.localStorage.removeItem(t), Mt.X(t, e)
            } catch (n) {
                Se.V(n)
            }
        }
    }),
    Ls = {},
    db = {
        G: function() {
            return !0
        },
        V: function(t) {
            V.error("memoryStorage error: " + t)
        },
        J: function(t) {
            return Ls[t] || null
        },
        K: function(t) {
            return Ls[t] || null
        },
        Y: function(t, e) {
            Ls[t] = e
        },
        X: function(t) {
            delete Ls[t]
        }
    },
    kn = null,
    Ve = {
        G: function() {
            if (!Qt(kn)) return kn;
            if (kn = !0, B(C)) kn = !1;
            else try {
                var t = "__support__";
                Ve.Y(t, "xyz"), Ve.J(t) !== '"xyz"' && (kn = !1), Ve.X(t)
            } catch {
                kn = !1
            }
            return kn
        },
        V: function(t) {
            V.error("sessionStorage error: ", t)
        },
        J: function(t) {
            try {
                return C == null ? void 0 : C.sessionStorage.getItem(t)
            } catch (e) {
                Ve.V(e)
            }
            return null
        },
        K: function(t) {
            try {
                return JSON.parse(Ve.J(t)) || null
            } catch {}
            return null
        },
        Y: function(t, e) {
            try {
                C == null || C.sessionStorage.setItem(t, JSON.stringify(e))
            } catch (n) {
                Ve.V(n)
            }
        },
        X: function(t) {
            try {
                C == null || C.sessionStorage.removeItem(t)
            } catch (e) {
                Ve.V(e)
            }
        }
    },
    qt = function(t) {
        return t[t.PENDING = -1] = "PENDING", t[t.DENIED = 0] = "DENIED", t[t.GRANTED = 1] = "GRANTED", t
    }({});
class pb {
    constructor(e) {
        this._instance = e
    }
    get A() {
        return this._instance.config
    }
    get consent() {
        return this.Z() ? qt.DENIED : this.tt
    }
    isOptedOut() {
        return this.A.cookieless_mode === "always" || this.consent === qt.DENIED || this.consent === qt.PENDING && (this.A.opt_out_capturing_by_default || this.A.cookieless_mode === "on_reject")
    }
    isOptedIn() {
        return !this.isOptedOut()
    }
    isExplicitlyOptedOut() {
        return this.consent === qt.DENIED
    }
    optInOut(e) {
        this.it.Y(this.et, e ? 1 : 0, this.A.cookie_expiration, this.A.cross_subdomain_cookie, this.A.secure_cookie)
    }
    reset() {
        this.it.X(this.et, this.A.cross_subdomain_cookie)
    }
    get et() {
        var {
            token: e,
            opt_out_capturing_cookie_prefix: n,
            consent_persistence_name: r
        } = this._instance.config;
        return r || (n ? n + e : "__ph_opt_in_out_" + e)
    }
    get tt() {
        var e = this.it.J(this.et);
        return uo(e) ? qt.GRANTED : oe(b0, e) ? qt.DENIED : qt.PENDING
    }
    get it() {
        if (!this.rt) {
            var e = this.A.opt_out_capturing_persistence_type;
            this.rt = e === "localStorage" ? Se : Mt;
            var n = e === "localStorage" ? Mt : Se;
            n.J(this.et) && (this.rt.J(this.et) || this.optInOut(uo(n.J(this.et))), n.X(this.et, this.A.cross_subdomain_cookie))
        }
        return this.rt
    }
    Z() {
        return !!this.A.respect_dnt && !!Gh([ut == null ? void 0 : ut.doNotTrack, ut == null ? void 0 : ut.msDoNotTrack, ee.doNotTrack], e => uo(e))
    }
}
var Ns = He("[Dead Clicks]"),
    gb = () => !0,
    _b = t => {
        var e, n = !((e = t.instance.persistence) == null || !e.get_property(Jh)),
            r = t.instance.config.capture_dead_clicks;
        return gn(r) ? r : n
    };
class dd {
    get lazyLoadedDeadClicksAutocapture() {
        return this.st
    }
    constructor(e, n, r) {
        this.instance = e, this.isEnabled = n, this.onCapture = r, this.startIfEnabled()
    }
    onRemoteConfig(e) {
        this.instance.persistence && this.instance.persistence.register({
            [Jh]: e == null ? void 0 : e.captureDeadClicks
        }), this.startIfEnabled()
    }
    startIfEnabled() {
        this.isEnabled(this) && this.nt(() => {
            this.ot()
        })
    }
    nt(e) {
        var n, r;
        (n = ee.__PosthogExtensions__) != null && n.initDeadClicksAutocapture && e(), (r = ee.__PosthogExtensions__) == null || r.loadExternalDependency == null || r.loadExternalDependency(this.instance, "dead-clicks-autocapture", s => {
            s ? Ns.error("failed to load script", s) : e()
        })
    }
    ot() {
        var e;
        if (U) {
            if (!this.st && (e = ee.__PosthogExtensions__) != null && e.initDeadClicksAutocapture) {
                var n = ze(this.instance.config.capture_dead_clicks) ? this.instance.config.capture_dead_clicks : {};
                n.__onCapture = this.onCapture, this.st = ee.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, n), this.st.start(U), Ns.info("starting...")
            }
        } else Ns.error("`document` not found. Cannot start.")
    }
    stop() {
        this.st && (this.st.stop(), this.st = void 0, Ns.info("stopping..."))
    }
}
var Ar = He("[ExceptionAutocapture]");
class vb {
    constructor(e) {
        var n, r, s;
        this.lt = () => {
            var i;
            if (C && this.isEnabled && (i = ee.__PosthogExtensions__) != null && i.errorWrappingFunctions) {
                var o = ee.__PosthogExtensions__.errorWrappingFunctions.wrapOnError,
                    a = ee.__PosthogExtensions__.errorWrappingFunctions.wrapUnhandledRejection,
                    l = ee.__PosthogExtensions__.errorWrappingFunctions.wrapConsoleError;
                try {
                    !this.ut && this.A.capture_unhandled_errors && (this.ut = o(this.captureException.bind(this))), !this.ht && this.A.capture_unhandled_rejections && (this.ht = a(this.captureException.bind(this))), !this.dt && this.A.capture_console_errors && (this.dt = l(this.captureException.bind(this)))
                } catch (c) {
                    Ar.error("failed to start", c), this.vt()
                }
            }
        }, this._instance = e, this.ct = !((n = this._instance.persistence) == null || !n.props[eu]), this.A = this.ft(), this.gt = new w0({
            refillRate: (r = this._instance.config.error_tracking.__exceptionRateLimiterRefillRate) !== null && r !== void 0 ? r : 1,
            bucketSize: (s = this._instance.config.error_tracking.__exceptionRateLimiterBucketSize) !== null && s !== void 0 ? s : 10,
            refillInterval: 1e4,
            P: Ar
        }), this.startIfEnabled()
    }
    ft() {
        var e = this._instance.config.capture_exceptions,
            n = {
                capture_unhandled_errors: !1,
                capture_unhandled_rejections: !1,
                capture_console_errors: !1
            };
        return ze(e) ? n = K({}, n, e) : (B(e) ? this.ct : e) && (n = K({}, n, {
            capture_unhandled_errors: !0,
            capture_unhandled_rejections: !0
        })), n
    }
    get isEnabled() {
        return this.A.capture_console_errors || this.A.capture_unhandled_errors || this.A.capture_unhandled_rejections
    }
    startIfEnabled() {
        this.isEnabled && (Ar.info("enabled"), this.nt(this.lt))
    }
    nt(e) {
        var n, r;
        (n = ee.__PosthogExtensions__) != null && n.errorWrappingFunctions && e(), (r = ee.__PosthogExtensions__) == null || r.loadExternalDependency == null || r.loadExternalDependency(this._instance, "exception-autocapture", s => {
            if (s) return Ar.error("failed to load script", s);
            e()
        })
    }
    vt() {
        var e, n, r;
        (e = this.ut) == null || e.call(this), this.ut = void 0, (n = this.ht) == null || n.call(this), this.ht = void 0, (r = this.dt) == null || r.call(this), this.dt = void 0
    }
    onRemoteConfig(e) {
        var n = e.autocaptureExceptions;
        this.ct = !!n || !1, this.A = this.ft(), this._instance.persistence && this._instance.persistence.register({
            [eu]: this.ct
        }), this.startIfEnabled()
    }
    captureException(e) {
        var n, r, s = (n = e == null || (r = e.$exception_list) == null || (r = r[0]) == null ? void 0 : r.type) !== null && n !== void 0 ? n : "Exception";
        this.gt.consumeRateLimit(s) ? Ar.info("Skipping exception capture because of client rate limiting.", {
            exception: s
        }) : this._instance.exceptions.sendExceptionEvent(e)
    }
}

function fu(t, e, n) {
    try {
        if (!(e in t)) return () => {};
        var r = t[e],
            s = n(r);
        return pn(s) && (s.prototype = s.prototype || {}, Object.defineProperties(s, {
            __posthog_wrapped__: {
                enumerable: !1,
                value: !0
            }
        })), t[e] = s, () => {
            t[e] = r
        }
    } catch {
        return () => {}
    }
}
class mb {
    constructor(e) {
        var n;
        this._instance = e, this._t = (C == null || (n = C.location) == null ? void 0 : n.pathname) || ""
    }
    get isEnabled() {
        return this._instance.config.capture_pageview === "history_change"
    }
    startIfEnabled() {
        this.isEnabled && (V.info("History API monitoring enabled, starting..."), this.monitorHistoryChanges())
    }
    stop() {
        this.yt && this.yt(), this.yt = void 0, V.info("History API monitoring stopped")
    }
    monitorHistoryChanges() {
        var e, n;
        if (C && C.history) {
            var r = this;
            (e = C.history.pushState) != null && e.__posthog_wrapped__ || fu(C.history, "pushState", s => function(i, o, a) {
                s.call(this, i, o, a), r.bt("pushState")
            }), (n = C.history.replaceState) != null && n.__posthog_wrapped__ || fu(C.history, "replaceState", s => function(i, o, a) {
                s.call(this, i, o, a), r.bt("replaceState")
            }), this.wt()
        }
    }
    bt(e) {
        try {
            var n, r = C == null || (n = C.location) == null ? void 0 : n.pathname;
            if (!r) return;
            r !== this._t && this.isEnabled && this._instance.capture("$pageview", {
                navigation_type: e
            }), this._t = r
        } catch (s) {
            V.error("Error capturing " + e + " pageview", s)
        }
    }
    wt() {
        if (!this.yt) {
            var e = () => {
                this.bt("popstate")
            };
            Oe(C, "popstate", e), this.yt = () => {
                C && C.removeEventListener("popstate", e)
            }
        }
    }
}
var vo = He("[SegmentIntegration]");

function yb(t, e) {
    var n = t.config.segment;
    if (!n) return e();
    (function(r, s) {
        var i = r.config.segment;
        if (!i) return s();
        var o = l => {
                var c = () => l.anonymousId() || un();
                r.config.get_device_id = c, l.id() && (r.register({
                    distinct_id: l.id(),
                    $device_id: c()
                }), r.persistence.set_property(Bt, "identified")), s()
            },
            a = i.user();
        "then" in a && pn(a.then) ? a.then(l => o(l)) : o(a)
    })(t, () => {
        n.register((r => {
            Promise && Promise.resolve || vo.warn("This browser does not have Promise support, and can not use the segment integration");
            var s = (i, o) => {
                if (!o) return i;
                i.event.userId || i.event.anonymousId === r.get_distinct_id() || (vo.info("No userId set, resetting PostHog"), r.reset()), i.event.userId && i.event.userId !== r.get_distinct_id() && (vo.info("UserId set, identifying with PostHog"), r.identify(i.event.userId));
                var a = r.calculateEventProperties(o, i.event.properties);
                return i.event.properties = Object.assign({}, a, i.event.properties), i
            };
            return {
                name: "PostHog JS",
                type: "enrichment",
                version: "1.0.0",
                isLoaded: () => !0,
                load: () => Promise.resolve(),
                track: i => s(i, i.event.event),
                page: i => s(i, "$pageview"),
                identify: i => s(i, "$identify"),
                screen: i => s(i, "$screen")
            }
        })(t)).then(() => {
            e()
        })
    })
}
var pd = "posthog-js";

function gd(t, e) {
    var {
        organization: n,
        projectId: r,
        prefix: s,
        severityAllowList: i = ["error"],
        sendExceptionsToPostHog: o = !0
    } = e === void 0 ? {} : e;
    return a => {
        var l, c, u, f, h;
        if (!(i === "*" || i.includes(a.level)) || !t.__loaded) return a;
        a.tags || (a.tags = {});
        var d = t.requestRouter.endpointFor("ui", "/project/" + t.config.token + "/person/" + t.get_distinct_id());
        a.tags["PostHog Person URL"] = d, t.sessionRecordingStarted() && (a.tags["PostHog Recording URL"] = t.get_session_replay_url({
            withTimestamp: !0
        }));
        var _ = ((l = a.exception) == null ? void 0 : l.values) || [],
            y = _.map(m => K({}, m, {
                stacktrace: m.stacktrace ? K({}, m.stacktrace, {
                    type: "raw",
                    frames: (m.stacktrace.frames || []).map(g => K({}, g, {
                        platform: "web:javascript"
                    }))
                }) : void 0
            })),
            E = {
                $exception_message: ((c = _[0]) == null ? void 0 : c.value) || a.message,
                $exception_type: (u = _[0]) == null ? void 0 : u.type,
                $exception_level: a.level,
                $exception_list: y,
                $sentry_event_id: a.event_id,
                $sentry_exception: a.exception,
                $sentry_exception_message: ((f = _[0]) == null ? void 0 : f.value) || a.message,
                $sentry_exception_type: (h = _[0]) == null ? void 0 : h.type,
                $sentry_tags: a.tags
            };
        return n && r && (E.$sentry_url = (s || "https://sentry.io/organizations/") + n + "/issues/?project=" + r + "&query=" + a.event_id), o && t.exceptions.sendExceptionEvent(E), a
    }
}
class bb {
    constructor(e, n, r, s, i, o) {
        this.name = pd, this.setupOnce = function(a) {
            a(gd(e, {
                organization: n,
                projectId: r,
                prefix: s,
                severityAllowList: i,
                sendExceptionsToPostHog: o == null || o
            }))
        }
    }
}
var wb = C != null && C.location ? _i(C.location.hash, "__posthog") || _i(location.hash, "state") : null,
    hu = "_postHogToolbarParams",
    du = He("[Toolbar]"),
    an = function(t) {
        return t[t.UNINITIALIZED = 0] = "UNINITIALIZED", t[t.LOADING = 1] = "LOADING", t[t.LOADED = 2] = "LOADED", t
    }(an || {});
class Eb {
    constructor(e) {
        this.instance = e
    }
    xt(e) {
        ee.ph_toolbar_state = e
    }
    St() {
        var e;
        return (e = ee.ph_toolbar_state) !== null && e !== void 0 ? e : an.UNINITIALIZED
    }
    maybeLoadToolbar(e, n, r) {
        if (e === void 0 && (e = void 0), n === void 0 && (n = void 0), r === void 0 && (r = void 0), !C || !U) return !1;
        e = e ? ? C.location, r = r ? ? C.history;
        try {
            if (!n) {
                try {
                    C.localStorage.setItem("test", "test"), C.localStorage.removeItem("test")
                } catch {
                    return !1
                }
                n = C == null ? void 0 : C.localStorage
            }
            var s, i = wb || _i(e.hash, "__posthog") || _i(e.hash, "state"),
                o = i ? Qc(() => JSON.parse(atob(decodeURIComponent(i)))) || Qc(() => JSON.parse(decodeURIComponent(i))) : null;
            return o && o.action === "ph_authorize" ? ((s = o).source = "url", s && Object.keys(s).length > 0 && (o.desiredHash ? e.hash = o.desiredHash : r ? r.replaceState(r.state, "", e.pathname + e.search) : e.hash = "")) : ((s = JSON.parse(n.getItem(hu) || "{}")).source = "localstorage", delete s.userIntent), !(!s.token || this.instance.config.token !== s.token) && (this.loadToolbar(s), !0)
        } catch {
            return !1
        }
    }
    Et(e) {
        var n = ee.ph_load_toolbar || ee.ph_load_editor;
        !ke(n) && pn(n) ? n(e, this.instance) : du.warn("No toolbar load function found")
    }
    loadToolbar(e) {
        var n = !(U == null || !U.getElementById(Qh));
        if (!C || n) return !1;
        var r = this.instance.requestRouter.region === "custom" && this.instance.config.advanced_disable_toolbar_metrics,
            s = K({
                token: this.instance.config.token
            }, e, {
                apiURL: this.instance.requestRouter.endpointFor("ui")
            }, r ? {
                instrument: !1
            } : {});
        if (C.localStorage.setItem(hu, JSON.stringify(K({}, s, {
                source: void 0
            }))), this.St() === an.LOADED) this.Et(s);
        else if (this.St() === an.UNINITIALIZED) {
            var i;
            this.xt(an.LOADING), (i = ee.__PosthogExtensions__) == null || i.loadExternalDependency == null || i.loadExternalDependency(this.instance, "toolbar", o => {
                if (o) return du.error("[Toolbar] Failed to load", o), void this.xt(an.UNINITIALIZED);
                this.xt(an.LOADED), this.Et(s)
            }), Oe(C, "turbolinks:load", () => {
                this.xt(an.UNINITIALIZED), this.loadToolbar(s)
            })
        }
        return !0
    }
    $t(e) {
        return this.loadToolbar(e)
    }
    maybeLoadEditor(e, n, r) {
        return e === void 0 && (e = void 0), n === void 0 && (n = void 0), r === void 0 && (r = void 0), this.maybeLoadToolbar(e, n, r)
    }
}
var xb = He("[TracingHeaders]");
class kb {
    constructor(e) {
        this.kt = void 0, this.Pt = void 0, this.lt = () => {
            var n, r;
            B(this.kt) && ((n = ee.__PosthogExtensions__) == null || (n = n.tracingHeadersPatchFns) == null || n._patchXHR(this._instance.config.__add_tracing_headers || [], this._instance.get_distinct_id(), this._instance.sessionManager)), B(this.Pt) && ((r = ee.__PosthogExtensions__) == null || (r = r.tracingHeadersPatchFns) == null || r._patchFetch(this._instance.config.__add_tracing_headers || [], this._instance.get_distinct_id(), this._instance.sessionManager))
        }, this._instance = e
    }
    nt(e) {
        var n, r;
        (n = ee.__PosthogExtensions__) != null && n.tracingHeadersPatchFns && e(), (r = ee.__PosthogExtensions__) == null || r.loadExternalDependency == null || r.loadExternalDependency(this._instance, "tracing-headers", s => {
            if (s) return xb.error("failed to load script", s);
            e()
        })
    }
    startIfEnabledOrStop() {
        var e, n;
        this._instance.config.__add_tracing_headers ? this.nt(this.lt) : ((e = this.kt) == null || e.call(this), (n = this.Pt) == null || n.call(this), this.kt = void 0, this.Pt = void 0)
    }
}
var vt = "Mobile",
    mi = "iOS",
    Ft = "Android",
    fs = "Tablet",
    _d = Ft + " " + fs,
    vd = "iPad",
    md = "Apple",
    yd = md + " Watch",
    hs = "Safari",
    pr = "BlackBerry",
    bd = "Samsung",
    wd = bd + "Browser",
    Ed = bd + " Internet",
    jn = "Chrome",
    Cb = jn + " OS",
    xd = jn + " " + mi,
    gl = "Internet Explorer",
    kd = gl + " " + vt,
    _l = "Opera",
    Sb = _l + " Mini",
    vl = "Edge",
    Cd = "Microsoft " + vl,
    ir = "Firefox",
    Sd = ir + " " + mi,
    ds = "Nintendo",
    ps = "PlayStation",
    or = "Xbox",
    Td = Ft + " " + vt,
    Pd = vt + " " + hs,
    Br = "Windows",
    ya = Br + " Phone",
    pu = "Nokia",
    ba = "Ouya",
    Rd = "Generic",
    Tb = Rd + " " + vt.toLowerCase(),
    Ad = Rd + " " + fs.toLowerCase(),
    wa = "Konqueror",
    Xe = "(\\d+(\\.\\d+)?)",
    mo = new RegExp("Version/" + Xe),
    Pb = new RegExp(or, "i"),
    Rb = new RegExp(ps + " \\w+", "i"),
    Ab = new RegExp(ds + " \\w+", "i"),
    ml = new RegExp(pr + "|PlayBook|BB10", "i"),
    $b = {
        "NT3.51": "NT 3.11",
        "NT4.0": "NT 4.0",
        "5.0": "2000",
        5.1: "XP",
        5.2: "XP",
        "6.0": "Vista",
        6.1: "7",
        6.2: "8",
        6.3: "8.1",
        6.4: "10",
        "10.0": "10"
    },
    Ib = (t, e) => e && oe(e, md) || function(n) {
        return oe(n, hs) && !oe(n, jn) && !oe(n, Ft)
    }(t),
    $d = function(t, e) {
        return e = e || "", oe(t, " OPR/") && oe(t, "Mini") ? Sb : oe(t, " OPR/") ? _l : ml.test(t) ? pr : oe(t, "IE" + vt) || oe(t, "WPDesktop") ? kd : oe(t, wd) ? Ed : oe(t, vl) || oe(t, "Edg/") ? Cd : oe(t, "FBIOS") ? "Facebook " + vt : oe(t, "UCWEB") || oe(t, "UCBrowser") ? "UC Browser" : oe(t, "CriOS") ? xd : oe(t, "CrMo") || oe(t, jn) ? jn : oe(t, Ft) && oe(t, hs) ? Td : oe(t, "FxiOS") ? Sd : oe(t.toLowerCase(), wa.toLowerCase()) ? wa : Ib(t, e) ? oe(t, vt) ? Pd : hs : oe(t, ir) ? ir : oe(t, "MSIE") || oe(t, "Trident/") ? gl : oe(t, "Gecko") ? ir : ""
    },
    Ob = {
        [kd]: [new RegExp("rv:" + Xe)],
        [Cd]: [new RegExp(vl + "?\\/" + Xe)],
        [jn]: [new RegExp("(" + jn + "|CrMo)\\/" + Xe)],
        [xd]: [new RegExp("CriOS\\/" + Xe)],
        "UC Browser": [new RegExp("(UCBrowser|UCWEB)\\/" + Xe)],
        [hs]: [mo],
        [Pd]: [mo],
        [_l]: [new RegExp("(Opera|OPR)\\/" + Xe)],
        [ir]: [new RegExp(ir + "\\/" + Xe)],
        [Sd]: [new RegExp("FxiOS\\/" + Xe)],
        [wa]: [new RegExp("Konqueror[:/]?" + Xe, "i")],
        [pr]: [new RegExp(pr + " " + Xe), mo],
        [Td]: [new RegExp("android\\s" + Xe, "i")],
        [Ed]: [new RegExp(wd + "\\/" + Xe)],
        [gl]: [new RegExp("(rv:|MSIE )" + Xe)],
        Mozilla: [new RegExp("rv:" + Xe)]
    },
    Fb = function(t, e) {
        var n = $d(t, e),
            r = Ob[n];
        if (B(r)) return null;
        for (var s = 0; s < r.length; s++) {
            var i = r[s],
                o = t.match(i);
            if (o) return parseFloat(o[o.length - 2])
        }
        return null
    },
    gu = [
        [new RegExp(or + "; " + or + " (.*?)[);]", "i"), t => [or, t && t[1] || ""]],
        [new RegExp(ds, "i"), [ds, ""]],
        [new RegExp(ps, "i"), [ps, ""]],
        [ml, [pr, ""]],
        [new RegExp(Br, "i"), (t, e) => {
            if (/Phone/.test(e) || /WPDesktop/.test(e)) return [ya, ""];
            if (new RegExp(vt).test(e) && !/IEMobile\b/.test(e)) return [Br + " " + vt, ""];
            var n = /Windows NT ([0-9.]+)/i.exec(e);
            if (n && n[1]) {
                var r = n[1],
                    s = $b[r] || "";
                return /arm/i.test(e) && (s = "RT"), [Br, s]
            }
            return [Br, ""]
        }],
        [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, t => {
            if (t && t[3]) {
                var e = [t[3], t[4], t[5] || "0"];
                return [mi, e.join(".")]
            }
            return [mi, ""]
        }],
        [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, t => {
            var e = "";
            return t && t.length >= 3 && (e = B(t[2]) ? t[3] : t[2]), ["watchOS", e]
        }],
        [new RegExp("(" + Ft + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + Ft + ")", "i"), t => {
            if (t && t[2]) {
                var e = [t[2], t[3], t[4] || "0"];
                return [Ft, e.join(".")]
            }
            return [Ft, ""]
        }],
        [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, t => {
            var e = ["Mac OS X", ""];
            if (t && t[1]) {
                var n = [t[1], t[2], t[3] || "0"];
                e[1] = n.join(".")
            }
            return e
        }],
        [/Mac/i, ["Mac OS X", ""]],
        [/CrOS/, [Cb, ""]],
        [/Linux|debian/i, ["Linux", ""]]
    ],
    _u = function(t) {
        return Ab.test(t) ? ds : Rb.test(t) ? ps : Pb.test(t) ? or : new RegExp(ba, "i").test(t) ? ba : new RegExp("(" + ya + "|WPDesktop)", "i").test(t) ? ya : /iPad/.test(t) ? vd : /iPod/.test(t) ? "iPod Touch" : /iPhone/.test(t) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(t) ? yd : ml.test(t) ? pr : /(kobo)\s(ereader|touch)/i.test(t) ? "Kobo" : new RegExp(pu, "i").test(t) ? pu : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(t) || /(kf[a-z]+)( bui|\)).+silk\//i.test(t) ? "Kindle Fire" : /(Android|ZTE)/i.test(t) ? !new RegExp(vt).test(t) || /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(t) ? /pixel[\daxl ]{1,6}/i.test(t) && !/pixel c/i.test(t) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(t) || /lmy47v/i.test(t) && !/QTAQZ3/i.test(t) ? Ft : _d : Ft : new RegExp("(pda|" + vt + ")", "i").test(t) ? Tb : new RegExp(fs, "i").test(t) && !new RegExp(fs + " pc", "i").test(t) ? Ad : ""
    },
    Ds = "https?://(.*)",
    xr = ["gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "epik", "qclid", "sccid", "irclid", "_kx"],
    Mb = Er(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid"], xr),
    ws = "<masked>",
    Lb = ["li_fat_id"];

function Id(t, e, n) {
    if (!U) return {};
    var r, s = e ? Er([], xr, n || []) : [],
        i = Od(bs(U.URL, s, ws), t),
        o = (r = {}, ve(Lb, function(a) {
            var l = Mt.J(a);
            r[a] = l || null
        }), r);
    return Pe(o, i)
}

function Od(t, e) {
    var n = Mb.concat(e || []),
        r = {};
    return ve(n, function(s) {
        var i = gi(t, s);
        r[s] = i || null
    }), r
}

function Fd(t) {
    var e = function(i) {
            return i ? i.search(Ds + "google.([^/?]*)") === 0 ? "google" : i.search(Ds + "bing.com") === 0 ? "bing" : i.search(Ds + "yahoo.com") === 0 ? "yahoo" : i.search(Ds + "duckduckgo.com") === 0 ? "duckduckgo" : null : null
        }(t),
        n = e != "yahoo" ? "q" : "p",
        r = {};
    if (!Qt(e)) {
        r.$search_engine = e;
        var s = U ? gi(U.referrer, n) : "";
        s.length && (r.ph_keyword = s)
    }
    return r
}

function vu() {
    return navigator.language || navigator.userLanguage
}

function Md() {
    return (U == null ? void 0 : U.referrer) || "$direct"
}

function Ld(t, e) {
    var n = t ? Er([], xr, e || []) : [],
        r = it == null ? void 0 : it.href.substring(0, 1e3);
    return {
        r: Md().substring(0, 1e3),
        u: r ? bs(r, n, ws) : void 0
    }
}

function Nd(t) {
    var e, {
            r: n,
            u: r
        } = t,
        s = {
            $referrer: n,
            $referring_domain: n == null ? void 0 : n == "$direct" ? "$direct" : (e = pi(n)) == null ? void 0 : e.host
        };
    if (r) {
        s.$current_url = r;
        var i = pi(r);
        s.$host = i == null ? void 0 : i.host, s.$pathname = i == null ? void 0 : i.pathname;
        var o = Od(r);
        Pe(s, o)
    }
    if (n) {
        var a = Fd(n);
        Pe(s, a)
    }
    return s
}

function Dd() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch {
        return
    }
}

function Nb() {
    try {
        return new Date().getTimezoneOffset()
    } catch {
        return
    }
}

function Db(t, e) {
    if (!st) return {};
    var n, r, s, i = t ? Er([], xr, e || []) : [],
        [o, a] = function(l) {
            for (var c = 0; c < gu.length; c++) {
                var [u, f] = gu[c], h = u.exec(l), d = h && (pn(f) ? f(h, l) : f);
                if (d) return d
            }
            return ["", ""]
        }(st);
    return Pe(fl({
        $os: o,
        $os_version: a,
        $browser: $d(st, navigator.vendor),
        $device: _u(st),
        $device_type: (r = st, s = _u(r), s === vd || s === _d || s === "Kobo" || s === "Kindle Fire" || s === Ad ? fs : s === ds || s === or || s === ps || s === ba ? "Console" : s === yd ? "Wearable" : s ? vt : "Desktop"),
        $timezone: Dd(),
        $timezone_offset: Nb()
    }), {
        $current_url: bs(it == null ? void 0 : it.href, i, ws),
        $host: it == null ? void 0 : it.host,
        $pathname: it == null ? void 0 : it.pathname,
        $raw_user_agent: st.length > 1e3 ? st.substring(0, 997) + "..." : st,
        $browser_version: Fb(st, navigator.vendor),
        $browser_language: vu(),
        $browser_language_prefix: (n = vu(), typeof n == "string" ? n.split("-")[0] : void 0),
        $screen_height: C == null ? void 0 : C.screen.height,
        $screen_width: C == null ? void 0 : C.screen.width,
        $viewport_height: C == null ? void 0 : C.innerHeight,
        $viewport_width: C == null ? void 0 : C.innerWidth,
        $lib: "web",
        $lib_version: Ut.LIB_VERSION,
        $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
        $time: Date.now() / 1e3
    })
}
var sn = He("[Web Vitals]"),
    mu = 9e5;
class jb {
    constructor(e) {
        var n;
        this.Tt = !1, this.C = !1, this.q = {
            url: void 0,
            metrics: [],
            firstMetricTimestamp: void 0
        }, this.It = () => {
            clearTimeout(this.Rt), this.q.metrics.length !== 0 && (this._instance.capture("$web_vitals", this.q.metrics.reduce((r, s) => K({}, r, {
                ["$web_vitals_" + s.name + "_event"]: K({}, s),
                ["$web_vitals_" + s.name + "_value"]: s.value
            }), {})), this.q = {
                url: void 0,
                metrics: [],
                firstMetricTimestamp: void 0
            })
        }, this.Ct = r => {
            var s, i = (s = this._instance.sessionManager) == null ? void 0 : s.checkAndGetSessionAndWindowId(!0);
            if (B(i)) sn.error("Could not read session ID. Dropping metrics!");
            else {
                this.q = this.q || {
                    url: void 0,
                    metrics: [],
                    firstMetricTimestamp: void 0
                };
                var o = this.Ot();
                B(o) || (ke(r == null ? void 0 : r.name) || ke(r == null ? void 0 : r.value) ? sn.error("Invalid metric received", r) : this.Ft && r.value >= this.Ft ? sn.error("Ignoring metric with value >= " + this.Ft, r) : (this.q.url !== o && (this.It(), this.Rt = setTimeout(this.It, this.flushToCaptureTimeoutMs)), B(this.q.url) && (this.q.url = o), this.q.firstMetricTimestamp = B(this.q.firstMetricTimestamp) ? Date.now() : this.q.firstMetricTimestamp, r.attribution && r.attribution.interactionTargetElement && (r.attribution.interactionTargetElement = void 0), this.q.metrics.push(K({}, r, {
                    $current_url: o,
                    $session_id: i.sessionId,
                    $window_id: i.windowId,
                    timestamp: Date.now()
                })), this.q.metrics.length === this.allowedMetrics.length && this.It()))
            }
        }, this.lt = () => {
            var r, s, i, o, a = ee.__PosthogExtensions__;
            B(a) || B(a.postHogWebVitalsCallbacks) || ({
                onLCP: r,
                onCLS: s,
                onFCP: i,
                onINP: o
            } = a.postHogWebVitalsCallbacks), r && s && i && o ? (this.allowedMetrics.indexOf("LCP") > -1 && r(this.Ct.bind(this)), this.allowedMetrics.indexOf("CLS") > -1 && s(this.Ct.bind(this)), this.allowedMetrics.indexOf("FCP") > -1 && i(this.Ct.bind(this)), this.allowedMetrics.indexOf("INP") > -1 && o(this.Ct.bind(this)), this.C = !0) : sn.error("web vitals callbacks not loaded - not starting")
        }, this._instance = e, this.Tt = !((n = this._instance.persistence) == null || !n.props[nu]), this.startIfEnabled()
    }
    get allowedMetrics() {
        var e, n, r = ze(this._instance.config.capture_performance) ? (e = this._instance.config.capture_performance) == null ? void 0 : e.web_vitals_allowed_metrics : void 0;
        return B(r) ? ((n = this._instance.persistence) == null ? void 0 : n.props[ru]) || ["CLS", "FCP", "INP", "LCP"] : r
    }
    get flushToCaptureTimeoutMs() {
        return (ze(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals_delayed_flush_ms : void 0) || 5e3
    }
    get Ft() {
        var e = ze(this._instance.config.capture_performance) && Nt(this._instance.config.capture_performance.__web_vitals_max_value) ? this._instance.config.capture_performance.__web_vitals_max_value : mu;
        return 0 < e && e <= 6e4 ? mu : e
    }
    get isEnabled() {
        var e = it == null ? void 0 : it.protocol;
        if (e !== "http:" && e !== "https:") return sn.info("Web Vitals are disabled on non-http/https protocols"), !1;
        var n = ze(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals : gn(this._instance.config.capture_performance) ? this._instance.config.capture_performance : void 0;
        return gn(n) ? n : this.Tt
    }
    startIfEnabled() {
        this.isEnabled && !this.C && (sn.info("enabled, starting..."), this.nt(this.lt))
    }
    onRemoteConfig(e) {
        var n = ze(e.capturePerformance) && !!e.capturePerformance.web_vitals,
            r = ze(e.capturePerformance) ? e.capturePerformance.web_vitals_allowed_metrics : void 0;
        this._instance.persistence && (this._instance.persistence.register({
            [nu]: n
        }), this._instance.persistence.register({
            [ru]: r
        })), this.Tt = n, this.startIfEnabled()
    }
    nt(e) {
        var n, r;
        (n = ee.__PosthogExtensions__) != null && n.postHogWebVitalsCallbacks && e(), (r = ee.__PosthogExtensions__) == null || r.loadExternalDependency == null || r.loadExternalDependency(this._instance, "web-vitals", s => {
            s ? sn.error("failed to load script", s) : e()
        })
    }
    Ot() {
        var e = C ? C.location.href : void 0;
        if (e) {
            var n = this._instance.config.mask_personal_data_properties,
                r = this._instance.config.custom_personal_data_properties,
                s = n ? Er([], xr, r || []) : [];
            return bs(e, s, ws)
        }
        sn.error("Could not determine current URL")
    }
}
var Hb = He("[Heatmaps]");

function yu(t) {
    return ze(t) && "clientX" in t && "clientY" in t && Nt(t.clientX) && Nt(t.clientY)
}
class Ub {
    constructor(e) {
        var n;
        this.rageclicks = new fd, this.Tt = !1, this.C = !1, this.Mt = null, this.instance = e, this.Tt = !((n = this.instance.persistence) == null || !n.props[ua])
    }
    get flushIntervalMilliseconds() {
        var e = 5e3;
        return ze(this.instance.config.capture_heatmaps) && this.instance.config.capture_heatmaps.flush_interval_milliseconds && (e = this.instance.config.capture_heatmaps.flush_interval_milliseconds), e
    }
    get isEnabled() {
        return B(this.instance.config.capture_heatmaps) ? B(this.instance.config.enable_heatmaps) ? this.Tt : this.instance.config.enable_heatmaps : this.instance.config.capture_heatmaps !== !1
    }
    startIfEnabled() {
        if (this.isEnabled) {
            if (this.C) return;
            Hb.info("starting..."), this.At(), this.jt()
        } else {
            var e;
            clearInterval((e = this.Mt) !== null && e !== void 0 ? e : void 0), this.Dt(), this.getAndClearBuffer()
        }
    }
    onRemoteConfig(e) {
        var n = !!e.heatmaps;
        this.instance.persistence && this.instance.persistence.register({
            [ua]: n
        }), this.Tt = n, this.startIfEnabled()
    }
    getAndClearBuffer() {
        var e = this.q;
        return this.q = void 0, e
    }
    Lt(e) {
        this.Nt(e.originalEvent, "deadclick")
    }
    jt() {
        this.Mt && clearInterval(this.Mt), this.Mt = function(e) {
            return (e == null ? void 0 : e.visibilityState) === "visible"
        }(U) ? setInterval(this.Ut.bind(this), this.flushIntervalMilliseconds) : null
    }
    At() {
        C && U && (this.zt = this.Ut.bind(this), Oe(C, "beforeunload", this.zt), this.Ht = e => this.Nt(e || (C == null ? void 0 : C.event)), Oe(U, "click", this.Ht, {
            capture: !0
        }), this.Bt = e => this.qt(e || (C == null ? void 0 : C.event)), Oe(U, "mousemove", this.Bt, {
            capture: !0
        }), this.Wt = new dd(this.instance, gb, this.Lt.bind(this)), this.Wt.startIfEnabled(), this.Gt = this.jt.bind(this), Oe(U, "visibilitychange", this.Gt), this.C = !0)
    }
    Dt() {
        var e;
        C && U && (this.zt && C.removeEventListener("beforeunload", this.zt), this.Ht && U.removeEventListener("click", this.Ht, {
            capture: !0
        }), this.Bt && U.removeEventListener("mousemove", this.Bt, {
            capture: !0
        }), this.Gt && U.removeEventListener("visibilitychange", this.Gt), clearTimeout(this.Vt), (e = this.Wt) == null || e.stop(), this.C = !1)
    }
    Jt(e, n) {
        var r = this.instance.scrollManager.scrollY(),
            s = this.instance.scrollManager.scrollX(),
            i = this.instance.scrollManager.scrollElement(),
            o = function(a, l, c) {
                for (var u = a; u && qi(u) && !vn(u, "body");) {
                    if (u === c) return !1;
                    if (oe(l, C == null ? void 0 : C.getComputedStyle(u).position)) return !0;
                    u = sd(u)
                }
                return !1
            }(nd(e), ["fixed", "sticky"], i);
        return {
            x: e.clientX + (o ? 0 : s),
            y: e.clientY + (o ? 0 : r),
            target_fixed: o,
            type: n
        }
    }
    Nt(e, n) {
        var r;
        if (n === void 0 && (n = "click"), !su(e.target) && yu(e)) {
            var s = this.Jt(e, n);
            (r = this.rageclicks) != null && r.isRageClick(e.clientX, e.clientY, new Date().getTime()) && this.Kt(K({}, s, {
                type: "rageclick"
            })), this.Kt(s)
        }
    }
    qt(e) {
        !su(e.target) && yu(e) && (clearTimeout(this.Vt), this.Vt = setTimeout(() => {
            this.Kt(this.Jt(e, "mousemove"))
        }, 500))
    }
    Kt(e) {
        if (C) {
            var n = C.location.href,
                r = this.instance.config.mask_personal_data_properties,
                s = this.instance.config.custom_personal_data_properties,
                i = r ? Er([], xr, s || []) : [],
                o = bs(n, i, ws);
            this.q = this.q || {}, this.q[o] || (this.q[o] = []), this.q[o].push(e)
        }
    }
    Ut() {
        this.q && !Jn(this.q) && this.instance.capture("$$heatmap", {
            $heatmap_data: this.getAndClearBuffer()
        })
    }
}
class Bb {
    constructor(e) {
        this._instance = e
    }
    doPageView(e, n) {
        var r, s = this.Yt(e, n);
        return this.Xt = {
            pathname: (r = C == null ? void 0 : C.location.pathname) !== null && r !== void 0 ? r : "",
            pageViewId: n,
            timestamp: e
        }, this._instance.scrollManager.resetContext(), s
    }
    doPageLeave(e) {
        var n;
        return this.Yt(e, (n = this.Xt) == null ? void 0 : n.pageViewId)
    }
    doEvent() {
        var e;
        return {
            $pageview_id: (e = this.Xt) == null ? void 0 : e.pageViewId
        }
    }
    Yt(e, n) {
        var r = this.Xt;
        if (!r) return {
            $pageview_id: n
        };
        var s = {
                $pageview_id: n,
                $prev_pageview_id: r.pageViewId
            },
            i = this._instance.scrollManager.getContext();
        if (i && !this._instance.config.disable_scroll_properties) {
            var {
                maxScrollHeight: o,
                lastScrollY: a,
                maxScrollY: l,
                maxContentHeight: c,
                lastContentY: u,
                maxContentY: f
            } = i;
            if (!(B(o) || B(a) || B(l) || B(c) || B(u) || B(f))) {
                o = Math.ceil(o), a = Math.ceil(a), l = Math.ceil(l), c = Math.ceil(c), u = Math.ceil(u), f = Math.ceil(f);
                var h = o <= 1 ? 1 : Ot(a / o, 0, 1, V),
                    d = o <= 1 ? 1 : Ot(l / o, 0, 1, V),
                    _ = c <= 1 ? 1 : Ot(u / c, 0, 1, V),
                    y = c <= 1 ? 1 : Ot(f / c, 0, 1, V);
                s = Pe(s, {
                    $prev_pageview_last_scroll: a,
                    $prev_pageview_last_scroll_percentage: h,
                    $prev_pageview_max_scroll: l,
                    $prev_pageview_max_scroll_percentage: d,
                    $prev_pageview_last_content: u,
                    $prev_pageview_last_content_percentage: _,
                    $prev_pageview_max_content: f,
                    $prev_pageview_max_content_percentage: y
                })
            }
        }
        return r.pathname && (s.$prev_pageview_pathname = r.pathname), r.timestamp && (s.$prev_pageview_duration = (e.getTime() - r.timestamp.getTime()) / 1e3), s
    }
}
var mt = Uint8Array,
    Ze = Uint16Array,
    gr = Uint32Array,
    yl = new mt([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
    bl = new mt([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
    bu = new mt([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    jd = function(t, e) {
        for (var n = new Ze(31), r = 0; r < 31; ++r) n[r] = e += 1 << t[r - 1];
        var s = new gr(n[30]);
        for (r = 1; r < 30; ++r)
            for (var i = n[r]; i < n[r + 1]; ++i) s[i] = i - n[r] << 5 | r;
        return [n, s]
    },
    Hd = jd(yl, 2),
    qb = Hd[0],
    Ea = Hd[1];
qb[28] = 258, Ea[258] = 28;
for (var wu = jd(bl, 0)[1], xa = new Ze(32768), Ee = 0; Ee < 32768; ++Ee) {
    var Cn = (43690 & Ee) >>> 1 | (21845 & Ee) << 1;
    Cn = (61680 & (Cn = (52428 & Cn) >>> 2 | (13107 & Cn) << 2)) >>> 4 | (3855 & Cn) << 4, xa[Ee] = ((65280 & Cn) >>> 8 | (255 & Cn) << 8) >>> 1
}
var es = function(t, e, n) {
        for (var r = t.length, s = 0, i = new Ze(e); s < r; ++s) ++i[t[s] - 1];
        var o, a = new Ze(e);
        for (s = 0; s < e; ++s) a[s] = a[s - 1] + i[s - 1] << 1;
        if (n) {
            o = new Ze(1 << e);
            var l = 15 - e;
            for (s = 0; s < r; ++s)
                if (t[s])
                    for (var c = s << 4 | t[s], u = e - t[s], f = a[t[s] - 1]++ << u, h = f | (1 << u) - 1; f <= h; ++f) o[xa[f] >>> l] = c
        } else
            for (o = new Ze(r), s = 0; s < r; ++s) o[s] = xa[a[t[s] - 1]++] >>> 15 - t[s];
        return o
    },
    Hn = new mt(288);
for (Ee = 0; Ee < 144; ++Ee) Hn[Ee] = 8;
for (Ee = 144; Ee < 256; ++Ee) Hn[Ee] = 9;
for (Ee = 256; Ee < 280; ++Ee) Hn[Ee] = 7;
for (Ee = 280; Ee < 288; ++Ee) Hn[Ee] = 8;
var yi = new mt(32);
for (Ee = 0; Ee < 32; ++Ee) yi[Ee] = 5;
var Wb = es(Hn, 9, 0),
    Vb = es(yi, 5, 0),
    Ud = function(t) {
        return (t / 8 >> 0) + (7 & t && 1)
    },
    Bd = function(t, e, n) {
        (n == null || n > t.length) && (n = t.length);
        var r = new(t instanceof Ze ? Ze : t instanceof gr ? gr : mt)(n - e);
        return r.set(t.subarray(e, n)), r
    },
    jt = function(t, e, n) {
        n <<= 7 & e;
        var r = e / 8 >> 0;
        t[r] |= n, t[r + 1] |= n >>> 8
    },
    $r = function(t, e, n) {
        n <<= 7 & e;
        var r = e / 8 >> 0;
        t[r] |= n, t[r + 1] |= n >>> 8, t[r + 2] |= n >>> 16
    },
    yo = function(t, e) {
        for (var n = [], r = 0; r < t.length; ++r) t[r] && n.push({
            s: r,
            f: t[r]
        });
        var s = n.length,
            i = n.slice();
        if (!s) return [new mt(0), 0];
        if (s == 1) {
            var o = new mt(n[0].s + 1);
            return o[n[0].s] = 1, [o, 1]
        }
        n.sort(function(S, $) {
            return S.f - $.f
        }), n.push({
            s: -1,
            f: 25001
        });
        var a = n[0],
            l = n[1],
            c = 0,
            u = 1,
            f = 2;
        for (n[0] = {
                s: -1,
                f: a.f + l.f,
                l: a,
                r: l
            }; u != s - 1;) a = n[n[c].f < n[f].f ? c++ : f++], l = n[c != u && n[c].f < n[f].f ? c++ : f++], n[u++] = {
            s: -1,
            f: a.f + l.f,
            l: a,
            r: l
        };
        var h = i[0].s;
        for (r = 1; r < s; ++r) i[r].s > h && (h = i[r].s);
        var d = new Ze(h + 1),
            _ = ka(n[u - 1], d, 0);
        if (_ > e) {
            r = 0;
            var y = 0,
                E = _ - e,
                m = 1 << E;
            for (i.sort(function(S, $) {
                    return d[$.s] - d[S.s] || S.f - $.f
                }); r < s; ++r) {
                var g = i[r].s;
                if (!(d[g] > e)) break;
                y += m - (1 << _ - d[g]), d[g] = e
            }
            for (y >>>= E; y > 0;) {
                var x = i[r].s;
                d[x] < e ? y -= 1 << e - d[x]++ - 1 : ++r
            }
            for (; r >= 0 && y; --r) {
                var b = i[r].s;
                d[b] == e && (--d[b], ++y)
            }
            _ = e
        }
        return [new mt(d), _]
    },
    ka = function(t, e, n) {
        return t.s == -1 ? Math.max(ka(t.l, e, n + 1), ka(t.r, e, n + 1)) : e[t.s] = n
    },
    Eu = function(t) {
        for (var e = t.length; e && !t[--e];);
        for (var n = new Ze(++e), r = 0, s = t[0], i = 1, o = function(l) {
                n[r++] = l
            }, a = 1; a <= e; ++a)
            if (t[a] == s && a != e) ++i;
            else {
                if (!s && i > 2) {
                    for (; i > 138; i -= 138) o(32754);
                    i > 2 && (o(i > 10 ? i - 11 << 5 | 28690 : i - 3 << 5 | 12305), i = 0)
                } else if (i > 3) {
                    for (o(s), --i; i > 6; i -= 6) o(8304);
                    i > 2 && (o(i - 3 << 5 | 8208), i = 0)
                }
                for (; i--;) o(s);
                i = 1, s = t[a]
            }
        return [n.subarray(0, r), e]
    },
    Ir = function(t, e) {
        for (var n = 0, r = 0; r < e.length; ++r) n += t[r] * e[r];
        return n
    },
    Ca = function(t, e, n) {
        var r = n.length,
            s = Ud(e + 2);
        t[s] = 255 & r, t[s + 1] = r >>> 8, t[s + 2] = 255 ^ t[s], t[s + 3] = 255 ^ t[s + 1];
        for (var i = 0; i < r; ++i) t[s + i + 4] = n[i];
        return 8 * (s + 4 + r)
    },
    xu = function(t, e, n, r, s, i, o, a, l, c, u) {
        jt(e, u++, n), ++s[256];
        for (var f = yo(s, 15), h = f[0], d = f[1], _ = yo(i, 15), y = _[0], E = _[1], m = Eu(h), g = m[0], x = m[1], b = Eu(y), S = b[0], $ = b[1], O = new Ze(19), k = 0; k < g.length; ++k) O[31 & g[k]]++;
        for (k = 0; k < S.length; ++k) O[31 & S[k]]++;
        for (var H = yo(O, 7), D = H[0], z = H[1], M = 19; M > 4 && !D[bu[M - 1]]; --M);
        var J, j, fe, re, se = c + 5 << 3,
            ie = Ir(s, Hn) + Ir(i, yi) + o,
            Re = Ir(s, h) + Ir(i, y) + o + 14 + 3 * M + Ir(O, D) + (2 * O[16] + 3 * O[17] + 7 * O[18]);
        if (se <= ie && se <= Re) return Ca(e, u, t.subarray(l, l + c));
        if (jt(e, u, 1 + (Re < ie)), u += 2, Re < ie) {
            J = es(h, d, 0), j = h, fe = es(y, E, 0), re = y;
            var Ue = es(D, z, 0);
            for (jt(e, u, x - 257), jt(e, u + 5, $ - 1), jt(e, u + 10, M - 4), u += 14, k = 0; k < M; ++k) jt(e, u + 3 * k, D[bu[k]]);
            u += 3 * M;
            for (var Be = [g, S], he = 0; he < 2; ++he) {
                var Me = Be[he];
                for (k = 0; k < Me.length; ++k) {
                    var Ae = 31 & Me[k];
                    jt(e, u, Ue[Ae]), u += D[Ae], Ae > 15 && (jt(e, u, Me[k] >>> 5 & 127), u += Me[k] >>> 12)
                }
            }
        } else J = Wb, j = Hn, fe = Vb, re = yi;
        for (k = 0; k < a; ++k)
            if (r[k] > 255) {
                Ae = r[k] >>> 18 & 31, $r(e, u, J[Ae + 257]), u += j[Ae + 257], Ae > 7 && (jt(e, u, r[k] >>> 23 & 31), u += yl[Ae]);
                var yt = 31 & r[k];
                $r(e, u, fe[yt]), u += re[yt], yt > 3 && ($r(e, u, r[k] >>> 5 & 8191), u += bl[yt])
            } else $r(e, u, J[r[k]]), u += j[r[k]];
        return $r(e, u, J[256]), u + j[256]
    },
    Kb = new gr([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]),
    zb = function() {
        for (var t = new gr(256), e = 0; e < 256; ++e) {
            for (var n = e, r = 9; --r;) n = (1 & n && 3988292384) ^ n >>> 1;
            t[e] = n
        }
        return t
    }(),
    Gb = function(t, e, n, r, s) {
        return function(i, o, a, l, c, u) {
            var f = i.length,
                h = new mt(l + f + 5 * (1 + Math.floor(f / 7e3)) + c),
                d = h.subarray(l, h.length - c),
                _ = 0;
            if (!o || f < 8)
                for (var y = 0; y <= f; y += 65535) {
                    var E = y + 65535;
                    E < f ? _ = Ca(d, _, i.subarray(y, E)) : (d[y] = u, _ = Ca(d, _, i.subarray(y, f)))
                } else {
                    for (var m = Kb[o - 1], g = m >>> 13, x = 8191 & m, b = (1 << a) - 1, S = new Ze(32768), $ = new Ze(b + 1), O = Math.ceil(a / 3), k = 2 * O, H = function(A) {
                            return (i[A] ^ i[A + 1] << O ^ i[A + 2] << k) & b
                        }, D = new gr(25e3), z = new Ze(288), M = new Ze(32), J = 0, j = 0, fe = (y = 0, 0), re = 0, se = 0; y < f; ++y) {
                        var ie = H(y),
                            Re = 32767 & y,
                            Ue = $[ie];
                        if (S[Re] = Ue, $[ie] = Re, re <= y) {
                            var Be = f - y;
                            if ((J > 7e3 || fe > 24576) && Be > 423) {
                                _ = xu(i, d, 0, D, z, M, j, fe, se, y - se, _), fe = J = j = 0, se = y;
                                for (var he = 0; he < 286; ++he) z[he] = 0;
                                for (he = 0; he < 30; ++he) M[he] = 0
                            }
                            var Me = 2,
                                Ae = 0,
                                yt = x,
                                be = Re - Ue & 32767;
                            if (Be > 2 && ie == H(y - be))
                                for (var P = Math.min(g, Be) - 1, W = Math.min(32767, y), L = Math.min(258, Be); be <= W && --yt && Re != Ue;) {
                                    if (i[y + Me] == i[y + Me - be]) {
                                        for (var G = 0; G < L && i[y + G] == i[y + G - be]; ++G);
                                        if (G > Me) {
                                            if (Me = G, Ae = be, G > P) break;
                                            var ue = Math.min(be, G - 2),
                                                p = 0;
                                            for (he = 0; he < ue; ++he) {
                                                var v = y - be + he + 32768 & 32767,
                                                    w = v - S[v] + 32768 & 32767;
                                                w > p && (p = w, Ue = v)
                                            }
                                        }
                                    }
                                    be += (Re = Ue) - (Ue = S[Re]) + 32768 & 32767
                                }
                            if (Ae) {
                                D[fe++] = 268435456 | Ea[Me] << 18 | wu[Ae];
                                var T = 31 & Ea[Me],
                                    R = 31 & wu[Ae];
                                j += yl[T] + bl[R], ++z[257 + T], ++M[R], re = y + Me, ++J
                            } else D[fe++] = i[y], ++z[i[y]]
                        }
                    }
                    _ = xu(i, d, u, D, z, M, j, fe, se, y - se, _)
                }
            return Bd(h, 0, l + Ud(_) + c)
        }(t, e.level == null ? 6 : e.level, e.mem == null ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(t.length)))) : 12 + e.mem, n, r, !0)
    },
    bo = function(t, e, n) {
        for (; n; ++e) t[e] = n, n >>>= 8
    };

function Yb(t, e) {
    e === void 0 && (e = {});
    var n = function() {
            var a = 4294967295;
            return {
                p: function(l) {
                    for (var c = a, u = 0; u < l.length; ++u) c = zb[255 & c ^ l[u]] ^ c >>> 8;
                    a = c
                },
                d: function() {
                    return 4294967295 ^ a
                }
            }
        }(),
        r = t.length;
    n.p(t);
    var s, i = Gb(t, e, 10 + ((s = e).filename && s.filename.length + 1 || 0), 8),
        o = i.length;
    return function(a, l) {
        var c = l.filename;
        if (a[0] = 31, a[1] = 139, a[2] = 8, a[8] = l.level < 2 ? 4 : l.level == 9 ? 2 : 0, a[9] = 3, l.mtime != 0 && bo(a, 4, Math.floor(new Date(l.mtime || Date.now()) / 1e3)), c) {
            a[3] = 8;
            for (var u = 0; u <= c.length; ++u) a[u + 10] = c.charCodeAt(u)
        }
    }(i, e), bo(i, o - 8, n.d()), bo(i, o - 4, r), i
}
var Jb = function(t) {
        var e, n, r, s, i = "";
        for (e = n = 0, r = (t = (t + "").replace(/\r\n/g, `
`).replace(/\r/g, `
`)).length, s = 0; s < r; s++) {
            var o = t.charCodeAt(s),
                a = null;
            o < 128 ? n++ : a = o > 127 && o < 2048 ? String.fromCharCode(o >> 6 | 192, 63 & o | 128) : String.fromCharCode(o >> 12 | 224, o >> 6 & 63 | 128, 63 & o | 128), Qt(a) || (n > e && (i += t.substring(e, n)), i += a, e = n = s + 1)
        }
        return n > e && (i += t.substring(e, t.length)), i
    },
    Xb = !!ia || !!sa,
    ku = "text/plain",
    bi = (t, e) => {
        var [n, r] = t.split("?"), s = K({}, e);
        r == null || r.split("&").forEach(o => {
            var [a] = o.split("=");
            delete s[a]
        });
        var i = nb(s);
        return n + "?" + (i = i ? (r ? r + "&" : "") + i : r)
    },
    qr = (t, e) => JSON.stringify(t, (n, r) => typeof r == "bigint" ? r.toString() : r, e),
    wo = t => {
        var {
            data: e,
            compression: n
        } = t;
        if (e) {
            if (n === Vt.GZipJS) {
                var r = Yb(function(l, c) {
                        var u = l.length;
                        if (typeof TextEncoder < "u") return new TextEncoder().encode(l);
                        for (var f = new mt(l.length + (l.length >>> 1)), h = 0, d = function(m) {
                                f[h++] = m
                            }, _ = 0; _ < u; ++_) {
                            if (h + 5 > f.length) {
                                var y = new mt(h + 8 + (u - _ << 1));
                                y.set(f), f = y
                            }
                            var E = l.charCodeAt(_);
                            E < 128 || c ? d(E) : E < 2048 ? (d(192 | E >>> 6), d(128 | 63 & E)) : E > 55295 && E < 57344 ? (d(240 | (E = 65536 + (1047552 & E) | 1023 & l.charCodeAt(++_)) >>> 18), d(128 | E >>> 12 & 63), d(128 | E >>> 6 & 63), d(128 | 63 & E)) : (d(224 | E >>> 12), d(128 | E >>> 6 & 63), d(128 | 63 & E))
                        }
                        return Bd(f, 0, h)
                    }(qr(e)), {
                        mtime: 0
                    }),
                    s = new Blob([r], {
                        type: ku
                    });
                return {
                    contentType: ku,
                    body: s,
                    estimatedSize: s.size
                }
            }
            if (n === Vt.Base64) {
                var i = function(l) {
                        var c, u, f, h, d, _ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                            y = 0,
                            E = 0,
                            m = "",
                            g = [];
                        if (!l) return l;
                        l = Jb(l);
                        do c = (d = l.charCodeAt(y++) << 16 | l.charCodeAt(y++) << 8 | l.charCodeAt(y++)) >> 18 & 63, u = d >> 12 & 63, f = d >> 6 & 63, h = 63 & d, g[E++] = _.charAt(c) + _.charAt(u) + _.charAt(f) + _.charAt(h); while (y < l.length);
                        switch (m = g.join(""), l.length % 3) {
                            case 1:
                                m = m.slice(0, -2) + "==";
                                break;
                            case 2:
                                m = m.slice(0, -1) + "="
                        }
                        return m
                    }(qr(e)),
                    o = (l => "data=" + encodeURIComponent(typeof l == "string" ? l : qr(l)))(i);
                return {
                    contentType: "application/x-www-form-urlencoded",
                    body: o,
                    estimatedSize: new Blob([o]).size
                }
            }
            var a = qr(e);
            return {
                contentType: "application/json",
                body: a,
                estimatedSize: new Blob([a]).size
            }
        }
    },
    qs = [];
sa && qs.push({
    transport: "fetch",
    method: t => {
        var e, n, {
                contentType: r,
                body: s,
                estimatedSize: i
            } = (e = wo(t)) !== null && e !== void 0 ? e : {},
            o = new Headers;
        ve(t.headers, function(u, f) {
            o.append(f, u)
        }), r && o.append("Content-Type", r);
        var a = t.url,
            l = null;
        if (Vc) {
            var c = new Vc;
            l = {
                signal: c.signal,
                timeout: setTimeout(() => c.abort(), t.timeout)
            }
        }
        sa(a, K({
            method: (t == null ? void 0 : t.method) || "GET",
            headers: o,
            keepalive: t.method === "POST" && (i || 0) < 52428.8,
            body: s,
            signal: (n = l) == null ? void 0 : n.signal
        }, t.fetchOptions)).then(u => u.text().then(f => {
            var h = {
                statusCode: u.status,
                text: f
            };
            if (u.status === 200) try {
                h.json = JSON.parse(f)
            } catch (d) {
                V.error(d)
            }
            t.callback == null || t.callback(h)
        })).catch(u => {
            V.error(u), t.callback == null || t.callback({
                statusCode: 0,
                text: u
            })
        }).finally(() => l ? clearTimeout(l.timeout) : null)
    }
}), ia && qs.push({
    transport: "XHR",
    method: t => {
        var e, n = new ia;
        n.open(t.method || "GET", t.url, !0);
        var {
            contentType: r,
            body: s
        } = (e = wo(t)) !== null && e !== void 0 ? e : {};
        ve(t.headers, function(i, o) {
            n.setRequestHeader(o, i)
        }), r && n.setRequestHeader("Content-Type", r), t.timeout && (n.timeout = t.timeout), t.disableXHRCredentials || (n.withCredentials = !0), n.onreadystatechange = () => {
            if (n.readyState === 4) {
                var i = {
                    statusCode: n.status,
                    text: n.responseText
                };
                if (n.status === 200) try {
                    i.json = JSON.parse(n.responseText)
                } catch {}
                t.callback == null || t.callback(i)
            }
        }, n.send(s)
    }
}), ut != null && ut.sendBeacon && qs.push({
    transport: "sendBeacon",
    method: t => {
        var e = bi(t.url, {
            beacon: "1"
        });
        try {
            var n, {
                    contentType: r,
                    body: s
                } = (n = wo(t)) !== null && n !== void 0 ? n : {},
                i = typeof s == "string" ? new Blob([s], {
                    type: r
                }) : s;
            ut.sendBeacon(e, i)
        } catch {}
    }
});
var _r = function(t, e) {
    if (! function(n) {
            try {
                new RegExp(n)
            } catch {
                return !1
            }
            return !0
        }(e)) return !1;
    try {
        return new RegExp(e).test(t)
    } catch {
        return !1
    }
};

function Cu(t, e, n) {
    return qr({
        distinct_id: t,
        userPropertiesToSet: e,
        userPropertiesToSetOnce: n
    })
}
var qd = {
        exact: (t, e) => e.some(n => t.some(r => n === r)),
        is_not: (t, e) => e.every(n => t.every(r => n !== r)),
        regex: (t, e) => e.some(n => t.some(r => _r(n, r))),
        not_regex: (t, e) => e.every(n => t.every(r => !_r(n, r))),
        icontains: (t, e) => e.map(js).some(n => t.map(js).some(r => n.includes(r))),
        not_icontains: (t, e) => e.map(js).every(n => t.map(js).every(r => !n.includes(r)))
    },
    js = t => t.toLowerCase(),
    Su = He("[Error tracking]");
class Qb {
    constructor(e) {
        var n, r;
        this.Qt = [], this.Zt = new I0([new O0, new B0, new M0, new F0, new H0, new j0, new N0, new U0], [T0, A0]), this._instance = e, this.Qt = (n = (r = this._instance.persistence) == null ? void 0 : r.get_property(fa)) !== null && n !== void 0 ? n : []
    }
    onRemoteConfig(e) {
        var n, r, s, i = (n = (r = e.errorTracking) == null ? void 0 : r.suppressionRules) !== null && n !== void 0 ? n : [],
            o = (s = e.errorTracking) == null ? void 0 : s.captureExtensionExceptions;
        this.Qt = i, this._instance.persistence && this._instance.persistence.register({
            [fa]: this.Qt,
            [tu]: o
        })
    }
    get ti() {
        var e, n = !!this._instance.get_property(tu),
            r = this._instance.config.error_tracking.captureExtensionExceptions;
        return (e = r ? ? n) !== null && e !== void 0 && e
    }
    buildProperties(e, n) {
        return this.Zt.buildFromUnknown(e, {
            syntheticException: n == null ? void 0 : n.syntheticException,
            mechanism: {
                handled: n == null ? void 0 : n.handled
            }
        })
    }
    sendExceptionEvent(e) {
        if (this.ii(e)) Su.info("Skipping exception capture because a suppression rule matched");
        else {
            if (this.ti || !this.ei(e)) return this._instance.capture("$exception", e, {
                _noTruncate: !0,
                _batchKey: "exceptionEvent"
            });
            Su.info("Skipping exception capture because it was thrown by an extension")
        }
    }
    ii(e) {
        var n = e.$exception_list;
        if (!n || !me(n) || n.length === 0) return !1;
        var r = n.reduce((s, i) => {
            var {
                type: o,
                value: a
            } = i;
            return Le(o) && o.length > 0 && s.$exception_types.push(o), Le(a) && a.length > 0 && s.$exception_values.push(a), s
        }, {
            $exception_types: [],
            $exception_values: []
        });
        return this.Qt.some(s => {
            var i = s.values.map(o => {
                var a, l = qd[o.operator],
                    c = me(o.value) ? o.value : [o.value],
                    u = (a = r[o.key]) !== null && a !== void 0 ? a : [];
                return c.length > 0 && l(c, u)
            });
            return s.type === "OR" ? i.some(Boolean) : i.every(Boolean)
        })
    }
    ei(e) {
        var n = e.$exception_list;
        return !(!n || !me(n)) && n.flatMap(r => {
            var s, i;
            return (s = (i = r.stacktrace) == null ? void 0 : i.frames) !== null && s !== void 0 ? s : []
        }).some(r => r.filename && r.filename.startsWith("chrome-extension://"))
    }
}
var wt = He("[FeatureFlags]"),
    Eo = "$active_feature_flags",
    Kn = "$override_feature_flags",
    Tu = "$feature_flag_payloads",
    Or = "$override_feature_flag_payloads",
    Pu = "$feature_flag_request_id",
    Ru = t => {
        var e = {};
        for (var [n, r] of Bs(t || {})) r && (e[n] = r);
        return e
    },
    Zb = t => {
        var e = t.flags;
        return e ? (t.featureFlags = Object.fromEntries(Object.keys(e).map(n => {
            var r;
            return [n, (r = e[n].variant) !== null && r !== void 0 ? r : e[n].enabled]
        })), t.featureFlagPayloads = Object.fromEntries(Object.keys(e).filter(n => e[n].enabled).filter(n => {
            var r;
            return (r = e[n].metadata) == null ? void 0 : r.payload
        }).map(n => {
            var r;
            return [n, (r = e[n].metadata) == null ? void 0 : r.payload]
        }))) : wt.warn("Using an older version of the feature flags endpoint. Please upgrade your PostHog server to the latest version"), t
    },
    ew = function(t) {
        return t.FeatureFlags = "feature_flags", t.Recordings = "recordings", t
    }({});
class tw {
    constructor(e) {
        this.ri = !1, this.si = !1, this.ni = !1, this.oi = !1, this.ai = !1, this.li = !1, this.ui = !1, this._instance = e, this.featureFlagEventHandlers = []
    }
    hi() {
        var e = this._instance.config.evaluation_environments;
        return e != null && e.length ? e.filter(n => {
            var r = n && typeof n == "string" && n.trim().length > 0;
            return r || wt.error("Invalid evaluation environment found:", n, "Expected non-empty string"), r
        }) : []
    }
    di() {
        return this.hi().length > 0
    }
    flags() {
        if (this._instance.config.__preview_remote_config) this.li = !0;
        else {
            var e = !this.vi && (this._instance.config.advanced_disable_feature_flags || this._instance.config.advanced_disable_feature_flags_on_first_load);
            this.ci({
                disableFlags: e
            })
        }
    }
    get hasLoadedFlags() {
        return this.si
    }
    getFlags() {
        return Object.keys(this.getFlagVariants())
    }
    getFlagsWithDetails() {
        var e = this._instance.get_property(ha),
            n = this._instance.get_property(Kn),
            r = this._instance.get_property(Or);
        if (!r && !n) return e || {};
        var s = Pe({}, e || {}),
            i = [...new Set([...Object.keys(r || {}), ...Object.keys(n || {})])];
        for (var o of i) {
            var a, l, c = s[o],
                u = n == null ? void 0 : n[o],
                f = B(u) ? (a = c == null ? void 0 : c.enabled) !== null && a !== void 0 && a : !!u,
                h = B(u) ? c.variant : typeof u == "string" ? u : void 0,
                d = r == null ? void 0 : r[o],
                _ = K({}, c, {
                    enabled: f,
                    variant: f ? h ? ? (c == null ? void 0 : c.variant) : void 0
                });
            f !== (c == null ? void 0 : c.enabled) && (_.original_enabled = c == null ? void 0 : c.enabled), h !== (c == null ? void 0 : c.variant) && (_.original_variant = c == null ? void 0 : c.variant), d && (_.metadata = K({}, c == null ? void 0 : c.metadata, {
                payload: d,
                original_payload: c == null || (l = c.metadata) == null ? void 0 : l.payload
            })), s[o] = _
        }
        return this.ri || (wt.warn(" Overriding feature flag details!", {
            flagDetails: e,
            overriddenPayloads: r,
            finalDetails: s
        }), this.ri = !0), s
    }
    getFlagVariants() {
        var e = this._instance.get_property(Xn),
            n = this._instance.get_property(Kn);
        if (!n) return e || {};
        for (var r = Pe({}, e), s = Object.keys(n), i = 0; i < s.length; i++) r[s[i]] = n[s[i]];
        return this.ri || (wt.warn(" Overriding feature flags!", {
            enabledFlags: e,
            overriddenFlags: n,
            finalFlags: r
        }), this.ri = !0), r
    }
    getFlagPayloads() {
        var e = this._instance.get_property(Tu),
            n = this._instance.get_property(Or);
        if (!n) return e || {};
        for (var r = Pe({}, e || {}), s = Object.keys(n), i = 0; i < s.length; i++) r[s[i]] = n[s[i]];
        return this.ri || (wt.warn(" Overriding feature flag payloads!", {
            flagPayloads: e,
            overriddenPayloads: n,
            finalPayloads: r
        }), this.ri = !0), r
    }
    reloadFeatureFlags() {
        this.oi || this._instance.config.advanced_disable_feature_flags || this.vi || (this.vi = setTimeout(() => {
            this.ci()
        }, 5))
    }
    fi() {
        clearTimeout(this.vi), this.vi = void 0
    }
    ensureFlagsLoaded() {
        this.si || this.ni || this.vi || this.reloadFeatureFlags()
    }
    setAnonymousDistinctId(e) {
        this.$anon_distinct_id = e
    }
    setReloadingPaused(e) {
        this.oi = e
    }
    ci(e) {
        var n;
        if (this.fi(), !this._instance.L())
            if (this.ni) this.ai = !0;
            else {
                var r = {
                    token: this._instance.config.token,
                    distinct_id: this._instance.get_distinct_id(),
                    groups: this._instance.getGroups(),
                    $anon_distinct_id: this.$anon_distinct_id,
                    person_properties: K({}, ((n = this._instance.persistence) == null ? void 0 : n.get_initial_props()) || {}, this._instance.get_property(Ur) || {}),
                    group_properties: this._instance.get_property(Rn)
                };
                (e != null && e.disableFlags || this._instance.config.advanced_disable_feature_flags) && (r.disable_flags = !0), this.di() && (r.evaluation_environments = this.hi());
                var s = this._instance.config.__preview_remote_config,
                    i = s ? "/flags/?v=2" : "/flags/?v=2&config=true",
                    o = this._instance.config.advanced_only_evaluate_survey_feature_flags ? "&only_evaluate_survey_feature_flags=true" : "",
                    a = this._instance.requestRouter.endpointFor("api", i + o);
                s && (r.timezone = Dd()), this.ni = !0, this._instance.pi({
                    method: "POST",
                    url: a,
                    data: r,
                    compression: this._instance.config.disable_compression ? void 0 : Vt.Base64,
                    timeout: this._instance.config.feature_flag_request_timeout_ms,
                    callback: l => {
                        var c, u, f = !0;
                        if (l.statusCode === 200 && (this.ai || (this.$anon_distinct_id = void 0), f = !1), this.ni = !1, this.li || (this.li = !0, this._instance.gi((u = l.json) !== null && u !== void 0 ? u : {})), !r.disable_flags || this.ai)
                            if (this.ui = !f, l.json && (c = l.json.quotaLimited) != null && c.includes(ew.FeatureFlags)) wt.warn("You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more.");
                            else {
                                var h;
                                r.disable_flags || this.receivedFeatureFlags((h = l.json) !== null && h !== void 0 ? h : {}, f), this.ai && (this.ai = !1, this.ci())
                            }
                    }
                })
            }
    }
    getFeatureFlag(e, n) {
        if (n === void 0 && (n = {}), this.si || this.getFlags() && this.getFlags().length > 0) {
            var r = this.getFlagVariants()[e],
                s = "" + r,
                i = this._instance.get_property(Pu) || void 0,
                o = this._instance.get_property(ui) || {};
            if ((n.send_event || !("send_event" in n)) && (!(e in o) || !o[e].includes(s))) {
                var a, l, c, u, f, h, d, _, y;
                me(o[e]) ? o[e].push(s) : o[e] = [s], (a = this._instance.persistence) == null || a.register({
                    [ui]: o
                });
                var E = this.getFeatureFlagDetails(e),
                    m = {
                        $feature_flag: e,
                        $feature_flag_response: r,
                        $feature_flag_payload: this.getFeatureFlagPayload(e) || null,
                        $feature_flag_request_id: i,
                        $feature_flag_bootstrapped_response: ((l = this._instance.config.bootstrap) == null || (l = l.featureFlags) == null ? void 0 : l[e]) || null,
                        $feature_flag_bootstrapped_payload: ((c = this._instance.config.bootstrap) == null || (c = c.featureFlagPayloads) == null ? void 0 : c[e]) || null,
                        $used_bootstrap_value: !this.ui
                    };
                B(E == null || (u = E.metadata) == null ? void 0 : u.version) || (m.$feature_flag_version = E.metadata.version);
                var g, x = (f = E == null || (h = E.reason) == null ? void 0 : h.description) !== null && f !== void 0 ? f : E == null || (d = E.reason) == null ? void 0 : d.code;
                x && (m.$feature_flag_reason = x), E != null && (_ = E.metadata) != null && _.id && (m.$feature_flag_id = E.metadata.id), B(E == null ? void 0 : E.original_variant) && B(E == null ? void 0 : E.original_enabled) || (m.$feature_flag_original_response = B(E.original_variant) ? E.original_enabled : E.original_variant), E != null && (y = E.metadata) != null && y.original_payload && (m.$feature_flag_original_payload = E == null || (g = E.metadata) == null ? void 0 : g.original_payload), this._instance.capture("$feature_flag_called", m)
            }
            return r
        }
        wt.warn('getFeatureFlag for key "' + e + `" failed. Feature flags didn't load in time.`)
    }
    getFeatureFlagDetails(e) {
        return this.getFlagsWithDetails()[e]
    }
    getFeatureFlagPayload(e) {
        return this.getFlagPayloads()[e]
    }
    getRemoteConfigPayload(e, n) {
        var r = this._instance.config.token,
            s = {
                distinct_id: this._instance.get_distinct_id(),
                token: r
            };
        this.di() && (s.evaluation_environments = this.hi()), this._instance.pi({
            method: "POST",
            url: this._instance.requestRouter.endpointFor("api", "/flags/?v=2&config=true"),
            data: s,
            compression: this._instance.config.disable_compression ? void 0 : Vt.Base64,
            timeout: this._instance.config.feature_flag_request_timeout_ms,
            callback: i => {
                var o, a = (o = i.json) == null ? void 0 : o.featureFlagPayloads;
                n((a == null ? void 0 : a[e]) || void 0)
            }
        })
    }
    isFeatureEnabled(e, n) {
        if (n === void 0 && (n = {}), this.si || this.getFlags() && this.getFlags().length > 0) {
            var r = this.getFeatureFlag(e, n);
            return B(r) ? void 0 : !!r
        }
        wt.warn('isFeatureEnabled for key "' + e + `" failed. Feature flags didn't load in time.`)
    }
    addFeatureFlagsHandler(e) {
        this.featureFlagEventHandlers.push(e)
    }
    removeFeatureFlagsHandler(e) {
        this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter(n => n !== e)
    }
    receivedFeatureFlags(e, n) {
        if (this._instance.persistence) {
            this.si = !0;
            var r = this.getFlagVariants(),
                s = this.getFlagPayloads(),
                i = this.getFlagsWithDetails();
            (function(o, a, l, c, u) {
                l === void 0 && (l = {}), c === void 0 && (c = {}), u === void 0 && (u = {});
                var f = Zb(o),
                    h = f.flags,
                    d = f.featureFlags,
                    _ = f.featureFlagPayloads;
                if (d) {
                    var y = o.requestId;
                    if (me(d)) {
                        wt.warn("v1 of the feature flags endpoint is deprecated. Please use the latest version.");
                        var E = {};
                        if (d)
                            for (var m = 0; m < d.length; m++) E[d[m]] = !0;
                        a && a.register({
                            [Eo]: d,
                            [Xn]: E
                        })
                    } else {
                        var g = d,
                            x = _,
                            b = h;
                        o.errorsWhileComputingFlags && (g = K({}, l, g), x = K({}, c, x), b = K({}, u, b)), a && a.register(K({
                            [Eo]: Object.keys(Ru(g)),
                            [Xn]: g || {},
                            [Tu]: x || {},
                            [ha]: b || {}
                        }, y ? {
                            [Pu]: y
                        } : {}))
                    }
                }
            })(e, this._instance.persistence, r, s, i), this.mi(n)
        }
    }
    override(e, n) {
        n === void 0 && (n = !1), wt.warn("override is deprecated. Please use overrideFeatureFlags instead."), this.overrideFeatureFlags({
            flags: e,
            suppressWarning: n
        })
    }
    overrideFeatureFlags(e) {
        if (!this._instance.__loaded || !this._instance.persistence) return wt.uninitializedWarning("posthog.featureFlags.overrideFeatureFlags");
        if (e === !1) return this._instance.persistence.unregister(Kn), this._instance.persistence.unregister(Or), void this.mi();
        if (e && typeof e == "object" && ("flags" in e || "payloads" in e)) {
            var n, r = e;
            if (this.ri = !!((n = r.suppressWarning) !== null && n !== void 0 && n), "flags" in r) {
                if (r.flags === !1) this._instance.persistence.unregister(Kn);
                else if (r.flags)
                    if (me(r.flags)) {
                        for (var s = {}, i = 0; i < r.flags.length; i++) s[r.flags[i]] = !0;
                        this._instance.persistence.register({
                            [Kn]: s
                        })
                    } else this._instance.persistence.register({
                        [Kn]: r.flags
                    })
            }
            return "payloads" in r && (r.payloads === !1 ? this._instance.persistence.unregister(Or) : r.payloads && this._instance.persistence.register({
                [Or]: r.payloads
            })), void this.mi()
        }
        this.mi()
    }
    onFeatureFlags(e) {
        if (this.addFeatureFlagsHandler(e), this.si) {
            var {
                flags: n,
                flagVariants: r
            } = this.yi();
            e(n, r)
        }
        return () => this.removeFeatureFlagsHandler(e)
    }
    updateEarlyAccessFeatureEnrollment(e, n, r) {
        var s, i = (this._instance.get_property(Hr) || []).find(c => c.flagKey === e),
            o = {
                ["$feature_enrollment/" + e]: n
            },
            a = {
                $feature_flag: e,
                $feature_enrollment: n,
                $set: o
            };
        i && (a.$early_access_feature_name = i.name), r && (a.$feature_enrollment_stage = r), this._instance.capture("$feature_enrollment_update", a), this.setPersonPropertiesForFlags(o, !1);
        var l = K({}, this.getFlagVariants(), {
            [e]: n
        });
        (s = this._instance.persistence) == null || s.register({
            [Eo]: Object.keys(Ru(l)),
            [Xn]: l
        }), this.mi()
    }
    getEarlyAccessFeatures(e, n, r) {
        n === void 0 && (n = !1);
        var s = this._instance.get_property(Hr),
            i = r ? "&" + r.map(o => "stage=" + o).join("&") : "";
        if (s && !n) return e(s);
        this._instance.pi({
            url: this._instance.requestRouter.endpointFor("api", "/api/early_access_features/?token=" + this._instance.config.token + i),
            method: "GET",
            callback: o => {
                var a, l;
                if (o.json) {
                    var c = o.json.earlyAccessFeatures;
                    return (a = this._instance.persistence) == null || a.unregister(Hr), (l = this._instance.persistence) == null || l.register({
                        [Hr]: c
                    }), e(c)
                }
            }
        })
    }
    yi() {
        var e = this.getFlags(),
            n = this.getFlagVariants();
        return {
            flags: e.filter(r => n[r]),
            flagVariants: Object.keys(n).filter(r => n[r]).reduce((r, s) => (r[s] = n[s], r), {})
        }
    }
    mi(e) {
        var {
            flags: n,
            flagVariants: r
        } = this.yi();
        this.featureFlagEventHandlers.forEach(s => s(n, r, {
            errorsLoading: e
        }))
    }
    setPersonPropertiesForFlags(e, n) {
        n === void 0 && (n = !0);
        var r = this._instance.get_property(Ur) || {};
        this._instance.register({
            [Ur]: K({}, r, e)
        }), n && this._instance.reloadFeatureFlags()
    }
    resetPersonPropertiesForFlags() {
        this._instance.unregister(Ur)
    }
    setGroupPropertiesForFlags(e, n) {
        n === void 0 && (n = !0);
        var r = this._instance.get_property(Rn) || {};
        Object.keys(r).length !== 0 && Object.keys(r).forEach(s => {
            r[s] = K({}, r[s], e[s]), delete e[s]
        }), this._instance.register({
            [Rn]: K({}, r, e)
        }), n && this._instance.reloadFeatureFlags()
    }
    resetGroupPropertiesForFlags(e) {
        if (e) {
            var n = this._instance.get_property(Rn) || {};
            this._instance.register({
                [Rn]: K({}, n, {
                    [e]: {}
                })
            })
        } else this._instance.unregister(Rn)
    }
    reset() {
        this.si = !1, this.ni = !1, this.oi = !1, this.ai = !1, this.li = !1, this.ui = !1, this.$anon_distinct_id = void 0, this.fi(), this.ri = !1
    }
}
var nw = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"];
class xo {
    constructor(e, n) {
        this.A = e, this.props = {}, this.bi = !1, this.wi = (r => {
            var s = "";
            return r.token && (s = r.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), r.persistence_name ? "ph_" + r.persistence_name : "ph_" + s + "_posthog"
        })(e), this.it = this.xi(e), this.load(), e.debug && V.info("Persistence loaded", e.persistence, K({}, this.props)), this.update_config(e, e, n), this.save()
    }
    isDisabled() {
        return !!this.Si
    }
    xi(e) {
        nw.indexOf(e.persistence.toLowerCase()) === -1 && (V.critical("Unknown persistence type " + e.persistence + "; falling back to localStorage+cookie"), e.persistence = "localStorage+cookie");
        var n = e.persistence.toLowerCase();
        return n === "localstorage" && Se.G() ? Se : n === "localstorage+cookie" && Ms.G() ? Ms : n === "sessionstorage" && Ve.G() ? Ve : n === "memory" ? db : n === "cookie" ? Mt : Ms.G() ? Ms : Mt
    }
    properties() {
        var e = {};
        return ve(this.props, function(n, r) {
            if (r === Xn && ze(n))
                for (var s = Object.keys(n), i = 0; i < s.length; i++) e["$feature/" + s[i]] = n[s[i]];
            else a = r, l = !1, (Qt(o = G0) ? l : Wc && o.indexOf === Wc ? o.indexOf(a) != -1 : (ve(o, function(c) {
                if (l || (l = c === a)) return li
            }), l)) || (e[r] = n);
            var o, a, l
        }), e
    }
    load() {
        if (!this.Si) {
            var e = this.it.K(this.wi);
            e && (this.props = Pe({}, e))
        }
    }
    save() {
        this.Si || this.it.Y(this.wi, this.props, this.Ei, this.$i, this.ki, this.A.debug)
    }
    remove() {
        this.it.X(this.wi, !1), this.it.X(this.wi, !0)
    }
    clear() {
        this.remove(), this.props = {}
    }
    register_once(e, n, r) {
        if (ze(e)) {
            B(n) && (n = "None"), this.Ei = B(r) ? this.Pi : r;
            var s = !1;
            if (ve(e, (i, o) => {
                    this.props.hasOwnProperty(o) && this.props[o] !== n || (this.props[o] = i, s = !0)
                }), s) return this.save(), !0
        }
        return !1
    }
    register(e, n) {
        if (ze(e)) {
            this.Ei = B(n) ? this.Pi : n;
            var r = !1;
            if (ve(e, (s, i) => {
                    e.hasOwnProperty(i) && this.props[i] !== s && (this.props[i] = s, r = !0)
                }), r) return this.save(), !0
        }
        return !1
    }
    unregister(e) {
        e in this.props && (delete this.props[e], this.save())
    }
    update_campaign_params() {
        if (!this.bi) {
            var e = Id(this.A.custom_campaign_params, this.A.mask_personal_data_properties, this.A.custom_personal_data_properties);
            Jn(fl(e)) || this.register(e), this.bi = !0
        }
    }
    update_search_keyword() {
        var e;
        this.register((e = U == null ? void 0 : U.referrer) ? Fd(e) : {})
    }
    update_referrer_info() {
        var e;
        this.register_once({
            $referrer: Md(),
            $referring_domain: U != null && U.referrer && ((e = pi(U.referrer)) == null ? void 0 : e.host) || "$direct"
        }, void 0)
    }
    set_initial_person_info() {
        this.props[_a] || this.props[va] || this.register_once({
            [fi]: Ld(this.A.mask_personal_data_properties, this.A.custom_personal_data_properties)
        }, void 0)
    }
    get_initial_props() {
        var e = {};
        ve([va, _a], o => {
            var a = this.props[o];
            a && ve(a, function(l, c) {
                e["$initial_" + oa(c)] = l
            })
        });
        var n, r, s = this.props[fi];
        if (s) {
            var i = (n = Nd(s), r = {}, ve(n, function(o, a) {
                r["$initial_" + oa(a)] = o
            }), r);
            Pe(e, i)
        }
        return e
    }
    safe_merge(e) {
        return ve(this.props, function(n, r) {
            r in e || (e[r] = n)
        }), e
    }
    update_config(e, n, r) {
        if (this.Pi = this.Ei = e.cookie_expiration, this.set_disabled(e.disable_persistence || !!r), this.set_cross_subdomain(e.cross_subdomain_cookie), this.set_secure(e.secure_cookie), e.persistence !== n.persistence) {
            var s = this.xi(e),
                i = this.props;
            this.clear(), this.it = s, this.props = i, this.save()
        }
    }
    set_disabled(e) {
        this.Si = e, this.Si ? this.remove() : this.save()
    }
    set_cross_subdomain(e) {
        e !== this.$i && (this.$i = e, this.remove(), this.save())
    }
    set_secure(e) {
        e !== this.ki && (this.ki = e, this.remove(), this.save())
    }
    set_event_timer(e, n) {
        var r = this.props[jr] || {};
        r[e] = n, this.props[jr] = r, this.save()
    }
    remove_event_timer(e) {
        var n = (this.props[jr] || {})[e];
        return B(n) || (delete this.props[jr][e], this.save()), n
    }
    get_property(e) {
        return this.props[e]
    }
    set_property(e, n) {
        this.props[e] = n, this.save()
    }
}(function(t) {
    return t.Button = "button", t.Tab = "tab", t.Selector = "selector", t
})({});
(function(t) {
    return t.TopLeft = "top_left", t.TopRight = "top_right", t.TopCenter = "top_center", t.MiddleLeft = "middle_left", t.MiddleRight = "middle_right", t.MiddleCenter = "middle_center", t.Left = "left", t.Center = "center", t.Right = "right", t.NextToTrigger = "next_to_trigger", t
})({});
var ko = function(t) {
    return t.Popover = "popover", t.API = "api", t.Widget = "widget", t.ExternalSurvey = "external_survey", t
}({});
(function(t) {
    return t.Open = "open", t.MultipleChoice = "multiple_choice", t.SingleChoice = "single_choice", t.Rating = "rating", t.Link = "link", t
})({});
(function(t) {
    return t.NextQuestion = "next_question", t.End = "end", t.ResponseBased = "response_based", t.SpecificQuestion = "specific_question", t
})({});
(function(t) {
    return t.Once = "once", t.Recurring = "recurring", t.Always = "always", t
})({});
var Ws = function(t) {
        return t.SHOWN = "survey shown", t.DISMISSED = "survey dismissed", t.SENT = "survey sent", t
    }({}),
    Au = function(t) {
        return t.SURVEY_ID = "$survey_id", t.SURVEY_NAME = "$survey_name", t.SURVEY_RESPONSE = "$survey_response", t.SURVEY_ITERATION = "$survey_iteration", t.SURVEY_ITERATION_START_DATE = "$survey_iteration_start_date", t.SURVEY_PARTIALLY_COMPLETED = "$survey_partially_completed", t.SURVEY_SUBMISSION_ID = "$survey_submission_id", t.SURVEY_QUESTIONS = "$survey_questions", t.SURVEY_COMPLETED = "$survey_completed", t
    }({}),
    Wd = function(t) {
        return t.Popover = "popover", t.Inline = "inline", t
    }({});
class wl {
    constructor() {
        this.Ti = {}, this.Ti = {}
    }
    on(e, n) {
        return this.Ti[e] || (this.Ti[e] = []), this.Ti[e].push(n), () => {
            this.Ti[e] = this.Ti[e].filter(r => r !== n)
        }
    }
    emit(e, n) {
        for (var r of this.Ti[e] || []) r(n);
        for (var s of this.Ti["*"] || []) s(e, n)
    }
}
class In {
    constructor(e) {
        this.Ii = new wl, this.Ri = (n, r) => this.Ci(n, r) && this.Oi(n, r) && this.Fi(n, r), this.Ci = (n, r) => r == null || !r.event || (n == null ? void 0 : n.event) === (r == null ? void 0 : r.event), this._instance = e, this.Mi = new Set, this.Ai = new Set
    }
    init() {
        var e;
        if (!B((e = this._instance) == null ? void 0 : e.ji)) {
            var n;
            (n = this._instance) == null || n.ji((r, s) => {
                this.on(r, s)
            })
        }
    }
    register(e) {
        var n, r;
        if (!B((n = this._instance) == null ? void 0 : n.ji) && (e.forEach(o => {
                var a, l;
                (a = this.Ai) == null || a.add(o), (l = o.steps) == null || l.forEach(c => {
                    var u;
                    (u = this.Mi) == null || u.add((c == null ? void 0 : c.event) || "")
                })
            }), (r = this._instance) != null && r.autocapture)) {
            var s, i = new Set;
            e.forEach(o => {
                var a;
                (a = o.steps) == null || a.forEach(l => {
                    l != null && l.selector && i.add(l == null ? void 0 : l.selector)
                })
            }), (s = this._instance) == null || s.autocapture.setElementSelectors(i)
        }
    }
    on(e, n) {
        var r;
        n != null && e.length != 0 && (this.Mi.has(e) || this.Mi.has(n == null ? void 0 : n.event)) && this.Ai && ((r = this.Ai) == null ? void 0 : r.size) > 0 && this.Ai.forEach(s => {
            this.Di(n, s) && this.Ii.emit("actionCaptured", s.name)
        })
    }
    Li(e) {
        this.onAction("actionCaptured", n => e(n))
    }
    Di(e, n) {
        if ((n == null ? void 0 : n.steps) == null) return !1;
        for (var r of n.steps)
            if (this.Ri(e, r)) return !0;
        return !1
    }
    onAction(e, n) {
        return this.Ii.on(e, n)
    }
    Oi(e, n) {
        if (n != null && n.url) {
            var r, s = e == null || (r = e.properties) == null ? void 0 : r.$current_url;
            if (!s || typeof s != "string" || !In.Ni(s, n == null ? void 0 : n.url, (n == null ? void 0 : n.url_matching) || "contains")) return !1
        }
        return !0
    }
    static Ni(e, n, r) {
        switch (r) {
            case "regex":
                return !!C && _r(e, n);
            case "exact":
                return n === e;
            case "contains":
                var s = In.Ui(n).replace(/_/g, ".").replace(/%/g, ".*");
                return _r(e, s);
            default:
                return !1
        }
    }
    static Ui(e) {
        return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d")
    }
    Fi(e, n) {
        if ((n != null && n.href || n != null && n.tag_name || n != null && n.text) && !this.zi(e).some(i => !(n != null && n.href && !In.Ni(i.href || "", n == null ? void 0 : n.href, (n == null ? void 0 : n.href_matching) || "exact")) && (n == null || !n.tag_name || i.tag_name === (n == null ? void 0 : n.tag_name)) && !(n != null && n.text && !In.Ni(i.text || "", n == null ? void 0 : n.text, (n == null ? void 0 : n.text_matching) || "exact") && !In.Ni(i.$el_text || "", n == null ? void 0 : n.text, (n == null ? void 0 : n.text_matching) || "exact")))) return !1;
        if (n != null && n.selector) {
            var r, s = e == null || (r = e.properties) == null ? void 0 : r.$element_selectors;
            if (!s || !s.includes(n == null ? void 0 : n.selector)) return !1
        }
        return !0
    }
    zi(e) {
        return (e == null ? void 0 : e.properties.$elements) == null ? [] : e == null ? void 0 : e.properties.$elements
    }
}
var ge = He("[Surveys]"),
    Sa = "seenSurvey_",
    rw = (t, e) => {
        var n = "$survey_" + e + "/" + t.id;
        return t.current_iteration && t.current_iteration > 0 && (n = "$survey_" + e + "/" + t.id + "/" + t.current_iteration), n
    },
    $u = t => {
        var e = "" + Sa + t.id;
        return t.current_iteration && t.current_iteration > 0 && (e = "" + Sa + t.id + "_" + t.current_iteration), e
    },
    sw = [ko.Popover, ko.Widget, ko.API],
    iw = {
        ignoreConditions: !1,
        ignoreDelay: !1,
        displayType: Wd.Popover
    };
class ow {
    constructor(e) {
        this._instance = e, this.Hi = new Map, this.Bi = new Map
    }
    register(e) {
        var n;
        B((n = this._instance) == null ? void 0 : n.ji) || (this.qi(e), this.Wi(e))
    }
    Wi(e) {
        var n = e.filter(r => {
            var s, i;
            return ((s = r.conditions) == null ? void 0 : s.actions) && ((i = r.conditions) == null || (i = i.actions) == null || (i = i.values) == null ? void 0 : i.length) > 0
        });
        n.length !== 0 && (this.Gi == null && (this.Gi = new In(this._instance), this.Gi.init(), this.Gi.Li(r => {
            this.onAction(r)
        })), n.forEach(r => {
            var s, i, o, a, l;
            r.conditions && (s = r.conditions) != null && s.actions && (i = r.conditions) != null && (i = i.actions) != null && i.values && ((o = r.conditions) == null || (o = o.actions) == null || (o = o.values) == null ? void 0 : o.length) > 0 && ((a = this.Gi) == null || a.register(r.conditions.actions.values), (l = r.conditions) == null || (l = l.actions) == null || (l = l.values) == null || l.forEach(c => {
                if (c && c.name) {
                    var u = this.Bi.get(c.name);
                    u && u.push(r.id), this.Bi.set(c.name, u || [r.id])
                }
            }))
        }))
    }
    qi(e) {
        var n;
        e.filter(r => {
            var s, i;
            return ((s = r.conditions) == null ? void 0 : s.events) && ((i = r.conditions) == null || (i = i.events) == null || (i = i.values) == null ? void 0 : i.length) > 0
        }).length !== 0 && ((n = this._instance) == null || n.ji((r, s) => {
            this.onEvent(r, s)
        }), e.forEach(r => {
            var s;
            (s = r.conditions) == null || (s = s.events) == null || (s = s.values) == null || s.forEach(i => {
                if (i && i.name) {
                    var o = this.Hi.get(i.name);
                    o && o.push(r.id), this.Hi.set(i.name, o || [r.id])
                }
            })
        }))
    }
    onEvent(e, n) {
        var r, s, i = ((r = this._instance) == null || (r = r.persistence) == null ? void 0 : r.props[Fs]) || [];
        if (Ws.SHOWN === e && n && i.length > 0) {
            var o;
            ge.info("survey event matched, removing survey from activated surveys", {
                event: e,
                eventPayload: n,
                existingActivatedSurveys: i
            });
            var a = n == null || (o = n.properties) == null ? void 0 : o.$survey_id;
            if (a) {
                var l = i.indexOf(a);
                l >= 0 && (i.splice(l, 1), this.Vi(i))
            }
        } else if (this.Hi.has(e)) {
            ge.info("survey event name matched", {
                event: e,
                eventPayload: n,
                surveys: this.Hi.get(e)
            });
            var c = [];
            (s = this._instance) == null || s.getSurveys(f => {
                c = f.filter(h => {
                    var d;
                    return (d = this.Hi.get(e)) == null ? void 0 : d.includes(h.id)
                })
            });
            var u = c.filter(f => {
                var h, d = (h = f.conditions) == null || (h = h.events) == null || (h = h.values) == null ? void 0 : h.find(_ => _.name === e);
                return !!d && (!d.propertyFilters || Object.entries(d.propertyFilters).every(_ => {
                    var y, [E, m] = _,
                        g = n == null || (y = n.properties) == null ? void 0 : y[E];
                    if (B(g) || Qt(g)) return !1;
                    var x = [String(g)],
                        b = qd[m.operator];
                    return b ? b(m.values, x) : (ge.warn("Unknown property comparison operator: " + m.operator), !1)
                }))
            });
            this.Vi(i.concat(u.map(f => f.id) || []))
        }
    }
    onAction(e) {
        var n, r = ((n = this._instance) == null || (n = n.persistence) == null ? void 0 : n.props[Fs]) || [];
        this.Bi.has(e) && this.Vi(r.concat(this.Bi.get(e) || []))
    }
    Vi(e) {
        var n;
        ge.info("updating activated surveys", {
            activatedSurveys: e
        }), (n = this._instance) == null || (n = n.persistence) == null || n.register({
            [Fs]: [...new Set(e)]
        })
    }
    getSurveys() {
        var e, n = (e = this._instance) == null || (e = e.persistence) == null ? void 0 : e.props[Fs];
        return n || []
    }
    getEventToSurveys() {
        return this.Hi
    }
    Ji() {
        return this.Gi
    }
}
class aw {
    constructor(e) {
        this.Ki = void 0, this._surveyManager = null, this.Yi = !1, this.Xi = !1, this.Qi = [], this._instance = e, this._surveyEventReceiver = null
    }
    onRemoteConfig(e) {
        if (!this._instance.config.disable_surveys) {
            var n = e.surveys;
            if (ke(n)) return ge.warn("Flags not loaded yet. Not loading surveys.");
            var r = me(n);
            this.Ki = r ? n.length > 0 : n, ge.info("flags response received, isSurveysEnabled: " + this.Ki), this.loadIfEnabled()
        }
    }
    reset() {
        localStorage.removeItem("lastSeenSurveyDate");
        for (var e = [], n = 0; n < localStorage.length; n++) {
            var r = localStorage.key(n);
            (r != null && r.startsWith(Sa) || r != null && r.startsWith("inProgressSurvey_")) && e.push(r)
        }
        e.forEach(s => localStorage.removeItem(s))
    }
    loadIfEnabled() {
        if (!this._surveyManager)
            if (this.Xi) ge.info("Already initializing surveys, skipping...");
            else if (this._instance.config.disable_surveys) ge.info("Disabled. Not loading surveys.");
        else if (this._instance.config.cookieless_mode && this._instance.consent.isOptedOut()) ge.info("Not loading surveys in cookieless mode without consent.");
        else {
            var e = ee == null ? void 0 : ee.__PosthogExtensions__;
            if (e) {
                if (!B(this.Ki) || this._instance.config.advanced_enable_surveys) {
                    var n = this.Ki || this._instance.config.advanced_enable_surveys;
                    this.Xi = !0;
                    try {
                        var r = e.generateSurveys;
                        if (r) return void this.Zi(r, n);
                        var s = e.loadExternalDependency;
                        if (!s) return void this.te("PostHog loadExternalDependency extension not found.");
                        s(this._instance, "surveys", i => {
                            i || !e.generateSurveys ? this.te("Could not load surveys script", i) : this.Zi(e.generateSurveys, n)
                        })
                    } catch (i) {
                        throw this.te("Error initializing surveys", i), i
                    } finally {
                        this.Xi = !1
                    }
                }
            } else ge.error("PostHog Extensions not found.")
        }
    }
    Zi(e, n) {
        this._surveyManager = e(this._instance, n), this._surveyEventReceiver = new ow(this._instance), ge.info("Surveys loaded successfully"), this.ie({
            isLoaded: !0
        })
    }
    te(e, n) {
        ge.error(e, n), this.ie({
            isLoaded: !1,
            error: e
        })
    }
    onSurveysLoaded(e) {
        return this.Qi.push(e), this._surveyManager && this.ie({
            isLoaded: !0
        }), () => {
            this.Qi = this.Qi.filter(n => n !== e)
        }
    }
    getSurveys(e, n) {
        if (n === void 0 && (n = !1), this._instance.config.disable_surveys) return ge.info("Disabled. Not loading surveys."), e([]);
        var r = this._instance.get_property(da);
        if (r && !n) return e(r, {
            isLoaded: !0
        });
        if (this.Yi) return e([], {
            isLoaded: !1,
            error: "Surveys are already being loaded"
        });
        try {
            this.Yi = !0, this._instance.pi({
                url: this._instance.requestRouter.endpointFor("api", "/api/surveys/?token=" + this._instance.config.token),
                method: "GET",
                timeout: this._instance.config.surveys_request_timeout_ms,
                callback: s => {
                    var i;
                    this.Yi = !1;
                    var o = s.statusCode;
                    if (o !== 200 || !s.json) {
                        var a = "Surveys API could not be loaded, status: " + o;
                        return ge.error(a), e([], {
                            isLoaded: !1,
                            error: a
                        })
                    }
                    var l, c = s.json.surveys || [],
                        u = c.filter(f => function(h) {
                            return !(!h.start_date || h.end_date)
                        }(f) && (function(h) {
                            var d;
                            return !((d = h.conditions) == null || (d = d.events) == null || (d = d.values) == null || !d.length)
                        }(f) || function(h) {
                            var d;
                            return !((d = h.conditions) == null || (d = d.actions) == null || (d = d.values) == null || !d.length)
                        }(f)));
                    return u.length > 0 && ((l = this._surveyEventReceiver) == null || l.register(u)), (i = this._instance.persistence) == null || i.register({
                        [da]: c
                    }), e(c, {
                        isLoaded: !0
                    })
                }
            })
        } catch (s) {
            throw this.Yi = !1, s
        }
    }
    ie(e) {
        for (var n of this.Qi) try {
            if (!e.isLoaded) return n([], e);
            this.getSurveys(n)
        } catch (r) {
            ge.error("Error in survey callback", r)
        }
    }
    getActiveMatchingSurveys(e, n) {
        if (n === void 0 && (n = !1), !ke(this._surveyManager)) return this._surveyManager.getActiveMatchingSurveys(e, n);
        ge.warn("init was not called")
    }
    ee(e) {
        var n = null;
        return this.getSurveys(r => {
            var s;
            n = (s = r.find(i => i.id === e)) !== null && s !== void 0 ? s : null
        }), n
    }
    re(e) {
        if (ke(this._surveyManager)) return {
            eligible: !1,
            reason: "SDK is not enabled or survey functionality is not yet loaded"
        };
        var n = typeof e == "string" ? this.ee(e) : e;
        return n ? this._surveyManager.checkSurveyEligibility(n) : {
            eligible: !1,
            reason: "Survey not found"
        }
    }
    canRenderSurvey(e) {
        if (ke(this._surveyManager)) return ge.warn("init was not called"), {
            visible: !1,
            disabledReason: "SDK is not enabled or survey functionality is not yet loaded"
        };
        var n = this.re(e);
        return {
            visible: n.eligible,
            disabledReason: n.reason
        }
    }
    canRenderSurveyAsync(e, n) {
        return ke(this._surveyManager) ? (ge.warn("init was not called"), Promise.resolve({
            visible: !1,
            disabledReason: "SDK is not enabled or survey functionality is not yet loaded"
        })) : new Promise(r => {
            this.getSurveys(s => {
                var i, o = (i = s.find(l => l.id === e)) !== null && i !== void 0 ? i : null;
                if (o) {
                    var a = this.re(o);
                    r({
                        visible: a.eligible,
                        disabledReason: a.reason
                    })
                } else r({
                    visible: !1,
                    disabledReason: "Survey not found"
                })
            }, n)
        })
    }
    renderSurvey(e, n) {
        var r;
        if (ke(this._surveyManager)) ge.warn("init was not called");
        else {
            var s = typeof e == "string" ? this.ee(e) : e;
            if (s != null && s.id)
                if (sw.includes(s.type)) {
                    var i = U == null ? void 0 : U.querySelector(n);
                    if (i) return (r = s.appearance) != null && r.surveyPopupDelaySeconds ? (ge.info("Rendering survey " + s.id + " with delay of " + s.appearance.surveyPopupDelaySeconds + " seconds"), void setTimeout(() => {
                        var o, a;
                        ge.info("Rendering survey " + s.id + " with delay of " + ((o = s.appearance) == null ? void 0 : o.surveyPopupDelaySeconds) + " seconds"), (a = this._surveyManager) == null || a.renderSurvey(s, i), ge.info("Survey " + s.id + " rendered")
                    }, 1e3 * s.appearance.surveyPopupDelaySeconds)) : void this._surveyManager.renderSurvey(s, i);
                    ge.warn("Survey element not found")
                } else ge.warn("Surveys of type " + s.type + " cannot be rendered in the app");
            else ge.warn("Survey not found")
        }
    }
    displaySurvey(e, n) {
        var r;
        if (ke(this._surveyManager)) ge.warn("init was not called");
        else {
            var s = this.ee(e);
            if (s) {
                var i = s;
                if ((r = s.appearance) != null && r.surveyPopupDelaySeconds && n.ignoreDelay && (i = K({}, s, {
                        appearance: K({}, s.appearance, {
                            surveyPopupDelaySeconds: 0
                        })
                    })), n.ignoreConditions === !1) {
                    var o = this.canRenderSurvey(s);
                    if (!o.visible) return void ge.warn("Survey is not eligible to be displayed: ", o.disabledReason)
                }
                n.displayType !== Wd.Inline ? this._surveyManager.handlePopoverSurvey(i) : this.renderSurvey(i, n.selector)
            } else ge.warn("Survey not found")
        }
    }
}
var Iu = He("[RateLimiter]");
class lw {
    constructor(e) {
        var n, r;
        this.serverLimits = {}, this.lastEventRateLimited = !1, this.checkForLimiting = s => {
            var i = s.text;
            if (i && i.length) try {
                (JSON.parse(i).quota_limited || []).forEach(o => {
                    Iu.info((o || "events") + " is quota limited."), this.serverLimits[o] = new Date().getTime() + 6e4
                })
            } catch (o) {
                return void Iu.warn('could not rate limit - continuing. Error: "' + (o == null ? void 0 : o.message) + '"', {
                    text: i
                })
            }
        }, this.instance = e, this.captureEventsPerSecond = ((n = e.config.rate_limiting) == null ? void 0 : n.events_per_second) || 10, this.captureEventsBurstLimit = Math.max(((r = e.config.rate_limiting) == null ? void 0 : r.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond), this.lastEventRateLimited = this.clientRateLimitContext(!0).isRateLimited
    }
    clientRateLimitContext(e) {
        var n, r, s;
        e === void 0 && (e = !1);
        var i = new Date().getTime(),
            o = (n = (r = this.instance.persistence) == null ? void 0 : r.get_property(ga)) !== null && n !== void 0 ? n : {
                tokens: this.captureEventsBurstLimit,
                last: i
            };
        o.tokens += (i - o.last) / 1e3 * this.captureEventsPerSecond, o.last = i, o.tokens > this.captureEventsBurstLimit && (o.tokens = this.captureEventsBurstLimit);
        var a = o.tokens < 1;
        return a || e || (o.tokens = Math.max(0, o.tokens - 1)), !a || this.lastEventRateLimited || e || this.instance.capture("$$client_ingestion_warning", {
            $$client_ingestion_warning_message: "posthog-js client rate limited. Config is set to " + this.captureEventsPerSecond + " events per second and " + this.captureEventsBurstLimit + " events burst limit."
        }, {
            skip_client_rate_limiting: !0
        }), this.lastEventRateLimited = a, (s = this.instance.persistence) == null || s.set_property(ga, o), {
            isRateLimited: a,
            remainingTokens: o.tokens
        }
    }
    isServerRateLimited(e) {
        var n = this.serverLimits[e || "events"] || !1;
        return n !== !1 && new Date().getTime() < n
    }
}
var Sn = He("[RemoteConfig]");
class cw {
    constructor(e) {
        this._instance = e
    }
    get remoteConfig() {
        var e;
        return (e = ee._POSTHOG_REMOTE_CONFIG) == null || (e = e[this._instance.config.token]) == null ? void 0 : e.config
    }
    se(e) {
        var n, r;
        (n = ee.__PosthogExtensions__) != null && n.loadExternalDependency ? (r = ee.__PosthogExtensions__) == null || r.loadExternalDependency == null || r.loadExternalDependency(this._instance, "remote-config", () => e(this.remoteConfig)) : (Sn.error("PostHog Extensions not found. Cannot load remote config."), e())
    }
    ne(e) {
        this._instance.pi({
            method: "GET",
            url: this._instance.requestRouter.endpointFor("assets", "/array/" + this._instance.config.token + "/config"),
            callback: n => {
                e(n.json)
            }
        })
    }
    load() {
        try {
            if (this.remoteConfig) return Sn.info("Using preloaded remote config", this.remoteConfig), void this.gi(this.remoteConfig);
            if (this._instance.L()) return void Sn.warn("Remote config is disabled. Falling back to local config.");
            this.se(e => {
                if (!e) return Sn.info("No config found after loading remote JS config. Falling back to JSON."), void this.ne(n => {
                    this.gi(n)
                });
                this.gi(e)
            })
        } catch (e) {
            Sn.error("Error loading remote config", e)
        }
    }
    gi(e) {
        e ? this._instance.config.__preview_remote_config ? (this._instance.gi(e), e.hasFeatureFlags !== !1 && this._instance.featureFlags.ensureFlagsLoaded()) : Sn.info("__preview_remote_config is disabled. Logging config instead", e) : Sn.error("Failed to fetch remote config from PostHog.")
    }
}
var Ta = 3e3;
class uw {
    constructor(e, n) {
        this.oe = !0, this.ae = [], this.le = Ot((n == null ? void 0 : n.flush_interval_ms) || Ta, 250, 5e3, V.createLogger("flush interval"), Ta), this.ue = e
    }
    enqueue(e) {
        this.ae.push(e), this.he || this.de()
    }
    unload() {
        this.ve();
        var e = this.ae.length > 0 ? this.ce() : {},
            n = Object.values(e);
        [...n.filter(r => r.url.indexOf("/e") === 0), ...n.filter(r => r.url.indexOf("/e") !== 0)].map(r => {
            this.ue(K({}, r, {
                transport: "sendBeacon"
            }))
        })
    }
    enable() {
        this.oe = !1, this.de()
    }
    de() {
        var e = this;
        this.oe || (this.he = setTimeout(() => {
            if (this.ve(), this.ae.length > 0) {
                var n = this.ce(),
                    r = function() {
                        var i = n[s],
                            o = new Date().getTime();
                        i.data && me(i.data) && ve(i.data, a => {
                            a.offset = Math.abs(a.timestamp - o), delete a.timestamp
                        }), e.ue(i)
                    };
                for (var s in n) r()
            }
        }, this.le))
    }
    ve() {
        clearTimeout(this.he), this.he = void 0
    }
    ce() {
        var e = {};
        return ve(this.ae, n => {
            var r, s = n,
                i = (s ? s.batchKey : null) || s.url;
            B(e[i]) && (e[i] = K({}, s, {
                data: []
            })), (r = e[i].data) == null || r.push(s.data)
        }), this.ae = [], e
    }
}
var fw = ["retriesPerformedSoFar"];
class hw {
    constructor(e) {
        this.fe = !1, this.pe = 3e3, this.ae = [], this._instance = e, this.ae = [], this.ge = !0, !B(C) && "onLine" in C.navigator && (this.ge = C.navigator.onLine, Oe(C, "online", () => {
            this.ge = !0, this.Ut()
        }), Oe(C, "offline", () => {
            this.ge = !1
        }))
    }
    get length() {
        return this.ae.length
    }
    retriableRequest(e) {
        var {
            retriesPerformedSoFar: n
        } = e, r = Uh(e, fw);
        Nt(n) && n > 0 && (r.url = bi(r.url, {
            retry_count: n
        })), this._instance.pi(K({}, r, {
            callback: s => {
                s.statusCode !== 200 && (s.statusCode < 400 || s.statusCode >= 500) && (n ? ? 0) < 10 ? this._e(K({
                    retriesPerformedSoFar: n
                }, r)) : r.callback == null || r.callback(s)
            }
        }))
    }
    _e(e) {
        var n = e.retriesPerformedSoFar || 0;
        e.retriesPerformedSoFar = n + 1;
        var r = function(o) {
                var a = 3e3 * Math.pow(2, o),
                    l = a / 2,
                    c = Math.min(18e5, a),
                    u = (Math.random() - .5) * (c - l);
                return Math.ceil(c + u)
            }(n),
            s = Date.now() + r;
        this.ae.push({
            retryAt: s,
            requestOptions: e
        });
        var i = "Enqueued failed request for retry in " + r;
        navigator.onLine || (i += " (Browser is offline)"), V.warn(i), this.fe || (this.fe = !0, this.me())
    }
    me() {
        this.ye && clearTimeout(this.ye), this.ye = setTimeout(() => {
            this.ge && this.ae.length > 0 && this.Ut(), this.me()
        }, this.pe)
    }
    Ut() {
        var e = Date.now(),
            n = [],
            r = this.ae.filter(i => i.retryAt < e || (n.push(i), !1));
        if (this.ae = n, r.length > 0)
            for (var {
                    requestOptions: s
                } of r) this.retriableRequest(s)
    }
    unload() {
        for (var {
                requestOptions: e
            } of (this.ye && (clearTimeout(this.ye), this.ye = void 0), this.ae)) try {
            this._instance.pi(K({}, e, {
                transport: "sendBeacon"
            }))
        } catch (n) {
            V.error(n)
        }
        this.ae = []
    }
}
class dw {
    constructor(e) {
        this.be = () => {
            var n, r, s, i;
            this.we || (this.we = {});
            var o = this.scrollElement(),
                a = this.scrollY(),
                l = o ? Math.max(0, o.scrollHeight - o.clientHeight) : 0,
                c = a + ((o == null ? void 0 : o.clientHeight) || 0),
                u = (o == null ? void 0 : o.scrollHeight) || 0;
            this.we.lastScrollY = Math.ceil(a), this.we.maxScrollY = Math.max(a, (n = this.we.maxScrollY) !== null && n !== void 0 ? n : 0), this.we.maxScrollHeight = Math.max(l, (r = this.we.maxScrollHeight) !== null && r !== void 0 ? r : 0), this.we.lastContentY = c, this.we.maxContentY = Math.max(c, (s = this.we.maxContentY) !== null && s !== void 0 ? s : 0), this.we.maxContentHeight = Math.max(u, (i = this.we.maxContentHeight) !== null && i !== void 0 ? i : 0)
        }, this._instance = e
    }
    getContext() {
        return this.we
    }
    resetContext() {
        var e = this.we;
        return setTimeout(this.be, 0), e
    }
    startMeasuringScrollPosition() {
        Oe(C, "scroll", this.be, {
            capture: !0
        }), Oe(C, "scrollend", this.be, {
            capture: !0
        }), Oe(C, "resize", this.be)
    }
    scrollElement() {
        if (!this._instance.config.scroll_root_selector) return C == null ? void 0 : C.document.documentElement;
        var e = me(this._instance.config.scroll_root_selector) ? this._instance.config.scroll_root_selector : [this._instance.config.scroll_root_selector];
        for (var n of e) {
            var r = C == null ? void 0 : C.document.querySelector(n);
            if (r) return r
        }
    }
    scrollY() {
        if (this._instance.config.scroll_root_selector) {
            var e = this.scrollElement();
            return e && e.scrollTop || 0
        }
        return C && (C.scrollY || C.pageYOffset || C.document.documentElement.scrollTop) || 0
    }
    scrollX() {
        if (this._instance.config.scroll_root_selector) {
            var e = this.scrollElement();
            return e && e.scrollLeft || 0
        }
        return C && (C.scrollX || C.pageXOffset || C.document.documentElement.scrollLeft) || 0
    }
}
var pw = t => Ld(t == null ? void 0 : t.config.mask_personal_data_properties, t == null ? void 0 : t.config.custom_personal_data_properties);
class Ou {
    constructor(e, n, r, s) {
        this.xe = i => {
            var o = this.Se();
            if (!o || o.sessionId !== i) {
                var a = {
                    sessionId: i,
                    props: this.Ee(this._instance)
                };
                this.$e.register({
                    [pa]: a
                })
            }
        }, this._instance = e, this.ke = n, this.$e = r, this.Ee = s || pw, this.ke.onSessionId(this.xe)
    }
    Se() {
        return this.$e.props[pa]
    }
    getSetOnceProps() {
        var e, n = (e = this.Se()) == null ? void 0 : e.props;
        return n ? "r" in n ? Nd(n) : {
            $referring_domain: n.referringDomain,
            $pathname: n.initialPathName,
            utm_source: n.utm_source,
            utm_campaign: n.utm_campaign,
            utm_medium: n.utm_medium,
            utm_content: n.utm_content,
            utm_term: n.utm_term
        } : {}
    }
    getSessionProps() {
        var e = {};
        return ve(fl(this.getSetOnceProps()), (n, r) => {
            r === "$current_url" && (r = "url"), e["$session_entry_" + oa(r)] = n
        }), e
    }
}
var Co = He("[SessionId]");
class Fu {
    on(e, n) {
        return this.Pe.on(e, n)
    }
    constructor(e, n, r) {
        var s;
        if (this.Te = [], this.Ie = void 0, this.Pe = new wl, this.Re = (u, f) => Math.abs(u - f) > this.sessionTimeoutMs, !e.persistence) throw new Error("SessionIdManager requires a PostHogPersistence instance");
        if (e.config.cookieless_mode === "always") throw new Error('SessionIdManager cannot be used with cookieless_mode="always"');
        this.A = e.config, this.$e = e.persistence, this.Ce = void 0, this.Oe = void 0, this._sessionStartTimestamp = null, this._sessionActivityTimestamp = null, this.Fe = n || un, this.Me = r || un;
        var i = this.A.persistence_name || this.A.token,
            o = this.A.session_idle_timeout_seconds || 1800;
        if (this._sessionTimeoutMs = 1e3 * Ot(o, 60, 36e3, Co.createLogger("session_idle_timeout_seconds"), 1800), e.register({
                $configured_session_timeout_ms: this._sessionTimeoutMs
            }), this.Ae(), this.je = "ph_" + i + "_window_id", this.De = "ph_" + i + "_primary_window_exists", this.Le()) {
            var a = Ve.K(this.je),
                l = Ve.K(this.De);
            a && !l ? this.Ce = a : Ve.X(this.je), Ve.Y(this.De, !0)
        }
        if ((s = this.A.bootstrap) != null && s.sessionID) try {
            var c = (u => {
                var f = u.replace(/-/g, "");
                if (f.length !== 32) throw new Error("Not a valid UUID");
                if (f[12] !== "7") throw new Error("Not a UUIDv7");
                return parseInt(f.substring(0, 12), 16)
            })(this.A.bootstrap.sessionID);
            this.Ne(this.A.bootstrap.sessionID, new Date().getTime(), c)
        } catch (u) {
            Co.error("Invalid sessionID in bootstrap", u)
        }
        this.Ue()
    }
    get sessionTimeoutMs() {
        return this._sessionTimeoutMs
    }
    onSessionId(e) {
        return B(this.Te) && (this.Te = []), this.Te.push(e), this.Oe && e(this.Oe, this.Ce), () => {
            this.Te = this.Te.filter(n => n !== e)
        }
    }
    Le() {
        return this.A.persistence !== "memory" && !this.$e.Si && Ve.G()
    }
    ze(e) {
        e !== this.Ce && (this.Ce = e, this.Le() && Ve.Y(this.je, e))
    }
    He() {
        return this.Ce ? this.Ce : this.Le() ? Ve.K(this.je) : null
    }
    Ne(e, n, r) {
        e === this.Oe && n === this._sessionActivityTimestamp && r === this._sessionStartTimestamp || (this._sessionStartTimestamp = r, this._sessionActivityTimestamp = n, this.Oe = e, this.$e.register({
            [ci]: [n, e, r]
        }))
    }
    Be() {
        if (this.Oe && this._sessionActivityTimestamp && this._sessionStartTimestamp) return [this._sessionActivityTimestamp, this.Oe, this._sessionStartTimestamp];
        var e = this.$e.props[ci];
        return me(e) && e.length === 2 && e.push(e[0]), e || [0, null, 0]
    }
    resetSessionId() {
        this.Ne(null, null, null)
    }
    destroy() {
        clearTimeout(this.qe), this.qe = void 0, this.Ie && C && (C.removeEventListener("beforeunload", this.Ie, {
            capture: !1
        }), this.Ie = void 0), this.Te = []
    }
    Ue() {
        this.Ie = () => {
            this.Le() && Ve.X(this.De)
        }, Oe(C, "beforeunload", this.Ie, {
            capture: !1
        })
    }
    checkAndGetSessionAndWindowId(e, n) {
        if (e === void 0 && (e = !1), n === void 0 && (n = null), this.A.cookieless_mode === "always") throw new Error('checkAndGetSessionAndWindowId should not be called with cookieless_mode="always"');
        var r = n || new Date().getTime(),
            [s, i, o] = this.Be(),
            a = this.He(),
            l = Nt(o) && o > 0 && Math.abs(r - o) > 864e5,
            c = !1,
            u = !i,
            f = !e && this.Re(r, s);
        u || f || l ? (i = this.Fe(), a = this.Me(), Co.info("new session ID generated", {
            sessionId: i,
            windowId: a,
            changeReason: {
                noSessionId: u,
                activityTimeout: f,
                sessionPastMaximumLength: l
            }
        }), o = r, c = !0) : a || (a = this.Me(), c = !0);
        var h = s === 0 || !e || l ? r : s,
            d = o === 0 ? new Date().getTime() : o;
        return this.ze(a), this.Ne(i, h, d), e || this.Ae(), c && this.Te.forEach(_ => _(i, a, c ? {
            noSessionId: u,
            activityTimeout: f,
            sessionPastMaximumLength: l
        } : void 0)), {
            sessionId: i,
            windowId: a,
            sessionStartTimestamp: d,
            changeReason: c ? {
                noSessionId: u,
                activityTimeout: f,
                sessionPastMaximumLength: l
            } : void 0,
            lastActivityTimestamp: s
        }
    }
    Ae() {
        clearTimeout(this.qe), this.qe = setTimeout(() => {
            var [e] = this.Be();
            if (this.Re(new Date().getTime(), e)) {
                var n = this.Oe;
                this.resetSessionId(), this.Pe.emit("forcedIdleReset", {
                    idleSessionId: n
                })
            }
        }, 1.1 * this.sessionTimeoutMs)
    }
}
var gw = ["$set_once", "$set"],
    on = He("[SiteApps]");
class _w {
    constructor(e) {
        this._instance = e, this.We = [], this.apps = {}
    }
    get isEnabled() {
        return !!this._instance.config.opt_in_site_apps
    }
    Ge(e, n) {
        if (n) {
            var r = this.globalsForEvent(n);
            this.We.push(r), this.We.length > 1e3 && (this.We = this.We.slice(10))
        }
    }
    get siteAppLoaders() {
        var e;
        return (e = ee._POSTHOG_REMOTE_CONFIG) == null || (e = e[this._instance.config.token]) == null ? void 0 : e.siteApps
    }
    init() {
        if (this.isEnabled) {
            var e = this._instance.ji(this.Ge.bind(this));
            this.Ve = () => {
                e(), this.We = [], this.Ve = void 0
            }
        }
    }
    globalsForEvent(e) {
        var n, r, s, i, o, a, l;
        if (!e) throw new Error("Event payload is required");
        var c = {},
            u = this._instance.get_property("$groups") || [],
            f = this._instance.get_property("$stored_group_properties") || {};
        for (var [h, d] of Object.entries(f)) c[h] = {
            id: u[h],
            type: h,
            properties: d
        };
        var {
            $set_once: _,
            $set: y
        } = e;
        return {
            event: K({}, Uh(e, gw), {
                properties: K({}, e.properties, y ? {
                    $set: K({}, (n = (r = e.properties) == null ? void 0 : r.$set) !== null && n !== void 0 ? n : {}, y)
                } : {}, _ ? {
                    $set_once: K({}, (s = (i = e.properties) == null ? void 0 : i.$set_once) !== null && s !== void 0 ? s : {}, _)
                } : {}),
                elements_chain: (o = (a = e.properties) == null ? void 0 : a.$elements_chain) !== null && o !== void 0 ? o : "",
                distinct_id: (l = e.properties) == null ? void 0 : l.distinct_id
            }),
            person: {
                properties: this._instance.get_property("$stored_person_properties")
            },
            groups: c
        }
    }
    setupSiteApp(e) {
        var n = this.apps[e.id],
            r = () => {
                var a;
                !n.errored && this.We.length && (on.info("Processing " + this.We.length + " events for site app with id " + e.id), this.We.forEach(l => n.processEvent == null ? void 0 : n.processEvent(l)), n.processedBuffer = !0), Object.values(this.apps).every(l => l.processedBuffer || l.errored) && ((a = this.Ve) == null || a.call(this))
            },
            s = !1,
            i = a => {
                n.errored = !a, n.loaded = !0, on.info("Site app with id " + e.id + " " + (a ? "loaded" : "errored")), s && r()
            };
        try {
            var {
                processEvent: o
            } = e.init({
                posthog: this._instance,
                callback: a => {
                    i(a)
                }
            });
            o && (n.processEvent = o), s = !0
        } catch (a) {
            on.error("Error while initializing PostHog app with config id " + e.id, a), i(!1)
        }
        if (s && n.loaded) try {
            r()
        } catch (a) {
            on.error("Error while processing buffered events PostHog app with config id " + e.id, a), n.errored = !0
        }
    }
    Je() {
        var e = this.siteAppLoaders || [];
        for (var n of e) this.apps[n.id] = {
            id: n.id,
            loaded: !1,
            errored: !1,
            processedBuffer: !1
        };
        for (var r of e) this.setupSiteApp(r)
    }
    Ke(e) {
        if (Object.keys(this.apps).length !== 0) {
            var n = this.globalsForEvent(e);
            for (var r of Object.values(this.apps)) try {
                r.processEvent == null || r.processEvent(n)
            } catch (s) {
                on.error("Error while processing event " + e.event + " for site app " + r.id, s)
            }
        }
    }
    onRemoteConfig(e) {
        var n, r, s, i = this;
        if ((n = this.siteAppLoaders) != null && n.length) return this.isEnabled ? (this.Je(), void this._instance.on("eventCaptured", c => this.Ke(c))) : void on.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
        if ((r = this.Ve) == null || r.call(this), (s = e.siteApps) != null && s.length)
            if (this.isEnabled) {
                var o = function(c) {
                    var u;
                    ee["__$$ph_site_app_" + c] = i._instance, (u = ee.__PosthogExtensions__) == null || u.loadSiteApp == null || u.loadSiteApp(i._instance, l, f => {
                        if (f) return on.error("Error while initializing PostHog app with config id " + c, f)
                    })
                };
                for (var {
                        id: a,
                        url: l
                    } of e.siteApps) o(a)
            } else on.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.')
    }
}
var vw = ["amazonbot", "amazonproductbot", "app.hypefactors.com", "applebot", "archive.org_bot", "awariobot", "backlinksextendedbot", "baiduspider", "bingbot", "bingpreview", "chrome-lighthouse", "dataforseobot", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "http://yandex.com/bots", "hubspot", "ia_archiver", "leikibot", "linkedinbot", "meta-externalagent", "mj12bot", "msnbot", "nessus", "petalbot", "pinterest", "prerender", "rogerbot", "screaming frog", "sebot-wa", "sitebulb", "slackbot", "slurp", "trendictionbot", "turnitin", "twitterbot", "vercel-screenshot", "vercelbot", "yahoo! slurp", "yandexbot", "zoombot", "bot.htm", "bot.php", "(bot;", "bot/", "crawler", "ahrefsbot", "ahrefssiteaudit", "semrushbot", "siteauditbot", "splitsignalbot", "gptbot", "oai-searchbot", "chatgpt-user", "perplexitybot", "better uptime bot", "sentryuptimebot", "uptimerobot", "headlesschrome", "cypress", "google-hoteladsverifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleother", "google-cloudvertexbot", "googleweblight", "mediapartners-google", "storebot-google", "google-inspectiontool", "bytespider"],
    Mu = function(t, e) {
        if (!t) return !1;
        var n = t.toLowerCase();
        return vw.concat(e || []).some(r => {
            var s = r.toLowerCase();
            return n.indexOf(s) !== -1
        })
    },
    Vd = function(t, e) {
        if (!t) return !1;
        var n = t.userAgent;
        if (n && Mu(n, e)) return !0;
        try {
            var r = t == null ? void 0 : t.userAgentData;
            if (r != null && r.brands && r.brands.some(s => Mu(s == null ? void 0 : s.brand, e))) return !0
        } catch {}
        return !!t.webdriver
    },
    Wr = function(t) {
        return t.US = "us", t.EU = "eu", t.CUSTOM = "custom", t
    }({}),
    Lu = "i.posthog.com";
class mw {
    constructor(e) {
        this.Ye = {}, this.instance = e
    }
    get apiHost() {
        var e = this.instance.config.api_host.trim().replace(/\/$/, "");
        return e === "https://app.posthog.com" ? "https://us.i.posthog.com" : e
    }
    get uiHost() {
        var e, n = (e = this.instance.config.ui_host) == null ? void 0 : e.replace(/\/$/, "");
        return n || (n = this.apiHost.replace("." + Lu, ".posthog.com")), n === "https://app.posthog.com" ? "https://us.posthog.com" : n
    }
    get region() {
        return this.Ye[this.apiHost] || (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this.Ye[this.apiHost] = Wr.US : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this.Ye[this.apiHost] = Wr.EU : this.Ye[this.apiHost] = Wr.CUSTOM), this.Ye[this.apiHost]
    }
    endpointFor(e, n) {
        if (n === void 0 && (n = ""), n && (n = n[0] === "/" ? n : "/" + n), e === "ui") return this.uiHost + n;
        if (this.region === Wr.CUSTOM) return this.apiHost + n;
        var r = Lu + n;
        switch (e) {
            case "assets":
                return "https://" + this.region + "-assets." + r;
            case "api":
                return "https://" + this.region + "." + r
        }
    }
}
var yw = {
    icontains: (t, e) => !!C && e.href.toLowerCase().indexOf(t.toLowerCase()) > -1,
    not_icontains: (t, e) => !!C && e.href.toLowerCase().indexOf(t.toLowerCase()) === -1,
    regex: (t, e) => !!C && _r(e.href, t),
    not_regex: (t, e) => !!C && !_r(e.href, t),
    exact: (t, e) => e.href === t,
    is_not: (t, e) => e.href !== t
};
class Ke {
    constructor(e) {
        var n = this;
        this.getWebExperimentsAndEvaluateDisplayLogic = function(r) {
            r === void 0 && (r = !1), n.getWebExperiments(s => {
                Ke.Xe("retrieved web experiments from the server"), n.Qe = new Map, s.forEach(i => {
                    if (i.feature_flag_key) {
                        var o;
                        n.Qe && (Ke.Xe("setting flag key ", i.feature_flag_key, " to web experiment ", i), (o = n.Qe) == null || o.set(i.feature_flag_key, i));
                        var a = n._instance.getFeatureFlag(i.feature_flag_key);
                        Le(a) && i.variants[a] && n.Ze(i.name, a, i.variants[a].transforms)
                    } else if (i.variants)
                        for (var l in i.variants) {
                            var c = i.variants[l];
                            Ke.tr(c) && n.Ze(i.name, l, c.transforms)
                        }
                })
            }, r)
        }, this._instance = e, this._instance.onFeatureFlags(r => {
            this.onFeatureFlags(r)
        })
    }
    onFeatureFlags(e) {
        if (this._is_bot()) Ke.Xe("Refusing to render web experiment since the viewer is a likely bot");
        else if (!this._instance.config.disable_web_experiments) {
            if (ke(this.Qe)) return this.Qe = new Map, this.loadIfEnabled(), void this.previewWebExperiment();
            Ke.Xe("applying feature flags", e), e.forEach(n => {
                var r;
                if (this.Qe && (r = this.Qe) != null && r.has(n)) {
                    var s, i = this._instance.getFeatureFlag(n),
                        o = (s = this.Qe) == null ? void 0 : s.get(n);
                    i && o != null && o.variants[i] && this.Ze(o.name, i, o.variants[i].transforms)
                }
            })
        }
    }
    previewWebExperiment() {
        var e = Ke.getWindowLocation();
        if (e != null && e.search) {
            var n = gi(e == null ? void 0 : e.search, "__experiment_id"),
                r = gi(e == null ? void 0 : e.search, "__experiment_variant");
            n && r && (Ke.Xe("previewing web experiments " + n + " && " + r), this.getWebExperiments(s => {
                this.ir(parseInt(n), r, s)
            }, !1, !0))
        }
    }
    loadIfEnabled() {
        this._instance.config.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic()
    }
    getWebExperiments(e, n, r) {
        if (this._instance.config.disable_web_experiments && !r) return e([]);
        var s = this._instance.get_property("$web_experiments");
        if (s && !n) return e(s);
        this._instance.pi({
            url: this._instance.requestRouter.endpointFor("api", "/api/web_experiments/?token=" + this._instance.config.token),
            method: "GET",
            callback: i => {
                if (i.statusCode !== 200 || !i.json) return e([]);
                var o = i.json.experiments || [];
                return e(o)
            }
        })
    }
    ir(e, n, r) {
        var s = r.filter(i => i.id === e);
        s && s.length > 0 && (Ke.Xe("Previewing web experiment [" + s[0].name + "] with variant [" + n + "]"), this.Ze(s[0].name, n, s[0].variants[n].transforms))
    }
    static tr(e) {
        return !ke(e.conditions) && Ke.er(e) && Ke.rr(e)
    }
    static er(e) {
        var n;
        if (ke(e.conditions) || ke((n = e.conditions) == null ? void 0 : n.url)) return !0;
        var r, s, i, o = Ke.getWindowLocation();
        return !!o && ((r = e.conditions) == null || !r.url || yw[(s = (i = e.conditions) == null ? void 0 : i.urlMatchType) !== null && s !== void 0 ? s : "icontains"](e.conditions.url, o))
    }
    static getWindowLocation() {
        return C == null ? void 0 : C.location
    }
    static rr(e) {
        var n;
        if (ke(e.conditions) || ke((n = e.conditions) == null ? void 0 : n.utm)) return !0;
        var r = Id();
        if (r.utm_source) {
            var s, i, o, a, l, c, u, f, h = (s = e.conditions) == null || (s = s.utm) == null || !s.utm_campaign || ((i = e.conditions) == null || (i = i.utm) == null ? void 0 : i.utm_campaign) == r.utm_campaign,
                d = (o = e.conditions) == null || (o = o.utm) == null || !o.utm_source || ((a = e.conditions) == null || (a = a.utm) == null ? void 0 : a.utm_source) == r.utm_source,
                _ = (l = e.conditions) == null || (l = l.utm) == null || !l.utm_medium || ((c = e.conditions) == null || (c = c.utm) == null ? void 0 : c.utm_medium) == r.utm_medium,
                y = (u = e.conditions) == null || (u = u.utm) == null || !u.utm_term || ((f = e.conditions) == null || (f = f.utm) == null ? void 0 : f.utm_term) == r.utm_term;
            return h && _ && y && d
        }
        return !1
    }
    static Xe(e) {
        for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) r[s - 1] = arguments[s];
        V.info("[WebExperiments] " + e, r)
    }
    Ze(e, n, r) {
        this._is_bot() ? Ke.Xe("Refusing to render web experiment since the viewer is a likely bot") : n !== "control" ? r.forEach(s => {
            if (s.selector) {
                var i;
                Ke.Xe("applying transform of variant " + n + " for experiment " + e + " ", s);
                var o = (i = document) == null ? void 0 : i.querySelectorAll(s.selector);
                o == null || o.forEach(a => {
                    var l = a;
                    s.html && (l.innerHTML = s.html), s.css && l.setAttribute("style", s.css)
                })
            }
        }) : Ke.Xe("Control variants leave the page unmodified.")
    }
    _is_bot() {
        return ut && this._instance ? Vd(ut, this._instance.config.custom_blocked_useragents) : void 0
    }
}
var bw = He("[PostHog ExternalIntegrations]"),
    ww = {
        intercom: "intercom-integration",
        crispChat: "crisp-chat-integration"
    };
class Ew {
    constructor(e) {
        this._instance = e
    }
    nt(e, n) {
        var r;
        (r = ee.__PosthogExtensions__) == null || r.loadExternalDependency == null || r.loadExternalDependency(this._instance, e, s => {
            if (s) return bw.error("failed to load script", s);
            n()
        })
    }
    startIfEnabledOrStop() {
        var e = this,
            n = function(o) {
                var a, l, c;
                !s || (a = ee.__PosthogExtensions__) != null && (a = a.integrations) != null && a[o] || e.nt(ww[o], () => {
                    var u;
                    (u = ee.__PosthogExtensions__) == null || (u = u.integrations) == null || (u = u[o]) == null || u.start(e._instance)
                }), !s && (l = ee.__PosthogExtensions__) != null && (l = l.integrations) != null && l[o] && ((c = ee.__PosthogExtensions__) == null || (c = c.integrations) == null || (c = c[o]) == null || c.stop())
            };
        for (var [r, s] of Object.entries((i = this._instance.config.integrations) !== null && i !== void 0 ? i : {})) {
            var i;
            n(r)
        }
    }
}
var Pa = "[SessionRecording]",
    Fr = He(Pa);
class Nu {
    get started() {
        var e;
        return !((e = this.sr) == null || !e.isStarted)
    }
    get status() {
        return this.sr ? this.sr.status : this.nr && !this.ar ? "disabled" : "lazy_loading"
    }
    constructor(e) {
        if (this._forceAllowLocalhostNetworkCapture = !1, this.nr = !1, this.lr = void 0, this._instance = e, !this._instance.sessionManager) throw Fr.error("started without valid sessionManager"), new Error(Pa + " started without valid sessionManager. This is a bug.");
        if (this._instance.config.cookieless_mode === "always") throw new Error(Pa + ' cannot be used with cookieless_mode="always"')
    }
    get ar() {
        var e, n = !((e = this._instance.get_property(ho)) == null || !e.enabled),
            r = !this._instance.config.disable_session_recording,
            s = this._instance.config.disable_session_recording || this._instance.consent.isOptedOut();
        return C && n && r && !s
    }
    startIfEnabledOrStop(e) {
        var n;
        if (!this.ar || (n = this.sr) == null || !n.isStarted) {
            var r = !B(Object.assign) && !B(Array.from);
            this.ar && r ? (this.ur(e), Fr.info("starting")) : this.stopRecording()
        }
    }
    ur(e) {
        var n, r, s;
        this.ar && (ee != null && (n = ee.__PosthogExtensions__) != null && (n = n.rrweb) != null && n.record && (r = ee.__PosthogExtensions__) != null && r.initSessionRecording ? this.hr(e) : (s = ee.__PosthogExtensions__) == null || s.loadExternalDependency == null || s.loadExternalDependency(this._instance, this.dr, i => {
            if (i) return Fr.error("could not load recorder", i);
            this.hr(e)
        }))
    }
    stopRecording() {
        var e, n;
        (e = this.lr) == null || e.call(this), this.lr = void 0, (n = this.sr) == null || n.stop()
    }
    vr() {
        var e;
        (e = this._instance.persistence) == null || e.unregister(Xh)
    }
    cr(e) {
        if (this._instance.persistence) {
            var n, r, s = this._instance.persistence,
                i = () => {
                    var o = e.sessionRecording === !1 ? void 0 : e.sessionRecording,
                        a = o == null ? void 0 : o.sampleRate,
                        l = ke(a) ? null : parseFloat(a);
                    ke(l) && this.vr();
                    var c = o == null ? void 0 : o.minimumDurationMilliseconds;
                    s.register({
                        [ho]: K({
                            enabled: !!o
                        }, o, {
                            networkPayloadCapture: K({
                                capturePerformance: e.capturePerformance
                            }, o == null ? void 0 : o.networkPayloadCapture),
                            canvasRecording: {
                                enabled: o == null ? void 0 : o.recordCanvas,
                                fps: o == null ? void 0 : o.canvasFps,
                                quality: o == null ? void 0 : o.canvasQuality
                            },
                            sampleRate: l,
                            minimumDurationMilliseconds: B(c) ? null : c,
                            endpoint: o == null ? void 0 : o.endpoint,
                            triggerMatchType: o == null ? void 0 : o.triggerMatchType,
                            masking: o == null ? void 0 : o.masking,
                            urlTriggers: o == null ? void 0 : o.urlTriggers
                        })
                    })
                };
            i(), (n = this.lr) == null || n.call(this), this.lr = (r = this._instance.sessionManager) == null ? void 0 : r.onSessionId(i)
        }
    }
    onRemoteConfig(e) {
        "sessionRecording" in e ? e.sessionRecording !== !1 ? (this.cr(e), this.nr = !0, this.startIfEnabledOrStop()) : this.nr = !0 : Fr.info("skipping remote config with no sessionRecording", e)
    }
    log(e, n) {
        var r;
        n === void 0 && (n = "log"), (r = this.sr) != null && r.log ? this.sr.log(e, n) : Fr.warn("log called before recorder was ready")
    }
    get dr() {
        var e, n, r = (e = this._instance) == null || (e = e.persistence) == null ? void 0 : e.get_property(ho);
        return (r == null || (n = r.scriptConfig) == null ? void 0 : n.script) || "lazy-recorder"
    }
    hr(e) {
        var n, r;
        if ((n = ee.__PosthogExtensions__) == null || !n.initSessionRecording) throw Error("Called on script loaded before session recording is available");
        this.sr || (this.sr = (r = ee.__PosthogExtensions__) == null ? void 0 : r.initSessionRecording(this._instance), this.sr._forceAllowLocalhostNetworkCapture = this._forceAllowLocalhostNetworkCapture), this.sr.start(e)
    }
    onRRwebEmit(e) {
        var n;
        (n = this.sr) == null || n.onRRwebEmit == null || n.onRRwebEmit(e)
    }
    overrideLinkedFlag() {
        var e;
        (e = this.sr) == null || e.overrideLinkedFlag()
    }
    overrideSampling() {
        var e;
        (e = this.sr) == null || e.overrideSampling()
    }
    overrideTrigger(e) {
        var n;
        (n = this.sr) == null || n.overrideTrigger(e)
    }
    get sdkDebugProperties() {
        var e;
        return ((e = this.sr) == null ? void 0 : e.sdkDebugProperties) || {
            $recording_status: this.status
        }
    }
    tryAddCustomEvent(e, n) {
        var r;
        return !((r = this.sr) == null || !r.tryAddCustomEvent(e, n))
    }
}
var ts = {},
    Ra = () => {},
    Gn = "posthog",
    Kd = !Xb && (st == null ? void 0 : st.indexOf("MSIE")) === -1 && (st == null ? void 0 : st.indexOf("Mozilla")) === -1,
    Du = t => {
        var e;
        return {
            api_host: "https://us.i.posthog.com",
            ui_host: null,
            token: "",
            autocapture: !0,
            rageclick: !0,
            cross_subdomain_cookie: z0(U == null ? void 0 : U.location),
            persistence: "localStorage+cookie",
            persistence_name: "",
            loaded: Ra,
            save_campaign_params: !0,
            custom_campaign_params: [],
            custom_blocked_useragents: [],
            save_referrer: !0,
            capture_pageview: t !== "2025-05-24" || "history_change",
            capture_pageleave: "if_capture_pageview",
            defaults: t ? ? "unset",
            debug: it && Le(it == null ? void 0 : it.search) && it.search.indexOf("__posthog_debug=true") !== -1 || !1,
            cookie_expiration: 365,
            upgrade: !1,
            disable_session_recording: !1,
            disable_persistence: !1,
            disable_web_experiments: !0,
            disable_surveys: !1,
            disable_surveys_automatic_display: !1,
            disable_external_dependency_loading: !1,
            enable_recording_console_log: void 0,
            secure_cookie: (C == null || (e = C.location) == null ? void 0 : e.protocol) === "https:",
            ip: !1,
            opt_out_capturing_by_default: !1,
            opt_out_persistence_by_default: !1,
            opt_out_useragent_filter: !1,
            opt_out_capturing_persistence_type: "localStorage",
            consent_persistence_name: null,
            opt_out_capturing_cookie_prefix: null,
            opt_in_site_apps: !1,
            property_denylist: [],
            respect_dnt: !1,
            sanitize_properties: null,
            request_headers: {},
            request_batching: !0,
            properties_string_max_length: 65535,
            session_recording: {},
            mask_all_element_attributes: !1,
            mask_all_text: !1,
            mask_personal_data_properties: !1,
            custom_personal_data_properties: [],
            advanced_disable_flags: !1,
            advanced_disable_decide: !1,
            advanced_disable_feature_flags: !1,
            advanced_disable_feature_flags_on_first_load: !1,
            advanced_only_evaluate_survey_feature_flags: !1,
            advanced_enable_surveys: !1,
            advanced_disable_toolbar_metrics: !1,
            feature_flag_request_timeout_ms: 3e3,
            surveys_request_timeout_ms: 1e4,
            on_request_error: n => {
                var r = "Bad HTTP status: " + n.statusCode + " " + n.text;
                V.error(r)
            },
            get_device_id: n => n,
            capture_performance: void 0,
            name: "posthog",
            bootstrap: {},
            disable_compression: !1,
            session_idle_timeout_seconds: 1800,
            person_profiles: "identified_only",
            before_send: void 0,
            request_queue_config: {
                flush_interval_ms: Ta
            },
            error_tracking: {},
            _onCapture: Ra,
            __preview_eager_load_replay: !1
        }
    },
    ju = t => {
        var e = {};
        B(t.process_person) || (e.person_profiles = t.process_person), B(t.xhr_headers) || (e.request_headers = t.xhr_headers), B(t.cookie_name) || (e.persistence_name = t.cookie_name), B(t.disable_cookie) || (e.disable_persistence = t.disable_cookie), B(t.store_google) || (e.save_campaign_params = t.store_google), B(t.verbose) || (e.debug = t.verbose);
        var n = Pe({}, e, t);
        return me(t.property_blacklist) && (B(t.property_denylist) ? n.property_denylist = t.property_blacklist : me(t.property_denylist) ? n.property_denylist = [...t.property_blacklist, ...t.property_denylist] : V.error("Invalid value for property_denylist config: " + t.property_denylist)), n
    };
class xw {
    constructor() {
        this.__forceAllowLocalhost = !1
    }
    get pr() {
        return this.__forceAllowLocalhost
    }
    set pr(e) {
        V.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = e
    }
}
class Vi {
    get decideEndpointWasHit() {
        var e, n;
        return (e = (n = this.featureFlags) == null ? void 0 : n.hasLoadedFlags) !== null && e !== void 0 && e
    }
    get flagsEndpointWasHit() {
        var e, n;
        return (e = (n = this.featureFlags) == null ? void 0 : n.hasLoadedFlags) !== null && e !== void 0 && e
    }
    constructor() {
        this.webPerformance = new xw, this.gr = !1, this.version = Ut.LIB_VERSION, this._r = new wl, this._calculate_event_properties = this.calculateEventProperties.bind(this), this.config = Du(), this.SentryIntegration = bb, this.sentryIntegration = e => function(n, r) {
            var s = gd(n, r);
            return {
                name: pd,
                processEvent: i => s(i)
            }
        }(this, e), this.__request_queue = [], this.__loaded = !1, this.analyticsDefaultEndpoint = "/e/", this.mr = !1, this.yr = null, this.br = null, this.wr = null, this.featureFlags = new tw(this), this.toolbar = new Eb(this), this.scrollManager = new dw(this), this.pageViewManager = new Bb(this), this.surveys = new aw(this), this.experiments = new Ke(this), this.exceptions = new Qb(this), this.rateLimiter = new lw(this), this.requestRouter = new mw(this), this.consent = new pb(this), this.externalIntegrations = new Ew(this), this.people = {
            set: (e, n, r) => {
                var s = Le(e) ? {
                    [e]: n
                } : e;
                this.setPersonProperties(s), r == null || r({})
            },
            set_once: (e, n, r) => {
                var s = Le(e) ? {
                    [e]: n
                } : e;
                this.setPersonProperties(void 0, s), r == null || r({})
            }
        }, this.on("eventCaptured", e => V.info('send "' + (e == null ? void 0 : e.event) + '"', e))
    }
    init(e, n, r) {
        if (r && r !== Gn) {
            var s, i = (s = ts[r]) !== null && s !== void 0 ? s : new Vi;
            return i._init(e, n, r), ts[r] = i, ts[Gn][r] = i, i
        }
        return this._init(e, n, r)
    }
    _init(e, n, r) {
        var s, i;
        if (n === void 0 && (n = {}), B(e) || aa(e)) return V.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
        if (this.__loaded) return console.warn("[PostHog.js]", "You have already initialized PostHog! Re-initializing is a no-op"), this;
        this.__loaded = !0, this.config = {}, n.debug = this.Sr(n.debug), this.Er = n, this.$r = [], n.person_profiles && (this.br = n.person_profiles), this.set_config(Pe({}, Du(n.defaults), ju(n), {
            name: r,
            token: e
        })), this.config.on_xhr_error && V.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = n.disable_compression ? void 0 : Vt.GZipJS;
        var o = this.kr();
        this.persistence = new xo(this.config, o), this.sessionPersistence = this.config.persistence === "sessionStorage" || this.config.persistence === "memory" ? this.persistence : new xo(K({}, this.config, {
            persistence: "sessionStorage"
        }), o);
        var a = K({}, this.persistence.props),
            l = K({}, this.sessionPersistence.props);
        this.register({
            $initialization_time: new Date().toISOString()
        }), this.Pr = new uw(x => this.Tr(x), this.config.request_queue_config), this.Ir = new hw(this), this.__request_queue = [];
        var c = this.config.cookieless_mode === "always" || this.config.cookieless_mode === "on_reject" && this.consent.isExplicitlyOptedOut();
        if (c || (this.sessionManager = new Fu(this), this.sessionPropsManager = new Ou(this, this.sessionManager, this.persistence)), new kb(this).startIfEnabledOrStop(), this.siteApps = new _w(this), (s = this.siteApps) == null || s.init(), c || (this.sessionRecording = new Nu(this), this.sessionRecording.startIfEnabledOrStop()), this.config.disable_scroll_properties || this.scrollManager.startMeasuringScrollPosition(), this.autocapture = new ob(this), this.autocapture.startIfEnabled(), this.surveys.loadIfEnabled(), this.heatmaps = new Ub(this), this.heatmaps.startIfEnabled(), this.webVitalsAutocapture = new jb(this), this.exceptionObserver = new vb(this), this.exceptionObserver.startIfEnabled(), this.deadClicksAutocapture = new dd(this, _b), this.deadClicksAutocapture.startIfEnabled(), this.historyAutocapture = new mb(this), this.historyAutocapture.startIfEnabled(), Ut.DEBUG = Ut.DEBUG || this.config.debug, Ut.DEBUG && V.info("Starting in debug mode", {
                this: this,
                config: n,
                thisC: K({}, this.config),
                p: a,
                s: l
            }), ((i = n.bootstrap) == null ? void 0 : i.distinctID) !== void 0) {
            var u, f, h = this.config.get_device_id(un()),
                d = (u = n.bootstrap) != null && u.isIdentifiedID ? h : n.bootstrap.distinctID;
            this.persistence.set_property(Bt, (f = n.bootstrap) != null && f.isIdentifiedID ? "identified" : "anonymous"), this.register({
                distinct_id: n.bootstrap.distinctID,
                $device_id: d
            })
        }
        if (this.Rr()) {
            var _, y, E = Object.keys(((_ = n.bootstrap) == null ? void 0 : _.featureFlags) || {}).filter(x => {
                    var b;
                    return !((b = n.bootstrap) == null || (b = b.featureFlags) == null || !b[x])
                }).reduce((x, b) => {
                    var S;
                    return x[b] = ((S = n.bootstrap) == null || (S = S.featureFlags) == null ? void 0 : S[b]) || !1, x
                }, {}),
                m = Object.keys(((y = n.bootstrap) == null ? void 0 : y.featureFlagPayloads) || {}).filter(x => E[x]).reduce((x, b) => {
                    var S, $;
                    return (S = n.bootstrap) != null && (S = S.featureFlagPayloads) != null && S[b] && (x[b] = ($ = n.bootstrap) == null || ($ = $.featureFlagPayloads) == null ? void 0 : $[b]), x
                }, {});
            this.featureFlags.receivedFeatureFlags({
                featureFlags: E,
                featureFlagPayloads: m
            })
        }
        if (c) this.register_once({
            distinct_id: Pr,
            $device_id: null
        }, "");
        else if (!this.get_distinct_id()) {
            var g = this.config.get_device_id(un());
            this.register_once({
                distinct_id: g,
                $device_id: g
            }, ""), this.persistence.set_property(Bt, "anonymous")
        }
        return Oe(C, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), {
            passive: !1
        }), this.toolbar.maybeLoadToolbar(), n.segment ? yb(this, () => this.Cr()) : this.Cr(), pn(this.config._onCapture) && this.config._onCapture !== Ra && (V.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", x => this.config._onCapture(x.event, x))), this.config.ip && V.warn('The `ip` config option has NO EFFECT AT ALL and has been deprecated. Use a custom transformation or "Discard IP data" project setting instead. See https://posthog.com/tutorials/web-redact-properties#hiding-customer-ip-address for more information.'), this
    }
    gi(e) {
        var n, r, s, i, o, a, l, c;
        if (!U || !U.body) return V.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout(() => {
            this.gi(e)
        }, 500);
        this.compression = void 0, e.supportedCompression && !this.config.disable_compression && (this.compression = oe(e.supportedCompression, Vt.GZipJS) ? Vt.GZipJS : oe(e.supportedCompression, Vt.Base64) ? Vt.Base64 : void 0), (n = e.analytics) != null && n.endpoint && (this.analyticsDefaultEndpoint = e.analytics.endpoint), this.set_config({
            person_profiles: this.br ? this.br : "identified_only"
        }), (r = this.siteApps) == null || r.onRemoteConfig(e), (s = this.sessionRecording) == null || s.onRemoteConfig(e), (i = this.autocapture) == null || i.onRemoteConfig(e), (o = this.heatmaps) == null || o.onRemoteConfig(e), this.surveys.onRemoteConfig(e), (a = this.webVitalsAutocapture) == null || a.onRemoteConfig(e), (l = this.exceptionObserver) == null || l.onRemoteConfig(e), this.exceptions.onRemoteConfig(e), (c = this.deadClicksAutocapture) == null || c.onRemoteConfig(e)
    }
    Cr() {
        try {
            this.config.loaded(this)
        } catch (e) {
            V.critical("`loaded` function failed", e)
        }
        this.Or(), this.config.capture_pageview && setTimeout(() => {
            (this.consent.isOptedIn() || this.config.cookieless_mode === "always") && this.Fr()
        }, 1), new cw(this).load(), this.featureFlags.flags()
    }
    Or() {
        var e;
        this.is_capturing() && this.config.request_batching && ((e = this.Pr) == null || e.enable())
    }
    _dom_loaded() {
        this.is_capturing() && _n(this.__request_queue, e => this.Tr(e)), this.__request_queue = [], this.Or()
    }
    _handle_unload() {
        var e, n;
        this.config.request_batching ? (this.Mr() && this.capture("$pageleave"), (e = this.Pr) == null || e.unload(), (n = this.Ir) == null || n.unload()) : this.Mr() && this.capture("$pageleave", null, {
            transport: "sendBeacon"
        })
    }
    pi(e) {
        this.__loaded && (Kd ? this.__request_queue.push(e) : this.rateLimiter.isServerRateLimited(e.batchKey) || (e.transport = e.transport || this.config.api_transport, e.url = bi(e.url, {
            ip: this.config.ip ? 1 : 0
        }), e.headers = K({}, this.config.request_headers), e.compression = e.compression === "best-available" ? this.compression : e.compression, e.disableXHRCredentials = this.config.__preview_disable_xhr_credentials, this.config.__preview_disable_beacon && (e.disableTransport = ["sendBeacon"]), e.fetchOptions = e.fetchOptions || this.config.fetch_options, (n => {
            var r, s, i, o = K({}, n);
            o.timeout = o.timeout || 6e4, o.url = bi(o.url, {
                _: new Date().getTime().toString(),
                ver: Ut.LIB_VERSION,
                compression: o.compression
            });
            var a = (r = o.transport) !== null && r !== void 0 ? r : "fetch",
                l = qs.filter(u => !o.disableTransport || !u.transport || !o.disableTransport.includes(u.transport)),
                c = (s = (i = Gh(l, u => u.transport === a)) == null ? void 0 : i.method) !== null && s !== void 0 ? s : l[0].method;
            if (!c) throw new Error("No available transport method");
            c(o)
        })(K({}, e, {
            callback: n => {
                var r, s;
                this.rateLimiter.checkForLimiting(n), n.statusCode >= 400 && ((r = (s = this.config).on_request_error) == null || r.call(s, n)), e.callback == null || e.callback(n)
            }
        }))))
    }
    Tr(e) {
        this.Ir ? this.Ir.retriableRequest(e) : this.pi(e)
    }
    _execute_array(e) {
        var n, r = [],
            s = [],
            i = [];
        _n(e, a => {
            a && (n = a[0], me(n) ? i.push(a) : pn(a) ? a.call(this) : me(a) && n === "alias" ? r.push(a) : me(a) && n.indexOf("capture") !== -1 && pn(this[n]) ? i.push(a) : s.push(a))
        });
        var o = function(a, l) {
            _n(a, function(c) {
                if (me(c[0])) {
                    var u = l;
                    ve(c, function(f) {
                        u = u[f[0]].apply(u, f.slice(1))
                    })
                } else this[c[0]].apply(this, c.slice(1))
            }, l)
        };
        o(r, this), o(s, this), o(i, this)
    }
    Rr() {
        var e, n;
        return ((e = this.config.bootstrap) == null ? void 0 : e.featureFlags) && Object.keys((n = this.config.bootstrap) == null ? void 0 : n.featureFlags).length > 0 || !1
    }
    push(e) {
        this._execute_array([e])
    }
    capture(e, n, r) {
        var s;
        if (this.__loaded && this.persistence && this.sessionPersistence && this.Pr) {
            if (this.is_capturing())
                if (!B(e) && Le(e)) {
                    if (this.config.opt_out_useragent_filter || !this._is_bot()) {
                        var i = r != null && r.skip_client_rate_limiting ? void 0 : this.rateLimiter.clientRateLimitContext();
                        if (i == null || !i.isRateLimited) {
                            n != null && n.$current_url && !Le(n == null ? void 0 : n.$current_url) && (V.error("Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."), n == null || delete n.$current_url), this.sessionPersistence.update_search_keyword(), this.config.save_campaign_params && this.sessionPersistence.update_campaign_params(), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.save_campaign_params || this.config.save_referrer) && this.persistence.set_initial_person_info();
                            var o = new Date,
                                a = (r == null ? void 0 : r.timestamp) || o,
                                l = un(),
                                c = {
                                    uuid: l,
                                    event: e,
                                    properties: this.calculateEventProperties(e, n || {}, a, l)
                                };
                            i && (c.properties.$lib_rate_limit_remaining_tokens = i.remainingTokens), r != null && r.$set && (c.$set = r == null ? void 0 : r.$set);
                            var u, f = this.Ar(r == null ? void 0 : r.$set_once);
                            if (f && (c.$set_once = f), (c = V0(c, r != null && r._noTruncate ? null : this.config.properties_string_max_length)).timestamp = a, B(r == null ? void 0 : r.timestamp) || (c.properties.$event_time_override_provided = !0, c.properties.$event_time_override_system_time = o), e === Ws.DISMISSED || e === Ws.SENT) {
                                var h = n == null ? void 0 : n[Au.SURVEY_ID],
                                    d = n == null ? void 0 : n[Au.SURVEY_ITERATION];
                                u = {
                                    id: h,
                                    current_iteration: d
                                }, localStorage.getItem($u(u)) || localStorage.setItem($u(u), "true"), c.$set = K({}, c.$set, {
                                    [rw({
                                        id: h,
                                        current_iteration: d
                                    }, e === Ws.SENT ? "responded" : "dismissed")]: !0
                                })
                            }
                            var _ = K({}, c.properties.$set, c.$set);
                            if (Jn(_) || this.setPersonPropertiesForFlags(_), !ke(this.config.before_send)) {
                                var y = this.jr(c);
                                if (!y) return;
                                c = y
                            }
                            this._r.emit("eventCaptured", c);
                            var E = {
                                method: "POST",
                                url: (s = r == null ? void 0 : r._url) !== null && s !== void 0 ? s : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint),
                                data: c,
                                compression: "best-available",
                                batchKey: r == null ? void 0 : r._batchKey
                            };
                            return !this.config.request_batching || r && (r == null || !r._batchKey) || r != null && r.send_instantly ? this.Tr(E) : this.Pr.enqueue(E), c
                        }
                        V.critical("This capture call is ignored due to client rate limiting.")
                    }
                } else V.error("No event name provided to posthog.capture")
        } else V.uninitializedWarning("posthog.capture")
    }
    ji(e) {
        return this.on("eventCaptured", n => e(n.event, n))
    }
    calculateEventProperties(e, n, r, s, i) {
        if (r = r || new Date, !this.persistence || !this.sessionPersistence) return n;
        var o = i ? void 0 : this.persistence.remove_event_timer(e),
            a = K({}, n);
        if (a.token = this.config.token, a.$config_defaults = this.config.defaults, (this.config.cookieless_mode == "always" || this.config.cookieless_mode == "on_reject" && this.consent.isExplicitlyOptedOut()) && (a.$cookieless_mode = !0), e === "$snapshot") {
            var l = K({}, this.persistence.properties(), this.sessionPersistence.properties());
            return a.distinct_id = l.distinct_id, (!Le(a.distinct_id) && !Nt(a.distinct_id) || aa(a.distinct_id)) && V.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), a
        }
        var c, u = Db(this.config.mask_personal_data_properties, this.config.custom_personal_data_properties);
        if (this.sessionManager) {
            var {
                sessionId: f,
                windowId: h
            } = this.sessionManager.checkAndGetSessionAndWindowId(i, r.getTime());
            a.$session_id = f, a.$window_id = h
        }
        this.sessionPropsManager && Pe(a, this.sessionPropsManager.getSessionProps());
        try {
            var d;
            this.sessionRecording && Pe(a, this.sessionRecording.sdkDebugProperties), a.$sdk_debug_retry_queue_size = (d = this.Ir) == null ? void 0 : d.length
        } catch (m) {
            a.$sdk_debug_error_capturing_properties = String(m)
        }
        if (this.requestRouter.region === Wr.CUSTOM && (a.$lib_custom_api_host = this.config.api_host), c = e !== "$pageview" || i ? e !== "$pageleave" || i ? this.pageViewManager.doEvent() : this.pageViewManager.doPageLeave(r) : this.pageViewManager.doPageView(r, s), a = Pe(a, c), e === "$pageview" && U && (a.title = U.title), !B(o)) {
            var _ = r.getTime() - o;
            a.$duration = parseFloat((_ / 1e3).toFixed(3))
        }
        st && this.config.opt_out_useragent_filter && (a.$browser_type = this._is_bot() ? "bot" : "browser"), (a = Pe({}, u, this.persistence.properties(), this.sessionPersistence.properties(), a)).$is_identified = this._isIdentified(), me(this.config.property_denylist) ? ve(this.config.property_denylist, function(m) {
            delete a[m]
        }) : V.error("Invalid value for property_denylist config: " + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
        var y = this.config.sanitize_properties;
        y && (V.error("sanitize_properties is deprecated. Use before_send instead"), a = y(a, e));
        var E = this.Dr();
        return a.$process_person_profile = E, E && !i && this.Lr("_calculate_event_properties"), a
    }
    Ar(e) {
        var n;
        if (!this.persistence || !this.Dr() || this.gr) return e;
        var r = this.persistence.get_initial_props(),
            s = (n = this.sessionPropsManager) == null ? void 0 : n.getSetOnceProps(),
            i = Pe({}, r, s || {}, e || {}),
            o = this.config.sanitize_properties;
        return o && (V.error("sanitize_properties is deprecated. Use before_send instead"), i = o(i, "$set_once")), this.gr = !0, Jn(i) ? void 0 : i
    }
    register(e, n) {
        var r;
        (r = this.persistence) == null || r.register(e, n)
    }
    register_once(e, n, r) {
        var s;
        (s = this.persistence) == null || s.register_once(e, n, r)
    }
    register_for_session(e) {
        var n;
        (n = this.sessionPersistence) == null || n.register(e)
    }
    unregister(e) {
        var n;
        (n = this.persistence) == null || n.unregister(e)
    }
    unregister_for_session(e) {
        var n;
        (n = this.sessionPersistence) == null || n.unregister(e)
    }
    Nr(e, n) {
        this.register({
            [e]: n
        })
    }
    getFeatureFlag(e, n) {
        return this.featureFlags.getFeatureFlag(e, n)
    }
    getFeatureFlagPayload(e) {
        var n = this.featureFlags.getFeatureFlagPayload(e);
        try {
            return JSON.parse(n)
        } catch {
            return n
        }
    }
    isFeatureEnabled(e, n) {
        return this.featureFlags.isFeatureEnabled(e, n)
    }
    reloadFeatureFlags() {
        this.featureFlags.reloadFeatureFlags()
    }
    updateEarlyAccessFeatureEnrollment(e, n, r) {
        this.featureFlags.updateEarlyAccessFeatureEnrollment(e, n, r)
    }
    getEarlyAccessFeatures(e, n, r) {
        return n === void 0 && (n = !1), this.featureFlags.getEarlyAccessFeatures(e, n, r)
    }
    on(e, n) {
        return this._r.on(e, n)
    }
    onFeatureFlags(e) {
        return this.featureFlags.onFeatureFlags(e)
    }
    onSurveysLoaded(e) {
        return this.surveys.onSurveysLoaded(e)
    }
    onSessionId(e) {
        var n, r;
        return (n = (r = this.sessionManager) == null ? void 0 : r.onSessionId(e)) !== null && n !== void 0 ? n : () => {}
    }
    getSurveys(e, n) {
        n === void 0 && (n = !1), this.surveys.getSurveys(e, n)
    }
    getActiveMatchingSurveys(e, n) {
        n === void 0 && (n = !1), this.surveys.getActiveMatchingSurveys(e, n)
    }
    renderSurvey(e, n) {
        this.surveys.renderSurvey(e, n)
    }
    displaySurvey(e, n) {
        n === void 0 && (n = iw), this.surveys.displaySurvey(e, n)
    }
    canRenderSurvey(e) {
        return this.surveys.canRenderSurvey(e)
    }
    canRenderSurveyAsync(e, n) {
        return n === void 0 && (n = !1), this.surveys.canRenderSurveyAsync(e, n)
    }
    identify(e, n, r) {
        if (!this.__loaded || !this.persistence) return V.uninitializedWarning("posthog.identify");
        if (Nt(e) && (e = e.toString(), V.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), e)
            if (["distinct_id", "distinctid"].includes(e.toLowerCase())) V.critical('The string "' + e + '" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.');
            else if (e !== Pr) {
            if (this.Lr("posthog.identify")) {
                var s = this.get_distinct_id();
                if (this.register({
                        $user_id: e
                    }), !this.get_property("$device_id")) {
                    var i = s;
                    this.register_once({
                        $had_persisted_distinct_id: !0,
                        $device_id: i
                    }, "")
                }
                e !== s && e !== this.get_property(Dr) && (this.unregister(Dr), this.register({
                    distinct_id: e
                }));
                var o = (this.persistence.get_property(Bt) || "anonymous") === "anonymous";
                e !== s && o ? (this.persistence.set_property(Bt, "identified"), this.setPersonPropertiesForFlags(K({}, r || {}, n || {}), !1), this.capture("$identify", {
                    distinct_id: e,
                    $anon_distinct_id: s
                }, {
                    $set: n || {},
                    $set_once: r || {}
                }), this.wr = Cu(e, n, r), this.featureFlags.setAnonymousDistinctId(s)) : (n || r) && this.setPersonProperties(n, r), e !== s && (this.reloadFeatureFlags(), this.unregister(ui))
            }
        } else V.critical('The string "' + Pr + '" was set in posthog.identify which indicates an error. This ID is only used as a sentinel value.');
        else V.error("Unique user id has not been set in posthog.identify")
    }
    setPersonProperties(e, n) {
        if ((e || n) && this.Lr("posthog.setPersonProperties")) {
            var r = Cu(this.get_distinct_id(), e, n);
            this.wr !== r ? (this.setPersonPropertiesForFlags(K({}, n || {}, e || {})), this.capture("$set", {
                $set: e || {},
                $set_once: n || {}
            }), this.wr = r) : V.info("A duplicate setPersonProperties call was made with the same properties. It has been ignored.")
        }
    }
    group(e, n, r) {
        if (e && n) {
            if (this.Lr("posthog.group")) {
                var s = this.getGroups();
                s[e] !== n && this.resetGroupPropertiesForFlags(e), this.register({
                    $groups: K({}, s, {
                        [e]: n
                    })
                }), r && (this.capture("$groupidentify", {
                    $group_type: e,
                    $group_key: n,
                    $group_set: r
                }), this.setGroupPropertiesForFlags({
                    [e]: r
                })), s[e] === n || r || this.reloadFeatureFlags()
            }
        } else V.error("posthog.group requires a group type and group key")
    }
    resetGroups() {
        this.register({
            $groups: {}
        }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags()
    }
    setPersonPropertiesForFlags(e, n) {
        n === void 0 && (n = !0), this.featureFlags.setPersonPropertiesForFlags(e, n)
    }
    resetPersonPropertiesForFlags() {
        this.featureFlags.resetPersonPropertiesForFlags()
    }
    setGroupPropertiesForFlags(e, n) {
        n === void 0 && (n = !0), this.Lr("posthog.setGroupPropertiesForFlags") && this.featureFlags.setGroupPropertiesForFlags(e, n)
    }
    resetGroupPropertiesForFlags(e) {
        this.featureFlags.resetGroupPropertiesForFlags(e)
    }
    reset(e) {
        var n, r, s, i;
        if (V.info("reset"), !this.__loaded) return V.uninitializedWarning("posthog.reset");
        var o = this.get_property("$device_id");
        if (this.consent.reset(), (n = this.persistence) == null || n.clear(), (r = this.sessionPersistence) == null || r.clear(), this.surveys.reset(), this.featureFlags.reset(), (s = this.persistence) == null || s.set_property(Bt, "anonymous"), (i = this.sessionManager) == null || i.resetSessionId(), this.wr = null, this.config.cookieless_mode === "always") this.register_once({
            distinct_id: Pr,
            $device_id: null
        }, "");
        else {
            var a = this.config.get_device_id(un());
            this.register_once({
                distinct_id: a,
                $device_id: e ? a : o
            }, "")
        }
        this.register({
            $last_posthog_reset: new Date().toISOString()
        }, 1)
    }
    get_distinct_id() {
        return this.get_property("distinct_id")
    }
    getGroups() {
        return this.get_property("$groups") || {}
    }
    get_session_id() {
        var e, n;
        return (e = (n = this.sessionManager) == null ? void 0 : n.checkAndGetSessionAndWindowId(!0).sessionId) !== null && e !== void 0 ? e : ""
    }
    get_session_replay_url(e) {
        if (!this.sessionManager) return "";
        var {
            sessionId: n,
            sessionStartTimestamp: r
        } = this.sessionManager.checkAndGetSessionAndWindowId(!0), s = this.requestRouter.endpointFor("ui", "/project/" + this.config.token + "/replay/" + n);
        if (e != null && e.withTimestamp && r) {
            var i, o = (i = e.timestampLookBack) !== null && i !== void 0 ? i : 10;
            if (!r) return s;
            s += "?t=" + Math.max(Math.floor((new Date().getTime() - r) / 1e3) - o, 0)
        }
        return s
    }
    alias(e, n) {
        return e === this.get_property(Yh) ? (V.critical("Attempting to create alias for existing People user - aborting."), -2) : this.Lr("posthog.alias") ? (B(n) && (n = this.get_distinct_id()), e !== n ? (this.Nr(Dr, e), this.capture("$create_alias", {
            alias: e,
            distinct_id: n
        })) : (V.warn("alias matches current distinct_id - skipping api call."), this.identify(e), -1)) : void 0
    }
    set_config(e) {
        var n = K({}, this.config);
        if (ze(e)) {
            var r, s, i, o, a;
            Pe(this.config, ju(e));
            var l = this.kr();
            (r = this.persistence) == null || r.update_config(this.config, n, l), this.sessionPersistence = this.config.persistence === "sessionStorage" || this.config.persistence === "memory" ? this.persistence : new xo(K({}, this.config, {
                persistence: "sessionStorage"
            }), l);
            var c = this.Sr(this.config.debug);
            gn(c) && (this.config.debug = c), gn(this.config.debug) && (this.config.debug ? (Ut.DEBUG = !0, Se.G() && Se.Y("ph_debug", "true"), V.info("set_config", {
                config: e,
                oldConfig: n,
                newConfig: K({}, this.config)
            })) : (Ut.DEBUG = !1, Se.G() && Se.X("ph_debug"))), (s = this.sessionRecording) == null || s.startIfEnabledOrStop(), (i = this.autocapture) == null || i.startIfEnabled(), (o = this.heatmaps) == null || o.startIfEnabled(), this.surveys.loadIfEnabled(), this.Ur(), (a = this.externalIntegrations) == null || a.startIfEnabledOrStop()
        }
    }
    startSessionRecording(e) {
        var n = e === !0,
            r = {
                sampling: n || !(e == null || !e.sampling),
                linked_flag: n || !(e == null || !e.linked_flag),
                url_trigger: n || !(e == null || !e.url_trigger),
                event_trigger: n || !(e == null || !e.event_trigger)
            };
        if (Object.values(r).some(Boolean)) {
            var s, i, o, a, l;
            (s = this.sessionManager) == null || s.checkAndGetSessionAndWindowId(), r.sampling && ((i = this.sessionRecording) == null || i.overrideSampling()), r.linked_flag && ((o = this.sessionRecording) == null || o.overrideLinkedFlag()), r.url_trigger && ((a = this.sessionRecording) == null || a.overrideTrigger("url")), r.event_trigger && ((l = this.sessionRecording) == null || l.overrideTrigger("event"))
        }
        this.set_config({
            disable_session_recording: !1
        })
    }
    stopSessionRecording() {
        this.set_config({
            disable_session_recording: !0
        })
    }
    sessionRecordingStarted() {
        var e;
        return !((e = this.sessionRecording) == null || !e.started)
    }
    captureException(e, n) {
        var r = new Error("PostHog syntheticException"),
            s = this.exceptions.buildProperties(e, {
                handled: !0,
                syntheticException: r
            });
        return this.exceptions.sendExceptionEvent(K({}, s, n))
    }
    loadToolbar(e) {
        return this.toolbar.loadToolbar(e)
    }
    get_property(e) {
        var n;
        return (n = this.persistence) == null ? void 0 : n.props[e]
    }
    getSessionProperty(e) {
        var n;
        return (n = this.sessionPersistence) == null ? void 0 : n.props[e]
    }
    toString() {
        var e, n = (e = this.config.name) !== null && e !== void 0 ? e : Gn;
        return n !== Gn && (n = Gn + "." + n), n
    }
    _isIdentified() {
        var e, n;
        return ((e = this.persistence) == null ? void 0 : e.get_property(Bt)) === "identified" || ((n = this.sessionPersistence) == null ? void 0 : n.get_property(Bt)) === "identified"
    }
    Dr() {
        var e, n;
        return !(this.config.person_profiles === "never" || this.config.person_profiles === "identified_only" && !this._isIdentified() && Jn(this.getGroups()) && ((e = this.persistence) == null || (e = e.props) == null || !e[Dr]) && ((n = this.persistence) == null || (n = n.props) == null || !n[hi]))
    }
    Mr() {
        return this.config.capture_pageleave === !0 || this.config.capture_pageleave === "if_capture_pageview" && (this.config.capture_pageview === !0 || this.config.capture_pageview === "history_change")
    }
    createPersonProfile() {
        this.Dr() || this.Lr("posthog.createPersonProfile") && this.setPersonProperties({}, {})
    }
    Lr(e) {
        return this.config.person_profiles === "never" ? (V.error(e + ' was called, but process_person is set to "never". This call will be ignored.'), !1) : (this.Nr(hi, !0), !0)
    }
    kr() {
        if (this.config.cookieless_mode === "always") return !0;
        var e = this.consent.isOptedOut(),
            n = this.config.opt_out_persistence_by_default || this.config.cookieless_mode === "on_reject";
        return this.config.disable_persistence || e && !!n
    }
    Ur() {
        var e, n, r, s, i = this.kr();
        return ((e = this.persistence) == null ? void 0 : e.Si) !== i && ((r = this.persistence) == null || r.set_disabled(i)), ((n = this.sessionPersistence) == null ? void 0 : n.Si) !== i && ((s = this.sessionPersistence) == null || s.set_disabled(i)), i
    }
    opt_in_capturing(e) {
        if (this.config.cookieless_mode !== "always") {
            var n, r;
            this.config.cookieless_mode === "on_reject" && this.consent.isExplicitlyOptedOut() && (this.reset(!0), (n = this.sessionManager) == null || n.destroy(), this.sessionManager = new Fu(this), this.persistence && (this.sessionPropsManager = new Ou(this, this.sessionManager, this.persistence)), this.sessionRecording = new Nu(this), this.sessionRecording.startIfEnabledOrStop()), this.consent.optInOut(!0), this.Ur(), this.Or(), this.config.cookieless_mode == "on_reject" && this.surveys.loadIfEnabled(), (B(e == null ? void 0 : e.captureEventName) || e != null && e.captureEventName) && this.capture((r = e == null ? void 0 : e.captureEventName) !== null && r !== void 0 ? r : "$opt_in", e == null ? void 0 : e.captureProperties, {
                send_instantly: !0
            }), this.config.capture_pageview && this.Fr()
        } else V.warn('Consent opt in/out is not valid with cookieless_mode="always" and will be ignored')
    }
    opt_out_capturing() {
        var e, n;
        this.config.cookieless_mode !== "always" ? (this.config.cookieless_mode === "on_reject" && this.consent.isOptedIn() && this.reset(!0), this.consent.optInOut(!1), this.Ur(), this.config.cookieless_mode === "on_reject" && (this.register({
            distinct_id: Pr,
            $device_id: null
        }), (e = this.sessionManager) == null || e.destroy(), this.sessionManager = void 0, this.sessionPropsManager = void 0, (n = this.sessionRecording) == null || n.stopRecording(), this.sessionRecording = void 0, this.Fr())) : V.warn('Consent opt in/out is not valid with cookieless_mode="always" and will be ignored')
    }
    has_opted_in_capturing() {
        return this.consent.isOptedIn()
    }
    has_opted_out_capturing() {
        return this.consent.isOptedOut()
    }
    get_explicit_consent_status() {
        var e = this.consent.consent;
        return e === qt.GRANTED ? "granted" : e === qt.DENIED ? "denied" : "pending"
    }
    is_capturing() {
        return this.config.cookieless_mode === "always" || (this.config.cookieless_mode === "on_reject" ? this.consent.isExplicitlyOptedOut() || this.consent.isOptedIn() : !this.has_opted_out_capturing())
    }
    clear_opt_in_out_capturing() {
        this.consent.reset(), this.Ur()
    }
    _is_bot() {
        return ut ? Vd(ut, this.config.custom_blocked_useragents) : void 0
    }
    Fr() {
        U && (U.visibilityState === "visible" ? this.mr || (this.mr = !0, this.capture("$pageview", {
            title: U.title
        }, {
            send_instantly: !0
        }), this.yr && (U.removeEventListener("visibilitychange", this.yr), this.yr = null)) : this.yr || (this.yr = this.Fr.bind(this), Oe(U, "visibilitychange", this.yr)))
    }
    debug(e) {
        e === !1 ? (C == null || C.console.log("You've disabled debug mode."), this.set_config({
            debug: !1
        })) : (C == null || C.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), this.set_config({
            debug: !0
        }))
    }
    L() {
        var e, n, r, s, i, o, a, l = this.Er || {};
        return "advanced_disable_flags" in l ? !!l.advanced_disable_flags : this.config.advanced_disable_flags !== !1 ? !!this.config.advanced_disable_flags : this.config.advanced_disable_decide === !0 ? (V.warn("Config field 'advanced_disable_decide' is deprecated. Please use 'advanced_disable_flags' instead. The old field will be removed in a future major version."), !0) : (r = "advanced_disable_decide", s = !1, i = V, o = (n = "advanced_disable_flags") in (e = l) && !B(e[n]), a = r in e && !B(e[r]), o ? e[n] : a ? (i && i.warn("Config field '" + r + "' is deprecated. Please use '" + n + "' instead. The old field will be removed in a future major version."), e[r]) : s)
    }
    jr(e) {
        if (ke(this.config.before_send)) return e;
        var n = me(this.config.before_send) ? this.config.before_send : [this.config.before_send],
            r = e;
        for (var s of n) {
            if (r = s(r), ke(r)) {
                var i = "Event '" + e.event + "' was rejected in beforeSend function";
                return m0(e.event) ? V.warn(i + ". This can cause unexpected behavior.") : V.info(i), null
            }
            r.properties && !Jn(r.properties) || V.warn("Event '" + e.event + "' has no properties after beforeSend function, this is likely an error.")
        }
        return r
    }
    getPageViewId() {
        var e;
        return (e = this.pageViewManager.Xt) == null ? void 0 : e.pageViewId
    }
    captureTraceFeedback(e, n) {
        this.capture("$ai_feedback", {
            $ai_trace_id: String(e),
            $ai_feedback_text: n
        })
    }
    captureTraceMetric(e, n, r) {
        this.capture("$ai_metric", {
            $ai_trace_id: String(e),
            $ai_metric_name: n,
            $ai_metric_value: String(r)
        })
    }
    Sr(e) {
        var n = gn(e) && !e,
            r = Se.G() && Se.J("ph_debug") === "true";
        return !n && (!!r || e)
    }
}(function(t, e) {
    for (var n = 0; n < e.length; n++) t.prototype[e[n]] = W0(t.prototype[e[n]])
})(Vi, ["identify"]);
var Hu, kw = (Hu = ts[Gn] = new Vi, function() {
    function t() {
        t.done || (t.done = !0, Kd = !1, ve(ts, function(e) {
            e._dom_loaded()
        }))
    }
    U != null && U.addEventListener ? U.readyState === "complete" ? t() : Oe(U, "DOMContentLoaded", t, {
        capture: !1
    }) : C && V.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized")
}(), Hu);
const Cw = Xt(t => {
        const e = Di(),
            n = kw.init(e.public.posthogPublicKey, {
                api_host: e.public.posthogHost,
                defaults: e.public.posthogDefaults,
                person_profiles: "identified_only",
                loaded: r => {}
            });
        return {
            provide: {
                posthog: () => n
            }
        }
    }),
    Sw = [zm, Jm, o0, a0, l0, f0, h0, p0, Cw],
    Tw = (t, e) => e.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, n => {
        var r;
        return ((r = t.params[n.slice(1)]) == null ? void 0 : r.toString()) || ""
    }),
    Aa = (t, e) => {
        const n = t.route.matched.find(s => {
                var i;
                return ((i = s.components) == null ? void 0 : i.default) === t.Component.type
            }),
            r = e ? ? (n == null ? void 0 : n.meta.key) ? ? (n && Tw(t.route, n));
        return typeof r == "function" ? r(t.route) : r
    },
    Pw = (t, e) => ({
        default: () => t ? ft(vg, t === !0 ? {} : t, e) : e
    }),
    Rw = bn({
        name: "RouteProvider",
        props: {
            vnode: {
                type: Object,
                required: !0
            },
            route: {
                type: Object,
                required: !0
            },
            vnodeRef: Object,
            renderKey: String,
            trackRootNodes: Boolean
        },
        setup(t) {
            const e = t.renderKey,
                n = t.route,
                r = {};
            for (const s in t.route) Object.defineProperty(r, s, {
                get: () => e === t.renderKey ? t.route[s] : n[s]
            });
            return Nn(ys, vs(r)), () => ft(t.vnode, {
                ref: t.vnodeRef
            })
        }
    }),
    zd = (t, e, n) => (e = e === !0 ? {} : e, {
        default: () => {
            var r;
            return e ? ft(t, e, n) : (r = n.default) == null ? void 0 : r.call(n)
        }
    }),
    Aw = bn({
        name: "NuxtPage",
        inheritAttrs: !1,
        props: {
            name: {
                type: String
            },
            transition: {
                type: [Boolean, Object],
                default: void 0
            },
            keepalive: {
                type: [Boolean, Object],
                default: void 0
            },
            route: {
                type: Object
            },
            pageKey: {
                type: [Function, String],
                default: null
            }
        },
        setup(t, {
            attrs: e,
            expose: n
        }) {
            const r = Ne(),
                s = St(),
                i = et(ys, null);
            n({
                pageRef: s
            });
            const o = et(Sh, null);
            let a;
            const l = r.deferHydration();
            return () => ft(jh, {
                name: t.name,
                route: t.route,
                ...e
            }, {
                default: c => {
                    const u = Ow(i, c.route, c.Component),
                        f = i && i.matched.length === c.route.matched.length;
                    if (!c.Component) return a && !f ? a : void 0;
                    if (a && o && !o.isCurrent(c.route)) return a;
                    if (u && i && (!o || o != null && o.isCurrent(i))) return f ? a : null;
                    const h = Aa(c, t.pageKey),
                        d = !!(t.transition ? ? c.route.meta.pageTransition ? ? Jo),
                        _ = d && Iw([t.transition, c.route.meta.pageTransition, Jo, {
                            onAfterLeave: () => {
                                r.callHook("page:transition:finish", c.Component)
                            }
                        }].filter(Boolean));
                    return a = zd(Mi, d && _, Pw(t.keepalive ? ? c.route.meta.keepalive ? ? Im, ft(za, {
                        suspensible: !0,
                        onPending: () => r.callHook("page:start", c.Component),
                        onResolve: () => {
                            Un(() => r.callHook("page:finish", c.Component).finally(l))
                        }
                    }, {
                        default: () => ft(Rw, {
                            key: h,
                            vnode: c.Component,
                            route: c.route,
                            renderKey: h,
                            trackRootNodes: d,
                            vnodeRef: s
                        })
                    }))).default(), a
                }
            })
        }
    });

function $w(t) {
    return Array.isArray(t) ? t : t ? [t] : []
}

function Iw(t) {
    const e = t.map(n => ({ ...n,
        onAfterLeave: $w(n.onAfterLeave)
    }));
    return Dm(...e)
}

function Ow(t, e, n) {
    if (!t) return !1;
    const r = e.matched.findIndex(s => {
        var i;
        return ((i = s.components) == null ? void 0 : i.default) === (n == null ? void 0 : n.type)
    });
    return !r || r === -1 ? !1 : e.matched.slice(0, r).some((s, i) => {
        var o, a, l;
        return ((o = s.components) == null ? void 0 : o.default) !== ((l = (a = t.matched[i]) == null ? void 0 : a.components) == null ? void 0 : l.default)
    }) || n && Aa({
        route: e,
        Component: n
    }) !== Aa({
        route: t,
        Component: n
    })
}
const Fw = bn({
        name: "LayoutLoader",
        inheritAttrs: !1,
        props: {
            name: String,
            layoutProps: Object
        },
        async setup(t, e) {
            const n = await Fn[t.name]().then(r => r.default || r);
            return () => ft(n, t.layoutProps, e.slots)
        }
    }),
    Mw = bn({
        name: "NuxtLayout",
        inheritAttrs: !1,
        props: {
            name: {
                type: [String, Boolean, Object],
                default: null
            }
        },
        setup(t, e) {
            const n = Ne(),
                r = et(ys),
                s = r === Th() ? Zy() : r,
                i = pt(() => xe(t.name) ? ? s.meta.layout ? ? "default"),
                o = St();
            e.expose({
                layoutRef: o
            });
            const a = n.deferHydration();
            return () => {
                const l = i.value && i.value in Fn,
                    c = s.meta.layoutTransition ? ? $m;
                return zd(Mi, l && c, {
                    default: () => ft(za, {
                        suspensible: !0,
                        onResolve: () => {
                            Un(a)
                        }
                    }, {
                        default: () => ft(Lw, {
                            layoutProps: Gf(e.attrs, {
                                ref: o
                            }),
                            key: i.value,
                            name: i.value,
                            shouldProvide: !t.name,
                            hasTransition: !!c
                        }, e.slots)
                    })
                }).default()
            }
        }
    }),
    Lw = bn({
        name: "NuxtLayoutProvider",
        inheritAttrs: !1,
        props: {
            name: {
                type: [String, Boolean]
            },
            layoutProps: {
                type: Object
            },
            hasTransition: {
                type: Boolean
            },
            shouldProvide: {
                type: Boolean
            }
        },
        setup(t, e) {
            const n = t.name;
            return t.shouldProvide && Nn(Sh, {
                isCurrent: r => n === (r.meta.layout ? ? "default")
            }), () => {
                var r, s;
                return !n || typeof n == "string" && !(n in Fn) ? (s = (r = e.slots).default) == null ? void 0 : s.call(r) : ft(Fw, {
                    key: n,
                    layoutProps: t.layoutProps,
                    name: n
                }, e.slots)
            }
        }
    }),
    Nw = (t, e) => {
        const n = t.__vccOpts || t;
        for (const [r, s] of e) n[r] = s;
        return n
    },
    Dw = {};

function jw(t, e) {
    const n = Aw,
        r = Mw;
    return It(), Wt(r, null, {
        default: Va(() => [Te(n)]),
        _: 1
    })
}
const Hw = Nw(Dw, [
        ["render", jw]
    ]),
    Uw = {
        __name: "nuxt-error-page",
        props: {
            error: Object
        },
        setup(t) {
            const n = t.error;
            (n.stack || "").split(`
`).splice(1).map(f => ({
                text: f.replace("webpack:/", "").replace(".vue", ".js").trim(),
                internal: f.includes("node_modules") && !f.includes(".cache") || f.includes("internal") || f.includes("new Promise")
            })).map(f => `<span class="stack${f.internal?" internal":""}">${f.text}</span>`).join(`
`);
            const r = Number(n.statusCode || 500),
                s = r === 404,
                i = n.statusMessage ? ? (s ? "Page Not Found" : "Internal Server Error"),
                o = n.message || n.toString(),
                a = void 0,
                u = s ? Nl(() => qe(() =>
                    import ("./error-404.cbc5eed8.js"), ["./error-404.cbc5eed8.js", "./nuxt-link.ca149e20.js", "./error-404.7fc72018.css"],
                    import.meta.url).then(f => f.default || f)) : Nl(() => qe(() =>
                    import ("./error-500.9eb97b29.js"), ["./error-500.9eb97b29.js", "./error-500.c5df6088.css"],
                    import.meta.url).then(f => f.default || f));
            return (f, h) => (It(), Wt(xe(u), lp(Kf({
                statusCode: xe(r),
                statusMessage: xe(i),
                description: xe(o),
                stack: xe(a)
            })), null, 16))
        }
    },
    Bw = Uw,
    qw = {
        __name: "nuxt-root",
        setup(t) {
            const e = () => null,
                n = Ne(),
                r = n.deferHydration(),
                s = !1;
            Nn(ys, Th()), n.hooks.callHookWith(a => a.map(l => l()), "vue:setup");
            const i = ji();
            Pf((a, l, c) => {
                if (n.hooks.callHook("vue:error", a, l, c).catch(u => console.error("[nuxt] Error in `vue:error` hook", u)), Km(a) && (a.fatal || a.unhandled)) return n.runWithContext(() => Yn(a)), !1
            });
            const o = !1;
            return (a, l) => (It(), Wt(za, {
                onResolve: xe(r)
            }, {
                default: Va(() => [xe(i) ? (It(), Wt(xe(Bw), {
                    key: 0,
                    error: xe(i)
                }, null, 8, ["error"])) : xe(o) ? (It(), Wt(xe(e), {
                    key: 1,
                    context: xe(o)
                }, null, 8, ["context"])) : xe(s) ? (It(), Wt(kg(xe(s)), {
                    key: 2
                })) : (It(), Wt(xe(Hw), {
                    key: 3
                }))]),
                _: 1
            }, 8, ["onResolve"]))
        }
    },
    Uu = qw;
globalThis.$fetch || (globalThis.$fetch = yv.create({
    baseURL: wv()
}));
let Bu; {
    let t;
    Bu = async function() {
        var i, o;
        if (t) return t;
        const r = !!((i = window.__NUXT__) != null && i.serverRendered || ((o = document.getElementById("__NUXT_DATA__")) == null ? void 0 : o.dataset.ssr) === "true") ? T_(Uu) : S_(Uu),
            s = Fv({
                vueApp: r
            });
        try {
            await Lv(s, Sw)
        } catch (a) {
            await s.callHook("app:error", a), s.payload.error = s.payload.error || a
        }
        try {
            await s.hooks.callHook("app:created", r), await s.hooks.callHook("app:beforeMount", r), r.mount(Om), await s.hooks.callHook("app:mounted", r), await Un()
        } catch (a) {
            await s.callHook("app:error", a), s.payload.error = s.payload.error || a
        }
        return r
    }, t = Bu().catch(e => {
        console.error("Error while mounting app:", e)
    })
}
export {
    rl as $, xi as A, iE as B, eE as C, Qw as D, Gf as E, Qe as F, Xw as G, Gt as H, wr as I, Th as J, Ya as K, sE as L, kg as M, Vp as N, yg as O, al as P, Bn as Q, Yw as R, ug as S, Mi as T, ii as U, yh as V, Di as W, u0 as X, co as Y, c0 as Z, Nw as _, Vf as a, Aw as a0, Li as a1, ft as a2, sl as a3, W_ as a4, Wo as a5, nh as a6, oE as a7, nE as a8, Te as b, tE as c, zf as d, zw as e, bn as f, $i as g, Ii as h, Jw as i, Ne as j, xe as k, ki as l, rE as m, Un as n, It as o, Kw as p, pt as q, St as r, rr as s, Vw as t, Rm as u, ss as v, Va as w, Zw as x, Wt as y, Gw as z
};