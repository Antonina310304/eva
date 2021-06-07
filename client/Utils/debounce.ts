export default function debounce(fn: () => void, ...params: []): () => void {
  let timeout: number;

  return () => {
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(() => fn.apply(this, params));
  };
}
