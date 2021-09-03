import React, { FC, HTMLAttributes, MouseEvent, memo, useMemo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import Button from '@UI/Button';

import useMedias from '@Hooks/useMedias';
import styles from './ChooseMattressBanner.module.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  categoryColor: string;
  title: string;
  action: {
    link: string;
    title: string;
  };
  onLink?: (e: MouseEvent) => void;
}

const images = [1, 2, 3, 4].map((number) => `/react/static/mattrasses/${number}.png`);

const ChooseMattressBanner: FC<Props> = (props) => {
  const { className, categoryColor, title, action, children, onLink, ...restProps } = props;
  const { isDesktop, isMobileM, isMobile } = useMedias();

  const offset = useMemo(() => {
    if (isMobile) return 4;
    if (isMobileM) return 2;
    if (isDesktop) return 3;

    return 4;
  }, [isDesktop, isMobile, isMobileM]);

  const slicedImages = useMemo(() => {
    return images.slice(0, offset);
  }, [offset]);

  return (
    <div
      {...restProps}
      className={cn(styles.banner, className)}
      style={{ backgroundColor: categoryColor }}
    >
      <div className={styles.wrapperContent}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{children}</div>

          <Link className={styles.link} to={action.link} target='_blank' onClick={onLink}>
            <Button wide theme='linkPrimary'>
              {action.title}
            </Button>
          </Link>
        </div>

        <div className={styles.wrapperImages}>
          {slicedImages.map((image, index) => (
            <img className={styles.image} src={image} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ChooseMattressBanner);
