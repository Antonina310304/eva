import { FC, HTMLAttributes, memo, ReactElement } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import Header from '@Components/Header';
import Footer from '@Components/Footer';
import { MetaData } from '@Types/Meta';
import useMedias from '@Hooks/useMedias';
import styles from './TemplateMain.module.css';

export interface TemplateMainProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  hideDeliveryInfo?: boolean;
  meta: MetaData;
  children?: ReactElement | ReactElement[];
}

const DeliveryInfo = loadable(() => import('@Components/DeliveryInfo'));
const BottomUserMenu = loadable(() => import('@Components/BottomUserMenu'));

const TemplateMain: FC<TemplateMainProps> = (props) => {
  const { className, hideDeliveryInfo, meta, children, ...restProps } = props;
  const { isMobileM } = useMedias();

  return (
    <div {...restProps} className={cn(styles.templateMain, className)}>
      <Header />

      {children}

      {!hideDeliveryInfo && meta.country === 'RUS' && <DeliveryInfo />}
      <Footer />

      {isMobileM && <BottomUserMenu />}
    </div>
  );
};

export default memo(TemplateMain);
