import React, { FC, memo, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { ApiPecom } from '@Api/Pecom';
import InputHelper, { InputHelperProps, InputHelperHint } from '@UI/InputHelper';

export type InputHelperAddressProps = Omit<InputHelperProps, 'hints'>;

const InputHelperAddress: FC<InputHelperAddressProps> = (props) => {
  const { className, error, onSelectHint, ...restProps } = props;
  const [loadingHints, setLoadingHints] = useState<boolean>(false);
  const [hints, setHints] = useState<InputHelperHint[]>([]);

  const [debouceChangeValue] = useDebouncedCallback(async (chunk: string) => {
    if (!chunk || chunk.length < 3) return;

    setLoadingHints(true);

    try {
      const addressHints: any[] = await ApiPecom.getAddressHints({ chunk });

      setHints(() => {
        return addressHints.map((addressHint, index) => ({
          id: index,
          title: addressHint.fullAddress,
          data: addressHint,
        }));
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoadingHints(false);
    }
  }, 400);

  const handleChangeAddress = useCallback(
    (e) => {
      debouceChangeValue(e.target.value);
    },
    [debouceChangeValue],
  );

  return (
    <InputHelper
      {...restProps}
      loading={loadingHints}
      hints={hints}
      error={error}
      onChange={handleChangeAddress}
      onSelectHint={onSelectHint}
    />
  );
};

export default memo(InputHelperAddress);
