"""Generate the section figures. Pure standard library; writes into assets/.

outage-*.svg  a simulated 10 s GPS outage: the aircraft turns, the
              hold-last-velocity estimate does not, plus GateIO's measured
              drift numbers (leave-one-flight-out, from the paper).
tala-*.svg    one cycle of Adi tala (8 beats: laghu 4 + drutam 2 + drutam 2)
              in real time at 60 bpm, with tha-ka-dhi-mi in the three speeds
              adavus are practised in: 1, 2 and 4 syllables per beat.
"""
import math
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


def outage(theme):
    c = THEMES[theme]
    W, H = 900, 350
    x0, y0, pre = 50, 228, 300
    before = [(x0 + i, y0) for i in range(0, pre + 1, 10)]
    # outage leg: short straight, a left turn, then straight again
    after, (x, y), hdg, r = [], before[-1], 0.0, 220
    for _ in range(3):
        x += 10; after.append((x, y))
    turn = math.radians(32)
    n = 40
    for _ in range(n):
        hdg += turn / n
        x += r * turn / n * math.cos(hdg); y -= r * turn / n * math.sin(hdg)
        after.append((x, y))
    out_len = 440
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
         f'<g font-family="{FONT}" font-size="12">']
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
             f'<text x="{(ex + tx) / 2 + 10:.1f}" y="{(ey + ty) / 2 + 4:.1f}" fill="{c["adam"]}">endpoint drift</text></g>')
    cx, cy = before[-1]
    p.append(f'<line x1="{cx}" y1="{cy - 14}" x2="{cx}" y2="{cy + 14}" stroke="{c["sub"]}" stroke-width="1"/>')
    p.append(f'<text x="{cx}" y="{cy + 30}" fill="{c["sub"]}" text-anchor="middle">GPS lost</text>')
    p.append(f'<text x="{x0}" y="{y0 + 30}" fill="{c["sub"]}">GPS fixes</text>')
    lx, ly = 22, 32
    for i, (col, label) in enumerate([(c["mom"], "true flight"), (c["sgd"], "hold last velocity")]):
        p.append(f'<rect x="{lx + i * 150}" y="{ly - 7}" width="14" height="3" rx="1.5" fill="{col}"/>')
        p.append(f'<text x="{lx + i * 150 + 20}" y="{ly - 2}" fill="{c["text"]}">{label}</text>')
    p.append(f'<text x="{W - 22}" y="{ly - 2}" fill="{c["sub"]}" text-anchor="end">simulated, not model output</text>')

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


if __name__ == "__main__":
    os.makedirs("assets", exist_ok=True)
    for theme in THEMES:
        for name, fn in (("outage", outage), ("tala", tala)):
            with open(f"assets/{name}-{theme}.svg", "w", encoding="utf-8") as fh:
                fh.write(fn(theme))
