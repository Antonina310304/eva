import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@divanru/ts-ui/Link';
import Button from '@divanru/ts-ui/Button';

import useData from '@Hooks/useData';
import { PageErrorData } from './typings';
import styles from './PageError.module.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageError: FC<Props> = (props) => {
  const { className, ...restProps } = props;
  const data = useData<PageErrorData>();
  const textes = data.text || [];

  return (
    <div {...restProps} className={cn(styles.pageError, [className])}>
      {textes.length > 0 && (
        <div className={styles.info}>
          {textes.map((text, index) => (
            <div className={styles.text} key={index}>
              {text}
            </div>
          ))}
        </div>
      )}

      {data.action && (
        <Link className={styles.link} to={data.action.to}>
          <Button>{data.action.text}</Button>
        </Link>
      )}
    </div>
  );
};

export default memo(PageError);
