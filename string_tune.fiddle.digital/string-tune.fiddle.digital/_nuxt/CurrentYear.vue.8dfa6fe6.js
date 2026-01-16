import {
    f as a,
    r as o,
    q as s,
    g as c,
    h as u,
    o as l,
    c as p,
    t as m,
    k as f
} from "./entry.c7ee8776.js";
const g = a({
    __name: "CurrentYear",
    props: {
        format: {}
    },
    setup(t) {
        const r = t,
            e = o(new Date),
            n = s(() => r.format === "YY" ? e.value.getFullYear().toString().slice(-2) : e.value.getFullYear());
        return c(() => {}), u(() => {}), (i, Y) => (l(), p("span", null, m(f(n)), 1))
    }
});
export {
    g as _
};