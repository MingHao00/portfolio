import createGlobe from "./cobe.mjs";
import { markerUnderPoint } from "./hobby-globe-math.mjs";

const GLOBE_PX = 600;
const PIXEL_RATIO = 2;
const PHI_STEP = 0.01;
const MARKER_SIZE = 0.06;
const TIP_OFFSET_PX = 14;
const TIP_MARGIN_PX = 8;

// 比赛常去的城市，只标在地球上，不表示已经去过。
const MARKERS = [
  {
    location: [35.6762, 139.6503],
    size: MARKER_SIZE,
    labelKey: "hobby4.m1",
    countryKey: "hobby4.m1c",
  },
  {
    location: [34.0522, -118.2437],
    size: MARKER_SIZE,
    labelKey: "hobby4.m2",
    countryKey: "hobby4.m2c",
  },
  {
    location: [48.8566, 2.3522],
    size: MARKER_SIZE,
    labelKey: "hobby4.m3",
    countryKey: "hobby4.m3c",
  },
  {
    location: [37.5665, 126.978],
    size: MARKER_SIZE,
    labelKey: "hobby4.m4",
    countryKey: "hobby4.m4c",
  },
];

function translate(key) {
  const lookup = window.I18N?.t;
  return lookup ? lookup(key) : key;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function placeTip(tip, clientX, clientY) {
  tip.hidden = false;
  const left = Math.min(
    clientX + TIP_OFFSET_PX,
    window.innerWidth - tip.offsetWidth - TIP_MARGIN_PX,
  );
  const top = Math.min(
    clientY + TIP_OFFSET_PX,
    window.innerHeight - tip.offsetHeight - TIP_MARGIN_PX,
  );
  tip.style.left = `${Math.max(TIP_MARGIN_PX, left)}px`;
  tip.style.top = `${Math.max(TIP_MARGIN_PX, top)}px`;
}

function showMarker(tip, marker, clientX, clientY) {
  const label = tip.querySelector(".hobby-globe-tip-label");
  const country = tip.querySelector(".hobby-globe-tip-country");
  label.textContent = translate(marker.labelKey);
  country.textContent = translate(marker.countryKey);
  placeTip(tip, clientX, clientY);
}

function hideMarker(cell, tip, spin) {
  spin.paused = false;
  tip.hidden = true;
  cell.style.cursor = "";
}

function bindHover(cell, canvas, tip, spin) {
  cell.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const found = markerUnderPoint(
      MARKERS,
      spin.phi,
      rect.width,
      rect.height,
      event.clientX - rect.left,
      event.clientY - rect.top,
    );
    if (!found) {
      hideMarker(cell, tip, spin);
      return;
    }
    spin.paused = true;
    cell.style.cursor = "pointer";
    showMarker(tip, found, event.clientX, event.clientY);
  });
  cell.addEventListener("pointerleave", () => hideMarker(cell, tip, spin));
}

function mountGlobe(canvas, spin) {
  const reduced = prefersReducedMotion();
  return createGlobe(canvas, {
    devicePixelRatio: PIXEL_RATIO,
    width: GLOBE_PX * PIXEL_RATIO,
    height: GLOBE_PX * PIXEL_RATIO,
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.1, 0.8, 1],
    glowColor: [1, 1, 1],
    markers: MARKERS.map((marker) => ({
      location: marker.location,
      size: marker.size,
    })),
    onRender(state) {
      if (!spin.paused && !reduced) spin.phi += PHI_STEP;
      state.phi = spin.phi;
      state.theta = 0;
    },
  });
}

function startHobbyGlobe() {
  const canvas = document.querySelector(".hobby-globe");
  const cell = canvas?.closest(".hobby-cell");
  const tip = cell?.querySelector(".hobby-globe-tip");
  if (!canvas || !cell || !tip) return;
  const spin = { phi: 0, paused: false };
  try {
    mountGlobe(canvas, spin);
  } catch (error) {
    canvas.dataset.globeError = error instanceof Error ? error.name : "failed";
    canvas.hidden = true;
    return;
  }
  bindHover(cell, canvas, tip, spin);
}

document.addEventListener("DOMContentLoaded", startHobbyGlobe);
