import {
    f as Bt,
    q as It,
    r as Be,
    g as At,
    s as Ie,
    h as Lt,
    o as Xt,
    c as Ft,
    a as Wt,
    j as Yt,
    _ as Ot
} from "./entry.c7ee8776.js";
import {
    $ as xt
} from "./index.4ae1b6b5.js";
const Ht = 10,
    Gt = .6,
    $t = `#version 300 es
precision highp float;
const vec2 V[3]=vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main(){ gl_Position = vec4(V[gl_VertexID],0.0,1.0); }`,
    kt = `#version 300 es
precision highp float;

out vec4 o;

uniform sampler2D uTex;
uniform sampler2D uTexPrev;
uniform vec2   uCanvasResPx;
uniform vec2   uContentResPx;

uniform float   uProgress;
uniform int    uWaveCount;
uniform float   uWaveOffset;
uniform float   uWaveFalloff;

uniform float uHeightPx;
uniform float uAmountPx;
uniform float uBiasY;
uniform float uCenterX;
uniform float uDeadPx;
uniform float uBiasX;
uniform float uUnderWidthPx;
uniform float uUnderOutsidePx;
uniform float uUnderDepthPx;
uniform float uStrength;

uniform float uStrengthDown;
uniform float uStrengthUp;
uniform float uSideFeatherPx;

uniform float uMixBack;
uniform float uMixFront;
uniform float uMixExponent;
uniform float uMixStrength;
uniform float uHasPrev;

uniform float uReveal;
uniform float uFeatherPx;
uniform int  uBlendMode;
uniform float uRevealAuto;
uniform int  uWipeInvert;

float bandMask(float y, float centerY, float hN) {
 float d = abs(y - centerY);
 float t = clamp(d / max(1e-6, hN), 0.0, 1.0);
 return pow(1.0 - t, uBiasY);
}
float insideProfile(float dPx){
 float w = max(1.0, uUnderWidthPx);
 float t = clamp(dPx / w, 0.0, 1.0);
 return 1.0 - t;
}
float outsideProfile(float dPxNeg){
 float w = max(1.0, uUnderOutsidePx);
 float t = clamp((-dPxNeg) / w, 0.0, 1.0);
 return 1.0 - t;
}
float sideStrengthAt(float uvY, float centerY) {
 if (uSideFeatherPx <= 0.0) {
  float isUpper = step(0.0, uvY - centerY);
  return mix(uStrengthDown, uStrengthUp, isUpper);
 }
 float featherN = max(1.0, uSideFeatherPx) / uContentResPx.y;
 float t = clamp(0.5 + 0.5 * (uvY - centerY) / featherN, 0.0, 1.0);
 return mix(uStrengthDown, uStrengthUp, t);
}
vec2 computeBandBend(vec2 uvC, float centerY) {
 float hN = max(1.0, uHeightPx) / uContentResPx.y;
 float mV = bandMask(uvC.y, centerY, hN);

 float dxDir = sign(uvC.x - uCenterX);
 float distPxH = abs(uvC.x - uCenterX) * uContentResPx.x;
 float mH = pow(smoothstep(uDeadPx, 0.5 * uContentResPx.x, distPxH), uBiasX);

 float dx = -(uAmountPx / uContentResPx.x) * mV * mH * dxDir;

 float dSignedPxV = (uvC.y - centerY) * uContentResPx.y;
 float pIn = insideProfile(abs(dSignedPxV));
 float pOut = outsideProfile(-abs(dSignedPxV));
 float under = max(pIn, 0.6 * pOut);

 float signY = (dSignedPxV >= 0.0) ? 1.0 : -1.0;
 float dy = -(uUnderDepthPx / uContentResPx.y) * under * mV * signY;

 return vec2(dx, dy);
}

void main() {
 vec2 fragPx = gl_FragCoord.xy;

 vec2 contentMin = 0.5 * (uCanvasResPx - uContentResPx);
 vec2 localPx = fragPx - contentMin;
 vec2 uvC = localPx / uContentResPx;

 vec2 total_d = vec2(0.0);
 for (int i = 0; i < uWaveCount; i++) {
  float i_f = float(i);
  float centerY = uProgress - i_f * uWaveOffset; 
  float intensity = pow(uWaveFalloff, i_f);
  vec2 d = computeBandBend(uvC, centerY);
  float sideK = sideStrengthAt(uvC.y, centerY);
  total_d += d * sideK * intensity;
 }
 total_d *= max(0.0, uStrength);

 vec2 suv = clamp(uvC + total_d, 0.0, 1.0);
 vec4 curr = texture(uTex, suv);

 if (uHasPrev < 0.5) { o = curr; return; }

 vec4 prev = texture(uTexPrev, suv);

 
 if (uBlendMode == 2) {
  float t = clamp(uReveal, 0.0, 1.0);
  if (uRevealAuto > 0.5 && uWipeInvert == 1) t = 1.0 - t;
  o = mix(prev, curr, t);
  return;
 }

 
 if (uBlendMode == 1) {
  float lag = max(float(uWaveCount - 1), 0.0);
  float tailCenter = uProgress - lag * uWaveOffset;

  float edge = (uRevealAuto > 0.5) ? clamp(tailCenter, 0.0, 1.0) : clamp(uReveal, 0.0, 1.0);
  float y = suv.y; 
  float featherN = max(0.0, uFeatherPx) / uContentResPx.y;
  float kBase = (featherN > 0.0)
  ? (1.0 - smoothstep(edge - 0.5 * featherN, edge + 0.5 * featherN, y)) 
  : step(y, edge);


float k = (uWipeInvert == 1) ? (1.0 - kBase) : kBase;

o = mix(prev, curr, k);
return;
 }

 
 float hN = max(1.0, uHeightPx) / uContentResPx.y;
 float back = max(0.0001, abs(uMixBack));
 float front = max(0.0001, abs(uMixFront));
 float mixExp = max(0.0001, uMixExponent);
 float mixStr = clamp(uMixStrength, 0.0, 1.0);

 float lag2 = max(float(uWaveCount - 1), 0.0);
 float tc = uProgress - lag2 * uWaveOffset;

 float rangeBack = back * hN;
 float rangeFront = front * hN;
 float diff = tc - uvC.y;
 if (uWipeInvert == 1) diff = -diff; 

 float mixBase = smoothstep(-rangeBack, rangeFront, diff);
 mixBase = pow(mixBase, mixExp);
 float mixFactor = clamp(mixBase * mixStr, 0.0, 1.0);

 o = mix(prev, curr, mixFactor);
}
`,
    ue = 100,
    Vt = Bt({
        __name: "WavyText",
        props: {
            textSourceId: {
                type: String,
                default: ""
            },
            targetSelector: {
                type: String,
                default: ""
            },
            progressId: {
                type: String,
                default: ""
            },
            channel: {
                type: String,
                default: "text"
            },
            content: {
                type: String,
                default: "text"
            },
            text: {
                type: String,
                default: ""
            },
            color: {
                type: String,
                default: "#000000"
            },
            waveCount: {
                type: Number,
                default: 3
            },
            waveOffset: {
                type: Number,
                default: .15
            },
            waveFalloff: {
                type: Number,
                default: .65
            },
            heightPx: {
                type: Number,
                default: 80
            },
            amountPx: {
                type: Number,
                default: 110
            },
            biasY: {
                type: Number,
                default: 4.4
            },
            centerX: {
                type: Number,
                default: .5
            },
            deadPx: {
                type: Number,
                default: 0
            },
            biasX: {
                type: Number,
                default: .2
            },
            underWidthPx: {
                type: Number,
                default: 120
            },
            underOutsidePx: {
                type: Number,
                default: 160
            },
            underDepthPx: {
                type: Number,
                default: 122
            },
            strength: {
                type: Number,
                default: 1
            },
            strengthDown: {
                type: Number,
                default: 1
            },
            strengthUp: {
                type: Number,
                default: 1
            },
            sideFeatherPx: {
                type: Number,
                default: 1
            },
            mixBack: {
                type: Number,
                default: .35
            },
            mixFront: {
                type: Number,
                default: 1.1
            },
            mixExponent: {
                type: Number,
                default: 1.6
            },
            mixStrength: {
                type: Number,
                default: 1
            },
            dprMax: {
                type: Number,
                default: 1
            },
            ioRootMargin: {
                type: [Number, String],
                default: 300
            },
            ioThreshold: {
                type: Number,
                default: 0
            },
            blendMode: {
                type: Number,
                default: 1
            },
            reveal: {
                type: Number,
                default: 0
            },
            featherPx: {
                type: Number,
                default: 0
            },
            revealAuto: {
                type: Boolean,
                default: !0
            },
            wipeInvert: {
                type: Boolean,
                default: !1
            },
            autoCommit: {
                type: Boolean,
                default: !1
            },
            commitThreshold: {
                type: Number,
                default: .999
            },
            start: {
                type: Number,
                default: -.06
            },
            end: {
                type: Number,
                default: 1.06
            }
        },
        setup(ht, {
            expose: gt
        }) {
            const t = ht,
                d = Yt().$globalClass,
                pt = It(() => {
                    var e;
                    return (e = t.channel) != null && e.trim() ? t.channel.trim() : "text"
                }),
                m = e => `${pt.value}-${e}`,
                F = (e, n) => d.emit(m(e), n);
            let W = 2,
                j = 2,
                se = 2,
                Ae = !1,
                Le = performance.now();
            const Xe = e => Math.min(1, Math.max(0, e)),
                vt = () => Math.abs(t.waveOffset) * Math.max(0, t.waveCount - 1),
                Pt = () => t.end - t.start + vt(),
                le = (e, n) => {
                    const u = n ? 1 - Xe(e) : Xe(e);
                    return t.start + u * Pt()
                },
                Fe = e => {
                    se = e, j = le(e, J.value)
                },
                We = e => {
                    Ae = e
                },
                Ye = () => {
                    const e = performance.now(),
                        n = Math.min(.05, Math.max(.001, (e - Le) / 1e3));
                    Le = e;
                    const u = 1 - Math.exp(-Ht * n),
                        o = W;
                    W += (j - W) * u, Math.abs(W - o) > 1e-4 && (F("progress", W), x())
                };
            let a = null,
                i = null,
                Z = {};
            const R = {
                    float: new Map,
                    int: new Map,
                    vec2: new Map
                },
                r = (e, n) => {
                    if (!a || R.float.get(e) === n) return;
                    const o = Z[e];
                    o && (a.uniform1f(o, n), R.float.set(e, n))
                },
                M = (e, n) => {
                    if (!a || R.int.get(e) === n) return;
                    const o = Z[e];
                    o && (a.uniform1i(o, n), R.int.set(e, n))
                },
                Oe = (e, n, u) => {
                    if (!a) return;
                    const o = R.vec2.get(e);
                    if (o && o[0] === n && o[1] === u) return;
                    const f = Z[e];
                    f && (a.uniform2f(f, n, u), R.vec2.set(e, [n, u]))
                },
                He = () => {
                    R.float.clear(), R.int.clear(), R.vec2.clear()
                };
            let $ = 1,
                fe = Math.max(0, t.strength),
                ce = Math.max(0, t.strengthDown),
                de = Math.max(0, t.strengthUp);
            const k = () => {
                    a && (r("uStrength", fe * $), r("uStrengthDown", ce * $), r("uStrengthUp", de * $))
                },
                Tt = () => {
                    if (typeof window > "u") return 1;
                    const e = window.innerWidth <= 768,
                        n = typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)").matches : !1,
                        u = typeof navigator < "u" ? navigator.maxTouchPoints > 1 : !1;
                    return e || n || u ? Gt : 1
                },
                Ge = () => {
                    const e = Tt();
                    Math.abs(e - $) < .001 || ($ = e, k(), a && x())
                },
                $e = e => {
                    !a || R.float.get("uProgress") === e || (r("uProgress", e), x())
                },
                ke = e => {
                    fe = Math.max(0, e), k(), a && x()
                },
                Ve = e => {
                    ce = Math.max(0, e), k(), a && x()
                },
                ze = e => {
                    de = Math.max(0, e), k(), a && x()
                },
                me = e => {
                    a && (r("uReveal", Math.max(0, Math.min(1, e))), x())
                },
                Ke = e => {
                    a && (r("uFeatherPx", Math.max(0, e)), x())
                },
                xe = e => {
                    a && (M("uBlendMode", e), x())
                },
                qe = e => {
                    a && (r("uRevealAuto", e ? 1 : 0), x())
                },
                J = Be(t.wipeInvert),
                je = e => {
                    J.value = e, a && M("uWipeInvert", e ? 1 : 0), j = le(se, e), x()
                },
                he = Be(null),
                Q = Be(null);
            let B = null,
                S = null,
                P = "",
                U = "",
                I = !1,
                w = null,
                c = null,
                T = null,
                A = 0,
                C = 0,
                Y = 0,
                O = 0,
                s = 1,
                _ = !0,
                Ze = 0,
                Je = 0,
                y = 0,
                N = 0,
                E, H = !1,
                ge = 0,
                pe = 0;

            function Et() {
                if (!a || !i || !S) return;
                Me(), a.useProgram(i), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, S);
                const e = Math.max(1, Math.round(A * s)),
                    n = Math.max(1, Math.round(C * s)),
                    u = Math.round(.5 * (y - e)),
                    o = Math.round(.5 * (N - n));
                (e !== Y || n !== O) && (a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, e, n, 0, a.RGBA, a.UNSIGNED_BYTE, null), Y = e, O = n), a.copyTexSubImage2D(a.TEXTURE_2D, 0, 0, 0, u, o, e, n), I = !0, r("uHasPrev", 1), a.activeTexture(a.TEXTURE0)
            }

            function Qe(e, n, u) {
                const o = e.createShader(n);
                if (e.shaderSource(o, u), e.compileShader(o), !e.getShaderParameter(o, e.COMPILE_STATUS)) {
                    const f = e.getShaderInfoLog(o) || "compile failed";
                    throw e.deleteShader(o), new Error(f)
                }
                return o
            }

            function Mt(e, n, u) {
                const o = e.createProgram();
                if (e.attachShader(o, n), e.attachShader(o, u), e.linkProgram(o), !e.getProgramParameter(o, e.LINK_STATUS)) {
                    const f = e.getProgramInfoLog(o) || "link failed";
                    throw e.deleteProgram(o), new Error(f)
                }
                return o
            }
            const ee = e => e && e !== "normal" && parseFloat(e) || 0;

            function St(e) {
                return (e.match(/\s/g) || []).length
            }

            function ve(e, n, u, o, f, v) {
                e.font = u;
                const h = e.measureText(n || " "),
                    g = Math.max(1, h.width),
                    p = Math.max(0, ((n == null ? void 0 : n.length) || 0) - 1),
                    b = St(n || ""),
                    L = Math.max(0, o) * p + Math.max(0, f) * b,
                    X = g + L,
                    G = h.actualBoundingBoxAscent || 0,
                    z = h.actualBoundingBoxDescent || 0,
                    we = Math.max(v, G + z || v);
                return {
                    w: X,
                    h: we
                }
            }

            function et() {
                return Math.ceil(t.amountPx * 1.25 + t.deadPx * .5)
            }

            function tt() {
                return Math.ceil(t.underDepthPx * 1.1 + t.heightPx * .6 + t.featherPx * .5)
            }

            function Ut(e, n, u, o, f, v) {
                e.letterSpacing = `${f}px`, e.wordSpacing = `${v}px`, e.textAlign = "center", e.textBaseline = "middle", e.fillText(n, u, o), e.letterSpacing = "0px", e.wordSpacing = "0px"
            }
            let Pe = !1;

            function x() {
                Pe || (Pe = !0, requestAnimationFrame(() => {
                    Pe = !1, Rt()
                }))
            }
            let Te = [0, 0],
                Ee = [0, 0];

            function Me() {
                const e = Math.max(1, Math.round(A * s)),
                    n = Math.max(1, Math.round(C * s));
                (y !== Te[0] || N !== Te[1]) && (Oe("uCanvasResPx", y, N), Te = [y, N]), (e !== Ee[0] || n !== Ee[1]) && (Oe("uContentResPx", e, n), Ee = [e, n])
            }

            function Se() {
                if (!_ || !w || !c || !E) return;
                const e = Math.max(t.dprMax, window.devicePixelRatio || 1);
                e !== s && (s = e), Ze = Math.max(1, E.clientWidth | 0), Je = Math.max(1, E.clientHeight | 0), y = Math.round(Ze * s), N = Math.round(Je * s), (E.width !== y || E.height !== N) && (E.width = y, E.height = N);
                let n = 0,
                    u = 0;
                const o = T ? getComputedStyle(T) : null,
                    f = (o == null ? void 0 : o.fontWeight) || "700",
                    v = (o == null ? void 0 : o.fontStyle) || "normal",
                    h = (o == null ? void 0 : o.fontFamily) || "system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif",
                    g = (o == null ? void 0 : o.fontSize) || "16px",
                    p = parseFloat((o == null ? void 0 : o.lineHeight) || g) || parseFloat(g) || 16,
                    b = (t == null ? void 0 : t.color) || "#000",
                    L = ee(o == null ? void 0 : o.letterSpacing),
                    X = ee(o == null ? void 0 : o.wordSpacing),
                    G = `${v} ${f} ${g} ${h}`,
                    z = ue + et(),
                    we = ue + tt();
                if (H && (U || P)) n = Math.max(1, ge || 512), u = Math.max(1, pe || 128);
                else {
                    const D = ve(c, P || " ", G, L, X, p);
                    n = Math.max(1, Math.round(D.w) + z * 2), u = Math.max(1, Math.round(D.h) + we * 2)
                }
                const ae = Math.round(n * s),
                    re = Math.round(u * s),
                    yt = ae > Y || re > O,
                    _e = H ? yt : ae !== Y || re !== O;
                A = n, C = u, _e && (w.width = ae, w.height = re), c.setTransform(s, 0, 0, s, 0, 0);
                const be = ((o == null ? void 0 : o.textTransform) || "none").toLowerCase(),
                    Nt = L,
                    Dt = X;
                let Ce, K = null;
                if (H) Ce = P, K = U;
                else {
                    const D = t.text && t.text.length > 0 ? t.text : ((T == null ? void 0 : T.textContent) || "").trim() || "Compatibility";
                    Ce = be === "uppercase" ? D.toUpperCase() : be === "lowercase" ? D.toLowerCase() : be === "capitalize" ? D.replace(/\b\w/g, ct => ct.toUpperCase()) : D
                }
                `${v}${f}${h}${g}${L}${X}${b}${t.content}`;
                const ft = D => {
                        if (c.setTransform(s, 0, 0, s, 0, 0), c.clearRect(0, 0, A, C), c.fillStyle = b, c.font = G, t.content === "text") c.fontKerning = (o == null ? void 0 : o.fontKerning) ? ? "normal", Ut(c, D, A / 2, C / 2, Nt, Dt), c.fontKerning = "normal";
                        else {
                            const dt = C * .28,
                                ye = C * .44,
                                mt = A * .08,
                                Ne = (A * .92 - mt) / (6 + 1);
                            for (let De = 0; De < 6; De++) {
                                const q = mt + (De + .5) * Ne,
                                    ie = Ne * .35;
                                c.beginPath(), c.moveTo(q - ie * 1.2, dt), c.lineTo(q + ie * 1.2, dt), c.lineTo(q + ie * .9, ye), c.quadraticCurveTo(q, ye + Ne * .25, q - ie * .9, ye), c.closePath(), c.fill()
                            }
                        }
                    },
                    l = a;
                l.pixelStorei(l.UNPACK_ALIGNMENT, 1), H && K && S && (U = K, ft(U), l.activeTexture(l.TEXTURE1), l.bindTexture(l.TEXTURE_2D, S), _e ? l.texImage2D(l.TEXTURE_2D, 0, l.RGBA, l.RGBA, l.UNSIGNED_BYTE, w) : l.texSubImage2D(l.TEXTURE_2D, 0, 0, 0, l.RGBA, l.UNSIGNED_BYTE, w)), P = Ce, ft(P), l.activeTexture(l.TEXTURE0), l.bindTexture(l.TEXTURE_2D, B), _e ? (l.texImage2D(l.TEXTURE_2D, 0, l.RGBA, l.RGBA, l.UNSIGNED_BYTE, w), Y = ae, O = re) : l.texSubImage2D(l.TEXTURE_2D, 0, 0, 0, l.RGBA, l.UNSIGNED_BYTE, w), l.activeTexture(l.TEXTURE0), I = !!K && K !== P, _ = !1
            }

            function Rt() {
                if (!a || !E) return;
                Se(), a.viewport(0, 0, y, N), a.useProgram(i), Me(), M("uWaveCount", Math.max(1, t.waveCount)), r("uWaveOffset", t.waveOffset), r("uWaveFalloff", t.waveFalloff), r("uHeightPx", t.heightPx * s), r("uAmountPx", t.amountPx * s), r("uBiasY", t.biasY), r("uCenterX", t.centerX), r("uDeadPx", t.deadPx * s), r("uBiasX", t.biasX), r("uUnderWidthPx", t.underWidthPx * s), r("uUnderOutsidePx", t.underOutsidePx * s), r("uUnderDepthPx", t.underDepthPx * s), r("uSideFeatherPx", Math.max(0, t.sideFeatherPx)), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, B), M("uTex", 0), S && (a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, S)), M("uTexPrev", 1), r("uMixBack", t.mixBack), r("uMixFront", t.mixFront), r("uMixExponent", t.mixExponent), r("uMixStrength", Math.max(0, Math.min(1, t.mixStrength))), r("uHasPrev", I ? 1 : 0), M("uBlendMode", t.blendMode), r("uReveal", Math.max(0, Math.min(1, t.reveal))), r("uFeatherPx", Math.max(0, t.featherPx)), r("uRevealAuto", t.revealAuto ? 1 : 0), M("uWipeInvert", J.value ? 1 : 0);
                const e = Math.max(1, Math.round(A * s)),
                    n = Math.max(1, Math.round(C * s)),
                    u = Math.round(.5 * (y - e)),
                    o = Math.round(.5 * (N - n));
                a.enable(a.SCISSOR_TEST), a.scissor(u, o, e, n), a.drawArrays(a.TRIANGLES, 0, 3), a.disable(a.SCISSOR_TEST), t.autoCommit && I && (t.revealAuto ? Math.max(0, Math.min(1, W)) : Math.max(0, Math.min(1, t.reveal))) >= t.commitThreshold && (Ue(), x())
            }

            function wt() {
                var g;
                E = Q.value;
                const e = E.getContext("webgl2", {
                    alpha: !0,
                    antialias: !1
                });
                if (!e) throw new Error("WebGL2 not supported");
                a = e, He(), P = "", U = "", I = !1;
                const n = Qe(e, e.VERTEX_SHADER, $t),
                    u = Qe(e, e.FRAGMENT_SHADER, kt);
                if (i = Mt(e, n, u), e.deleteShader(n), e.deleteShader(u), e.useProgram(i), Z = {
                        uTex: e.getUniformLocation(i, "uTex"),
                        uTexPrev: e.getUniformLocation(i, "uTexPrev"),
                        uCanvasResPx: e.getUniformLocation(i, "uCanvasResPx"),
                        uContentResPx: e.getUniformLocation(i, "uContentResPx"),
                        uProgress: e.getUniformLocation(i, "uProgress"),
                        uWaveCount: e.getUniformLocation(i, "uWaveCount"),
                        uWaveOffset: e.getUniformLocation(i, "uWaveOffset"),
                        uWaveFalloff: e.getUniformLocation(i, "uWaveFalloff"),
                        uHeightPx: e.getUniformLocation(i, "uHeightPx"),
                        uAmountPx: e.getUniformLocation(i, "uAmountPx"),
                        uBiasY: e.getUniformLocation(i, "uBiasY"),
                        uCenterX: e.getUniformLocation(i, "uCenterX"),
                        uDeadPx: e.getUniformLocation(i, "uDeadPx"),
                        uBiasX: e.getUniformLocation(i, "uBiasX"),
                        uUnderWidthPx: e.getUniformLocation(i, "uUnderWidthPx"),
                        uUnderOutsidePx: e.getUniformLocation(i, "uUnderOutsidePx"),
                        uUnderDepthPx: e.getUniformLocation(i, "uUnderDepthPx"),
                        uStrength: e.getUniformLocation(i, "uStrength"),
                        uStrengthDown: e.getUniformLocation(i, "uStrengthDown"),
                        uStrengthUp: e.getUniformLocation(i, "uStrengthUp"),
                        uSideFeatherPx: e.getUniformLocation(i, "uSideFeatherPx"),
                        uMixBack: e.getUniformLocation(i, "uMixBack"),
                        uMixFront: e.getUniformLocation(i, "uMixFront"),
                        uMixExponent: e.getUniformLocation(i, "uMixExponent"),
                        uMixStrength: e.getUniformLocation(i, "uMixStrength"),
                        uHasPrev: e.getUniformLocation(i, "uHasPrev"),
                        uReveal: e.getUniformLocation(i, "uReveal"),
                        uFeatherPx: e.getUniformLocation(i, "uFeatherPx"),
                        uBlendMode: e.getUniformLocation(i, "uBlendMode"),
                        uRevealAuto: e.getUniformLocation(i, "uRevealAuto"),
                        uWipeInvert: e.getUniformLocation(i, "uWipeInvert")
                    }, B = e.createTexture(), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, B), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), S = e.createTexture(), e.activeTexture(e.TEXTURE1), e.bindTexture(e.TEXTURE_2D, S), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.activeTexture(e.TEXTURE0), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !0), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), e.pixelStorei(e.UNPACK_ALIGNMENT, 1), w = document.createElement("canvas"), c = w.getContext("2d"), t.textSourceId && (T = document.getElementById(t.textSourceId)), !T) {
                    const p = he.value,
                        b = (g = t.targetSelector) == null ? void 0 : g.trim();
                    T = (b ? p.querySelector(b) : null) || p.previousElementSibling || p.nextElementSibling || null
                }
                _ = !0;
                const o = new ResizeObserver(() => {
                    _ = !0, x()
                });
                T && o.observe(T), E._ro = o, Se();
                const f = Math.max(1, Math.round(C * s)),
                    h = -(t.heightPx * s / f);
                r("uProgress", h), M("uWaveCount", Math.max(1, t.waveCount)), r("uWaveOffset", t.waveOffset), r("uWaveFalloff", t.waveFalloff), r("uHeightPx", t.heightPx * s), r("uAmountPx", t.amountPx * s), r("uBiasY", t.biasY), r("uCenterX", t.centerX), r("uDeadPx", t.deadPx * s), r("uBiasX", t.biasX), r("uUnderWidthPx", t.underWidthPx * s), r("uUnderOutsidePx", t.underOutsidePx * s), r("uUnderDepthPx", t.underDepthPx * s), r("uSideFeatherPx", t.sideFeatherPx), fe = Math.max(0, t.strength), ce = Math.max(0, t.strengthDown), de = Math.max(0, t.strengthUp), k(), M("uBlendMode", t.blendMode), r("uReveal", Math.max(0, Math.min(1, t.reveal))), r("uFeatherPx", Math.max(0, t.featherPx)), r("uRevealAuto", t.revealAuto ? 1 : 0), M("uWipeInvert", t.wipeInvert ? 1 : 0), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, B), M("uTex", 0), x()
            }

            function _t() {
                const e = Q.value;
                if (e && e._ro && (e._ro.disconnect(), delete e._ro), a) {
                    const n = a;
                    B && (n.deleteTexture(B), B = null), S && (n.deleteTexture(S), S = null), i && (n.deleteProgram(i), i = null)
                }
                a = null, w = null, c = null, Y = O = 0, P = "", U = "", I = !1, He()
            }

            function bt(e) {
                if (!c || !a) return;
                H = !0, P && (U = P);
                const n = T ? getComputedStyle(T) : null,
                    u = (n == null ? void 0 : n.fontWeight) || "700",
                    o = (n == null ? void 0 : n.fontStyle) || "normal",
                    f = (n == null ? void 0 : n.fontFamily) || "system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif",
                    v = (n == null ? void 0 : n.fontSize) || "16px",
                    h = parseFloat((n == null ? void 0 : n.lineHeight) || v) || parseFloat(v) || 16,
                    g = ee(n == null ? void 0 : n.letterSpacing),
                    p = ee(n == null ? void 0 : n.wordSpacing),
                    b = `${o} ${u} ${v} ${f}`,
                    L = ve(c, U || e, b, g, p, h),
                    X = ve(c, e, b, g, p, h),
                    G = ue + et(),
                    z = ue + tt();
                ge = Math.ceil(Math.max(L.w, X.w)) + G * 2, pe = Math.ceil(Math.max(L.h, X.h)) + z * 2, P = e, _ = !0, Se(), I = !!U && U !== P, xe(1), me(0), x()
            }

            function Ue() {
                a && (U = "", I = !1, r("uHasPrev", 0), H = !1, ge = 0, pe = 0, _ = !0, x())
            }
            let te = null,
                ne = null,
                oe = null,
                Ct = !1,
                V = null;

            function nt() {
                !document.hidden && Ct && (_ = !0, x())
            }
            let Re = 0;
            const ot = () => {
                    Re || (Re = requestAnimationFrame(() => {
                        Re = 0, Ge(), _ = !0, x()
                    }))
                },
                at = e => me(e),
                rt = e => Ke(e),
                it = e => xe(e),
                ut = e => qe(!!e),
                st = e => je(!!e),
                lt = () => Ue();
            return At(() => {
                Ge(), E = Q.value, wt();
                const e = m("progress"),
                    n = m("strength"),
                    u = m("strength-down"),
                    o = m("strength-up");
                if (d.on(e, $e), d.on(n, ke), d.on(u, Ve), d.on(o, ze), d.on(m("reveal"), at), d.on(m("wipe-feather"), rt), d.on(m("blend-mode"), it), d.on(m("reveal-auto"), ut), d.on(m("wipe-invert"), st), d.on(m("commit"), lt), t.progressId) {
                    const h = xt.getInstance();
                    h.on(`object:progress:${t.progressId}`, Fe), h.on("lerp", g => {
                        F("strength", 1);
                        const p = Math.abs(g / 15);
                        Ae ? (F("strength-down", Math.min(.5 + 1 * p, 2)), F("strength-up", Math.min(.5 + .25 * p, 2))) : (F("strength-down", Math.min(.5 + .25 * p, 2)), F("strength-up", Math.min(.5 + 1 * p, 2)))
                    }), h.on("scroll:direction:change", We), h.on("update", Ye)
                }
                Me();
                const f = he.value,
                    v = typeof t.ioRootMargin == "number" ? `${t.ioRootMargin}px` : t.ioRootMargin;
                V = new IntersectionObserver(h => {
                    for (const g of h) {
                        if (g.target !== f) continue;
                        const p = g.intersectionRatio;
                        g.isIntersecting && p >= .05
                    }
                }, {
                    root: null,
                    rootMargin: `${v} 0px ${v} 0px`,
                    threshold: [0, .05, .25, .5, .75, 1]
                }), V.observe(f), te = Ie(() => t.text, () => {
                    _ = !0, x()
                }), ne = Ie(() => t.color, () => {
                    _ = !0, x()
                }), oe = Ie(() => [t.mixBack, t.mixFront, t.mixExponent, t.mixStrength, t.waveOffset, t.waveCount, t.waveFalloff, t.start, t.end, t.blendMode, t.reveal, t.featherPx, t.revealAuto, t.wipeInvert], () => {
                    j = le(se, J.value), x()
                }), document.addEventListener("visibilitychange", nt, {
                    passive: !0
                }), window.addEventListener("resize", ot, {
                    passive: !0
                })
            }), Lt(() => {
                te == null || te(), ne == null || ne(), oe == null || oe();
                const e = m("progress"),
                    n = m("strength"),
                    u = m("strength-down"),
                    o = m("strength-up");
                if (d.off(e, $e), d.off(n, ke), d.off(u, Ve), d.off(o, ze), d.off(m("reveal"), at), d.off(m("wipe-feather"), rt), d.off(m("blend-mode"), it), d.off(m("reveal-auto"), ut), d.off(m("wipe-invert"), st), d.off(m("commit"), lt), t.progressId) {
                    const f = xt.getInstance();
                    f.off(`object:progress:${t.progressId}`, Fe), f.off("scroll:direction:change", We), f.off("update", Ye)
                }
                V == null || V.disconnect(), document.removeEventListener("visibilitychange", nt), window.removeEventListener("resize", ot), _t()
            }), gt({
                beginTransition: bt,
                commitTransition: Ue,
                setReveal: me,
                setFeather: Ke,
                setBlendMode: xe,
                setRevealAuto: qe,
                setWipeInvert: je,
                rebasePrevFromScreen: Et
            }), (e, n) => (Xt(), Ft("div", {
                class: "wavy-bend",
                ref_key: "rootEl",
                ref: he
            }, [Wt("canvas", {
                ref_key: "canvasEl",
                ref: Q,
                class: "wavy-bend__canvas"
            }, null, 512)], 512))
        }
    });
const Qt = Ot(Vt, [
    ["__scopeId", "data-v-18f38bed"]
]);
export {
    Qt as _
};