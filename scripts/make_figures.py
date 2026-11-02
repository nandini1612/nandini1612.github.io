"""Generate the section figures. Pure standard library; writes into assets/.

outage-*.svg  a simulated 10 s GPS outage: the aircraft turns, the
              hold-last-velocity estimate does not, plus GateIO's measured
              drift numbers (leave-one-flight-out, from the paper).
tala-*.svg    one cycle of Adi tala (8 beats: laghu 4 + drutam 2 + drutam 2)
              in real time at 60 bpm, with tha-ka-dhi-mi in the three speeds
              adavus are practised in: 1, 2 and 4 syllables per beat.
"""
import math
import random
import os

from make_header import THEMES

FONT = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"


def pts_d(pts):
    return "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts)


def length(pts):
    return sum(math.dist(a, b) for a, b in zip(pts, pts[1:]))


# ---------------------------------------------------------------- GPS outage

DRIFT = [("GateIO-LSTM", 11.2), ("GateIO-TCN", 23.4), ("RoNIN", 40.1),
         ("const-v", 85.0), ("EKF", 99.5)]


def outage(theme, strip=True):
    # strip=False gives the simulation alone, with larger text for a narrow column
    c = THEMES[theme]
    if strip:
        W, H, fs, gap = 900, 350, 12, 150
        x0, y0, pre, r, turn_deg, out_len = 50, 228, 300, 220, 32, 440
    else:  # squarer canvas so it fills a card column
        W, H, fs, gap = 600, 450, 16, 190
        x0, y0, pre, r, turn_deg, out_len = 36, 372, 200, 160, 52, 330
    before = [(x0 + i, y0) for i in range(0, pre + 1, 10)]
    # outage leg: short straight, a left turn, then straight again
    after, (x, y), hdg = [], before[-1], 0.0
    for _ in range(3):
        x += 10; after.append((x, y))
    turn = math.radians(turn_deg)
    n = 40
    for _ in range(n):
        hdg += turn / n
        x += r * turn / n * math.cos(hdg); y -= r * turn / n * math.sin(hdg)
        after.append((x, y))
    rest = out_len - length([before[-1]] + after)
    after.append((x + rest * math.cos(hdg), y - rest * math.sin(hdg)))
    true_end = after[-1]
    ghost = [before[-1], (before[-1][0] + out_len, y0)]

    dur, t_cut, t_end = 9, 0.34, 0.82
    full = before + after
    L1, L = length(before), length(full)
    kt = f"0;{t_cut};{t_end};1"
    kp = f"0;{L1 / L:.4f};1;1"
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
         f'<rect width="{W}" height="{H}" rx="10" fill="{c["bg"]}"/>',
         f'<g font-family="{FONT}" font-size="{fs}">']
    # ground truth, faint and always visible
    p.append(f'<path d="{pts_d(full)}" fill="none" stroke="{c["line"]}" stroke-opacity="0.35" '
             'stroke-width="1.5" stroke-dasharray="2 4"/>')
    # GPS fixes appear one by one until the outage
    for i, (gx, gy) in enumerate(before[::3]):
        t = t_cut * (i * 30) / pre
        p.append(f'<circle cx="{gx:.1f}" cy="{gy:.1f}" r="2.5" fill="{c["text"]}" opacity="0">'
                 f'<animate attributeName="opacity" values="0;0;0.8;0.8" keyTimes="0;{t:.4f};{t + 0.001:.4f};1" '
                 f'dur="{dur}s" repeatCount="indefinite"/></circle>')
    # trail behind the aircraft
    p.append(f'<path d="{pts_d(full)}" fill="none" stroke="{c["mom"]}" stroke-width="2" '
             'pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1">'
             f'<animate attributeName="stroke-dashoffset" values="1;{1 - L1 / L:.4f};0;0" keyTimes="{kt}" '
             f'dur="{dur}s" repeatCount="indefinite"/></path>')
    # hold-last-velocity estimate, starting at the cut
    p.append(f'<path d="{pts_d(ghost)}" fill="none" stroke="{c["sgd"]}" stroke-width="2" '
             'pathLength="1" stroke-dasharray="0.012 0.012" opacity="0">'
             f'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;{t_cut};{t_cut + 0.001};1" '
             f'dur="{dur}s" repeatCount="indefinite"/></path>')
    p.append(f'<circle r="5" fill="{c["sgd"]}" opacity="0">'
             f'<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;{t_cut};{t_cut + 0.001};1" '
             f'dur="{dur}s" repeatCount="indefinite"/>'
             f'<animateMotion path="{pts_d(ghost)}" keyPoints="0;0;1;1" keyTimes="{kt}" calcMode="linear" '
             f'dur="{dur}s" repeatCount="indefinite"/></circle>')
    p.append(f'<circle r="5.5" fill="{c["mom"]}"><animateMotion path="{pts_d(full)}" keyPoints="{kp}" '
             f'keyTimes="{kt}" calcMode="linear" dur="{dur}s" repeatCount="indefinite"/></circle>')
    # endpoint error, shown once both have flown the full 10 s
    ex, ey = ghost[1]
    tx, ty = true_end
    show = f'values="0;0;1;1" keyTimes="0;{t_end};{t_end + 0.001};1" dur="{dur}s" repeatCount="indefinite"'
    p.append(f'<g opacity="0"><animate attributeName="opacity" {show}/>'
             f'<line x1="{ex:.1f}" y1="{ey:.1f}" x2="{tx:.1f}" y2="{ty:.1f}" stroke="{c["adam"]}" stroke-width="1.5"/>'
             + (f'<text x="{(ex + tx) / 2 + 10:.1f}" y="{(ey + ty) / 2 + 4:.1f}" fill="{c["adam"]}">endpoint drift</text></g>'
                if strip else
                f'<text x="{W - 20}" y="{ey + 34:.1f}" fill="{c["adam"]}" text-anchor="end">endpoint drift</text></g>'))
    cx, cy = before[-1]
    p.append(f'<line x1="{cx}" y1="{cy - 14}" x2="{cx}" y2="{cy + 14}" stroke="{c["sub"]}" stroke-width="1"/>')
    p.append(f'<text x="{cx}" y="{cy + 30}" fill="{c["sub"]}" text-anchor="middle">GPS lost</text>')
    p.append(f'<text x="{x0}" y="{y0 + 30}" fill="{c["sub"]}">GPS fixes</text>')
    lx, ly = 22, 32
    for i, (col, label) in enumerate([(c["mom"], "true flight"), (c["sgd"], "hold last velocity")]):
        p.append(f'<rect x="{lx + i * gap}" y="{ly - 7}" width="14" height="3" rx="1.5" fill="{col}"/>')
        p.append(f'<text x="{lx + i * gap + 20}" y="{ly - 2}" fill="{c["text"]}">{label}</text>')
    if strip:  # the card shows its own "simulation" label
        p.append(f'<text x="{W - 22}" y="{ly - 2}" fill="{c["sub"]}" text-anchor="end">simulated, not model output</text>')

    if not strip:
        p.append("</g></svg>")
        return "\n".join(p)

    # measured results strip
    by = 284
    p.append(f'<line x1="22" y1="{by - 22}" x2="{W - 22}" y2="{by - 22}" stroke="{c["line"]}" stroke-opacity="0.3"/>')
    p.append(f'<text x="22" y="{by - 4}" fill="{c["sub"]}">mean endpoint drift after 10 s, leave-one-flight-out, metres</text>')
    bw, scale = 160, 1.15
    for i, (name, m) in enumerate(DRIFT):
        bx = 22 + i * (bw + 15)
        col = c["mom"] if i == 0 else c["line"]
        p.append(f'<rect x="{bx}" y="{by + 10}" width="{m * scale:.1f}" height="6" rx="3" fill="{col}" '
                 f'fill-opacity="{1 if i == 0 else 0.5}"/>')
        weight = ' font-weight="700"' if i == 0 else ""
        p.append(f'<text x="{bx}" y="{by + 36}" fill="{c["text"]}"{weight}>{name}  {m}</text>')
    p.append("</g></svg>")
    return "\n".join(p)


