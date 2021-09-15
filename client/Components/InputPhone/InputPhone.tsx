import React, { memo, FC, useCallback } from 'react';

import useMeta from '@Queries/useMeta';
import Input, { InputProps } from '@UI/Input';

export interface InputPhoneProps extends InputProps {
  country?: 'RUS' | 'BLR';
}

const masks = {
  RUS: '+7 (999) 999-99-99',
  BLR: '+375 (99) 999-99-99',
};

const InputPhone: FC<InputPhoneProps> = (props: InputPhoneProps) => {
  const { country, ...restProps } = props;
  const meta = useMeta();

  /**
   * Если в поле ввода вставляют полный номер телефона в котором первый символ отличается от символа
   * маски, (например 8 вместо +7 для России), то необходимо обрезать первые символы маски, чтобы сформировать правильный номер
   * Если вставляемое значение содержит меньше символов чем в полном формате номера, то оставляем без преобразований
   *
   * Например: вставляют 8 (900) 111-22-33, ожидаемый результат +7 (900) 111-22-33
   */
  const handleBeforePaste = useCallback(
    (pastedValue) => {
      const onlyNumbers: string = pastedValue.replace(/\D/g, '').toString();

      if (country === 'RUS' && onlyNumbers.length === 11) {
        return onlyNumbers.substring(1);
      }

      if (country === 'BLR' && onlyNumbers.length === 12) {
        return onlyNumbers.substring(3);
      }

      return onlyNumbers;
    },
    [country],
  );

  if (!meta.isSuccess) return null;

  return (
    <Input
      {...restProps}
      mask={masks[country || meta.data.country]}
      onBeforePaste={handleBeforePaste}
    />
  );
};

export default memo(InputPhone);
