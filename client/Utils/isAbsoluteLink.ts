export default (link: string): boolean => {
  const matches = link.match(/^(http:\/\/|https:\/\/|tel:|mailto:)/);

  return !!matches;
};
