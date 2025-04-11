const alert = "We are ready, start the movie";

// Emulation of the demo (ad) reel.
const demoReel = () => {
  const length = 500000000;
  let sum = 0;
  for (i = 0; i <= length; i++) {
    sum += i;
  }
};
// setTimeout() function with anonymous callback
// and delay in milliseconds.
setTimeout(() => {
  console.log(alert);
}, 10);
demoReel();