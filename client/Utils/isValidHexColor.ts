export default function isValidHexColor(color: string): boolean {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(color.toLowerCase());
}
