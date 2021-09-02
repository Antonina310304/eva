import React, { FC, memo } from 'react';
import cn from 'classnames';

import Select, { SelectProps, SelectItemData } from '@UI/Select';
import SampleOption from './elems/SampleOption';
import styles from './MainSelect.module.css';

const MainSelect: FC<SelectProps> = (props) => {
  const { className, items, ...restProps } = props;

  return (
    <Select
      {...restProps}
      className={cn(styles.select, className)}
      defaultChecked={items.find((option) => option.selected)}
      items={items}
      renderItem={(itemProps: SelectItemData) => {
        return <SampleOption item={itemProps} className={cn(styles.option)} />;
      }}
    />
  );
};

export default memo(MainSelect);
