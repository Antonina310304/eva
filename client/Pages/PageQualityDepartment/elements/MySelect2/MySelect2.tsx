import React, { FC, memo } from 'react';
import cn from 'classnames';

import Select, { SelectProps, SelectItemData } from '@UI/Select';
import SampleOption from './elems/SampleOption';
import styles from './MySelect2.module.css';

export interface MySelect2Props extends SelectProps {
  className?: string;
  title: string;
}

const MySelect2: FC<MySelect2Props> = (props) => {
  const { className, title, items, withoutItems, ...restProps } = props;

  return (
    <Select
      {...restProps}
      className={cn(styles.select, className)}
      title={title}
      items={items}
      // wide
      mode='multiple'
      withoutItems
      renderItem={(itemProps: SelectItemData) => {
        return <SampleOption item={itemProps} className={cn(styles.option)} />;
      }}
    />
  );
};

export default memo(MySelect2);
