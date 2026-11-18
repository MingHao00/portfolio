import assert from "node:assert/strict";
import test from "node:test";
import { markerUnderPoint, projectMarker } from "./hobby-globe-math.mjs";

const CANVAS = 200;

test("赤道西经 90 度在正面中心", () => {
  const point = projectMarker(0, -90, 0, CANVAS, CANVAS);
  assert.equal(point.visible, true);
  assert.ok(Math.abs(point.x - 100) < 0.01);
  assert.ok(Math.abs(point.y - 100) < 0.01);
});

test("赤道东经 90 度在背面", () => {
  const point = projectMarker(0, 90, 0, CANVAS, CANVAS);
  assert.equal(point.visible, false);
});

test("只有落在标记附近才命中", () => {
  const markers = [{ location: [0, -90] }];
  const hit = markerUnderPoint(markers, 0, CANVAS, CANVAS, 100, 100);
  const miss = markerUnderPoint(markers, 0, CANVAS, CANVAS, 10, 10);
  assert.equal(hit, markers[0]);
  assert.equal(miss, undefined);
});
