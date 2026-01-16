var zn = Object.defineProperty;
var Zn = (f, e, t) => e in f ? zn(f, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : f[e] = t;
var Re = (f, e, t) => (Zn(f, typeof e != "symbol" ? e + "" : e, t), t);
import {
    a7 as Vt,
    a8 as ot,
    S as ke,
    L as pe,
    B as Wt,
    a9 as We,
    C as be,
    aa as jn,
    o as st,
    j as ut,
    R as Xn,
    ab as Vn,
    ac as Wn,
    l as it,
    n as kt,
    ad as Yn,
    ae as wt,
    af as Yt,
    ag as Et,
    q as qn,
    r as Qn,
    D as Jn,
    g as Ve,
    d as Me,
    x as qt,
    ah as at,
    V as Ue,
    ai as $n,
    aj as Qt,
    T as Jt,
    ak as es,
    al as ts,
    am as $t,
    an as St,
    ao as ns,
    ap as ht,
    f as ss,
    aq as en,
    ar as rs,
    as as os,
    at as is,
    M as as,
    au as cs,
    e as ls,
    av as us,
    aw as hs,
    G as ft,
    P as fs,
    w as ds,
    O as ps,
    ax as ms,
    ay as gs,
    az as As,
    aA as tn,
    aB as Dt,
    Q as nn,
    N as Ts,
    aC as ws,
    aD as Es,
    aE as Ss,
    k as ys,
    aF as Rs,
    aG as _s,
    aH as xs,
    aI as Is,
    aJ as Ft,
    aK as Ut,
    aL as Pt,
    aM as Ht,
    aN as Ls,
    aO as bs,
    aP as Ms,
    aQ as Ns,
    aR as Cs
} from "./three.module.16edf5a4.js";
const dt = new WeakMap;
class vs extends Vt {
    constructor(e) {
        super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
            position: "POSITION",
            normal: "NORMAL",
            color: "COLOR",
            uv: "TEX_COORD"
        }, this.defaultAttributeTypes = {
            position: "Float32Array",
            normal: "Float32Array",
            color: "Float32Array",
            uv: "Float32Array"
        }
    }
    setDecoderPath(e) {
        return this.decoderPath = e, this
    }
    setDecoderConfig(e) {
        return this.decoderConfig = e, this
    }
    setWorkerLimit(e) {
        return this.workerLimit = e, this
    }
    load(e, t, r, s) {
        const i = new ot(this.manager);
        i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(e, o => {
            this.parse(o, t, s)
        }, r, s)
    }
    parse(e, t, r) {
        this.decodeDracoFile(e, t, null, null, ke).catch(r)
    }
    decodeDracoFile(e, t, r, s, i = pe) {
        const o = {
            attributeIDs: r || this.defaultAttributeIDs,
            attributeTypes: s || this.defaultAttributeTypes,
            useUniqueIDs: !!r,
            vertexColorSpace: i
        };
        return this.decodeGeometry(e, o).then(t)
    }
    decodeGeometry(e, t) {
        const r = JSON.stringify(t);
        if (dt.has(e)) {
            const c = dt.get(e);
            if (c.key === r) return c.promise;
            if (e.byteLength === 0) throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")
        }
        let s;
        const i = this.workerNextTaskID++,
            o = e.byteLength,
            l = this._getWorker(i, o).then(c => (s = c, new Promise((h, p) => {
                s._callbacks[i] = {
                    resolve: h,
                    reject: p
                }, s.postMessage({
                    type: "decode",
                    id: i,
                    taskConfig: t,
                    buffer: e
                }, [e])
            }))).then(c => this._createGeometry(c.geometry));
        return l.catch(() => !0).then(() => {
            s && i && this._releaseTask(s, i)
        }), dt.set(e, {
            key: r,
            promise: l
        }), l
    }
    _createGeometry(e) {
        const t = new Wt;
        e.index && t.setIndex(new We(e.index.array, 1));
        for (let r = 0; r < e.attributes.length; r++) {
            const s = e.attributes[r],
                i = s.name,
                o = s.array,
                l = s.itemSize,
                c = new We(o, l);
            i === "color" && (this._assignVertexColorSpace(c, s.vertexColorSpace), c.normalized = !(o instanceof Float32Array)), t.setAttribute(i, c)
        }
        return t
    }
    _assignVertexColorSpace(e, t) {
        if (t !== ke) return;
        const r = new be;
        for (let s = 0, i = e.count; s < i; s++) r.fromBufferAttribute(e, s).convertSRGBToLinear(), e.setXYZ(s, r.r, r.g, r.b)
    }
    _loadLibrary(e, t) {
        const r = new ot(this.manager);
        return r.setPath(this.decoderPath), r.setResponseType(t), r.setWithCredentials(this.withCredentials), new Promise((s, i) => {
            r.load(e, s, void 0, i)
        })
    }
    preload() {
        return this._initDecoder(), this
    }
    _initDecoder() {
        if (this.decoderPending) return this.decoderPending;
        const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js",
            t = [];
        return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then(r => {
            const s = r[0];
            e || (this.decoderConfig.wasmBinary = r[1]);
            const i = Os.toString(),
                o = ["/* draco decoder */", s, "", "/* worker */", i.substring(i.indexOf("{") + 1, i.lastIndexOf("}"))].join(`
`);
            this.workerSourceURL = URL.createObjectURL(new Blob([o]))
        }), this.decoderPending
    }
    _getWorker(e, t) {
        return this._initDecoder().then(() => {
            if (this.workerPool.length < this.workerLimit) {
                const s = new Worker(this.workerSourceURL);
                s._callbacks = {}, s._taskCosts = {}, s._taskLoad = 0, s.postMessage({
                    type: "init",
                    decoderConfig: this.decoderConfig
                }), s.onmessage = function(i) {
                    const o = i.data;
                    switch (o.type) {
                        case "decode":
                            s._callbacks[o.id].resolve(o);
                            break;
                        case "error":
                            s._callbacks[o.id].reject(o);
                            break;
                        default:
                            console.error('THREE.DRACOLoader: Unexpected message, "' + o.type + '"')
                    }
                }, this.workerPool.push(s)
            } else this.workerPool.sort(function(s, i) {
                return s._taskLoad > i._taskLoad ? -1 : 1
            });
            const r = this.workerPool[this.workerPool.length - 1];
            return r._taskCosts[e] = t, r._taskLoad += t, r
        })
    }
    _releaseTask(e, t) {
        e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t]
    }
    debug() {
        console.log("Task load: ", this.workerPool.map(e => e._taskLoad))
    }
    dispose() {
        for (let e = 0; e < this.workerPool.length; ++e) this.workerPool[e].terminate();
        return this.workerPool.length = 0, this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL), this
    }
}

