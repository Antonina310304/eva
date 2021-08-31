import React, { FC, HTMLAttributes, CSSProperties, memo } from 'react';

import cn from 'classnames';
import st from './Flex.module.css';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  ai?: CSSProperties['alignItems'];
  jc?: CSSProperties['justifyContent'];
  fw?: CSSProperties['flexWrap'];
  flex?: CSSProperties['flex'];
  column?: boolean;
  styles?: CSSProperties;
}

const Flex: FC<FlexProps> = ({ className, fw, jc, ai, flex, column, styles, children }) => {
  return (
    <div
      className={cn(className, st.flex)}
      style={{
        justifyContent: jc,
        alignItems: ai,
        flexWrap: fw,
        flexDirection: column ? 'column' : 'row',
        flex,
        ...styles,
      }}
    >
      {children}
    </div>
  );
};

export default memo(Flex);
