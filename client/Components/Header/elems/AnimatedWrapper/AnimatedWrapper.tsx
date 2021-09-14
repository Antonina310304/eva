import React, { FC, HTMLAttributes, Ref, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

export interface AnimatedWrapperProps extends HTMLAttributes<HTMLDivElement> {
  classMame?: string;
  isShowSubMenu: boolean;
  isShowSubMenuContent: boolean;
  setIsShowSubMenu: (arg: boolean) => void;
  setIsShowSubMenuContent: (arg: boolean) => void;
  children: (arg: Ref<HTMLDivElement>) => React.ReactNode;
}
const AnimatedWrapper: FC<AnimatedWrapperProps> = ({
  isShowSubMenu,
  className,
  setIsShowSubMenuContent,
  setIsShowSubMenu,
  children,
}) => {
  const wrapperRef = useRef<HTMLInputElement>();
  const [{ left }, api] = useSpring(() => ({
    from: { left: `0%` },
    config: { duration: 300 },
  }));

  useEffect(() => {
    if (isShowSubMenu) {
      api.start({
        left: `-100%`,
      });
      setIsShowSubMenuContent(true);
    } else {
      wrapperRef.current.scrollTo(0, 0);
      api.start({
        left: `0%`,
        onRest: () => {
          setIsShowSubMenuContent(false);
        },
      });
    }
  }, [setIsShowSubMenuContent, setIsShowSubMenu, isShowSubMenu, api]);

  return (
    <animated.div style={{ left }} className={className}>
      {children(wrapperRef)}
    </animated.div>
  );
};

export default AnimatedWrapper;
