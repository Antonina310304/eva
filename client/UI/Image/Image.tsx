import { createElement, memo, FC, ImgHTMLAttributes, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import cn from 'classnames';

import styles from './Image.module.css';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  tag?: string;
  src: string;
  needLoad?: boolean;
}

const Image: FC<ImageProps> = (props) => {
  const { className, tag = 'div', src, style, needLoad = true, ...restProps } = props;

  const [ref, inView] = useInView({
    rootMargin: '100px 0px',
    triggerOnce: true,
  });

  const backgroundImage = useMemo(() => {
    return needLoad && inView ? `url('${src}')` : 'none';
  }, [inView, needLoad, src]);

  return createElement(tag, {
    ...restProps,
    ref,
    className: cn(styles.image, className),
    style: { ...style, backgroundImage },
  });
};

export default memo(Image);
