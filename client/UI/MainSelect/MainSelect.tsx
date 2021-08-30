import React, { FC, memo } from 'react';
import cn from 'classnames';

import Select, { SelectProps, SelectItemData } from '@UI/Select';
import SampleOption from './elems/SampleOption';
import styles from './MainSelect.module.css';

export interface MainSelectProps extends SelectProps {
  className?: string;
  title: string;
}

const MainSelect: FC<MainSelectProps> = (props) => {
  const { className, title, items, ...restProps } = props;

  return (
    <Select
      {...restProps}
      className={cn(styles.select, className)}
      title={title}
      defaultChecked={items.find((option) => option.selected)}
      items={items}
      wide
      renderItem={(itemProps: SelectItemData) => {
        return <SampleOption item={itemProps} className={cn(styles.option)} />;
      }}
    />
  );
};

export default memo(MainSelect);
