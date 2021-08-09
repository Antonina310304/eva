import isBlob from './isBlob';

export default (value: any): boolean => {
  return (
    isBlob(value) &&
    (typeof value.lastModifiedDate === 'object' || typeof value.lastModified === 'number') &&
    typeof value.name === 'string'
  );
};
