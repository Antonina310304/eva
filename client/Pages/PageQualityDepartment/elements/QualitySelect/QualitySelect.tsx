import React, { FC, memo } from 'react';
import cn from 'classnames';

import Select, { SelectProps, SelectItemData } from '@UI/Select';
import SampleOption from './SampleOption';
import styles from './QualitySelect.module.css';

export interface QualitySelectProps extends SelectProps {
  className?: string;
  title: string;
}

const QualitySelect: FC<QualitySelectProps> = (props) => {
  const { className, title, items, ...restProps } = props;

  return (
    <Select
      {...restProps}
      className={cn(styles.select, className)}
      title={title}
      items={items}
      renderItem={(itemProps: SelectItemData) => {
        return <SampleOption item={itemProps} className={cn(styles.option)} />;
      }}
    />
  );
};

export default memo(QualitySelect);
