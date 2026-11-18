import assert from "node:assert/strict";
import test from "node:test";
import { shouldRenderGlobe } from "./globe-run.mjs";

const visible = { inView: true, pageVisible: true, reducedMotion: false };

test("看得到才继续画地球", () => {
  assert.equal(shouldRenderGlobe(visible), true);
  assert.equal(shouldRenderGlobe({ ...visible, inView: false }), false);
});

test("页面在后台时停画", () => {
  assert.equal(shouldRenderGlobe({ ...visible, pageVisible: false }), false);
});

test("减少动效时停画", () => {
  assert.equal(shouldRenderGlobe({ ...visible, reducedMotion: true }), false);
});