function Os() {
    let f, e;
    onmessage = function(o) {
        const l = o.data;
        switch (l.type) {
            case "init":
                f = l.decoderConfig, e = new Promise(function(p) {
                    f.onModuleLoaded = function(d) {
                        p({
                            draco: d
                        })
                    }, DracoDecoderModule(f)
                });
                break;
            case "decode":
                const c = l.buffer,
                    h = l.taskConfig;
                e.then(p => {
                    const d = p.draco,
                        A = new d.Decoder;
                    try {
                        const S = t(d, A, new Int8Array(c), h),
                            N = S.attributes.map(k => k.array.buffer);
                        S.index && N.push(S.index.array.buffer), self.postMessage({
                            type: "decode",
                            id: l.id,
                            geometry: S
                        }, N)
                    } catch (S) {
                        console.error(S), self.postMessage({
                            type: "error",
                            id: l.id,
                            error: S.message
                        })
                    } finally {
                        d.destroy(A)
                    }
                });
                break
        }
    };

    function t(o, l, c, h) {
        const p = h.attributeIDs,
            d = h.attributeTypes;
        let A, S;
        const N = l.GetEncodedGeometryType(c);
        if (N === o.TRIANGULAR_MESH) A = new o.Mesh, S = l.DecodeArrayToMesh(c, c.byteLength, A);
        else if (N === o.POINT_CLOUD) A = new o.PointCloud, S = l.DecodeArrayToPointCloud(c, c.byteLength, A);
        else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
        if (!S.ok() || A.ptr === 0) throw new Error("THREE.DRACOLoader: Decoding failed: " + S.error_msg());
        const k = {
            index: null,
            attributes: []
        };
        for (const b in p) {
            const O = self[d[b]];
            let F, Z;
            if (h.useUniqueIDs) Z = p[b], F = l.GetAttributeByUniqueId(A, Z);
            else {
                if (Z = l.GetAttributeId(A, o[p[b]]), Z === -1) continue;
                F = l.GetAttribute(A, Z)
            }
            const B = s(o, l, A, b, O, F);
            b === "color" && (B.vertexColorSpace = h.vertexColorSpace), k.attributes.push(B)
        }
        return N === o.TRIANGULAR_MESH && (k.index = r(o, l, A)), o.destroy(A), k
    }

    function r(o, l, c) {
        const p = c.num_faces() * 3,
            d = p * 4,
            A = o._malloc(d);
        l.GetTrianglesUInt32Array(c, d, A);
        const S = new Uint32Array(o.HEAPF32.buffer, A, p).slice();
        return o._free(A), {
            array: S,
            itemSize: 1
        }
    }

    function s(o, l, c, h, p, d) {
        const A = d.num_components(),
            N = c.num_points() * A,
            k = N * p.BYTES_PER_ELEMENT,
            b = i(o, p),
            O = o._malloc(k);
        l.GetAttributeDataArrayForAllPoints(c, d, b, k, O);
        const F = new p(o.HEAPF32.buffer, O, N).slice();
        return o._free(O), {
            name: h,
            array: F,
            itemSize: A
        }
    }

    function i(o, l) {
        switch (l) {
            case Float32Array:
                return o.DT_FLOAT32;
            case Int8Array:
                return o.DT_INT8;
            case Int16Array:
                return o.DT_INT16;
            case Int32Array:
                return o.DT_INT32;
            case Uint8Array:
                return o.DT_UINT8;
            case Uint16Array:
                return o.DT_UINT16;
            case Uint32Array:
                return o.DT_UINT32
        }
    }
}
/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/
var Bt = function(f) {
    return URL.createObjectURL(new Blob([f], {
        type: "text/javascript"
    }))
};
try {
    URL.revokeObjectURL(Bt(""))
} catch {
    Bt = function(e) {
        return "data:application/javascript;charset=UTF-8," + encodeURI(e)
    }
}
var he = Uint8Array,
    Le = Uint16Array,
    yt = Uint32Array,
    sn = new he([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
    rn = new he([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
    ks = new he([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    on = function(f, e) {
        for (var t = new Le(31), r = 0; r < 31; ++r) t[r] = e += 1 << f[r - 1];
        for (var s = new yt(t[30]), r = 1; r < 30; ++r)
            for (var i = t[r]; i < t[r + 1]; ++i) s[i] = i - t[r] << 5 | r;
        return [t, s]
    },
    an = on(sn, 2),
    cn = an[0],
    Ds = an[1];
cn[28] = 258, Ds[258] = 28;
var Fs = on(rn, 0),
    Us = Fs[0],
    Rt = new Le(32768);
for (var V = 0; V < 32768; ++V) {
    var _e = (V & 43690) >>> 1 | (V & 21845) << 1;
    _e = (_e & 52428) >>> 2 | (_e & 13107) << 2, _e = (_e & 61680) >>> 4 | (_e & 3855) << 4, Rt[V] = ((_e & 65280) >>> 8 | (_e & 255) << 8) >>> 1
}
var Ye = function(f, e, t) {
        for (var r = f.length, s = 0, i = new Le(e); s < r; ++s) ++i[f[s] - 1];
        var o = new Le(e);
        for (s = 0; s < e; ++s) o[s] = o[s - 1] + i[s - 1] << 1;
        var l;
        if (t) {
            l = new Le(1 << e);
            var c = 15 - e;
            for (s = 0; s < r; ++s)
                if (f[s])
                    for (var h = s << 4 | f[s], p = e - f[s], d = o[f[s] - 1]++ << p, A = d | (1 << p) - 1; d <= A; ++d) l[Rt[d] >>> c] = h
        } else
            for (l = new Le(r), s = 0; s < r; ++s) f[s] && (l[s] = Rt[o[f[s] - 1]++] >>> 15 - f[s]);
        return l
    },
    qe = new he(288);
for (var V = 0; V < 144; ++V) qe[V] = 8;
for (var V = 144; V < 256; ++V) qe[V] = 9;
for (var V = 256; V < 280; ++V) qe[V] = 7;
for (var V = 280; V < 288; ++V) qe[V] = 8;
var ln = new he(32);
for (var V = 0; V < 32; ++V) ln[V] = 5;
var Ps = Ye(qe, 9, 1),
    Hs = Ye(ln, 5, 1),
    pt = function(f) {
        for (var e = f[0], t = 1; t < f.length; ++t) f[t] > e && (e = f[t]);
        return e
    },
    fe = function(f, e, t) {
        var r = e / 8 | 0;
        return (f[r] | f[r + 1] << 8) >> (e & 7) & t
    },
    mt = function(f, e) {
        var t = e / 8 | 0;
        return (f[t] | f[t + 1] << 8 | f[t + 2] << 16) >> (e & 7)
    },
    Bs = function(f) {
        return (f / 8 | 0) + (f & 7 && 1)
    },
    Gs = function(f, e, t) {
        (e == null || e < 0) && (e = 0), (t == null || t > f.length) && (t = f.length);
        var r = new(f instanceof Le ? Le : f instanceof yt ? yt : he)(t - e);
        return r.set(f.subarray(e, t)), r
    },
    Ks = function(f, e, t) {
        var r = f.length;
        if (!r || t && !t.l && r < 5) return e || new he(0);
        var s = !e || t,
            i = !t || t.i;
        t || (t = {}), e || (e = new he(r * 3));
        var o = function(z) {
                var Ee = e.length;
                if (z > Ee) {
                    var Se = new he(Math.max(Ee * 2, z));
                    Se.set(e), e = Se
                }
            },
            l = t.f || 0,
            c = t.p || 0,
            h = t.b || 0,
            p = t.l,
            d = t.d,
            A = t.m,
            S = t.n,
            N = r * 8;
        do {
            if (!p) {
                t.f = l = fe(f, c, 1);
                var k = fe(f, c + 1, 3);
                if (c += 3, k)
                    if (k == 1) p = Ps, d = Hs, A = 9, S = 5;
                    else if (k == 2) {
                    var Z = fe(f, c, 31) + 257,
                        B = fe(f, c + 10, 15) + 4,
                        me = Z + fe(f, c + 5, 31) + 1;
                    c += 14;
                    for (var te = new he(me), $ = new he(19), q = 0; q < B; ++q) $[ks[q]] = fe(f, c + q * 3, 7);
                    c += B * 3;
                    for (var oe = pt($), Ne = (1 << oe) - 1, ct = Ye($, oe, 1), q = 0; q < me;) {
                        var ae = ct[fe(f, c, Ne)];
                        c += ae & 15;
                        var b = ae >>> 4;
                        if (b < 16) te[q++] = b;
                        else {
                            var we = 0,
                                ge = 0;
                            for (b == 16 ? (ge = 3 + fe(f, c, 3), c += 2, we = te[q - 1]) : b == 17 ? (ge = 3 + fe(f, c, 7), c += 3) : b == 18 && (ge = 11 + fe(f, c, 127), c += 7); ge--;) te[q++] = we
                        }
                    }
                    var Qe = te.subarray(0, Z),
                        Ae = te.subarray(Z);
                    A = pt(Qe), S = pt(Ae), p = Ye(Qe, A, 1), d = Ye(Ae, S, 1)
                } else throw "invalid block type";
                else {
                    var b = Bs(c) + 4,
                        O = f[b - 4] | f[b - 3] << 8,
                        F = b + O;
                    if (F > r) {
                        if (i) throw "unexpected EOF";
                        break
                    }
                    s && o(h + O), e.set(f.subarray(b, F), h), t.b = h += O, t.p = c = F * 8;
                    continue
                }
                if (c > N) {
                    if (i) throw "unexpected EOF";
                    break
                }
            }
            s && o(h + 131072);
            for (var Je = (1 << A) - 1, $e = (1 << S) - 1, He = c;; He = c) {
                var we = p[mt(f, c) & Je],
                    ne = we >>> 4;
                if (c += we & 15, c > N) {
                    if (i) throw "unexpected EOF";
                    break
                }
                if (!we) throw "invalid length/literal";
                if (ne < 256) e[h++] = ne;
                else if (ne == 256) {
                    He = c, p = null;
                    break
                } else {
                    var De = ne - 254;
                    if (ne > 264) {
                        var q = ne - 257,
                            se = sn[q];
                        De = fe(f, c, (1 << se) - 1) + cn[q], c += se
                    }
                    var Ce = d[mt(f, c) & $e],
                        ve = Ce >>> 4;
                    if (!Ce) throw "invalid distance";
                    c += Ce & 15;
                    var Ae = Us[ve];
                    if (ve > 3) {
                        var se = rn[ve];
                        Ae += mt(f, c) & (1 << se) - 1, c += se
                    }
                    if (c > N) {
                        if (i) throw "unexpected EOF";
                        break
                    }
                    s && o(h + 131072);
                    for (var Be = h + De; h < Be; h += 4) e[h] = e[h - Ae], e[h + 1] = e[h + 1 - Ae], e[h + 2] = e[h + 2 - Ae], e[h + 3] = e[h + 3 - Ae];
                    h = Be
                }
            }
            t.l = p, t.p = He, t.b = h, p && (l = 1, t.m = A, t.d = d, t.n = S)
        } while (!l);
        return h == e.length ? e : Gs(e, 0, h)
    },
    zs = new he(0),
    Zs = function(f) {
        if ((f[0] & 15) != 8 || f[0] >>> 4 > 7 || (f[0] << 8 | f[1]) % 31) throw "invalid zlib data";
        if (f[1] & 32) throw "invalid zlib data: preset dictionaries not supported"
    };

function rt(f, e) {
    return Ks((Zs(f), f.subarray(2, -4)), e)
}
var js = typeof TextDecoder < "u" && new TextDecoder,
    Xs = 0;
try {
    js.decode(zs, {
        stream: !0
    }), Xs = 1
} catch {}
class Vs extends jn {
    constructor(e) {
        super(e), this.type = st
    }
    parse(e) {
        const oe = Math.pow(2.7182818, 2.2);

        function Ne(n, a) {
            let u = 0;
            for (let T = 0; T < 65536; ++T)(T == 0 || n[T >> 3] & 1 << (T & 7)) && (a[u++] = T);
            const m = u - 1;
            for (; u < 65536;) a[u++] = 0;
            return m
        }

        function ct(n) {
            for (let a = 0; a < 16384; a++) n[a] = {}, n[a].len = 0, n[a].lit = 0, n[a].p = null
        }
        const ae = {
            l: 0,
            c: 0,
            lc: 0
        };

        function we(n, a, u, m, T) {
            for (; u < n;) a = a << 8 | vt(m, T), u += 8;
            u -= n, ae.l = a >> u & (1 << n) - 1, ae.c = a, ae.lc = u
        }
        const ge = new Array(59);

        function Qe(n) {
            for (let u = 0; u <= 58; ++u) ge[u] = 0;
            for (let u = 0; u < 65537; ++u) ge[n[u]] += 1;
            let a = 0;
            for (let u = 58; u > 0; --u) {
                const m = a + ge[u] >> 1;
                ge[u] = a, a = m
            }
            for (let u = 0; u < 65537; ++u) {
                const m = n[u];
                m > 0 && (n[u] = m | ge[m]++ << 6)
            }
        }

        function Ae(n, a, u, m, T, g) {
            const E = a;
            let R = 0,
                _ = 0;
            for (; m <= T; m++) {
                if (E.value - a.value > u) return !1;
                we(6, R, _, n, E);
                const w = ae.l;
                if (R = ae.c, _ = ae.lc, g[m] = w, w == 63) {
                    if (E.value - a.value > u) throw new Error("Something wrong with hufUnpackEncTable");
                    we(8, R, _, n, E);
                    let y = ae.l + 6;
                    if (R = ae.c, _ = ae.lc, m + y > T + 1) throw new Error("Something wrong with hufUnpackEncTable");
                    for (; y--;) g[m++] = 0;
                    m--
                } else if (w >= 59) {
                    let y = w - 59 + 2;
                    if (m + y > T + 1) throw new Error("Something wrong with hufUnpackEncTable");
                    for (; y--;) g[m++] = 0;
                    m--
                }
            }
            Qe(g)
        }

        function Je(n) {
            return n & 63
        }

        function $e(n) {
            return n >> 6
        }

        function He(n, a, u, m) {
            for (; a <= u; a++) {
                const T = $e(n[a]),
                    g = Je(n[a]);
                if (T >> g) throw new Error("Invalid table entry");
                if (g > 14) {
                    const E = m[T >> g - 14];
                    if (E.len) throw new Error("Invalid table entry");
                    if (E.lit++, E.p) {
                        const R = E.p;
                        E.p = new Array(E.lit);
                        for (let _ = 0; _ < E.lit - 1; ++_) E.p[_] = R[_]
                    } else E.p = new Array(1);
                    E.p[E.lit - 1] = a
                } else if (g) {
                    let E = 0;
                    for (let R = 1 << 14 - g; R > 0; R--) {
                        const _ = m[(T << 14 - g) + E];
                        if (_.len || _.p) throw new Error("Invalid table entry");
                        _.len = g, _.lit = a, E++
                    }
                }
            }
            return !0
        }
        const ne = {
            c: 0,
            lc: 0
        };

        function De(n, a, u, m) {
            n = n << 8 | vt(u, m), a += 8, ne.c = n, ne.lc = a
        }
        const se = {
            c: 0,
            lc: 0
        };

        function Ce(n, a, u, m, T, g, E, R, _) {
            if (n == a) {
                m < 8 && (De(u, m, T, g), u = ne.c, m = ne.lc), m -= 8;
                let w = u >> m;
                if (w = new Uint8Array([w])[0], R.value + w > _) return !1;
                const y = E[R.value - 1];
                for (; w-- > 0;) E[R.value++] = y
            } else if (R.value < _) E[R.value++] = n;
            else return !1;
            se.c = u, se.lc = m
        }

        function ve(n) {
            return n & 65535
        }

        function Be(n) {
            const a = ve(n);
            return a > 32767 ? a - 65536 : a
        }
        const z = {
            a: 0,
            b: 0
        };

        function Ee(n, a) {
            const u = Be(n),
                T = Be(a),
                g = u + (T & 1) + (T >> 1),
                E = g,
                R = g - T;
            z.a = E, z.b = R
        }

        function Se(n, a) {
            const u = ve(n),
                m = ve(a),
                T = u - (m >> 1) & 65535,
                g = m + T - 32768 & 65535;
            z.a = g, z.b = T
        }

        function dn(n, a, u, m, T, g, E) {
            const R = E < 16384,
                _ = u > T ? T : u;
            let w = 1,
                y, L;
            for (; w <= _;) w <<= 1;
            for (w >>= 1, y = w, w >>= 1; w >= 1;) {
                L = 0;
                const I = L + g * (T - y),
                    v = g * w,
                    D = g * y,
                    M = m * w,
                    C = m * y;
                let U, W, Y, ie;
                for (; L <= I; L += D) {
                    let X = L;
                    const G = L + m * (u - y);
                    for (; X <= G; X += C) {
                        const Q = X + M,
                            le = X + v,
                            J = le + M;
                        R ? (Ee(n[X + a], n[le + a]), U = z.a, Y = z.b, Ee(n[Q + a], n[J + a]), W = z.a, ie = z.b, Ee(U, W), n[X + a] = z.a, n[Q + a] = z.b, Ee(Y, ie), n[le + a] = z.a, n[J + a] = z.b) : (Se(n[X + a], n[le + a]), U = z.a, Y = z.b, Se(n[Q + a], n[J + a]), W = z.a, ie = z.b, Se(U, W), n[X + a] = z.a, n[Q + a] = z.b, Se(Y, ie), n[le + a] = z.a, n[J + a] = z.b)
                    }
                    if (u & w) {
                        const Q = X + v;
                        R ? Ee(n[X + a], n[Q + a]) : Se(n[X + a], n[Q + a]), U = z.a, n[Q + a] = z.b, n[X + a] = U
                    }
                }
                if (T & w) {
                    let X = L;
                    const G = L + m * (u - y);
                    for (; X <= G; X += C) {
                        const Q = X + M;
                        R ? Ee(n[X + a], n[Q + a]) : Se(n[X + a], n[Q + a]), U = z.a, n[Q + a] = z.b, n[X + a] = U
                    }
                }
                y = w, w >>= 1
            }
            return L
        }

        function pn(n, a, u, m, T, g, E, R, _) {
            let w = 0,
                y = 0;
            const L = E,
                I = Math.trunc(m.value + (T + 7) / 8);
            for (; m.value < I;)
                for (De(w, y, u, m), w = ne.c, y = ne.lc; y >= 14;) {
                    const D = w >> y - 14 & 16383,
                        M = a[D];
                    if (M.len) y -= M.len, Ce(M.lit, g, w, y, u, m, R, _, L), w = se.c, y = se.lc;
                    else {
                        if (!M.p) throw new Error("hufDecode issues");
                        let C;
                        for (C = 0; C < M.lit; C++) {
                            const U = Je(n[M.p[C]]);
                            for (; y < U && m.value < I;) De(w, y, u, m), w = ne.c, y = ne.lc;
                            if (y >= U && $e(n[M.p[C]]) == (w >> y - U & (1 << U) - 1)) {
                                y -= U, Ce(M.p[C], g, w, y, u, m, R, _, L), w = se.c, y = se.lc;
                                break
                            }
                        }
                        if (C == M.lit) throw new Error("hufDecode issues")
                    }
                }
            const v = 8 - T & 7;
            for (w >>= v, y -= v; y > 0;) {
                const D = a[w << 14 - y & 16383];
                if (D.len) y -= D.len, Ce(D.lit, g, w, y, u, m, R, _, L), w = se.c, y = se.lc;
                else throw new Error("hufDecode issues")
            }
            return !0
        }

        function It(n, a, u, m, T, g) {
            const E = {
                    value: 0
                },
                R = u.value,
                _ = re(a, u),
                w = re(a, u);
            u.value += 4;
            const y = re(a, u);
            if (u.value += 4, _ < 0 || _ >= 65537 || w < 0 || w >= 65537) throw new Error("Something wrong with HUF_ENCSIZE");
            const L = new Array(65537),
                I = new Array(16384);
            ct(I);
            const v = m - (u.value - R);
            if (Ae(n, u, v, _, w, L), y > 8 * (m - (u.value - R))) throw new Error("Something wrong with hufUncompress");
            He(L, _, w, I), pn(L, I, n, u, y, w, g, T, E)
        }

        function mn(n, a, u) {
            for (let m = 0; m < u; ++m) a[m] = n[a[m]]
        }

        function Lt(n) {
            for (let a = 1; a < n.length; a++) {
                const u = n[a - 1] + n[a] - 128;
                n[a] = u
            }
        }

        function bt(n, a) {
            let u = 0,
                m = Math.floor((n.length + 1) / 2),
                T = 0;
            const g = n.length - 1;
            for (; !(T > g || (a[T++] = n[u++], T > g));) a[T++] = n[m++]
        }

        function Mt(n) {
            let a = n.byteLength;
            const u = new Array;
            let m = 0;
            const T = new DataView(n);
            for (; a > 0;) {
                const g = T.getInt8(m++);
                if (g < 0) {
                    const E = -g;
                    a -= E + 1;
                    for (let R = 0; R < E; R++) u.push(T.getUint8(m++))
                } else {
                    const E = g;
                    a -= 2;
                    const R = T.getUint8(m++);
                    for (let _ = 0; _ < E + 1; _++) u.push(R)
                }
            }
            return u
        }

        function gn(n, a, u, m, T, g) {
            let E = new DataView(g.buffer);
            const R = u[n.idx[0]].width,
                _ = u[n.idx[0]].height,
                w = 3,
                y = Math.floor(R / 8),
                L = Math.ceil(R / 8),
                I = Math.ceil(_ / 8),
                v = R - (L - 1) * 8,
                D = _ - (I - 1) * 8,
                M = {
                    value: 0
                },
                C = new Array(w),
                U = new Array(w),
                W = new Array(w),
                Y = new Array(w),
                ie = new Array(w);
            for (let G = 0; G < w; ++G) ie[G] = a[n.idx[G]], C[G] = G < 1 ? 0 : C[G - 1] + L * I, U[G] = new Float32Array(64), W[G] = new Uint16Array(64), Y[G] = new Uint16Array(L * 64);
            for (let G = 0; G < I; ++G) {
                let Q = 8;
                G == I - 1 && (Q = D);
                let le = 8;
                for (let K = 0; K < L; ++K) {
                    K == L - 1 && (le = v);
                    for (let j = 0; j < w; ++j) W[j].fill(0), W[j][0] = T[C[j]++], An(M, m, W[j]), Tn(W[j], U[j]), wn(U[j]);
                    En(U);
                    for (let j = 0; j < w; ++j) Sn(U[j], Y[j], K * 64)
                }
                let J = 0;
                for (let K = 0; K < w; ++K) {
                    const j = u[n.idx[K]].type;
                    for (let ye = 8 * G; ye < 8 * G + Q; ++ye) {
                        J = ie[K][ye];
                        for (let je = 0; je < y; ++je) {
                            const Te = je * 64 + (ye & 7) * 8;
                            E.setUint16(J + 0 * 2 * j, Y[K][Te + 0], !0), E.setUint16(J + 1 * 2 * j, Y[K][Te + 1], !0), E.setUint16(J + 2 * 2 * j, Y[K][Te + 2], !0), E.setUint16(J + 3 * 2 * j, Y[K][Te + 3], !0), E.setUint16(J + 4 * 2 * j, Y[K][Te + 4], !0), E.setUint16(J + 5 * 2 * j, Y[K][Te + 5], !0), E.setUint16(J + 6 * 2 * j, Y[K][Te + 6], !0), E.setUint16(J + 7 * 2 * j, Y[K][Te + 7], !0), J += 8 * 2 * j
                        }
                    }
                    if (y != L)
                        for (let ye = 8 * G; ye < 8 * G + Q; ++ye) {
                            const je = ie[K][ye] + 8 * y * 2 * j,
                                Te = y * 64 + (ye & 7) * 8;
                            for (let nt = 0; nt < le; ++nt) E.setUint16(je + nt * 2 * j, Y[K][Te + nt], !0)
                        }
                }
            }
            const X = new Uint16Array(R);
            E = new DataView(g.buffer);
            for (let G = 0; G < w; ++G) {
                u[n.idx[G]].decoded = !0;
                const Q = u[n.idx[G]].type;
                if (u[G].type == 2)
                    for (let le = 0; le < _; ++le) {
                        const J = ie[G][le];
                        for (let K = 0; K < R; ++K) X[K] = E.getUint16(J + K * 2 * Q, !0);
                        for (let K = 0; K < R; ++K) E.setFloat32(J + K * 2 * Q, x(X[K]), !0)
                    }
            }
        }

        function An(n, a, u) {
            let m, T = 1;
            for (; T < 64;) m = a[n.value], m == 65280 ? T = 64 : m >> 8 == 255 ? T += m & 255 : (u[T] = m, T++), n.value++
        }

        function Tn(n, a) {
            a[0] = x(n[0]), a[1] = x(n[1]), a[2] = x(n[5]), a[3] = x(n[6]), a[4] = x(n[14]), a[5] = x(n[15]), a[6] = x(n[27]), a[7] = x(n[28]), a[8] = x(n[2]), a[9] = x(n[4]), a[10] = x(n[7]), a[11] = x(n[13]), a[12] = x(n[16]), a[13] = x(n[26]), a[14] = x(n[29]), a[15] = x(n[42]), a[16] = x(n[3]), a[17] = x(n[8]), a[18] = x(n[12]), a[19] = x(n[17]), a[20] = x(n[25]), a[21] = x(n[30]), a[22] = x(n[41]), a[23] = x(n[43]), a[24] = x(n[9]), a[25] = x(n[11]), a[26] = x(n[18]), a[27] = x(n[24]), a[28] = x(n[31]), a[29] = x(n[40]), a[30] = x(n[44]), a[31] = x(n[53]), a[32] = x(n[10]), a[33] = x(n[19]), a[34] = x(n[23]), a[35] = x(n[32]), a[36] = x(n[39]), a[37] = x(n[45]), a[38] = x(n[52]), a[39] = x(n[54]), a[40] = x(n[20]), a[41] = x(n[22]), a[42] = x(n[33]), a[43] = x(n[38]), a[44] = x(n[46]), a[45] = x(n[51]), a[46] = x(n[55]), a[47] = x(n[60]), a[48] = x(n[21]), a[49] = x(n[34]), a[50] = x(n[37]), a[51] = x(n[47]), a[52] = x(n[50]), a[53] = x(n[56]), a[54] = x(n[59]), a[55] = x(n[61]), a[56] = x(n[35]), a[57] = x(n[36]), a[58] = x(n[48]), a[59] = x(n[49]), a[60] = x(n[57]), a[61] = x(n[58]), a[62] = x(n[62]), a[63] = x(n[63])
        }

        function wn(n) {
            const a = .5 * Math.cos(.7853975),
                u = .5 * Math.cos(3.14159 / 16),
                m = .5 * Math.cos(3.14159 / 8),
                T = .5 * Math.cos(3 * 3.14159 / 16),
                g = .5 * Math.cos(5 * 3.14159 / 16),
                E = .5 * Math.cos(3 * 3.14159 / 8),
                R = .5 * Math.cos(7 * 3.14159 / 16),
                _ = new Array(4),
                w = new Array(4),
                y = new Array(4),
                L = new Array(4);
            for (let I = 0; I < 8; ++I) {
                const v = I * 8;
                _[0] = m * n[v + 2], _[1] = E * n[v + 2], _[2] = m * n[v + 6], _[3] = E * n[v + 6], w[0] = u * n[v + 1] + T * n[v + 3] + g * n[v + 5] + R * n[v + 7], w[1] = T * n[v + 1] - R * n[v + 3] - u * n[v + 5] - g * n[v + 7], w[2] = g * n[v + 1] - u * n[v + 3] + R * n[v + 5] + T * n[v + 7], w[3] = R * n[v + 1] - g * n[v + 3] + T * n[v + 5] - u * n[v + 7], y[0] = a * (n[v + 0] + n[v + 4]), y[3] = a * (n[v + 0] - n[v + 4]), y[1] = _[0] + _[3], y[2] = _[1] - _[2], L[0] = y[0] + y[1], L[1] = y[3] + y[2], L[2] = y[3] - y[2], L[3] = y[0] - y[1], n[v + 0] = L[0] + w[0], n[v + 1] = L[1] + w[1], n[v + 2] = L[2] + w[2], n[v + 3] = L[3] + w[3], n[v + 4] = L[3] - w[3], n[v + 5] = L[2] - w[2], n[v + 6] = L[1] - w[1], n[v + 7] = L[0] - w[0]
            }
            for (let I = 0; I < 8; ++I) _[0] = m * n[16 + I], _[1] = E * n[16 + I], _[2] = m * n[48 + I], _[3] = E * n[48 + I], w[0] = u * n[8 + I] + T * n[24 + I] + g * n[40 + I] + R * n[56 + I], w[1] = T * n[8 + I] - R * n[24 + I] - u * n[40 + I] - g * n[56 + I], w[2] = g * n[8 + I] - u * n[24 + I] + R * n[40 + I] + T * n[56 + I], w[3] = R * n[8 + I] - g * n[24 + I] + T * n[40 + I] - u * n[56 + I], y[0] = a * (n[I] + n[32 + I]), y[3] = a * (n[I] - n[32 + I]), y[1] = _[0] + _[3], y[2] = _[1] - _[2], L[0] = y[0] + y[1], L[1] = y[3] + y[2], L[2] = y[3] - y[2], L[3] = y[0] - y[1], n[0 + I] = L[0] + w[0], n[8 + I] = L[1] + w[1], n[16 + I] = L[2] + w[2], n[24 + I] = L[3] + w[3], n[32 + I] = L[3] - w[3], n[40 + I] = L[2] - w[2], n[48 + I] = L[1] - w[1], n[56 + I] = L[0] - w[0]
        }

        function En(n) {
            for (let a = 0; a < 64; ++a) {
                const u = n[0][a],
                    m = n[1][a],
                    T = n[2][a];
                n[0][a] = u + 1.5747 * T, n[1][a] = u - .1873 * m - .4682 * T, n[2][a] = u + 1.8556 * m
            }
        }

        function Sn(n, a, u) {
            for (let m = 0; m < 64; ++m) a[u + m] = kt.toHalfFloat(yn(n[m]))
        }

        function yn(n) {
            return n <= 1 ? Math.sign(n) * Math.pow(Math.abs(n), 2.2) : Math.sign(n) * Math.pow(oe, Math.abs(n) - 1)
        }

        function Nt(n) {
            return new DataView(n.array.buffer, n.offset.value, n.size)
        }

        function Rn(n) {
            const a = n.viewer.buffer.slice(n.offset.value, n.offset.value + n.size),
                u = new Uint8Array(Mt(a)),
                m = new Uint8Array(u.length);
            return Lt(u), bt(u, m), new DataView(m.buffer)
        }

        function lt(n) {
            const a = n.array.slice(n.offset.value, n.offset.value + n.size),
                u = rt(a),
                m = new Uint8Array(u.length);
            return Lt(u), bt(u, m), new DataView(m.buffer)
        }

        function _n(n) {
            const a = n.viewer,
                u = {
                    value: n.offset.value
                },
                m = new Uint16Array(n.width * n.scanlineBlockSize * (n.channels * n.type)),
                T = new Uint8Array(8192);
            let g = 0;
            const E = new Array(n.channels);
            for (let D = 0; D < n.channels; D++) E[D] = {}, E[D].start = g, E[D].end = E[D].start, E[D].nx = n.width, E[D].ny = n.lines, E[D].size = n.type, g += E[D].nx * E[D].ny * E[D].size;
            const R = Ke(a, u),
                _ = Ke(a, u);
            if (_ >= 8192) throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");
            if (R <= _)
                for (let D = 0; D < _ - R + 1; D++) T[D + R] = Fe(a, u);
            const w = new Uint16Array(65536),
                y = Ne(T, w),
                L = re(a, u);
            It(n.array, a, u, L, m, g);
            for (let D = 0; D < n.channels; ++D) {
                const M = E[D];
                for (let C = 0; C < E[D].size; ++C) dn(m, M.start + C, M.nx, M.size, M.ny, M.nx * M.size, y)
            }
            mn(w, m, g);
            let I = 0;
            const v = new Uint8Array(m.buffer.byteLength);
            for (let D = 0; D < n.lines; D++)
                for (let M = 0; M < n.channels; M++) {
                    const C = E[M],
                        U = C.nx * C.size,
                        W = new Uint8Array(m.buffer, C.end * 2, U * 2);
                    v.set(W, I), I += U * 2, C.end += U
                }
            return new DataView(v.buffer)
        }

        function xn(n) {
            const a = n.array.slice(n.offset.value, n.offset.value + n.size),
                u = rt(a),
                m = n.lines * n.channels * n.width,
                T = n.type == 1 ? new Uint16Array(m) : new Uint32Array(m);
            let g = 0,
                E = 0;
            const R = new Array(4);
            for (let _ = 0; _ < n.lines; _++)
                for (let w = 0; w < n.channels; w++) {
                    let y = 0;
                    switch (n.type) {
                        case 1:
                            R[0] = g, R[1] = R[0] + n.width, g = R[1] + n.width;
                            for (let L = 0; L < n.width; ++L) {
                                const I = u[R[0]++] << 8 | u[R[1]++];
                                y += I, T[E] = y, E++
                            }
                            break;
                        case 2:
                            R[0] = g, R[1] = R[0] + n.width, R[2] = R[1] + n.width, g = R[2] + n.width;
                            for (let L = 0; L < n.width; ++L) {
                                const I = u[R[0]++] << 24 | u[R[1]++] << 16 | u[R[2]++] << 8;
                                y += I, T[E] = y, E++
                            }
                            break
                    }
                }
            return new DataView(T.buffer)
        }

        function Ct(n) {
            const a = n.viewer,
                u = {
                    value: n.offset.value
                },
                m = new Uint8Array(n.width * n.lines * (n.channels * n.type * 2)),
                T = {
                    version: ce(a, u),
                    unknownUncompressedSize: ce(a, u),
                    unknownCompressedSize: ce(a, u),
                    acCompressedSize: ce(a, u),
                    dcCompressedSize: ce(a, u),
                    rleCompressedSize: ce(a, u),
                    rleUncompressedSize: ce(a, u),
                    rleRawSize: ce(a, u),
                    totalAcUncompressedCount: ce(a, u),
                    totalDcUncompressedCount: ce(a, u),
                    acCompression: ce(a, u)
                };
            if (T.version < 2) throw new Error("EXRLoader.parse: " + Ze.compression + " version " + T.version + " is unsupported");
            const g = new Array;
            let E = Ke(a, u) - 2;
            for (; E > 0;) {
                const M = et(a.buffer, u),
                    C = Fe(a, u),
                    U = C >> 2 & 3,
                    W = (C >> 4) - 1,
                    Y = new Int8Array([W])[0],
                    ie = Fe(a, u);
                g.push({
                    name: M,
                    index: Y,
                    type: ie,
                    compression: U
                }), E -= M.length + 3
            }
            const R = Ze.channels,
                _ = new Array(n.channels);
            for (let M = 0; M < n.channels; ++M) {
                const C = _[M] = {},
                    U = R[M];
                C.name = U.name, C.compression = 0, C.decoded = !1, C.type = U.pixelType, C.pLinear = U.pLinear, C.width = n.width, C.height = n.lines
            }
            const w = {
                idx: new Array(3)
            };
            for (let M = 0; M < n.channels; ++M) {
                const C = _[M];
                for (let U = 0; U < g.length; ++U) {
                    const W = g[U];
                    C.name == W.name && (C.compression = W.compression, W.index >= 0 && (w.idx[W.index] = M), C.offset = M)
                }
            }
            let y, L, I;
            if (T.acCompressedSize > 0) switch (T.acCompression) {
                case 0:
                    y = new Uint16Array(T.totalAcUncompressedCount), It(n.array, a, u, T.acCompressedSize, y, T.totalAcUncompressedCount);
                    break;
                case 1:
                    const M = n.array.slice(u.value, u.value + T.totalAcUncompressedCount),
                        C = rt(M);
                    y = new Uint16Array(C.buffer), u.value += T.totalAcUncompressedCount;
                    break
            }
            if (T.dcCompressedSize > 0) {
                const M = {
                    array: n.array,
                    offset: u,
                    size: T.dcCompressedSize
                };
                L = new Uint16Array(lt(M).buffer), u.value += T.dcCompressedSize
            }
            if (T.rleRawSize > 0) {
                const M = n.array.slice(u.value, u.value + T.rleCompressedSize),
                    C = rt(M);
                I = Mt(C.buffer), u.value += T.rleCompressedSize
            }
            let v = 0;
            const D = new Array(_.length);
            for (let M = 0; M < D.length; ++M) D[M] = new Array;
            for (let M = 0; M < n.lines; ++M)
                for (let C = 0; C < _.length; ++C) D[C].push(v), v += _[C].width * n.type * 2;
            gn(w, D, _, y, L, m);
            for (let M = 0; M < _.length; ++M) {
                const C = _[M];
                if (!C.decoded) switch (C.compression) {
                    case 2:
                        let U = 0,
                            W = 0;
                        for (let Y = 0; Y < n.lines; ++Y) {
                            let ie = D[M][U];
                            for (let X = 0; X < C.width; ++X) {
                                for (let G = 0; G < 2 * C.type; ++G) m[ie++] = I[W + G * C.width * C.height];
                                W++
                            }
                            U++
                        }
                        break;
                    case 1:
                    default:
                        throw new Error("EXRLoader.parse: unsupported channel compression")
                }
            }
            return new DataView(m.buffer)
        }

        function et(n, a) {
            const u = new Uint8Array(n);
            let m = 0;
            for (; u[a.value + m] != 0;) m += 1;
            const T = new TextDecoder().decode(u.slice(a.value, a.value + m));
            return a.value = a.value + m + 1, T
        }

        function In(n, a, u) {
            const m = new TextDecoder().decode(new Uint8Array(n).slice(a.value, a.value + u));
            return a.value = a.value + u, m
        }

        function Ln(n, a) {
            const u = Ge(n, a),
                m = re(n, a);
            return [u, m]
        }

        function bn(n, a) {
            const u = re(n, a),
                m = re(n, a);
            return [u, m]
        }

        function Ge(n, a) {
            const u = n.getInt32(a.value, !0);
            return a.value = a.value + 4, u
        }

        function re(n, a) {
            const u = n.getUint32(a.value, !0);
            return a.value = a.value + 4, u
        }

        function vt(n, a) {
            const u = n[a.value];
            return a.value = a.value + 1, u
        }

        function Fe(n, a) {
            const u = n.getUint8(a.value);
            return a.value = a.value + 1, u
        }
        const ce = function(n, a) {
            let u;
            return "getBigInt64" in DataView.prototype ? u = Number(n.getBigInt64(a.value, !0)) : u = n.getUint32(a.value + 4, !0) + Number(n.getUint32(a.value, !0) << 32), a.value += 8, u
        };

        function ee(n, a) {
            const u = n.getFloat32(a.value, !0);
            return a.value += 4, u
        }

        function Mn(n, a) {
            return kt.toHalfFloat(ee(n, a))
        }

        function x(n) {
            const a = (n & 31744) >> 10,
                u = n & 1023;
            return (n >> 15 ? -1 : 1) * (a ? a === 31 ? u ? NaN : 1 / 0 : Math.pow(2, a - 15) * (1 + u / 1024) : 6103515625e-14 * (u / 1024))
        }

        function Ke(n, a) {
            const u = n.getUint16(a.value, !0);
            return a.value += 2, u
        }

        function Nn(n, a) {
            return x(Ke(n, a))
        }

        function Cn(n, a, u, m) {
            const T = u.value,
                g = [];
            for (; u.value < T + m - 1;) {
                const E = et(a, u),
                    R = Ge(n, u),
                    _ = Fe(n, u);
                u.value += 3;
                const w = Ge(n, u),
                    y = Ge(n, u);
                g.push({
                    name: E,
                    pixelType: R,
                    pLinear: _,
                    xSampling: w,
                    ySampling: y
                })
            }
            return u.value += 1, g
        }

        function vn(n, a) {
            const u = ee(n, a),
                m = ee(n, a),
                T = ee(n, a),
                g = ee(n, a),
                E = ee(n, a),
                R = ee(n, a),
                _ = ee(n, a),
                w = ee(n, a);
            return {
                redX: u,
                redY: m,
                greenX: T,
                greenY: g,
                blueX: E,
                blueY: R,
                whiteX: _,
                whiteY: w
            }
        }

        function On(n, a) {
            const u = ["NO_COMPRESSION", "RLE_COMPRESSION", "ZIPS_COMPRESSION", "ZIP_COMPRESSION", "PIZ_COMPRESSION", "PXR24_COMPRESSION", "B44_COMPRESSION", "B44A_COMPRESSION", "DWAA_COMPRESSION", "DWAB_COMPRESSION"],
                m = Fe(n, a);
            return u[m]
        }

        function kn(n, a) {
            const u = re(n, a),
                m = re(n, a),
                T = re(n, a),
                g = re(n, a);
            return {
                xMin: u,
                yMin: m,
                xMax: T,
                yMax: g
            }
        }

        function Dn(n, a) {
            const u = ["INCREASING_Y"],
                m = Fe(n, a);
            return u[m]
        }

        function Fn(n, a) {
            const u = ee(n, a),
                m = ee(n, a);
            return [u, m]
        }

        function Un(n, a) {
            const u = ee(n, a),
                m = ee(n, a),
                T = ee(n, a);
            return [u, m, T]
        }

        function Pn(n, a, u, m, T) {
            if (m === "string" || m === "stringvector" || m === "iccProfile") return In(a, u, T);
            if (m === "chlist") return Cn(n, a, u, T);
            if (m === "chromaticities") return vn(n, u);
            if (m === "compression") return On(n, u);
            if (m === "box2i") return kn(n, u);
            if (m === "lineOrder") return Dn(n, u);
            if (m === "float") return ee(n, u);
            if (m === "v2f") return Fn(n, u);
            if (m === "v3f") return Un(n, u);
            if (m === "int") return Ge(n, u);
            if (m === "rational") return Ln(n, u);
            if (m === "timecode") return bn(n, u);
            if (m === "preview") return u.value += T, "skipped";
            u.value += T
        }

        function Hn(n, a, u) {
            const m = {};
            if (n.getUint32(0, !0) != 20000630) throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");
            m.version = n.getUint8(4);
            const T = n.getUint8(5);
            m.spec = {
                singleTile: !!(T & 2),
                longName: !!(T & 4),
                deepFormat: !!(T & 8),
                multiPart: !!(T & 16)
            }, u.value = 8;
            let g = !0;
            for (; g;) {
                const E = et(a, u);
                if (E == 0) g = !1;
                else {
                    const R = et(a, u),
                        _ = re(n, u),
                        w = Pn(n, a, u, R, _);
                    w === void 0 ? console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${R}'.`) : m[E] = w
                }
            }
            if (T & -5) throw console.error("THREE.EXRHeader:", m), new Error("THREE.EXRLoader: Provided file is currently unsupported.");
            return m
        }

        function Bn(n, a, u, m, T) {
            const g = {
                size: 0,
                viewer: a,
                array: u,
                offset: m,
                width: n.dataWindow.xMax - n.dataWindow.xMin + 1,
                height: n.dataWindow.yMax - n.dataWindow.yMin + 1,
                channels: n.channels.length,
                bytesPerLine: null,
                lines: null,
                inputSize: null,
                type: n.channels[0].pixelType,
                uncompress: null,
                getter: null,
                format: null,
                colorSpace: pe
            };
            switch (n.compression) {
                case "NO_COMPRESSION":
                    g.lines = 1, g.uncompress = Nt;
                    break;
                case "RLE_COMPRESSION":
                    g.lines = 1, g.uncompress = Rn;
                    break;
                case "ZIPS_COMPRESSION":
                    g.lines = 1, g.uncompress = lt;
                    break;
                case "ZIP_COMPRESSION":
                    g.lines = 16, g.uncompress = lt;
                    break;
                case "PIZ_COMPRESSION":
                    g.lines = 32, g.uncompress = _n;
                    break;
                case "PXR24_COMPRESSION":
                    g.lines = 16, g.uncompress = xn;
                    break;
                case "DWAA_COMPRESSION":
                    g.lines = 32, g.uncompress = Ct;
                    break;
                case "DWAB_COMPRESSION":
                    g.lines = 256, g.uncompress = Ct;
                    break;
                default:
                    throw new Error("EXRLoader.parse: " + n.compression + " is unsupported")
            }
            if (g.scanlineBlockSize = g.lines, g.type == 1) switch (T) {
                case ut:
                    g.getter = Nn, g.inputSize = 2;
                    break;
                case st:
                    g.getter = Ke, g.inputSize = 2;
                    break
            } else if (g.type == 2) switch (T) {
                case ut:
                    g.getter = ee, g.inputSize = 4;
                    break;
                case st:
                    g.getter = Mn, g.inputSize = 4
            } else throw new Error("EXRLoader.parse: unsupported pixelType " + g.type + " for " + n.compression + ".");
            g.blockCount = (n.dataWindow.yMax + 1) / g.scanlineBlockSize;
            for (let R = 0; R < g.blockCount; R++) ce(a, m);
            g.outputChannels = g.channels == 3 ? 4 : g.channels;
            const E = g.width * g.height * g.outputChannels;
            switch (T) {
                case ut:
                    g.byteArray = new Float32Array(E), g.channels < g.outputChannels && g.byteArray.fill(1, 0, E);
                    break;
                case st:
                    g.byteArray = new Uint16Array(E), g.channels < g.outputChannels && g.byteArray.fill(15360, 0, E);
                    break;
                default:
                    console.error("THREE.EXRLoader: unsupported type: ", T);
                    break
            }
            return g.bytesPerLine = g.width * g.inputSize * g.channels, g.outputChannels == 4 ? (g.format = Xn, g.colorSpace = pe) : (g.format = Vn, g.colorSpace = Wn), g
        }
        const tt = new DataView(e),
            Gn = new Uint8Array(e),
            ze = {
                value: 0
            },
            Ze = Hn(tt, e, ze),
            P = Bn(Ze, tt, Gn, ze, this.type),
            Ot = {
                value: 0
            },
            Kn = {
                R: 0,
                G: 1,
                B: 2,
                A: 3,
                Y: 0
            };
        for (let n = 0; n < P.height / P.scanlineBlockSize; n++) {
            const a = re(tt, ze);
            P.size = re(tt, ze), P.lines = a + P.scanlineBlockSize > P.height ? P.height - a : P.scanlineBlockSize;
            const m = P.size < P.lines * P.bytesPerLine ? P.uncompress(P) : Nt(P);
            ze.value += P.size;
            for (let T = 0; T < P.scanlineBlockSize; T++) {
                const g = T + n * P.scanlineBlockSize;
                if (g >= P.height) break;
                for (let E = 0; E < P.channels; E++) {
                    const R = Kn[Ze.channels[E].name];
                    for (let _ = 0; _ < P.width; _++) {
                        Ot.value = (T * (P.channels * P.width) + E * P.width + _) * P.inputSize;
                        const w = (P.height - 1 - g) * (P.width * P.outputChannels) + _ * P.outputChannels + R;
                        P.byteArray[w] = P.getter(m, Ot)
                    }
                }
            }
        }
        return {
            header: Ze,
            width: P.width,
            height: P.height,
            data: P.byteArray,
            format: P.format,
            colorSpace: P.colorSpace,
            type: this.type
        }
    }
    setDataType(e) {
        return this.type = e, this
    }
    load(e, t, r, s) {
        function i(o, l) {
            o.colorSpace = l.colorSpace, o.minFilter = it, o.magFilter = it, o.generateMipmaps = !1, o.flipY = !1, t && t(o, l)
        }
        return super.load(e, i, r, s)
    }
}

function Gt(f, e) {
    if (e === Yn) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), f;
    if (e === wt || e === Yt) {
        let t = f.getIndex();
        if (t === null) {
            const o = [],
                l = f.getAttribute("position");
            if (l !== void 0) {
                for (let c = 0; c < l.count; c++) o.push(c);
                f.setIndex(o), t = f.getIndex()
            } else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), f
        }
        const r = t.count - 2,
            s = [];
        if (e === wt)
            for (let o = 1; o <= r; o++) s.push(t.getX(0)), s.push(t.getX(o)), s.push(t.getX(o + 1));
        else
            for (let o = 0; o < r; o++) o % 2 === 0 ? (s.push(t.getX(o)), s.push(t.getX(o + 1)), s.push(t.getX(o + 2))) : (s.push(t.getX(o + 2)), s.push(t.getX(o + 1)), s.push(t.getX(o)));
        s.length / 3 !== r && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
        const i = f.clone();
        return i.setIndex(s), i.clearGroups(), i
    } else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), f
}
class Ws extends Vt {
    constructor(e) {
        super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
            return new $s(t)
        }), this.register(function(t) {
            return new ar(t)
        }), this.register(function(t) {
            return new cr(t)
        }), this.register(function(t) {
            return new lr(t)
        }), this.register(function(t) {
            return new tr(t)
        }), this.register(function(t) {
            return new nr(t)
        }), this.register(function(t) {
            return new sr(t)
        }), this.register(function(t) {
            return new rr(t)
        }), this.register(function(t) {
            return new Js(t)
        }), this.register(function(t) {
            return new or(t)
        }), this.register(function(t) {
            return new er(t)
        }), this.register(function(t) {
            return new ir(t)
        }), this.register(function(t) {
            return new qs(t)
        }), this.register(function(t) {
            return new ur(t)
        }), this.register(function(t) {
            return new hr(t)
        })
    }
    load(e, t, r, s) {
        const i = this;
        let o;
        this.resourcePath !== "" ? o = this.resourcePath : this.path !== "" ? o = this.path : o = Et.extractUrlBase(e), this.manager.itemStart(e);
        const l = function(h) {
                s ? s(h) : console.error(h), i.manager.itemError(e), i.manager.itemEnd(e)
            },
            c = new ot(this.manager);
        c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(e, function(h) {
            try {
                i.parse(h, o, function(p) {
                    t(p), i.manager.itemEnd(e)
                }, l)
            } catch (p) {
                l(p)
            }
        }, r, l)
    }
    setDRACOLoader(e) {
        return this.dracoLoader = e, this
    }
    setDDSLoader() {
        throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')
    }
    setKTX2Loader(e) {
        return this.ktx2Loader = e, this
    }
    setMeshoptDecoder(e) {
        return this.meshoptDecoder = e, this
    }
    register(e) {
        return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this
    }
    unregister(e) {
        return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this
    }
    parse(e, t, r, s) {
        let i;
        const o = {},
            l = {},
            c = new TextDecoder;
        if (typeof e == "string") i = JSON.parse(e);
        else if (e instanceof ArrayBuffer)
            if (c.decode(new Uint8Array(e, 0, 4)) === un) {
                try {
                    o[H.KHR_BINARY_GLTF] = new fr(e)
                } catch (d) {
                    s && s(d);
                    return
                }
                i = JSON.parse(o[H.KHR_BINARY_GLTF].content)
            } else i = JSON.parse(c.decode(e));
        else i = e;
        if (i.asset === void 0 || i.asset.version[0] < 2) {
            s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
            return
        }
        const h = new xr(i, {
            path: t || this.resourcePath || "",
            crossOrigin: this.crossOrigin,
            requestHeader: this.requestHeader,
            manager: this.manager,
            ktx2Loader: this.ktx2Loader,
            meshoptDecoder: this.meshoptDecoder
        });
        h.fileLoader.setRequestHeader(this.requestHeader);
        for (let p = 0; p < this.pluginCallbacks.length; p++) {
            const d = this.pluginCallbacks[p](h);
            l[d.name] = d, o[d.name] = !0
        }
        if (i.extensionsUsed)
            for (let p = 0; p < i.extensionsUsed.length; ++p) {
                const d = i.extensionsUsed[p],
                    A = i.extensionsRequired || [];
                switch (d) {
                    case H.KHR_MATERIALS_UNLIT:
                        o[d] = new Qs;
                        break;
                    case H.KHR_DRACO_MESH_COMPRESSION:
                        o[d] = new dr(i, this.dracoLoader);
                        break;
                    case H.KHR_TEXTURE_TRANSFORM:
                        o[d] = new pr;
                        break;
                    case H.KHR_MESH_QUANTIZATION:
                        o[d] = new mr;
                        break;
                    default:
                        A.indexOf(d) >= 0 && l[d] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + d + '".')
                }
            }
        h.setExtensions(o), h.setPlugins(l), h.parse(r, s)
    }
    parseAsync(e, t) {
        const r = this;
        return new Promise(function(s, i) {
            r.parse(e, t, s, i)
        })
    }
}