# ---------------------------------------------------------------------- tala

SYL = ["tha", "ka", "dhi", "mi"]
# hand action on each beat of Adi tala
GESTURE = ["clap", "1", "2", "3", "clap", "wave", "clap", "wave"]


def arc(cx, cy, r, a0, a1):
    p0 = (cx + r * math.cos(a0), cy + r * math.sin(a0))
    p1 = (cx + r * math.cos(a1), cy + r * math.sin(a1))
    big = 1 if a1 - a0 > math.pi else 0
    return f"M{p0[0]:.1f},{p0[1]:.1f} A{r},{r} 0 {big} 1 {p1[0]:.1f},{p1[1]:.1f}"


def flash(t, n, dur, lo, hi=1.0):
    # bright when the hand passes at fraction t of the cycle, then fade
    k = 0.9 / n
    if t == 0:
        vals, kt = f"{hi};{lo};{lo}", f"0;{k:.4f};1"
    else:
        vals, kt = f"{lo};{lo};{hi};{lo};{lo}", f"0;{t:.4f};{t + 0.002:.4f};{t + k:.4f};1"
    return (f'<animate attributeName="opacity" values="{vals}" keyTimes="{kt}" '
            f'dur="{dur}s" repeatCount="indefinite"/>')


def tala(theme):
    c = THEMES[theme]
    W, H = 900, 320
    cx, cy, dur = 175, 160, 8  # 8 beats at 60 bpm
    ang = lambda f: -math.pi / 2 + 2 * math.pi * f
    at = lambda r, f: (cx + r * math.cos(ang(f)), cy + r * math.sin(ang(f)))
    rings = [(52, 1, c["adam"]), (80, 2, c["mom"]), (106, 4, c["sgd"])]
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
         f'<rect width="{W}" height="{H}" rx="10" fill="{c["bg"]}"/>',
         f'<g font-family="{FONT}" font-size="12">']
    # laghu / drutam groups
    for b0, b1, name in ((0, 4, "laghu"), (4, 6, "drutam"), (6, 8, "drutam")):
        g = 0.012
        p.append(f'<path d="{arc(cx, cy, 124, ang(b0 / 8 + g), ang(b1 / 8 - g))}" fill="none" '
                 f'stroke="{c["line"]}" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round"/>')
    for b in range(8):
        x, y = at(141, b / 8)
        p.append(f'<text x="{x:.1f}" y="{y + 4:.1f}" fill="{c["sub"]}" text-anchor="middle">{b + 1}</text>')
        x0, y0 = at(30, b / 8)
        x1, y1 = at(116, b / 8)
        p.append(f'<line x1="{x0:.1f}" y1="{y0:.1f}" x2="{x1:.1f}" y2="{y1:.1f}" stroke="{c["line"]}" stroke-opacity="0.15"/>')
    for r, per, col in rings:
        n = 8 * per
        p.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{col}" stroke-opacity="0.15"/>')
        for i in range(n):
            x, y = at(r, i / n)
            big = i % per == 0
            p.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{4.5 if big else 3}" fill="{col}" opacity="0.25">'
                     f'{flash(i / n, n, dur, 0.25)}</circle>')
    # first-speed syllables, one per beat, just inside the inner ring
    for i in range(8):
        x, y = at(34, i / 8)
        p.append(f'<text x="{x:.1f}" y="{y + 4:.1f}" fill="{c["text"]}" font-size="10" text-anchor="middle" '
                 f'opacity="0.3">{SYL[i % 4]}{flash(i / 8, 8, dur, 0.3)}</text>')
    hx, hy = at(116, 0)
    p.append(f'<line x1="{cx}" y1="{cy}" x2="{hx:.1f}" y2="{hy:.1f}" stroke="{c["text"]}" stroke-width="1.5" '
             f'stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" '
             f'from="0 {cx} {cy}" to="360 {cx} {cy}" dur="{dur}s" repeatCount="indefinite"/></line>')
    p.append(f'<circle cx="{cx}" cy="{cy}" r="3" fill="{c["text"]}"/>')

    # right-hand panel
    tx = 380
    serif = "Georgia, 'Times New Roman', serif"
    p.append(f'<text x="{tx}" y="62" font-family="{serif}" font-size="26" fill="{c["text"]}">Adi tala</text>')
    p.append(f'<text xml:space="preserve" x="{tx}" y="88" fill="{c["sub"]}">8 beats  |  laghu 4 + drutam 2 + drutam 2  |  60 bpm</text>')
    gy = 132
    p.append(f'<text x="{tx}" y="{gy - 18}" fill="{c["sub"]}">hand</text>')
    for b, g in enumerate(GESTURE):
        x = tx + b * 58
        p.append(f'<text x="{x}" y="{gy}" fill="{c["text"]}" opacity="0.3">{g}{flash(b / 8, 8, dur, 0.3)}</text>')
    ly = 190
    labels = ["1st speed  |  1 syllable a beat", "2nd speed  |  2 a beat", "3rd speed  |  4 a beat"]
    for i, ((r, per, col), lab) in enumerate(zip(rings, labels)):
        y = ly + i * 24
        p.append(f'<circle cx="{tx + 5}" cy="{y - 4}" r="4.5" fill="{col}"/>')
        p.append(f'<text xml:space="preserve" x="{tx + 20}" y="{y}" fill="{c["text"]}">{lab}</text>')
    p.append(f'<text x="{tx}" y="{ly + 92}" fill="{c["sub"]}">tha ka dhi mi: the syllables an adavu is counted in</text>')
    p.append("</g></svg>")
    return "\n".join(p)

