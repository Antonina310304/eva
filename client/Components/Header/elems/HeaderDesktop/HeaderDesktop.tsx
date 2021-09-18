import { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import UserMenu from '@Components/UserMenu';
import Overlay from '@Components/Overlay';
import Link from '@UI/Link';
import Logotype from '@UI/Logotype';
import useScrollPosition from '@Hooks/useScrollPosition';
import useModals from '@Hooks/useModals';
import useMeta from '@Queries/useMeta';
import SiteNav from '../SiteNav';
import Search from '../Search';
import Phone from '../Phone';
import styles from './HeaderDesktop.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HeaderDesktop: FC<HeaderProps> = () => {
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(false);
  const [, { openModal }] = useModals();
  const meta = useMeta();

  const handleClickLocation = useCallback(() => {
    openModal('RegionSelector');
  }, [openModal]);

  useScrollPosition(({ current }) => {
    const { clientHeight, scrollHeight } = document.documentElement;

    if (current.y > 2) {
      setHideOnScroll(true);
    } else if (clientHeight !== scrollHeight) {
      setHideOnScroll(false);
      setIsFirstClick(false);
    }
  });

  if (!meta.isSuccess) return null;

  return (
    <div
      className={cn(styles.header, {
        [styles.scroll]: hideOnScroll,
      })}
    >
      <div className={styles.in}>
        <div className={styles.headerTop}>
          <div className={styles.container}>
            <div className={styles.headerIn}>
              <div className={styles.maxWidth}>
                <Link className={styles.slider} to='/'>
                  <Logotype roller />
                </Link>

                <Search className={styles.search} />
                <SiteNav
                  isFirstClick={isFirstClick}
                  setIsFirstClick={setIsFirstClick}
                  className={styles.mainNav}
                  hideOnScroll={hideOnScroll}
                />
              </div>

              <div className={styles.right}>
                <Link
                  preventDefault
                  className={styles.location}
                  to='#'
                  view='secondary'
                  onClick={handleClickLocation}
                >
                  {meta.data.region.name}
                </Link>
                <Phone />
                {hideOnScroll && <UserMenu className={styles.userMenu} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Overlay visible={isFirstClick} />
    </div>
  );
};

export default memo(HeaderDesktop);