function Ys() {
    let f = {};
    return {
        get: function(e) {
            return f[e]
        },
        add: function(e, t) {
            f[e] = t
        },
        remove: function(e) {
            delete f[e]
        },
        removeAll: function() {
            f = {}
        }
    }
}
const H = {
    KHR_BINARY_GLTF: "KHR_binary_glTF",
    KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
    KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
    KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
    KHR_MATERIALS_IOR: "KHR_materials_ior",
    KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
    KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
    KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
    KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
    KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
    KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
    KHR_MATERIALS_VOLUME: "KHR_materials_volume",
    KHR_TEXTURE_BASISU: "KHR_texture_basisu",
    KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
    KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
    KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
    EXT_TEXTURE_WEBP: "EXT_texture_webp",
    EXT_TEXTURE_AVIF: "EXT_texture_avif",
    EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
    EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class qs {
    constructor(e) {
        this.parser = e, this.name = H.KHR_LIGHTS_PUNCTUAL, this.cache = {
            refs: {},
            uses: {}
        }
    }
    _markDefs() {
        const e = this.parser,
            t = this.parser.json.nodes || [];
        for (let r = 0, s = t.length; r < s; r++) {
            const i = t[r];
            i.extensions && i.extensions[this.name] && i.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, i.extensions[this.name].light)
        }
    }
    _loadLight(e) {
        const t = this.parser,
            r = "light:" + e;
        let s = t.cache.get(r);
        if (s) return s;
        const i = t.json,
            c = ((i.extensions && i.extensions[this.name] || {}).lights || [])[e];
        let h;
        const p = new be(16777215);
        c.color !== void 0 && p.setRGB(c.color[0], c.color[1], c.color[2], pe);
        const d = c.range !== void 0 ? c.range : 0;
        switch (c.type) {
            case "directional":
                h = new Jn(p), h.target.position.set(0, 0, -1), h.add(h.target);
                break;
            case "point":
                h = new Qn(p), h.distance = d;
                break;
            case "spot":
                h = new qn(p), h.distance = d, c.spot = c.spot || {}, c.spot.innerConeAngle = c.spot.innerConeAngle !== void 0 ? c.spot.innerConeAngle : 0, c.spot.outerConeAngle = c.spot.outerConeAngle !== void 0 ? c.spot.outerConeAngle : Math.PI / 4, h.angle = c.spot.outerConeAngle, h.penumbra = 1 - c.spot.innerConeAngle / c.spot.outerConeAngle, h.target.position.set(0, 0, -1), h.add(h.target);
                break;
            default:
                throw new Error("THREE.GLTFLoader: Unexpected light type: " + c.type)
        }
        return h.position.set(0, 0, 0), h.decay = 2, Ie(h, c), c.intensity !== void 0 && (h.intensity = c.intensity), h.name = t.createUniqueName(c.name || "light_" + e), s = Promise.resolve(h), t.cache.add(r, s), s
    }
    getDependency(e, t) {
        if (e === "light") return this._loadLight(t)
    }
    createNodeAttachment(e) {
        const t = this,
            r = this.parser,
            i = r.json.nodes[e],
            l = (i.extensions && i.extensions[this.name] || {}).light;
        return l === void 0 ? null : this._loadLight(l).then(function(c) {
            return r._getNodeRef(t.cache, l, c)
        })
    }
}
class Qs {
    constructor() {
        this.name = H.KHR_MATERIALS_UNLIT
    }
    getMaterialType() {
        return Ve
    }
    extendParams(e, t, r) {
        const s = [];
        e.color = new be(1, 1, 1), e.opacity = 1;
        const i = t.pbrMetallicRoughness;
        if (i) {
            if (Array.isArray(i.baseColorFactor)) {
                const o = i.baseColorFactor;
                e.color.setRGB(o[0], o[1], o[2], pe), e.opacity = o[3]
            }
            i.baseColorTexture !== void 0 && s.push(r.assignTexture(e, "map", i.baseColorTexture, ke))
        }
        return Promise.all(s)
    }
}
class Js {
    constructor(e) {
        this.parser = e, this.name = H.KHR_MATERIALS_EMISSIVE_STRENGTH
    }
    extendMaterialParams(e, t) {
        const s = this.parser.json.materials[e];
        if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
        const i = s.extensions[this.name].emissiveStrength;
        return i !== void 0 && (t.emissiveIntensity = i), Promise.resolve()
    }
}
class $s {
    constructor(e) {
        this.parser = e, this.name = H.KHR_MATERIALS_CLEARCOAT
    }
    getMaterialType(e) {
        const r = this.parser.json.materials[e];
        return !r.extensions || !r.extensions[this.name] ? null : Me
    }
    extendMaterialParams(e, t) {
        const r = this.parser,
            s = r.json.materials[e];
        if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
        const i = [],
            o = s.extensions[this.name];
        if (o.clearcoatFactor !== void 0 && (t.clearcoat = o.clearcoatFactor), o.clearcoatTexture !== void 0 && i.push(r.assignTexture(t, "clearcoatMap", o.clearcoatTexture)), o.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = o.clearcoatRoughnessFactor), o.clearcoatRoughnessTexture !== void 0 && i.push(r.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), o.clearcoatNormalTexture !== void 0 && (i.push(r.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)), o.clearcoatNormalTexture.scale !== void 0)) {
            const l = o.clearcoatNormalTexture.scale;
            t.clearcoatNormalScale = new qt(l, l)
        }
        return Promise.all(i)
    }
}
class er {
    constructor(e) {
        this.parser = e, this.name = H.KHR_MATERIALS_IRIDESCENCE
    }
    getMaterialType(e) {
        const r = this.parser.json.materials[e];
        return !r.extensions || !r.extensions[this.name] ? null : Me
    }
    extendMaterialParams(e, t) {
        const r = this.parser,
            s = r.json.materials[e];
        if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
        const i = [],
            o = s.extensions[this.name];
        return o.iridescenceFactor !== void 0 && (t.iridescence = o.iridescenceFactor), o.iridescenceTexture !== void 0 && i.push(r.assignTexture(t, "iridescenceMap", o.iridescenceTexture)), o.iridescenceIor !== void 0 && (t.iridescenceIOR = o.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), o.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum), o.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum), o.iridescenceThicknessTexture !== void 0 && i.push(r.assignTexture(t, "iridescenceThicknessMap", o.iridescenceThicknessTexture)), Promise.all(i)
    }
}
class tr {
    constructor(e) {
        this.parser = e, this.name = H.KHR_MATERIALS_SHEEN
    }
    getMaterialType(e) {
        const r = this.parser.json.materials[e];
        return !r.extensions || !r.extensions[this.name] ? null : Me
    }
    extendMaterialParams(e, t) {
        const r = this.parser,
            s = r.json.materials[e];
        if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
        const i = [];
        t.sheenColor = new be(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
        const o = s.extensions[this.name];
        if (o.sheenColorFactor !== void 0) {
            const l = o.sheenColorFactor;
            t.sheenColor.setRGB(l[0], l[1], l[2], pe)
        }
        return o.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = o.sheenRoughnessFactor), o.sheenColorTexture !== void 0 && i.push(r.assignTexture(t, "sheenColorMap", o.sheenColorTexture, ke)), o.sheenRoughnessTexture !== void 0 && i.push(r.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(i)
    }
}
class nr {
    constructor(e) {
        this.parser = e, this.name = H.KHR_MATERIALS_TRANSMISSION
    }
    getMaterialType(e) {
        const r = this.parser.json.materials[e];
        return !r.extensions || !r.extensions[this.name] ? null : Me
    }
    extendMaterialParams(e, t) {
        const r = this.parser,
            s = r.json.materials[e];
        if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
        const i = [],
            o = s.extensions[this.name];
        return o.transmissionFactor !== void 0 && (t.transmission = o.transmissionFactor), o.transmissionTexture !== void 0 && i.push(r.assignTexture(t, "transmissionMap", o.transmissionTexture)), Promise.all(i)
    }
}
class sr {
    constructor(e) {
        this.parser = e, this.name = H.KHR_MATERIALS_VOLUME
    }
    getMaterialType(e) {
        const r = this.parser.json.materials[e];
        return !r.extensions || !r.extensions[this.name] ? null : Me
    }
    extendMaterialParams(e, t) {
        const r = this.parser,
            s = r.json.materials[e];
        if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
        const i = [],
            o = s.extensions[this.name];
        t.thickness = o.thicknessFactor !== void 0 ? o.thicknessFactor : 0, o.thicknessTexture !== void 0 && i.push(r.assignTexture(t, "thicknessMap", o.thicknessTexture)), t.attenuationDistance = o.attenuationDistance || 1 / 0;
        const l = o.attenuationColor || [1, 1, 1];
        return t.attenuationColor = new be().setRGB(l[0], l[1], l[2], pe), Promise.all(i)
    }
}
class rr {
    constructor(e) {
        this.parser = e, this.name = H.KHR_MATERIALS_IOR
    }
    getMaterialType(e) {
        const r = this.parser.json.materials[e];
        return !r.extensions || !r.extensions[this.name] ? null : Me
    }
    extendMaterialParams(e, t) {
        const s = this.parser.json.materials[e];
        if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
        const i = s.extensions[this.name];
        return t.ior = i.ior !== void 0 ? i.ior : 1.5, Promise.resolve()
    }
}
class or {
    constructor(e) {
        this.parser = e, this.name = H.KHR_MATERIALS_SPECULAR
    }
    getMaterialType(e) {
        const r = this.parser.json.materials[e];
        return !r.extensions || !r.extensions[this.name] ? null : Me
    }
    extendMaterialParams(e, t) {
        const r = this.parser,
            s = r.json.materials[e];
        if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
        const i = [],
            o = s.extensions[this.name];
        t.specularIntensity = o.specularFactor !== void 0 ? o.specularFactor : 1, o.specularTexture !== void 0 && i.push(r.assignTexture(t, "specularIntensityMap", o.specularTexture));
        const l = o.specularColorFactor || [1, 1, 1];
        return t.specularColor = new be().setRGB(l[0], l[1], l[2], pe), o.specularColorTexture !== void 0 && i.push(r.assignTexture(t, "specularColorMap", o.specularColorTexture, ke)), Promise.all(i)
    }
}
class ir {
    constructor(e) {
        this.parser = e, this.name = H.KHR_MATERIALS_ANISOTROPY
    }
    getMaterialType(e) {
        const r = this.parser.json.materials[e];
        return !r.extensions || !r.extensions[this.name] ? null : Me
    }
    extendMaterialParams(e, t) {
        const r = this.parser,
            s = r.json.materials[e];
        if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
        const i = [],
            o = s.extensions[this.name];
        return o.anisotropyStrength !== void 0 && (t.anisotropy = o.anisotropyStrength), o.anisotropyRotation !== void 0 && (t.anisotropyRotation = o.anisotropyRotation), o.anisotropyTexture !== void 0 && i.push(r.assignTexture(t, "anisotropyMap", o.anisotropyTexture)), Promise.all(i)
    }
}
class ar {
    constructor(e) {
        this.parser = e, this.name = H.KHR_TEXTURE_BASISU
    }
    loadTexture(e) {
        const t = this.parser,
            r = t.json,
            s = r.textures[e];
        if (!s.extensions || !s.extensions[this.name]) return null;
        const i = s.extensions[this.name],
            o = t.options.ktx2Loader;
        if (!o) {
            if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
            return null
        }
        return t.loadTextureImage(e, i.source, o)
    }
}
class cr {
    constructor(e) {
        this.parser = e, this.name = H.EXT_TEXTURE_WEBP, this.isSupported = null
    }
    loadTexture(e) {
        const t = this.name,
            r = this.parser,
            s = r.json,
            i = s.textures[e];
        if (!i.extensions || !i.extensions[t]) return null;
        const o = i.extensions[t],
            l = s.images[o.source];
        let c = r.textureLoader;
        if (l.uri) {
            const h = r.options.manager.getHandler(l.uri);
            h !== null && (c = h)
        }
        return this.detectSupport().then(function(h) {
            if (h) return r.loadTextureImage(e, o.source, c);
            if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0) throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
            return r.loadTexture(e)
        })
    }
    detectSupport() {
        return this.isSupported || (this.isSupported = new Promise(function(e) {
            const t = new Image;
            t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function() {
                e(t.height === 1)
            }
        })), this.isSupported
    }
}
class lr {
    constructor(e) {
        this.parser = e, this.name = H.EXT_TEXTURE_AVIF, this.isSupported = null
    }
    loadTexture(e) {
        const t = this.name,
            r = this.parser,
            s = r.json,
            i = s.textures[e];
        if (!i.extensions || !i.extensions[t]) return null;
        const o = i.extensions[t],
            l = s.images[o.source];
        let c = r.textureLoader;
        if (l.uri) {
            const h = r.options.manager.getHandler(l.uri);
            h !== null && (c = h)
        }
        return this.detectSupport().then(function(h) {
            if (h) return r.loadTextureImage(e, o.source, c);
            if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0) throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
            return r.loadTexture(e)
        })
    }
    detectSupport() {
        return this.isSupported || (this.isSupported = new Promise(function(e) {
            const t = new Image;
            t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function() {
                e(t.height === 1)
            }
        })), this.isSupported
    }
}
class ur {
    constructor(e) {
        this.name = H.EXT_MESHOPT_COMPRESSION, this.parser = e
    }
    loadBufferView(e) {
        const t = this.parser.json,
            r = t.bufferViews[e];
        if (r.extensions && r.extensions[this.name]) {
            const s = r.extensions[this.name],
                i = this.parser.getDependency("buffer", s.buffer),
                o = this.parser.options.meshoptDecoder;
            if (!o || !o.supported) {
                if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
                return null
            }
            return i.then(function(l) {
                const c = s.byteOffset || 0,
                    h = s.byteLength || 0,
                    p = s.count,
                    d = s.byteStride,
                    A = new Uint8Array(l, c, h);
                return o.decodeGltfBufferAsync ? o.decodeGltfBufferAsync(p, d, A, s.mode, s.filter).then(function(S) {
                    return S.buffer
                }) : o.ready.then(function() {
                    const S = new ArrayBuffer(p * d);
                    return o.decodeGltfBuffer(new Uint8Array(S), p, d, A, s.mode, s.filter), S
                })
            })
        } else return null
    }
}
class hr {
    constructor(e) {
        this.name = H.EXT_MESH_GPU_INSTANCING, this.parser = e
    }
    createNodeMesh(e) {
        const t = this.parser.json,
            r = t.nodes[e];
        if (!r.extensions || !r.extensions[this.name] || r.mesh === void 0) return null;
        const s = t.meshes[r.mesh];
        for (const h of s.primitives)
            if (h.mode !== ue.TRIANGLES && h.mode !== ue.TRIANGLE_STRIP && h.mode !== ue.TRIANGLE_FAN && h.mode !== void 0) return null;
        const o = r.extensions[this.name].attributes,
            l = [],
            c = {};
        for (const h in o) l.push(this.parser.getDependency("accessor", o[h]).then(p => (c[h] = p, c[h])));
        return l.length < 1 ? null : (l.push(this.parser.createNodeMesh(e)), Promise.all(l).then(h => {
            const p = h.pop(),
                d = p.isGroup ? p.children : [p],
                A = h[0].count,
                S = [];
            for (const N of d) {
                const k = new at,
                    b = new Ue,
                    O = new nn,
                    F = new Ue(1, 1, 1),
                    Z = new $n(N.geometry, N.material, A);
                for (let B = 0; B < A; B++) c.TRANSLATION && b.fromBufferAttribute(c.TRANSLATION, B), c.ROTATION && O.fromBufferAttribute(c.ROTATION, B), c.SCALE && F.fromBufferAttribute(c.SCALE, B), Z.setMatrixAt(B, k.compose(b, O, F));
                for (const B in c) B !== "TRANSLATION" && B !== "ROTATION" && B !== "SCALE" && N.geometry.setAttribute(B, c[B]);
                Qt.prototype.copy.call(Z, N), this.parser.assignFinalMaterial(Z), S.push(Z)
            }
            return p.isGroup ? (p.clear(), p.add(...S), p) : S[0]
        }))
    }
}
const un = "glTF",
    Xe = 12,
    Kt = {
        JSON: 1313821514,
        BIN: 5130562
    };
