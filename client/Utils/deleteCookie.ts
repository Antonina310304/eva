import setCookie from './setCookie';

export default (name: string): void => {
  setCookie(name, '', {
    'max-age': -1,
  });
};
