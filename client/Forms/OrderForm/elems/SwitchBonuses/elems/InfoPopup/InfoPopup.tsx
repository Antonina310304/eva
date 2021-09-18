import { forwardRef, memo } from 'react';
import cn from 'classnames';

import Popup, { PopupProps } from '@UI/Popup';
import Link from '@UI/Link';
import styles from './InfoPopup.module.css';

const InfoPopup = forwardRef<HTMLDivElement, PopupProps>((props, ref) => {
  const { className, ...restProps } = props;

  return (
    <Popup {...restProps} className={cn(styles.popup, className)} ref={ref}>
      Выберите, если хотите получить или списать бонусы за этот заказ. Вы будете зарегистрированы
      или авторизованы как участник программы лояльности Divan Club.
      <Link className={styles.link} target='_blank' to='/site/divan-club' view='native'>
        Правила программы
      </Link>
    </Popup>
  );
});

export default memo(InfoPopup);
