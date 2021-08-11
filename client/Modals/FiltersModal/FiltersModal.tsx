import React, { memo, FC, useCallback, useState, useEffect, useRef } from 'react';

import ModalSidebar, { ModalSidebarProps } from '@Components/ModalSidebar';
import Footer from './elements/Footer';
import Content from './elements/Content';

const formatName = (name: string) => name.replace(/ /g, '');

const FiltersModal: FC<ModalSidebarProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { selectedFilterId } = modal.data;
  const [waiting, setWaiting] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const refContent = useRef<HTMLDivElement>();

  const handleApply = useCallback(
    async (e) => {
      if (typeof modal.data.onApply !== 'function') return;

      setWaiting(true);
      await modal.data.onApply(e);
      setWaiting(false);
    },
    [modal.data],
  );

  useEffect(() => {
    if (!refContent.current) return;
    if (!selectedFilterId) return;

    const id = `#${formatName(selectedFilterId)}`;
    const groupElem: HTMLDivElement = refContent.current.querySelector(id);

    if (!groupElem) return;

    setScrollTop(groupElem.offsetTop);
  }, [selectedFilterId]);

  return (
    <ModalSidebar
      {...restProps}
      modal={modal}
      title='Фильтр'
      view='fullscreen'
      scrollTop={scrollTop}
      footer={<Footer waiting={waiting} onApply={handleApply} />}
    >
      <div ref={refContent}>
        <Content />
      </div>
    </ModalSidebar>
  );
};

export default memo(FiltersModal);
