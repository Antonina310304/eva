import React, { FC, HTMLAttributes, memo, ReactElement } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import Footer from '@Components/Footer';
import styles from './TemplateMain.module.css';

export interface TemplateMainProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  hideDeliveryInfo?: boolean;
  children?: ReactElement | ReactElement[];
}

const DeliveryInfo = loadable(() => import('@Components/DeliveryInfo'));

const TemplateMain: FC<TemplateMainProps> = (props) => {
  const { className, hideDeliveryInfo, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.templateMain, className)}>
      {children}

      {!hideDeliveryInfo && <DeliveryInfo />}
      <Footer />
    </div>
  );
};

export default memo(TemplateMain);
