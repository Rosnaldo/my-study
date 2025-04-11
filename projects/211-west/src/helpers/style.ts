export function vh(value: number) {
  return `calc(var(--vh, 1vh) * ${value})`;
}

export function transition(
  cssProperties: string | string[],
  duration: string = '0.35s',
  easing: string = 'cubic-bezier(0.4, 0, 0.2, 1)'
): string {
  return [cssProperties]
    .flat()
    .map((transitionProp) => `${transitionProp} ${duration} ${easing}`)
    .join(', ');
}

export const pxToVw = (px: number, width = 1366) => `${(100 / width) * px}vw`;

export const pxToVh = (px: number, height = 1024) => `${(100 / height) * px}vh`;
