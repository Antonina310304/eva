import { FC, memo, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './ConstructorGroupTitle.module.css';

export interface ConstructorGroupTitleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  active?: boolean;
  children: string;
  view: { collapsed: boolean; modal: boolean };
}

const ConstructorGroupTitle: FC<ConstructorGroupTitleProps> = (props) => {
  const { className, active, children, view, onClick, ...restProps } = props;

  const modal = active ? (
    <div {...restProps} className={cn(styles.constructorGroupTitle, className)} onClick={onClick}>
      <div>{children}</div>
    </div>
  ) : (
    <div {...restProps} className={cn(styles.constructorGroupTitle, className)} onClick={onClick}>
      {children}
    </div>
  );

  const desktop = (
    <div {...restProps} className={cn(styles.constructorGroupTitle, className)}>
      <div>{children}</div>
    </div>
  );

  const mobDesk = active ? (
    <div {...restProps} className={cn(styles.constructorGroupTitle, className)} onClick={onClick}>
      <div>{children}</div>
    </div>
  ) : (
    <div {...restProps} className={cn(styles.constructorGroupTitle, className)} onClick={onClick}>
      {children}
    </div>
  );

  const content = !view.collapsed ? desktop : mobDesk;

  return view.modal ? modal : content;
};

export default memo(ConstructorGroupTitle);
