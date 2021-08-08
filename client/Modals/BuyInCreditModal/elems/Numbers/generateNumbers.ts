import declOfNum from '@Utils/declOfNum';
import { InstallmentVariant } from '@Types/InstallmentBank';
import { NumberItem } from './typings';

const timeUnits = {
  months: ['мес.', 'мес.', 'мес.'],
  years: ['год', 'года', 'лет'],
};

export default (variant: InstallmentVariant): NumberItem[] => {
  const isMin = typeof variant.minPercent === 'number';
  const percent = isMin ? variant.minPercent : variant.percent;
  const time = variant.timePeriod.value;

  return [
    {
      before: isMin ? 'от' : null,
      value: percent,
      after: '%',
    },
    {
      value: time,
      after: declOfNum(time, timeUnits[variant.timePeriod.unit]),
    },
  ];
};
