var Me = class {
        constructor(t = .1, e) {
            this.SETTLE_THRESHOLD = .1, this.lastMouseX = 0, this.lastMouseY = 0, this.lastMouseTime = 0, this.smoothingFactor = t, this.context = e, this.onSettingsChange({
                isDesktop: e.data.viewport.windowWidth > 1024,
                isForceRebuild: !1,
                widthChanged: !0,
                heightChanged: !0,
                scrollHeightChanged: !0
            })
        }
        onMouseMove(t) {
            this.context.data.cursor.targetX = t.clientX, this.context.data.cursor.targetY = t.clientY;
            let e = performance.now(),
                s = e - this.lastMouseTime;
            s > 0 && (this.context.data.cursor.velocityX = (t.clientX - this.lastMouseX) / s, this.context.data.cursor.velocityY = (t.clientY - this.lastMouseY) / s), this.lastMouseX = t.clientX, this.lastMouseY = t.clientY, this.lastMouseTime = e
        }
        onFrame() {
            let {
                targetX: t,
                targetY: e,
                smoothedX: s,
                smoothedY: i
            } = this.context.data.cursor, r = this.context.tools.lerp.process({
                from: s,
                to: t,
                progress: this.smoothingFactor
            }), n = this.context.tools.lerp.process({
                from: i,
                to: e,
                progress: this.smoothingFactor
            }), o = this.getStepDistance(r, n);
            this.isSettled(o) ? this.snapToTarget() : this.applyStep(r, n)
        }
        onSettingsChange(t) {
            let e = Number(this.context.settings["cursor-lerp"]);
            this.setLerpFactor(e)
        }
        setLerpFactor(t) {
            this.smoothingFactor = this.context.tools.adaptiveLerp.process({
                value: t,
                inMin: .1,
                inMax: 1,
                outMin: .05,
                outMax: .65
            })
        }
        getStepDistance(t, e) {
            return Math.hypot(t, e)
        }
        isSettled(t) {
            return t < this.SETTLE_THRESHOLD
        }
        snapToTarget() {
            this.context.data.cursor.smoothedX = this.context.data.cursor.targetX, this.context.data.cursor.smoothedY = this.context.data.cursor.targetY, this.context.data.cursor.stepX = 0, this.context.data.cursor.stepY = 0
        }
        applyStep(t, e) {
            this.context.data.cursor.smoothedX += t, this.context.data.cursor.smoothedY += e, this.context.data.cursor.stepX = t, this.context.data.cursor.stepY = e
        }
    },
    fe = class {
        constructor() {
            this.listeners = {}, this.stateEvents = new Set, this.lastPayloads = {}, this.stateEvents.add("screen:mobile"), this.stateEvents.add("screen:tablet"), this.stateEvents.add("screen:laptop"), this.stateEvents.add("screen:desktop"), this.stateEvents.add("start")
        }
        on(t, e, s) {
            let i = s ? `${t}:${s}` : t;
            this.listeners[i] || (this.listeners[i] = new Set), this.listeners[i].add(e), this.stateEvents.has(i) && this.lastPayloads[i] !== void 0 && e(this.lastPayloads[i])
        }
        off(t, e, s) {
            let i = s ? `${t}:${s}` : t;
            this.listeners[i] && this.listeners[i].delete(e)
        }
        emit(t, e) {
            this.stateEvents.has(t) && (this.lastPayloads[t] = e);
            let s = this.listeners[t];
            if (s)
                for (let i of s) i(e)
        }
        onProgress(t, e) {
            this.on(`progress:${t}`, e)
        }
        emitProgress(t, e) {
            this.emit(`progress:${t}`, e)
        }
        onInview(t, e) {
            this.on(`object:inview:${t}`, e)
        }
        emitInview(t, e) {
            this.emit(`object:inview:${t}`, e)
        }
        onScroll(t) {
            this.on("scroll", t)
        }
        emitScroll(t) {
            this.emit("scroll", t)
        }
        onUpdate(t) {
            this.on("update", t)
        }
        emitUpdate() {
            this.emit("update")
        }
        clear(t) {
            delete this.listeners[t]
        }
        clearAll() {
            this.listeners = {}
        }
    };

