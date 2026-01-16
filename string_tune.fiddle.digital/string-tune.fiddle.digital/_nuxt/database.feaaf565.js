var i = Object.defineProperty;
var n = (s, e, o) => e in s ? i(s, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: o
}) : s[e] = o;
var a = (s, e, o) => (n(s, typeof e != "symbol" ? e + "" : e, o), o);
class t {
    constructor(e, o, l = [], r = [], m = null) {
        a(this, "name", "");
        a(this, "url", "");
        a(this, "modules", []);
        a(this, "modulesShow", []);
        a(this, "videoUrl", "");
        this.name = e, this.url = o, this.modules = l, this.modulesShow = r, this.videoUrl = m ? ? e.toLowerCase().replaceAll(" ", "-") + ".mp4"
    }
}
class u {
    constructor(e, o, l) {
        a(this, "name", "");
        a(this, "url", "");
        a(this, "items", []);
        this.name = e, this.url = o, this.items = l
    }
}
class S {
    constructor() {
        a(this, "skillhub", [{
            name: "Basics",
            url: "basics",
            cases: [{
                name: "Reveal on scroll",
                url: "01-reveal-on-scroll",
                modules: [{
                    name: "StringLazy"
                }],
                modulesShow: [{
                    name: "Smooth scroll"
                }, {
                    name: "Lazy"
                }, {
                    name: "Lazy load"
                }],
                videoUrl: "/videos/tutorials/basics/01.mp4"
            }, {
                name: "Parallax",
                url: "02-parallax",
                modules: [{
                    name: "StringLazy"
                }, {
                    name: "StringParallax"
                }],
                modulesShow: [{
                    name: "Smooth scroll"
                }, {
                    name: "Lazy"
                }, {
                    name: "Parallax"
                }],
                videoUrl: "/videos/tutorials/basics/02.mp4"
            }, {
                name: "Progress",
                url: "03-progress",
                modules: [{
                    name: "StringLazy"
                }, {
                    name: "StringProgress"
                }],
                modulesShow: [{
                    name: "Smooth scroll"
                }, {
                    name: "Lazy"
                }, {
                    name: "Progress"
                }],
                videoUrl: "/videos/tutorials/basics/03.mp4"
            }, {
                name: "Lerp",
                url: "04-lerp",
                modules: [{
                    name: "StringLazy"
                }, {
                    name: "StringLerp"
                }],
                modulesShow: [{
                    name: "Smooth scroll"
                }, {
                    name: "Lazy"
                }, {
                    name: "Lerp"
                }],
                videoUrl: "/videos/tutorials/basics/04.mp4"
            }, {
                name: "Glide",
                url: "05-glide",
                modules: [{
                    name: "StringLazy"
                }, {
                    name: "StringGlide"
                }],
                modulesShow: [{
                    name: "Smooth scroll"
                }, {
                    name: "Lazy"
                }, {
                    name: "Glide"
                }],
                videoUrl: "/videos/tutorials/basics/05.mp4"
            }, {
                name: "Cursor",
                url: "06-cursor",
                modules: [{
                    name: "StringLazy"
                }, {
                    name: "StringCursor"
                }],
                modulesShow: [{
                    name: "Lazy"
                }, {
                    name: "Cursor"
                }],
                videoUrl: "/videos/tutorials/basics/06.mp4"
            }, {
                name: "Magnetic",
                url: "07-magnetic",
                modules: [{
                    name: "StringLazy"
                }, {
                    name: "StringMagnetic"
                }],
                modulesShow: [{
                    name: "Lazy"
                }, {
                    name: "Magnetic"
                }],
                videoUrl: "/videos/tutorials/basics/07.mp4"
            }, {
                name: "Spotlight",
                url: "08-spotlight",
                modules: [{
                    name: "StringSpotlight"
                }],
                modulesShow: [{
                    name: "Spotlight"
                }],
                videoUrl: "/videos/tutorials/basics/08.mp4"
            }, {
                name: "Impulse",
                url: "09-impulse",
                modules: [{
                    name: "StringImpulse"
                }],
                modulesShow: [{
                    name: "Cursor Impulse"
                }],
                videoUrl: "/videos/tutorials/basics/09.mp4"
            }, {
                name: "Split",
                url: "10-split",
                modules: [{
                    name: "StringLazy"
                }, {
                    name: "StringParallax"
                }, {
                    name: "StringSplit"
                }],
                modulesShow: [{
                    name: "Lazy"
                }, {
                    name: "Split"
                }, {
                    name: "Parallax"
                }],
                videoUrl: "/videos/tutorials/basics/10.mp4"
            }, {
                name: "Form Validation[1]",
                url: "11-form-1",
                modules: [{
                    name: "StringForm"
                }],
                modulesShow: [{
                    name: "Form"
                }],
                videoUrl: "/videos/tutorials/basics/11.mp4"
            }, {
                name: "Form Validation[2]",
                url: "12-form-2",
                modules: [{
                    name: "StringForm"
                }],
                modulesShow: [{
                    name: "Form"
                }],
                videoUrl: "/videos/tutorials/basics/12.mp4"
            }, {
                name: "Form Validation[3]",
                url: "13-form-3",
                modules: [{
                    name: "StringForm"
                }],
                modulesShow: [{
                    name: "Form"
                }],
                videoUrl: "/videos/tutorials/basics/13.mp4"
            }, {
                name: "FPS Tracker",
                url: "14-fps-tracker",
                modules: [{
                    name: "StringLazy"
                }, {
                    name: "StringFPSTracker"
                }],
                modulesShow: [{
                    name: "Lazy"
                }, {
                    name: "FPS Tracker"
                }],
                videoUrl: "/videos/tutorials/basics/14.mp4"
            }, {
                name: "Position Tracker",
                url: "15-position-tracker",
                modules: [{
                    name: "StringLazy"
                }, {
                    name: "StringPositionTracker"
                }],
                modulesShow: [{
                    name: "Lazy"
                }, {
                    name: "Position Tracker"
                }],
                videoUrl: "/videos/tutorials/basics/15.mp4"
            }, {
                name: "Sequence",
                url: "16-sequence",
                modules: [{
                    name: "StringLazy"
                }, {
                    name: "StringSequence"
                }],
                modulesShow: [{
                    name: "Lazy"
                }, {
                    name: "Sequence"
                }],
                videoUrl: "/videos/tutorials/basics/16.mp4"
            }]
        }, {
            name: "Advanced",
            url: "advanced",
            cases: [{
                name: "Offsets & entries",
                url: "",
                modules: [],
                modulesShow: [],
                videoUrl: ""
            }, {
                name: "Progress Slice",
                url: "",
                modules: [],
                modulesShow: [],
                videoUrl: ""
            }, {
                name: "Copying parametrs",
                url: "",
                modules: [],
                modulesShow: [],
                videoUrl: ""
            }]
        }, {
            name: "Typography",
            url: "typography",
            cases: [{
                name: "Text w/ Progress",
                url: "01-text-w-progress",
                modules: [{
                    name: "StringSplit"
                }, {
                    name: "StringProgress"
                }, {
                    name: "StringPositionTracker"
                }],
                modulesShow: [{
                    name: "Split"
                }, {
                    name: "Progress"
                }, {
                    name: "Position Tracker"
                }],
                videoUrl: "/videos/tutorials/typography/01.mp4"
            }, {
                name: "Text w/ Progress 2",
                url: "",
                modules: [],
                modulesShow: [],
                videoUrl: ""
            }, {
                name: "Kinetic text",
                url: "",
                modules: [],
                modulesShow: [],
                videoUrl: ""
            }, {
                name: "Split and Glide",
                url: "",
                modules: [],
                modulesShow: [],
                videoUrl: ""
            }]
        }, {
            name: "Layouts",
            url: "layouts",
            cases: [{
                name: "Footer shifting",
                url: "01-footer-shifting",
                modules: [{
                    name: "StringProgress"
                }],
                modulesShow: [{
                    name: "Smooth scroll"
                }, {
                    name: "Progress"
                }],
                videoUrl: "/videos/tutorials/layouts/01.mp4"
            }]
        }, {
            name: "Specials",
            url: "specials",
            cases: [{
                name: "Xmas Tree",
                url: "01-xmas-tree",
                modules: [{
                    name: "StringSpotlight"
                }, {
                    name: "StringImpulse"
                }],
                modulesShow: [{
                    name: "Spotlight"
                }, {
                    name: "Impulse"
                }],
                videoUrl: "/videos/tutorials/specials/01.mp4"
            }]
        }])
    }
    toPresentation() {
        const e = new Array;
        return this.skillhub.forEach(o => {
            const l = new u(o.name, o.url, []);
            o.cases.forEach(r => {
                l.items.push(new t(r.name, r.url, r.modules, r.modulesShow, r.videoUrl))
            }), e.push(l)
        }), e
    }
}
export {
    S
};