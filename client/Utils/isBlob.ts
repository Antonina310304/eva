export default (value: Blob | File): boolean => {
  return (
    value &&
    typeof value.size === 'number' &&
    typeof value.type === 'string' &&
    typeof value.slice === 'function'
  );
};
