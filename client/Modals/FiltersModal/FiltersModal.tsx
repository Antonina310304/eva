import React, { memo, FC, useCallback, useState, useEffect, useRef } from 'react';

import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import Footer from './elements/Footer';
import Content from './elements/Content';

const formatName = (name: string) => name.replace(/ /g, '');

const FiltersModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { selectedFilterId } = modal.data;
  const [scrollTop, setScrollTop] = useState(null);
  const refContent = useRef<HTMLDivElement>();

  const handleOpen = useCallback(() => {
    if (!refContent.current) return;
    if (!selectedFilterId) return;

    const id = `#${formatName(selectedFilterId)}`;
    const groupElem: HTMLDivElement = refContent.current.querySelector(id);

    if (!groupElem) return;

    setScrollTop(groupElem.offsetTop);
    setTimeout(() => setScrollTop(undefined));
  }, [selectedFilterId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleOpen(), []);

  return (
    <ModalSidebar
      {...restProps}
      modal={modal}
      title='Фильтр'
      view='fullscreen'
      scrollTop={scrollTop}
      footer={<Footer onApply={modal.data.onApply} />}
    >
      <div ref={refContent}>
        <Content />
      </div>
    </ModalSidebar>
  );
};

export default memo(FiltersModal);
