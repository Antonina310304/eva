import { createElement, memo, FC, ImgHTMLAttributes } from 'react';
import { useInView } from 'react-intersection-observer';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  tag?: string;
  src: string;
}

const Image: FC<ImageProps> = (props) => {
  const { tag = 'div', src, style, ...restProps } = props;

  const [ref, inView] = useInView({
    rootMargin: '100px 0px',
    triggerOnce: true,
  });

  return createElement(tag, {
    ...restProps,
    ref,
    style: { backgroundImage: inView ? `url('${src}')` : 'none', ...style },
  });
};

export default memo(Image);
