import React, { memo, HTMLAttributes, FC, useCallback } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';

import { FiltersValue, FiltersParameters } from '@Types/Filters';
import styles from './FabricFiltersPopup.module.css';

export interface FabricFiltersPopupProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  values?: FiltersValue[];
  parameters?: FiltersParameters;
  onCheck?: (e: MouseEvent, params: any) => void;
  onUncheck?: (e: MouseEvent, params: any) => void;
}

const FabricFiltersPopup: FC<FabricFiltersPopupProps> = (props) => {
  const { className, title, values, parameters, onCheck, onUncheck, ...restProps } = props;

  const handleClickItem = useCallback(
    (e, { checked, value }) => {
      const opts = {
        id: value.parameterId,
        name: value.name,
        value: value.value[0],
      };

      if (!checked) {
        onCheck(e, opts);
      } else {
        onUncheck(e, opts);
      }
    },
    [onCheck, onUncheck],
  );

  return (
    <div {...restProps} className={cn(styles.fabricFiltersPopup, className)}>
      <div className={styles.title}>{title}</div>
      <div className={styles.items}>
        {values.map((value, index) => {
          const parameter = parameters[value.parameterId];
          const checked = parameter.default.includes(value.value[0]);

          return (
            <div
              className={cn(styles.item, { [styles.checked]: checked })}
              key={index}
              onClick={(e) => handleClickItem(e, { checked, value })}
            >
              {value.meta?.color && (
                <div className={styles.color} style={{ backgroundColor: value.meta.color }} />
              )}
              {value.meta?.icon && <Image className={styles.icon} src={value.meta.icon} />}
              <div className={styles.text}>{value.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(FabricFiltersPopup);
