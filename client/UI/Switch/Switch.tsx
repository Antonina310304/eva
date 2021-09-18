import { memo, InputHTMLAttributes, FC, useState, useCallback, useEffect } from 'react';
import cn from 'classnames';

import styles from './Switch.module.css';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Switch: FC<SwitchProps> = (props: SwitchProps) => {
  const { className, defaultChecked, checked, name, onChange, ...restProps } = props;
  const [actived, setActived] = useState(defaultChecked || checked || false);

  const handleChange = useCallback(
    (e) => {
      setActived(e.target.checked);
      if (onChange) onChange(e);
    },
    [onChange],
  );

  useEffect(() => {
    setActived(checked);
  }, [checked]);

  return (
    <div className={cn(styles.switch, { [styles.actived]: actived }, className)}>
      <input
        {...restProps}
        className={styles.control}
        type='checkbox'
        name={name}
        checked={actived}
        onChange={handleChange}
      />
    </div>
  );
};

export default memo(Switch);
