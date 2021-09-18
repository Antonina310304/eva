import { FC, HTMLAttributes, memo, useCallback, useState, useRef, useEffect, useMemo } from 'react';
import cn from 'classnames';

import debounce from '@Utils/debounce';
import styles from './Collapse.module.css';

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  collapsed?: boolean;
  duration?: number;
  triggerUpdate?: number;
}

const Collapse: FC<CollapseProps> = (props) => {
  const {
    className,
    collapsed,
    duration = 500,
    children,
    style,
    triggerUpdate,
    ...restProps
  } = props;
  const [containerHeight, setContainerHeight] = useState(collapsed ? 0 : 'auto');

  const refContainer = useRef(null);

  const setHeight = useCallback(() => {
    if (!refContainer.current) return;

    setContainerHeight(refContainer.current.clientHeight);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setContainerHeight('auto');
    setHeight();
  }, [setHeight]);

  const styleCollapse = useMemo(() => {
    const height = typeof containerHeight === 'string' ? containerHeight : `${containerHeight}px`;

    return {
      ...style,
      height: collapsed ? 0 : height,
      transitionDuration: `${duration}ms`,
    };
  }, [collapsed, duration, containerHeight, style]);

  useEffect(() => {
    setTimeout(setHeight, 1000);

    window.addEventListener('resize', debounce(setHeight));

    return window.removeEventListener('resize', debounce(setHeight));
  }, [duration, setHeight]);

  return (
    <div
      {...restProps}
      className={cn(styles.collapse, className)}
      style={styleCollapse}
      onTransitionEnd={handleTransitionEnd}
    >
      <div ref={refContainer}>{children}</div>
    </div>
  );
};

export default memo(Collapse);
