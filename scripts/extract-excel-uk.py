#!/usr/bin/env python3
"""Extracts the UK partner-university workbook (xlsx) to JSON using only the stdlib.

Reads the "Jan 2027 Intake" and "Process Maps" tabs and writes
scripts/excel-raw/uk-jan2027.json (git-ignored), which scripts/import-excel-uk.mjs consumes.

Usage: python3 scripts/extract-excel-uk.py "<path to .xlsx>"
"""
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

M = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
OUT = Path(__file__).resolve().parent / "excel-raw" / "uk-jan2027.json"


def col_index(ref: str) -> int:
    n = 0
    for ch in re.match(r"[A-Z]+", ref).group():
        n = n * 26 + ord(ch) - 64
    return n


def main(path: str) -> None:
    z = zipfile.ZipFile(path)
    shared = [
        "".join(t.text or "" for t in si.iter(f"{{{M}}}t"))
        for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall(f"{{{M}}}si")
    ]
    rels = {r.get("Id"): r.get("Target") for r in ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))}
    sheets = {
        s.get("name"): "xl/" + rels[s.get(f"{{{R}}}id")].lstrip("/").removeprefix("xl/")
        for s in ET.fromstring(z.read("xl/workbook.xml")).find(f"{{{M}}}sheets")
    }

    def read(name: str) -> list[dict[str, str]]:
        rows = []
        for row in ET.fromstring(z.read(sheets[name])).iter(f"{{{M}}}row"):
            cells = {}
            for c in row.findall(f"{{{M}}}c"):
                v = c.find(f"{{{M}}}v")
                if v is not None:
                    cells[col_index(c.get("r"))] = shared[int(v.text)] if c.get("t") == "s" else v.text
            if cells:
                rows.append(cells)
        header = rows[0]
        return [{header[k]: v for k, v in r.items() if k in header} for r in rows[1:]]

    out = {"jan2027": read("Jan 2027 Intake"), "processMaps": read("Process Maps")}
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Wrote {OUT} ({len(out['jan2027'])} universities, {len(out['processMaps'])} process maps)")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
