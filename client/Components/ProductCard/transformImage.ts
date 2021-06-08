export default (image: string, color: string): string => {
  return `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 150">
    <defs><filter id="${color.substr(1)}">
    <feFlood result="fill" x="0" y="0" width="100%" height="100%" flood-color="${color}" flood-opacity="1"/>
    <feBlend mode="multiply" in="SourceGraphic" in2="fill"/></filter></defs>
    <image xlink:href="${image}" x="0" y="0" width="100%" height="100%" style="filter:url(${color});"/></svg>`;
};
