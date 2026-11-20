import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const HARNESS_URL = "https://github.com/MingHao00/harness-framework";
const CARD_ORDER = [
  "https://doi.org/10.3390/su16188227",
  HARNESS_URL,
  "https://github.com/MingHao00/ElderBrain",
  "https://github.com/MingHao00/portfolio",
];

function readSiteFile(name) {
  return readFileSync(join(ROOT, name), "utf8");
}

test("精选项目按约定顺序排四张卡", () => {
  const page = readSiteFile("index.html");
  const gridStart = page.indexOf('class="project-grid"');
  const grid = page.slice(gridStart, page.indexOf("</section>", gridStart));
  let previous = -1;
  for (const url of CARD_ORDER) {
    const at = grid.indexOf(url);
    assert.ok(at > previous, url);
    previous = at;
  }
  assert.match(grid, /assets\/images\/project-harness\.jpg/);
  assert.equal(existsSync(join(ROOT, "assets/images/project-harness.jpg")), true);
});

test("中英文案介绍 Harness 的四样组成", () => {
  const messages = readSiteFile("assets/js/i18n.js");
  assert.match(messages, /'p4\.name': 'Harness'/);
  assert.match(messages, /'p4\.desc': '给 Cursor 用的技能、钩子、规则和子代理/);
  assert.match(
    messages,
    /'p4\.desc': 'Skills, hooks, rules, and subagents for Cursor/,
  );
});