class fr {
    constructor(e) {
        this.name = H.KHR_BINARY_GLTF, this.content = null, this.body = null;
        const t = new DataView(e, 0, Xe),
            r = new TextDecoder;
        if (this.header = {
                magic: r.decode(new Uint8Array(e.slice(0, 4))),
                version: t.getUint32(4, !0),
                length: t.getUint32(8, !0)
            }, this.header.magic !== un) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
        if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
        const s = this.header.length - Xe,
            i = new DataView(e, Xe);
        let o = 0;
        for (; o < s;) {
            const l = i.getUint32(o, !0);
            o += 4;
            const c = i.getUint32(o, !0);
            if (o += 4, c === Kt.JSON) {
                const h = new Uint8Array(e, Xe + o, l);
                this.content = r.decode(h)
            } else if (c === Kt.BIN) {
                const h = Xe + o;
                this.body = e.slice(h, h + l)
            }
            o += l
        }
        if (this.content === null) throw new Error("THREE.GLTFLoader: JSON content not found.")
    }
}
class dr {
    constructor(e, t) {
        if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
        this.name = H.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload()
    }
    decodePrimitive(e, t) {
        const r = this.json,
            s = this.dracoLoader,
            i = e.extensions[this.name].bufferView,
            o = e.extensions[this.name].attributes,
            l = {},
            c = {},
            h = {};
        for (const p in o) {
            const d = _t[p] || p.toLowerCase();
            l[d] = o[p]
        }
        for (const p in e.attributes) {
            const d = _t[p] || p.toLowerCase();
            if (o[p] !== void 0) {
                const A = r.accessors[e.attributes[p]],
                    S = Pe[A.componentType];
                h[d] = S.name, c[d] = A.normalized === !0
            }
        }
        return t.getDependency("bufferView", i).then(function(p) {
            return new Promise(function(d) {
                s.decodeDracoFile(p, function(A) {
                    for (const S in A.attributes) {
                        const N = A.attributes[S],
                            k = c[S];
                        k !== void 0 && (N.normalized = k)
                    }
                    d(A)
                }, l, h)
            })
        })
    }
}
class pr {
    constructor() {
        this.name = H.KHR_TEXTURE_TRANSFORM
    }
    extendTexture(e, t) {
        return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e
    }
}
class mr {
    constructor() {
        this.name = H.KHR_MESH_QUANTIZATION
    }
}
class hn extends Ms {
    constructor(e, t, r, s) {
        super(e, t, r, s)
    }
    copySampleValue_(e) {
        const t = this.resultBuffer,
            r = this.sampleValues,
            s = this.valueSize,
            i = e * s * 3 + s;
        for (let o = 0; o !== s; o++) t[o] = r[i + o];
        return t
    }
    interpolate_(e, t, r, s) {
        const i = this.resultBuffer,
            o = this.sampleValues,
            l = this.valueSize,
            c = l * 2,
            h = l * 3,
            p = s - t,
            d = (r - t) / p,
            A = d * d,
            S = A * d,
            N = e * h,
            k = N - h,
            b = -2 * S + 3 * A,
            O = S - A,
            F = 1 - b,
            Z = O - A + d;
        for (let B = 0; B !== l; B++) {
            const me = o[k + B + l],
                te = o[k + B + c] * p,
                $ = o[N + B + l],
                q = o[N + B] * p;
            i[B] = F * me + Z * te + b * $ + O * q
        }
        return i
    }
}
const gr = new nn;
class Ar extends hn {
    interpolate_(e, t, r, s) {
        const i = super.interpolate_(e, t, r, s);
        return gr.fromArray(i).normalize().toArray(i), i
    }
}
const ue = {
        FLOAT: 5126,
        FLOAT_MAT3: 35675,
        FLOAT_MAT4: 35676,
        FLOAT_VEC2: 35664,
        FLOAT_VEC3: 35665,
        FLOAT_VEC4: 35666,
        LINEAR: 9729,
        REPEAT: 10497,
        SAMPLER_2D: 35678,
        POINTS: 0,
        LINES: 1,
        LINE_LOOP: 2,
        LINE_STRIP: 3,
        TRIANGLES: 4,
        TRIANGLE_STRIP: 5,
        TRIANGLE_FAN: 6,
        UNSIGNED_BYTE: 5121,
        UNSIGNED_SHORT: 5123
    },
    Pe = {
        5120: Int8Array,
        5121: Uint8Array,
        5122: Int16Array,
        5123: Uint16Array,
        5125: Uint32Array,
        5126: Float32Array
    },
    zt = {
        9728: Ts,
        9729: it,
        9984: ws,
        9985: Es,
        9986: Ss,
        9987: $t
    },
    Zt = {
        33071: ys,
        33648: Rs,
        10497: St
    },
    gt = {
        SCALAR: 1,
        VEC2: 2,
        VEC3: 3,
        VEC4: 4,
        MAT2: 4,
        MAT3: 9,
        MAT4: 16
    },
    _t = {
        POSITION: "position",
        NORMAL: "normal",
        TANGENT: "tangent",
        TEXCOORD_0: "uv",
        TEXCOORD_1: "uv1",
        TEXCOORD_2: "uv2",
        TEXCOORD_3: "uv3",
        COLOR_0: "color",
        WEIGHTS_0: "skinWeight",
        JOINTS_0: "skinIndex"
    },
    xe = {
        scale: "scale",
        translation: "position",
        rotation: "quaternion",
        weights: "morphTargetInfluences"
    },
    Tr = {
        CUBICSPLINE: void 0,
        LINEAR: tn,
        STEP: _s
    },
    At = {
        OPAQUE: "OPAQUE",
        MASK: "MASK",
        BLEND: "BLEND"
    };

