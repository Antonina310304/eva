import React, { FC, HTMLAttributes, memo, ReactElement } from 'react';
import cn from 'classnames';

import styles from './TemplateMain.module.css';

export interface TemplateMainProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactElement | ReactElement[];
}

const TemplateMain: FC<TemplateMainProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.templateMain, className)}>
      {children}
    </div>
  );
};

export default memo(TemplateMain);
