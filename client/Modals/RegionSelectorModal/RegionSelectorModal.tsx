import React, { memo, useEffect, useState, FC, useCallback } from 'react';
import cn from 'classnames';

import * as ApiMeta from '@Api/Meta';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import IconClose from '@UI/IconClose';
import Scroller from '@UI/Scroller';
import setCookie from '@Utils/setCookie';
import useMedias from '@Hooks/useMedias';
import { RegionHintData } from '@Types/Region';
import Search from './elems/Search';
import FavoriteRegions from './elems/FavoriteRegions';
import ListOfHints from './elems/ListOfHints';
import styles from './RegionSelectorModal.module.css';

const RegionSelectorModal: FC<ModalMainProps> = (props) => {
  const { className, onClose, ...restProps } = props;
  const { isMobile } = useMedias();
  const [loaded, setLoaded] = useState(false);
  const [favoriteRegions, setFavoriteRegions] = useState(null);
  const [hints, setHints] = useState<RegionHintData[]>(null);
  const [query, setQuery] = useState<string>(null);

  const handleChangeQuery = useCallback((_e, newQuery) => {
    setQuery(newQuery);
  }, []);

  const handleChangeHints = useCallback((newHints) => {
    setHints(newHints);
  }, []);

  const handleSelectRegion = useCallback((_e, region) => {
    // 30 дней
    const opts = { 'max-age': 60 * 60 * 24 * 30 };

    setCookie('rgn', region.parent_id, opts);
    setCookie('secondary_rgn', region.id, opts);

    document.location.reload();
  }, []);

  useEffect(() => {
    async function load() {
      const regions = await ApiMeta.getRegionPriority();

      setFavoriteRegions(regions);
      setLoaded(true);
    }

    load();
  }, []);

  if (!loaded) return null;

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      fullscreen={isMobile}
      onClose={onClose}
    >
      <div className={styles.container}>
        <div className={styles.head}>
          <h3 className={styles.title}>Укажите свой город</h3>
          <IconClose className={styles.iconClose} onClick={onClose} />
        </div>

        <div className={styles.content}>
          <div className={styles.mainWrapper}>
            <Search onChangeQuery={handleChangeQuery} onChangeHints={handleChangeHints} />
          </div>

          <Scroller className={styles.scroller}>
            {hints?.length > 0 ? (
              <ListOfHints query={query} regions={hints} onSelectRegion={handleSelectRegion} />
            ) : (
              <>
                {favoriteRegions?.length > 0 && (
                  <div className={styles.mainWrapper}>
                    <FavoriteRegions
                      regions={favoriteRegions}
                      onSelectRegion={handleSelectRegion}
                    />
                  </div>
                )}
              </>
            )}
          </Scroller>
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(RegionSelectorModal);
