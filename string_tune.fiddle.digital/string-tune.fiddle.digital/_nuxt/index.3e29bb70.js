import {
    r as u,
    S as c,
    u as f,
    U as l,
    V as p
} from "./entry.c7ee8776.js";

function d(t, a) {
    const e = u({});
    return c(() => {
        const s = l(t),
            {
                title: n,
                titleTemplate: o,
                ...r
            } = s;
        e.value = {
            title: n,
            titleTemplate: o,
            meta: p(r)
        }
    }), f(e, a)
}
export {
    d as u
};