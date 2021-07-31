import React, { FC, HTMLAttributes, memo, ReactElement } from 'react';
import cn from 'classnames';

import { Api } from '@Api/index';
import useRequest from '@Hooks/useRequest';
import useMeta from '@Queries/useMeta';
import styles from './TemplateMain.module.css';

export interface TemplateMainProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactElement | ReactElement[];
}

const TemplateMain: FC<TemplateMainProps> = (props) => {
  const { className, children, ...restProps } = props;
  const request = useRequest();
  const meta = useMeta({ ssr: true });

  Api.setRequest(request);
  Api.setServices(meta.data?.services);

  return (
    <div {...restProps} className={cn(styles.templateMain, className)}>
      {children}
    </div>
  );
};

export default memo(TemplateMain);
