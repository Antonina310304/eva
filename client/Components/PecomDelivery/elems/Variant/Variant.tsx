import { FC, HTMLAttributes, memo, ReactElement, useState, useCallback } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import IconInfo from '@UI/IconInfo';
import Popup from '@UI/Popup';
import useOnClickOutside from '@Hooks/useOnClickOutside';
import styles from './Variant.module.css';

export interface VariantParameter {
  name: string;
  value: string;
}

export interface VariantProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  text: string;
  price?: number;
  popup?: ReactElement;
  parameters: VariantParameter[];
}

const Variant: FC<VariantProps> = (props) => {
  const { className, text, price, popup, parameters, ...restProps } = props;
  const [visiblePopup, setVisiblePopup] = useState(false);

  const handleClickInfo = useCallback((_e, { active }) => {
    setVisiblePopup(active);
  }, []);

  const handleClosePopup = useCallback(() => {
    setVisiblePopup(false);
  }, []);

  const refPopup = useOnClickOutside(handleClosePopup);

  return (
    <div className={cn(styles.variant, className)} {...restProps}>
      <div className={styles.head}>
        <div className={styles.title}>
          {text}
          {typeof price === 'number' && (
            <>
              {/* Это неразрывный пробел */}
              {`\u00a0—\u00a0`}
              <Price className={styles.price} price={price} />
            </>
          )}
        </div>

        {popup && (
          <div className={styles.wrapperIcon} ref={refPopup}>
            <IconInfo active={visiblePopup} onClickIcon={handleClickInfo} />
            <Popup className={styles.popup} visible={visiblePopup}>
              {popup}
            </Popup>
          </div>
        )}
      </div>

      {parameters.map((parameter, index) => (
        <div className={styles.parameter} key={index}>
          {`${parameter.name} ${parameter.value}`}
        </div>
      ))}
    </div>
  );
};

export default memo(Variant);