# --------------------------------------------------- shared diagram helpers

class Fig:
    """A 600x450 animated diagram in the site palette, built up call by call."""

    def __init__(self, theme, W=600, H=450):
        self.c, self.W, self.H = THEMES[theme], W, H
        self.p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
                  f'<rect width="{W}" height="{H}" rx="10" fill="{self.c["bg"]}"/>',
                  f'<g font-family="{FONT}">']

    def add(self, s):
        self.p.append(s)

    def label(self, x, y, t, anchor="start"):
        self.add(f'<text x="{x}" y="{y}" font-size="11" letter-spacing="1.5" text-anchor="{anchor}" '
                 f'fill="{self.c["sub"]}">{t}</text>')

    def text(self, x, y, t, size=11, col="sub", anchor="start", extra=""):
        self.add(f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}" fill="{self.c[col]}"{extra}>{t}</text>')

    def box(self, x, y, w, h, title, sub="", accent=False):
        c = self.c
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="none" '
                 f'stroke="{c["mom"] if accent else c["line"]}" stroke-opacity="{0.9 if accent else 0.35}"/>')
        self.text(x + 12, y + 22, title, 13, "text")
        if sub:
            self.text(x + 12, y + h - 12, sub)

    def flow(self, d, t0, t1, cyc):
        """Connector with an arrowhead and a pulse that travels it between t0 and t1."""
        c = self.c
        self.add(f'<path d="{d}" fill="none" stroke="{c["line"]}" stroke-opacity="0.45" stroke-width="1.2"/>')
        pts = [tuple(map(float, q.split(","))) for q in d.replace("M", "").split(" L")]
        (ax, ay), (bx, by) = pts[-2], pts[-1]
        a = math.atan2(by - ay, bx - ax)
        hx, hy = bx - 7 * math.cos(a), by - 7 * math.sin(a)
        self.add(f'<path d="M{bx},{by} L{hx - 3.5 * math.sin(a):.1f},{hy + 3.5 * math.cos(a):.1f} '
                 f'L{hx + 3.5 * math.sin(a):.1f},{hy - 3.5 * math.cos(a):.1f}Z" fill="{c["line"]}" fill-opacity="0.6"/>')
        self.add(f'<circle r="3.2" fill="{c["mom"]}" opacity="0">{show(t0, t1, cyc)}<animateMotion path="{d}" '
                 f'keyPoints="0;0;1;1" keyTimes="0;{t0};{t1};1" calcMode="linear" dur="{cyc}s" '
                 f'repeatCount="indefinite"/></circle>')

    def svg(self):
        return "\n".join(self.p + ["</g></svg>"])


