export default (date: Date): number => {
  return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
};
