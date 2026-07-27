// Liest die Inhalte aus den TypeScript-Quellen (content.ts, stage-lessons.ts,
// deep-dives.ts) via TypeScript-Transpiler und schreibt sie als content.json
// in das Build-Verzeichnis. So bleiben die PDFs immer in sync mit den Inhalten.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.env.REPO_ROOT || path.resolve(HERE, "..", "..");
const BUILD = process.env.BUILD_DIR || path.join(HERE, ".build");
fs.mkdirSync(BUILD, { recursive: true });

function loadTs(rel, tag) {
  const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  }).outputText;
  const tmp = path.join(BUILD, `._extract_${tag}.cjs`);
  fs.writeFileSync(tmp, js);
  try {
    return require(tmp);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

const content = loadTs("src/lib/content.ts", "content");
const lessons = loadTs("src/lib/stage-lessons.ts", "lessons");
const dives = loadTs("src/lib/deep-dives.ts", "dives");

const out = {
  stages: content.stages,
  stageLessons: lessons.stageLessons,
  deepDives: dives.deepDives,
};
fs.writeFileSync(path.join(BUILD, "content.json"), JSON.stringify(out, null, 2));
console.log(
  `content.json: ${out.stages.length} Stufen, ${out.stageLessons.length} Lektionen, ${out.deepDives.length} Vertiefungen`,
);