def show(t0, t1, dur, lo=0, hi=1):
    """Opacity animation: `hi` from t0 to t1 of each loop, `lo` otherwise (t1 >= 1 holds to the end)."""
    if t1 >= 1:
        return (f'<animate attributeName="opacity" values="{lo};{lo};{hi};{hi}" '
                f'keyTimes="0;{t0:.3f};{t0 + 0.001:.3f};1" dur="{dur}s" repeatCount="indefinite"/>')
    if t0 <= 0:
        return (f'<animate attributeName="opacity" values="{hi};{hi};{lo};{lo}" '
                f'keyTimes="0;{t1:.3f};{t1 + 0.001:.3f};1" dur="{dur}s" repeatCount="indefinite"/>')
    return (f'<animate attributeName="opacity" values="{lo};{lo};{hi};{hi};{lo};{lo}" '
            f'keyTimes="0;{t0:.3f};{t0 + 0.001:.3f};{t1:.3f};{t1 + 0.001:.3f};1" dur="{dur}s" repeatCount="indefinite"/>')


# ------------------------------------------------------------- how GateIO works

def howitworks(theme):
    """GateIO's pipeline as described in its README: 1 s IMU windows -> token
    encoder -> causal LSTM -> residual head predicting the velocity change,
    added to the last GPS velocity and integrated to position. Below, the
    training-time yaw-rate gate on a synthetic yaw-rate trace."""
    f = Fig(theme)
    c, cyc = f.c, 2.4
    f.label(24, 32, "AT RUN TIME  |  EVERY 0.1 S")
    f.box(24, 46, 150, 84, "IMU window", "200 × 14 ch | 1 s")
    for k, (amp, fr, ph) in enumerate([(5, 9, 0), (4, 13, 1), (3, 7, 2)]):
        yb = 76 + k * 11
        pts = " L".join(f"{36 + i * 2.5:.1f},{yb + amp * math.sin(i / fr * 6 + ph) * math.sin(i / 50 * 3.1):.1f}"
                        for i in range(51))
        f.add(f'<path d="M{pts}" fill="none" stroke="{c["text"]}" stroke-opacity="0.55" stroke-width="1"/>')
    f.box(204, 46, 126, 84, "token encoder", "+ outage step")
    f.box(360, 46, 216, 84, "causal LSTM", "2 layers | or TCN + attn", accent=True)
    for i in range(7):  # tokens read left to right
        t = i / 7 * 0.8
        f.add(f'<rect x="{374 + i * 27}" y="80" width="18" height="14" rx="3" fill="{c["mom"]}" opacity="0.2">'
              f'<animate attributeName="opacity" values="0.2;0.2;0.9;0.2;0.2" '
              f'keyTimes="0;{t:.3f};{t + 0.05:.3f};{t + 0.2:.3f};1" dur="{cyc}s" repeatCount="indefinite"/></rect>')
    f.box(24, 168, 170, 70, "last GPS velocity", "v₀, held from before")
    f.box(380, 168, 196, 70, "residual head", "predicts Δv only", accent=True)
    f.add(f'<circle cx="287" cy="203" r="15" fill="none" stroke="{c["mom"]}"/>')
    f.text(287, 208, "+", 16, "mom", "middle")
    f.box(150, 266, 274, 46, "v̂ = v₀ + Δv  →  ∫ dt  →  position")
    f.flow("M174,88 L204,88", 0.00, 0.14, cyc)
    f.flow("M330,88 L360,88", 0.14, 0.28, cyc)
    f.flow("M468,130 L468,168", 0.30, 0.46, cyc)
    f.flow("M380,203 L302,203", 0.48, 0.64, cyc)
    f.flow("M194,203 L272,203", 0.48, 0.64, cyc)
    f.flow("M287,218 L287,266", 0.66, 0.82, cyc)

    f.label(24, 350, "IN TRAINING  |  YAW-RATE GATE")
    x0, x1, yc, sc, thr = 24, 576, 398, 80, 0.10
    w = lambda u: (0.03 * math.sin(u * 19) + 0.33 * math.exp(-((u - 0.33) / 0.07) ** 2)
                   - 0.28 * math.exp(-((u - 0.74) / 0.06) ** 2))
    us = [i / 120 for i in range(121)]
    f.add(f'<rect x="{x0}" y="{yc - thr * sc}" width="{x1 - x0}" height="{2 * thr * sc}" '
          f'fill="{c["sgd"]}" fill-opacity="0.12"/>')
    f.add(f'<line x1="{x0}" y1="{yc}" x2="{x1}" y2="{yc}" stroke="{c["line"]}" stroke-opacity="0.25"/>')
    tr = " L".join(f"{x0 + u * (x1 - x0):.1f},{yc - w(u) * sc:.1f}" for u in us)
    f.add(f'<path d="M{tr}" fill="none" stroke="{c["text"]}" stroke-opacity="0.75" stroke-width="1.4"/>')
    f.text(x0, f.H - 14, "shaded: |ω_z| &lt; 0.10 rad/s")
    gdur = 8
    turn = [abs(w(u)) >= thr for u in us]
    kt = ";".join(f"{u:.4f}" for u in us)
    anim = lambda v: (f'<animate attributeName="opacity" values="{v}" keyTimes="{kt}" calcMode="discrete" '
                      f'dur="{gdur}s" repeatCount="indefinite"/>')
    f.text(x1, 350, "straight: hold velocity, Δv → 0" + anim(";".join("0" if t else "1" for t in turn)),
           12, "sgd", "end")
    f.text(x1, 350, "turn: drift loss teaches it" + anim(";".join("1" if t else "0" for t in turn)),
           12, "adam", "end", ' opacity="0"')
    f.add(f'<g><animateTransform attributeName="transform" type="translate" from="0 0" to="{x1 - x0} 0" '
          f'dur="{gdur}s" repeatCount="indefinite"/>'
          f'<line x1="{x0}" y1="{yc - 34}" x2="{x0}" y2="{yc + 34}" stroke="{c["text"]}" stroke-opacity="0.6"/></g>')
    return f.svg()


