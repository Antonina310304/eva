import { useState, useEffect } from 'react';

export type QueryVariant =
  | '--desktop-l'
  | '--desktop-m'
  | '--desktop'
  | '--mobile-l'
  | '--mobile-m'
  | '--mobile'
  | '--mobile-s'
  | '--only-desktop'
  | '--only-mobile';

export interface Matches {
  isDesktopL?: boolean;
  isDesktopM?: boolean;
  isDesktop?: boolean;
  isMobileL?: boolean;
  isMobileM?: boolean;
  isMobile?: boolean;
  isMobileS?: boolean;
  isOnlyDesktop?: boolean;
  isOnlyMobile?: boolean;
}

function matchMedia(query: QueryVariant): MediaQueryList {
  const List = {
    '--desktop-l': '(min-width: 1920px)',
    '--desktop-m': '(max-width: 1919px)',
    '--desktop': '(max-width: 1365px)',
    '--mobile-l': '(max-width: 1279px)',
    '--mobile-m': '(max-width: 1023px)',
    '--mobile': '(max-width: 767px)',
    '--mobile-s': '(max-width: 424px)',
    '--only-desktop': '(min-width: 1366px)',
    '--only-mobile': '(max-width: 1365px)',
  };

  return window.matchMedia(List[query] || query);
}

export default function useMedias(): Matches {
  const [matches, setMatches] = useState<Matches>({});

  useEffect(() => {
    function handleResze() {
      setMatches({
        isDesktopL: matchMedia('--desktop-l').matches,
        isDesktopM: matchMedia('--desktop-m').matches,
        isDesktop: matchMedia('--desktop').matches,
        isMobileL: matchMedia('--mobile-l').matches,
        isMobileM: matchMedia('--mobile-m').matches,
        isMobile: matchMedia('--mobile').matches,
        isMobileS: matchMedia('--mobile-s').matches,
        isOnlyDesktop: matchMedia('--only-desktop').matches,
        isOnlyMobile: matchMedia('--only-mobile').matches,
      });
    }

    function cleanup() {
      window.removeEventListener('resize', handleResze);
    }

    handleResze();
    window.addEventListener('resize', handleResze);

    return cleanup;
  }, []);

  return matches;
}
