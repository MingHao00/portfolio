const GLOBE_RADIUS = 0.8;
const HIT_MIN_PX = 16;
const HIT_RATIO = 0.05;

/**
 * 把经纬度投到正交地球画布上。phi 是绕地轴的转角，theta 固定为 0。
 * @param {number} lat
 * @param {number} lon
 * @param {number} phi
 * @param {number} width
 * @param {number} height
 * @returns {{ x: number, y: number, visible: boolean }}
 */
export function projectMarker(lat, lon, phi, width, height) {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  const parallel = Math.cos(latRad) * Math.cos(lonRad);
  const axis = Math.sin(latRad);
  const meridian = -Math.cos(latRad) * Math.sin(lonRad);
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const unitX = cosPhi * parallel + sinPhi * meridian;
  const depth = -sinPhi * parallel + cosPhi * meridian;
  return {
    x: ((GLOBE_RADIUS * unitX + 1) / 2) * width,
    y: (1 - (GLOBE_RADIUS * axis + 1) / 2) * height,
    visible: depth > 0,
  };
}

/**
 * @param {Array<{ location: [number, number] }>} markers
 * @returns {object | undefined}
 */
export function markerUnderPoint(markers, phi, width, height, localX, localY) {
  const hit = Math.max(HIT_MIN_PX, width * HIT_RATIO);
  return markers.find((marker) => {
    const point = projectMarker(
      marker.location[0],
      marker.location[1],
      phi,
      width,
      height,
    );
    if (!point.visible) return false;
    const dx = localX - point.x;
    const dy = localY - point.y;
    return dx * dx + dy * dy < hit * hit;
  });
}