# ----------------------------------------------------- how the fraud model works

def fraud_how(theme):
    """One new transaction joins the shared-entity graph (the feature family the
    study found significant), then is scored by the served model. The graph is
    illustrative; the response values are the fraud repo's real example."""
    f = Fig(theme)
    c, dur = f.c, 7
    f.label(24, 32, "SHARED-ENTITY GRAPH  |  ONE NEW TRANSACTION")
    T = (175, 140)
    ents = {"card1": (85, 100), "addr1": (265, 100), "email": (175, 214)}
    past = [(36, 64, "card1", False), (36, 136, "card1", True), (120, 58, "card1", False),
            (120, 214, "email", True), (230, 214, "email", False)]   # (x, y, entity, was fraud)
    cards = [(318, 62), (322, 140), (230, 56)]                       # other cards seen at addr1
    flagged = (330, 196)                                              # fraud txn on one of those cards
    for x, y, e, _ in past:
        ex, ey = ents[e]
        f.add(f'<line x1="{x}" y1="{y}" x2="{ex}" y2="{ey}" stroke="{c["line"]}" stroke-opacity="0.3"/>')
    for x, y in cards:
        f.add(f'<line x1="{x}" y1="{y}" x2="265" y2="100" stroke="{c["line"]}" stroke-opacity="0.3"/>')
    f.add(f'<line x1="322" y1="140" x2="{flagged[0]}" y2="{flagged[1]}" stroke="{c["line"]}" stroke-opacity="0.3"/>')
    for k, (ex, ey) in enumerate(ents.values()):  # the new transaction links in, one entity at a time
        t0 = 0.12 + k * 0.1
        f.add(f'<line x1="{T[0]}" y1="{T[1]}" x2="{ex}" y2="{ey}" stroke="{c["mom"]}" stroke-width="1.6" '
              f'pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"><animate attributeName="stroke-dashoffset" '
              f'values="1;1;0;0" keyTimes="0;{t0:.2f};{t0 + 0.08:.2f};1" dur="{dur}s" repeatCount="indefinite"/></line>')
    for x, y in cards:  # addr1's other cards light up once the address is reached
        f.add(f'<line x1="{x}" y1="{y}" x2="265" y2="100" stroke="{c["mom"]}" stroke-width="1.4" opacity="0">'
              f'{show(0.32, 0.92, dur)}</line>')
    for x, y, _, fr in past:
        f.add(f'<circle cx="{x}" cy="{y}" r="5" fill="{c["adam"] if fr else c["line"]}" fill-opacity="{1 if fr else 0.55}"/>')
    f.add(f'<circle cx="{flagged[0]}" cy="{flagged[1]}" r="5" fill="{c["adam"]}"/>')
    for x, y in cards:
        f.add(f'<rect x="{x - 5}" y="{y - 5}" width="10" height="10" rx="2" fill="{c["line"]}" fill-opacity="0.55"/>')
    for name, (ex, ey) in ents.items():
        f.add(f'<circle cx="{ex}" cy="{ey}" r="17" fill="{c["bg"]}" stroke="{c["text"]}" stroke-opacity="0.6"/>')
        f.text(ex, ey + 4, name, 10, "text", "middle")
    f.add(f'<circle cx="{T[0]}" cy="{T[1]}" r="9" fill="{c["mom"]}">'
          f'<animate attributeName="r" values="9;12;9" dur="1.4s" repeatCount="indefinite"/></circle>')
    f.text(T[0], T[1] - 17, "new txn", 10, "mom", "middle")
    f.text(360, 64, "what the model reads", 11)
    for i, (k, v, t) in enumerate([("addr1_unique_cards", "4", 0.42), ("card1 past txns", "3", 0.50),
                                   ("card1_te (fraud rate)", "high", 0.58)]):
        y = 92 + i * 30
        f.add(f'<g opacity="0">{show(t, 0.92, dur)}')
        f.text(360, y, k, 12, "text")
        f.text(576, y, v, 12, "mom", "end")
        f.add("</g>")
    f.add(f'<circle cx="364" cy="196" r="4" fill="{c["adam"]}"/>')
    f.text(374, 200, "past fraud  |  ■ card  |  ● txn", 10)

    f.label(24, 254, "SERVING  |  POST /predict/transaction")
    stages = [(24, 120, "raw txn", "JSON"), (168, 120, "441 features", "agg + graph"),
              (312, 130, "LightGBM", "sigmoid-calibrated"), (466, 110, "score", "+ SHAP")]
    for x, w, t, sub in stages:
        f.box(x, 266, w, 54, t, sub, accent=(t == "LightGBM"))
    for k, (x, w, _, _) in enumerate(stages[:-1]):
        f.flow(f"M{x + w},293 L{stages[k + 1][0]},293", 0.1 + k * 0.12, 0.2 + k * 0.12, 3)
    f.text(24, 352, "fraud_probability 0.9645  |  risk: high", 12, "text")
    for i, (k, v) in enumerate([("card1_te", 1.90), ("TransactionAmt", 0.94), ("addr1_unique_cards", 0.90)]):
        y = 376 + i * 22
        f.text(24, y + 4, k, 11)
        f.add(f'<rect x="190" y="{y - 5}" width="{v * 80:.0f}" height="8" rx="3" fill="{c["adam"]}" fill-opacity="0.85"/>')
        f.text(196 + v * 80, y + 4, f"+{v:.2f}", 11, "text")
    f.text(576, 380, "/metrics  Prometheus", 11, "sub", "end")
    f.text(576, 402, "/drift  PSI per feature", 11, "sub", "end")
    f.text(24, f.H - 10, "SHAP response: the repo's example for a real fraudulent transaction", 10)
    return f.svg()


