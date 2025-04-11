export const calcEpageXY = (e) => {
  let pageX, pageY;
  const touchEvents = ['touchstart', 'touchmove', 'touchend'];

  if (touchEvents.includes(e.type)) {
    const touch = e.touches[0];
    pageX = touch.pageX;
    pageY = touch.pageY;
  } else {
    pageX = e.pageX;
    pageY = e.pageY;
  }
  return { pageX, pageY };
};
