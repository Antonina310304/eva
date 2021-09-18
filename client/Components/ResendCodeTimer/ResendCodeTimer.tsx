import { FC, memo, HTMLAttributes, useEffect, useState, useCallback, MouseEvent } from 'react';
import cn from 'classnames';

import Icon36Reset from '@divanru/icons/dist/36/reset';

import Link from '@UI/Link';
import declOfNum from '@Utils/declOfNum';
import styles from './ResendCodeTimer.module.css';

export interface ResendCodeTimerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  waiting?: boolean;
  seconds: number;
  onEnd?: () => void;
  onRepeat?: (e: MouseEvent) => void;
}

const titles = ['секунду', 'секунды', 'секунд'];

const ResendCodeTimer: FC<ResendCodeTimerProps> = (props) => {
  const { className, waiting, seconds, onEnd, onRepeat, ...restProps } = props;
  const [leftSeconds, setLeftSeconds] = useState(seconds);
  const finished = leftSeconds < 1;

  const handleRepeat = useCallback(
    (e) => {
      if (waiting) return;

      if (onRepeat) onRepeat(e);
    },
    [onRepeat, waiting],
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLeftSeconds((prev) => {
        const newSeconds = prev - 1;

        if (newSeconds < 1) {
          if (onEnd) onEnd();

          return 0;
        }

        return newSeconds;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div {...restProps} className={cn(styles.timer, { [styles.waiting]: waiting }, className)}>
      {finished ? (
        <Link className={styles.action} preventDefault view='native' to='#' onClick={handleRepeat}>
          <Icon36Reset className={styles.iconReset} width={12} height={12} />
          Отправить код еще раз
        </Link>
      ) : (
        `Отправить код еще раз через ${leftSeconds} ${declOfNum(leftSeconds, titles)}`
      )}
    </div>
  );
};

export default memo(ResendCodeTimer);
