import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  const isBrowser = typeof window === 'object';

  useEffect(() => {
    if (!isBrowser) return;
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    // eslint-disable-next-line consistent-return
    return () => media.removeListener(listener);
  }, [matches, query, isBrowser]);

  return matches;
}
export default useMediaQuery;
