import { useState, useEffect, useCallback, FC } from 'react';

import declOfNum from '@Utils/declOfNum';
import styles from './Timer.module.css';

export type TimerTypes = 'days' | 'hour' | 'minutes';

const timerValue: Record<TimerTypes, string[]> = {
  days: ['День', 'Дня', 'Дней'],
  hour: ['Час', 'Часа', 'Часов'],
  minutes: ['Минуту', 'Минуты', 'Минут'],
};

export interface TimerProps {
  time: number;
}

const formatTime = (timeToFormat: number) => {
  return timeToFormat < 10 ? `0${timeToFormat}` : `${timeToFormat}`;
};

const Timer: FC<TimerProps> = ({ time }) => {
  const dateNow = new Date().getTime() / 1000;
  const [counter, setCounter] = useState(time - dateNow);

  const format = useCallback((timeInSeconds): Record<TimerTypes, string> => {
    if (timeInSeconds < 0) {
      return {
        days: formatTime(0),
        hour: formatTime(0),
        minutes: formatTime(0),
      };
    }
    const secondsInDay = 86400;
    const secondsInHour = 3600;
    const days = Math.floor(timeInSeconds / secondsInDay);
    const hour = Math.floor((timeInSeconds % secondsInDay) / secondsInHour);
    const minutes = Math.floor(((timeInSeconds % secondsInDay) % secondsInHour) / 60);

    return {
      days: formatTime(days),
      hour: formatTime(hour),
      minutes: formatTime(minutes),
    };
  }, []);

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((preValue) => preValue - 1), 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  return (
    <div className={styles.grid}>
      {Object.keys(timerValue).map((item) => {
        return (
          <div className={styles.wrapper} key={item}>
            <p className={styles.time}>{format(counter)[item]}</p>
            <p className={styles.description}>
              {declOfNum(format(counter)[item], timerValue[item])}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Timer;
