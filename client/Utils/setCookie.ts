export type CookieOptions = any;

export default (name: string, value: string, options: CookieOptions = {}): void => {
  const assigmentOptions = {
    path: '/',
    ...options,
  };

  if (assigmentOptions.expires instanceof Date) {
    assigmentOptions.expires = assigmentOptions.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  Object.keys(assigmentOptions).forEach((key) => {
    updatedCookie += `; ${key}`;

    const optionValue = assigmentOptions[key];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  });

  document.cookie = updatedCookie;
};