# ------------------------------------------------------- how CashPulse works

def cashpulse_how(theme):
    """The cloud tier's Airflow DAG (ML runs only after 18 dbt tests pass), and a
    30-day forecast with flagged anomalies on illustrative data."""
    f = Fig(theme)
    c, cyc = f.c, 4
    f.label(24, 32, "CLOUD TIER  |  AIRFLOW DAG")
    f.box(24, 46, 150, 66, "raw.*", "Postgres, unvalidated")
    f.box(204, 46, 150, 66, "dbt staging", "typed, cleaned")
    f.box(384, 46, 192, 66, "dbt analytics", "facts, dims, marts")
    f.box(384, 140, 192, 66, "dbt test", "gates the ML tasks")
    f.add(f'<rect x="384" y="140" width="192" height="66" rx="8" fill="none" stroke="{c["mom"]}" '
          f'stroke-width="1.5" opacity="0">{show(0.6, 0.98, cyc)}</rect>')
    ticks = [i / 100 for i in range(101)]
    count = [min(18, max(0, round((t - 0.34) / 0.26 * 18))) for t in ticks]
    kt = ";".join(f"{t:.2f}" for t in ticks)
    for n in range(19):  # the test counter climbs to 18/18
        vals = ";".join("1" if k == n else "0" for k in count)
        f.add(f'<text x="564" y="170" font-size="13" text-anchor="end" fill="{c["mom"] if n == 18 else c["text"]}" '
              f'opacity="0">{n}/18{" ✓" if n == 18 else ""}<animate attributeName="opacity" values="{vals}" '
              f'keyTimes="{kt}" calcMode="discrete" dur="{cyc}s" repeatCount="indefinite"/></text>')
    f.box(204, 140, 150, 66, "ML tasks", "Isolation Forest | GBR", accent=True)
    f.box(24, 140, 150, 66, "Streamlit + BI", "reads ml.* tables")
    f.flow("M174,79 L204,79", 0.00, 0.10, cyc)
    f.flow("M354,79 L384,79", 0.12, 0.22, cyc)
    f.flow("M480,112 L480,140", 0.24, 0.32, cyc)
    f.flow("M384,173 L354,173", 0.62, 0.72, cyc)
    f.flow("M204,173 L174,173", 0.76, 0.86, cyc)

    f.label(24, 246, "30-DAY FORECAST  |  ILLUSTRATIVE DATA")
    f.text(576, 246, "backtest MAE $130 vs naive $524", 11, "mom", "end")
    x0, x1, y0, y1, n = 24, 576, 262, 404, 120
    hist = 90

    def v(i):  # daily net cash flow: weekly rhythm plus a payday at the start of each month
        return 0.35 * math.sin(i / 7 * 2 * math.pi) + 0.9 * math.exp(-((i % 30) - 1) ** 2 / 2) + 0.12 * math.sin(i / 3.1)
    X = lambda i: x0 + (x1 - x0) * i / (n - 1)
    Y = lambda val: y1 - (val + 1.3) / 2.7 * (y1 - y0)
    anomalies = {37: "duplicate charge", 71: "card-testing burst"}
    data = [v(i) - (1.1 if i in anomalies else 0) for i in range(n)]
    tx = X(hist - 1)
    f.add(f'<line x1="{tx:.1f}" y1="{y0}" x2="{tx:.1f}" y2="{y1}" stroke="{c["line"]}" stroke-opacity="0.35" '
          'stroke-dasharray="3 4"/>')
    f.text(tx + 6, y0 + 10, "today", 10)
    band = ([(X(i), Y(v(i) + 0.25 + 0.006 * (i - hist))) for i in range(hist - 1, n)]
            + [(X(i), Y(v(i) - 0.25 - 0.006 * (i - hist))) for i in range(n - 1, hist - 2, -1)])
    dd = 8
    f.add(f'<path d="{pts_d(band)}Z" fill="{c["mom"]}" fill-opacity="0.12" opacity="0">{show(0.6, 1, dd)}</path>')
    f.add(f'<path d="{pts_d([(X(i), Y(data[i])) for i in range(hist)])}" fill="none" stroke="{c["text"]}" '
          f'stroke-opacity="0.75" stroke-width="1.4" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1">'
          f'<animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.6;1" dur="{dd}s" '
          f'repeatCount="indefinite"/></path>')
    f.add(f'<path d="{pts_d([(X(i), Y(v(i))) for i in range(hist - 1, n)])}" fill="none" stroke="{c["mom"]}" '
          f'stroke-width="1.8" stroke-dasharray="5 4" opacity="0">{show(0.6, 1, dd)}</path>')
    for i, name in anomalies.items():
        ax, ay = X(i), Y(data[i])
        f.add(f'<g opacity="0">{show(0.6 * i / (hist - 1), 1, dd)}<circle cx="{ax:.1f}" cy="{ay:.1f}" r="5" '
              f'fill="none" stroke="{c["adam"]}" stroke-width="1.6"/><text x="{ax:.1f}" y="{ay + 18:.1f}" '
              f'font-size="10" text-anchor="middle" fill="{c["adam"]}">{name}</text></g>')
    f.text(24, f.H - 14, "line: daily net cash flow  |  dashed: GBR forecast  |  circles: Isolation Forest flags", 10)
    return f.svg()


