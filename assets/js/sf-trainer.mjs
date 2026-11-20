import { directionFromHeld, effectForMotion, pushMotionInput } from "./sf-motion.mjs";

const KEY_TO_DIR = {
  ArrowDown: "down",
  ArrowUp: "up",
  ArrowLeft: "left",
  ArrowRight: "right",
  KeyS: "down",
  KeyW: "up",
  KeyA: "left",
  KeyD: "right",
};

const KEY_TO_BUTTON = {
  KeyU: "punch",
  KeyJ: "kick",
};

const STEP_GLYPH = {
  down: "↓",
  up: "↑",
  left: "←",
  right: "→",
  "down-right": "↘",
  "down-left": "↙",
  "up-right": "↗",
  "up-left": "↖",
};

function text(key) {
  return window.I18N?.t ? window.I18N.t(key) : key;
}

function stepLabel(step) {
  if (step === "punch" || step === "kick") return text(`sf.${step}`);
  return STEP_GLYPH[step] ?? step;
}

function paint(root, motion, progress) {
  root.querySelector("[data-sf-name]").textContent = text(motion.nameKey);
  const steps = root.querySelector("[data-sf-steps]");
  steps.replaceChildren(...motion.steps.map((step, index) => {
    const mark = document.createElement("span");
    mark.textContent = stepLabel(step);
    if (index < progress) mark.classList.add("is-done");
    return mark;
  }));
}

function paintIdle(root) {
  root.querySelector("[data-sf-name]").textContent = "";
  root.querySelector("[data-sf-steps]").replaceChildren();
}

function showMotion(session, motion, progress) {
  session.shown = motion;
  session.shownProgress = progress;
  if (!motion) {
    paintIdle(session.root);
    return;
  }
  paint(session.root, motion, progress);
}

function playClip(root, effect) {
  const audio = root.querySelector(`[data-sf-sound="${effect}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch((error) => {
    root.dataset.soundError = error instanceof Error ? error.name : "failed";
  });
}

function playEffect(root, effect) {
  const node = root.querySelector(`[data-sf-effect="${effect}"]`);
  if (node) {
    node.classList.remove("is-fired");
    void node.offsetWidth;
    node.classList.add("is-fired");
  }
  playClip(root, effect);
}

function feed(session, input) {
  const now = performance.now();
  const elapsed = session.lastAt === 0 ? 0 : now - session.lastAt;
  const result = pushMotionInput(session.buffer, input, elapsed);
  session.buffer = result.buffer;
  session.lastAt = result.buffer.length === 0 ? 0 : now;
  session.root.classList.toggle("is-miss", result.failed);
  showMotion(session, result.motion, result.progress);
  const effect = effectForMotion(result.motion?.id, result.done);
  if (effect) playEffect(session.root, effect);
}

function emitDirection(session) {
  const heldNames = [...session.held].map((code) => KEY_TO_DIR[code]).filter(Boolean);
  const next = directionFromHeld(heldNames);
  if (!next) {
    session.lastDirection = null;
    return;
  }
  if (next === session.lastDirection) return;
  session.lastDirection = next;
  feed(session, next);
}

function listensToKeys(root) {
  const active = document.activeElement;
  return root.matches(":hover") || root === active || root.contains(active);
}

function bindKeyboard(root, session) {
  document.addEventListener("keydown", (event) => {
    if (!listensToKeys(root)) return;
    const button = KEY_TO_BUTTON[event.code];
    const dirKey = KEY_TO_DIR[event.code];
    if (!button && !dirKey) return;
    event.preventDefault();
    if (event.repeat) return;
    if (button) {
      session.lastDirection = null;
      feed(session, button);
      return;
    }
    session.held.add(event.code);
    emitDirection(session);
  });
  document.addEventListener("keyup", (event) => {
    if (!session.held.has(event.code)) return;
    session.held.delete(event.code);
    emitDirection(session);
  });
}

function mountTrainer(root) {
  const session = {
    root,
    held: new Set(),
    buffer: [],
    shown: null,
    shownProgress: 0,
    lastAt: 0,
    lastDirection: null,
  };
  bindKeyboard(root, session);
  document.getElementById("langMenu")?.addEventListener("click", () => {
    showMotion(session, session.shown, session.shownProgress);
  });
  showMotion(session, null, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-sf-trainer]");
  if (root) mountTrainer(root);
});
