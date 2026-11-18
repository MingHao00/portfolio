import assert from "node:assert/strict";
import test from "node:test";
import { advanceMotion, directionFromHeld, effectForMotion, pushMotionInput } from "./sf-motion.mjs";

const HADOUKEN = ["down", "down-right", "right", "punch"];
const SHORYU_623 = ["right", "down", "down-right", "punch"];
const SHORYU_626 = ["right", "down", "right", "punch"];
const TATSU = ["down", "down-left", "left", "kick"];

function roll(inputs) {
  let state = { buffer: [] };
  for (const input of inputs) {
    state = pushMotionInput(state.buffer, input, 100);
  }
  return state;
}

test("按住下和右就是斜下", () => {
  assert.equal(directionFromHeld(["down", "right"]), "down-right");
  assert.equal(directionFromHeld(["down"]), "down");
  assert.equal(directionFromHeld([]), null);
});

test("波动拳按顺序打完", () => {
  let progress = 0;
  let done = false;
  for (const input of HADOUKEN) {
    const result = advanceMotion(HADOUKEN, progress, input, 100);
    progress = result.progress;
    done = result.done;
  }
  assert.equal(done, true);
  assert.equal(progress, HADOUKEN.length);
});

test("中途按错就回到开头", () => {
  const result = advanceMotion(HADOUKEN, 1, "left", 100);
  assert.equal(result.failed, true);
  assert.equal(result.progress, 0);
});

test("间隔太久不能接着打，但这一下可以当新的开头", () => {
  const result = advanceMotion(HADOUKEN, 2, "down", 800);
  assert.equal(result.failed, false);
  assert.equal(result.progress, 1);
});

test("打完才放出对应的招式效果", () => {
  assert.equal(effectForMotion("hadouken", true), "hadouken");
  assert.equal(effectForMotion("shoryu", true), "shoryu");
  assert.equal(effectForMotion("hadouken", false), "");
  assert.equal(effectForMotion("tatsu", true), "tatsu");
});

test("623 和 626 都打出升龙拳", () => {
  const classic = roll(SHORYU_623);
  const shortcut = roll(SHORYU_626);
  assert.equal(classic.done, true);
  assert.equal(classic.motion.id, "shoryu");
  assert.equal(shortcut.done, true);
  assert.equal(shortcut.motion.id, "shoryu");
  assert.deepEqual(shortcut.motion.steps, SHORYU_626);
});

test("搓到哪一招就用哪一招的声音", () => {
  const hadouken = roll(HADOUKEN);
  const tatsu = roll(TATSU);
  assert.equal(hadouken.motion.id, "hadouken");
  assert.equal(effectForMotion(hadouken.motion.id, hadouken.done), "hadouken");
  assert.equal(effectForMotion(tatsu.motion.id, tatsu.done), "tatsu");
});

test("626 第三下按下时还没出拳，已经认成升龙", () => {
  const result = roll(SHORYU_626.slice(0, 3));
  assert.equal(result.done, false);
  assert.equal(result.motion.id, "shoryu");
  assert.equal(result.progress, 3);
});

test("还没开始时按错不记失败", () => {
  const result = advanceMotion(HADOUKEN, 0, "kick", 0);
  assert.equal(result.failed, false);
  assert.equal(result.progress, 0);
});