function Ee(t, e, s, i) {
    switch (t) {
        case "onFrame":
        case "onMutate":
        case "onScrollMeasure":
        case "onMouseMoveMeasure":
        case "onScroll":
            return [e];
        case "onMouseMove":
        case "onWheel":
            return s ? [s] : [];
        case "onDOMMutate":
            return s && i ? [s, i] : [];
        case "onSettingsChange":
            return [];
        default:
            return []
    }
}
var Pe = class {
        constructor(t) {
            this.data = t, this.modules = [], this.uiModules = [], this.allModules = []
        }
        register(t) {
            t.type === 1 ? this.modules.push(t) : t.type === 2 && this.uiModules.push(t), this.rebuildAllModules()
        }
        find(t) {
            return this.modules.find(e => e instanceof t)
        }
        onInit() {
            this.callAll("onInit")
        }
        onFrame() {
            this.callAll("onFrame")
        }
        onMutate() {
            this.callAll("onMutate")
        }
        onScrollMeasure() {
            this.callAll("onScrollMeasure")
        }
        onMouseMoveMeasure() {
            this.callAll("onMouseMoveMeasure")
        }
        onScroll() {
            this.callAll("onScroll")
        }
        onResizeWidth() {
            this.callAll("onResizeWidth")
        }
        onResize() {
            this.callAll("onResize")
        }
        onMouseMove(t) {
            this.callAll("onMouseMove", t)
        }
        onWheel(t) {
            this.callAll("onWheel", t)
        }
        onDirectionChange() {
            this.callAll("onDirectionChange")
        }
        onScrollStart() {
            this.callAll("onScrollStart")
        }
        onScrollStop() {
            this.callAll("onScrollStop")
        }
        onAxisChange() {
            this.callAll("onAxisChange")
        }
        onDeviceChange() {
            this.callAll("onDeviceChange")
        }
        onScrollConfigChange() {
            this.callAll("onScrollConfigChange")
        }
        onSettingsChange(t) {
            this.callAll("onSettingsChange")
        }
        onDOMMutate(t, e) {
            this.callAll("onDOMMutate", t, e)
        }
        destroy() {
            this.callAll("destroy"), this.modules = [], this.uiModules = [], this.allModules = []
        }
        get all() {
            return this.allModules
        }
        get core() {
            return this.modules
        }
        get ui() {
            return this.uiModules
        }
        callAll(t, e, s) {
            this.callLifecycle(this.modules, t, e, s), this.callLifecycle(this.uiModules, t, e, s)
        }
        callLifecycle(t, e, s, i) {
            if (t.length === 0) return;
            let r = Ee(e, this.data, s, i);
            for (let n = 0; n < t.length; n++) {
                let o = t[n];
                o && o[e](...r)
            }
        }
        rebuildAllModules() {
            this.allModules = [...this.modules, ...this.uiModules]
        }
    },
    Se = class {
        constructor(t, e, s) {
            this.parent = s, this.properties = new Map, this.id = t, this.htmlElement = e
        }
        get parentObject() {
            return this.parent
        }
        setProperty(t, e) {
            this.properties.set(t, e)
        }
        getProperty(t) {
            return this.properties.get(t) ? ? null
        }
        setEasing(t) {
            this.easingFn = t ? ? void 0
        }
        getEasing() {
            return this.easingFn
        }
        applyProgress(t, e) {
            let s = this.easingFn ? ? e;
            return s ? s(t) : t
        }
    },
    Ce = class {
        constructor(t, e) {
            this.id = "", this.keys = [], this.mirrors = new Map, this.properties = new Map, this.modules = [], this.events = new fe, this.htmlElement = e, this.id = t
        }
        setProperty(t, e) {
            this.properties.set(t, e)
        }
        getProperty(t) {
            return this.properties.get(t) ? ? null
        }
        enter() {
            this.events.emit("enter", this), this.setProperty("active", !0), this.modules.forEach(t => {
                t.enterObject(this.id, this)
            })
        }
        leave() {
            this.events.emit("leave", this), this.setProperty("active", !1), this.modules.forEach(t => {
                t.exitObject(this.id)
            })
        }
        remove() {
            this.modules.forEach(t => {
                t.removeObject(this.id)
            })
        }
        show() {
            this.htmlElement.classList.add("-inview")
        }
        hide() {
            this.getProperty("repeat") && this.htmlElement.classList.remove("-inview")
        }
        connect(t) {
            this.modules.includes(t) || this.modules.push(t)
        }
        addMirror(t) {
            this.mirrors.set(t.id, t)
        }
        removeMirror(t) {
            this.mirrors.delete(t)
        }
        get mirrorObjects() {
            return Array.from(this.mirrors.values())
        }
        get connects() {
            return this.mirrorObjects.map(t => t.htmlElement)
        }
    },
    ke = class {
        constructor(t, e, s, i) {
            this.data = t, this.modules = e, this.events = s, this.tools = i, this.objects = new Map, this.connectQueue = [], this.mirrors = new Map, this.mirrorId = 1, this.globalId = 1
        }
        get all() {
            return this.objects
        }
        add(t) {
            let e = `string-${this.globalId++}`,
                s = "string-id";
            t.getAttribute("string-id") && (e = t.getAttribute("string-id"), s = "string-id"), t.getAttribute("data-string-id") && (e = t.getAttribute("data-string-id"), s = "data-string-id");
            let i = e && this.objects.has(e) ? this.objects.get(e) : new Ce(e, t);
            t.setAttribute(s, i.id);
            let r = t.getAttribute("string") ? ? t.getAttribute("data-string");
            r && (i.keys = (r ? ? "").split("|").map(o => o.trim()).filter(Boolean)), t.setAttribute("string-inited", ""), this.objects.set(i.id, i);
            let n = this.getAllAttributes(t);
            this.modules.core.forEach(o => {
                "setupCoreProperties" in o && typeof o.setupCoreProperties == "function" && o.setupCoreProperties(i, t, n)
            }), this.modules.core.forEach(o => {
                o.canConnect(i) && (o.initializeObject(this.globalId, i, t, n), o.calculatePositions(i, this.data.viewport.windowHeight), o.connectObject(i), o.addObject(i.id, i))
            }), this.connectQueue.filter(o => o.id === i.id).forEach(o => this.attachMirrorToObject(i, o.element)), this.connectQueue = this.connectQueue.filter(o => o.id !== i.id), this.initObservers(i, t), this.checkInviewForObject(i)
        }
        remove(t) {
            var s, i;
            let e = this.objects.get(t);
            e && (e.events.clearAll(), (s = e.getProperty("observer-progress")) == null || s.disconnect(), (i = e.getProperty("observer-inview")) == null || i.disconnect(), e.htmlElement.removeAttribute("string-inited"), e.leave(), e.remove(), e.mirrorObjects.forEach(r => {
                r.htmlElement.removeAttribute("string-mirror-id"), this.mirrors.delete(r.id);
                let n = r.htmlElement.getAttribute("string-copy-from") ? ? r.htmlElement.getAttribute("data-string-copy-from");
                n && this.enqueueConnection(n, r.htmlElement)
            }), this.objects.delete(t))
        }
        enqueueConnection(t, e) {
            this.connectQueue.some(s => s.id === t && s.element === e) || this.connectQueue.push({
                id: t,
                element: e
            })
        }
        linkMirror(t, e) {
            let s = this.objects.get(t);
            s ? this.attachMirrorToObject(s, e) : this.enqueueConnection(t, e)
        }
        attachMirrorToObject(t, e) {
            let s = e.getAttribute("string-mirror-id") ? ? e.getAttribute("data-string-mirror-id");
            if (s) {
                let o = this.mirrors.get(s);
                if (o) {
                    if (o.parentObject === t) return o;
                    o.parentObject.removeMirror(s), this.mirrors.delete(s)
                }
            }
            let i = s ? ? `string-mirror-${this.mirrorId++}`,
                r = new Se(i, e, t);
            e.setAttribute("string-mirror-id", i), t.addMirror(r), this.mirrors.set(i, r);
            let n = e.getAttribute("string-easing") ? ? e.getAttribute("data-string-easing");
            return n && n.trim().length > 0 && (r.setEasing(this.tools.easingFunction.process({
                easing: n
            })), r.setProperty("easing", n)), r
        }
        detachMirrorByElement(t) {
            let e = t.getAttribute("string-mirror-id") ? ? t.getAttribute("data-string-mirror-id");
            e && (this.detachMirrorById(e), t.removeAttribute("string-mirror-id"))
        }
        detachMirrorById(t) {
            let e = this.mirrors.get(t);
            e && (e.parentObject.removeMirror(t), this.mirrors.delete(t))
        }
        getAllAttributes(t) {
            let e = {};
            return Array.from(t.attributes).forEach(s => {
                e[s.name] = s.value
            }), e
        }
        initObservers(t, e) {
            var p;
            let s = t.getProperty("offset-top") ? ? 0,
                i = t.getProperty("offset-bottom") ? ? 0;
            (p = t.getProperty("observer-progress")) == null || p.disconnect();
            let r = y => {
                    y.forEach(m => {
                        this.events.emit(`object:activate:${t.id}`, m.isIntersecting), m.isIntersecting ? t.enter() : t.leave()
                    })
                },
                n = t.getProperty("outside-container"),
                o = e.getAttribute("string-outside-container") ? ? e.getAttribute("data-string-outside-container"),
                a = o != null ? o.trim().toLowerCase() : null,
                l = a === "" || a === "true" || a === "1",
                h = n != null ? n === !0 : l,
                c = this.data.scroll.container === document.body || h ? null : this.data.scroll.container,
                d = new IntersectionObserver(r, {
                    root: c,
                    rootMargin: `${i+this.data.viewport.windowHeight}px 0px ${s+this.data.viewport.windowHeight}px 0px`,
                    threshold: 0
                });
            d.observe(e), t.setProperty("observer-progress", d)
        }
        observeDOM() {
            new MutationObserver(t => {
                t.forEach(e => {
                    e.type === "childList" && (e.removedNodes.forEach(s => {
                        if (s.nodeType !== Node.ELEMENT_NODE) return;
                        let i = s;
                        this.detachMirrorByElement(i), !this.isFixed(i) && (i.hasAttribute("string") && this.handleRemoved(i), i.querySelectorAll("[string],[data-string]").forEach(r => {
                            this.isFixed(r) || this.handleRemoved(r)
                        }), i.querySelectorAll("[string-copy-from],[data-string-copy-from]").forEach(r => this.detachMirrorByElement(r)))
                    }), e.addedNodes.forEach(s => {
                        if (s.nodeType !== Node.ELEMENT_NODE) return;
                        let i = s;
                        if (this.isFixed(i)) return;
                        i.hasAttribute("string") && !i.hasAttribute("string-inited") && this.add(i), i.querySelectorAll("[string]:not([string-inited]),[data-string]:not([string-inited])").forEach(n => this.add(n));
                        let r = i.getAttribute("string-copy-from") ? ? i.getAttribute("data-string-copy-from");
                        r && this.linkMirror(r, i), i.querySelectorAll("[string-copy-from],[data-string-copy-from]").forEach(n => {
                            let o = n.getAttribute("string-copy-from") ? ? n.getAttribute("data-string-copy-from");
                            o && this.linkMirror(o, n)
                        })
                    }), (e.addedNodes.length > 0 || e.removedNodes.length > 0) && this.modules.onDOMMutate(e.addedNodes, e.removedNodes), this.modules.all.forEach(s => s.onDOMRebuild()))
                })
            }).observe(document.body, {
                childList: !0,
                subtree: !0
            })
        }
        handleRemoved(t) {
            let e = t.getAttribute("string-id") ? ? t.getAttribute("data-string-id");
            if (!e) return;
            let s = t.getAttribute("string-copy-from") ? ? t.getAttribute("data-string-copy-from");
            s && (this.connectQueue = this.connectQueue.filter(i => i.id !== s)), this.remove(e)
        }
        onSettingsChange(t) {
            this.objects.forEach(e => {
                this.modules.core.forEach(s => {
                    let i = !1;
                    if (t.isDesktop ? (s.permissions.desktop.rebuild.scrollHeight && t.scrollHeightChanged && (i = !0), s.permissions.desktop.rebuild.width && t.widthChanged && (i = !0), s.permissions.desktop.rebuild.height && t.heightChanged && (i = !0)) : (s.permissions.mobile.rebuild.scrollHeight && t.scrollHeightChanged && (i = !0), s.permissions.mobile.rebuild.width && t.widthChanged && (i = !0), s.permissions.mobile.rebuild.height && t.heightChanged && (i = !0)), (i || t.isForceRebuild) && s.canConnect(e)) {
                        let r = this.getAllAttributes(e.htmlElement);
                        s.initializeObject(this.globalId, e, e.htmlElement, r), s.calculatePositions(e, this.data.viewport.windowHeight), s.connectObject(e)
                    }
                })
            })
        }
        isFixed(t) {
            return t.hasAttribute("string-fixed")
        }
        checkInview() {
            this.objects.forEach(t => {
                this.checkInviewForObject(t)
            })
        }
        checkInviewForObject(t) {
            let e = this.data.scroll.transformedCurrent,
                s = t.getProperty("inview-start-position"),
                i = t.getProperty("inview-end-position"),
                r = t.getProperty("is-inview") ? ? !1,
                n = Math.min(s, i),
                o = Math.max(s, i),
                a = e >= n && e <= o,
                l = null;
            if (!r && a) {
                let h = Math.abs(e - n),
                    c = Math.abs(o - e);
                l = h <= c ? "enter-top" : "enter-bottom"
            } else r && !a && (l = e < n ? "exit-top" : "exit-bottom");
            a !== r && (t.setProperty("is-inview", a), this.events.emit(`object:inview:${t.id}`, {
                inView: a,
                direction: l
            }), a ? t.show() : t.hide())
        }
    },
    re = class {
        constructor(t) {
            this.name = "", this.isProg = !1, this.isParallaxEnabled = !1, this._scrollDirection = "vertical", this.isBottomScrollDirection = null, this.isLastBottomScrollDirection = !0, this.scrollTriggerRules = [], this.onChangeDirection = () => {}, this.onScrollStart = () => {}, this.onScrollStop = () => {}, this.onCalcUpdate = () => {
                var e;
                (e = this.context.data.scroll.scrollContainer) == null || e.scrollTo(0, this.context.data.scroll.current), this.triggerScrollRules()
            }, this.document = document, this.context = t
        }
        set scrollDirection(t) {
            this._scrollDirection = t, this._scrollDirection === "vertical" ? this.onCalcUpdate = () => {
                var e;
                (e = this.context.data.scroll.scrollContainer) == null || e.scrollTo(0, this.context.data.scroll.current), this.triggerScrollRules()
            } : this._scrollDirection === "horizontal" && (this.onCalcUpdate = () => {
                var e;
                (e = this.context.data.scroll.scrollContainer) == null || e.scrollTo(this.context.data.scroll.current, 0)
            })
        }
        onFrame() {}
        onWheel(t) {}
        onScroll(t) {}
        disableScrollEvents() {}
        enableScrollEvents() {}
        triggerScrollRules() {
            this.scrollTriggerRules.forEach(t => {
                var e, s;
                (t.direction === "any" || this.isLastBottomScrollDirection && t.direction === "forward") && this.context.data.scroll.current >= t.offset ? ((e = t.onEnter) == null || e.call(t), t.toggleClass && t.toggleClass.target.classList.add(t.toggleClass.className)) : ((s = t.onLeave) == null || s.call(t), t.toggleClass && t.toggleClass.target.classList.remove(t.toggleClass.className))
            })
        }
        addScrollMark(t) {
            this.scrollTriggerRules.push(t)
        }
        removeScrollMark(t) {
            this.scrollTriggerRules = this.scrollTriggerRules.filter(e => e.id !== t)
        }
        scrollTo(t) {}
    },
    Ae = class extends re {
        constructor(t) {
            super(t), this.name = "default"
        }
        onFrame() {
            if (this.context.data.scroll.delta !== 0) {
                let t = this.context.data.scroll.delta * this.context.data.scroll.speedAccelerate;
                this.context.data.scroll.delta -= t, this.context.data.scroll.lerped = t, Math.abs(this.context.data.scroll.lerped) < .1 && (this.context.data.scroll.delta = 0, this.context.data.scroll.lerped = 0, this.onScrollStop())
            }
        }
        onScroll(t) {
            let e = this.context.data.scroll.elementContainer.scrollTop;
            this.context.data.scroll.current = e, this.context.data.scroll.target = e, this.context.data.scroll.transformedCurrent = e
        }
        onWheel(t) {
            if (t.deltaY !== 0) {
                this.context.data.scroll.delta === 0 && this.onScrollStart();
                let e = t.deltaY;
                this.context.data.scroll.target === 0 && (this.context.data.scroll.delta += Math.max(0, t.deltaY)), this.context.data.scroll.delta += e
            }
        }
        scrollTo(t) {
            this.context.data.scroll.target = t, this.context.data.scroll.delta = 1
        }
    },
    Le = class extends re {
        constructor(t) {
            super(t), this.name = "disable", this.preventScroll = e => {
                e.preventDefault()
            }, this.preventKeyScroll = e => {
                ["ArrowUp", "ArrowDown", "PageUp", "PageDown", " ", "Home", "End"].includes(e.key) && e.preventDefault()
            }, this.onPreventScroll = this.preventScroll.bind(this), this.onPreventKeyScroll = this.preventKeyScroll.bind(this)
        }
        disableScrollEvents() {
            window.addEventListener("touchmove", this.onPreventScroll, {
                passive: !1
            }), window.addEventListener("keydown", this.onPreventKeyScroll)
        }
        enableScrollEvents() {
            window.removeEventListener("touchmove", this.onPreventScroll), window.removeEventListener("keydown", this.onPreventKeyScroll)
        }
        onFrame() {}
        onWheel(t) {
            t.preventDefault()
        }
        onScroll(t) {
            t.preventDefault()
        }
    },
    B = {
        SCROLL_FORWARD: "-scroll-forward",
        SCROLL_BACKWARD: "-scroll-backward",
        SCROLLING_FORWARD: "-scrolling-forward",
        SCROLLING_BACKWARD: "-scrolling-backward"
    },
    Oe = class extends re {
        constructor(t) {
            super(t), this.name = "smooth", this.isScrollbarManipulation = !1, this.scrollForce = 0, this.wheelImpulse = 0, this.previousCurrent = 0, this.velocityThreshold = .1
        }
        updateScrollDirection(t) {
            if (this.isLastBottomScrollDirection = t, this.isBottomScrollDirection === null) {
                this.isBottomScrollDirection = t;
                return
            }
            this.context.data.scroll.isScrollingDown = t, this.onChangeDirection(), this.context.events.emit("scroll:direction:change", this.context.data.scroll.isScrollingDown), this.context.settings["global-class"] && (document.documentElement.classList.toggle(B.SCROLLING_FORWARD, t), document.documentElement.classList.toggle(B.SCROLLING_BACKWARD, !t), document.documentElement.classList.toggle(B.SCROLL_FORWARD, t), document.documentElement.classList.toggle(B.SCROLL_BACKWARD, !t))
        }
        stopScroll() {
            this.context.data.scroll.lerped = 0, this.context.data.scroll.delta = 0, this.context.data.scroll.target = this.context.data.scroll.current, this.isProg = !1, this.onCalcUpdate(), document.documentElement.classList.remove(B.SCROLLING_BACKWARD, B.SCROLLING_FORWARD), this.isBottomScrollDirection = null
        }
        onFrame() {
            if (this.isScrollbarManipulation) {
                this.isScrollbarManipulation = !1, this.context.data.scroll.current = this.context.data.scroll.elementContainer.scrollTop, this.context.data.scroll.target = this.context.data.scroll.elementContainer.scrollTop, this.context.data.scroll.transformedCurrent = this.context.data.scroll.current * this.context.data.viewport.transformScale;
                return
            }
            if (this.context.data.scroll.delta !== 0) {
                this.scrollForce = this.context.data.scroll.delta * this.context.data.scroll.speedAccelerate, this.context.data.scroll.target = Math.min(Math.max(0, this.context.data.scroll.target + this.scrollForce), this.context.data.scroll.bottomPosition), this.context.data.scroll.delta -= this.scrollForce, this.context.data.scroll.lerped = (this.context.data.scroll.target - this.context.data.scroll.current) * this.context.data.scroll.speed;
                let t = Math.abs(this.context.data.scroll.lerped);
                this.context.data.scroll.lerped > 0 ? this.context.data.scroll.current = Math.ceil(this.context.data.scroll.current + this.context.data.scroll.lerped) : this.context.data.scroll.current = Math.floor(this.context.data.scroll.current + this.context.data.scroll.lerped), this.context.data.scroll.transformedCurrent = this.context.data.scroll.current * this.context.data.viewport.transformScale, this.updateScrollDirection(this.context.data.scroll.lerped > 0), t < this.velocityThreshold ? (this.stopScroll(), this.onScrollStop()) : (this.isProg = !0, this.previousCurrent !== this.context.data.scroll.current && (this.previousCurrent = this.context.data.scroll.current, this.onCalcUpdate()))
            }
        }
        onWheel(t) {
            if (t.deltaY !== 0 && t.preventDefault(), this.wheelImpulse = t.deltaY, this.wheelImpulse === 0) return;
            this.context.data.scroll.delta === 0 && this.onScrollStart();
            let e = Math.sign(this.wheelImpulse),
                s = this.context.data.scroll.target === 0 && e < 0,
                i = this.context.data.scroll.target === this.context.data.scroll.bottomPosition && e > 0;
            s || i || (this.context.data.scroll.delta += this.wheelImpulse)
        }
        onScroll(t) {
            this.isProg || (this.isScrollbarManipulation = !0)
        }
        scrollTo(t) {
            this.context.data.scroll.target = t, this.context.data.scroll.delta = 1
        }
    },
    Te = class {
        constructor(t) {
            this.context = t, this.modes = new Map, this.modes.set("smooth", new Oe(t)), this.modes.set("default", new Ae(t)), this.modes.set("disable", new Le(t)), this.updateResponsiveMode()
        }
        setMobileMode(t) {
            this.context.data.scroll.modeMobile = t, this.updateResponsiveMode()
        }
        setDesktopMode(t) {
            this.context.data.scroll.modeDesktop = t, this.updateResponsiveMode()
        }
        updateResponsiveMode() {
            let t = window.innerWidth < 1024 ? this.context.data.scroll.modeMobile : this.context.data.scroll.modeDesktop;
            this.setMode(t)
        }
        updatePosition() {
            this.modes.forEach(t => {
                t.onCalcUpdate()
            })
        }
        setMode(t) {
            if (!this.modes.has(t)) {
                console.warn(`[ScrollManager] Unknown scroll mode: ${t}`);
                return
            }
            this.get().enableScrollEvents(), this.context.data.scroll.mode = t, this.get().disableScrollEvents()
        }
        get() {
            return this.modes.get(this.context.data.scroll.mode)
        }
        getEngines() {
            return this.modes
        }
        onFrame() {
            this.get().onFrame()
        }
        onScroll(t) {
            this.get().onScroll(t)
        }
        onWheel(t) {
            this.get().onWheel(t)
        }
        bindEvents(t) {
            this.modes.forEach(e => {
                e.onScrollStart = t.onScrollStart, e.onScrollStop = t.onScrollStop, e.onChangeDirection = t.onDirectionChange
            })
        }
        addScrollMark(t) {
            this.modes.forEach(e => {
                e.addScrollMark(t)
            })
        }
        removeScrollMark(t) {
            this.modes.forEach(e => {
                e.removeScrollMark(t)
            })
        }
    },
    Fe = class {
        constructor() {
            this.targetX = 0, this.targetY = 0, this.smoothedX = 0, this.smoothedY = 0, this.stepX = 0, this.stepY = 0, this.velocityX = 0, this.velocityY = 0
        }
    },
    De = class {
        constructor() {
            this.threeInstance = null
        }
    },
    je = class {
        constructor() {
            this.target = 0, this.current = 0, this.transformedCurrent = 0, this.delta = 0, this.lerped = 0, this.displacement = 0, this.isScrollingDown = !1, this.topPosition = 0, this.bottomPosition = 0, this.direction = "vertical", this.elementContainer = document.documentElement, this.scrollContainer = window, this.container = document.body, this.mode = "smooth", this.modeMobile = "smooth", this.modeDesktop = "smooth", this.speed = .1, this.speedAccelerate = .25
        }
    },
    Re = class {
        constructor() {
            this.fpsTracker = !1, this.positionTracker = !1
        }
    },
    Ie = class {
        constructor() {
            this.now = 0, this.previous = 0, this.delta = 0, this.elapsed = 0
        }
    },
    Ne = class {
        constructor() {
            this.windowWidth = 0, this.windowHeight = 0, this.contentWidth = 0, this.contentHeight = 0, this.scaleWidth = 1, this.scaleHeight = 1, this.transformScale = 1, this.baseRem = 16
        }
    },
    $e = class {
        constructor() {
            this.scroll = new je, this.viewport = new Ne, this.cursor = new Fe, this.render = new De, this.time = new Ie, this.system = new Re
        }
    },
    Ve = class {
        constructor() {
            this.desktop = {
                rebuild: {
                    width: !0,
                    height: !0,
                    scrollHeight: !0
                }
            }, this.mobile = {
                rebuild: {
                    width: !0,
                    height: !0,
                    scrollHeight: !0
                }
            }
        }
    },
    A = class {
        constructor(t) {
            this.objectMapOnPage = new Map, this.objectsOnPage = [], this.objectMap = new Map, this.objects = [], this.htmlKey = "", this._type = 1, this.permissions = new Ve, this.tools = t.tools, this.data = t.data, this.settings = t.settings, this.events = t.events, this.centers = t.centers, this.hover = t.hover, this.attributesToMap = [{
                key: "active",
                type: "boolean",
                fallback: this.settings.active
            }, {
                key: "fixed",
                type: "boolean",
                fallback: this.settings.fixed
            }, {
                key: "outside-container",
                type: "boolean",
                fallback: this.settings["outside-container"]
            }, {
                key: "repeat",
                type: "boolean",
                fallback: this.settings.repeat
            }, {
                key: "self-disable",
                type: "boolean",
                fallback: this.settings["self-disable"]
            }, {
                key: "abs",
                type: "boolean",
                fallback: this.settings.abs
            }, {
                key: "key",
                type: "string",
                fallback: this.settings.key
            }, {
                key: "offset-top",
                type: "dimension",
                fallback: this.settings["offset-top"]
            }, {
                key: "offset-bottom",
                type: "dimension",
                fallback: this.settings["offset-bottom"]
            }, {
                key: "inview-top",
                type: "dimension",
                fallback: this.settings["inview-top"]
            }, {
                key: "inview-bottom",
                type: "dimension",
                fallback: this.settings["inview-bottom"]
            }, {
                key: "start",
                type: "number",
                fallback: (e, s, i) => {
                    let r = i.top;
                    return Math.floor(r) + this.data.scroll.container.scrollTop * this.data.viewport.transformScale
                }
            }, {
                key: "end",
                type: "number",
                fallback: (e, s, i) => {
                    let r = i.top,
                        n = i.height;
                    return r + n - this.data.scroll.transformedCurrent
                }
            }, {
                key: "size",
                type: "number",
                fallback: (e, s, i) => i.height
            }, {
                key: "half-width",
                type: "number",
                fallback: (e, s, i) => i.width / 2
            }, {
                key: "half-height",
                type: "number",
                fallback: (e, s, i) => i.height / 2
            }, {
                key: "enter-el",
                type: "string",
                fallback: this.settings["enter-el"]
            }, {
                key: "enter-vp",
                type: "string",
                fallback: this.settings["enter-vp"]
            }, {
                key: "exit-el",
                type: "string",
                fallback: this.settings["exit-el"]
            }, {
                key: "exit-vp",
                type: "string",
                fallback: this.settings["exit-vp"]
            }]
        }
        get type() {
            return this._type
        }
        initializeObject(t, e, s, i) {
            let r = this.tools.boundingClientRect.process({
                element: s
            });
            for (let {
                    key: n,
                    type: o,
                    fallback: a,
                    transform: l
                } of this.attributesToMap) {
                let h = typeof a == "function" ? a(s, e, r) : a,
                    c = this.tools.domAttribute.process({
                        element: s,
                        key: n,
                        fallback: i[n] ? ? this.settings[n] ? ? h
                    }),
                    d = this.parseAttribute(c, o, {
                        element: s,
                        boundingRect: r,
                        viewportHeight: this.data.viewport.windowHeight,
                        baseRem: this.data.viewport.baseRem
                    });
                l && (d = l(d)), e.setProperty(n, d)
            }
        }
        calculatePositions(t, e) {
            let s = t.getProperty("start"),
                i = t.getProperty("size"),
                r = t.getProperty("offset-bottom"),
                n = t.getProperty("offset-top"),
                o = t.getProperty("enter-el"),
                a = t.getProperty("enter-vp"),
                l = t.getProperty("exit-el"),
                h = t.getProperty("exit-vp"),
                c = 0,
                d = 0,
                p = 0,
                y = 0;
            o === "top" && a === "top" || o === "left" && a === "left" ? (p = -e + 1, c = s - r) : o === "top" && a === "bottom" || o === "left" && a === "right" ? c = s - e - r : o === "bottom" && a === "top" || o === "right" && a === "left" ? (p = -e - i + 1, c = s + i - r) : (o === "bottom" && a === "bottom" || o === "right" && a === "right") && (p = -i + 1, c = s - e + i - r), l === "top" && h === "top" || l === "left" && h === "left" ? (y = -i + 1, d = s + n) : l === "top" && h === "bottom" || l === "left" && h === "right" ? (y = -e - i + 1, d = s - e + n) : l === "bottom" && h === "top" || l === "right" && h === "left" ? d = s + i + n : (l === "bottom" && h === "bottom" || l === "right" && h === "right") && (y = -e + 1, d = s - e + i + n), t.setProperty("start-bias", p), t.setProperty("end-bias", y), t.setProperty("start-position", c - this.data.scroll.topPosition), t.setProperty("end-position", d - this.data.scroll.topPosition), t.setProperty("difference-position", d - c);
            let m = t.getProperty("inview-top") ? ? 0,
                u = t.getProperty("inview-bottom") ? ? 0;
            t.setProperty("inview-start-position", t.getProperty("start-position") + m), t.setProperty("inview-end-position", t.getProperty("end-position") + u)
        }
        parseAttribute(t, e, s = {}) {
            if (t == null) return null;
            if (typeof e == "object" && e.type === "enum") return e.values.includes(t) ? t : e.values[0];
            switch (e) {
                case "number":
                    return parseFloat(t);
                case "boolean":
                    return t === "" || t === "true";
                case "json":
                    try {
                        return JSON.parse(t)
                    } catch {
                        return null
                    }
                case "tuple":
                    return t.trim().split(/\s+/);
                case "easing":
                    return this.tools.easingFunction.process({
                        easing: t
                    });
                case "color":
                    return this.tools.colorParser.process({
                        value: t
                    });
                case "dimension":
                    return t == "0" ? 0 : s.element != null && s.viewportHeight != null && s.baseRem != null && s.boundingRect != null ? this.tools.unitParser.process({
                        value: t,
                        element: s.element,
                        viewportHeight: s.viewportHeight,
                        boundingRect: s.boundingRect,
                        baseRem: s.baseRem
                    }) : 0;
                case "breakpoint-dimension":
                    if (s.element != null && s.viewportHeight != null && s.baseRem != null && s.boundingRect != null) {
                        let i = t.trim().split("|"),
                            r = [];
                        for (let n of i)
                            if (n.includes(":")) {
                                let [o, a] = n.split(":");
                                r.push({
                                    breakpoint: parseInt(o),
                                    value: this.tools.unitParser.process({
                                        value: `${a}|`,
                                        element: s.element,
                                        viewportHeight: s.viewportHeight,
                                        boundingRect: s.boundingRect,
                                        baseRem: s.baseRem
                                    })
                                })
                            } else r.push({
                                breakpoint: 0,
                                value: this.tools.unitParser.process({
                                    value: n,
                                    element: s.element,
                                    viewportHeight: s.viewportHeight,
                                    boundingRect: s.boundingRect,
                                    baseRem: s.baseRem
                                })
                            });
                        return r
                    }
                default:
                    return t
            }
        }
        canConnect(t) {
            return t.keys.includes(this.htmlKey)
        }
        connectObject(t) {
            t.connect(this), this.onObjectConnected(t)
        }
        enterObject(t, e) {
            this.objectMap.has(t) || (this.objectMap.set(t, e), this.objects.push(e))
        }
        exitObject(t) {
            let e = this.objectMap.get(t);
            if (!e) return;
            this.objectMap.delete(t);
            let s = this.objects.indexOf(e);
            s !== -1 && this.objects.splice(s, 1)
        }
        addObject(t, e) {
            this.objectMapOnPage.has(t) || (this.objectMapOnPage.set(t, e), this.objectsOnPage.push(e))
        }
        removeObject(t) {
            let e = this.objectMapOnPage.get(t);
            if (!e) return;
            this.objectMapOnPage.delete(t);
            let s = this.objectsOnPage.indexOf(e);
            s !== -1 && this.objectsOnPage.splice(s, 1), this.onObjectDisconnected(e)
        }
        onObjectConnected(t) {}
        onObjectDisconnected(t) {}
        applyToElementAndConnects(t, e, s = e) {
            t.getProperty("self-disable") !== !0 && e(t.htmlElement), t.mirrorObjects.forEach(i => s(i.htmlElement, i))
        }
        destroy() {
            this.objects = [], this.objectMap = new Map
        }
        onInit() {}
        onFrame(t) {}
        onMutate(t) {}
        onScrollMeasure(t) {}
        onMouseMoveMeasure(t) {}
        onResize() {}
        onResizeWidth() {}
        onScroll(t) {}
        onDirectionChange() {}
        onScrollStart() {}
        onScrollStop() {}
        onScrollDirectionChange() {}
        onAxisChange() {}
        onDeviceChange() {}
        onScrollConfigChange() {}
        onSettingsChange() {}
        onDOMRebuild() {}
        onMouseMove(t) {}
        onWheel(t) {}
        onDOMMutate(t, e) {}
    },
    We = class {
        process({
            element: t
        }) {
            return t.getBoundingClientRect()
        }
    },
    ze = class {
        process({
            element: t,
            key: e,
            fallback: s = null
        }) {
            return t.getAttribute(`string-${e}`) ? ? t.getAttribute(`data-string-${e}`) ? ? s
        }
    },
    He = class {
        process({
            record: t,
            name: e,
            fallback: s = null
        }) {
            return t[e] ? ? t[`data-${e}`] ? ? s
        }
    },
    be = class {
        process({
            element: t
        }) {
            var i;
            let e = t.getBoundingClientRect(),
                s = ((i = getComputedStyle(t).transform.match(/-?[\d.]+/g)) == null ? void 0 : i.map(parseFloat)) ? ? [];
            if (s.length === 6) {
                let [r, n, o, a, l, h] = s, c = r * a - n * o;
                return {
                    width: e.width / (r || 1),
                    height: e.height / (a || 1),
                    left: (e.left * a - e.top * o + o * h - l * a) / c,
                    top: (-e.left * n + e.top * r + l * n - r * h) / c
                }
            }
            return e
        }
    },
    Be = class {
        constructor(t = new be) {
            this.transformTool = t
        }
        process({
            element: t,
            container: e = document.body
        }) {
            let s;
            try {
                s = e.getBoundingClientRect()
            } catch {
                s = document.body.getBoundingClientRect()
            }
            let i = this.transformTool.process({
                element: t
            });
            return {
                top: i.top - s.top,
                left: i.left - s.left
            }
        }
    },
    qe = class {
        process({
            from: t,
            to: e,
            progress: s
        }) {
            return (e - t) * s
        }
    },
    _e = class {
        process({
            value: t,
            element: e,
            viewportHeight: s,
            baseRem: i,
            boundingRect: r
        }) {
            let n = t.split("|").map(a => a.trim()).filter(Boolean),
                o = 0;
            for (let a of n) {
                let l = a,
                    h = !1;
                l.startsWith("-") && (h = !0, l = l.slice(1));
                let c = 0;
                l === "selfHeight" ? c = e.offsetHeight : l.endsWith("px") ? c = parseFloat(l) : l.endsWith("%") ? c = parseFloat(l) / 100 * s : l.endsWith("rem") ? c = parseFloat(l) * i : l.endsWith("sh") ? c = parseFloat(l) * r.height / 100 : c = parseFloat(l), o += h ? -c : c
            }
            return o
        }
    },
    Ue = class {
        process({
            value: t,
            inMin: e = .1,
            inMax: s = 1,
            outMin: i = .05,
            outMax: r = .65
        }) {
            if (t < e) return r;
            if (t > 1 && (t = 1), t <= s) {
                let n = (t - e) / (s - e);
                return r - n * (r - i)
            }
            return i
        }
    },
    R = {
        left: 0,
        center: .5,
        right: 1
    },
    I = {
        top: 0,
        center: .5,
        bottom: 1
    },
    Ke = class {
        process({
            value: t
        }) {
            if (!t) return "center";
            let e = t.trim();
            if (e.startsWith("random(") && e.endsWith(")")) {
                let s = e.slice(7, -1).split(",").map(r => r.trim()).filter(Boolean),
                    i = Math.floor(Math.random() * s.length);
                return s[i]
            }
            return e
        }
        toNormalized({
            value: t
        }) {
            let e = this.process({
                value: t
            }).toLowerCase().split(/\s+/).filter(Boolean);
            if (e.length === 0) return {
                x: .5,
                y: .5
            };
            if (e.length === 1) {
                let o = e[0],
                    a = this.parseValue(o);
                return o in R && !(o in I) ? {
                    x: a,
                    y: .5
                } : o in I && !(o in R) ? {
                    x: .5,
                    y: a
                } : {
                    x: a,
                    y: a
                }
            }
            let [s, i] = e, r = s in I && !(s in R), n = i in R && !(i in I);
            return r || n ? {
                x: this.parseValue(i, "horizontal"),
                y: this.parseValue(s, "vertical")
            } : {
                x: this.parseValue(s, "horizontal"),
                y: this.parseValue(i, "vertical")
            }
        }
        parseValue(t, e) {
            if (e === "horizontal" && t in R) return R[t];
            if (e === "vertical" && t in I) return I[t];
            if (t in R) return R[t];
            if (t in I) return I[t];
            if (t.endsWith("%")) {
                let i = parseFloat(t);
                if (!isNaN(i)) return i / 100
            }
            let s = parseFloat(t);
            return isNaN(s) ? .5 : s > 1 ? s / 100 : s
        }
    },
    Ye = class {
        process({
            value: t
        }) {
            let e = t.trim().toLowerCase();
            if (e.startsWith("#")) {
                let r = e.slice(1);
                r.length === 3 && (r = r.split("").map(h => h + h).join(""));
                let n = parseInt(r.slice(0, 2), 16),
                    o = parseInt(r.slice(2, 4), 16),
                    a = parseInt(r.slice(4, 6), 16),
                    l = r.length === 8 ? parseInt(r.slice(6, 8), 16) / 255 : 1;
                return {
                    r: n,
                    g: o,
                    b: a,
                    a: l
                }
            }
            let s = e.match(/rgba?\(([^)]+)\)/);
            if (s) {
                let [r, n, o, a = 1] = s[1].split(",").map(l => parseFloat(l.trim()));
                return {
                    r,
                    g: n,
                    b: o,
                    a
                }
            }
            let i = e.match(/hsla?\(([^)]+)\)/);
            if (i) {
                let [r, n, o, a = "1"] = i[1].split(",").map(d => d.trim()), [l, h, c] = this.hslToRgb(parseFloat(r), parseFloat(n), parseFloat(o));
                return {
                    r: l,
                    g: h,
                    b: c,
                    a: parseFloat(a)
                }
            }
            return {
                r: 0,
                g: 0,
                b: 0,
                a: 0
            }
        }
        hslToRgb(t, e, s) {
            t = t / 360, e = parseFloat(e.toString()) / 100, s = parseFloat(s.toString()) / 100;
            let i = (h, c, d) => (d < 0 && (d += 1), d > 1 && (d -= 1), d < 1 / 6 ? h + (c - h) * 6 * d : d < 1 / 2 ? c : d < 2 / 3 ? h + (c - h) * (2 / 3 - d) * 6 : h),
                r = s < .5 ? s * (1 + e) : s + e - s * e,
                n = 2 * s - r,
                o = Math.round(i(n, r, t + 1 / 3) * 255),
                a = Math.round(i(n, r, t) * 255),
                l = Math.round(i(n, r, t - 1 / 3) * 255);
            return [o, a, l]
        }
    },
    Xe = class {
        constructor() {
            this.namedCurves = {
                linear: [0, 0, 1, 1],
                ease: [.25, .1, .25, 1],
                "ease-in": [.42, 0, 1, 1],
                "ease-out": [0, 0, .58, 1],
                "ease-in-out": [.42, 0, .58, 1]
            }
        }
        process({
            easing: t
        }) {
            let e = t.trim();
            if (this.namedCurves[e]) return this.cubicBezier(...this.namedCurves[e]);
            let s = e.match(/^cubic-bezier\s*\(\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*\)$/);
            if (s) {
                let [i, r, n, o] = s.slice(1).map(Number);
                return this.cubicBezier(i, r, n, o)
            }
            return i => i
        }
        cubicBezier(t, e, s, i) {
            let r = 3 * t,
                n = 3 * (s - t) - r,
                o = 1 - r - n,
                a = 3 * e,
                l = 3 * (i - e) - a,
                h = 1 - a - l;

            function c(m) {
                return ((o * m + n) * m + r) * m
            }

            function d(m) {
                return ((h * m + l) * m + a) * m
            }

            function p(m) {
                return (3 * o * m + 2 * n) * m + r
            }

            function y(m, u = 1e-5) {
                let v, g, f = m,
                    b, w, x;
                for (x = 0; x < 8; x++) {
                    if (b = c(f) - m, Math.abs(b) < u) return f;
                    if (w = p(f), Math.abs(w) < 1e-6) break;
                    f = f - b / w
                }
                for (v = 0, g = 1, f = m; v < g;) {
                    if (b = c(f) - m, Math.abs(b) < u) return f;
                    b > 0 ? g = f : v = f, f = (g + v) / 2
                }
                return f
            }
            return function(m) {
                return d(y(m))
            }
        }
    },
    Ge = class {
        process({
            distance: t,
            radius: e,
            strength: s
        }) {
            if (t >= e) return 0;
            let i = (e - t) / e;
            return s * i
        }
    },
    Qe = class {
        process({
            from: t,
            to: e,
            progress: s
        }) {
            return {
                r: t.r + (e.r - t.r) * s,
                g: t.g + (e.g - t.g) * s,
                b: t.b + (e.b - t.b) * s,
                a: t.a + (e.a - t.a) * s
            }
        }
    },
    Ze = class {
        process({
            from: t,
            to: e,
            progress: s
        }) {
            return {
                x: (e.x - t.x) * s,
                y: (e.y - t.y) * s
            }
        }
    },
    Je = class {
        process({
            value: t
        }) {
            let e = t == null ? void 0 : t.trim();
            if (!e || e === "none") return 1;
            try {
                if (e.startsWith("matrix(")) {
                    let s = e.match(/matrix\(([^)]+)\)/);
                    if (s && s[1]) {
                        let i = s[1].split(",").map(r => parseFloat(r.trim()));
                        if (i.length >= 1 && !isNaN(i[0])) return i[0]
                    }
                }
                if (e.startsWith("scale(")) {
                    let s = e.match(/scale\(([^)]+)\)/);
                    if (s && s[1]) {
                        let i = s[1].split(",").map(r => parseFloat(r.trim()));
                        if (i.length >= 1 && !isNaN(i[0])) return i[0]
                    }
                }
                if (e.startsWith("scaleX(")) {
                    let s = e.match(/scaleX\(([^)]+)\)/);
                    if (s && s[1]) {
                        let i = parseFloat(s[1].trim());
                        if (!isNaN(i)) return i
                    }
                }
                if (e.startsWith("scale3d(")) {
                    let s = e.match(/scale3d\(([^)]+)\)/);
                    if (s && s[1]) {
                        let i = s[1].split(",").map(r => parseFloat(r.trim()));
                        if (i.length >= 1 && !isNaN(i[0])) return i[0]
                    }
                }
                if (e.startsWith("matrix3d(")) {
                    let s = e.match(/matrix3d\(([^)]+)\)/);
                    if (s && s[1]) {
                        let i = s[1].split(",").map(r => parseFloat(r.trim()));
                        if (i.length >= 1 && !isNaN(i[0])) return i[0]
                    }
                }
            } catch (s) {
                return console.error(`Error parsing transform string "${e}":`, s), 1
            }
            return 1
        }
    },
    et = class {
        process({
            attributeValue: t
        }) {
            let e = {
                line: [],
                word: [],
                char: [],
                charLine: [],
                charWord: [],
                wordLine: []
            };
            return t && t.split("|").forEach(s => {
                let i = s.trim();
                if (!i) return;
                let r = i.match(/^(\w+-)?(\w+)(\[(.*?)\])?$/);
                if (r) {
                    let n = r[1] || "",
                        o = r[2],
                        a = n + o,
                        l = (r[4] || "").split(";").map(c => c.trim()).filter(c => c.length > 0),
                        h = this.parseParamsArray(l);
                    switch (a) {
                        case "line":
                            e.line.push(h);
                            break;
                        case "word":
                            e.word.push(h);
                            break;
                        case "char":
                            e.char.push(h);
                            break;
                        case "charLine":
                            e.charLine.push(h);
                            break;
                        case "charWord":
                            e.charWord.push(h);
                            break;
                        case "wordLine":
                            e.wordLine.push(h);
                            break;
                        default:
                            console.warn(`SplitOptionsParserTool: Unrecognized option type "${a}" in part "${i}"`);
                            break
                    }
                } else console.warn(`SplitOptionsParserTool: Could not parse part format "${i}"`)
            }), e
        }
        parseParamsArray(t) {
            let e = {
                align: "start"
            };
            return t.forEach(s => {
                if (s === "abs") e.abs = !0;
                else if (s.startsWith("random")) {
                    e.align = "random";
                    let i = s.match(/random\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
                    i && (e.random = {
                        min: parseInt(i[1], 10),
                        max: parseInt(i[2], 10)
                    })
                } else ["start", "center", "end"].includes(s) && (e.align = s)
            }), e
        }
    },
    tt = class {
        process({
            value: t
        }) {
            let e = [],
                s = "",
                i = 0;
            for (let r = 0; r < t.length; r++) {
                let n = t[r];
                n === "(" && i++, n === ")" && i--, n === "|" && i === 0 ? (s.trim() && e.push(s.trim()), s = "") : s += n
            }
            return s.trim() && e.push(s.trim()), e.map(r => {
                let n = r.match(/^(\w+)(?:\((.*)\))?$/);
                if (n) {
                    let [, a, l] = n;
                    return l ? {
                        key: a,
                        params: l.split(",").map(h => h.trim())
                    } : {
                        key: a
                    }
                }
                let o = r.indexOf(":");
                if (o !== -1) {
                    let a = r.slice(0, o).trim(),
                        l = r.slice(o + 1).trim(),
                        h = l ? l.split(",").map(c => c.trim()) : void 0;
                    return {
                        key: a,
                        params: h
                    }
                }
                return {
                    key: r
                }
            })
        }
    },
    st = class {
        constructor() {
            this.inputValidators = {
                required: t => t != null && String(t).trim() !== "",
                min: (t, e) => typeof t == "string" && t.length >= Number((e == null ? void 0 : e[0]) ? ? 0),
                max: (t, e) => typeof t == "string" && t.length <= Number((e == null ? void 0 : e[0]) ? ? Number.MAX_SAFE_INTEGER),
                checked: t => {
                    if (Array.isArray(t)) return t.length > 0;
                    if (t === !0 || t === "true" || t === 1 || t === "1") return !0;
                    if (typeof t == "string") {
                        let e = t.trim().toLowerCase();
                        return e === "false" || e === "0" ? !1 : e.length > 0
                    }
                    return !!t
                },
                email: t => typeof t == "string" && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(t),
                phone: t => {
                    if (typeof t != "string") return !1;
                    let e = t.trim();
                    if (e === "" || !/^[0-9()\s+-.]+$/.test(e)) return !1;
                    let s = e.replace(/\D/g, "").length;
                    return s >= 7 && s <= 15
                },
                number: t => typeof t == "string" && /^-?\d+(\.\d+)?$/.test(t),
                integer: t => typeof t == "string" && /^-?\d+$/.test(t),
                url: t => typeof t == "string" && /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/.test(t),
                regex: (t, e) => this.testByRegex(t, e == null ? void 0 : e[0]),
                alpha: t => this.testByRegex(t, "^[A-Za-z]+$", !0),
                alpha_num: t => this.testByRegex(t, "^[A-Za-z0-9]+$", !0),
                alpha_dash: t => this.testByRegex(t, "^[A-Za-z0-9_-]+$", !0),
                same: (t, e, s) => {
                    let i = e == null ? void 0 : e[0],
                        r = this.getContextValue(s, i);
                    return i && r === void 0 ? !1 : this.areValuesEqual(t, r)
                },
                different: (t, e, s) => {
                    let i = e == null ? void 0 : e[0],
                        r = this.getContextValue(s, i);
                    return i && r === void 0 ? !1 : !this.areValuesEqual(t, r)
                },
                range: (t, e) => {
                    if (t == null || t === "") return !0;
                    let s = Number(t),
                        i = Number(e == null ? void 0 : e[0]),
                        r = Number(e == null ? void 0 : e[1]);
                    return Number.isNaN(s) || Number.isNaN(i) || Number.isNaN(r) ? !1 : s >= i && s <= r
                },
                digits: (t, e) => {
                    if (typeof t != "string") return !1;
                    let s = Number((e == null ? void 0 : e[0]) ? ? 0);
                    return s <= 0 ? !1 : new RegExp(`^\\d{${s}}$`).test(t)
                },
                ip: t => typeof t == "string" && (this.isIPv4(t) || this.isIPv6(t)),
                mimes: (t, e) => this.validateMimes(t, e),
                max_size: (t, e) => {
                    let s = Number(e == null ? void 0 : e[0]);
                    return !s || s <= 0 ? !0 : this.validateMaxSize(t, s)
                },
                after: (t, e, s) => this.compareDates(t, e, s, "after"),
                before: (t, e, s) => this.compareDates(t, e, s, "before")
            }, this.beforeInputValidators = {
                number: t => /^-?\d*\.?\d*$/.test(t),
                integer: t => /^-?\d*$/.test(t),
                email: t => /^[\w@.\-+]*$/.test(t),
                phone: t => /^[0-9()\s+-.]*$/.test(t),
                letters: t => /^[a-zA-Z]*$/.test(t),
                lettersSpaces: t => /^[a-zA-Z\s]*$/.test(t),
                lettersNumbers: t => /^[a-zA-Z0-9]*$/.test(t),
                alpha: t => /^[A-Za-z]*$/.test(t),
                alpha_num: t => /^[A-Za-z0-9]*$/.test(t),
                alpha_dash: t => /^[A-Za-z0-9_-]*$/.test(t),
                digits: (t, e) => {
                    let s = Number((e == null ? void 0 : e[0]) ? ? 0);
                    return s <= 0 ? /^\d*$/.test(t) : new RegExp(`^\\d{0,${s}}$`).test(t)
                },
                url: t => /^[a-zA-Z0-9\-._~:\/?#\[\]@!$&'()*+,;=%]*$/.test(t),
                pattern: (t, e) => {
                    try {
                        return new RegExp((e == null ? void 0 : e[0]) || "").test(t)
                    } catch {
                        return !0
                    }
                }
            }
        }
        process({
            rules: t,
            value: e,
            type: s = "input",
            context: i
        }) {
            let r = [];
            for (let h of t) {
                var n = null,
                    o = null,
                    a = !0,
                    l = !0;
                s == "input" && (o = this.inputValidators[h.key], !o) || s == "beforeinput" && (n = this.beforeInputValidators[h.key], !n) || (o && (a = o(e, h.params, i)), n && (l = n(e, h.params, i)), l || r.push(this.getErrorMessage(h.key, h.params)), a || r.push(this.getErrorMessage(h.key, h.params)))
            }
            return {
                valid: r.length === 0,
                errors: r
            }
        }
        getErrorMessage(t, e) {
            switch (t) {
                case "required":
                    return "This field is required";
                case "email":
                    return "Invalid email address";
                case "min":
                    return `Minimum ${e==null?void 0:e[0]} characters`;
                case "max":
                    return `Maximum ${e==null?void 0:e[0]} characters`;
                case "phone":
                    return "Invalid phone number";
                case "number":
                    return "Only numbers are allowed";
                case "integer":
                    return "Only whole numbers are allowed";
                case "url":
                    return "Invalid URL address";
                case "checked":
                    return "You must accept";
                case "regex":
                    return "Value does not match the required pattern";
                case "alpha":
                    return "Only letters are allowed";
                case "alpha_num":
                    return "Only letters and numbers are allowed";
                case "alpha_dash":
                    return "Only letters, numbers, dashes, and underscores are allowed";
                case "same":
                    return "Values do not match";
                case "different":
                    return "Values must be different";
                case "range":
                    return `Value must be between ${e==null?void 0:e[0]} and ${e==null?void 0:e[1]}`;
                case "digits":
                    return `Value must contain exactly ${e==null?void 0:e[0]} digits`;
                case "ip":
                    return "Invalid IP address";
                case "mimes":
                    return `Allowed file types: ${e==null?void 0:e.join(", ")}`;
                case "max_size":
                    return `File must be smaller than ${e==null?void 0:e[0]} KB`;
                case "after":
                    return `Date must be after ${e==null?void 0:e[0]}`;
                case "before":
                    return `Date must be before ${e==null?void 0:e[0]}`;
                default:
                    return "Invalid value"
            }
        }
        validateMimes(t, e) {
            if (!e || e.length === 0) return !0;
            let s = this.extractFiles(t);
            if (s.length === 0) return !0;
            let i = e.map(r => r.trim().toLowerCase());
            return s.every(r => this.isMimeAllowed(r, i))
        }
        validateMaxSize(t, e) {
            let s = this.extractFiles(t);
            if (s.length === 0) return !0;
            let i = e * 1024;
            return s.every(r => typeof r.size != "number" ? !0 : r.size <= i)
        }
        extractFiles(t) {
            if (!t) return [];
            let e = [];
            return typeof File < "u" && t instanceof File ? (e.push(t), e) : typeof FileList < "u" && t instanceof FileList ? Array.from(t) : Array.isArray(t) ? (t.forEach(s => {
                e.push(...this.extractFiles(s))
            }), e) : typeof t == "object" && ("name" in t || "size" in t || "type" in t) ? (e.push(t), e) : (typeof t == "string" && t !== "" && e.push({
                name: t
            }), e)
        }
        isMimeAllowed(t, e) {
            let s = (t.type || "").toLowerCase(),
                i = this.getFileExtension(t.name);
            return e.some(r => {
                let n = r.replace(/^\./, "").toLowerCase();
                return n ? n.includes("/") ? s === n : i === n : !1
            })
        }
        getFileExtension(t) {
            if (!t) return "";
            let e = t.split(".");
            return e.length <= 1 ? "" : (e.pop() || "").toLowerCase()
        }
        compareDates(t, e, s, i) {
            if (t == null || t === "") return !0;
            let r = e == null ? void 0 : e[0];
            if (!r) return !0;
            let n = this.toDate(t),
                o = this.resolveDateReference(r, s);
            return !n || !o ? !1 : i === "after" ? n.getTime() > o.getTime() : n.getTime() < o.getTime()
        }
        resolveDateReference(t, e) {
            let s = this.getContextValue(e, t);
            if (s !== void 0) return this.toDate(s);
            if (t.toLowerCase() === "now") return new Date;
            if (t.toLowerCase() === "today") {
                let i = new Date;
                return i.setHours(0, 0, 0, 0), i
            }
            return this.toDate(t)
        }
        toDate(t) {
            if (t == null || t === "") return null;
            if (t instanceof Date) return Number.isNaN(t.getTime()) ? null : t;
            if (typeof t == "number") {
                let e = new Date(t);
                return Number.isNaN(e.getTime()) ? null : e
            }
            if (typeof t == "string") {
                let e = Date.parse(t);
                if (!Number.isNaN(e)) return new Date(e)
            }
            return null
        }
        testByRegex(t, e, s = !1) {
            if (e == null || e === "") return !0;
            let i = typeof t == "string" ? t : t == null ? "" : String(t);
            if (s && i === "") return !0;
            try {
                let {
                    source: r,
                    flags: n
                } = this.normalizeRegex(e);
                return new RegExp(r, n).test(i)
            } catch {
                return !0
            }
        }
        normalizeRegex(t) {
            let e = t.trim();
            if (e.startsWith("/") && e.lastIndexOf("/") > 0) {
                let s = e.lastIndexOf("/"),
                    i = e.slice(1, s),
                    r = e.slice(s + 1);
                return {
                    source: i,
                    flags: r
                }
            }
            return {
                source: e,
                flags: ""
            }
        }
        getContextValue(t, e) {
            if (!(!t || !e)) {
                if (t.values && Object.prototype.hasOwnProperty.call(t.values, e)) return t.values[e];
                if (t.getValue) return t.getValue(e)
            }
        }
        areValuesEqual(t, e) {
            return Array.isArray(t) || Array.isArray(e) ? JSON.stringify(t) === JSON.stringify(e) : t === e
        }
        isIPv4(t) {
            let e = t.split(".");
            return e.length !== 4 ? !1 : e.every(s => {
                if (!/^\d+$/.test(s)) return !1;
                let i = Number(s);
                return i >= 0 && i <= 255
            })
        }
        isIPv6(t) {
            if (!t) return !1;
            if (t === "::") return !0;
            let e = t.split("::");
            if (e.length > 2) return !1;
            let s = /^[0-9a-fA-F]{1,4}$/,
                i = t.split(":");
            return e.length === 2 ? i.every(r => r === "" || s.test(r)) && i.length <= 8 : i.length === 8 && i.every(r => s.test(r))
        }
    },
    it = class {
        constructor() {
            this.domAttribute = new ze, this.recordAttribute = new He, this.transformNullify = new be, this.boundingClientRect = new We, this.relativePosition = new Be(this.transformNullify), this.unitParser = new _e, this.lerp = new qe, this.adaptiveLerp = new Ue, this.originParser = new Ke, this.colorParser = new Ye, this.validation = new st, this.easingFunction = new Xe, this.magneticPull = new Ge, this.lerpColor = new Qe, this.lerpVector = new Ze, this.transformScaleParser = new Je, this.optionsParser = new et, this.ruleParser = new tt
        }
    };

function ye() {
    let t = typeof window < "u" && typeof window.matchMedia == "function" ? window.matchMedia("(pointer: coarse)").matches : !1,
        e = typeof navigator < "u" ? (navigator.maxTouchPoints || 0) > 0 : !1,
        s = typeof window < "u" ? window.innerWidth <= 768 : !1;
    return t || e || s
}
var rt = class {
        constructor() {
            this.pendingVars = new Map, this.pendingProps = new Map, this.isOpen = !1
        }
        begin() {
            this.isOpen || (this.isOpen = !0)
        }
        setVars(t, e) {
            if (!this.isOpen) {
                console.warn("StyleTxn: call begin() first to set custom properties.");
                return
            }
            let s = this.pendingVars.get(t) ? ? {};
            for (let [i, r] of Object.entries(e)) s[i] !== r && (s[i] = r);
            this.pendingVars.set(t, s)
        }
        setProps(t, e) {
            if (!this.isOpen) {
                console.warn("StyleTxn: call begin() first to set standard properties.");
                return
            }
            let s = this.pendingProps.get(t) ? ? {};
            for (let [i, r] of Object.entries(e)) s[i] !== r && (s[i] = r);
            this.pendingProps.set(t, s)
        }
        run(t) {
            let e = this.isOpen;
            e || this.begin();
            try {
                t(), e || this.commit()
            } catch (s) {
                throw e || this.cancel(), s
            }
        }
        commit() {
            if (this.isOpen) {
                this.isOpen = !1;
                for (let [t, e] of this.pendingVars) {
                    let s = t.style;
                    for (let [i, r] of Object.entries(e)) s.setProperty(i, String(r))
                }
                this.pendingVars.clear();
                for (let [t, e] of this.pendingProps) {
                    let s = t.style;
                    for (let [i, r] of Object.entries(e)) s[i] = String(r)
                }
                this.pendingProps.clear()
            }
        }
        cancel() {
            this.pendingVars.clear(), this.pendingProps.clear(), this.isOpen = !1
        }
    },
    D = new rt,
    ne = new WeakMap,
    T = 5e-4,
    q = "default",
    ee = "[string-cursor],[data-string-cursor]",
    oe = "[string-cursor-content],[data-string-cursor-content]",
    te = 1 / 240;

function nt(t) {
    let e = ne.get(t);
    return e || (e = {
        prevX: Number.NaN,
        prevY: Number.NaN
    }, ne.set(t, e)), e
}
var Rt = class extends A {
        constructor(t) {
            super(t), this.cursorPrev = {
                x: Number.NaN,
                y: Number.NaN,
                stepX: Number.NaN,
                stepY: Number.NaN
            }, this.cursorPortals = new Map, this.hoveredObjects = new Set, this.globalListenersBound = !1, this.boundBeforeUnload = () => this.cleanupHoverTargets(), this.boundPageHide = () => this.cleanupHoverTargets(), this.boundVisibilityChange = () => {
                document.hidden && this.cleanupHoverTargets()
            }, this.enabled = !0, this.lastFrameTime = 0, this.htmlKey = "cursor", this.permissions.mobile.rebuild.height = !1, this.permissions.mobile.rebuild.width = !1, this.permissions.mobile.rebuild.scrollHeight = !1, this.attributesToMap = [...this.attributesToMap, {
                key: "target-disable",
                type: "boolean",
                fallback: this.settings["target-disable"]
            }, {
                key: "target-style-disable",
                type: "boolean",
                fallback: this.settings["target-style-disable"]
            }, {
                key: "cursor-target",
                type: "string",
                fallback: this.settings["cursor-target"] ? ? q
            }, {
                key: "target-class",
                type: "string",
                fallback: this.settings["target-class"]
            }, {
                key: "cursor-class",
                type: "string",
                fallback: this.settings["cursor-class"]
            }, {
                key: "alignment",
                type: {
                    type: "enum",
                    values: ["start", "center", "end"]
                },
                fallback: this.settings.alignment
            }, {
                key: "lerp",
                type: "number",
                fallback: this.settings.lerp,
                transform: e => this.tools.adaptiveLerp.process({
                    value: e,
                    inMin: .1,
                    inMax: 1,
                    outMin: .05,
                    outMax: .65
                })
            }], ye() && (this.enabled = !1), this.collectCursorPortals(), this.enabled && this.bindGlobalLifecycleListeners()
        }
        initializeObject(t, e, s, i) {
            super.initializeObject(t, e, s, i), e.setProperty("mouse-x", 0), e.setProperty("mouse-y", 0), e.setProperty("mouse-pixel-x", 0), e.setProperty("mouse-pixel-y", 0), e.setProperty("is-mouse-over", !1), e.setProperty("is-mouse-move", !1)
        }
        onMutate(t) {
            if (!this.enabled) return;
            let e = performance.now(),
                s = this.lastFrameTime ? (e - this.lastFrameTime) / 1e3 : .016;
            this.lastFrameTime = e, s > .1 && (s = .1), s < te && (s = te);
            let i = this.data.cursor.targetX,
                r = this.data.cursor.targetY;
            if (this.objects.forEach(n => {
                    let o = n.getProperty("is-mouse-over"),
                        a = n.getProperty("cursor-target-disable"),
                        l = n.getProperty("lerp") ? ? .15,
                        h = this.getFrameAdjustedLerp(l, s),
                        c = this.getObjectDimensions(n),
                        {
                            halfWidth: d,
                            halfHeight: p,
                            width: y,
                            height: m
                        } = c;
                    if (o && !a) {
                        let {
                            cx: u,
                            cy: v
                        } = this.centers.getCenter(n), g = i - (u - d), f = r - (v - p), b = n.getProperty("mouse-pixel-x") ? ? 0, w = n.getProperty("mouse-pixel-y") ? ? 0, x = b - g, M = w - f;
                        if (x * x + M * M > 1e-4) {
                            (n.getProperty("is-mouse-move") ? ? !1) || (n.setProperty("is-mouse-move", !0), n.setProperty("mouse-pixel-x", g), n.setProperty("mouse-pixel-y", f), n.setProperty("mouse-x", g), n.setProperty("mouse-y", f), b = g, w = f, this.events.emit(`cursor:start:${n.id}`, null));
                            let L = this.tools.lerp.process({
                                    from: b,
                                    to: g,
                                    progress: h
                                }),
                                S = this.tools.lerp.process({
                                    from: w,
                                    to: f,
                                    progress: h
                                }),
                                j = b + L,
                                E = w + S,
                                P = Math.abs(j - b) > T || Math.abs(E - w) > T;
                            n.setProperty("mouse-pixel-x", j), n.setProperty("mouse-pixel-y", E);
                            let O = n.getProperty("alignment") ? ? "center",
                                C = this.calculateOffset(O, j, y),
                                k = this.calculateOffset(O, E, m);
                            n.setProperty("mouse-x", C), n.setProperty("mouse-y", k), this.setMouseCoordinates(n, C, k) && this.events.emit(`cursor:move:${n.id}`, {
                                x: C,
                                y: k
                            }), P && this.events.emit(`cursor:pixel:${n.id}`, {
                                x: j,
                                y: E
                            })
                        } else n.setProperty("mouse-pixel-x", g), n.setProperty("mouse-pixel-y", f), n.getProperty("is-mouse-move") && (n.setProperty("is-mouse-move", !1), this.events.emit(`cursor:end:${n.id}`, null)), this.setMouseCoordinates(n, 0, 0)
                    } else {
                        let u = n.getProperty("mouse-x") ? ? 0,
                            v = n.getProperty("mouse-y") ? ? 0;
                        if (u !== 0 || v !== 0) {
                            n.setProperty("is-mouse-move", !1);
                            let g = this.calculateOffset("center", d, y),
                                f = this.calculateOffset("center", p, m),
                                b = u + this.tools.lerp.process({
                                    from: u,
                                    to: g,
                                    progress: h
                                }),
                                w = v + this.tools.lerp.process({
                                    from: v,
                                    to: f,
                                    progress: h
                                });
                            n.setProperty("mouse-x", b), n.setProperty("mouse-y", w), Math.abs(b) < .001 && Math.abs(w) < .001 ? (n.setProperty("mouse-x", 0), n.setProperty("mouse-y", 0), n.setProperty("mouse-pixel-x", 0), n.setProperty("mouse-pixel-y", 0), this.setMouseCoordinates(n, 0, 0)) : this.setMouseCoordinates(n, b, w)
                        }
                    }
                }), this.cursorPortals.size > 0) {
                let {
                    stepX: n,
                    stepY: o,
                    smoothedX: a,
                    smoothedY: l
                } = this.data.cursor, h = this.cursorPrev;
                (!Number.isFinite(h.x) || Math.abs(a - h.x) > T || Math.abs(l - h.y) > T || Math.abs(n - h.stepX) > T || Math.abs(o - h.stepY) > T) && (this.events.emit("cursor", {
                    stepX: n,
                    stepY: o,
                    x: a,
                    y: l
                }), this.cursorPrev = {
                    x: a,
                    y: l,
                    stepX: n,
                    stepY: o
                });
                let c = this.data.cursor.targetX,
                    d = this.data.cursor.targetY;
                this.cursorPortals.forEach(p => {
                    p.forEach(y => {
                        this.updatePortalPosition(y, c, d, s)
                    })
                })
            }
        }
        onObjectConnected(t) {
            t.htmlElement, this.centers.attach(t), t.setProperty("mouseleave", () => {
                this.onMouseLeave(t)
            }), t.setProperty("mouseenter", () => {
                this.onMouseEnter(t)
            }), t.setProperty("onEnterEvent", this.onEnterObject.bind(this)), t.events.on("enter", t.getProperty("onEnterEvent")), t.setProperty("onLeaveEvent", this.onLeaveObject.bind(this)), t.events.on("leave", t.getProperty("onLeaveEvent"))
        }
        getCursorClass(t) {
            let e = t.getProperty("cursor-class");
            return e != null && e.length > 0 ? e : null
        }
        onMouseEnter(t) {
            if (!document.contains(t.htmlElement)) return;
            t.setProperty("is-mouse-over", !0), this.hoveredObjects.add(t);
            let e = this.getCursorClass(t);
            this.withPortalsForObject(t, s => {
                e && s.element.classList.add(e), this.incrementPortalHover(s)
            }), t.htmlElement.addEventListener("mouseleave", t.getProperty("mouseleave"))
        }
        onMouseLeave(t) {
            t.setProperty("is-mouse-over", !1), this.hoveredObjects.delete(t);
            let e = this.getCursorClass(t);
            this.withPortalsForObject(t, s => {
                e && s.element.classList.remove(e), this.decrementPortalHover(s)
            }), document.contains(t.htmlElement) && t.htmlElement.removeEventListener("mouseleave", t.getProperty("mouseleave"))
        }
        onEnterObject(t) {
            t.htmlElement.addEventListener("mouseenter", t.getProperty("mouseenter"))
        }
        onLeaveObject(t) {
            t.htmlElement.removeEventListener("mouseenter", t.getProperty("mouseenter")), t.htmlElement.removeEventListener("mouseleave", t.getProperty("mouseleave"))
        }
        safariNavigationCleanup(t) {
            t.getProperty("is-mouse-over") && this.onMouseLeave(t)
        }
        onElementRemovedFromDOM(t) {
            t.getProperty("is-mouse-over") && this.onMouseLeave(t)
        }
        onObjectDisconnected(t) {
            t.getProperty("is-mouse-over") && this.onMouseLeave(t)
        }
        onDOMRebuild() {
            this.enabled && this.collectCursorPortals()
        }
        onDOMMutate(t, e) {
            this.enabled && ((this.shouldRefreshPortals(t) || this.shouldRefreshPortals(e)) && this.collectCursorPortals(), e.length > 0 && this.handleRemovedNodes(e))
        }
        collectCursorPortals() {
            this.cursorPortals.clear(), document.querySelectorAll(ee).forEach(t => {
                if (!(t instanceof HTMLElement)) return;
                let e = this.resolvePortalId(t),
                    s = this.resolvePortalLerp(t),
                    i = t.matches(oe) ? t : t.querySelector(oe),
                    r = this.data.cursor.targetX,
                    n = this.data.cursor.targetY,
                    o = {
                        id: e,
                        element: t,
                        content: i,
                        prev: {
                            x: r,
                            y: n,
                            stepX: 0,
                            stepY: 0
                        },
                        hoverCount: 0,
                        showTimer: null,
                        lerp: s
                    },
                    a = this.cursorPortals.get(e);
                a ? a.push(o) : this.cursorPortals.set(e, [o])
            })
        }
        resolvePortalId(t) {
            let e = [t.getAttribute("data-string-cursor"), t.getAttribute("string-cursor"), t.getAttribute("data-string-cursor-id"), t.getAttribute("string-cursor-id")];
            for (let s of e)
                if (s && s.trim().length > 0) return s.trim();
            return q
        }
        resolvePortalLerp(t) {
            let e = t.getAttribute("data-string-cursor-lerp") ? ? t.getAttribute("string-cursor-lerp") ? ? this.settings["cursor-lerp"];
            if (!e) return null;
            let s = parseFloat(e);
            if (!Number.isFinite(s)) return null;
            let i = Math.min(1, Math.max(.01, s));
            return this.tools.adaptiveLerp.process({
                value: i,
                inMin: .1,
                inMax: 1,
                outMin: .05,
                outMax: .65
            })
        }
        shouldRefreshPortals(t) {
            for (let e of t)
                if (e instanceof Element && (e.matches(ee) || e.querySelector(ee))) return !0;
            return !1
        }
        withPortalsForObject(t, e) {
            this.getPortalsForObject(t).forEach(s => e(s))
        }
        getPortalsForObject(t) {
            if (this.cursorPortals.size === 0) return [];
            let e = this.extractPortalIds(t),
                s = [];
            if (e.forEach(i => {
                    if (i === "*") {
                        this.cursorPortals.forEach(o => {
                            o.forEach(a => s.push(a))
                        });
                        return
                    }
                    let r = i.length > 0 ? i : q,
                        n = this.cursorPortals.get(r);
                    n && n.forEach(o => s.push(o))
                }), s.length === 0) {
                let i = this.cursorPortals.get(q) ? ? this.cursorPortals.values().next().value;
                i && i.length > 0 && i.forEach(r => s.push(r))
            }
            return s
        }
        extractPortalIds(t) {
            if (!t) return [q];
            let e = t.getProperty("cursor-target");
            return typeof e != "string" || e.trim().length === 0 ? [q] : e.split(/[,|]/).map(s => s.trim()).filter(Boolean)
        }
        incrementPortalHover(t) {
            t.hoverCount++, t.element.classList.remove("-show"), this.restartPortalShowTimer(t)
        }
        decrementPortalHover(t) {
            t.hoverCount = Math.max(0, t.hoverCount - 1), t.hoverCount === 0 && (this.clearPortalShowTimer(t), t.element.classList.remove("-show"))
        }
        restartPortalShowTimer(t) {
            if (this.clearPortalShowTimer(t), !t.element.isConnected) {
                t.showTimer = null;
                return
            }
            t.element.classList.add("-show"), t.showTimer = null
        }
        clearPortalShowTimer(t) {
            t.showTimer && (clearTimeout(t.showTimer), t.showTimer = null)
        }
        updatePortalPosition(t, e, s, i) {
            if (!t.element.isConnected) return;
            let r = t.prev,
                n = Number.isFinite(r.x) ? r.x : e,
                o = Number.isFinite(r.y) ? r.y : s,
                a = t.lerp ? ? .1,
                l = this.getFrameAdjustedLerp(a, i),
                h = (e - n) * l,
                c = (s - o) * l,
                d = i > 1e-4 ? i : 1 / 60,
                p = h / (d * 60),
                y = c / (d * 60);
            if (Math.abs(h) < T && Math.abs(c) < T) return;
            let m = n + h,
                u = o + c;
            t.element.style.setProperty("--x", m.toFixed(2)), t.element.style.setProperty("--y", u.toFixed(2)), t.element.style.setProperty("--x-lerp", p.toFixed(3)), t.element.style.setProperty("--y-lerp", y.toFixed(3)), r.x = m, r.y = u, r.stepX = h, r.stepY = c
        }
        handleRemovedNodes(t) {
            this.hoveredObjects.size !== 0 && Array.from(this.hoveredObjects).forEach(e => {
                e.htmlElement.isConnected || this.onElementRemovedFromDOM(e)
            })
        }
        cleanupHoverTargets() {
            this.hoveredObjects.size !== 0 && Array.from(this.hoveredObjects).forEach(t => this.safariNavigationCleanup(t))
        }
        bindGlobalLifecycleListeners() {
            this.globalListenersBound || (window.addEventListener("beforeunload", this.boundBeforeUnload), window.addEventListener("pagehide", this.boundPageHide), document.addEventListener("visibilitychange", this.boundVisibilityChange), this.globalListenersBound = !0)
        }
        unbindGlobalLifecycleListeners() {
            this.globalListenersBound && (window.removeEventListener("beforeunload", this.boundBeforeUnload), window.removeEventListener("pagehide", this.boundPageHide), document.removeEventListener("visibilitychange", this.boundVisibilityChange), this.globalListenersBound = !1)
        }
        setMouseCoordinates(t, e, s) {
            if (t.getProperty("cursor-target-style-disable")) return !1;
            let i = nt(t),
                r = Math.abs(e) < T && Number.isFinite(i.prevX) ? i.prevX : Math.round(e * 100) / 100,
                n = Math.abs(s) < T && Number.isFinite(i.prevY) ? i.prevY : Math.round(s * 100) / 100;
            if (Number.isFinite(i.prevX) && Math.abs(r - i.prevX) <= T && Number.isFinite(i.prevY) && Math.abs(n - i.prevY) <= T) return !1;
            i.prevX = r, i.prevY = n;
            let o = r.toFixed(2),
                a = n.toFixed(2);
            return this.applyToElementAndConnects(t, l => {
                D.setVars(l, {
                    "--x": o,
                    "--y": a
                })
            }), !0
        }
        getFrameAdjustedLerp(t, e) {
            let s = Math.min(.99, Math.max(.001, t));
            if (!Number.isFinite(e) || e <= 0) return s;
            let i = Math.max(e, te) * 60,
                r = 1 - Math.pow(1 - s, i);
            return Math.min(.999, Math.max(1e-4, r))
        }
        getObjectDimensions(t) {
            let e = t.htmlElement,
                s = e.offsetWidth || e.clientWidth || e.scrollWidth || 1,
                i = e.offsetHeight || e.clientHeight || e.scrollHeight || 1,
                r = t.getProperty("half-width"),
                n = t.getProperty("half-height"),
                o = typeof r == "number" && Number.isFinite(r) ? r : s / 2,
                a = typeof n == "number" && Number.isFinite(n) ? n : i / 2,
                l = o > 0 ? o * 2 : s,
                h = a > 0 ? a * 2 : i;
            return {
                width: l,
                height: h,
                halfWidth: o,
                halfHeight: a
            }
        }
        calculateOffset(t, e, s) {
            switch (t) {
                case "start":
                    return e / s;
                case "end":
                    return (e - s) / s;
                case "center":
                default:
                    return (e - s / 2) / (s / 2)
            }
        }
        removeObject(t) {
            if (!this.enabled) return super.removeObject(t);
            let e = this.objectMapOnPage.get(t);
            e && this.centers.detach(e), super.removeObject(t)
        }
        destroy() {
            this.unbindGlobalLifecycleListeners(), this.hoveredObjects.clear(), super.destroy()
        }
    },
    It = class extends A {
        constructor(t) {
            super(t), this.originObservers = new WeakMap, this.htmlKey = "impulse", this.attributesToMap.push({
                key: "position-strength",
                type: "number",
                fallback: this.settings["position-strength"]
            }, {
                key: "position-tension",
                type: "number",
                fallback: this.settings["position-tension"]
            }, {
                key: "position-friction",
                type: "number",
                fallback: this.settings["position-friction"]
            }, {
                key: "position-max-velocity",
                type: "number",
                fallback: this.settings["position-max-velocity"]
            }, {
                key: "position-update-threshold",
                type: "number",
                fallback: this.settings["position-update-threshold"]
            }, {
                key: "rotation-strength",
                type: "number",
                fallback: this.settings["rotation-strength"]
            }, {
                key: "rotation-tension",
                type: "number",
                fallback: this.settings["rotation-tension"]
            }, {
                key: "rotation-friction",
                type: "number",
                fallback: this.settings["rotation-friction"]
            }, {
                key: "rotation-max-angular-velocity",
                type: "number",
                fallback: this.settings["rotation-max-angular-velocity"]
            }, {
                key: "rotation-max-angle",
                type: "number",
                fallback: this.settings["rotation-max-angle"]
            }, {
                key: "rotation-update-threshold",
                type: "number",
                fallback: this.settings["rotation-update-threshold"]
            }, {
                key: "max-offset",
                type: "number",
                fallback: this.settings["max-offset"]
            }, {
                key: "sleep-epsilon",
                type: "number",
                fallback: this.settings["sleep-epsilon"]
            }, {
                key: "continuous-push",
                type: "boolean",
                fallback: this.settings["continuous-push"]
            }, {
                key: "rotation-origin",
                type: "string",
                fallback: this.settings["rotation-origin"] ? ? "center center"
            })
        }
        onObjectConnected(t) {
            super.onObjectConnected(t), t.setProperty("offset-x", 0), t.setProperty("offset-y", 0), t.setProperty("velocity-x", 0), t.setProperty("velocity-y", 0), t.setProperty("angle-deg", 0), t.setProperty("ang-vel-deg", 0), t.setProperty("__prev-css-x", 0), t.setProperty("__prev-css-y", 0), t.setProperty("__prev-css-rot", 0), t.setProperty("__push-latch", !1), t.setProperty("__rotate-latch", !1), this.cacheRotationOrigin(t), this.observeRotationOrigin(t), this.hover.track(t), this.centers.attach(t)
        }
        onObjectDisconnected(t) {
            this.hover.untrack(t), this.centers.detach(t);
            let e = this.originObservers.get(t);
            e && (e.disconnect(), this.originObservers.delete(t))
        }
        onMouseMove(t) {
            if (!t) return;
            let e = this.data.cursor.velocityX,
                s = this.data.cursor.velocityY;
            if (e === 0 && s === 0) return;
            let i = this.data.cursor.targetX,
                r = this.data.cursor.targetY;
            for (let n of this.objects) {
                let o = n.htmlElement.getBoundingClientRect();
                if (i >= o.left && i <= o.right && r >= o.top && r <= o.bottom) {
                    {
                        let h = o.width || 1,
                            c = Math.max(0, Math.min(1, (this.data.cursor.targetX - o.left) / h));
                        this.events.emit(`object:impulse:${n.id}:side`, {
                            value: c
                        })
                    }
                    let a = n.getProperty("position-strength") || 0;
                    if (a !== 0) {
                        let h = n.getProperty("continuous-push") ? ? !0,
                            c = n.getProperty("__push-latch") === !0;
                        if (h || !c) {
                            let d = n.getProperty("velocity-x") || 0,
                                p = n.getProperty("velocity-y") || 0;
                            d += e * a, p += s * a, n.setProperty("velocity-x", d), n.setProperty("velocity-y", p), h || n.setProperty("__push-latch", !0)
                        }
                    }
                    let l = n.getProperty("rotation-strength") ? ? .75;
                    if (l !== 0) {
                        let h = n.getProperty("continuous-push") ? ? !0,
                            c = n.getProperty("__rotate-latch") === !0;
                        if (h || !c) {
                            let {
                                centerX: d,
                                centerY: p
                            } = this.getRotationOriginFromRect(n, o), y = i - d, m = r - p, u = y * s - m * e, v = n.getProperty("ang-vel-deg") || 0;
                            v += u * l * .02, n.setProperty("ang-vel-deg", v), h || n.setProperty("__rotate-latch", !0)
                        }
                    }
                }
            }
        }
        cacheRotationOrigin(t) {
            let e = t.getProperty("rotation-origin") ? ? "center center",
                {
                    x: s,
                    y: i
                } = this.tools.originParser.toNormalized({
                    value: e
                });
            t.setProperty("__rotation-origin-x", s), t.setProperty("__rotation-origin-y", i)
        }
        observeRotationOrigin(t) {
            let e = "string-rotation-origin",
                s = "data-string-rotation-origin",
                i = new MutationObserver(r => {
                    for (let n of r)
                        if (n.type === "attributes" && (n.attributeName === e || n.attributeName === s)) {
                            let o = t.htmlElement.getAttribute(e) ? ? t.htmlElement.getAttribute(s);
                            o !== null && t.setProperty("rotation-origin", o), this.cacheRotationOrigin(t);
                            break
                        }
                });
            i.observe(t.htmlElement, {
                attributes: !0,
                attributeFilter: [e, s]
            }), this.originObservers.set(t, i)
        }
        getRotationOriginFromRect(t, e) {
            let s = t.getProperty("__rotation-origin-x") ? ? .5,
                i = t.getProperty("__rotation-origin-y") ? ? .5;
            return {
                centerX: e.left + e.width * s,
                centerY: e.top + e.height * i
            }
        }
        onFrame(t) {
            let e = this.data.cursor.targetX,
                s = this.data.cursor.targetY;
            for (let i of this.objects) {
                let r = i.htmlElement.getBoundingClientRect(),
                    n = e >= r.left && e <= r.right && s >= r.top && s <= r.bottom;
                !n && i.getProperty("__push-latch") === !0 && i.setProperty("__push-latch", !1), !n && i.getProperty("__rotate-latch") === !0 && i.setProperty("__rotate-latch", !1)
            }
            for (let i = 0; i < this.objects.length; i++) {
                let r = this.objects[i],
                    n = r.getProperty("offset-x") || 0,
                    o = r.getProperty("offset-y") || 0,
                    a = r.getProperty("velocity-x") || 0,
                    l = r.getProperty("velocity-y") || 0,
                    h = r.getProperty("position-tension") ? ? .05,
                    c = r.getProperty("position-friction") ? ? .15,
                    d = r.getProperty("position-max-velocity") ? ? 120,
                    p = r.getProperty("max-offset") ? ? 220;
                a -= h * n, l -= h * o;
                let y = 1 - c;
                a *= y, l *= y, a > d ? a = d : a < -d && (a = -d), l > d ? l = d : l < -d && (l = -d), n += a, o += l, n > p ? n = p : n < -p && (n = -p), o > p ? o = p : o < -p && (o = -p);
                let m = r.getProperty("angle-deg") || 0,
                    u = r.getProperty("ang-vel-deg") || 0,
                    v = r.getProperty("rotation-tension") ? ? .06,
                    g = r.getProperty("rotation-friction") ? ? .18,
                    f = r.getProperty("rotation-max-angular-velocity") ? ? 6,
                    b = r.getProperty("rotation-max-angle") ? ? 18;
                u -= v * m, u *= 1 - g, u > f ? u = f : u < -f && (u = -f), m += u, m > b ? (m = b, u *= .35) : m < -b && (m = -b, u *= .35);
                let w = r.getProperty("sleep-epsilon") ? ? .01,
                    x = a * a + l * l < w * w && n * n + o * o < w * w,
                    M = Math.abs(u) < w && Math.abs(m) < w;
                x ? (a || l || n || o) && (r.setProperty("offset-x", 0), r.setProperty("offset-y", 0), r.setProperty("velocity-x", 0), r.setProperty("velocity-y", 0), n = o = a = l = 0) : (r.setProperty("offset-x", n), r.setProperty("offset-y", o), r.setProperty("velocity-x", a), r.setProperty("velocity-y", l)), M ? (m || u) && (r.setProperty("angle-deg", 0), r.setProperty("ang-vel-deg", 0), m = u = 0) : (r.setProperty("angle-deg", m), r.setProperty("ang-vel-deg", u));
                let L = r.getProperty("position-update-threshold") ? ? .1,
                    S = r.getProperty("rotation-update-threshold") ? ? .15,
                    j = r.getProperty("__prev-css-x") || 0,
                    E = r.getProperty("__prev-css-y") || 0,
                    P = r.getProperty("__prev-css-rot") || 0,
                    O = Math.round(n * 10) / 10,
                    C = Math.round(o * 10) / 10,
                    k = Math.round(m * 10) / 10,
                    U = Math.abs(O - j) > L || Math.abs(C - E) > L,
                    H = Math.abs(k - P) > S;
                (U || H) && (this.applyToElementAndConnects(r, J => {
                    U && (J.style.setProperty("--push-x", String(O)), J.style.setProperty("--push-y", String(C)), this.events.emit(`object:impulse:${r.id}:move`, {
                        x: O,
                        y: C
                    })), H && (J.style.setProperty("--push-rotation", String(k)), this.events.emit(`object:impulse:${r.id}:rotate`, {
                        rotation: k
                    }))
                }), U && (r.setProperty("__prev-css-x", O), r.setProperty("__prev-css-y", C)), H && r.setProperty("__prev-css-rot", k))
            }
        }
    },
    Nt = class extends A {
        constructor(t) {
            super(t), this.htmlKey = "magnetic", this.permissions.mobile.rebuild.height = !1, this.permissions.mobile.rebuild.width = !1, this.permissions.mobile.rebuild.scrollHeight = !1, this.attributesToMap = [...this.attributesToMap, {
                key: "strength",
                type: "number",
                fallback: this.settings.strength
            }, {
                key: "radius",
                type: "number",
                fallback: this.settings.radius
            }]
        }
        initializeObject(t, e, s, i) {
            super.initializeObject(t, e, s, i), e.setProperty("is-magneting", !1), e.setProperty("magnetic-target-x", 0), e.setProperty("magnetic-target-y", 0), e.setProperty("magnetic-x", 0), e.setProperty("magnetic-y", 0), e.setProperty("lerp", .1)
        }
        onMouseMove(t) {
            this.objects.forEach(e => {
                let s = e.htmlElement.getBoundingClientRect(),
                    i = s.left + s.width / 2,
                    r = s.top + s.height / 2,
                    n = t.clientX - i,
                    o = t.clientY - r,
                    a = Math.sqrt(n ** 2 + o ** 2),
                    l = e.getProperty("radius") ? ? 0,
                    h = e.getProperty("strength") ? ? 0,
                    c = this.tools.magneticPull.process({
                        distance: a,
                        radius: l,
                        strength: h
                    });
                e.setProperty("magnetic-target-x", n * c), e.setProperty("magnetic-target-y", o * c), c > 0 && e.setProperty("is-magneting", !0)
            })
        }
        onFrame(t) {
            this.objects.forEach(e => {
                if (e.getProperty("is-magneting")) {
                    let s = e.getProperty("magnetic-x") ? ? 0,
                        i = e.getProperty("magnetic-y") ? ? 0,
                        r = e.getProperty("lerp") ? ? 0,
                        n = e.getProperty("magnetic-target-x") ? ? 0,
                        o = e.getProperty("magnetic-target-y") ? ? 0,
                        a = this.tools.lerp.process({
                            from: s,
                            to: n,
                            progress: r
                        }),
                        l = this.tools.lerp.process({
                            from: i,
                            to: o,
                            progress: r
                        });
                    a > -.01 && a < .01 && (a = 0, e.setProperty("magnetic-x", e.getProperty("magnetic-target-x"))), l > -.01 && l < .01 && (l = 0, e.setProperty("magnetic-y", e.getProperty("magnetic-target-y"))), s += a, i += l, e.setProperty("magnetic-x", s), e.setProperty("magnetic-y", i), this.events.emit(`magnetic:move:${e.id}`, {
                        x: s,
                        y: i
                    }), this.applyToElementAndConnects(e, h => {
                        h.style.setProperty("--magnetic-x", s.toString()), h.style.setProperty("--magnetic-y", i.toString())
                    }), (e.getProperty("magnetic-target-x") == s || e.getProperty("magnetic-target-y") == i) && e.setProperty("is-magneting", !1)
                }
            })
        }
    },
    ot = class {
        constructor() {
            this.measureQueue = [], this.mutateQueue = [], this.scheduled = !1
        }
        measure(t) {
            this.measureQueue.push(t), this.schedule()
        }
        mutate(t) {
            this.mutateQueue.push(t), this.schedule()
        }
        schedule() {
            this.scheduled || (this.scheduled = !0, requestAnimationFrame(() => {
                let t = this.measureQueue;
                this.measureQueue = [];
                for (let s = 0; s < t.length; s++) try {
                    t[s]()
                } catch (i) {
                    console.error("Error in frameDOM measure task:", i)
                }
                let e = this.mutateQueue;
                this.mutateQueue = [];
                for (let s = 0; s < e.length; s++) try {
                    e[s]()
                } catch (i) {
                    console.error("Error in frameDOM mutate task:", i)
                }
                this.scheduled = !1
            }))
        }
    },
    z = new ot,
    at = class extends A {
        constructor(t) {
            super(t), this.nearOnly = !0, this.useAllObjects = !1, this.maxDistanceMultiplier = 1, this.updateThreshold = .1, this.enabled = !0, this.scrollUpdateScheduled = !1, ye() && (this.enabled = !1)
        }
        onObjectConnected(t) {
            this.enabled && (super.onObjectConnected(t), this.centers.attach(t), this.hover.track(t))
        }
        removeObject(t) {
            if (!this.enabled) return super.removeObject(t);
            let e = this.objectMapOnPage.get(t);
            e && (this.centers.detach(e), this.hover.untrack(e)), super.removeObject(t)
        }
        onScroll() {
            this.enabled && (this.centers.invalidateAll(), this.scheduleCursorUpdate())
        }
        onMouseMoveMeasure(t) {
            this.enabled && (super.onMouseMoveMeasure(t), this.refreshPointerState())
        }
        onScrollMeasure(t) {
            this.enabled && (super.onScrollMeasure(t), this.refreshPointerState())
        }
        getCursorTargets(t = !1) {
            if (!this.enabled) return [];
            let e = this.hover.activeObjects();
            return this.nearOnly && e.length ? e : this.useAllObjects ? this.objectsOnPage : this.objects.length > 0 ? this.objects : t ? this.objectsOnPage : this.objects
        }
        refreshPointerState(t, e = !1) {
            if (!this.enabled) return;
            let s = this.data.cursor.targetX,
                i = this.data.cursor.targetY,
                r = t ? [t] : this.getCursorTargets(e),
                n = !this.nearOnly && this.maxDistanceMultiplier > 0 ? Math.pow(this.data.viewport.windowWidth * this.maxDistanceMultiplier, 2) : null;
            for (let o of r) {
                let {
                    cx: a,
                    cy: l
                } = this.centers.getCenter(o), h = s - a, c = i - l, d = h * h + c * c;
                if (this.nearOnly) {
                    if (d > this.data.viewport.windowWidth * this.data.viewport.windowWidth && !this.hover.isActive(o)) continue
                } else if (n !== null && d > n) continue;
                o.setProperty("dx", h), o.setProperty("dy", c), o.setProperty("dist", Math.sqrt(d))
            }
        }
        scheduleCursorUpdate() {
            !this.enabled || this.scrollUpdateScheduled || (this.scrollUpdateScheduled = !0, z.measure(() => {
                this.refreshPointerState(), z.mutate(() => {
                    this.scrollUpdateScheduled = !1, D.run(() => {
                        this.onCursorScrollUpdate()
                    })
                })
            }))
        }
        onCursorScrollUpdate() {}
    },
    se = Math.PI * 2,
    lt = 180 / Math.PI,
    ae = t => t < 0 ? 0 : t > 1 ? 1 : t,
    ht = (t, e) => {
        let s = (e - t) % se;
        return s > Math.PI && (s -= se), s < -Math.PI && (s += se), t + s
    },
    le = new WeakMap,
    ct = t => {
        let e = le.get(t);
        return e || (e = {
            angle: 0,
            dist: 0,
            tAngle: 0,
            tDist: 0,
            prevDeg: NaN,
            prevDist: NaN
        }, le.set(t, e)), e
    },
    $t = class extends at {
        constructor(t) {
            super(t), this.htmlKey = "spotlight", this.nearOnly = !1, this.useAllObjects = !1, this.maxDistanceMultiplier = 1, this.attributesToMap.push({
                key: "lerp",
                type: "number",
                fallback: this.settings.lerp,
                transform: e => ae(this.tools.adaptiveLerp.process({
                    value: e,
                    inMin: .1,
                    inMax: 1,
                    outMin: .05,
                    outMax: .65
                }))
            }, {
                key: "angle-threshold",
                type: "number",
                fallback: .2
            }, {
                key: "distance-threshold",
                type: "number",
                fallback: .5
            }, {
                key: "deadzone",
                type: "number",
                fallback: 4
            }, {
                key: "dist-max",
                type: "number",
                fallback: 0
            })
        }
        initializeObject(t, e, s, i) {
            super.initializeObject(t, e, s, i), e.setProperty("spotlight-angle-rad", 0), e.setProperty("spotlight-distance", 0), e.setProperty("spotlight-angle-rad-target", 0), e.setProperty("spotlight-distance-target", 0), z.measure(() => {
                this.refreshPointerState(e, !0), z.mutate(() => {
                    D.run(() => {
                        this.updateSpotlightState(e, {
                            forceImmediate: !0,
                            forceEmit: !0,
                            bypassDeadzone: !0
                        })
                    })
                })
            })
        }
        onMutate(t) {
            if (this.enabled) {
                super.onMutate(t);
                let e = this.getCursorTargets(!1);
                (e.length > 0 ? e : this.getCursorTargets(!0)).forEach(s => {
                    this.updateSpotlightState(s)
                })
            }
        }
        onCursorScrollUpdate() {
            let t = this.getCursorTargets(!1);
            (t.length > 0 ? t : this.getCursorTargets(!0)).forEach(e => {
                this.updateSpotlightState(e, {
                    bypassDeadzone: !0
                })
            })
        }
        updateSpotlightState(t, e = {}) {
            let s = t.getProperty("dx"),
                i = t.getProperty("dy"),
                r = t.getProperty("dist");
            if (!Number.isFinite(s) || !Number.isFinite(i) || !Number.isFinite(r)) return;
            let n = ct(t),
                o = t.getProperty("deadzone") ? ? 4;
            (e.bypassDeadzone || r > o) && (n.tAngle = Math.atan2(i, s));
            let a = t.getProperty("dist-max") ? ? 0;
            if (n.tDist = a > 0 ? Math.min(r, a) : r, t.setProperty("spotlight-distance-target", n.tDist), t.setProperty("spotlight-angle-rad-target", n.tAngle), e.forceImmediate) n.angle = n.tAngle, n.dist = n.tDist;
            else {
                let y = ae(t.getProperty("lerp") ? ? .15),
                    m = ht(n.angle, n.tAngle);
                n.angle += (m - n.angle) * y, n.dist += (n.tDist - n.dist) * y
            }
            t.setProperty("spotlight-angle-rad", n.angle), t.setProperty("spotlight-distance", n.dist);
            let l = n.angle * lt - 90,
                h = t.getProperty("angle-threshold") ? ? .2,
                c = t.getProperty("distance-threshold") ? ? .5,
                d = e.forceEmit || Number.isNaN(n.prevDeg) || Math.abs(l - n.prevDeg) > h,
                p = e.forceEmit || Number.isNaN(n.prevDist) || Math.abs(n.dist - n.prevDist) > c;
            if (d || p) {
                let y = Math.round(l * 10) / 10,
                    m = Math.round(n.dist * 10) / 10;
                this.applyToElementAndConnects(t, u => {
                    D.setVars(u, {
                        "--spotlight-angle": String(y),
                        "--spotlight-angle-deg": `${y}deg`,
                        "--spotlight-distance": String(m)
                    })
                }), n.prevDeg = l, n.prevDist = n.dist, this.events.emit(`spotlight:update:${t.id}`, {
                    distance: m,
                    angleDeg: y
                })
            }
        }
    },
    he = "-aspect-ready";

function dt(t) {
    if (!t) return !1;
    let e = t.toLowerCase();
    return !!(e.endsWith(".svg") || e.startsWith("data:image/svg"))
}

function ce(t) {
    let e = new DataView(t);
    return t.byteLength < 24 ? {
        width: 0,
        height: 0
    } : e.getUint32(0) !== 2303741511 || e.getUint32(4) !== 218765834 ? {
        width: 0,
        height: 0
    } : e.getUint32(12) !== 13 || e.getUint32(16) !== 1229472850 ? {
        width: 0,
        height: 0
    } : {
        width: e.getUint32(20, !1),
        height: e.getUint32(24, !1)
    }
}

function de(t) {
    let e = new DataView(t);
    if (e.getUint16(0) !== 65496) return {
        width: 0,
        height: 0
    };
    let s = 2;
    for (; s + 9 < t.byteLength;) {
        let i = e.getUint16(s);
        if (s += 2, i === 65498 || i === 65497) break;
        let r = e.getUint16(s);
        if (r < 2 || s + r > t.byteLength) break;
        if (i >= 65472 && i <= 65475 || i >= 65477 && i <= 65479 || i >= 65481 && i <= 65483 || i >= 65485 && i <= 65487) return {
            height: e.getUint16(s + 3),
            width: e.getUint16(s + 5)
        };
        s += r
    }
    return {
        width: 0,
        height: 0
    }
}

function ue(t) {
    let e = new DataView(t);
    if (t.byteLength < 16) return {
        width: 0,
        height: 0
    };
    if (e.getUint32(0, !0) !== 1179011410 || e.getUint32(8, !0) !== 1346520407) return {
        width: 0,
        height: 0
    };
    let s = 12;
    for (; s + 8 <= t.byteLength;) {
        let i = e.getUint32(s, !1),
            r = e.getUint32(s + 4, !0),
            n = s + 8;
        if (i === 1448097880) {
            let o = (e.getUint16(n + 4, !0) | e.getUint8(n + 6) << 16) + 1,
                a = (e.getUint16(n + 7, !0) | e.getUint8(n + 9) << 16) + 1;
            return {
                width: o,
                height: a
            }
        }
        if (i === 1448097824 && n + 10 <= t.byteLength && e.getUint8(n + 3) === 157 && e.getUint8(n + 4) === 1 && e.getUint8(n + 5) === 42) {
            let o = e.getUint16(n + 6, !0) & 16383,
                a = e.getUint16(n + 8, !0) & 16383;
            return {
                width: o,
                height: a
            }
        }
        if (i === 1448097868 && n + 5 <= t.byteLength && e.getUint8(n) === 47) {
            let o = e.getUint8(n + 1),
                a = e.getUint8(n + 2),
                l = e.getUint8(n + 3),
                h = e.getUint8(n + 4),
                c = 1 + ((a & 63) << 8 | o),
                d = 1 + ((h & 15) << 10 | l << 2 | (a & 192) >> 6);
            return {
                width: c,
                height: d
            }
        }
        s = n + r + (r & 1)
    }
    return {
        width: 0,
        height: 0
    }
}

function pe(t, e) {
    let s = (e || "").toLowerCase();
    if (s.includes("png")) return ce(t);
    if (s.includes("jpeg") || s.includes("jpg")) return de(t);
    if (s.includes("webp")) return ue(t);
    let i = ce(t);
    return i.width || (i = de(t), i.width) || (i = ue(t), i.width) ? i : {
        width: 0,
        height: 0
    }
}
async function ut(t, e, s) {
    let i = await fetch(t, {
        mode: "cors",
        credentials: (e == null ? void 0 : e.credentials) ? ? "omit",
        referrerPolicy: e == null ? void 0 : e.referrerPolicy,
        signal: e == null ? void 0 : e.signal,
        cache: "default"
    });
    if (!i.ok || !i.body) throw new Error(`HTTP ${i.status}`);
    let r = i.headers.get("content-type"),
        n = i.body.getReader(),
        o = 1048576,
        a = 4096,
        l = new Uint8Array(o),
        h = 0,
        c = 0,
        d = [],
        p = null,
        y = !1;
    for (;;) {
        let {
            done: v,
            value: g
        } = await n.read();
        if (v) break;
        if (!g) continue;
        let f = g.buffer.slice(g.byteOffset, g.byteOffset + g.byteLength);
        if (d.push(f), !p && h < o) {
            let b = Math.min(g.byteLength, o - h);
            if (b > 0 && (l.set(g.subarray(0, b), h), h += b), h - c >= a) {
                let w = h === l.byteLength ? l : l.slice(0, h),
                    x = pe(w.buffer, r);
                x.width && x.height && (p = x, !y && s && (s(p), y = !0)), c = h
            }
        }
    }
    if (!p) {
        let v = await new Response(new Blob(d)).arrayBuffer(),
            g = pe(v, r);
        g.width && g.height && (p = g, !y && s && (s(p), y = !0))
    }
    let m = new Blob(d, {
            type: r || "application/octet-stream"
        }),
        u = URL.createObjectURL(m);
    return {
        dims: p,
        blobUrl: u,
        contentType: r
    }
}
var Vt = class extends A {
        constructor(t) {
            super(t), this.isStartLoaded = !1, this.loadingCount = 0, this.imageStates = new WeakMap, this.htmlKey = "lazy"
        }
        onInit() {
            document.querySelectorAll("img[string-lazy], img[data-string-lazy]").forEach(t => this.ensureState(t)), this.isStartLoaded = !0
        }
        onObjectConnected(t) {
            let e = t.htmlElement;
            if (!(e instanceof HTMLImageElement)) return;
            let s = this.ensureState(e);
            !s.aspectReady && !s.aspectLoading && this.prepareAspectRatio(e);
            let i = r => {
                this.handleInView(e, s, !!(r != null && r.inView))
            };
            s.unsubscribe && s.unsubscribe(), this.events.on(`object:inview:${t.id}`, i), s.unsubscribe = () => this.events.off(`object:inview:${t.id}`, i), this.isStartLoaded && (t.getProperty("is-inview") ? ? !1) && this.handleInView(e, s, !0)
        }
        onObjectDisconnected(t) {
            let e = t.htmlElement;
            if (!(e instanceof HTMLImageElement)) return;
            let s = this.imageStates.get(e);
            s && (s.pendingActivation = !1, s.controller && s.controller.abort(), s.blobUrl && URL.revokeObjectURL(s.blobUrl), s.unsubscribe && (s.unsubscribe(), s.unsubscribe = void 0))
        }
        ensureState(t) {
            let e = this.imageStates.get(t);
            if (!e) {
                let s = this.readSource(t);
                return e = {
                    src: s,
                    aspectReady: !1,
                    contentReady: !1,
                    aspectLoading: !1,
                    contentLoading: !1,
                    pendingActivation: !1,
                    rangeAttempted: !1,
                    fetching: !1
                }, this.imageStates.set(t, e), t.classList.contains("lazyLoad") || t.classList.add("lazyLoad"), t.dataset && !t.dataset.stringLazySrc && s && (t.dataset.stringLazySrc = s), e
            }
            return e.src || (e.src = this.readSource(t)), e
        }
        readSource(t) {
            let e = this.tools.domAttribute.process({
                element: t,
                key: this.htmlKey,
                fallback: ""
            });
            return typeof e == "string" ? e : e == null ? "" : String(e)
        }
        handleInView(t, e, s) {
            e.pendingActivation = s, s && (e.aspectReady ? this.maybeActivateImage(t, e) : e.aspectLoading || this.prepareAspectRatio(t))
        }
        async prepareAspectRatio(t) {
            let e = this.ensureState(t);
            if (!e.src || e.aspectLoading || e.aspectReady) return;
            if (dt(e.src)) {
                e.aspectReady = !0, e.allowSrcFallback = !0, this.maybeActivateImage(t, e);
                return
            }
            e.aspectLoading = !0, e.fetching = !0;
            let s = t.getAttribute("crossorigin"),
                i = t.getAttribute("referrerpolicy"),
                r = new AbortController;
            e.controller = r;
            try {
                let {
                    blobUrl: n
                } = await ut(e.src, {
                    credentials: s === "use-credentials" ? "include" : "omit",
                    referrerPolicy: i || void 0,
                    signal: r.signal
                }, o => {
                    o.width > 0 && o.height > 0 && !e.aspectReady && (t.style.aspectRatio = `${o.width} / ${o.height}`, t.classList.add(he), e.width = o.width, e.height = o.height, e.aspectReady = !0)
                });
                e.blobUrl = n, !e.aspectReady && e.width && e.height && (t.style.aspectRatio = `${e.width} / ${e.height}`, t.classList.add(he), e.aspectReady = !0)
            } catch {
                e.allowSrcFallback = !0, e.aspectReady = !0
            } finally {
                e.fetching = !1, e.aspectLoading = !1, this.maybeActivateImage(t, e)
            }
        }
        maybeActivateImage(t, e) {
            !e.pendingActivation || e.contentReady || e.contentLoading || !e.aspectReady || !e.src || e.fetching && !e.blobUrl || (e.blobUrl || e.allowSrcFallback) && this.activateImage(t, e)
        }
        activateImage(t, e) {
            e.contentLoading = !0, this.loadingCount++;
            let s = n => {
                    e.contentLoading && (e.contentLoading = !1, e.pendingActivation = !1, this.loadingCount = Math.max(0, this.loadingCount - 1), n && (e.contentReady = !0, t.classList.add("-loaded")), this.loadingCount === 0 && this.events.emit("image:load:all", null))
                },
                i = () => s(!0),
                r = () => s(!1);
            t.addEventListener("load", i, {
                once: !0
            }), t.addEventListener("error", r, {
                once: !0
            }), t.decoding = "async", t.loading = t.loading || "lazy", e.blobUrl ? (t.removeAttribute("srcset"), t.removeAttribute("sizes"), t.src = e.blobUrl) : t.src = e.src, t.complete && t.naturalWidth > 0 && t.naturalHeight > 0 && (t.removeEventListener("load", i), t.removeEventListener("error", r), s(!0))
        }
    },
    pt = class extends A {
        constructor(t) {
            super(t), this.htmlKey = ""
        }
        canConnect(t) {
            return t.keys[0] == null
        }
    },
    X = class {
        constructor(t) {
            this.min = void 0, this.max = void 0, this.enable = !0, this.min = t == null ? void 0 : t.min, this.max = t == null ? void 0 : t.max, this.enable = (t == null ? void 0 : t.enable) ? ? !0
        }
        setEnable(t = !0) {
            this.enable = t
        }
        setRange(t, e) {
            this.min = t ? ? void 0, this.max = e ? ? void 0
        }
        get mediaQuery() {
            let t = "screen";
            return this.min && (t += ` and (min-width: ${this.min}px)`), this.max && (t += ` and (max-width: ${this.max}px)`), t
        }
    },
    Wt = class extends A {
        constructor(t) {
            super(t), this.queries = {
                0: new X({
                    max: 359
                }),
                1: new X({
                    min: 360,
                    max: 1023
                }),
                2: new X({
                    min: 1024,
                    max: 1365
                }),
                3: new X({
                    min: 1366
                })
            }, this.isMobileMedia = !1, this.isTabletMedia = !1, this.isLaptopMedia = !1, this.isDesktopMedia = !1, this.matchMedias = {
                0: window.matchMedia(this.queries[0].mediaQuery),
                1: window.matchMedia(this.queries[1].mediaQuery),
                2: window.matchMedia(this.queries[2].mediaQuery),
                3: window.matchMedia(this.queries[3].mediaQuery)
            }, this._type = 2
        }
        onConnect() {}
        onInit() {
            if (this.settings != null && this.settings.settings != null) {
                let t = this.settings.settings;
                t.mobile ? (this.queries[0].enable = !0, this.queries[0].setRange(t.mobile.min == null ? null : t.mobile.min, t.mobile.max ? ? null), this.matchMedias[0] = window.matchMedia(this.queries[0].mediaQuery)) : this.queries[0].enable = !1, t.tablet ? (this.queries[1].enable = !0, this.queries[1].setRange(t.tablet.min == null ? null : t.tablet.min, t.tablet.max ? ? null), this.matchMedias[1] = window.matchMedia(this.queries[1].mediaQuery)) : this.queries[1].enable = !1, t.laptop ? (this.queries[2].enable = !0, this.queries[2].setRange(t.laptop.min == null ? null : t.laptop.min, t.laptop.max ? ? null), this.matchMedias[2] = window.matchMedia(this.queries[2].mediaQuery)) : this.queries[2].enable = !1, t.desktop ? (this.queries[3].enable = !0, this.queries[3].setRange(t.desktop.min == null ? null : t.desktop.min, t.desktop.max ? ? null), this.matchMedias[3] = window.matchMedia(this.queries[3].mediaQuery)) : this.queries[3].enable = !1
            }
            this.updateElements()
        }
        onResize() {
            this.updateElements()
        }
        updateElements() {
            let t = this.matchMedias[0].matches && this.queries[0].enable,
                e = this.matchMedias[1].matches && this.queries[1].enable,
                s = this.matchMedias[2].matches && this.queries[2].enable,
                i = this.matchMedias[3].matches && this.queries[3].enable;
            this.isMobileMedia != t && this.events.emit("screen:mobile", t), this.isTabletMedia != e && this.events.emit("screen:tablet", e), this.isLaptopMedia != s && this.events.emit("screen:laptop", s), this.isDesktopMedia != i && this.events.emit("screen:desktop", i), this.isMobileMedia = t, this.isTabletMedia = e, this.isLaptopMedia = s, this.isDesktopMedia = i, document.querySelectorAll("[string-mobile], [string-tablet], [string-laptop], [string-desktop]").forEach(r => {
                let n = !1;
                r.hasAttribute("string-mobile") && t && (n = !0), r.hasAttribute("string-tablet") && e && (n = !0), r.hasAttribute("string-laptop") && s && (n = !0), r.hasAttribute("string-desktop") && i && (n = !0), n ? r.style.display = null : r.style.display = "none"
            })
        }
    },
    gt = .05,
    mt = .01,
    ge = 1,
    ft = -1,
    bt = 1,
    zt = class extends A {
        constructor(t) {
            super(t), this.previousLerp = 0, this.displacement = 0, this.acceleration = 0, this.velocityMultiplier = .00125, this.isInitialScroll = !0, this.baseVelocityMultiplier = .00125, this.reducedVelocityMultiplier = this.baseVelocityMultiplier / 20, this.negativeVelocityMultiplier = -1e-4, this.maxDisplacementValue = 0, this.setupItem = e => {
                let s = e.getProperty("glide") ? ? 0,
                    i = -this.data.scroll.displacement * this.maxDisplacementValue * s;
                this.events.emit(`object:glide:${e.id}`, i);
                let r = `translate3d(0, ${i}px, 0)`;
                e.htmlElement.style.transform = r
            }, this.onUpdateDesktopEvent = () => {
                for (let e = 0; e < this.objects.length; e++) {
                    let s = this.objects[e];
                    this.setupItem(s)
                }
            }, this.onUpdateMobileEvent = () => {}, this.onUpdateEvent = this.onUpdateDesktopEvent, this.htmlKey = "glide", this.baseVelocityMultiplier = this.settings["glide-base-velocity"] ? ? this.baseVelocityMultiplier, this.reducedVelocityMultiplier = this.settings["glide-reduce-velocity"] ? ? this.reducedVelocityMultiplier, this.negativeVelocityMultiplier = this.settings["glide-negative-velocity"] ? ? this.negativeVelocityMultiplier, this.attributesToMap = [...this.attributesToMap, {
                key: "glide",
                type: "number",
                fallback: this.settings.glide
            }]
        }
        calcExpanderFactor(t) {
            let e = t ? this.data.scroll.lerped < this.previousLerp : this.data.scroll.lerped > this.previousLerp;
            this.velocityMultiplier = e ? this.isInitialScroll ? this.baseVelocityMultiplier : this.reducedVelocityMultiplier : this.negativeVelocityMultiplier, e || (this.isInitialScroll = !1)
        }
        onStart() {
            this.maxDisplacementValue = this.data.viewport.windowHeight * .1
        }
        onResize() {
            window.innerWidth > 1024 ? (this.maxDisplacementValue = this.data.viewport.windowHeight * .1, this.onUpdateEvent = this.onUpdateDesktopEvent) : (this.onUpdateEvent = this.onUpdateMobileEvent, this.resetState(), this.objects.forEach(t => {
                this.setupItem(t)
            }))
        }
        resetState() {
            this.displacement = 0, this.acceleration = 0, this.isInitialScroll = !0, this.velocityMultiplier = this.baseVelocityMultiplier
        }
        onScrollStart() {
            this.resetState()
        }
        onScrollStop() {
            this.resetState(), this.previousLerp = 0;
            for (let t = 0; t < this.objects.length; t++) {
                let e = this.objects[t],
                    s = "translate3d(0, 0px, 0)";
                e.htmlElement.style.transform = s, e.htmlElement.style.setProperty("--glide", this.data.scroll.displacement.toString())
            }
        }
        onFrame(t) {
            this.calcExpanderFactor(this.data.scroll.isScrollingDown === !1), this.acceleration = Math.min(ge, this.acceleration + gt), this.displacement = Math.max(mt, Math.min(ge, this.displacement + this.velocityMultiplier)), this.data.scroll.displacement = Math.min(bt, Math.max(ft, this.data.scroll.lerped * this.displacement * this.acceleration)), this.objects.forEach(e => {
                this.applyToElementAndConnects(e, s => {
                    s.style.setProperty("--glide", this.data.scroll.displacement.toString())
                })
            }), this.previousLerp = this.data.scroll.lerped, this.onUpdateEvent()
        }
    },
    Ht = class extends A {
        constructor(t) {
            super(t), this.htmlKey = "lerp"
        }
        onScrollStop() {
            this.objects.forEach(t => {
                this.setLerpValue(t, 0)
            })
        }
        onFrame(t) {
            let e = t.scroll.lerped;
            this.objects.forEach(s => {
                this.setLerpValue(s, e)
            })
        }
        setLerpValue(t, e) {
            this.events.emit(`object:lerp:${t.id}`, e), t.htmlElement.style.setProperty("--lerp", e.toString())
        }
    },
    yt = class extends A {
        constructor(t) {
            super(t), this.updateScheduled = !1, this.htmlKey = "progress", this.attributesToMap = [...this.attributesToMap, {
                key: "easing",
                type: "easing",
                fallback: this.settings.easing
            }]
        }
        initializeObject(t, e, s, i) {
            super.initializeObject(t, e, s, i)
        }
        recomputeProgress(t) {
            let e = t.getProperty("start-position") ? ? 0,
                s = t.getProperty("difference-position") ? ? 0,
                i = 0;
            i = Math.min(1, Math.max(0, (this.data.scroll.transformedCurrent - e) / s)), t.setProperty("progress-raw", i);
            let r = t.getProperty("easing"),
                n = typeof r == "function" ? r(i) : i;
            this.applyProgressValue(t, n)
        }
        applyProgressValue(t, e) {
            t.setProperty("progress", e)
        }
        calculatePositions(t, e) {
            super.calculatePositions(t, e), this.recomputeProgress(t)
        }
        onScroll(t) {
            super.onScroll(t)
        }
        onObjectConnected(t) {
            super.onObjectConnected(t)
        }
        onScrollMeasure(t) {
            this.objects.forEach(e => {
                this.recomputeProgress(e)
            })
        }
        onMutate() {
            this.objects.forEach(t => {
                this.updateObjectProgress(t)
            })
        }
        updateObjectProgress(t) {
            let e = t.getProperty("key"),
                s = t.getProperty("progress"),
                i = t.getProperty("progress-raw") ? ? s,
                r = s.toString(),
                n = t.getProperty("easing");
            this.events.emit(`object:progress:${t.id}`, s), this.applyToElementAndConnects(t, o => {
                e && D.setVars(o, {
                    [e]: r
                })
            }, (o, a) => {
                if (!a) return;
                let l = a.applyProgress(i, typeof n == "function" ? n : void 0);
                a.setProperty("progress", l), e && D.setVars(o, {
                    [e]: l.toString()
                })
            })
        }
        onObjectDisconnected(t) {
            super.onObjectDisconnected(t);
            let e = t.getProperty("key");
            if (!e) return;
            let s = i => {
                i.style.removeProperty(e)
            };
            s(t.htmlElement), t.mirrorObjects.forEach(i => {
                s(i.htmlElement)
            })
        }
    },
    Bt = class extends yt {
        constructor(t) {
            super(t), this.updateScheduledTransform = !1, this.calculateDesktopParallax = e => {
                let s = e.getProperty("progress") ? ? 0,
                    i = e.getProperty("parallax") ? ? 0,
                    r = e.getProperty("parallax-position-start") ? ? 0,
                    n = e.getProperty("parallax-position-end") ? ? 1,
                    o = e.getProperty("parallax-sign") ? ? 1,
                    a = this.data.viewport.windowHeight / this.data.viewport.transformScale,
                    l = o * i * (a * r + s * a * n);
                return this.events.emit(`object:parallax:${e.id}`, l), {
                    transform: `translate3d(0, ${l}px, 0)`
                }
            }, this.calculateMobileParallax = e => (this.events.emit(`object:parallax:${e.id}`, 0), {
                transform: "translate3d(0, 0px, 0)"
            }), this.htmlKey = "parallax", this.attributesToMap = [...this.attributesToMap, {
                key: "parallax",
                type: "number",
                fallback: this.settings.parallax
            }, {
                key: "parallax-bias",
                type: "number",
                fallback: this.settings["parallax-bias"]
            }], this.calculateParallaxForObject = this.calculateDesktopParallax
        }
        initializeObject(t, e, s, i) {
            super.initializeObject(t, e, s, i);
            let r = e.getProperty("parallax-bias") ? ? 0,
                n = Math.abs(e.getProperty("parallax") ? ? .2);
            e.setProperty("parallax-sign", Math.sign(e.getProperty("parallax"))), e.setProperty("parallax", n), e.setProperty("parallax-position-start", -.5 + .5 * r), e.setProperty("parallax-position-end", .5 + .5 * (1 - r));
            let o = this.data.viewport.windowHeight;
            e.setProperty("offset-top", n * o), e.setProperty("offset-bottom", n * o)
        }
        calculatePositions(t, e) {
            super.calculatePositions(t, e), t.setProperty("transform-value", this.calculateParallaxForObject(t))
        }
        onScroll(t) {
            super.onScroll(t)
        }
        onResize() {
            let t = window.innerWidth > 1024;
            this.calculateParallaxForObject = t ? this.calculateDesktopParallax : this.calculateMobileParallax
        }
        onScrollMeasure(t) {
            super.onScrollMeasure(t), this.objects.forEach(e => {
                e.setProperty("transform-value", this.calculateParallaxForObject(e))
            })
        }
        onMutate() {
            this.objects.forEach(t => {
                let e = t.getProperty("transform-value");
                this.applyToElementAndConnects(t, s => {
                    D.setProps(s, e)
                })
            })
        }
    },
    _ = {
        BEFORE_ELEMENT: "-before-element",
        AFTER_ELEMENT: "-after-element"
    };

function vt(t) {
    if (!t || !Array.isArray(t.chars) || t.chars.length === 0) return [];
    let e = t.chars[0].splitClass ? ? [];
    if (e.length === 0) return [];
    for (let s of t.chars) {
        let i = s.splitClass ? ? [];
        if (i.length !== e.length) return [];
        for (let r = 0; r < i.length; r++)
            if (i[r] !== e[r]) return []
    }
    return e
}

function wt(t, e, s) {
    let i = document.createDocumentFragment(),
        r = 0,
        n = F(e, "line") || F(e, "charLine") || F(e, "wordLine"),
        o = F(e, "char") || F(e, "charLine") || F(e, "charWord"),
        a = 0;
    t.forEach(p => a += p.words.length), a--;
    let l = 0;
    t.forEach(p => p.words.forEach(y => l += y.chars.length));
    let h = t.length,
        c = a + 1,
        d = new Map;
    return t.forEach((p, y) => {
        let m = y === t.length - 1,
            u = i,
            v = [];
        if (n && (u = document.createElement("span"), u.setAttribute("aria-hidden", "true"), u.classList.add("-s-line"), p.isBeforeElement && u.classList.add(_.BEFORE_ELEMENT), p.isAfterElement && u.classList.add(_.AFTER_ELEMENT), u.style.setProperty("--line-index", String(p.lineIndex)), u.style.setProperty("--word-total", String(p.words.length)), ie(u, p.calculatedValues, e)), p.words.forEach((g, f) => {
                n && (a = p.words.length - 1);
                let b = f === a;
                if (g.chars.length === 1 && g.chars[0].token.type === "element") {
                    let S = g.chars[0].token.node.cloneNode(!0);
                    u.appendChild(S);
                    return
                }
                let w = g.chars.map(S => S.char).join("");
                w && v.push(w);
                let x = F(e, "word") || F(e, "charWord") || F(e, "wordLine"),
                    M = x ? document.createElement("span") : u,
                    L = vt(g);
                if (x && (M.setAttribute("aria-hidden", "true"), M.classList.add("-s-word"), g.isBeforeElement && M.classList.add(_.BEFORE_ELEMENT), g.isAfterElement && M.classList.add(_.AFTER_ELEMENT), M.style.setProperty("--word-index", String(g.wordIndexGlobal)), M.style.setProperty("--char-total", String(g.chars.length)), M.setAttribute("data-split-content", w), ie(M, g.calculatedValues, e), L.length && M.classList.add(...L)), o) g.chars.forEach((S, j) => {
                    if (S.char === " " || S.char === "	") return;
                    let E = document.createElement("span");
                    E.setAttribute("aria-hidden", "true");
                    let P = E;
                    P.classList.add("-s-char"), S.isBeforeElement && P.classList.add(_.BEFORE_ELEMENT), S.isAfterElement && P.classList.add(_.AFTER_ELEMENT), P.textContent = S.char, P.setAttribute("data-split-content", S.char), P.style.setProperty("--char-index", String(r++));
                    let O = g.chars[j + 1];
                    if (O) {
                        let k = s.getKerning(S.char, O.char);
                        Math.abs(k) > .01 && (P.style.marginRight = `${k.toFixed(2)}px`)
                    }
                    ie(P, S.calculatedValues, e);
                    let C = S.splitClass ? ? [];
                    C.length && !L.length && P.classList.add(...C), M.appendChild(E)
                });
                else {
                    let S = document.createTextNode(w);
                    M.appendChild(S)
                }
                x && u.appendChild(M), n ? b ? m || u.appendChild(document.createElement("br")) : M.appendChild(document.createTextNode(" ")) : b || M.appendChild(document.createTextNode(" "))
            }), n) {
            let g = v.join(" ");
            u.setAttribute("data-split-content", g), i.appendChild(u)
        }
    }), o && d.set("--char-global-total", String(l)), (F(e, "word") || F(e, "charWord") || F(e, "wordLine")) && d.set("--word-global-total", String(c)), n && d.set("--line-global-total", String(h)), {
        fragment: i,
        extraProps: d
    }
}

function ie(t, e, s) {
    if (e)
        for (let i of e) {
            if (!xt(i.type, i.align, s)) continue;
            let r = Mt(i.type, i.align);
            t.style.setProperty(r, String(i.value))
        }
}

function xt(t, e, s) {
    let i = s[t] ? ? [];
    return Array.isArray(i) && i.some(r => e.startsWith("random") ? r.align.startsWith("random") : r.align === e)
}

function Mt(t, e) {
    let s = e.startsWith("random") ? "random" : e;
    return `--${t}-${s}`
}

function F(t, e) {
    return Array.isArray(t[e]) && t[e].length > 0
}
var K = 0;

function Et(t) {
    K = 0;
    let e = [],
        s = (r, n) => {
            n && Object.keys(n).length && (r.meta = { ...r.meta || {},
                ...n
            }), e.push(r)
        },
        i = (r, n) => {
            if (r.nodeType === Node.ELEMENT_NODE) {
                let o = r,
                    a = o.tagName.toLowerCase();
                if (a === "split-class") {
                    let l = (o.getAttribute("class") ? ? "").split(/\s+/).filter(Boolean),
                        h = { ...n || {},
                            splitClass: [...(n == null ? void 0 : n.splitClass) ? ? [], ...l]
                        };
                    o.childNodes.forEach(c => i(c, h));
                    return
                }
                if (a === "br") {
                    s({
                        type: "br",
                        id: `br_${K++}`,
                        node: o,
                        tagName: "br"
                    }, n);
                    return
                }
                s({
                    type: "element",
                    id: `el_${K++}`,
                    node: o,
                    tagName: a
                }, n);
                return
            }
            if (r.nodeType === Node.TEXT_NODE) {
                let o = r.nodeValue ? ? "",
                    a = `text_${K++}`;
                o.trim() ? s({
                    type: "text",
                    id: a,
                    node: r,
                    content: o
                }, n) : s({
                    type: "space",
                    id: a,
                    node: r,
                    content: o
                }, n);
                return
            }
            s({
                type: "other",
                id: `node_${K++}`,
                node: r
            }, n)
        };
    return t.forEach(r => i(r)), e
}
var Pt = class {
    constructor(t) {
        this.font = "", this.cache = {
            kerning: new Map,
            charWidth: new Map
        };
        let e = document.createElement("canvas");
        this.ctx = e.getContext("2d"), this.setFontFromElement(t)
    }
    setFontFromElement(t) {
        let e = window.getComputedStyle(t),
            s = `${e.fontStyle} ${e.fontVariant} ${e.fontWeight} ${e.fontSize}/${e.lineHeight} ${e.fontFamily}`;
        s !== this.font && (this.font = s, this.ctx.font = this.font, this.cache.kerning.clear(), this.cache.charWidth.clear())
    }
    getCharWidth(t) {
        if (this.cache.charWidth.has(t)) return this.cache.charWidth.get(t);
        let e = this.ctx.measureText(t).width;
        return this.cache.charWidth.set(t, e), e
    }
    getKerning(t, e) {
        let s = `${t}${e}`,
            i = `${this.font}|${s}`;
        if (this.cache.kerning.has(i)) return this.cache.kerning.get(i);
        let r = this.ctx.measureText(s).width,
            n = this.getCharWidth(t) + this.getCharWidth(e),
            o = r - n;
        return this.cache.kerning.set(i, o), o
    }
    measureWord(t) {
        let e = 0;
        for (let s = 0; s < t.length; s++) {
            let i = t[s];
            if (e += this.getCharWidth(i), s > 0) {
                let r = t[s - 1];
                e += this.getKerning(r, i)
            }
        }
        return e
    }
};

function St(t) {
    let e = [],
        s = [];
    for (let i of t) i.type === "br" ? (s.length && e.push(s), e.push([i]), s = []) : s.push(i);
    return s.length && e.push(s), e
}

function Ct(t, e, s) {
    let i = document.createElement("div"),
        r = window.getComputedStyle(e);
    i.style.position = "absolute", i.style.visibility = "hidden", i.style.pointerEvents = "none", i.style.width = e.clientWidth + "px", i.style.padding = r.padding, i.style.font = r.font, i.style.letterSpacing = r.letterSpacing, i.style.lineHeight = r.lineHeight, i.style.fontVariant = r.fontVariant, i.style.fontStretch = r.fontStretch, i.style.wordBreak = r.wordBreak, i.style.wordWrap = r.wordWrap, i.style.whiteSpace = r.whiteSpace;
    let n = document.createElement("span");
    n.textContent = " ", i.appendChild(n);
    let o = n.getBoundingClientRect().width;
    i.removeChild(n), i.style.width = e.clientWidth + o + "px", i.style.boxSizing = "border-box", e.appendChild(i);
    let a = [],
        l = St(t),
        h = !1,
        c = !1,
        d = !1;
    for (let p of l) {
        if (p.length === 1 && p[0].type === "br") {
            a.push({
                token: p[0],
                rect: new DOMRect(0, 0, 0, 0)
            });
            continue
        }
        if (p.length === 0) continue;
        i.innerHTML = "";
        let y = [],
            m = [];
        p.forEach(u => {
            switch (u.type) {
                case "text":
                    {
                        let v = u.content,
                            g = /^\s/.test(v),
                            f = /\s$/.test(v),
                            b = v.trim().split(/\s+/).filter(w => w.length > 0);b.forEach((w, x) => {
                            let M = document.createElement("span");
                            M.style.display = "inline-block", M.textContent = w, i.appendChild(M), (x < b.length - 1 || f) && i.appendChild(document.createTextNode(" ")), y.push(M), m.push({
                                token: {
                                    type: "text",
                                    id: "",
                                    node: u.node,
                                    content: w,
                                    meta: { ...u.meta || {},
                                        joinPrev: x === 0 ? !g && !c && d : !1
                                    }
                                },
                                wordIndex: y.length - 1,
                                hadLeadingSpace: g,
                                hadTrailingSpace: f
                            })
                        }),
                        c = f,
                        d = !0;
                        break
                    }
                case "element":
                    {
                        let v = u.node.cloneNode(!0),
                            g = document.createElement("span");g.style.display = "inline-block",
                        g.appendChild(v),
                        i.appendChild(g),
                        y.push(g),
                        m.push({
                            token: u,
                            wordIndex: y.length - 1
                        }),
                        h = !0,
                        d = !1,
                        c = !1;
                        break
                    }
                case "space":
                    c = !0;
                    break;
                case "other":
                    d = !1, c = !1;
                    break
            }
        }), i.offsetHeight, m.forEach((u, v) => {
            if (u.wordIndex !== void 0) {
                let g = y[u.wordIndex].getBoundingClientRect(),
                    f;
                if (u.token.type === "text") {
                    let w = s.measureWord(u.token.content);
                    f = new DOMRect(g.x, g.y, w, g.height)
                } else f = g;
                let b = {
                    token: u.token,
                    rect: f
                };
                if (h && u.token.type === "text" && (h = !1, b.token.meta = { ...b.token.meta || {},
                        isAfterElement: !0
                    }), a.push(b), u.token.type === "element") {
                    let w = a[a.length - 2];
                    (w == null ? void 0 : w.token.type) === "text" && (w.token.meta = { ...w.token.meta || {},
                        isBeforeElement: !0
                    })
                }
            }
        })
    }
    return e.removeChild(i), a
}
var me = 5;

function kt(t, e, s) {
    let i = [],
        r = null,
        n = 0,
        o = 0,
        a = 0;
    return t.forEach(l => {
        var p, y, m, u;
        let h = l.token,
            c = ((p = h.meta) == null ? void 0 : p.isBeforeElement) ? ? !1,
            d = ((y = h.meta) == null ? void 0 : y.isAfterElement) ? ? !1;
        if (h.type === "br") {
            r = null;
            return
        }
        if (h.type === "text") {
            let v = h.content,
                g = ((m = h.meta) == null ? void 0 : m.splitClass) ? ? [],
                f = !!((u = h.meta) != null && u.joinPrev),
                b = [],
                w = 0;
            for (let E = 0; E < v.length; E++) {
                let P = v[E],
                    O = E > 0 ? v[E - 1] : null,
                    C = s.getCharWidth(P),
                    k = O ? s.getKerning(O, P) : 0;
                w += k;
                let U = new DOMRect(l.rect.left + w, l.rect.top, C, l.rect.height),
                    H = {
                        char: P,
                        rect: U,
                        token: h,
                        charIndexInWord: E,
                        charIndexInLine: 0,
                        charIndexGlobal: o++
                    };
                g.length && (H.splitClass = g), b.push(H), w += C
            }
            if (b.length > 0) {
                let E = b[b.length - 1];
                c && (E.isBeforeElement = !0), d && (E.isAfterElement = !0)
            }
            let x = Math.round(l.rect.top),
                M = Math.round(n);
            if ((!r || Math.abs(x - M) > me) && (n = x, r = {
                    words: [],
                    rect: l.rect,
                    lineIndex: i.length
                }, i.push(r)), !r) return;
            if (f && r.words.length > 0) {
                let E = r.words[r.words.length - 1],
                    P = r.words.reduce((C, k) => C + k.chars.length, 0),
                    O = E.chars.length;
                b.forEach((C, k) => {
                    C.charIndexInLine = P + k, C.charIndexInWord = O + k
                }), E.chars.push(...b), E.rect = G([E.rect, l.rect]), r.rect = G(r.words.map(C => C.rect)), c && (E.isBeforeElement = !0), d && (E.isAfterElement = !0);
                return
            }
            let L = r.words.length,
                S = r.words.reduce((E, P) => E + P.chars.length, 0);
            b.forEach((E, P) => E.charIndexInLine = S + P);
            let j = {
                chars: b,
                rect: l.rect,
                wordIndexGlobal: a++,
                wordIndexInLine: L,
                isBeforeElement: c,
                isAfterElement: d
            };
            r.words.push(j), r.rect = G(r.words.map(E => E.rect)), c && (r.isBeforeElement = !0), d && (r.isAfterElement = !0);
            return
        }
        if (h.type === "element") {
            let v = l.rect,
                g = Math.round(v.top),
                f = Math.round(n);
            if ((!r || Math.abs(g - f) > me) && (n = g, r = {
                    words: [],
                    rect: v,
                    lineIndex: i.length
                }, i.push(r)), !r) return;
            let b = r.words.length,
                w = r.words.reduce((M, L) => M + L.chars.length, 0),
                x = {
                    chars: [{
                        char: "[E]",
                        rect: v,
                        token: h,
                        charIndexInWord: 0,
                        charIndexInLine: w,
                        charIndexGlobal: o++
                    }],
                    rect: v,
                    wordIndexGlobal: a++,
                    wordIndexInLine: b,
                    isBeforeElement: !1,
                    isAfterElement: !1
                };
            r.words.push(x), r.rect = G(r.words.map(M => M.rect))
        }
    }), i
}

function G(t) {
    if (t.length === 0) return new DOMRect(0, 0, 0, 0);
    let e = Math.min(...t.map(n => n.left)),
        s = Math.min(...t.map(n => n.top)),
        i = Math.max(...t.map(n => n.right)),
        r = Math.max(...t.map(n => n.bottom));
    return new DOMRect(e, s, i - e, r - s)
}
var qt = class extends A {
        constructor(t) {
            super(t), this.htmlKey = "split", this.permissions.mobile.rebuild.height = !1, this.permissions.mobile.rebuild.width = !1
        }
        onResizeWidth() {
            this.objectsOnPage.forEach(t => {
                this.onObjectConnected(t)
            })
        }
        onObjectConnected(t) {
            let e = t.htmlElement;
            if (!e) return;
            let s = e.classList.contains("-splitted"),
                i = e.getAttribute("string-split-original");
            (!s || i === null) && (i = this.escapeAttribute(e.innerHTML), e.setAttribute("string-split-original", i), e.classList.add("-splitted")), t.htmlElement.innerHTML = i;
            let r = e.getAttribute("string-split") ? ? e.getAttribute("data-string-split") ? ? "",
                n = this.tools.optionsParser.process({
                    attributeValue: r
                }),
                {
                    fragment: o,
                    result: a,
                    extraProps: l
                } = this.split(e, n);
            t.setProperty("nodes", o.childNodes), e.setAttribute("aria-label", i), e.innerHTML = "", e.appendChild(a), l.forEach((c, d) => {
                e.style.setProperty(d, c)
            });
            let h = e.getAttribute("string-split-restore-after");
            h && !isNaN(Number(h)) && setTimeout(() => {
                e.innerHTML = i, e.classList.add("-restored")
            }, Number(h))
        }
        split(t, e) {
            let s = new Pt(t),
                i = document.createDocumentFragment();
            t.childNodes.forEach(l => i.appendChild(l.cloneNode(!0)));
            let r = Et(i.childNodes),
                n = Ct(r, t, s),
                o = kt(n, t, s);
            this.applyCalculatedValues(o, e);
            let a = wt(o, e, s);
            return {
                fragment: i,
                result: a.fragment,
                extraProps: a.extraProps
            }
        }
        computeValue(t, e, s) {
            var i, r;
            if (t.align.startsWith("random")) {
                let n = ((i = t.random) == null ? void 0 : i.min) ? ? 0,
                    o = ((r = t.random) == null ? void 0 : r.max) ? ? s - 1;
                return Math.floor(Math.random() * (o - n + 1)) + n
            }
            switch (t.align) {
                case "start":
                    return e;
                case "end":
                    return s - e - 1;
                case "center":
                    {
                        let n = Math.floor((s - 1) / 2);
                        return Math.abs(e - n)
                    }
                default:
                    return e
            }
        }
        applyCalculatedValues(t, e) {
            let s = n => n.words.reduce((o, a) => o + a.chars.length, 0),
                i = t.reduce((n, o) => n + o.words.length, 0),
                r = t.reduce((n, o) => n + o.words.reduce((a, l) => a + l.chars.length, 0), 0);
            t.forEach((n, o) => {
                e.line && (n.calculatedValues = e.line.map(a => ({
                    type: "line",
                    align: a.align,
                    value: this.computeValue(a, o, t.length)
                }))), n.words.forEach((a, l) => {
                    e.word && (a.calculatedValues = e.word.map(c => ({
                        type: "word",
                        align: c.align,
                        value: this.computeValue(c, a.wordIndexGlobal, i)
                    }))), e.wordLine && (a.calculatedValues ? ? (a.calculatedValues = []), a.calculatedValues.push(...e.wordLine.map(c => ({
                        type: "wordLine",
                        align: c.align,
                        value: this.computeValue(c, a.wordIndexInLine, n.words.length)
                    }))));
                    let h = s(n);
                    a.chars.forEach(c => {
                        let d = [];
                        e.char && d.push(...e.char.map(p => ({
                            type: "char",
                            align: p.align,
                            value: this.computeValue(p, c.charIndexGlobal, r)
                        }))), e.charWord && d.push(...e.charWord.map(p => ({
                            type: "charWord",
                            align: p.align,
                            value: this.computeValue(p, c.charIndexInWord, a.chars.length)
                        }))), e.charLine && d.push(...e.charLine.map(p => ({
                            type: "charLine",
                            align: p.align,
                            value: this.computeValue(p, c.charIndexInLine, h)
                        }))), c.calculatedValues = d
                    })
                })
            })
        }
        escapeAttribute(t) {
            return t.replace(/src="(https?:\/\/[^"\s]+)"/g, "src=$1")
        }
    },
    N = "data-fps",
    _t = class extends A {
        constructor(t) {
            super(t), this.displayElement = null, this.intervalId = 0, this.frameCount = 0, this.fpsElements = new Set, this.observer = null, this.lastFps = -1, this._type = 2
        }
        onInit() {
            this.data.system.fpsTracker && this.createDisplayElement(), this.events.on("tracker:fps:visible", this.onVisibilityChange.bind(this)), this.scanElements(), this.observeDOM(), this.intervalId = window.setInterval(() => {
                this.updateFPS(this.frameCount), this.frameCount = 0
            }, 1e3)
        }
        onFrame(t) {
            this.frameCount++
        }
        destroy() {
            var t;
            clearInterval(this.intervalId), (t = this.observer) == null || t.disconnect(), this.removeDisplayElement(), this.fpsElements.clear()
        }
        onVisibilityChange(t) {
            t ? this.createDisplayElement() : this.removeDisplayElement()
        }
        removeDisplayElement() {
            var t;
            (t = this.displayElement) == null || t.remove(), this.displayElement = null
        }
        updateFPS(t) {
            if (t === this.lastFps) return;
            this.lastFps = t;
            let e = String(t);
            for (let s of this.fpsElements) s.isConnected && s.setAttribute(N, e);
            this.displayElement && this.displayElement.setAttribute(N, e), this.events.emit("fps", t)
        }
        scanElements() {
            this.fpsElements.clear(), document.querySelectorAll(`[${N}]`).forEach(t => {
                t !== this.displayElement && this.fpsElements.add(t)
            })
        }
        observeDOM() {
            this.observer = new MutationObserver(t => {
                let e = !1;
                for (let s of t) {
                    for (let i of s.addedNodes)
                        if (i.nodeType === Node.ELEMENT_NODE) {
                            let r = i;
                            r.hasAttribute(N) && (e = !0), r.querySelector(`[${N}]`) && (e = !0)
                        }
                    for (let i of s.removedNodes) i.nodeType === Node.ELEMENT_NODE && this.fpsElements.delete(i)
                }
                e && this.scanElements()
            }), this.observer.observe(document.body, {
                childList: !0,
                subtree: !0
            })
        }
        createDisplayElement() {
            if (this.displayElement) return;
            let t = document.createElement("div");
            Object.assign(t.style, {
                position: "fixed",
                bottom: "10px",
                right: "10px",
                backgroundColor: "#000",
                color: "#fff",
                padding: "4px 8px",
                fontSize: "12px",
                fontFamily: "monospace",
                border: "1px solid rgba(255,255,255,0.2)",
                zIndex: "1000",
                pointerEvents: "none"
            }), t.setAttribute(N, "0"), document.body.appendChild(t);
            let e = "string-fps-tracker-style";
            if (!document.getElementById(e)) {
                let s = document.createElement("style");
                s.id = e, s.innerHTML = `
        [${N}]::before {
          content: 'FPS: ' attr(${N});
        }
      `, document.head.appendChild(s)
            }
            this.displayElement = t
        }
    },
    $ = "data-val",
    V = "data-val-pct",
    W = "data-dir",
    Ut = class extends A {
        constructor(t) {
            super(t), this.displayElement = null, this.valElements = new Set, this.valPctElements = new Set, this.dirElements = new Set, this.observer = null, this.lastVal = -1, this.lastValPct = -1, this.lastDir = "", this.previousCurrent = 0, this.idleTimeout = null, this._type = 2
        }
        onInit() {
            this.data.system.positionTracker && this.createDisplayElement(), this.events.on("tracker:position:visible", this.onVisibilityChange.bind(this)), this.scanElements(), this.observeDOM()
        }
        onScroll(t) {
            let e = t.scroll.current,
                s = t.scroll.target,
                i = t.viewport.contentHeight,
                r = t.viewport.windowHeight,
                n = Math.round(e),
                o = Math.max(1, i - r),
                a = Math.round(e / o * 100),
                l;
            if (e !== s ? l = e < s ? "↓" : "↑" : e !== this.previousCurrent ? l = e > this.previousCurrent ? "↓" : "↑" : l = this.lastDir || "•", this.previousCurrent = e, this.idleTimeout && clearTimeout(this.idleTimeout), l !== "•" && (this.idleTimeout = setTimeout(() => {
                    this.setDirection("•")
                }, 150)), n !== this.lastVal) {
                this.lastVal = n;
                let h = String(n);
                for (let c of this.valElements) c.isConnected && c.setAttribute($, h);
                this.displayElement && this.displayElement.setAttribute($, h)
            }
            if (a !== this.lastValPct) {
                this.lastValPct = a;
                let h = String(a);
                for (let c of this.valPctElements) c.isConnected && c.setAttribute(V, h);
                this.displayElement && this.displayElement.setAttribute(V, h)
            }
            this.setDirection(l), this.events.emit("scroll-position", {
                val: n,
                valPct: a,
                direction: l
            })
        }
        setDirection(t) {
            if (t !== this.lastDir) {
                this.lastDir = t;
                for (let e of this.dirElements) e.isConnected && e.setAttribute(W, t);
                this.displayElement && this.displayElement.setAttribute(W, t)
            }
        }
        destroy() {
            var t;
            this.idleTimeout && clearTimeout(this.idleTimeout), (t = this.observer) == null || t.disconnect(), this.removeDisplayElement(), this.valElements.clear(), this.valPctElements.clear(), this.dirElements.clear()
        }
        onVisibilityChange(t) {
            t ? this.createDisplayElement() : this.removeDisplayElement()
        }
        removeDisplayElement() {
            var t;
            (t = this.displayElement) == null || t.remove(), this.displayElement = null
        }
        scanElements() {
            this.valElements.clear(), this.valPctElements.clear(), this.dirElements.clear(), document.querySelectorAll(`[${$}]`).forEach(t => {
                t !== this.displayElement && this.valElements.add(t)
            }), document.querySelectorAll(`[${V}]`).forEach(t => {
                t !== this.displayElement && this.valPctElements.add(t)
            }), document.querySelectorAll(`[${W}]`).forEach(t => {
                t !== this.displayElement && this.dirElements.add(t)
            })
        }
        observeDOM() {
            this.observer = new MutationObserver(t => {
                let e = !1;
                for (let s of t) {
                    for (let i of s.addedNodes)
                        if (i.nodeType === Node.ELEMENT_NODE) {
                            let r = i;
                            this.hasTrackingAttr(r) && (e = !0), r.querySelector(`[${$}],[${V}],[${W}]`) && (e = !0)
                        }
                    for (let i of s.removedNodes)
                        if (i.nodeType === Node.ELEMENT_NODE) {
                            let r = i;
                            this.valElements.delete(r), this.valPctElements.delete(r), this.dirElements.delete(r)
                        }
                }
                e && this.scanElements()
            }), this.observer.observe(document.body, {
                childList: !0,
                subtree: !0
            })
        }
        hasTrackingAttr(t) {
            return t.hasAttribute($) || t.hasAttribute(V) || t.hasAttribute(W)
        }
        createDisplayElement() {
            if (this.displayElement) return;
            let t = document.createElement("div");
            Object.assign(t.style, {
                position: "fixed",
                bottom: "10px",
                left: "10px",
                backgroundColor: "#000",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "5px 8px",
                fontSize: "12px",
                fontFamily: "monospace",
                zIndex: "1000",
                pointerEvents: "none"
            }), t.setAttribute(W, "•"), t.setAttribute($, "0"), t.setAttribute(V, "0"), document.body.appendChild(t);
            let e = "string-position-tracker-style";
            if (!document.getElementById(e)) {
                let s = document.createElement("style");
                s.id = e, s.innerHTML = `
        [${W}][${$}][${V}]::before {
          content: attr(${W}) ' | ' attr(${$}) 'px (' attr(${V}) '%)';
        }
      `, document.head.appendChild(s)
            }
            this.displayElement = t
        }
    };

function At(t, e) {
    let s = null;
    return function(...i) {
        let r = this;
        s && clearTimeout(s), s = setTimeout(() => {
            t.apply(r, i), s = null
        }, e)
    }
}
var Lt = class {
        constructor() {
            this.fps = 0, this.isAnimationStarted = !1, this.fpsInterval = 0, this.then = 0, this.requestAnimationId = 0, this.onFrameCallback = t => {}, this.animate = () => {}, this.onVisibilityChangeBind = this.onVisibilityChange.bind(this)
        }
        onVisibilityChange() {
            document.hidden ? (this.stop(), this.isAnimationStarted = !1) : this.start(this.fps)
        }
        start(t) {
            this.fps = t, !this.isAnimationStarted && (this.fpsInterval = 1e3 / t, this.then = performance.now(), this.isAnimationStarted = !0, t === 0 ? this.animate = () => {
                let e = performance.now();
                this.requestAnimationId = requestAnimationFrame(() => this.animate()), this.onFrameCallback(e)
            } : this.animate = () => {
                let e = performance.now(),
                    s = e - this.then;
                s > this.fpsInterval && (this.then = e - s % this.fpsInterval, this.onFrameCallback(e)), this.requestAnimationId = requestAnimationFrame(() => this.animate())
            }, this.animate())
        }
        stop() {
            this.isAnimationStarted && (cancelAnimationFrame(this.requestAnimationId), this.requestAnimationId = 0, this.isAnimationStarted = !1)
        }
        setOnFrame(t) {
            this.onFrameCallback = t
        }
        destructor() {
            this.stop()
        }
    },
    ve = (t => (t.ACTIVE = "-active", t.ENTERING = "-entering", t.LEAVING = "-leaving", t.DISABLED = "-disabled", t))(ve || {}),
    Ot = {
        PROGRESS: "--sequence-progress",
        DIRECTION: "--sequence-direction"
    },
    we = class xe extends A {
        constructor(e) {
            super(e), this.activeStep = new Map, this.leavingStep = new Map, this.transitions = new Map, this.elementIndex = new Map, this.triggerElements = new Map, this.globalSettings = new Map, this.initialized = !1, this.onTriggerClick = s => {
                let i = this.triggerElements.get(s.currentTarget);
                if (!i) return;
                let r = this.activeStep.get(i.slider) ? ? 0,
                    n = this.getMaxStep(i.slider),
                    o, a;
                if (i.step === "next") {
                    if (o = r + 1, a = 1, !this.elementIndex.has(`${i.slider}[${o}]`))
                        if (i.loop && n >= 0) o = 0;
                        else return
                } else if (i.step === "prev") {
                    if (o = r - 1, a = -1, o < 0)
                        if (i.loop && n >= 0) o = n;
                        else return;
                    if (!this.elementIndex.has(`${i.slider}[${o}]`)) return
                } else {
                    if (o = i.step, r === o) return;
                    a = o > r ? 1 : -1
                }
                this.startTransition(i.slider, o, a)
            }, this.htmlKey = "sequence", this.defaultDuration = this.settings["sequence-duration"] ? ? 600, this.attributesToMap = [...this.attributesToMap, {
                key: "sequence",
                type: "string",
                fallback: ""
            }, {
                key: "sequence-trigger",
                type: "string",
                fallback: ""
            }, {
                key: "entering-easing",
                type: "string",
                fallback: ""
            }, {
                key: "leaving-easing",
                type: "string",
                fallback: ""
            }, {
                key: "entering-duration",
                type: "string",
                fallback: ""
            }, {
                key: "leaving-duration",
                type: "string",
                fallback: ""
            }, {
                key: "sequence-duration",
                type: "string",
                fallback: ""
            }, {
                key: "active-step",
                type: "string",
                fallback: ""
            }]
        }
        onInit() {
            super.onInit(), this.events.on("sequence", this.onSequenceEvent.bind(this)), this.scanStandaloneTriggers()
        }
        scanStandaloneTriggers() {
            let e = document.querySelectorAll("[string-sequence-trigger]:not([string-inited])");
            for (let s of e) {
                let i = s.getAttribute("string-sequence-trigger"),
                    r = i ? this.parseTriggerKey(i) : null;
                r && (this.triggerElements.set(s, r), s.addEventListener("click", this.onTriggerClick))
            }
        }
        parseGlobalSettingsFromObject(e) {
            let s = r => e.getProperty(r),
                i = s("sequence-duration");
            this.tryParseGlobalSetting(i, "enteringDuration"), this.tryParseGlobalSetting(i, "leavingDuration"), this.tryParseGlobalSetting(s("entering-duration"), "enteringDuration"), this.tryParseGlobalSetting(s("leaving-duration"), "leavingDuration"), this.tryParseGlobalSetting(s("entering-easing"), "enteringEasing"), this.tryParseGlobalSetting(s("leaving-easing"), "leavingEasing"), this.tryParseGlobalSetting(s("active-step"), "activeStep")
        }
        tryParseGlobalSetting(e, s) {
            if (!e) return;
            let i = e.match(/^(.+)\[(.+)\]$/);
            if (!i) return;
            let [, r, n] = i, o = this.globalSettings.get(r) ? ? {};
            this.globalSettings.set(r, o), o[s] = s === "enteringEasing" || s === "leavingEasing" ? n : parseFloat(n), this.applyGlobalSettingsToExistingObjects(r)
        }
        applyGlobalSettingsToExistingObjects(e) {
            var i;
            let s = this.globalSettings.get(e);
            if (s) {
                for (let [r, n] of this.elementIndex)
                    if (((i = this.parseSequenceKey(r)) == null ? void 0 : i.slider) === e) {
                        s.enteringDuration !== void 0 && (n.enteringDuration = s.enteringDuration), s.leavingDuration !== void 0 && (n.leavingDuration = s.leavingDuration);
                        for (let o of n.objects) this.resolveEasings(o, r)
                    }
            }
        }
        initializeSliders() {
            var s;
            let e = new Set;
            for (let i of this.elementIndex.keys()) {
                let r = this.parseSequenceKey(i);
                r && e.add(r.slider)
            }
            for (let i of e) {
                if (this.activeStep.has(i)) continue;
                let r = ((s = this.globalSettings.get(i)) == null ? void 0 : s.activeStep) ? ? 0;
                this.elementIndex.has(`${i}[${r}]`) || (r = 0), this.switchInstant(i, r, 1)
            }
        }
        tryApplyPendingActiveStep(e) {
            var i;
            if (this.activeStep.has(e)) return;
            let s = (i = this.globalSettings.get(e)) == null ? void 0 : i.activeStep;
            s !== void 0 && this.elementIndex.has(`${e}[${s}]`) && this.switchInstant(e, s, 1)
        }
        canConnect(e) {
            return e.keys.includes("sequence") || e.keys.includes("sequence-trigger")
        }
        onObjectConnected(e) {
            super.onObjectConnected(e), this.parseGlobalSettingsFromObject(e);
            let s = e.getProperty("sequence"),
                i = e.getProperty("sequence-trigger");
            if (!s && i) {
                let r = this.parseTriggerKey(i);
                r && typeof r.step == "number" && (s = `${r.slider}[${r.step}]`, e.setProperty("sequence", s))
            }
            if (s) {
                let r = this.parseSequenceKey(s);
                if (r) {
                    let n = this.elementIndex.get(s);
                    if (!n) {
                        let {
                            enteringDuration: a,
                            leavingDuration: l
                        } = this.resolveDurations(e, s);
                        n = {
                            objects: [],
                            enteringDuration: a,
                            leavingDuration: l
                        }, this.elementIndex.set(s, n)
                    }
                    n.objects.push(e), this.resolveEasings(e, s);
                    let o = this.activeStep.get(r.slider);
                    this.setState(e, o === r.step ? "-active" : "-disabled", o === r.step ? 1 : 0, 1), this.tryApplyPendingActiveStep(r.slider)
                }
            }
            if (i) {
                let r = this.parseTriggerKey(i);
                r && (this.triggerElements.set(e.htmlElement, r), e.htmlElement.addEventListener("click", this.onTriggerClick))
            }
        }
        parseTriggerKey(e) {
            let s = e.match(/^(.+)\[(next|prev|\d+)(\|loop)?\]$/);
            if (!s) return null;
            let i = s[2] === "next" || s[2] === "prev" ? s[2] : parseInt(s[2], 10);
            return {
                slider: s[1],
                step: i,
                loop: s[3] === "|loop"
            }
        }
        getMaxStep(e) {
            let s = -1;
            for (let i of this.elementIndex.keys()) {
                let r = this.parseSequenceKey(i);
                (r == null ? void 0 : r.slider) === e && r.step > s && (s = r.step)
            }
            return s
        }
        resolveDuration(e, s, i, r) {
            var l;
            let n = e.getProperty(r),
                o = e.getProperty("sequence-duration"),
                a = (l = this.globalSettings.get(s)) == null ? void 0 : l[i];
            if (n && !n.includes("[")) {
                let h = parseFloat(n);
                if (!isNaN(h)) return h
            }
            if (o && !o.includes("[")) {
                let h = parseFloat(o);
                if (!isNaN(h)) return h
            }
            return a ? ? this.defaultDuration
        }
        resolveDurations(e, s) {
            var r;
            let i = ((r = this.parseSequenceKey(s)) == null ? void 0 : r.slider) ? ? "";
            return {
                enteringDuration: this.resolveDuration(e, i, "enteringDuration", "entering-duration"),
                leavingDuration: this.resolveDuration(e, i, "leavingDuration", "leaving-duration")
            }
        }
        resolveEasing(e, s, i, r) {
            var o;
            let n = e.getProperty(r);
            (!n || typeof n == "string" && n.includes("[")) && (n = ((o = this.globalSettings.get(s)) == null ? void 0 : o[i]) ? ? this.settings.easing ? ? "ease-out"), typeof n == "string" && e.setProperty(r, this.tools.easingFunction.process({
                easing: n
            }))
        }
        resolveEasings(e, s) {
            var r;
            let i = (r = this.parseSequenceKey(s)) == null ? void 0 : r.slider;
            i && (this.resolveEasing(e, i, "enteringEasing", "entering-easing"), this.resolveEasing(e, i, "leavingEasing", "leaving-easing"))
        }
        onObjectDisconnected(e) {
            super.onObjectDisconnected(e);
            let s = e.getProperty("sequence");
            if (s) {
                let i = this.elementIndex.get(s);
                if (i) {
                    let r = i.objects.indexOf(e);
                    r !== -1 && i.objects.splice(r, 1), i.objects.length || this.elementIndex.delete(s)
                }
            }
            this.triggerElements.has(e.htmlElement) && (e.htmlElement.removeEventListener("click", this.onTriggerClick), this.triggerElements.delete(e.htmlElement))
        }
        parseSequenceKey(e) {
            let s = e.match(/^(.+)\[(\d+)\]$/);
            return s ? {
                slider: s[1],
                step: parseInt(s[2], 10)
            } : null
        }
        onSequenceEvent(e) {
            let {
                slider: s,
                step: i,
                transitionProgress: r,
                direction: n = 1,
                duration: o,
                instant: a
            } = e;
            this.activeStep.get(s) === i && r === void 0 || (r !== void 0 ? this.handleScrub(s, i, r, n) : a ? this.switchInstant(s, i, n) : this.startTransition(s, i, n, o))
        }
        startTransition(e, s, i, r) {
            let n = this.activeStep.get(e),
                o = this.leavingStep.get(e);
            o !== void 0 && o !== n && this.setStepState(e, o, "-disabled", 0, i);
            let a = this.elementIndex.get(`${e}[${s}]`),
                l = n !== void 0 ? this.elementIndex.get(`${e}[${n}]`) : null;
            n !== void 0 && this.leavingStep.set(e, n), this.activeStep.set(e, s), this.transitions.set(e, {
                fromStep: n ? ? s,
                toStep: s,
                direction: i,
                startTime: this.data.time.now,
                enteringDuration: r ? ? (a == null ? void 0 : a.enteringDuration) ? ? this.defaultDuration,
                leavingDuration: r ? ? (l == null ? void 0 : l.leavingDuration) ? ? this.defaultDuration
            })
        }
        handleScrub(e, s, i, r) {
            this.transitions.delete(e);
            let n = this.activeStep.get(e);
            if (n !== s) {
                let o = this.leavingStep.get(e);
                o !== void 0 && this.setStepState(e, o, "-disabled", 0, r), n !== void 0 && this.leavingStep.set(e, n), this.activeStep.set(e, s)
            }
            this.applyProgress(e, i, i, r)
        }
        switchInstant(e, s, i) {
            this.transitions.delete(e);
            let r = this.activeStep.get(e),
                n = this.leavingStep.get(e);
            n !== void 0 && this.setStepState(e, n, "-disabled", 0, i), r !== void 0 && r !== s && this.setStepState(e, r, "-disabled", 0, i), this.activeStep.set(e, s), this.leavingStep.delete(e), this.setStepState(e, s, "-active", 1, i)
        }
        applyProgress(e, s, i, r) {
            let n = this.activeStep.get(e),
                o = this.leavingStep.get(e);
            this.setStepState(e, n, s >= 1 ? "-active" : "-entering", s, r), o !== void 0 && o !== n && (i >= 1 ? (this.setStepState(e, o, "-disabled", 0, r), this.leavingStep.delete(e)) : this.setStepState(e, o, "-leaving", i, r))
        }
        setStepState(e, s, i, r, n) {
            let o = this.elementIndex.get(`${e}[${s}]`);
            if (o)
                for (let a of o.objects) this.setState(a, i, r, n)
        }
        setState(e, s, i, r) {
            let n = e.htmlElement,
                o = e.getProperty("_state"),
                a = e.getProperty("_direction"),
                l = e.getProperty(s === "-leaving" ? "leaving-easing" : "entering-easing");
            typeof l == "function" && l(i), o !== s && (n.classList.remove(...xe.ALL_STATES), n.classList.add(s), e.setProperty("_state", s)), a !== r && (e.setProperty("_direction", r), D.run(() => D.setVars(n, {
                [Ot.DIRECTION]: r.toString()
            })))
        }
        onFrame(e) {
            super.onFrame(e), this.initialized || (this.initialized = !0, this.initializeSliders());
            for (let [s, i] of this.transitions) {
                let r = e.time.now - i.startTime,
                    n = Math.min(1, r / i.enteringDuration),
                    o = Math.min(1, r / i.leavingDuration);
                this.applyProgress(s, n, o, i.direction), n >= 1 && o >= 1 && this.transitions.delete(s)
            }
        }
    };
we.ALL_STATES = Object.values(ve);
var Kt = we,
    Q = class Z extends A {
        constructor(e) {
            super(e), this.htmlKey = "form"
        }
        initializeObject(e, s, i, r) {
            super.initializeObject(e, s, i, r);
            let n = s.getProperty("form-events") ? ? [];
            n.forEach(c => {
                c.eventElement.removeEventListener(c.eventType, c.eventCallback)
            }), n.length = 0, s.setProperty("form-events", n), super.onObjectConnected(s);
            let o = s.htmlElement,
                a = [],
                l = {};
            this.getInteractiveFields(o).forEach((c, d) => this.registerField(c, o, a, l, n, d));
            let h = c => {
                c.preventDefault();
                let d = !0,
                    p = {},
                    y = new Set;
                for (let m of a) {
                    let u = m.field;
                    if (!u.isConnected || !this.shouldValidateField(u)) continue;
                    if (this.isRadioField(u)) {
                        if (y.has(m.key)) continue;
                        y.add(m.key)
                    }
                    let {
                        key: v,
                        rules: g,
                        needsContext: f
                    } = m, b = this.getFieldValue(u);
                    p[v] = b, l[v] = b;
                    let {
                        valid: w,
                        errors: x
                    } = this.tools.validation.process({
                        rules: g,
                        value: b,
                        context: this.buildContext(f, v, l)
                    });
                    this.applyValidationState(o, u, v, w, x, "submit"), w || (d = !1)
                }
                if (d) this.events.emit(`form:submit:${s.id}`, p);
                else {
                    let m = new Set,
                        u = a.find(v => {
                            let g = v.field;
                            if (!g.isConnected || !this.shouldValidateField(g)) return !1;
                            if (this.isRadioField(g)) {
                                if (m.has(v.key)) return !1;
                                m.add(v.key)
                            }
                            let {
                                key: f,
                                rules: b,
                                needsContext: w
                            } = v, x = this.getFieldValue(g);
                            l[f] = x;
                            let {
                                valid: M
                            } = this.tools.validation.process({
                                rules: b,
                                value: x,
                                context: this.buildContext(w, f, l)
                            });
                            return !M
                        });
                    u != null && u.field && typeof u.field.focus == "function" && u.field.focus(), this.events.emit(`form:invalid:${s.id}`)
                }
            };
            o.addEventListener("submit", h), n.push({
                eventElement: o,
                eventType: "submit",
                eventCallback: h
            }), s.setProperty("form-field-entries", a), s.setProperty("form-field-values", l)
        }
        onObjectConnected(e) {}
        onDOMMutate(e, s) {
            this.objects.length !== 0 && (e.length > 0 && this.handleMutationAdditions(e), s.length > 0 && this.handleMutationRemovals(s))
        }
        applyValidationState(e, s, i, r, n, o) {
            let a = e.querySelector(`[string-input="error[${i}]"]`),
                l = e.querySelector(`[string-input="group[${i}]"]`);
            a && (a.innerHTML = "", n.forEach(c => {
                let d = document.createElement("span");
                d.textContent = c, a.appendChild(d)
            })), o === "live" ? (s.classList.toggle("-invalid", !r), s.classList.remove("-error")) : (s.classList.remove("-invalid"), s.classList.toggle("-error", !r)), s.classList.toggle("-valid", r), l && (o === "live" ? (l.classList.toggle("-invalid", !r), l.classList.remove("-error")) : (l.classList.remove("-invalid"), l.classList.toggle("-error", !r)), l.classList.toggle("-valid", r));
            let h = r ? "valid" : o === "live" ? "invalid" : "error";
            this.events.emit(`form:field:${h}:${i}`, {
                key: i,
                field: s,
                errors: n,
                phase: o,
                valid: r
            })
        }
        getInteractiveFields(e) {
            return Array.from(e.querySelectorAll("[string-input]")).filter(s => !this.isServiceFieldAttribute(s.getAttribute("string-input") || "")).filter(s => this.isFormFieldElement(s)).map(s => s)
        }
        getFieldRules(e) {
            let s = this.tools.domAttribute.process({
                element: e,
                key: "input"
            }) ? ? "";
            return this.tools.ruleParser.process({
                value: s
            })
        }
        registerField(e, s, i, r, n, o) {
            if (!this.isFormFieldElement(e) || e.closest("form") !== s || i.some(u => u.field === e)) return;
            let a = this.registerFieldIndex(e, o ? ? i.length),
                l = this.getInputKey(e, a),
                h = this.getFieldRules(e),
                c = this.supportsBeforeInputValidation(h),
                d = this.requiresContext(h),
                p = this.getInputEventType(e),
                y = {
                    field: e,
                    key: l,
                    rules: h,
                    supportsRealtime: c,
                    needsContext: d,
                    inputEventType: p,
                    inputHandler: () => {}
                },
                m = u => {
                    let v = u.currentTarget || u.target;
                    if (!v || !v.isConnected || !this.shouldValidateField(v)) return;
                    let g = this.getFieldValue(v);
                    r[y.key] = g;
                    let f = this.buildContext(y.needsContext, y.key, r),
                        {
                            valid: b,
                            errors: w
                        } = this.tools.validation.process({
                            rules: y.rules,
                            value: g,
                            context: f
                        });
                    this.applyValidationState(s, v, y.key, b, w, "live")
                };
            if (y.inputHandler = m, e.addEventListener(p, m), n.push({
                    eventElement: e,
                    eventType: p,
                    eventCallback: m
                }), c && (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement)) {
                let u = v => {
                    var L;
                    let g = v;
                    if (g.isComposing || (L = g.inputType) != null && L.startsWith("insertComposition")) return;
                    let f = v.currentTarget || v.target;
                    if (!f || !(f instanceof HTMLInputElement || f instanceof HTMLTextAreaElement) || !f.isConnected) return;
                    let b = f.selectionStart ? ? 0,
                        w = f.selectionEnd ? ? 0,
                        x = f.value;
                    switch (g.inputType) {
                        case "deleteContentBackward":
                            x = b === w && b > 0 ? f.value.slice(0, b - 1) + f.value.slice(w) : f.value.slice(0, b) + f.value.slice(w);
                            break;
                        case "deleteContentForward":
                            x = b === w && b < f.value.length ? f.value.slice(0, b) + f.value.slice(b + 1) : f.value.slice(0, b) + f.value.slice(w);
                            break;
                        case "insertFromPaste":
                        case "insertFromDrop":
                        case "insertReplacementText":
                            x = f.value.slice(0, b) + (g.data || "") + f.value.slice(w);
                            break;
                        default:
                            typeof g.data == "string" && (x = f.value.slice(0, b) + g.data + f.value.slice(w))
                    }
                    let {
                        errors: M
                    } = this.tools.validation.process({
                        rules: y.rules,
                        value: x,
                        type: "beforeinput",
                        context: this.buildContext(y.needsContext, y.key, r, {
                            applied: !0,
                            value: x
                        })
                    });
                    M.length > 0 && v.cancelable && v.preventDefault()
                };
                y.beforeInputHandler = u, e.addEventListener("beforeinput", u), n.push({
                    eventElement: e,
                    eventType: "beforeinput",
                    eventCallback: u
                })
            }
            e.classList.add("-inited"), i.push(y), r[l] = this.getFieldValue(e)
        }
        unregisterField(e, s, i, r) {
            let n = s.findIndex(a => a.field === e);
            if (n === -1) return;
            let o = s[n];
            o.inputHandler && e.removeEventListener(o.inputEventType, o.inputHandler), o.beforeInputHandler && e.removeEventListener("beforeinput", o.beforeInputHandler), delete i[o.key], s.splice(n, 1);
            for (let a = r.length - 1; a >= 0; a--) {
                let l = r[a];
                l.eventElement === e && (l.eventCallback === o.inputHandler || o.beforeInputHandler && l.eventCallback === o.beforeInputHandler) && r.splice(a, 1)
            }
            e.classList.remove("-inited")
        }
        collectInteractiveFieldsFromNode(e) {
            let s = [];
            return e instanceof Element ? (e.hasAttribute("string-input") && s.push(e), s.push(...Array.from(e.querySelectorAll("[string-input]")))) : e instanceof DocumentFragment && s.push(...Array.from(e.querySelectorAll("[string-input]"))), s.filter(i => !this.isServiceFieldAttribute(i.getAttribute("string-input") || "")).filter(i => this.isFormFieldElement(i))
        }
        isRadioField(e) {
            return e instanceof HTMLInputElement && e.type === "radio"
        }
        handleMutationAdditions(e) {
            e.forEach(s => {
                this.collectInteractiveFieldsFromNode(s).forEach(i => {
                    let r = this.getFormStateByContainment(i);
                    r && this.registerField(i, r.form, r.entries, r.values, r.events)
                })
            })
        }
        handleMutationRemovals(e) {
            e.forEach(s => {
                this.collectInteractiveFieldsFromNode(s).forEach(i => {
                    let r = this.getFormStateByReference(i);
                    r && this.unregisterField(i, r.entries, r.values, r.events)
                })
            })
        }
        getFormStateByContainment(e) {
            let s = this.objects.find(i => i.htmlElement instanceof HTMLFormElement && i.htmlElement.contains(e));
            return s ? this.buildFormState(s) : null
        }
        getFormStateByReference(e) {
            for (let s of this.objects) {
                let i = s.getProperty("form-field-entries");
                if (i && i.some(r => r.field === e)) return this.buildFormState(s, i)
            }
            return null
        }
        buildFormState(e, s) {
            let i = e.htmlElement;
            if (!(i instanceof HTMLFormElement)) return null;
            let r = s ? ? e.getProperty("form-field-entries"),
                n = e.getProperty("form-field-values"),
                o = e.getProperty("form-events");
            return !r || !n || !o ? null : {
                object: e,
                form: i,
                entries: r,
                values: n,
                events: o
            }
        }
        registerFieldIndex(e, s) {
            let i = e.getAttribute("data-string-form-index");
            return i !== null ? Number(i) : (e.setAttribute("data-string-form-index", String(s)), s)
        }
        getFieldIndex(e, s) {
            let i = e.getAttribute("data-string-form-index");
            if (i !== null) {
                let r = Number(i);
                return Number.isNaN(r) ? s : r
            }
            return this.registerFieldIndex(e, s)
        }
        shouldValidateField(e) {
            return !(e.disabled || e instanceof HTMLInputElement && e.type === "hidden")
        }
        supportsBeforeInputValidation(e) {
            return e.some(s => Z.beforeInputRuleKeys.has(s.key))
        }
        requiresContext(e) {
            return e.some(s => Z.crossFieldRuleKeys.has(s.key))
        }
        buildContext(e, s, i, r) {
            if (!e) return {
                fieldKey: s
            };
            let n = !!(r != null && r.applied),
                o = n ? { ...i,
                    [s]: r.value
                } : i;
            return {
                fieldKey: s,
                values: o,
                getValue: a => n && a === s ? r.value : o[a]
            }
        }
        getInputKey(e, s) {
            return this.tools.domAttribute.process({
                element: e,
                key: "id"
            }) || e.getAttribute("name") || e.getAttribute("id") || `input-${s}`
        }
        getFieldValue(e) {
            var s;
            if (e instanceof HTMLInputElement) {
                if (e.type === "checkbox") {
                    if (e.name) {
                        let i = e.form || e.closest("form"),
                            r = i ? Array.from(i.querySelectorAll(`input[type="checkbox"][name="${e.name}"]:checked`)) : [e];
                        return r.length > 1 ? r.map(n => n.value) : r.length === 1 ? r[0].value : ""
                    }
                    return e.checked
                }
                if (e.type === "radio") {
                    if (e.name) {
                        let i = (s = e.form || e.closest("form")) == null ? void 0 : s.querySelector(`input[type="radio"][name="${e.name}"]:checked`);
                        return i ? i.value : ""
                    }
                    return e.checked ? e.value : ""
                }
                return e.type === "file" && e.files && e.files.length > 0 ? e.multiple ? Array.from(e.files) : e.files[0] : e.value
            }
            return e instanceof HTMLSelectElement ? e.multiple ? Array.from(e.selectedOptions).map(i => i.value) : e.value : e instanceof HTMLTextAreaElement ? e.value : ""
        }
        isServiceFieldAttribute(e) {
            return Z.serviceAttributePrefixes.some(s => e.startsWith(`${s}[`))
        }
        isFormFieldElement(e) {
            return e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement
        }
        getInputEventType(e) {
            return e instanceof HTMLSelectElement || e instanceof HTMLInputElement && (e.type === "checkbox" || e.type === "radio") ? "change" : "input"
        }
    };
Q.beforeInputRuleKeys = new Set(["number", "integer", "email", "phone", "letters", "lettersSpaces", "lettersNumbers", "alpha", "alpha_num", "alpha_dash", "digits", "url", "pattern"]), Q.crossFieldRuleKeys = new Set(["same", "different", "after", "before"]), Q.serviceAttributePrefixes = ["error", "group"];
var Yt = Q,
    Tt = class {
        constructor() {
            this.map = new WeakMap, this.all = new Set
        }
        attach(t) {
            if (this.map.has(t)) return;
            let e = t.htmlElement,
                s = {
                    cx: 0,
                    cy: 0,
                    valid: !1,
                    el: e
                };
            s.ro = new ResizeObserver(() => {
                s.valid = !1
            }), s.ro.observe(e), this.map.set(t, s), this.all.add(t)
        }
        detach(t) {
            var s;
            let e = this.map.get(t);
            e && ((s = e.ro) == null || s.disconnect(), this.map.delete(t), this.all.delete(t))
        }
        invalidate(t) {
            this.all.forEach(e => {
                if (e.id === t) {
                    let s = this.map.get(e);
                    s && (s.valid = !1)
                }
            })
        }
        invalidateAll() {
            this.all.forEach(t => {
                let e = this.map.get(t);
                e && (e.valid = !1)
            })
        }
        getCenter(t) {
            let e = this.map.get(t);
            if (!e || !e.el) return {
                cx: 0,
                cy: 0
            };
            if (!e.valid) {
                let s = e.el.getBoundingClientRect();
                e.cx = s.left + s.width / 2, e.cy = s.top + s.height / 2, e.valid = !0
            }
            return {
                cx: e.cx,
                cy: e.cy
            }
        }
    },
    Ft = class {
        constructor() {
            this.active = new Set, this.subs = new WeakMap
        }
        track(t) {
            if (this.subs.has(t)) return;
            let e = t.htmlElement,
                s = () => this.active.add(t),
                i = () => this.active.delete(t);
            e.addEventListener("pointerenter", s), e.addEventListener("pointerleave", i), this.subs.set(t, {
                enter: s,
                leave: i
            })
        }
        untrack(t) {
            let e = this.subs.get(t);
            if (!e) return;
            let s = t.htmlElement;
            e.enter && s.removeEventListener("pointerenter", e.enter), e.leave && s.removeEventListener("pointerleave", e.leave), this.active.delete(t), this.subs.delete(t)
        }
        isActive(t) {
            return this.active.has(t)
        }
        activeObjects() {
            return Array.from(this.active)
        }
    },
    Xt = class extends A {
        constructor(t) {
            super(t), this.htmlKey = "scroller"
        }
        onObjectConnected(t) {
            let e = t.getProperty("scroller-inited");
            if (e == null || e == "") {
                t.setProperty("scroller-inited", "inited");
                let s = i => {
                    this.events.emit("wheel", i)
                };
                t.setProperty("scroller-wheel-event", s), t.htmlElement.addEventListener("wheel", s)
            }
        }
        onObjectDisconnected(t) {
            t.setProperty("scroller-inited", ""), t.htmlElement.removeEventListener("wheel", t.getProperty("scroller-wheel-event"))
        }
    };

function Dt(t) {
    let e = t.match(/([^[]+)\[([\d.]+)-([\d.]+)\]/);
    return e ? {
        id: e[1],
        start: parseFloat(e[2]),
        end: parseFloat(e[3])
    } : null
}

function jt(t, e, s, i, r) {
    return i + (r - i) * (t - e) / (s - e)
}
var Gt = class extends A {
        constructor(t) {
            super(t), this.htmlKey = "progress-part", this.attributesToMap = [...this.attributesToMap, {
                key: "part-of",
                type: "string",
                fallback: ""
            }]
        }
        onObjectConnected(t) {
            let e = t.getProperty("part-of"),
                s = Dt(e);
            if (s) {
                t.setProperty("part-of-id", s.id), t.setProperty("start", s.start), t.setProperty("end", s.end);
                let i = r => {
                    if (s) {
                        let n = jt(r, s == null ? void 0 : s.start, s == null ? void 0 : s.end, 0, 1),
                            o = Math.max(0, Math.min(1, n));
                        t.htmlElement.style.setProperty("--progress-slice", o.toString()), this.events.emit(`object:progress-slice:${t.id}`, o)
                    }
                };
                t.setProperty("progress-event", i), this.events.on(`object:progress:${s.id}`, i)
            }
        }
        onObjectDisconnected(t) {
            let e = t.getProperty("part-of-id");
            e && this.events.off(`object:progress:${e}`, t.getProperty("progress-event"))
        }
    },
    Qt = class Y {
        constructor() {
            this.prevWidth = 0, this.prevHeight = 0, this.loop = new Lt, this.observerContainerResize = null, this.canRebuild = !0, this.debouncedResize = At(this.onResize, 30), this.root = document.body, this.window = window, this.tools = new it, this.data = new $e, this.eventManager = new fe, this.moduleManager = new Pe(this.data), this.objectManager = new ke(this.data, this.moduleManager, this.eventManager, this.tools), this.centers = new Tt, this.hoverManager = new Ft, this.context = {
                events: this.eventManager,
                data: this.data,
                tools: this.tools,
                settings: {},
                centers: this.centers,
                hover: this.hoverManager
            }, this.cursorController = new Me(1, this.context), this.scrollManager = new Te(this.context), this.setupSettings({
                "global-class": !1,
                "offset-top": "0%",
                "offset-bottom": "0%",
                key: "--progress",
                "inview-top": "0%",
                "inview-bottom": "0%",
                "enter-el": "top",
                "enter-vp": "bottom",
                "exit-el": "bottom",
                "exit-vp": "top",
                "parallax-bias": "0.0",
                parallax: "0.2",
                lerp: "0.2",
                "cursor-lerp": "0.75",
                radius: "150",
                strength: "0.3",
                glide: "1",
                anchor: "center center",
                timeout: 900,
                alignment: "center",
                "target-disable": "false",
                "target-style-disable": "false",
                "target-class": "",
                active: "false",
                fixed: "false",
                repeat: "false",
                "self-disable": "false",
                abs: "false",
                easing: "cubic-bezier(0.25, 0.25, 0.25, 0.25)",
                "glide-base-velocity": .00125,
                "glide-reduce-velocity": 625e-7,
                "glide-negative-velocity": -1e-4,
                "position-strength": 3,
                "position-tension": .05,
                "position-friction": .15,
                "position-max-velocity": 10,
                "position-update-threshold": .1,
                "rotation-strength": .75,
                "rotation-tension": .06,
                "rotation-friction": .18,
                "rotation-max-angular-velocity": 6,
                "rotation-max-angle": 18,
                "rotation-update-threshold": .15,
                "max-offset": 220,
                "sleep-epsilon": .01,
                "continuous-push": !0
            }), this.onContainerTransitionEndBind = this.onContainerTransitionEnd.bind(this), this.onResizeObserverBind = this.onResizeObserverEvent.bind(this), this.observerContainerResize = new ResizeObserver(this.onResizeObserverBind), this.observerContainerResize.observe(this.context.data.scroll.container), this.onWheelBind = this.onWheelEvent.bind(this), this.onScrollBind = this.onScrollEvent.bind(this), this.onResizeBind = this.onResize.bind(this), this.onMouseMoveBind = this.onMouseMoveEvent.bind(this), this.onScrollStartBind = this.onScrollStart.bind(this), this.onScrollStopBind = this.onScrollStop.bind(this), this.onDirectionChangeBind = this.onDirectionChange.bind(this), this.eventManager.on("wheel", this.onWheelBind), this.scrollManager.bindEvents({
                onScrollStart: this.onScrollStartBind,
                onScrollStop: this.onScrollStopBind,
                onDirectionChange: this.onDirectionChangeBind
            }), this.loop.setOnFrame(e => {
                this.data.time.delta = e - this.data.time.now, this.data.time.previous = this.data.time.now, this.data.time.now = e, this.data.time.elapsed += this.data.time.delta, this.onUpdateEvent()
            }), this.on("image:load:all", () => {
                this.onResize()
            }), this.scrollContainer = window
        }
        set scrollPosition(e) {
            this.data.scroll.current = e, this.data.scroll.target = e, this.data.scroll.transformedCurrent = this.data.scroll.current * this.data.viewport.transformScale, this.data.scroll.delta = 0, this.data.scroll.lerped = 0, this.scrollManager.updatePosition(), this.moduleManager.onScroll(), this.objectManager.checkInview()
        }
        set scrollContainer(e) {
            var s, i;
            (s = this.observerContainerResize) == null || s.unobserve(this.context.data.scroll.container), this.data.scroll.elementContainer.removeEventListener("transitionend", this.onContainerTransitionEndBind), e instanceof Window ? (this.data.scroll.container = document.body, this.data.scroll.elementContainer = document.documentElement, this.data.scroll.scrollContainer = e) : e instanceof HTMLElement ? (this.data.scroll.container = e, this.data.scroll.elementContainer = e, this.data.scroll.scrollContainer = e) : (this.data.scroll.container = document.body, this.data.scroll.elementContainer = document.documentElement, this.data.scroll.scrollContainer = e), this.data.scroll.elementContainer.addEventListener("transitionend", this.onContainerTransitionEndBind), (i = this.observerContainerResize) == null || i.observe(this.context.data.scroll.container), this.debouncedResize()
        }
        get scrollPosition() {
            return this.data.scroll.current
        }
        get scrollHeight() {
            return this.data.viewport.contentHeight
        }
        get containerHeight() {
            return this.data.viewport.windowHeight
        }
        set speed(e) {
            this.data.scroll.speed = e
        }
        set speedAccelerate(e) {
            this.data.scroll.speedAccelerate = .1 + (.5 - .1) * e
        }
        set scrollDesktopMode(e) {
            this.scrollManager.setDesktopMode(e)
        }
        set scrollMobileMode(e) {
            this.scrollManager.setMobileMode(e)
        }
        set FPSTrackerVisible(e) {
            this.data.system.fpsTracker = e, this.eventManager.emit("tracker:fps:visible", e)
        }
        set PositionTrackerVisible(e) {
            this.data.system.positionTracker = e, this.eventManager.emit("tracker:position:visible", e)
        }
        static getInstance() {
            return Y.i || (Y.i = new Y), Y.i
        }
        reuse(e) {
            return this.moduleManager.find(e)
        }
        use(e, s = null) {
            let i = { ...this.context.settings,
                    ...s
                },
                r = new e({
                    events: this.eventManager,
                    data: this.data,
                    tools: this.tools,
                    settings: i,
                    centers: this.centers,
                    hover: this.hoverManager
                });
            this.moduleManager.register(r)
        }
        on(e, s, i = "") {
            this.eventManager.on(e, s, i)
        }
        emit(e, s) {
            this.eventManager.emit(e, s)
        }
        off(e, s, i = "") {
            this.eventManager.off(e, s, i)
        }
        addScrollMark(e) {
            this.scrollManager.addScrollMark(e)
        }
        removeScrollMark(e) {
            this.scrollManager.removeScrollMark(e)
        }
        start(e) {
            var o, a;
            (o = this.data.scroll.scrollContainer) == null || o.addEventListener("scroll", this.onScrollBind), (a = this.data.scroll.container) == null || a.addEventListener("wheel", this.onWheelBind, {
                passive: !1
            }), window.addEventListener("resize", this.onResizeBind), this.root.addEventListener("mousemove", this.onMouseMoveBind);
            let s = new MutationObserver((l, h) => {
                    for (let c of l) c.type === "attributes" && (c.attributeName === "style" || c.attributeName === "class") && this.onResize()
                }),
                i = {
                    attributes: !0,
                    attributeFilter: ["style", "class"]
                };
            s.observe(this.context.data.scroll.container, i), this.use(pt);
            let r = window.getComputedStyle(document.documentElement).fontSize,
                n = parseFloat(r);
            this.context.data.viewport.baseRem = n, document.documentElement.classList.add("-string"), this.moduleManager.onInit(), this.onResize(), this.initObjects(), this.objectManager.observeDOM(), this.loop.start(e), this.eventManager.emit("start", null)
        }
        initObjects() {
            document.querySelectorAll("[string],[data-string]").forEach(e => {
                this.objectManager.add(e)
            }), document.querySelectorAll("[string-copy-from],[data-string-copy-from]").forEach(e => {
                let s = this.tools.domAttribute.process({
                    element: e,
                    key: "copy-from",
                    fallback: ""
                });
                s && s.length > 0 && this.objectManager.linkMirror(s, e)
            }), this.moduleManager.onResize(), this.moduleManager.onScroll(), this.moduleManager.onFrame()
        }
        setupSettings(e) {
            this.context.settings = { ...this.context.settings,
                ...e
            }, this.onSettingsChange({
                isDesktop: this.data.viewport.windowWidth > 1024,
                widthChanged: !0,
                heightChanged: !0,
                scrollHeightChanged: !0,
                isForceRebuild: !1
            })
        }
        onResizeObserverEvent() {
            this.debouncedResize()
        }
        onContainerTransitionEnd(e) {
            e.target === this.context.data.scroll.container && (this.onResize(), this.moduleManager.onResize(), this.moduleManager.onScroll(), this.moduleManager.onFrame())
        }
        onMouseMoveEvent(e) {
            this.cursorController.onMouseMove(e), this.moduleManager.onMouseMove(e), z.measure(() => {
                this.moduleManager.onMouseMoveMeasure()
            })
        }
        onWheelEvent(e) {
            e.target.closest("[string-isolation],[data-string-isolation]") == null && (this.scrollManager.get().onWheel(e), this.moduleManager.onWheel(e))
        }
        onScrollStart() {
            this.moduleManager.onScrollStart(), this.eventManager.emit("scroll:start", null)
        }
        onScrollStop() {
            this.moduleManager.onScrollStop(), this.eventManager.emit("scroll:stop", null)
        }
        onDirectionChange() {
            this.moduleManager.onDirectionChange()
        }
        onSettingsChange(e) {
            this.cursorController.onSettingsChange(e), this.objectManager.onSettingsChange(e), this.moduleManager.onSettingsChange(e)
        }
        onScrollEvent(e) {
            return e.preventDefault(), this.context.centers.invalidateAll(), this.scrollManager.get().onScroll(e), this.moduleManager.onScroll(), this.objectManager.checkInview(), this.eventManager.emit("lerp", this.data.scroll.lerped), this.eventManager.emit("scroll", this.data.scroll.current), z.measure(() => {
                this.moduleManager.onScrollMeasure()
            }), !1
        }
        onUpdateEvent() {
            this.cursorController.onFrame(), this.scrollManager.get().onFrame(), this.moduleManager.onFrame(), z.mutate(() => {
                D.begin(), this.moduleManager.onMutate(), D.commit()
            }), this.eventManager.emit("update", null)
        }
        onResize(e = !1) {
            if (this.canRebuild == !1) return;
            let s = this.data.scroll.container,
                i = this.context.data.scroll,
                r = 0,
                n = 0;
            var o, a = 0;
            let l = s.getBoundingClientRect();
            s.tagName == "BODY" ? (r = window.innerWidth, n = window.innerHeight) : (r = l.width, n = l.height), a = l.top, o = i.container.scrollHeight;
            let h = this.tools.transformScaleParser.process({
                value: window.getComputedStyle(s).transform
            });
            this.context.data.viewport.transformScale = window.getComputedStyle(s).scale == "none" ? h : Number(window.getComputedStyle(s).scale), this.context.data.scroll.transformedCurrent = this.context.data.scroll.current * this.context.data.viewport.transformScale;
            let c = r > 1024,
                d = this.prevWidth !== r,
                p = this.prevHeight !== n,
                y = this.context.data.viewport.contentHeight !== o,
                m = d || c && p || y;
            this.context.data.scroll.topPosition = Math.floor(a), this.context.data.viewport.contentWidth = r, this.context.data.viewport.contentHeight = o, this.prevWidth = r, this.prevHeight = n, this.context.data.viewport.windowWidth = r, this.context.data.viewport.windowHeight = n;
            let u = window.getComputedStyle(document.documentElement).fontSize,
                v = parseFloat(u);
            this.context.data.viewport.baseRem = v * h, i.bottomPosition = this.context.data.viewport.contentHeight - n, (d || typeof e == "boolean" && e) && this.moduleManager.onResizeWidth(), (m || typeof e == "boolean" && e) && (this.context.data.scroll.container.scrollTop > 0 && (this.context.data.scroll.current = this.context.data.scroll.container.scrollTop, this.context.data.scroll.target = this.context.data.scroll.container.scrollTop), this.scrollManager.updateResponsiveMode(), this.moduleManager.onResize(), this.onSettingsChange({
                isDesktop: c,
                widthChanged: d,
                heightChanged: p,
                scrollHeightChanged: y,
                isForceRebuild: e === !0
            }), this.moduleManager.onScroll(), this.moduleManager.onScrollMeasure(), this.moduleManager.onFrame())
        }
        scrollToElement(e, s = 0) {
            let i = document.querySelector(e);
            if (i) {
                let r = i.getBoundingClientRect().top + window.pageYOffset - this.data.scroll.container.clientTop - s;
                this.context.data.scroll.delta = r - this.data.scroll.current
            } else console.warn(`Element not found: ${e}`)
        }
        scrollTo(e) {
            this.scrollManager.get().scrollTo(e)
        }
        invalidateCenter(e) {
            this.centers.invalidate(e)
        }
        invalidateCenters() {
            this.centers.invalidateAll()
        }
        destroy() {
            var e, s;
            (e = this.data.scroll.scrollContainer) == null || e.removeEventListener("scroll", this.onScrollBind), (s = this.data.scroll.container) == null || s.removeEventListener("wheel", this.onWheelBind), this.data.scroll.elementContainer.removeEventListener("transitionend", this.onContainerTransitionEndBind), this.window.removeEventListener("resize", this.onResizeBind), this.root.removeEventListener("mousemove", this.onMouseMoveBind), this.loop.stop(), this.moduleManager.destroy(), this.eventManager.clearAll(), this.eventManager.off("wheel", this.onWheelBind)
        }
    };
export {
    Qt as $, Xt as E, It as J, Yt as M, Kt as S, Rt as Z, Ut as a, yt as b, Ht as c, A as d, _t as g, qt as h, $t as i, zt as l, Vt as n, Wt as o, Nt as t, Bt as u, Gt as x
};