export const calcEoffsetXY = (e) => {
  let offsetX, offsetY;
  const touchEvents = ['touchstart', 'touchmove', 'touchend'];

  if (touchEvents.includes(e.type)) {
    const touch = e.touches[0];
    offsetX = touch.offsetX;
    offsetY = touch.offsetY;
  } else {
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  }
  return { offsetX, offsetY };
};
