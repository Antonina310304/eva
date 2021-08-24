import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Select, { SelectItemData } from '@UI/Select';
import SampleOption from './elems/SampleOption';
import styles from './MainSelect.module.css';

export interface MainSelectProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  options: SelectItemData[];
}

const MainSelect: FC<MainSelectProps> = (props) => {
  const { className, title, options, ...restProps } = props;

  return (
    <Select
      {...restProps}
      className={cn(styles.select, className)}
      title={title}
      defaultChecked={options.find((option) => option.selected)}
      items={options}
      wide
      renderItem={(itemProps: SelectItemData) => {
        return <SampleOption item={itemProps} className={cn(styles.option)} />;
      }}
    />
  );
};

export default memo(MainSelect);
