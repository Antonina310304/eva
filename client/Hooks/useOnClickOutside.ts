import { useEffect, useRef, MutableRefObject } from 'react';

type OnClickOutsideCallback = (e: any) => void;

type UseOnClickOutsideFunction = (
  onClickOutside: OnClickOutsideCallback,
  disabled?: boolean,
  ignoreList?: HTMLElement[],
) => MutableRefObject<HTMLDivElement>;

const useOnClickOutside: UseOnClickOutsideFunction = (
  onClickOutside,
  disabled,
  ignoreList = [],
) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    function check(e: { target: any }) {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      let needClick = true;

      if (ignoreList.length > 0) {
        needClick = !ignoreList.every((node) => {
          return node.isEqualNode(ref.current) || node.contains(ref.current);
        });
      }

      if (needClick) {
        onClickOutside(e);
      }
    }

    function cleanup() {
      window.removeEventListener('click', check);
    }

    if (!disabled) {
      window.addEventListener('click', check);
    }

    return cleanup;
  }, [disabled, ignoreList, onClickOutside]);

  return ref;
};

export default useOnClickOutside;