function wr(f) {
    return f.DefaultMaterial === void 0 && (f.DefaultMaterial = new en({
        color: 16777215,
        emissive: 0,
        metalness: 1,
        roughness: 1,
        transparent: !1,
        depthTest: !0,
        side: xs
    })), f.DefaultMaterial
}

function Oe(f, e, t) {
    for (const r in t.extensions) f[r] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[r] = t.extensions[r])
}

function Ie(f, e) {
    e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(f.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras))
}

function Er(f, e, t) {
    let r = !1,
        s = !1,
        i = !1;
    for (let h = 0, p = e.length; h < p; h++) {
        const d = e[h];
        if (d.POSITION !== void 0 && (r = !0), d.NORMAL !== void 0 && (s = !0), d.COLOR_0 !== void 0 && (i = !0), r && s && i) break
    }
    if (!r && !s && !i) return Promise.resolve(f);
    const o = [],
        l = [],
        c = [];
    for (let h = 0, p = e.length; h < p; h++) {
        const d = e[h];
        if (r) {
            const A = d.POSITION !== void 0 ? t.getDependency("accessor", d.POSITION) : f.attributes.position;
            o.push(A)
        }
        if (s) {
            const A = d.NORMAL !== void 0 ? t.getDependency("accessor", d.NORMAL) : f.attributes.normal;
            l.push(A)
        }
        if (i) {
            const A = d.COLOR_0 !== void 0 ? t.getDependency("accessor", d.COLOR_0) : f.attributes.color;
            c.push(A)
        }
    }
    return Promise.all([Promise.all(o), Promise.all(l), Promise.all(c)]).then(function(h) {
        const p = h[0],
            d = h[1],
            A = h[2];
        return r && (f.morphAttributes.position = p), s && (f.morphAttributes.normal = d), i && (f.morphAttributes.color = A), f.morphTargetsRelative = !0, f
    })
}

