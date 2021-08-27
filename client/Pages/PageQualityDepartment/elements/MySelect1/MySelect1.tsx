import React, { FC, memo } from 'react';
import cn from 'classnames';

import Select, { SelectProps, SelectItemData } from '@UI/Select';
import SampleOption from './elems/SampleOption';
import styles from './MySelect1.module.css';

export interface MySelect1Props extends SelectProps {
  className?: string;
  title: string;
}

const MySelect1: FC<MySelect1Props> = (props) => {
  const { className, title, items, withoutItems, ...restProps } = props;

  return (
    <Select
      {...restProps}
      className={cn(styles.select, className)}
      title={title}
      defaultChecked={items.find((option) => option.selected)}
      items={items}
      // wide
      withoutItems
      renderItem={(itemProps: SelectItemData) => {
        return <SampleOption item={itemProps} className={cn(styles.option)} />;
      }}
    />
  );
};

export default memo(MySelect1);
