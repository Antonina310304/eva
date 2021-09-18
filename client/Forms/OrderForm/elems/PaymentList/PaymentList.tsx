import { FC, HTMLAttributes, MouseEvent, memo, useCallback } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import MainSelect from '@UI/MainSelect';
import { PaymentTypeData } from '@Types/Cart';
import styles from './PaymentList.module.css';

export interface PaymentListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  paymentTypes: PaymentTypeData[];
  checkedType: PaymentTypeData;
  name: string;
  title: string;
  asSelect?: boolean;
  onCheck?: (e: MouseEvent, selectedType: PaymentTypeData) => void;
}

const PaymentList: FC<PaymentListProps> = (props) => {
  const {
    className,
    paymentTypes,
    checkedType,
    title,
    name,
    asSelect,
    onCheck,
    ...restProps
  } = props;

  const handleCheck = useCallback(
    (e: MouseEvent, selectedType: PaymentTypeData) => {
      if (onCheck) onCheck(e, selectedType);
    },
    [onCheck],
  );

  const handleChangeSelected = useCallback(
    (e, items) => {
      if (onCheck) onCheck(e, items[0].data);
    },
    [onCheck],
  );

  return asSelect ? (
    <MainSelect
      wide
      title={title}
      name={name}
      items={paymentTypes.map((pt) => ({
        id: pt.id.toString(),
        title: pt.name,
        name: pt.name,
        selected: pt.id === checkedType.id,
        data: pt,
      }))}
      onChangeSelected={handleChangeSelected}
    />
  ) : (
    <div {...restProps} className={cn(styles.list, className)}>
      <input hidden name={name} value={checkedType.id} />

      {paymentTypes.map((paymentType) => (
        <div
          className={cn(styles.paymentType, { [styles.actived]: paymentType === checkedType })}
          onClick={(e) => handleCheck(e, paymentType)}
        >
          <Image className={styles.icon} src={paymentType.icon} alt='' />
          {paymentType.name}
        </div>
      ))}
    </div>
  );
};

export default memo(PaymentList);