function Sr(f, e) {
    if (f.updateMorphTargets(), e.weights !== void 0)
        for (let t = 0, r = e.weights.length; t < r; t++) f.morphTargetInfluences[t] = e.weights[t];
    if (e.extras && Array.isArray(e.extras.targetNames)) {
        const t = e.extras.targetNames;
        if (f.morphTargetInfluences.length === t.length) {
            f.morphTargetDictionary = {};
            for (let r = 0, s = t.length; r < s; r++) f.morphTargetDictionary[t[r]] = r
        } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
    }
}

function yr(f) {
    let e;
    const t = f.extensions && f.extensions[H.KHR_DRACO_MESH_COMPRESSION];
    if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + Tt(t.attributes) : e = f.indices + ":" + Tt(f.attributes) + ":" + f.mode, f.targets !== void 0)
        for (let r = 0, s = f.targets.length; r < s; r++) e += ":" + Tt(f.targets[r]);
    return e
}

function Tt(f) {
    let e = "";
    const t = Object.keys(f).sort();
    for (let r = 0, s = t.length; r < s; r++) e += t[r] + ":" + f[t[r]] + ";";
    return e
}

function xt(f) {
    switch (f) {
        case Int8Array:
            return 1 / 127;
        case Uint8Array:
            return 1 / 255;
        case Int16Array:
            return 1 / 32767;
        case Uint16Array:
            return 1 / 65535;
        default:
            throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")
    }
}

