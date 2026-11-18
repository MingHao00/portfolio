/**
 * 地球着色器按像素计算。离开画面、切到别的标签，或用户要求减少动效时停掉循环。
 * @param {{ inView: boolean, pageVisible: boolean, reducedMotion: boolean }} state
 * @returns {boolean}
 */
export function shouldRenderGlobe(state) {
  if (!state.inView) return false;
  if (!state.pageVisible) return false;
  if (state.reducedMotion) return false;
  return true;
}
