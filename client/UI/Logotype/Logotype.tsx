import { useCallback, useState, memo, HTMLAttributes, FC } from 'react';
import cn from 'classnames';

import { CountryData } from '@Types/Base';
import styles from './Logotype.module.css';

export interface LogotypeProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  roller?: boolean;
  country?: CountryData;
}

const Logotype: FC<LogotypeProps> = (props) => {
  const { className, roller, country = 'RUS', ...restProps } = props;
  const [position, setPosition] = useState(0);

  const handleLogoRoller = useCallback(() => {
    if (!roller) return;

    setPosition((prev) => prev + 31);
  }, [roller]);

  return (
    <div
      {...restProps}
      className={cn(
        styles.logotype,
        {
          [styles.isRoller]: roller,
          [styles.isBlr]: country === 'BLR',
          [styles.isRus]: country === 'RUS',
        },
        [className],
      )}
      onMouseEnter={handleLogoRoller}
    >
      <div
        className={styles.roller}
        style={{
          backgroundPosition: `0 ${position}px`,
          backgroundImage: `url('/react/static/img/logotype/roller.png')`,
        }}
      />

      <div
        className={styles.icon}
        style={{
          backgroundImage:
            country === 'RUS'
              ? 'url(/react/static/img/logotype/iconRus.svg)'
              : 'url(/react/static/img/logotype/iconBlr.svg)',
        }}
      />
    </div>
  );
};

export default memo(Logotype);
