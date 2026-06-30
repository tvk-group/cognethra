import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { LOCALES } from "./locales.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const i18nDir = path.join(__dirname, "..", "i18n");

function flattenKeys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return flattenKeys(value, next);
    }
    return [next];
  });
}

const en = JSON.parse(fs.readFileSync(path.join(i18nDir, "en.json"), "utf8"));
const enKeys = new Set(flattenKeys(en));

let failed = false;

for (const locale of LOCALES) {
  const file = path.join(i18nDir, `${locale.code}.json`);
  if (!fs.existsSync(file)) {
    console.error(`MISSING: i18n/${locale.code}.json`);
    failed = true;
    continue;
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const keys = new Set(flattenKeys(data));
  for (const key of enKeys) {
    if (!keys.has(key)) {
      console.error(`${locale.code}: missing key ${key}`);
      failed = true;
    }
  }
  for (const key of keys) {
    if (!enKeys.has(key)) {
      console.error(`${locale.code}: extra key ${key}`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log(`All ${LOCALES.length} locale files validated against en.json.`);