function Rr(f) {
    return f.search(/\.jpe?g($|\?)/i) > 0 || f.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : f.search(/\.webp($|\?)/i) > 0 || f.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png"
}
const _r = new at;
class xr {
    constructor(e = {}, t = {}) {
        this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new Ys, this.associations = new Map, this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
            refs: {},
            uses: {}
        }, this.cameraCache = {
            refs: {},
            uses: {}
        }, this.lightCache = {
            refs: {},
            uses: {}
        }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
        let r = !1,
            s = !1,
            i = -1;
        typeof navigator < "u" && (r = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, s = navigator.userAgent.indexOf("Firefox") > -1, i = s ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || r || s && i < 98 ? this.textureLoader = new Jt(this.options.manager) : this.textureLoader = new es(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new ot(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0)
    }
    setExtensions(e) {
        this.extensions = e
    }
    setPlugins(e) {
        this.plugins = e
    }
    parse(e, t) {
        const r = this,
            s = this.json,
            i = this.extensions;
        this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(o) {
            return o._markDefs && o._markDefs()
        }), Promise.all(this._invokeAll(function(o) {
            return o.beforeRoot && o.beforeRoot()
        })).then(function() {
            return Promise.all([r.getDependencies("scene"), r.getDependencies("animation"), r.getDependencies("camera")])
        }).then(function(o) {
            const l = {
                scene: o[0][s.scene || 0],
                scenes: o[0],
                animations: o[1],
                cameras: o[2],
                asset: s.asset,
                parser: r,
                userData: {}
            };
            return Oe(i, l, s), Ie(l, s), Promise.all(r._invokeAll(function(c) {
                return c.afterRoot && c.afterRoot(l)
            })).then(function() {
                e(l)
            })
        }).catch(t)
    }
    _markDefs() {
        const e = this.json.nodes || [],
            t = this.json.skins || [],
            r = this.json.meshes || [];
        for (let s = 0, i = t.length; s < i; s++) {
            const o = t[s].joints;
            for (let l = 0, c = o.length; l < c; l++) e[o[l]].isBone = !0
        }
        for (let s = 0, i = e.length; s < i; s++) {
            const o = e[s];
            o.mesh !== void 0 && (this._addNodeRef(this.meshCache, o.mesh), o.skin !== void 0 && (r[o.mesh].isSkinnedMesh = !0)), o.camera !== void 0 && this._addNodeRef(this.cameraCache, o.camera)
        }
    }
    _addNodeRef(e, t) {
        t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++)
    }
    _getNodeRef(e, t, r) {
        if (e.refs[t] <= 1) return r;
        const s = r.clone(),
            i = (o, l) => {
                const c = this.associations.get(o);
                c != null && this.associations.set(l, c);
                for (const [h, p] of o.children.entries()) i(p, l.children[h])
            };
        return i(r, s), s.name += "_instance_" + e.uses[t]++, s
    }
    _invokeOne(e) {
        const t = Object.values(this.plugins);
        t.push(this);
        for (let r = 0; r < t.length; r++) {
            const s = e(t[r]);
            if (s) return s
        }
        return null
    }
    _invokeAll(e) {
        const t = Object.values(this.plugins);
        t.unshift(this);
        const r = [];
        for (let s = 0; s < t.length; s++) {
            const i = e(t[s]);
            i && r.push(i)
        }
        return r
    }
    getDependency(e, t) {
        const r = e + ":" + t;
        let s = this.cache.get(r);
        if (!s) {
            switch (e) {
                case "scene":
                    s = this.loadScene(t);
                    break;
                case "node":
                    s = this._invokeOne(function(i) {
                        return i.loadNode && i.loadNode(t)
                    });
                    break;
                case "mesh":
                    s = this._invokeOne(function(i) {
                        return i.loadMesh && i.loadMesh(t)
                    });
                    break;
                case "accessor":
                    s = this.loadAccessor(t);
                    break;
                case "bufferView":
                    s = this._invokeOne(function(i) {
                        return i.loadBufferView && i.loadBufferView(t)
                    });
                    break;
                case "buffer":
                    s = this.loadBuffer(t);
                    break;
                case "material":
                    s = this._invokeOne(function(i) {
                        return i.loadMaterial && i.loadMaterial(t)
                    });
                    break;
                case "texture":
                    s = this._invokeOne(function(i) {
                        return i.loadTexture && i.loadTexture(t)
                    });
                    break;
                case "skin":
                    s = this.loadSkin(t);
                    break;
                case "animation":
                    s = this._invokeOne(function(i) {
                        return i.loadAnimation && i.loadAnimation(t)
                    });
                    break;
                case "camera":
                    s = this.loadCamera(t);
                    break;
                default:
                    if (s = this._invokeOne(function(i) {
                            return i != this && i.getDependency && i.getDependency(e, t)
                        }), !s) throw new Error("Unknown type: " + e);
                    break
            }
            this.cache.add(r, s)
        }
        return s
    }
    getDependencies(e) {
        let t = this.cache.get(e);
        if (!t) {
            const r = this,
                s = this.json[e + (e === "mesh" ? "es" : "s")] || [];
            t = Promise.all(s.map(function(i, o) {
                return r.getDependency(e, o)
            })), this.cache.add(e, t)
        }
        return t
    }
    loadBuffer(e) {
        const t = this.json.buffers[e],
            r = this.fileLoader;
        if (t.type && t.type !== "arraybuffer") throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
        if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[H.KHR_BINARY_GLTF].body);
        const s = this.options;
        return new Promise(function(i, o) {
            r.load(Et.resolveURL(t.uri, s.path), i, void 0, function() {
                o(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'))
            })
        })
    }
    loadBufferView(e) {
        const t = this.json.bufferViews[e];
        return this.getDependency("buffer", t.buffer).then(function(r) {
            const s = t.byteLength || 0,
                i = t.byteOffset || 0;
            return r.slice(i, i + s)
        })
    }
    loadAccessor(e) {
        const t = this,
            r = this.json,
            s = this.json.accessors[e];
        if (s.bufferView === void 0 && s.sparse === void 0) {
            const o = gt[s.type],
                l = Pe[s.componentType],
                c = s.normalized === !0,
                h = new l(s.count * o);
            return Promise.resolve(new We(h, o, c))
        }
        const i = [];
        return s.bufferView !== void 0 ? i.push(this.getDependency("bufferView", s.bufferView)) : i.push(null), s.sparse !== void 0 && (i.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(i).then(function(o) {
            const l = o[0],
                c = gt[s.type],
                h = Pe[s.componentType],
                p = h.BYTES_PER_ELEMENT,
                d = p * c,
                A = s.byteOffset || 0,
                S = s.bufferView !== void 0 ? r.bufferViews[s.bufferView].byteStride : void 0,
                N = s.normalized === !0;
            let k, b;
            if (S && S !== d) {
                const O = Math.floor(A / S),
                    F = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + O + ":" + s.count;
                let Z = t.cache.get(F);
                Z || (k = new h(l, O * S, s.count * S / p), Z = new ts(k, S / p), t.cache.add(F, Z)), b = new Is(Z, c, A % S / p, N)
            } else l === null ? k = new h(s.count * c) : k = new h(l, A, s.count * c), b = new We(k, c, N);
            if (s.sparse !== void 0) {
                const O = gt.SCALAR,
                    F = Pe[s.sparse.indices.componentType],
                    Z = s.sparse.indices.byteOffset || 0,
                    B = s.sparse.values.byteOffset || 0,
                    me = new F(o[1], Z, s.sparse.count * O),
                    te = new h(o[2], B, s.sparse.count * c);
                l !== null && (b = new We(b.array.slice(), b.itemSize, b.normalized));
                for (let $ = 0, q = me.length; $ < q; $++) {
                    const oe = me[$];
                    if (b.setX(oe, te[$ * c]), c >= 2 && b.setY(oe, te[$ * c + 1]), c >= 3 && b.setZ(oe, te[$ * c + 2]), c >= 4 && b.setW(oe, te[$ * c + 3]), c >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")
                }
            }
            return b
        })
    }
    loadTexture(e) {
        const t = this.json,
            r = this.options,
            i = t.textures[e].source,
            o = t.images[i];
        let l = this.textureLoader;
        if (o.uri) {
            const c = r.manager.getHandler(o.uri);
            c !== null && (l = c)
        }
        return this.loadTextureImage(e, i, l)
    }
    loadTextureImage(e, t, r) {
        const s = this,
            i = this.json,
            o = i.textures[e],
            l = i.images[t],
            c = (l.uri || l.bufferView) + ":" + o.sampler;
        if (this.textureCache[c]) return this.textureCache[c];
        const h = this.loadImageSource(t, r).then(function(p) {
            p.flipY = !1, p.name = o.name || l.name || "", p.name === "" && typeof l.uri == "string" && l.uri.startsWith("data:image/") === !1 && (p.name = l.uri);
            const A = (i.samplers || {})[o.sampler] || {};
            return p.magFilter = zt[A.magFilter] || it, p.minFilter = zt[A.minFilter] || $t, p.wrapS = Zt[A.wrapS] || St, p.wrapT = Zt[A.wrapT] || St, s.associations.set(p, {
                textures: e
            }), p
        }).catch(function() {
            return null
        });
        return this.textureCache[c] = h, h
    }
    loadImageSource(e, t) {
        const r = this,
            s = this.json,
            i = this.options;
        if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then(d => d.clone());
        const o = s.images[e],
            l = self.URL || self.webkitURL;
        let c = o.uri || "",
            h = !1;
        if (o.bufferView !== void 0) c = r.getDependency("bufferView", o.bufferView).then(function(d) {
            h = !0;
            const A = new Blob([d], {
                type: o.mimeType
            });
            return c = l.createObjectURL(A), c
        });
        else if (o.uri === void 0) throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
        const p = Promise.resolve(c).then(function(d) {
            return new Promise(function(A, S) {
                let N = A;
                t.isImageBitmapLoader === !0 && (N = function(k) {
                    const b = new Ft(k);
                    b.needsUpdate = !0, A(b)
                }), t.load(Et.resolveURL(d, i.path), N, void 0, S)
            })
        }).then(function(d) {
            return h === !0 && l.revokeObjectURL(c), d.userData.mimeType = o.mimeType || Rr(o.uri), d
        }).catch(function(d) {
            throw console.error("THREE.GLTFLoader: Couldn't load texture", c), d
        });
        return this.sourceCache[e] = p, p
    }
    assignTexture(e, t, r, s) {
        const i = this;
        return this.getDependency("texture", r.index).then(function(o) {
            if (!o) return null;
            if (r.texCoord !== void 0 && r.texCoord > 0 && (o = o.clone(), o.channel = r.texCoord), i.extensions[H.KHR_TEXTURE_TRANSFORM]) {
                const l = r.extensions !== void 0 ? r.extensions[H.KHR_TEXTURE_TRANSFORM] : void 0;
                if (l) {
                    const c = i.associations.get(o);
                    o = i.extensions[H.KHR_TEXTURE_TRANSFORM].extendTexture(o, l), i.associations.set(o, c)
                }
            }
            return s !== void 0 && (o.colorSpace = s), e[t] = o, o
        })
    }
    assignFinalMaterial(e) {
        const t = e.geometry;
        let r = e.material;
        const s = t.attributes.tangent === void 0,
            i = t.attributes.color !== void 0,
            o = t.attributes.normal === void 0;
        if (e.isPoints) {
            const l = "PointsMaterial:" + r.uuid;
            let c = this.cache.get(l);
            c || (c = new ns, ht.prototype.copy.call(c, r), c.color.copy(r.color), c.map = r.map, c.sizeAttenuation = !1, this.cache.add(l, c)), r = c
        } else if (e.isLine) {
            const l = "LineBasicMaterial:" + r.uuid;
            let c = this.cache.get(l);
            c || (c = new ss, ht.prototype.copy.call(c, r), c.color.copy(r.color), c.map = r.map, this.cache.add(l, c)), r = c
        }
        if (s || i || o) {
            let l = "ClonedMaterial:" + r.uuid + ":";
            s && (l += "derivative-tangents:"), i && (l += "vertex-colors:"), o && (l += "flat-shading:");
            let c = this.cache.get(l);
            c || (c = r.clone(), i && (c.vertexColors = !0), o && (c.flatShading = !0), s && (c.normalScale && (c.normalScale.y *= -1), c.clearcoatNormalScale && (c.clearcoatNormalScale.y *= -1)), this.cache.add(l, c), this.associations.set(c, this.associations.get(r))), r = c
        }
        e.material = r
    }
    getMaterialType() {
        return en
    }
    loadMaterial(e) {
        const t = this,
            r = this.json,
            s = this.extensions,
            i = r.materials[e];
        let o;
        const l = {},
            c = i.extensions || {},
            h = [];
        if (c[H.KHR_MATERIALS_UNLIT]) {
            const d = s[H.KHR_MATERIALS_UNLIT];
            o = d.getMaterialType(), h.push(d.extendParams(l, i, t))
        } else {
            const d = i.pbrMetallicRoughness || {};
            if (l.color = new be(1, 1, 1), l.opacity = 1, Array.isArray(d.baseColorFactor)) {
                const A = d.baseColorFactor;
                l.color.setRGB(A[0], A[1], A[2], pe), l.opacity = A[3]
            }
            d.baseColorTexture !== void 0 && h.push(t.assignTexture(l, "map", d.baseColorTexture, ke)), l.metalness = d.metallicFactor !== void 0 ? d.metallicFactor : 1, l.roughness = d.roughnessFactor !== void 0 ? d.roughnessFactor : 1, d.metallicRoughnessTexture !== void 0 && (h.push(t.assignTexture(l, "metalnessMap", d.metallicRoughnessTexture)), h.push(t.assignTexture(l, "roughnessMap", d.metallicRoughnessTexture))), o = this._invokeOne(function(A) {
                return A.getMaterialType && A.getMaterialType(e)
            }), h.push(Promise.all(this._invokeAll(function(A) {
                return A.extendMaterialParams && A.extendMaterialParams(e, l)
            })))
        }
        i.doubleSided === !0 && (l.side = rs);
        const p = i.alphaMode || At.OPAQUE;
        if (p === At.BLEND ? (l.transparent = !0, l.depthWrite = !1) : (l.transparent = !1, p === At.MASK && (l.alphaTest = i.alphaCutoff !== void 0 ? i.alphaCutoff : .5)), i.normalTexture !== void 0 && o !== Ve && (h.push(t.assignTexture(l, "normalMap", i.normalTexture)), l.normalScale = new qt(1, 1), i.normalTexture.scale !== void 0)) {
            const d = i.normalTexture.scale;
            l.normalScale.set(d, d)
        }
        if (i.occlusionTexture !== void 0 && o !== Ve && (h.push(t.assignTexture(l, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (l.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && o !== Ve) {
            const d = i.emissiveFactor;
            l.emissive = new be().setRGB(d[0], d[1], d[2], pe)
        }
        return i.emissiveTexture !== void 0 && o !== Ve && h.push(t.assignTexture(l, "emissiveMap", i.emissiveTexture, ke)), Promise.all(h).then(function() {
            const d = new o(l);
            return i.name && (d.name = i.name), Ie(d, i), t.associations.set(d, {
                materials: e
            }), i.extensions && Oe(s, d, i), d
        })
    }
    createUniqueName(e) {
        const t = os.sanitizeNodeName(e || "");
        return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t)
    }
    loadGeometries(e) {
        const t = this,
            r = this.extensions,
            s = this.primitiveCache;

        function i(l) {
            return r[H.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(l, t).then(function(c) {
                return jt(c, l, t)
            })
        }
        const o = [];
        for (let l = 0, c = e.length; l < c; l++) {
            const h = e[l],
                p = yr(h),
                d = s[p];
            if (d) o.push(d.promise);
            else {
                let A;
                h.extensions && h.extensions[H.KHR_DRACO_MESH_COMPRESSION] ? A = i(h) : A = jt(new Wt, h, t), s[p] = {
                    primitive: h,
                    promise: A
                }, o.push(A)
            }
        }
        return Promise.all(o)
    }
    loadMesh(e) {
        const t = this,
            r = this.json,
            s = this.extensions,
            i = r.meshes[e],
            o = i.primitives,
            l = [];
        for (let c = 0, h = o.length; c < h; c++) {
            const p = o[c].material === void 0 ? wr(this.cache) : this.getDependency("material", o[c].material);
            l.push(p)
        }
        return l.push(t.loadGeometries(o)), Promise.all(l).then(function(c) {
            const h = c.slice(0, c.length - 1),
                p = c[c.length - 1],
                d = [];
            for (let S = 0, N = p.length; S < N; S++) {
                const k = p[S],
                    b = o[S];
                let O;
                const F = h[S];
                if (b.mode === ue.TRIANGLES || b.mode === ue.TRIANGLE_STRIP || b.mode === ue.TRIANGLE_FAN || b.mode === void 0) O = i.isSkinnedMesh === !0 ? new is(k, F) : new as(k, F), O.isSkinnedMesh === !0 && O.normalizeSkinWeights(), b.mode === ue.TRIANGLE_STRIP ? O.geometry = Gt(O.geometry, Yt) : b.mode === ue.TRIANGLE_FAN && (O.geometry = Gt(O.geometry, wt));
                else if (b.mode === ue.LINES) O = new cs(k, F);
                else if (b.mode === ue.LINE_STRIP) O = new ls(k, F);
                else if (b.mode === ue.LINE_LOOP) O = new us(k, F);
                else if (b.mode === ue.POINTS) O = new hs(k, F);
                else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + b.mode);
                Object.keys(O.geometry.morphAttributes).length > 0 && Sr(O, i), O.name = t.createUniqueName(i.name || "mesh_" + e), Ie(O, i), b.extensions && Oe(s, O, b), t.assignFinalMaterial(O), d.push(O)
            }
            for (let S = 0, N = d.length; S < N; S++) t.associations.set(d[S], {
                meshes: e,
                primitives: S
            });
            if (d.length === 1) return i.extensions && Oe(s, d[0], i), d[0];
            const A = new ft;
            i.extensions && Oe(s, A, i), t.associations.set(A, {
                meshes: e
            });
            for (let S = 0, N = d.length; S < N; S++) A.add(d[S]);
            return A
        })
    }
    loadCamera(e) {
        let t;
        const r = this.json.cameras[e],
            s = r[r.type];
        if (!s) {
            console.warn("THREE.GLTFLoader: Missing camera parameters.");
            return
        }
        return r.type === "perspective" ? t = new fs(ds.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : r.type === "orthographic" && (t = new ps(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), r.name && (t.name = this.createUniqueName(r.name)), Ie(t, r), Promise.resolve(t)
    }
    loadSkin(e) {
        const t = this.json.skins[e],
            r = [];
        for (let s = 0, i = t.joints.length; s < i; s++) r.push(this._loadNodeShallow(t.joints[s]));
        return t.inverseBindMatrices !== void 0 ? r.push(this.getDependency("accessor", t.inverseBindMatrices)) : r.push(null), Promise.all(r).then(function(s) {
            const i = s.pop(),
                o = s,
                l = [],
                c = [];
            for (let h = 0, p = o.length; h < p; h++) {
                const d = o[h];
                if (d) {
                    l.push(d);
                    const A = new at;
                    i !== null && A.fromArray(i.array, h * 16), c.push(A)
                } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[h])
            }
            return new ms(l, c)
        })
    }
    loadAnimation(e) {
        const t = this.json,
            r = this,
            s = t.animations[e],
            i = s.name ? s.name : "animation_" + e,
            o = [],
            l = [],
            c = [],
            h = [],
            p = [];
        for (let d = 0, A = s.channels.length; d < A; d++) {
            const S = s.channels[d],
                N = s.samplers[S.sampler],
                k = S.target,
                b = k.node,
                O = s.parameters !== void 0 ? s.parameters[N.input] : N.input,
                F = s.parameters !== void 0 ? s.parameters[N.output] : N.output;
            k.node !== void 0 && (o.push(this.getDependency("node", b)), l.push(this.getDependency("accessor", O)), c.push(this.getDependency("accessor", F)), h.push(N), p.push(k))
        }
        return Promise.all([Promise.all(o), Promise.all(l), Promise.all(c), Promise.all(h), Promise.all(p)]).then(function(d) {
            const A = d[0],
                S = d[1],
                N = d[2],
                k = d[3],
                b = d[4],
                O = [];
            for (let F = 0, Z = A.length; F < Z; F++) {
                const B = A[F],
                    me = S[F],
                    te = N[F],
                    $ = k[F],
                    q = b[F];
                if (B === void 0) continue;
                B.updateMatrix && B.updateMatrix();
                const oe = r._createAnimationTracks(B, me, te, $, q);
                if (oe)
                    for (let Ne = 0; Ne < oe.length; Ne++) O.push(oe[Ne])
            }
            return new gs(i, void 0, O)
        })
    }
    createNodeMesh(e) {
        const t = this.json,
            r = this,
            s = t.nodes[e];
        return s.mesh === void 0 ? null : r.getDependency("mesh", s.mesh).then(function(i) {
            const o = r._getNodeRef(r.meshCache, s.mesh, i);
            return s.weights !== void 0 && o.traverse(function(l) {
                if (l.isMesh)
                    for (let c = 0, h = s.weights.length; c < h; c++) l.morphTargetInfluences[c] = s.weights[c]
            }), o
        })
    }
    loadNode(e) {
        const t = this.json,
            r = this,
            s = t.nodes[e],
            i = r._loadNodeShallow(e),
            o = [],
            l = s.children || [];
        for (let h = 0, p = l.length; h < p; h++) o.push(r.getDependency("node", l[h]));
        const c = s.skin === void 0 ? Promise.resolve(null) : r.getDependency("skin", s.skin);
        return Promise.all([i, Promise.all(o), c]).then(function(h) {
            const p = h[0],
                d = h[1],
                A = h[2];
            A !== null && p.traverse(function(S) {
                S.isSkinnedMesh && S.bind(A, _r)
            });
            for (let S = 0, N = d.length; S < N; S++) p.add(d[S]);
            return p
        })
    }
    _loadNodeShallow(e) {
        const t = this.json,
            r = this.extensions,
            s = this;
        if (this.nodeCache[e] !== void 0) return this.nodeCache[e];
        const i = t.nodes[e],
            o = i.name ? s.createUniqueName(i.name) : "",
            l = [],
            c = s._invokeOne(function(h) {
                return h.createNodeMesh && h.createNodeMesh(e)
            });
        return c && l.push(c), i.camera !== void 0 && l.push(s.getDependency("camera", i.camera).then(function(h) {
            return s._getNodeRef(s.cameraCache, i.camera, h)
        })), s._invokeAll(function(h) {
            return h.createNodeAttachment && h.createNodeAttachment(e)
        }).forEach(function(h) {
            l.push(h)
        }), this.nodeCache[e] = Promise.all(l).then(function(h) {
            let p;
            if (i.isBone === !0 ? p = new As : h.length > 1 ? p = new ft : h.length === 1 ? p = h[0] : p = new Qt, p !== h[0])
                for (let d = 0, A = h.length; d < A; d++) p.add(h[d]);
            if (i.name && (p.userData.name = i.name, p.name = o), Ie(p, i), i.extensions && Oe(r, p, i), i.matrix !== void 0) {
                const d = new at;
                d.fromArray(i.matrix), p.applyMatrix4(d)
            } else i.translation !== void 0 && p.position.fromArray(i.translation), i.rotation !== void 0 && p.quaternion.fromArray(i.rotation), i.scale !== void 0 && p.scale.fromArray(i.scale);
            return s.associations.has(p) || s.associations.set(p, {}), s.associations.get(p).nodes = e, p
        }), this.nodeCache[e]
    }
    loadScene(e) {
        const t = this.extensions,
            r = this.json.scenes[e],
            s = this,
            i = new ft;
        r.name && (i.name = s.createUniqueName(r.name)), Ie(i, r), r.extensions && Oe(t, i, r);
        const o = r.nodes || [],
            l = [];
        for (let c = 0, h = o.length; c < h; c++) l.push(s.getDependency("node", o[c]));
        return Promise.all(l).then(function(c) {
            for (let p = 0, d = c.length; p < d; p++) i.add(c[p]);
            const h = p => {
                const d = new Map;
                for (const [A, S] of s.associations)(A instanceof ht || A instanceof Ft) && d.set(A, S);
                return p.traverse(A => {
                    const S = s.associations.get(A);
                    S != null && d.set(A, S)
                }), d
            };
            return s.associations = h(i), i
        })
    }
    _createAnimationTracks(e, t, r, s, i) {
        const o = [],
            l = e.name ? e.name : e.uuid,
            c = [];
        xe[i.path] === xe.weights ? e.traverse(function(A) {
            A.morphTargetInfluences && c.push(A.name ? A.name : A.uuid)
        }) : c.push(l);
        let h;
        switch (xe[i.path]) {
            case xe.weights:
                h = Pt;
                break;
            case xe.rotation:
                h = Ht;
                break;
            case xe.position:
            case xe.scale:
                h = Ut;
                break;
            default:
                switch (r.itemSize) {
                    case 1:
                        h = Pt;
                        break;
                    case 2:
                    case 3:
                    default:
                        h = Ut;
                        break
                }
                break
        }
        const p = s.interpolation !== void 0 ? Tr[s.interpolation] : tn,
            d = this._getArrayFromAccessor(r);
        for (let A = 0, S = c.length; A < S; A++) {
            const N = new h(c[A] + "." + xe[i.path], t.array, d, p);
            s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(N), o.push(N)
        }
        return o
    }
    _getArrayFromAccessor(e) {
        let t = e.array;
        if (e.normalized) {
            const r = xt(t.constructor),
                s = new Float32Array(t.length);
            for (let i = 0, o = t.length; i < o; i++) s[i] = t[i] * r;
            t = s
        }
        return t
    }
    _createCubicSplineTrackInterpolant(e) {
        e.createInterpolant = function(r) {
            const s = this instanceof Ht ? Ar : hn;
            return new s(this.times, this.values, this.getValueSize() / 3, r)
        }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0
    }
}

function Ir(f, e, t) {
    const r = e.attributes,
        s = new Ls;
    if (r.POSITION !== void 0) {
        const l = t.json.accessors[r.POSITION],
            c = l.min,
            h = l.max;
        if (c !== void 0 && h !== void 0) {
            if (s.set(new Ue(c[0], c[1], c[2]), new Ue(h[0], h[1], h[2])), l.normalized) {
                const p = xt(Pe[l.componentType]);
                s.min.multiplyScalar(p), s.max.multiplyScalar(p)
            }
        } else {
            console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
            return
        }
    } else return;
    const i = e.targets;
    if (i !== void 0) {
        const l = new Ue,
            c = new Ue;
        for (let h = 0, p = i.length; h < p; h++) {
            const d = i[h];
            if (d.POSITION !== void 0) {
                const A = t.json.accessors[d.POSITION],
                    S = A.min,
                    N = A.max;
                if (S !== void 0 && N !== void 0) {
                    if (c.setX(Math.max(Math.abs(S[0]), Math.abs(N[0]))), c.setY(Math.max(Math.abs(S[1]), Math.abs(N[1]))), c.setZ(Math.max(Math.abs(S[2]), Math.abs(N[2]))), A.normalized) {
                        const k = xt(Pe[A.componentType]);
                        c.multiplyScalar(k)
                    }
                    l.max(c)
                } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
            }
        }
        s.expandByVector(l)
    }
    f.boundingBox = s;
    const o = new bs;
    s.getCenter(o.center), o.radius = s.min.distanceTo(s.max) / 2, f.boundingSphere = o
}

function jt(f, e, t) {
    const r = e.attributes,
        s = [];

    function i(o, l) {
        return t.getDependency("accessor", o).then(function(c) {
            f.setAttribute(l, c)
        })
    }
    for (const o in r) {
        const l = _t[o] || o.toLowerCase();
        l in f.attributes || s.push(i(r[o], l))
    }
    if (e.indices !== void 0 && !f.index) {
        const o = t.getDependency("accessor", e.indices).then(function(l) {
            f.setIndex(l)
        });
        s.push(o)
    }
    return Dt.workingColorSpace !== pe && "COLOR_0" in r && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Dt.workingColorSpace}" not supported.`), Ie(f, e), Ir(f, e, t), Promise.all(s).then(function() {
        return e.targets !== void 0 ? Er(f, e.targets, t) : f
    })
}

function Lr(f) {
    const e = new Map,
        t = new Map,
        r = f.clone();
    return fn(f, r, function(s, i) {
        e.set(i, s), t.set(s, i)
    }), r.traverse(function(s) {
        if (!s.isSkinnedMesh) return;
        const i = s,
            o = e.get(s),
            l = o.skeleton.bones;
        i.skeleton = o.skeleton.clone(), i.bindMatrix.copy(o.bindMatrix), i.skeleton.bones = l.map(function(c) {
            return t.get(c)
        }), i.bind(i.skeleton, i.bindMatrix)
    }), r
}

function fn(f, e, t) {
    t(f, e);
    for (let r = 0; r < f.children.length; r++) fn(f.children[r], e.children[r], t)
}
Cs.enabled = !0;
const de = class de {
    static getDracoLoader() {
        return this.dracoLoader || (this.dracoLoader = new vs(this.loadingManager), this.dracoLoader.setDecoderPath("/libs/draco/")), this.dracoLoader
    }
    static getGLTFLoader() {
        return this.gltfLoader || (this.gltfLoader = new Ws(this.loadingManager), this.gltfLoader.setDRACOLoader(this.getDracoLoader())), this.gltfLoader
    }
    static getEXRLoader() {
        return this.exrLoader || (this.exrLoader = new Vs(this.loadingManager)), this.exrLoader
    }
    static getTexture(e) {
        const t = this.textureCache.get(e);
        if (t) return t;
        const r = this.textureLoader.load(e);
        return this.textureCache.set(e, r), r
    }
    static loadGLTF(e) {
        let t = this.gltfPromises.get(e);
        return t || (t = this.getGLTFLoader().loadAsync(e).then(r => r).catch(r => {
            throw this.gltfPromises.delete(e), r
        }), this.gltfPromises.set(e, t)), t
    }
    static async getGLTFClone(e) {
        const t = await this.loadGLTF(e);
        return {
            scene: Lr(t.scene),
            animations: t.animations
        }
    }
    static async getEXRTexture(e) {
        let t = this.exrPromises.get(e);
        return t || (t = this.getEXRLoader().loadAsync(e).catch(r => {
            throw this.exrPromises.delete(e), r
        }), this.exrPromises.set(e, t)), t
    }
};
Re(de, "loadingManager", new Ns), Re(de, "textureLoader", new Jt(de.loadingManager)), Re(de, "gltfLoader", null), Re(de, "dracoLoader", null), Re(de, "exrLoader", null), Re(de, "textureCache", new Map), Re(de, "gltfPromises", new Map), Re(de, "exrPromises", new Map);
let Xt = de;
export {
    Xt as A, vs as D
};