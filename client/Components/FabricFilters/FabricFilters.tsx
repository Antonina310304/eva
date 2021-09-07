import React, { HTMLAttributes, FC, memo, MouseEvent, useCallback, useState } from 'react';
import cn from 'classnames';

import Icon18Close from '@divanru/icons/dist/18/close';
import Icon18Filters from '@divanru/icons/dist/18/filters';

import Button from '@UI/Button';
// import IconWithText from '@divanru/ts-ui/IconWithText';
import useMedias from '@Hooks/useMedias';

import FabricFiltersItem from '@Components/FabricFiltersItem';
// import MobileFilters from '@Components/MobileFilters';
import styles from './FabricFilters.module.css';

export interface FabricFiltersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  filterStore: any;
  onResetOne?: (e: MouseEvent, params: any) => void;
  onResetGroup?: (e: MouseEvent, params: any) => void;
  onResetAll?: (e: MouseEvent) => void;
  onAddCheckbox?: (e: MouseEvent, params: any) => void;
  onRemoveCheckbox?: (e: MouseEvent, params: any) => void;
}

const titles = {
  tags: 'Выберите тэг:',
  colors: 'Выберите цвет:',
};

const FabricFilters: FC<FabricFiltersProps> = (props) => {
  const {
    className,
    filterStore,
    onResetOne,
    onResetGroup,
    onResetAll,
    onAddCheckbox,
    onRemoveCheckbox,
    ...restProps
  } = props;
  const { isMobile } = useMedias();
  const [visibleMobile, setVisibleMobile] = useState(false);

  const handleCheckItem = useCallback(
    (e, opts) => {
      if (onAddCheckbox) onAddCheckbox(e, opts);
    },
    [onAddCheckbox],
  );

  const handleUncheckItem = useCallback(
    (e, opts) => {
      if (onRemoveCheckbox) onRemoveCheckbox(e, opts);
    },
    [onRemoveCheckbox],
  );

  const handleOpenFilters = useCallback(() => {
    setVisibleMobile(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setVisibleMobile(false);
  }, []);

  return (
    <div {...restProps} className={cn(styles.fabricFilters, className)}>
      {isMobile ? (
        <>
          {/* <Button className={styles.button} theme='plain' onClick={handleOpenFilters}>
            <IconWithText icon={<Icon18Filters />}>Фильтр</IconWithText>
          </Button> */}

          <div className={styles.reset} onClick={onResetAll}>
            <Icon18Close className={styles.iconReset} width={10} height={10} />
            Сбросить
          </div>

          {/* <MobileFilters
            visible={visibleMobile}
            data={filterStore}
            onAddCheckbox={onAddCheckbox}
            onRemoveCheckbox={onRemoveCheckbox}
            onResetAll={onResetAll}
            onResetGroup={onResetGroup}
            onApply={handleCloseFilters}
            onClose={handleCloseFilters}
          /> */}
        </>
      ) : (
        <>
          <div className={styles.items}>
            {filterStore.filters.map((filter, index) => {
              return (
                <FabricFiltersItem
                  key={index}
                  title={titles[filter.id]}
                  filter={filter}
                  filterStore={filterStore}
                  onCheckItem={handleCheckItem}
                  onUncheckItem={handleUncheckItem}
                />
              );
            })}

            <div className={styles.reset} onClick={onResetAll}>
              <Icon18Close className={styles.iconReset} width={10} height={10} />
              Сбросить
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(FabricFilters);
