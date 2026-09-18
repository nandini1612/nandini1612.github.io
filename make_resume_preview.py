"""
Regenerate the in-page résumé preview image(s) from a PDF.

Usage:
    pip install pymupdf                      # one-time
    python make_resume_preview.py            # uses resume.pdf
    python make_resume_preview.py resume-us.pdf

Writes <stem>.png for a 1-page CV, or <stem>-1.png, <stem>-2.png ... for a
multi-page CV (e.g. resume.pdf -> resume-preview.png; resume-us.pdf ->
resume-us.png). Then list the file(s) in that format's `preview` array in
content.js -> meta.resumes.
"""
import os
import sys
import pymupdf  # pip install pymupdf

PDF = sys.argv[1] if len(sys.argv) > 1 else "resume.pdf"
ZOOM = 2.4  # higher = sharper (and larger file). 2.4 ≈ 173 dpi.

# resume.pdf keeps its historical "resume-preview" stem; others use their own.
stem = "resume-preview" if PDF == "resume.pdf" else os.path.splitext(os.path.basename(PDF))[0]

doc = pymupdf.open(PDF)
mat = pymupdf.Matrix(ZOOM, ZOOM)
names = []
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=mat, alpha=False)
    name = f"{stem}.png" if doc.page_count == 1 else f"{stem}-{i+1}.png"
    pix.save(name)
    names.append(name)
    print(f"saved {name}  ({pix.width}x{pix.height})")

print("\nSet this format's `preview` in content.js -> meta.resumes to:")
print("  " + repr(names if len(names) > 1 else [names[0]]))
