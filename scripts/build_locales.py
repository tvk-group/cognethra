#!/usr/bin/env python3
import json, copy
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
I18N = ROOT / "i18n"

with open(I18N / "en.json", encoding="utf-8") as f:
    EN = json.load(f)

def flatten(obj, prefix=""):
    out = {}
    if isinstance(obj, dict):
        for k, v in obj.items():
            out.update(flatten(v, f"{prefix}.{k}" if prefix else k))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            out.update(flatten(v, f"{prefix}[{i}]"))
    else:
        out[prefix] = obj
    return out

def set_by_path(obj, path, value):
    import re
    parts = re.split(r'\.|\[|\]', path)
    parts = [p for p in parts if p != '']
    cur = obj
    for i, part in enumerate(parts[:-1]):
        if part.isdigit():
            cur = cur[int(part)]
        else:
            cur = cur[part]
    last = parts[-1]
    if last.isdigit():
        cur[int(last)] = value
    else:
        cur[last] = value

def apply_locale(base, flat_trans):
    result = copy.deepcopy(base)
    for path, value in flat_trans.items():
        set_by_path(result, path, value)
    return result

# Load flat translations from companion files
LOCALES = ["tr", "de", "fr", "es", "it"]
en_flat = flatten(EN)

for loc in LOCALES:
    flat_file = I18N / f".{loc}.flat.json"
    if not flat_file.exists():
        print(f"Missing {flat_file}")
        continue
    with open(flat_file, encoding="utf-8") as f:
        trans = json.load(f)
    missing = set(en_flat) - set(trans)
    extra = set(trans) - set(en_flat)
    if missing:
        print(f"{loc}: missing {len(missing)} keys")
    if extra:
        print(f"{loc}: extra {len(extra)} keys")
    out = apply_locale(EN, trans)
    out_path = I18N / f"{loc}.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"Wrote {out_path}")

