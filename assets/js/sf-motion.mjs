/** 两下之间超过这个间隔，前面的输入作废。摇杆招式本来就不能慢慢搓。 */
export const INPUT_WINDOW_MS = 700;

const DIAGONAL_PAIRS = [
  ["down", "right", "down-right"],
  ["down", "left", "down-left"],
  ["up", "right", "up-right"],
  ["up", "left", "up-left"],
];

const CARDINALS = ["down", "up", "left", "right"];

export const MOTIONS = [
  {
    id: "hadouken",
    nameKey: "sf.hadouken",
    steps: ["down", "down-right", "right", "punch"],
  },
  {
    id: "shoryu",
    nameKey: "sf.shoryu",
    steps: ["right", "down", "down-right", "punch"],
  },
  {
    id: "tatsu",
    nameKey: "sf.tatsu",
    steps: ["down", "down-left", "left", "kick"],
  },
];

/**
 * 同时按住的方向合成摇杆方向。斜向优先于单方向。
 * @param {string[]} held
 * @returns {string | null}
 */
export function directionFromHeld(held) {
  const names = new Set(held);
  const diagonal = DIAGONAL_PAIRS.find((pair) => names.has(pair[0]) && names.has(pair[1]));
  if (diagonal) return diagonal[2];
  return CARDINALS.find((name) => names.has(name)) ?? null;
}

/** 626：前、下、再按前。松手后不必经过斜下，也算升龙。 */
const SHORYU_SHORTCUT = ["right", "down", "right", "punch"];

export const MOTION_PATTERNS = [
  MOTIONS[0],
  MOTIONS[1],
  { id: "shoryu", nameKey: "sf.shoryu", steps: SHORYU_SHORTCUT },
  MOTIONS[2],
];

/**
 * 打完就用这一招自己的声音，不跟卡片上一次提示走。
 * @param {string} motionId
 * @param {boolean} done
 * @returns {string} 空字符串表示不播放
 */
export function effectForMotion(motionId, done) {
  if (!done || !motionId) return "";
  return motionId;
}

/**
 * 输入序列末尾有多长是这条招式的前缀。
 * @param {string[]} steps
 * @param {string[]} inputs
 * @returns {number}
 */
function prefixScore(steps, inputs) {
  const limit = Math.min(steps.length, inputs.length);
  for (let length = limit; length > 0; length -= 1) {
    const tail = inputs.slice(inputs.length - length);
    const head = steps.slice(0, length);
    const matched = tail.every((step, index) => step === head[index]);
    if (matched) return length;
  }
  return 0;
}

/**
 * @param {string[]} inputs
 * @param {boolean} completeOnly
 * @returns {{ pattern: { id: string, nameKey: string, steps: string[] }, score: number } | null}
 */
function bestPattern(inputs, completeOnly) {
  let best = null;
  for (const pattern of MOTION_PATTERNS) {
    const score = prefixScore(pattern.steps, inputs);
    const complete = score === pattern.steps.length;
    if (score === 0 || completeOnly !== complete) continue;
    if (!best || score > best.score) best = { pattern, score };
  }
  return best;
}

/**
 * @param {string[]} buffer
 * @param {{ id: string, nameKey: string, steps: string[] } | null} pattern
 * @param {number} progress
 * @param {boolean} done
 * @param {boolean} failed
 */
function motionOutcome(buffer, pattern, progress, done, failed) {
  return { buffer, motion: pattern, progress, done, failed };
}

/**
 * 把新的一记并进缓冲区，看末尾是不是任意一招。
 * 623 和 626 都认出升龙；打完的是哪招，调用方就播哪招。
 * @param {string[]} buffer
 * @param {string} input
 * @param {number} elapsedMs
 * @returns {{
 *   buffer: string[],
 *   motion: { id: string, nameKey: string, steps: string[] } | null,
 *   progress: number,
 *   done: boolean,
 *   failed: boolean,
 * }}
 */
export function pushMotionInput(buffer, input, elapsedMs) {
  const expired = buffer.length > 0 && elapsedMs > INPUT_WINDOW_MS;
  const base = expired ? [] : buffer;
  const inputs = [...base, input];
  const completed = bestPattern(inputs, true);
  if (completed) {
    return motionOutcome([], completed.pattern, completed.score, true, false);
  }
  const partial = bestPattern(inputs, false);
  if (partial) {
    const kept = inputs.slice(inputs.length - partial.score);
    return motionOutcome(kept, partial.pattern, partial.score, false, false);
  }
  const restarted = bestPattern([input], false);
  if (restarted) {
    return motionOutcome([input], restarted.pattern, restarted.score, false, base.length > 0);
  }
  const failed = base.length > 0 || expired;
  return motionOutcome([], null, 0, false, failed);
}

/**
 * 推进一步招式。超时后这一下只用来重新开头。
 * @param {string[]} steps
 * @param {number} progress
 * @param {string} input
 * @param {number} elapsedMs 距离上一记的毫秒，还没开始时传 0
 * @returns {{ progress: number, done: boolean, failed: boolean }}
 */
export function advanceMotion(steps, progress, input, elapsedMs) {
  const timedOut = progress > 0 && elapsedMs > INPUT_WINDOW_MS;
  const start = timedOut ? 0 : progress;
  if (input === steps[start]) {
    const next = start + 1;
    return { progress: next, done: next === steps.length, failed: false };
  }
  if (start > 0 && input === steps[0]) {
    return { progress: 1, done: false, failed: false };
  }
  const failed = start > 0 || timedOut;
  return { progress: 0, done: false, failed };
}
