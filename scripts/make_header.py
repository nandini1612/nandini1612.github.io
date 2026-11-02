"""Generate the animated profile header: SGD, momentum and Adam descending the
same loss surface from the same start. Pure standard library; writes
assets/descent-dark.svg and assets/descent-light.svg."""
import math
import os

W, H = 900, 300
X0, X1, Y0, Y1 = -4.5, 4.5, -1.5, 1.5
START = (-4.0, 1.15)


def f(x, y):
    # curved, ill-conditioned valley ending in a global basin on the right,
    # with a shallow side basin the plain-gradient method can fall into
    valley = 0.045 * (x - 3.2) ** 2 + 1.6 * (y - 0.55 * math.sin(0.85 * x)) ** 2
    trap = 0.25 * math.exp(-((x + 1.2) ** 2 + (y + 0.25) ** 2) / 0.2)
    goal = 0.35 * math.exp(-((x - 3.2) ** 2 + (y + 0.1) ** 2) / 0.6)
    return valley - trap - goal


def grad(x, y, h=1e-5):
    return ((f(x + h, y) - f(x - h, y)) / (2 * h),
            (f(x, y + h) - f(x, y - h)) / (2 * h))


def run(opt, steps):
    x, y = START
    vx = vy = mx = my = sx = sy = 0.0
    pts = [(x, y)]
    for t in range(1, steps + 1):
        gx, gy = grad(x, y)
        if opt == "sgd":
            x -= 0.06 * gx; y -= 0.06 * gy
        elif opt == "momentum":
            vx = 0.9 * vx - 0.02 * gx; vy = 0.9 * vy - 0.02 * gy
            x += vx; y += vy
        else:  # adam
            b1, b2, lr = 0.9, 0.999, 0.06
            mx = b1 * mx + (1 - b1) * gx; my = b1 * my + (1 - b1) * gy
            sx = b2 * sx + (1 - b2) * gx * gx; sy = b2 * sy + (1 - b2) * gy * gy
            mhx, mhy = mx / (1 - b1 ** t), my / (1 - b1 ** t)
            shx, shy = sx / (1 - b2 ** t), sy / (1 - b2 ** t)
            x -= lr * mhx / (math.sqrt(shx) + 1e-8)
            y -= lr * mhy / (math.sqrt(shy) + 1e-8)
        pts.append((x, y))
    return pts


def px(x, y):
    return ((x - X0) / (X1 - X0) * W, (Y1 - y) / (Y1 - Y0) * H)


def contours(levels, nx=240, ny=80):
    xs = [X0 + (X1 - X0) * i / nx for i in range(nx + 1)]
    ys = [Y0 + (Y1 - Y0) * j / ny for j in range(ny + 1)]
    Z = [[f(x, y) for x in xs] for y in ys]
    out = []
    for lv in levels:
        segs = []
        for j in range(ny):
            for i in range(nx):
                c = [(xs[i], ys[j], Z[j][i]), (xs[i + 1], ys[j], Z[j][i + 1]),
                     (xs[i + 1], ys[j + 1], Z[j + 1][i + 1]), (xs[i], ys[j + 1], Z[j + 1][i])]
                cross = []
                for k in range(4):
                    a, b = c[k], c[(k + 1) % 4]
                    if (a[2] < lv) != (b[2] < lv):
                        t = (lv - a[2]) / (b[2] - a[2])
                        cross.append((round(a[0] + t * (b[0] - a[0]), 6),
                                      round(a[1] + t * (b[1] - a[1]), 6)))
                if len(cross) == 2:
                    segs.append(tuple(cross))
                elif len(cross) == 4:
                    segs += [(cross[0], cross[1]), (cross[2], cross[3])]
        out.append((lv, chain(segs)))
    return out


def chain(segs):
    # join marching-squares segments into polylines via shared endpoints
    adj = {}
    for s in segs:
        for p in s:
            adj.setdefault(p, []).append(s)
    used, lines = set(), []
    for s in segs:
        if s in used:
            continue
        used.add(s)
        line = [s[0], s[1]]
        for end in (1, 0):
            while True:
                tip = line[-1] if end else line[0]
                nxt = next((o for o in adj[tip] if o not in used), None)
                if nxt is None:
                    break
                used.add(nxt)
                q = nxt[1] if nxt[0] == tip else nxt[0]
                line.append(q) if end else line.insert(0, q)
        lines.append(line)
    return lines


def d_attr(points, every=1):
    pts = [px(*p) for p in points[::every]]
    return "M" + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts)


