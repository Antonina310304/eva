import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaPhoneData } from '@Types/Meta';
import styles from './PhoneNumber.module.css';

export interface PhoneNumberProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  phone: MetaPhoneData;
}

const PhoneNumber: FC<PhoneNumberProps> = (props) => {
  const { className, phone, ...restProps } = props;

  return (
    <span {...restProps} className={cn(styles.number, className)}>
      {`+${phone.country} (${phone.code}) ${phone.phone}`}
    </span>
  );
};

export default memo(PhoneNumber);
