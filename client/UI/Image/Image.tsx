import { createElement, memo, FC, ImgHTMLAttributes } from 'react';
import { useInView } from 'react-intersection-observer';
import cn from 'classnames';

import styles from './Image.module.css';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  tag?: string;
  src: string;
}

const Image: FC<ImageProps> = (props) => {
  const { className, tag = 'div', src, style, ...restProps } = props;

  const [ref, inView] = useInView({
    rootMargin: '100px 0px',
    triggerOnce: true,
  });

  return createElement(tag, {
    ...restProps,
    ref,
    className: cn(styles.image, className),
    style: { backgroundImage: inView ? `url('${src}')` : 'none', ...style },
  });
};

export default memo(Image);
