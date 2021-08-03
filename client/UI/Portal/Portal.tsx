import { useEffect, useState, memo, FC, ReactChild } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children?: ReactChild;
}

const Portal: FC<PortalProps> = (props: PortalProps) => {
  const { children } = props;

  const [parent, setParent] = useState<HTMLElement>();

  useEffect(() => {
    setParent(document.body);

    return () => setParent(null);
  }, [children]);

  return !!parent && createPortal(children, parent);
};

export default memo(Portal);
