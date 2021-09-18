import { memo, FC, ReactChild } from 'react';

import Portal from '@UI/Portal';

export interface UniversalPortalProps {
  condition: boolean;
  children: ReactChild;
}

const UniversalPortal: FC<UniversalPortalProps> = (props) => {
  const { condition, children } = props;

  return condition ? <Portal>{children}</Portal> : <>{children}</>;
};

export default memo(UniversalPortal);
