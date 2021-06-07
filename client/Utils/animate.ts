export type FractionFunction = (fraction: number) => number;

export interface Animate {
  timing: 'linear' | FractionFunction;
  draw: (progress: number) => void;
  duration: number;
}

const timingFunctions = {
  linear: (fraction: number) => fraction,
};

export default (props: Animate): void => {
  const { timing = 'linear', draw, duration } = props;
  const start = performance.now();
  const timingFunction = typeof timing === 'string' ? timingFunctions[timing] : timing;

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;

    if (timeFraction < 0) timeFraction = 0;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timingFunction(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};
