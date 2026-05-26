import { Hook as ft, getId as mt, debounce as ut, addClass as xt, walkTree as M, noop as L } from "markmap-common";
import { loadCSS as me, loadJS as ue } from "markmap-common";
import { scaleOrdinal as U, schemeCategory10 as yt, linkHorizontal as kt, zoomTransform as X, select as vt, zoom as bt, max as O, min as F, zoomIdentity as St, minIndex as zt } from "d3";
const D = typeof navigator < "u" && navigator.userAgent.includes("Macintosh"), Et = U(yt), tt = (i = 1, t = 3, r = 2) => (s) => i + t / r ** s.state.depth, et = {
  autoFit: !1,
  bidirectional: !1,
  duration: 500,
  embedGlobalCSS: !0,
  fitRatio: 0.95,
  maxInitialScale: 2,
  scrollForPan: D,
  initialExpandLevel: -1,
  zoom: !0,
  pan: !0,
  toggleRecursively: !1,
  color: (i) => {
    var t;
    return Et(`${((t = i.state) == null ? void 0 : t.path) || ""}`);
  },
  lineWidth: tt(),
  maxWidth: 0,
  nodeMinHeight: 16,
  paddingX: 8,
  spacingHorizontal: 80,
  spacingVertical: 5
};
function de(i) {
  const t = {}, r = { ...i }, { color: s, colorFreezeLevel: n, lineWidth: a } = r;
  if ((s == null ? void 0 : s.length) === 1) {
    const c = s[0];
    t.color = () => c;
  } else if (s != null && s.length) {
    const c = U(s);
    t.color = (g) => c(`${g.state.path}`);
  }
  if (n) {
    const c = t.color || et.color;
    t.color = (g) => (g = {
      ...g,
      state: {
        ...g.state,
        path: g.state.path.split(".").slice(0, n).join(".")
      }
    }, c(g));
  }
  if (a) {
    const c = Array.isArray(a) ? a : [a, 0, 1];
    t.lineWidth = tt(
      ...c
    );
  }
  return [
    "duration",
    "fitRatio",
    "initialExpandLevel",
    "maxInitialScale",
    "maxWidth",
    "nodeMinHeight",
    "paddingX",
    "spacingHorizontal",
    "spacingVertical"
  ].forEach((c) => {
    const g = r[c];
    typeof g == "number" && (t[c] = g);
  }), ["zoom", "pan"].forEach((c) => {
    const g = r[c];
    g != null && (t[c] = !!g);
  }), t;
}
function wt(i) {
  let t = 0;
  for (let r = 0; r < i.length; r++)
    t = (t << 5) - t + i.charCodeAt(r) | 0;
  return (t >>> 0).toString(36);
}
function R(i) {
  if (typeof i == "string") {
    const r = i;
    i = (s) => s.matches(r);
  }
  const t = i;
  return function() {
    let s = Array.from(this.childNodes);
    return t && (s = s.filter((n) => t(n))), s;
  };
}
function Ct(i) {
  var t = 0, r = i.children, s = r && r.length;
  if (!s) t = 1;
  else for (; --s >= 0; ) t += r[s].value;
  i.value = t;
}
function Rt() {
  return this.eachAfter(Ct);
}
function _t(i) {
  var t = this, r, s = [t], n, a, l;
  do
    for (r = s.reverse(), s = []; t = r.pop(); )
      if (i(t), n = t.children, n) for (a = 0, l = n.length; a < l; ++a)
        s.push(n[a]);
  while (s.length);
  return this;
}
function Mt(i) {
  for (var t = this, r = [t], s, n; t = r.pop(); )
    if (i(t), s = t.children, s) for (n = s.length - 1; n >= 0; --n)
      r.push(s[n]);
  return this;
}
function Xt(i) {
  for (var t = this, r = [t], s = [], n, a, l; t = r.pop(); )
    if (s.push(t), n = t.children, n) for (a = 0, l = n.length; a < l; ++a)
      r.push(n[a]);
  for (; t = s.pop(); )
    i(t);
  return this;
}
function Lt(i) {
  return this.eachAfter(function(t) {
    for (var r = +i(t.data) || 0, s = t.children, n = s && s.length; --n >= 0; ) r += s[n].value;
    t.value = r;
  });
}
function Ot(i) {
  return this.eachBefore(function(t) {
    t.children && t.children.sort(i);
  });
}
function Ft(i) {
  for (var t = this, r = At(t, i), s = [t]; t !== r; )
    t = t.parent, s.push(t);
  for (var n = s.length; i !== r; )
    s.splice(n, 0, i), i = i.parent;
  return s;
}
function At(i, t) {
  if (i === t) return i;
  var r = i.ancestors(), s = t.ancestors(), n = null;
  for (i = r.pop(), t = s.pop(); i === t; )
    n = i, i = r.pop(), t = s.pop();
  return n;
}
function Tt() {
  for (var i = this, t = [i]; i = i.parent; )
    t.push(i);
  return t;
}
function Ht() {
  var i = [];
  return this.each(function(t) {
    i.push(t);
  }), i;
}
function $t() {
  var i = [];
  return this.eachBefore(function(t) {
    t.children || i.push(t);
  }), i;
}
function jt() {
  var i = this, t = [];
  return i.each(function(r) {
    r !== i && t.push({ source: r.parent, target: r });
  }), t;
}
function W(i, t) {
  var r = new A(i), s = +i.value && (r.value = i.value), n, a = [r], l, o, c, g;
  for (t == null && (t = Bt); n = a.pop(); )
    if (s && (n.value = +n.data.value), (o = t(n.data)) && (g = o.length))
      for (n.children = new Array(g), c = g - 1; c >= 0; --c)
        a.push(l = n.children[c] = new A(o[c])), l.parent = n, l.depth = n.depth + 1;
  return r.eachBefore(Wt);
}
function Nt() {
  return W(this).eachBefore(Dt);
}
function Bt(i) {
  return i.children;
}
function Dt(i) {
  i.data = i.data.data;
}
function Wt(i) {
  var t = 0;
  do
    i.height = t;
  while ((i = i.parent) && i.height < ++t);
}
function A(i) {
  this.data = i, this.depth = this.height = 0, this.parent = null;
}
A.prototype = W.prototype = {
  constructor: A,
  count: Rt,
  each: _t,
  eachAfter: Xt,
  eachBefore: Mt,
  sum: Lt,
  sort: Ot,
  path: Ft,
  ancestors: Tt,
  descendants: Ht,
  leaves: $t,
  links: jt,
  copy: Nt
};
const Kt = "2.1.2", Pt = {
  version: Kt
}, { version: It } = Pt, Gt = Object.freeze({
  children: (i) => i.children,
  nodeSize: (i) => i.data.size,
  spacing: 0
});
function st(i) {
  const t = Object.assign({}, Gt, i);
  function r(o) {
    const c = t[o];
    return typeof c == "function" ? c : () => c;
  }
  function s(o) {
    const c = l(a(), o, (g) => g.children);
    return c.update(), c.data;
  }
  function n() {
    const o = r("nodeSize"), c = r("spacing");
    return class it extends W.prototype.constructor {
      constructor(h) {
        super(h);
      }
      copy() {
        const h = l(this.constructor, this, (p) => p.children);
        return h.each((p) => p.data = p.data.data), h;
      }
      get size() {
        return o(this);
      }
      spacing(h) {
        return c(this, h);
      }
      get nodes() {
        return this.descendants();
      }
      get xSize() {
        return this.size[0];
      }
      get ySize() {
        return this.size[1];
      }
      get top() {
        return this.y;
      }
      get bottom() {
        return this.y + this.ySize;
      }
      get left() {
        return this.x - this.xSize / 2;
      }
      get right() {
        return this.x + this.xSize / 2;
      }
      get root() {
        const h = this.ancestors();
        return h[h.length - 1];
      }
      get numChildren() {
        return this.hasChildren ? this.children.length : 0;
      }
      get hasChildren() {
        return !this.noChildren;
      }
      get noChildren() {
        return this.children === null;
      }
      get firstChild() {
        return this.hasChildren ? this.children[0] : null;
      }
      get lastChild() {
        return this.hasChildren ? this.children[this.numChildren - 1] : null;
      }
      get extents() {
        return (this.children || []).reduce(
          (h, p) => it.maxExtents(h, p.extents),
          this.nodeExtents
        );
      }
      get nodeExtents() {
        return {
          top: this.top,
          bottom: this.bottom,
          left: this.left,
          right: this.right
        };
      }
      static maxExtents(h, p) {
        return {
          top: Math.min(h.top, p.top),
          bottom: Math.max(h.bottom, p.bottom),
          left: Math.min(h.left, p.left),
          right: Math.max(h.right, p.right)
        };
      }
    };
  }
  function a() {
    const o = n(), c = r("nodeSize"), g = r("spacing");
    return class extends o {
      constructor(h) {
        super(h), Object.assign(this, {
          x: 0,
          y: 0,
          relX: 0,
          prelim: 0,
          shift: 0,
          change: 0,
          lExt: this,
          lExtRelX: 0,
          lThr: null,
          rExt: this,
          rExtRelX: 0,
          rThr: null
        });
      }
      get size() {
        return c(this.data);
      }
      spacing(h) {
        return g(this.data, h.data);
      }
      get x() {
        return this.data.x;
      }
      set x(h) {
        this.data.x = h;
      }
      get y() {
        return this.data.y;
      }
      set y(h) {
        this.data.y = h;
      }
      update() {
        return rt(this), nt(this), this;
      }
    };
  }
  function l(o, c, g) {
    const h = (p, m) => {
      const x = new o(p);
      Object.assign(x, {
        parent: m,
        depth: m === null ? 0 : m.depth + 1,
        height: 0,
        length: 1
      });
      const b = g(p) || [];
      return x.children = b.length === 0 ? null : b.map((v) => h(v, x)), x.children && Object.assign(x, x.children.reduce(
        (v, S) => ({
          height: Math.max(v.height, S.height + 1),
          length: v.length + S.length
        }),
        x
      )), x;
    };
    return h(c, null);
  }
  return Object.assign(s, {
    nodeSize(o) {
      return arguments.length ? (t.nodeSize = o, s) : t.nodeSize;
    },
    spacing(o) {
      return arguments.length ? (t.spacing = o, s) : t.spacing;
    },
    children(o) {
      return arguments.length ? (t.children = o, s) : t.children;
    },
    hierarchy(o, c) {
      const g = typeof c > "u" ? t.children : c;
      return l(n(), o, g);
    },
    dump(o) {
      const c = r("nodeSize"), g = (h) => (p) => {
        const m = h + "  ", x = h + "    ", { x: b, y: v } = p, S = c(p), w = p.children || [], f = w.length === 0 ? " " : `,${m}children: [${x}${w.map(g(x)).join(x)}${m}],${h}`;
        return `{ size: [${S.join(", ")}],${m}x: ${b}, y: ${v}${f}},`;
      };
      return g(`
`)(o);
    }
  }), s;
}
st.version = It;
const rt = (i, t = 0) => (i.y = t, (i.children || []).reduce((r, s) => {
  const [n, a] = r;
  rt(s, i.y + i.ySize);
  const l = (n === 0 ? s.lExt : s.rExt).bottom;
  n !== 0 && Yt(i, n, a);
  const o = ie(l, n, a);
  return [n + 1, o];
}, [0, null]), Vt(i), ee(i), i), nt = (i, t, r) => {
  typeof t > "u" && (t = -i.relX - i.prelim, r = 0);
  const s = t + i.relX;
  return i.relX = s + i.prelim - r, i.prelim = 0, i.x = r + i.relX, (i.children || []).forEach((n) => nt(n, s, i.x)), i;
}, Vt = (i) => {
  (i.children || []).reduce((t, r) => {
    const [s, n] = t, a = s + r.shift, l = n + a + r.change;
    return r.relX += l, [a, l];
  }, [0, 0]);
}, Yt = (i, t, r) => {
  const s = i.children[t - 1], n = i.children[t];
  let a = s, l = s.relX, o = n, c = n.relX, g = !0;
  for (; a && o; ) {
    a.bottom > r.lowY && (r = r.next);
    const h = l + a.prelim - (c + o.prelim) + a.xSize / 2 + o.xSize / 2 + a.spacing(o);
    (h > 0 || h < 0 && g) && (c += h, Zt(n, h), qt(i, t, r.index, h)), g = !1;
    const p = a.bottom, m = o.bottom;
    p <= m && (a = Qt(a), a && (l += a.relX)), p >= m && (o = Jt(o), o && (c += o.relX));
  }
  !a && o ? Ut(i, t, o, c) : a && !o && te(i, t, a, l);
}, Zt = (i, t) => {
  i.relX += t, i.lExtRelX += t, i.rExtRelX += t;
}, qt = (i, t, r, s) => {
  const n = i.children[t], a = t - r;
  if (a > 1) {
    const l = s / a;
    i.children[r + 1].shift += l, n.shift -= l, n.change -= s - l;
  }
}, Jt = (i) => i.hasChildren ? i.firstChild : i.lThr, Qt = (i) => i.hasChildren ? i.lastChild : i.rThr, Ut = (i, t, r, s) => {
  const n = i.firstChild, a = n.lExt, l = i.children[t];
  a.lThr = r;
  const o = s - r.relX - n.lExtRelX;
  a.relX += o, a.prelim -= o, n.lExt = l.lExt, n.lExtRelX = l.lExtRelX;
}, te = (i, t, r, s) => {
  const n = i.children[t], a = n.rExt, l = i.children[t - 1];
  a.rThr = r;
  const o = s - r.relX - n.rExtRelX;
  a.relX += o, a.prelim -= o, n.rExt = l.rExt, n.rExtRelX = l.rExtRelX;
}, ee = (i) => {
  if (i.hasChildren) {
    const t = i.firstChild, r = i.lastChild, s = (t.prelim + t.relX - t.xSize / 2 + r.relX + r.prelim + r.xSize / 2) / 2;
    Object.assign(i, {
      prelim: s,
      lExt: t.lExt,
      lExtRelX: t.lExtRelX,
      rExt: r.rExt,
      rExtRelX: r.rExtRelX
    });
  }
}, ie = (i, t, r) => {
  for (; r !== null && i >= r.lowY; )
    r = r.next;
  return {
    lowY: i,
    index: t,
    next: r
  };
}, at = ".markmap{--markmap-max-width: 9999px;--markmap-a-color: #0097e6;--markmap-a-hover-color: #00a8ff;--markmap-code-bg: #f0f0f0;--markmap-code-color: #555;--markmap-highlight-bg: #ffeaa7;--markmap-table-border: 1px solid currentColor;--markmap-font: 300 16px/20px sans-serif;--markmap-circle-open-bg: #fff;--markmap-text-color: #333;--markmap-highlight-node-bg: #ff02;font:var(--markmap-font);color:var(--markmap-text-color)}.markmap-link{fill:none}.markmap-node>circle{cursor:pointer}.markmap-foreign{display:inline-block}.markmap-foreign p{margin:0}.markmap-foreign a{color:var(--markmap-a-color)}.markmap-foreign a:hover{color:var(--markmap-a-hover-color)}.markmap-foreign code{padding:.25em;font-size:calc(1em - 2px);color:var(--markmap-code-color);background-color:var(--markmap-code-bg);border-radius:2px}.markmap-foreign pre{margin:0}.markmap-foreign pre>code{display:block}.markmap-foreign del{text-decoration:line-through}.markmap-foreign em{font-style:italic}.markmap-foreign strong{font-weight:700}.markmap-foreign mark{background:var(--markmap-highlight-bg)}.markmap-foreign table,.markmap-foreign th,.markmap-foreign td{border-collapse:collapse;border:var(--markmap-table-border)}.markmap-foreign img{display:inline-block}.markmap-foreign svg{fill:currentColor}.markmap-foreign>div{width:var(--markmap-max-width);text-align:left}.markmap-foreign>div>div{display:inline-block}.markmap-highlight rect{fill:var(--markmap-highlight-node-bg)}.markmap-dark .markmap{--markmap-code-bg: #1a1b26;--markmap-code-color: #ddd;--markmap-circle-open-bg: #444;--markmap-text-color: #eee}", ge = at, j = "g.markmap-node", se = "path.markmap-link", re = "g.markmap-highlight", N = kt();
function Q(i, t) {
  const r = zt(i, t);
  return i[r];
}
function B(i) {
  i.stopPropagation();
}
const ne = new ft();
class ot {
  constructor(t, r) {
    this.options = { ...et }, this._disposeList = [], this._sideMap = /* @__PURE__ */ new Map(), this.handleZoom = (s) => {
      const { transform: n } = s;
      this.g.attr("transform", n);
    }, this.handlePan = (s) => {
      s.preventDefault();
      const n = X(this.svg.node()), a = n.translate(
        -s.deltaX / n.k,
        -s.deltaY / n.k
      );
      this.svg.call(this.zoom.transform, a);
    }, this.handleClick = (s, n) => {
      let a = this.options.toggleRecursively;
      (D ? s.metaKey : s.ctrlKey) && (a = !a), this.toggleNode(n, a);
    }, this.ensureView = this.ensureVisible, this.svg = t.datum ? t : vt(t), this.styleNode = this.svg.append("style"), this.zoom = bt().filter((s) => this.options.scrollForPan && s.type === "wheel" ? s.ctrlKey && !s.button : (!s.ctrlKey || s.type === "wheel") && !s.button).on("zoom", this.handleZoom), this.setOptions(r), this.state = {
      id: this.options.id || this.svg.attr("id") || mt(),
      rect: { x1: 0, y1: 0, x2: 0, y2: 0 }
    }, this.g = this.svg.append("g"), this.g.append("g").attr("class", "markmap-highlight"), this._observer = new ResizeObserver(
      ut(() => {
        this.renderData();
      }, 100)
    ), this._disposeList.push(
      ne.tap(() => {
        this.setData();
      }),
      () => this._observer.disconnect()
    );
  }
  getStyleContent() {
    const { style: t } = this.options, { id: r } = this.state, s = typeof t == "function" ? t(r) : "";
    return [this.options.embedGlobalCSS && at, s].filter(Boolean).join(`
`);
  }
  updateStyle() {
    this.svg.attr(
      "class",
      xt(this.svg.attr("class"), "markmap", this.state.id)
    );
    const t = this.getStyleContent();
    this.styleNode.text(t);
  }
  async toggleNode(t, r = !1) {
    var n, a;
    const s = (n = t.payload) != null && n.fold ? 0 : 1;
    r ? M(t, (l, o) => {
      l.payload = {
        ...l.payload,
        fold: s
      }, o();
    }) : t.payload = {
      ...t.payload,
      fold: (a = t.payload) != null && a.fold ? 0 : 1
    }, await this.renderData(t);
  }
  async toggleSide(t, r) {
    var a;
    const s = r === "left" ? "foldLeft" : "foldRight", n = (a = t.payload) == null ? void 0 : a[s];
    t.payload = { ...t.payload, [s]: n ? 0 : 1 }, await this.renderData(t);
  }
  _initializeData(t) {
    var o;
    let r = 0;
    const { color: s, initialExpandLevel: n } = this.options;
    let a = 0, l = 0;
    return M(t, (c, g, h) => {
      var m, x, b, v;
      l += 1, c.children = (m = c.children) == null ? void 0 : m.map((S) => ({ ...S })), r += 1, c.state = {
        ...c.state,
        depth: l,
        id: r,
        rect: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        size: [0, 0]
      }, c.state.key = [(x = h == null ? void 0 : h.state) == null ? void 0 : x.id, c.state.id].filter(Boolean).join(".") + wt(c.content), c.state.path = [(b = h == null ? void 0 : h.state) == null ? void 0 : b.path, c.state.id].filter(Boolean).join("."), s(c);
      const p = ((v = c.payload) == null ? void 0 : v.fold) === 2;
      p ? a += 1 : (a || n >= 0 && c.state.depth >= n) && (c.payload = { ...c.payload, fold: 1 }), g(), p && (a -= 1), l -= 1;
    }), this.options.bidirectional && (this._sideMap.clear(), (o = t.children) == null || o.forEach((c, g) => {
      const h = g % 2 !== 0 ? "left" : "right";
      M(c, (p, m) => {
        this._sideMap.set(p.state.id, h), m();
      });
    })), t;
  }
  _relayout() {
    var S, w;
    if (!this.state.data) return;
    this.g.selectAll(R(j)).selectAll(
      R("foreignObject")
    ).each(function(f) {
      var u;
      const k = (u = this.firstChild) == null ? void 0 : u.firstChild, E = [k.scrollWidth, k.scrollHeight];
      f.state.size = E;
    });
    const {
      lineWidth: t,
      paddingX: r,
      spacingHorizontal: s,
      spacingVertical: n,
      bidirectional: a
    } = this.options, l = () => st({}).children((f) => {
      var k;
      if (!((k = f.payload) != null && k.fold)) return f.children;
    }).nodeSize((f) => {
      const [k, E] = f.data.state.size;
      return [
        E,
        k + (k ? r * 2 : 0) + s
      ];
    }).spacing((f, k) => (f.parent === k.parent ? n : n * 2) + t(f.data));
    if (!a) {
      const f = l(), k = f.hierarchy(this.state.data);
      f(k);
      const E = k.descendants();
      E.forEach((u) => {
        u.data.state.rect = {
          x: u.y,
          y: u.x - u.xSize / 2,
          width: u.ySize - s,
          height: u.xSize
        };
      }), this.state.rect = {
        x1: F(E, (u) => u.data.state.rect.x) || 0,
        y1: F(E, (u) => u.data.state.rect.y) || 0,
        x2: O(
          E,
          (u) => u.data.state.rect.x + u.data.state.rect.width
        ) || 0,
        y2: O(
          E,
          (u) => u.data.state.rect.y + u.data.state.rect.height
        ) || 0
      };
      return;
    }
    const o = this.state.data, c = o.children ?? [], g = (S = o.payload) != null && S.foldRight ? [] : c.filter((f, k) => k % 2 === 0), h = (w = o.payload) != null && w.foldLeft ? [] : c.filter((f, k) => k % 2 !== 0);
    o.children = g;
    const p = l(), m = p.hierarchy(o);
    p(m);
    const x = m.descendants();
    x.forEach((f) => {
      f.data.state.rect = {
        x: f.y,
        y: f.x - f.xSize / 2,
        width: f.ySize - s,
        height: f.xSize
      };
    });
    let b = [];
    if (h.length > 0) {
      o.children = h;
      const f = l(), k = f.hierarchy(o);
      f(k);
      const E = k.ySize;
      b = k.descendants().filter((u) => u.depth > 0), b.forEach((u) => {
        u.data.state.rect = {
          x: E - u.y - u.ySize,
          y: u.x - u.xSize / 2,
          width: u.ySize - s,
          height: u.xSize
        };
      });
    }
    o.children = c;
    const v = [...x, ...b];
    this.state.rect = {
      x1: F(v, (f) => f.data.state.rect.x) || 0,
      y1: F(v, (f) => f.data.state.rect.y) || 0,
      x2: O(
        v,
        (f) => f.data.state.rect.x + f.data.state.rect.width
      ) || 0,
      y2: O(
        v,
        (f) => f.data.state.rect.y + f.data.state.rect.height
      ) || 0
    };
  }
  setOptions(t) {
    this.options = {
      ...this.options,
      ...t
    }, this.options.zoom ? this.svg.call(this.zoom) : this.svg.on(".zoom", null), this.options.pan ? this.svg.on("wheel", this.handlePan) : this.svg.on("wheel", null);
  }
  async setData(t, r) {
    r && this.setOptions(r), t && (this.state.data = this._initializeData(t)), this.state.data && (this.updateStyle(), await this.renderData());
  }
  async setHighlight(t) {
    this.state.highlight = t || void 0, await this.renderData();
  }
  _getHighlightRect(t) {
    const r = this.svg.node(), n = 4 / X(r).k, a = {
      ...t.state.rect
    };
    return a.x -= n, a.y -= n, a.width += 2 * n, a.height += 2 * n, a;
  }
  async renderData(t) {
    const { paddingX: r, autoFit: s, color: n, maxWidth: a, lineWidth: l } = this.options, o = this.state.data;
    if (!o) return;
    const c = {}, g = {}, h = [];
    M(o, (e, d, y) => {
      var z, C, _;
      this.options.bidirectional && y === o && (this._sideMap.get(e.state.id) === "left" ? (z = o.payload) != null && z.foldLeft : (C = o.payload) != null && C.foldRight) || ((_ = e.payload) != null && _.fold || d(), c[e.state.id] = e, y && (g[e.state.id] = y.state.id), h.push(e));
    });
    const p = {}, m = {}, x = (e) => {
      !e || p[e.state.id] || M(e, (d, y) => {
        p[d.state.id] = e.state.id, y();
      });
    }, b = (e) => m[p[e.state.id]] || o.state.rect, v = (e) => (c[p[e.state.id]] || o).state.rect;
    m[o.state.id] = o.state.rect, t && x(t);
    let { highlight: S } = this.state;
    S && !c[S.state.id] && (S = void 0);
    let w = this.g.selectAll(R(re)).selectAll(R("rect")).data(S ? [this._getHighlightRect(S)] : []).join("rect").attr("x", (e) => e.x).attr("y", (e) => e.y).attr("width", (e) => e.width).attr("height", (e) => e.height);
    const f = this.g.selectAll(R(j)).each((e) => {
      m[e.state.id] = e.state.rect;
    }).data(h, (e) => e.state.key), k = f.enter().append("g").attr("data-depth", (e) => e.state.depth).attr("data-path", (e) => e.state.path).each((e) => {
      x(c[g[e.state.id]]);
    }), E = f.exit().each((e) => {
      x(c[g[e.state.id]]);
    }), u = f.merge(k).attr(
      "class",
      (e) => {
        var d;
        return ["markmap-node", ((d = e.payload) == null ? void 0 : d.fold) && "markmap-fold"].filter(Boolean).join(" ");
      }
    ), K = u.selectAll(R("line")).data(
      (e) => [e],
      (e) => e.state.key
    ), P = K.enter().append("line").attr("stroke", (e) => n(e)).attr("stroke-width", 0), I = K.merge(P), ct = (e) => {
      var d;
      return (d = e.children) != null && d.length ? this.options.bidirectional && !this._sideMap.has(e.state.id) ? [
        { node: e, side: "right" },
        { node: e, side: "left" }
      ] : [{ node: e, side: this._sideMap.get(e.state.id) ?? null }] : [];
    }, G = u.selectAll(R("circle")).data(
      ct,
      (e) => e.node.state.key + (e.side ? `-${e.side}` : "")
    ), V = G.enter().append("circle").attr("stroke-width", 0).attr("r", 0).on("click", (e, d) => {
      if (this.options.bidirectional && !this._sideMap.has(d.node.state.id) && d.side !== null)
        this.toggleSide(d.node, d.side);
      else {
        let z = this.options.toggleRecursively;
        (D ? e.metaKey : e.ctrlKey) && (z = !z), this.toggleNode(d.node, z);
      }
    }).on("mousedown", B).merge(G).attr("stroke", (e) => n(e.node)).attr("fill", (e) => {
      var d, y;
      if (this.options.bidirectional && !this._sideMap.has(e.node.state.id) && e.side !== null) {
        const z = e.side === "left" ? "foldLeft" : "foldRight";
        return (d = e.node.payload) != null && d[z] ? n(e.node) : "var(--markmap-circle-open-bg)";
      }
      return (y = e.node.payload) != null && y.fold && e.node.children ? n(e.node) : "var(--markmap-circle-open-bg)";
    }), Y = this._observer, Z = u.selectAll(R("foreignObject")).data(
      (e) => [e],
      (e) => e.state.key
    ), T = Z.enter().append("foreignObject").attr("class", "markmap-foreign").attr("x", r).attr("y", 0).style("opacity", 0).on("mousedown", B).on("dblclick", B);
    T.append("xhtml:div").append("xhtml:div").html((e) => e.content).attr("xmlns", "http://www.w3.org/1999/xhtml"), T.each(function() {
      var d;
      const e = (d = this.firstChild) == null ? void 0 : d.firstChild;
      Y.observe(e);
    });
    const q = E.selectAll(
      R("foreignObject")
    );
    q.each(function() {
      var d;
      const e = (d = this.firstChild) == null ? void 0 : d.firstChild;
      Y.unobserve(e);
    });
    const J = T.merge(Z), lt = h.flatMap((e) => {
      var d;
      return (d = e.payload) != null && d.fold ? [] : this.options.bidirectional && !this._sideMap.has(e.state.id) ? (e.children ?? []).flatMap((y) => {
        var _, $;
        return (this._sideMap.get(y.state.id) === "left" ? (_ = e.payload) == null ? void 0 : _.foldLeft : ($ = e.payload) == null ? void 0 : $.foldRight) ? [] : [{ source: e, target: y }];
      }) : e.children.map((y) => ({ source: e, target: y }));
    }), H = this.g.selectAll(R(se)).data(lt, (e) => e.target.state.key), ht = H.exit(), dt = H.enter().insert("path", "g").attr("class", "markmap-link").attr("data-depth", (e) => e.target.state.depth).attr("data-path", (e) => e.target.state.path).attr("d", (e) => {
      const d = b(e.target), C = [
        this.options.bidirectional && this._sideMap.get(e.target.state.id) === "left" ? d.x : d.x + d.width,
        d.y + d.height
      ];
      return N({ source: C, target: C });
    }).attr("stroke-width", 0).merge(H);
    this.svg.style(
      "--markmap-max-width",
      a ? `${a}px` : null
    ), await new Promise(requestAnimationFrame), this._relayout(), w = w.data(S ? [this._getHighlightRect(S)] : []).join("rect"), this.transition(w).attr("x", (e) => e.x).attr("y", (e) => e.y).attr("width", (e) => e.width).attr("height", (e) => e.height), k.attr("transform", (e) => {
      const d = b(e);
      return `translate(${this.options.bidirectional && this._sideMap.get(e.state.id) === "left" ? d.x : d.x + d.width - e.state.rect.width},${d.y + d.height - e.state.rect.height})`;
    }), this.transition(E).attr("transform", (e) => {
      const d = v(e), z = this.options.bidirectional && this._sideMap.get(e.state.id) === "left" ? d.x : d.x + d.width - e.state.rect.width, C = d.y + d.height - e.state.rect.height;
      return `translate(${z},${C})`;
    }).remove(), this.transition(u).attr(
      "transform",
      (e) => `translate(${e.state.rect.x},${e.state.rect.y})`
    );
    const gt = E.selectAll(
      R("line")
    );
    this.transition(gt).attr("x1", (e) => e.state.rect.width).attr("stroke-width", 0), P.attr("x1", (e) => e.state.rect.width).attr("x2", (e) => e.state.rect.width), I.attr("y1", (e) => e.state.rect.height + l(e) / 2).attr("y2", (e) => e.state.rect.height + l(e) / 2), this.transition(I).attr("x1", -1).attr("x2", (e) => e.state.rect.width + 2).attr("stroke", (e) => n(e)).attr("stroke-width", l);
    const pt = E.selectAll(
      R("circle")
    );
    this.transition(pt).attr("r", 0).attr("stroke-width", 0), V.attr("cx", (e) => e.side === "left" ? 0 : e.node.state.rect.width).attr("cy", (e) => e.node.state.rect.height + l(e.node) / 2), this.transition(V).attr("r", 6).attr("stroke-width", "1.5"), this.transition(q).style("opacity", 0), J.attr("width", (e) => Math.max(0, e.state.rect.width - r * 2)).attr("height", (e) => e.state.rect.height), this.transition(J).style("opacity", 1), this.transition(ht).attr("d", (e) => {
      const d = v(e.target), C = [
        this.options.bidirectional && this._sideMap.get(e.target.state.id) === "left" ? d.x : d.x + d.width,
        d.y + d.height + l(e.target) / 2
      ];
      return N({ source: C, target: C });
    }).attr("stroke-width", 0).remove(), this.transition(dt).attr("stroke", (e) => n(e.target)).attr("stroke-width", (e) => l(e.target)).attr("d", (e) => {
      const d = e.source, y = e.target, z = this.options.bidirectional && this._sideMap.get(y.state.id) === "left", C = [
        z ? d.state.rect.x : d.state.rect.x + d.state.rect.width,
        d.state.rect.y + d.state.rect.height + l(d) / 2
      ], _ = [
        z ? y.state.rect.x + y.state.rect.width : y.state.rect.x,
        y.state.rect.y + y.state.rect.height + l(y) / 2
      ];
      return N({ source: C, target: _ });
    }), s && this.fit();
  }
  transition(t) {
    const { duration: r } = this.options;
    return t.transition().duration(r);
  }
  /**
   * Fit the content to the viewport.
   */
  async fit(t = this.options.maxInitialScale) {
    const r = this.svg.node(), { width: s, height: n } = r.getBoundingClientRect(), { fitRatio: a } = this.options, { x1: l, y1: o, x2: c, y2: g } = this.state.rect, h = c - l, p = g - o, m = Math.min(
      s / h * a,
      n / p * a,
      t
    ), x = St.translate(
      (s - h * m) / 2 - l * m,
      (n - p * m) / 2 - o * m
    ).scale(m);
    return this.transition(this.svg).call(this.zoom.transform, x).end().catch(L);
  }
  findElement(t) {
    let r;
    return this.g.selectAll(R(j)).each(function(n) {
      n === t && (r = {
        data: n,
        g: this
      });
    }), r;
  }
  /**
   * Pan the content to make the provided node visible in the viewport.
   */
  async ensureVisible(t, r) {
    var S;
    const s = (S = this.findElement(t)) == null ? void 0 : S.data;
    if (!s) return;
    const n = this.svg.node(), a = n.getBoundingClientRect(), l = X(n), [o, c] = [
      s.state.rect.x,
      s.state.rect.x + s.state.rect.width + 2
    ].map((w) => w * l.k + l.x), [g, h] = [
      s.state.rect.y,
      s.state.rect.y + s.state.rect.height
    ].map((w) => w * l.k + l.y), p = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      ...r
    }, m = [p.left - o, a.width - p.right - c], x = [p.top - g, a.height - p.bottom - h], b = m[0] * m[1] > 0 ? Q(m, Math.abs) / l.k : 0, v = x[0] * x[1] > 0 ? Q(x, Math.abs) / l.k : 0;
    if (b || v) {
      const w = l.translate(b, v);
      return this.transition(this.svg).call(this.zoom.transform, w).end().catch(L);
    }
  }
  async centerNode(t, r) {
    var b;
    const s = (b = this.findElement(t)) == null ? void 0 : b.data;
    if (!s) return;
    const n = this.svg.node(), a = n.getBoundingClientRect(), l = X(n), o = (s.state.rect.x + s.state.rect.width / 2) * l.k + l.x, c = (s.state.rect.y + s.state.rect.height / 2) * l.k + l.y, g = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      ...r
    }, h = (g.left + a.width - g.right) / 2, p = (g.top + a.height - g.bottom) / 2, m = (h - o) / l.k, x = (p - c) / l.k;
    if (m || x) {
      const v = l.translate(m, x);
      return this.transition(this.svg).call(this.zoom.transform, v).end().catch(L);
    }
  }
  /**
   * Scale content with it pinned at the center of the viewport.
   */
  async rescale(t) {
    const r = this.svg.node(), { width: s, height: n } = r.getBoundingClientRect(), a = s / 2, l = n / 2, o = X(r), c = o.translate(
      (a - o.x) * (1 - t) / o.k,
      (l - o.y) * (1 - t) / o.k
    ).scale(t);
    return this.transition(this.svg).call(this.zoom.transform, c).end().catch(L);
  }
  destroy() {
    this.svg.on(".zoom", null), this.svg.html(null), this._disposeList.forEach((t) => {
      t();
    });
  }
  static create(t, r, s = null) {
    const n = new ot(t, r);
    return s && n.setData(s).then(() => {
      n.fit();
    }), n;
  }
}
export {
  ot as Markmap,
  R as childSelector,
  Et as defaultColorFn,
  et as defaultOptions,
  de as deriveOptions,
  ge as globalCSS,
  D as isMacintosh,
  tt as lineWidthFactory,
  me as loadCSS,
  ue as loadJS,
  ne as refreshHook,
  wt as simpleHash
};