# --------------------------------------------------------- how Verity works

def verity_how(theme):
    """Verity's repair stage between any generator and evaluation, with a grid
    of rows that turn invalid at the detector (40%) and are fixed pass by pass
    (the per-pass split is illustrative; the loop converges within three).
    Then the study's finding from the repo README: k-NN and canonical repair
    reach the same validity, but only k-NN raises TSTR AUROC, so that gain is
    real data leaking in."""
    f = Fig(theme)
    c, cyc = f.c, 7
    f.label(24, 32, "PIPELINE  |  BETWEEN ANY GENERATOR AND EVALUATION")
    stages = [(24, "generator", "any model"), (168, "detector", "rules per schema"),
              (312, "repair loop", "≤ 3 passes"), (456, "evaluation", "TSTR | fidelity")]
    for x, t, sub in stages:
        f.box(x, 44, 120, 62, t, sub, accent=(t == "repair loop"))
    for k, (t0, t1) in enumerate([(0.04, 0.12), (0.26, 0.34), (0.68, 0.76)]):
        x = stages[k][0] + 120
        f.flow(f"M{x},75 L{x + 24},75", t0, t1, cyc)

    # 40 rows; 16 (40%) fail the detector scan and are fixed over three passes
    scan0, scan1 = 0.14, 0.24
    rnd = random.Random(7)
    bad = rnd.sample(range(40), 16)
    passes = (0.42, 0.52, 0.62)
    fixed_at = {r: passes[0] if k < 11 else passes[1] if k < 14 else passes[2] for k, r in enumerate(bad)}
    f.label(24, 130, "40 SYNTHETIC ROWS")
    f.text(400, 130, "invalid", 11, "sub", "end")
    f.add(f'<text x="410" y="131" font-size="14" fill="{c["adam"]}" opacity="0">40%{show(scan1, passes[2], cyc)}</text>')
    f.add(f'<text x="410" y="131" font-size="14" fill="{c["mom"]}" opacity="0">0%{show(passes[2], 0.98, cyc)}</text>')
    for k, t in enumerate(passes):
        f.add(f'<text x="{466 + k * 40}" y="130" font-size="10" fill="{c["text"]}" opacity="0.25">p{k + 1}'
              f'{show(t - 0.001, 0.98, cyc, 0.25, 1)}</text>')
    gy, cw, ch = 142, 48, 11
    for i in range(40):
        x, y = 24 + (i % 10) * (cw + 8), gy + (i // 10) * (ch + 7)
        f.add(f'<rect x="{x}" y="{y}" width="{cw}" height="{ch}" rx="3" fill="{c["line"]}" fill-opacity="0.35"/>')
        if i in fixed_at:
            t = fixed_at[i]
            ts = scan0 + (scan1 - scan0) * (i % 10) / 9  # turns red as the scan passes its column
            f.add(f'<rect x="{x}" y="{y}" width="{cw}" height="{ch}" rx="3" fill="{c["adam"]}" opacity="0">'
                  f'{show(ts, t, cyc)}</rect>')
            f.add(f'<rect x="{x}" y="{y}" width="{cw}" height="{ch}" rx="3" fill="none" stroke="{c["mom"]}" '
                  f'stroke-width="1.4" opacity="0">{show(t, 0.98, cyc)}</rect>')
    scan = f'values="20;20;580;580" keyTimes="0;{scan0};{scan1};1" dur="{cyc}s" repeatCount="indefinite"'
    f.add(f'<line x1="20" y1="{gy - 6}" x2="20" y2="{gy + 4 * (ch + 7)}" stroke="{c["text"]}" stroke-opacity="0.7" '
          f'opacity="0">{show(scan0, scan1, cyc)}<animate attributeName="x1" {scan}/><animate attributeName="x2" {scan}/></line>')

    f.label(24, 240, "EXAMPLE ROW")
    f.add(f'<rect x="24" y="250" width="552" height="50" rx="8" fill="none" stroke="{c["line"]}" stroke-opacity="0.35"/>')
    f.text(40, 271, "pdays = -1,", 13, "text")
    f.add(f'<g>{show(0, passes[0], cyc)}')
    f.text(150, 271, "previous = 3", 13, "adam")
    f.text(300, 271, "never contacted, yet 3 prior contacts", 11)
    f.add("</g>")
    f.add(f'<g opacity="0">{show(passes[0], 1, cyc)}')
    f.text(150, 271, "previous = 0", 13, "mom")
    f.text(300, 271, "fixed from the row's own values", 11)
    f.add("</g>")
    f.text(40, 290, "canonical repair, from src/constraint_repair.py", 10)

    f.label(24, 334, "THE FINDING  |  SAME VALIDITY, DIFFERENT UTILITY")
    lo, hi, ax0, ax1 = -0.10, 0.15, 230, 560
    X = lambda v: ax0 + (v - lo) / (hi - lo) * (ax1 - ax0)
    zero, axis_y = X(0), 422
    f.add(f'<line x1="{zero:.1f}" y1="344" x2="{zero:.1f}" y2="{axis_y}" stroke="{c["line"]}" stroke-opacity="0.5"/>')
    f.add(f'<line x1="{ax0}" y1="{axis_y}" x2="{ax1}" y2="{axis_y}" stroke="{c["line"]}" stroke-opacity="0.35"/>')
    for v in (-0.1, 0, 0.1):
        f.text(X(v), axis_y + 13, f"{v:+.1f}" if v else "0", 10, "sub", "middle")
    for y, name, sub, a, b, col, lab in [
            (364, "k-NN repair", "copies real records", 0.08, 0.12, "adam", "+0.08 to +0.12"),
            (402, "canonical repair", "row's own values only", -0.07, -0.01, "mom", "−0.07 to −0.01")]:
        f.text(24, y, name, 13, "text")
        f.text(24, y + 15, sub, 10)
        f.add(f'<rect x="{X(a):.1f}" y="{y - 10}" width="{X(b) - X(a):.1f}" height="12" rx="4" fill="{c[col]}"/>')
        f.text(X(a) - 8, y, lab, 11, col, "end")
    f.text(24, f.H - 8, "change in TSTR AUROC, weak generator; both at 0% invalid  →  the k-NN gain was leakage", 10.5, "mom")
    return f.svg()


if __name__ == "__main__":
    os.makedirs("assets", exist_ok=True)
    for theme in THEMES:
        for name, fn in (("outage-sim", lambda t: outage(t, strip=False)),
                         ("gateio-how", howitworks), ("fraud-how", fraud_how),
                         ("cashpulse-how", cashpulse_how), ("verity-how", verity_how), ("tala", tala)):
            with open(f"assets/{name}-{theme}.svg", "w", encoding="utf-8") as fh:
                fh.write(fn(theme))
