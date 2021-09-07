import React, { HTMLAttributes, memo, FC, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';

import Icon8ChevronDown from '@divanru/icons/dist/8/chevron_down';
import useOnClickOutside from '@Hooks/useOnClickOutside';
import FabricFiltersPopup from '@Components/FabricFiltersPopup';
import styles from './FabricFiltersItem.module.css';

export interface FabricFiltersItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  filter: any;
  filterStore: any;
  onCheckItem?: any;
  onUncheckItem?: any;
}

const FabricFiltersItem: FC<FabricFiltersItemProps> = (props) => {
  const { className, title, filter, filterStore, onCheckItem, onUncheckItem, ...restProps } = props;
  const [visible, setVisible] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(null);
  }, []);

  const handleClick = useCallback(() => {
    setVisible(true);
  }, []);

  const refPopup = useOnClickOutside(handleClose, !visible);

  const selectedFilters = useCallback(() => {
    const filteredItemsNamesArray = filterStore.parameters[filter.id].default.map((item) => {
      const filteredItem = filterStore.parameterValues.find(
        (value) => value.value[0] === item && value.parameterId === filter.id,
      );
      return filteredItem.name;
    });

    const filteredItemsStr = filteredItemsNamesArray.join(', ');
    if (filteredItemsStr.length > 15) {
      return `${filteredItemsStr.slice(0, 15)}...`;
    }
    return filteredItemsStr;
  }, [filter.id, filterStore]);

  const noFilters = useMemo(() => {
    return filter.id === 'colors' ? 'Любой' : 'Все';
  }, [filter.id]);

  return (
    <div {...restProps} className={cn(styles.fabricFiltersItem, className)} onClick={handleClick}>
      <div className={styles.textAndArrowWrapper}>
        <div className={styles.itemText}>{filter.name}</div>
        <Icon8ChevronDown className={styles.arrow} />

        <div className={cn(styles.popup, { [styles.visible]: visible })} ref={refPopup}>
          <FabricFiltersPopup
            title={title}
            values={filterStore.parameterValues.filter((value) => {
              return value.parameterId === filter.id;
            })}
            parameters={filterStore.parameters}
            onCheck={onCheckItem}
            onUncheck={onUncheckItem}
          />
        </div>
      </div>

      <div className={styles.selectedFilters}>
        {filterStore.parameters[filter.id].default.length > 0 ? selectedFilters() : noFilters}
      </div>
    </div>
  );
};

export default memo(FabricFiltersItem);
