export default (body: unknown): string => {
  return `<script>window.__SERVER_STATE__=${JSON.stringify(body)};</script>`;
};