THEMES = {
    # the portfolio's espresso / cream / azure palette (see styles.css tokens)
    "dark": dict(bg="#3b2a21", line="#d3c4a2", text="#f5edd4", sub="#a08d72",
                 sgd="#fef0b6", mom="#bbd3e0", adam="#e8a17a"),
    "light": dict(bg="#fffdf6", line="#6b5849", text="#3d2a20", sub="#9d8a78",
                  sgd="#a8842a", mom="#3f7d97", adam="#c0643f"),
}


def build(theme):
    c = THEMES[theme]
    zmin = min(f(X0 + 9 * i / 300, Y0 + 3 * j / 100) for i in range(301) for j in range(101))
    levels = [zmin + 0.02 + (k / 18) ** 1.8 * 2.6 for k in range(19)]
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
             f'<rect width="{W}" height="{H}" rx="10" fill="{c["bg"]}"/>',
             '<g fill="none" stroke-linejoin="round">']
    for lv, lines in contours(levels):
        op = 0.45 - 0.33 * (lv - zmin) / 2.6
        for ln in lines:
            if len(ln) > 3:
                parts.append(f'<path d="{d_attr(ln, 2)}" stroke="{c["line"]}" stroke-opacity="{op:.2f}" stroke-width="1"/>')
    parts.append("</g>")

    dur, draw = 10, 0.8  # seconds per loop; fraction of loop spent descending
    runs = [("sgd", "SGD | local min", 280), ("momentum", "momentum | global", 280),
            ("adam", "Adam | global", 280)]
    for key, label, steps in runs:
        col = c["mom" if key == "momentum" else key]
        pts = run(key, steps)[::2]
        d = d_attr(pts)
        # one optimizer step per tick, so on-screen speed is real step size
        sp = [px(*p) for p in pts]
        cum = [0.0]
        for a, b in zip(sp, sp[1:]):
            cum.append(cum[-1] + math.dist(a, b))
        frac = [v / cum[-1] for v in cum]
        times = [draw * i / (len(pts) - 1) for i in range(len(pts))] + [1]
        frac += [1.0]
        kt = ";".join(f"{t:.4f}" for t in times)
        kp = ";".join(f"{v:.4f}" for v in frac)
        off = ";".join(f"{1 - v:.4f}" for v in frac)
        parts.append(
            f'<path d="{d}" fill="none" stroke="{col}" stroke-width="2" stroke-linecap="round" '
            f'pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1">'
            f'<animate attributeName="stroke-dashoffset" values="{off}" keyTimes="{kt}" '
            f'dur="{dur}s" repeatCount="indefinite"/></path>')
        parts.append(
            f'<circle r="4.5" fill="{col}"><animateMotion path="{d}" keyPoints="{kp}" '
            f'keyTimes="{kt}" calcMode="linear" dur="{dur}s" repeatCount="indefinite"/></circle>')

    sx, sy = px(*START)
    gx, gy = px(*run("adam", 400)[-1])
    parts.append(f'<circle cx="{sx:.1f}" cy="{sy:.1f}" r="3" fill="none" stroke="{c["text"]}" stroke-width="1.2"/>')
    parts.append(f'<path d="M{gx - 5:.1f},{gy - 5:.1f} l10,10 m0,-10 l-10,10" stroke="{c["text"]}" '
                 'stroke-width="1.4" stroke-linecap="round"/>')
    font = "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"
    parts.append(f'<g font-family="{font}" font-size="12">')
    lx, ly = 22, H - 22
    for i, (key, label, _) in enumerate(runs):
        col = c["mom" if key == "momentum" else key]
        x = lx + i * 160
        parts.append(f'<rect x="{x}" y="{ly - 9}" width="14" height="3" rx="1.5" fill="{col}"/>')
        parts.append(f'<text x="{x + 20}" y="{ly - 4}" fill="{c["text"]}">{label}</text>')
    parts.append(f'<text x="{W - 22}" y="{ly - 4}" fill="{c["sub"]}" text-anchor="end" xml:space="preserve">'
                 'same surface  |  same start  |  different optimizers</text>')
    parts.append("</g></svg>")
    return "\n".join(parts)


if __name__ == "__main__":
    os.makedirs("assets", exist_ok=True)
    for key in ("sgd", "momentum", "adam"):
        p = run(key, 280)
        print(key, "end", tuple(round(v, 2) for v in p[-1]), "loss", round(f(*p[-1]), 3))
    for theme in THEMES:
        svg = build(theme)
        with open(f"assets/descent-{theme}.svg", "w", encoding="utf-8") as fh:
            fh.write(svg)
        print(theme, f"{len(svg) / 1024:.0f} KB")
