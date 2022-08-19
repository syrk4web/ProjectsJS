(() => {
  var R = "transitionend",
    Tt = (e) =>
      e == null
        ? `${e}`
        : {}.toString
            .call(e)
            .match(/\s([a-z]+)/i)[1]
            .toLowerCase();
  var wt = (e) => {
    let t = e.getAttribute("data-bs-target");
    if (!t || t === "#") {
      let i = e.getAttribute("href");
      if (!i || (!i.includes("#") && !i.startsWith("."))) return null;
      i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`),
        (t = i && i !== "#" ? i.trim() : null);
    }
    return t;
  };
  var S = (e) => {
      let t = wt(e);
      return t ? document.querySelector(t) : null;
    },
    St = (e) => {
      if (!e) return 0;
      let { transitionDuration: t, transitionDelay: i } =
          window.getComputedStyle(e),
        n = Number.parseFloat(t),
        s = Number.parseFloat(i);
      return !n && !s
        ? 0
        : ((t = t.split(",")[0]),
          (i = i.split(",")[0]),
          (Number.parseFloat(t) + Number.parseFloat(i)) * 1e3);
    },
    Dt = (e) => {
      e.dispatchEvent(new Event(R));
    },
    v = (e) =>
      !e || typeof e != "object"
        ? !1
        : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"),
    T = (e) =>
      v(e)
        ? e.jquery
          ? e[0]
          : e
        : typeof e == "string" && e.length > 0
        ? document.querySelector(e)
        : null,
    A = (e, t, i) => {
      Object.keys(i).forEach((n) => {
        let s = i[n],
          o = t[n],
          r = o && v(o) ? "element" : Tt(o);
        if (!new RegExp(s).test(r))
          throw new TypeError(
            `${e.toUpperCase()}: Option "${n}" provided type "${r}" but expected type "${s}".`
          );
      });
    },
    D = (e) =>
      !v(e) || e.getClientRects().length === 0
        ? !1
        : getComputedStyle(e).getPropertyValue("visibility") === "visible",
    C = (e) =>
      !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled")
        ? !0
        : typeof e.disabled < "u"
        ? e.disabled
        : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false";
  var O = (e) => {
      e.offsetHeight;
    },
    $ = () => {
      let { jQuery: e } = window;
      return e && !document.body.hasAttribute("data-bs-no-jquery") ? e : null;
    },
    I = [],
    Ct = (e) => {
      document.readyState === "loading"
        ? (I.length ||
            document.addEventListener("DOMContentLoaded", () => {
              I.forEach((t) => t());
            }),
          I.push(e))
        : e();
    },
    w = () => document.documentElement.dir === "rtl",
    W = (e) => {
      Ct(() => {
        let t = $();
        if (t) {
          let i = e.NAME,
            n = t.fn[i];
          (t.fn[i] = e.jQueryInterface),
            (t.fn[i].Constructor = e),
            (t.fn[i].noConflict = () => ((t.fn[i] = n), e.jQueryInterface));
        }
      });
    },
    m = (e) => {
      typeof e == "function" && e();
    },
    k = (e, t, i = !0) => {
      if (!i) {
        m(e);
        return;
      }
      let n = 5,
        s = St(t) + n,
        o = !1,
        r = ({ target: l }) => {
          l === t && ((o = !0), t.removeEventListener(R, r), m(e));
        };
      t.addEventListener(R, r),
        setTimeout(() => {
          o || Dt(t);
        }, s);
    };
  var Ot = /[^.]*(?=\..*)\.|.*/,
    kt = /\..*/,
    Lt = /::\d+$/,
    x = {},
    Y = 1,
    Mt = { mouseenter: "mouseover", mouseleave: "mouseout" },
    It = /^(mouseenter|mouseleave)/i,
    F = new Set([
      "click",
      "dblclick",
      "mouseup",
      "mousedown",
      "contextmenu",
      "mousewheel",
      "DOMMouseScroll",
      "mouseover",
      "mouseout",
      "mousemove",
      "selectstart",
      "selectend",
      "keydown",
      "keypress",
      "keyup",
      "orientationchange",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointerleave",
      "pointercancel",
      "gesturestart",
      "gesturechange",
      "gestureend",
      "focus",
      "blur",
      "change",
      "reset",
      "select",
      "submit",
      "focusin",
      "focusout",
      "load",
      "unload",
      "beforeunload",
      "resize",
      "move",
      "DOMContentLoaded",
      "readystatechange",
      "error",
      "abort",
      "scroll",
    ]);
  function j(e, t) {
    return (t && `${t}::${Y++}`) || e.uidEvent || Y++;
  }
  function z(e) {
    let t = j(e);
    return (e.uidEvent = t), (x[t] = x[t] || {}), x[t];
  }
  function Rt(e, t) {
    return function i(n) {
      return (
        (n.delegateTarget = e), i.oneOff && B.off(e, n.type, t), t.apply(e, [n])
      );
    };
  }
  function $t(e, t, i) {
    return function n(s) {
      let o = e.querySelectorAll(t);
      for (let { target: r } = s; r && r !== this; r = r.parentNode)
        for (let l = o.length; l--; )
          if (o[l] === r)
            return (
              (s.delegateTarget = r),
              n.oneOff && B.off(e, s.type, t, i),
              i.apply(r, [s])
            );
      return null;
    };
  }
  function U(e, t, i = null) {
    let n = Object.keys(e);
    for (let s = 0, o = n.length; s < o; s++) {
      let r = e[n[s]];
      if (r.originalHandler === t && r.delegationSelector === i) return r;
    }
    return null;
  }
  function q(e, t, i) {
    let n = typeof t == "string",
      s = n ? i : t,
      o = Q(e);
    return F.has(o) || (o = e), [n, s, o];
  }
  function P(e, t, i, n, s) {
    if (typeof t != "string" || !e) return;
    if ((i || ((i = n), (n = null)), It.test(t))) {
      let N = (vt) =>
        function (b) {
          if (
            !b.relatedTarget ||
            (b.relatedTarget !== b.delegateTarget &&
              !b.delegateTarget.contains(b.relatedTarget))
          )
            return vt.call(this, b);
        };
      n ? (n = N(n)) : (i = N(i));
    }
    let [o, r, l] = q(t, i, n),
      u = z(e),
      g = u[l] || (u[l] = {}),
      h = U(g, r, o ? i : null);
    if (h) {
      h.oneOff = h.oneOff && s;
      return;
    }
    let c = j(r, t.replace(Ot, "")),
      f = o ? $t(e, i, n) : Rt(e, i);
    (f.delegationSelector = o ? i : null),
      (f.originalHandler = r),
      (f.oneOff = s),
      (f.uidEvent = c),
      (g[c] = f),
      e.addEventListener(l, f, o);
  }
  function V(e, t, i, n, s) {
    let o = U(t[i], n, s);
    !o || (e.removeEventListener(i, o, Boolean(s)), delete t[i][o.uidEvent]);
  }
  function xt(e, t, i, n) {
    let s = t[i] || {};
    Object.keys(s).forEach((o) => {
      if (o.includes(n)) {
        let r = s[o];
        V(e, t, i, r.originalHandler, r.delegationSelector);
      }
    });
  }
  function Q(e) {
    return (e = e.replace(kt, "")), Mt[e] || e;
  }
  var B = {
      on(e, t, i, n) {
        P(e, t, i, n, !1);
      },
      one(e, t, i, n) {
        P(e, t, i, n, !0);
      },
      off(e, t, i, n) {
        if (typeof t != "string" || !e) return;
        let [s, o, r] = q(t, i, n),
          l = r !== t,
          u = z(e),
          g = t.startsWith(".");
        if (typeof o < "u") {
          if (!u || !u[r]) return;
          V(e, u, r, o, s ? i : null);
          return;
        }
        g &&
          Object.keys(u).forEach((c) => {
            xt(e, u, c, t.slice(1));
          });
        let h = u[r] || {};
        Object.keys(h).forEach((c) => {
          let f = c.replace(Lt, "");
          if (!l || t.includes(f)) {
            let N = h[c];
            V(e, u, r, N.originalHandler, N.delegationSelector);
          }
        });
      },
      trigger(e, t, i) {
        if (typeof t != "string" || !e) return null;
        let n = $(),
          s = Q(t),
          o = t !== s,
          r = F.has(s),
          l,
          u = !0,
          g = !0,
          h = !1,
          c = null;
        return (
          o &&
            n &&
            ((l = n.Event(t, i)),
            n(e).trigger(l),
            (u = !l.isPropagationStopped()),
            (g = !l.isImmediatePropagationStopped()),
            (h = l.isDefaultPrevented())),
          r
            ? ((c = document.createEvent("HTMLEvents")), c.initEvent(s, u, !0))
            : (c = new CustomEvent(t, { bubbles: u, cancelable: !0 })),
          typeof i < "u" &&
            Object.keys(i).forEach((f) => {
              Object.defineProperty(c, f, {
                get() {
                  return i[f];
                },
              });
            }),
          h && c.preventDefault(),
          g && e.dispatchEvent(c),
          c.defaultPrevented && typeof l < "u" && l.preventDefault(),
          c
        );
      },
    },
    a = B;
  function X(e) {
    return e === "true"
      ? !0
      : e === "false"
      ? !1
      : e === Number(e).toString()
      ? Number(e)
      : e === "" || e === "null"
      ? null
      : e;
  }
  function H(e) {
    return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
  }
  var Vt = {
      setDataAttribute(e, t, i) {
        e.setAttribute(`data-bs-${H(t)}`, i);
      },
      removeDataAttribute(e, t) {
        e.removeAttribute(`data-bs-${H(t)}`);
      },
      getDataAttributes(e) {
        if (!e) return {};
        let t = {};
        return (
          Object.keys(e.dataset)
            .filter((i) => i.startsWith("bs"))
            .forEach((i) => {
              let n = i.replace(/^bs/, "");
              (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
                (t[n] = X(e.dataset[i]));
            }),
          t
        );
      },
      getDataAttribute(e, t) {
        return X(e.getAttribute(`data-bs-${H(t)}`));
      },
      offset(e) {
        let t = e.getBoundingClientRect();
        return {
          top: t.top + window.pageYOffset,
          left: t.left + window.pageXOffset,
        };
      },
      position(e) {
        return { top: e.offsetTop, left: e.offsetLeft };
      },
    },
    y = Vt;
  var Bt = 3,
    Ht = {
      find(e, t = document.documentElement) {
        return [].concat(...Element.prototype.querySelectorAll.call(t, e));
      },
      findOne(e, t = document.documentElement) {
        return Element.prototype.querySelector.call(t, e);
      },
      children(e, t) {
        return [].concat(...e.children).filter((i) => i.matches(t));
      },
      parents(e, t) {
        let i = [],
          n = e.parentNode;
        for (; n && n.nodeType === Node.ELEMENT_NODE && n.nodeType !== Bt; )
          n.matches(t) && i.push(n), (n = n.parentNode);
        return i;
      },
      prev(e, t) {
        let i = e.previousElementSibling;
        for (; i; ) {
          if (i.matches(t)) return [i];
          i = i.previousElementSibling;
        }
        return [];
      },
      next(e, t) {
        let i = e.nextElementSibling;
        for (; i; ) {
          if (i.matches(t)) return [i];
          i = i.nextElementSibling;
        }
        return [];
      },
      focusableChildren(e) {
        let t = [
          "a",
          "button",
          "input",
          "textarea",
          "select",
          "details",
          "[tabindex]",
          '[contenteditable="true"]',
        ]
          .map((i) => `${i}:not([tabindex^="-"])`)
          .join(", ");
        return this.find(t, e).filter((i) => !C(i) && D(i));
      },
    },
    _ = Ht;
  var J = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    G = ".sticky-top",
    Z = class {
      constructor() {
        this._element = document.body;
      }
      getWidth() {
        let t = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - t);
      }
      hide() {
        let t = this.getWidth();
        this._disableOverFlow(),
          this._setElementAttributes(
            this._element,
            "paddingRight",
            (i) => i + t
          ),
          this._setElementAttributes(J, "paddingRight", (i) => i + t),
          this._setElementAttributes(G, "marginRight", (i) => i - t);
      }
      _disableOverFlow() {
        this._saveInitialAttribute(this._element, "overflow"),
          (this._element.style.overflow = "hidden");
      }
      _setElementAttributes(t, i, n) {
        let s = this.getWidth(),
          o = (r) => {
            if (r !== this._element && window.innerWidth > r.clientWidth + s)
              return;
            this._saveInitialAttribute(r, i);
            let l = window.getComputedStyle(r)[i];
            r.style[i] = `${n(Number.parseFloat(l))}px`;
          };
        this._applyManipulationCallback(t, o);
      }
      reset() {
        this._resetElementAttributes(this._element, "overflow"),
          this._resetElementAttributes(this._element, "paddingRight"),
          this._resetElementAttributes(J, "paddingRight"),
          this._resetElementAttributes(G, "marginRight");
      }
      _saveInitialAttribute(t, i) {
        let n = t.style[i];
        n && y.setDataAttribute(t, i, n);
      }
      _resetElementAttributes(t, i) {
        let n = (s) => {
          let o = y.getDataAttribute(s, i);
          typeof o > "u"
            ? s.style.removeProperty(i)
            : (y.removeDataAttribute(s, i), (s.style[i] = o));
        };
        this._applyManipulationCallback(t, n);
      }
      _applyManipulationCallback(t, i) {
        v(t) ? i(t) : _.find(t, this._element).forEach(i);
      }
      isOverflowing() {
        return this.getWidth() > 0;
      }
    },
    tt = Z;
  var p = new Map(),
    L = {
      set(e, t, i) {
        p.has(e) || p.set(e, new Map());
        let n = p.get(e);
        if (!n.has(t) && n.size !== 0) {
          console.error(
            `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
              Array.from(n.keys())[0]
            }.`
          );
          return;
        }
        n.set(t, i);
      },
      get(e, t) {
        return (p.has(e) && p.get(e).get(t)) || null;
      },
      remove(e, t) {
        if (!p.has(e)) return;
        let i = p.get(e);
        i.delete(t), i.size === 0 && p.delete(e);
      },
    };
  var Kt = "5.1.3",
    et = class {
      constructor(t) {
        (t = T(t)),
          !!t &&
            ((this._element = t),
            L.set(this._element, this.constructor.DATA_KEY, this));
      }
      dispose() {
        L.remove(this._element, this.constructor.DATA_KEY),
          a.off(this._element, this.constructor.EVENT_KEY),
          Object.getOwnPropertyNames(this).forEach((t) => {
            this[t] = null;
          });
      }
      _queueCallback(t, i, n = !0) {
        k(t, i, n);
      }
      static getInstance(t) {
        return L.get(T(t), this.DATA_KEY);
      }
      static getOrCreateInstance(t, i = {}) {
        return (
          this.getInstance(t) || new this(t, typeof i == "object" ? i : null)
        );
      }
      static get VERSION() {
        return Kt;
      }
      static get NAME() {
        throw new Error(
          'You have to implement the static method "NAME", for each component!'
        );
      }
      static get DATA_KEY() {
        return `bs.${this.NAME}`;
      }
      static get EVENT_KEY() {
        return `.${this.DATA_KEY}`;
      }
    },
    it = et;
  var Wt = {
      className: "modal-backdrop",
      isVisible: !0,
      isAnimated: !1,
      rootElement: "body",
      clickCallback: null,
    },
    Yt = {
      className: "string",
      isVisible: "boolean",
      isAnimated: "boolean",
      rootElement: "(element|string)",
      clickCallback: "(function|null)",
    },
    ot = "backdrop",
    Pt = "fade",
    nt = "show",
    st = `mousedown.bs.${ot}`,
    rt = class {
      constructor(t) {
        (this._config = this._getConfig(t)),
          (this._isAppended = !1),
          (this._element = null);
      }
      show(t) {
        if (!this._config.isVisible) {
          m(t);
          return;
        }
        this._append(),
          this._config.isAnimated && O(this._getElement()),
          this._getElement().classList.add(nt),
          this._emulateAnimation(() => {
            m(t);
          });
      }
      hide(t) {
        if (!this._config.isVisible) {
          m(t);
          return;
        }
        this._getElement().classList.remove(nt),
          this._emulateAnimation(() => {
            this.dispose(), m(t);
          });
      }
      _getElement() {
        if (!this._element) {
          let t = document.createElement("div");
          (t.className = this._config.className),
            this._config.isAnimated && t.classList.add(Pt),
            (this._element = t);
        }
        return this._element;
      }
      _getConfig(t) {
        return (
          (t = { ...Wt, ...(typeof t == "object" ? t : {}) }),
          (t.rootElement = T(t.rootElement)),
          A(ot, t, Yt),
          t
        );
      }
      _append() {
        this._isAppended ||
          (this._config.rootElement.append(this._getElement()),
          a.on(this._getElement(), st, () => {
            m(this._config.clickCallback);
          }),
          (this._isAppended = !0));
      }
      dispose() {
        !this._isAppended ||
          (a.off(this._element, st),
          this._element.remove(),
          (this._isAppended = !1));
      }
      _emulateAnimation(t) {
        k(t, this._getElement(), this._config.isAnimated);
      }
    },
    at = rt;
  var Ft = { trapElement: null, autofocus: !0 },
    jt = { trapElement: "element", autofocus: "boolean" },
    zt = "focustrap",
    Ut = "bs.focustrap",
    M = `.${Ut}`,
    qt = `focusin${M}`,
    Qt = `keydown.tab${M}`,
    Xt = "Tab",
    Jt = "forward",
    lt = "backward",
    ct = class {
      constructor(t) {
        (this._config = this._getConfig(t)),
          (this._isActive = !1),
          (this._lastTabNavDirection = null);
      }
      activate() {
        let { trapElement: t, autofocus: i } = this._config;
        this._isActive ||
          (i && t.focus(),
          a.off(document, M),
          a.on(document, qt, (n) => this._handleFocusin(n)),
          a.on(document, Qt, (n) => this._handleKeydown(n)),
          (this._isActive = !0));
      }
      deactivate() {
        !this._isActive || ((this._isActive = !1), a.off(document, M));
      }
      _handleFocusin(t) {
        let { target: i } = t,
          { trapElement: n } = this._config;
        if (i === document || i === n || n.contains(i)) return;
        let s = _.focusableChildren(n);
        s.length === 0
          ? n.focus()
          : this._lastTabNavDirection === lt
          ? s[s.length - 1].focus()
          : s[0].focus();
      }
      _handleKeydown(t) {
        t.key === Xt && (this._lastTabNavDirection = t.shiftKey ? lt : Jt);
      }
      _getConfig(t) {
        return (
          (t = { ...Ft, ...(typeof t == "object" ? t : {}) }), A(zt, t, jt), t
        );
      }
    },
    ut = ct;
  var dt = (e, t = "hide") => {
    let i = `click.dismiss${e.EVENT_KEY}`,
      n = e.NAME;
    a.on(document, i, `[data-bs-dismiss="${n}"]`, function (s) {
      if ((["A", "AREA"].includes(this.tagName) && s.preventDefault(), C(this)))
        return;
      let o = S(this) || this.closest(`.${n}`);
      e.getOrCreateInstance(o)[t]();
    });
  };
  var ft = "modal",
    Gt = "bs.modal",
    d = `.${Gt}`,
    Zt = ".data-api",
    ht = "Escape",
    mt = { backdrop: !0, keyboard: !0, focus: !0 },
    te = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
    },
    ee = `hide${d}`,
    ie = `hidePrevented${d}`,
    yt = `hidden${d}`,
    Nt = `show${d}`,
    ne = `shown${d}`,
    _t = `resize${d}`,
    pt = `click.dismiss${d}`,
    Et = `keydown.dismiss${d}`,
    se = `mouseup.dismiss${d}`,
    gt = `mousedown.dismiss${d}`,
    oe = `click${d}${Zt}`,
    bt = "modal-open",
    re = "fade",
    At = "show",
    K = "modal-static",
    ae = ".modal.show",
    le = ".modal-dialog",
    ce = ".modal-body",
    ue = '[data-bs-toggle="modal"]',
    E = class extends it {
      constructor(t, i) {
        super(t);
        (this._config = this._getConfig(i)),
          (this._dialog = _.findOne(le, this._element)),
          (this._backdrop = this._initializeBackDrop()),
          (this._focustrap = this._initializeFocusTrap()),
          (this._isShown = !1),
          (this._ignoreBackdropClick = !1),
          (this._isTransitioning = !1),
          (this._scrollBar = new tt());
      }
      static get Default() {
        return mt;
      }
      static get NAME() {
        return ft;
      }
      toggle(t) {
        return this._isShown ? this.hide() : this.show(t);
      }
      show(t) {
        this._isShown ||
          this._isTransitioning ||
          a.trigger(this._element, Nt, { relatedTarget: t }).defaultPrevented ||
          ((this._isShown = !0),
          this._isAnimated() && (this._isTransitioning = !0),
          this._scrollBar.hide(),
          document.body.classList.add(bt),
          this._adjustDialog(),
          this._setEscapeEvent(),
          this._setResizeEvent(),
          a.on(this._dialog, gt, () => {
            a.one(this._element, se, (n) => {
              n.target === this._element && (this._ignoreBackdropClick = !0);
            });
          }),
          this._showBackdrop(() => this._showElement(t)));
      }
      hide() {
        if (
          !this._isShown ||
          this._isTransitioning ||
          a.trigger(this._element, ee).defaultPrevented
        )
          return;
        this._isShown = !1;
        let i = this._isAnimated();
        i && (this._isTransitioning = !0),
          this._setEscapeEvent(),
          this._setResizeEvent(),
          this._focustrap.deactivate(),
          this._element.classList.remove(At),
          a.off(this._element, pt),
          a.off(this._dialog, gt),
          this._queueCallback(() => this._hideModal(), this._element, i);
      }
      dispose() {
        [window, this._dialog].forEach((t) => a.off(t, d)),
          this._backdrop.dispose(),
          this._focustrap.deactivate(),
          super.dispose();
      }
      handleUpdate() {
        this._adjustDialog();
      }
      _initializeBackDrop() {
        return new at({
          isVisible: Boolean(this._config.backdrop),
          isAnimated: this._isAnimated(),
        });
      }
      _initializeFocusTrap() {
        return new ut({ trapElement: this._element });
      }
      _getConfig(t) {
        return (
          (t = {
            ...mt,
            ...y.getDataAttributes(this._element),
            ...(typeof t == "object" ? t : {}),
          }),
          A(ft, t, te),
          t
        );
      }
      _showElement(t) {
        let i = this._isAnimated(),
          n = _.findOne(ce, this._dialog);
        (!this._element.parentNode ||
          this._element.parentNode.nodeType !== Node.ELEMENT_NODE) &&
          document.body.append(this._element),
          (this._element.style.display = "block"),
          this._element.removeAttribute("aria-hidden"),
          this._element.setAttribute("aria-modal", !0),
          this._element.setAttribute("role", "dialog"),
          (this._element.scrollTop = 0),
          n && (n.scrollTop = 0),
          i && O(this._element),
          this._element.classList.add(At);
        let s = () => {
          this._config.focus && this._focustrap.activate(),
            (this._isTransitioning = !1),
            a.trigger(this._element, ne, { relatedTarget: t });
        };
        this._queueCallback(s, this._dialog, i);
      }
      _setEscapeEvent() {
        this._isShown
          ? a.on(this._element, Et, (t) => {
              this._config.keyboard && t.key === ht
                ? (t.preventDefault(), this.hide())
                : !this._config.keyboard &&
                  t.key === ht &&
                  this._triggerBackdropTransition();
            })
          : a.off(this._element, Et);
      }
      _setResizeEvent() {
        this._isShown
          ? a.on(window, _t, () => this._adjustDialog())
          : a.off(window, _t);
      }
      _hideModal() {
        (this._element.style.display = "none"),
          this._element.setAttribute("aria-hidden", !0),
          this._element.removeAttribute("aria-modal"),
          this._element.removeAttribute("role"),
          (this._isTransitioning = !1),
          this._backdrop.hide(() => {
            document.body.classList.remove(bt),
              this._resetAdjustments(),
              this._scrollBar.reset(),
              a.trigger(this._element, yt);
          });
      }
      _showBackdrop(t) {
        a.on(this._element, pt, (i) => {
          if (this._ignoreBackdropClick) {
            this._ignoreBackdropClick = !1;
            return;
          }
          i.target === i.currentTarget &&
            (this._config.backdrop === !0
              ? this.hide()
              : this._config.backdrop === "static" &&
                this._triggerBackdropTransition());
        }),
          this._backdrop.show(t);
      }
      _isAnimated() {
        return this._element.classList.contains(re);
      }
      _triggerBackdropTransition() {
        if (a.trigger(this._element, ie).defaultPrevented) return;
        let { classList: i, scrollHeight: n, style: s } = this._element,
          o = n > document.documentElement.clientHeight;
        (!o && s.overflowY === "hidden") ||
          i.contains(K) ||
          (o || (s.overflowY = "hidden"),
          i.add(K),
          this._queueCallback(() => {
            i.remove(K),
              o ||
                this._queueCallback(() => {
                  s.overflowY = "";
                }, this._dialog);
          }, this._dialog),
          this._element.focus());
      }
      _adjustDialog() {
        let t =
            this._element.scrollHeight > document.documentElement.clientHeight,
          i = this._scrollBar.getWidth(),
          n = i > 0;
        ((!n && t && !w()) || (n && !t && w())) &&
          (this._element.style.paddingLeft = `${i}px`),
          ((n && !t && !w()) || (!n && t && w())) &&
            (this._element.style.paddingRight = `${i}px`);
      }
      _resetAdjustments() {
        (this._element.style.paddingLeft = ""),
          (this._element.style.paddingRight = "");
      }
      static jQueryInterface(t, i) {
        return this.each(function () {
          let n = E.getOrCreateInstance(this, t);
          if (typeof t == "string") {
            if (typeof n[t] > "u")
              throw new TypeError(`No method named "${t}"`);
            n[t](i);
          }
        });
      }
    };
  a.on(document, oe, ue, function (e) {
    let t = S(this);
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
      a.one(t, Nt, (s) => {
        s.defaultPrevented ||
          a.one(t, yt, () => {
            D(this) && this.focus();
          });
      });
    let i = _.findOne(ae);
    i && E.getInstance(i).hide(), E.getOrCreateInstance(t).toggle(this);
  });
  dt(E);
  W(E);
  var je = E;
})();
