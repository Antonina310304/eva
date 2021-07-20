import React, { FC, HTMLAttributes, memo, useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';

import content from './content';
import styles from './MattressesStack.module.css';

export interface Sizes {
  width: number;
  height: number;
}

export interface MattressesStackProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  activeLayer?: number;
  onToggleLayer?: (e: MouseEvent, index: number) => void;
}

const MattressesStack: FC<MattressesStackProps> = (props) => {
  const { className, activeLayer = 0, onToggleLayer, ...restProps } = props;
  const refContainer = useRef<HTMLDivElement>();
  const schema = useRef<SVGSVGElement>(null);
  const layers = useRef<SVGGElement[]>([]);
  const sizes = useRef<Sizes>(null);
  const selectedLayer = useRef<number>(null);

  const resetSelection = useCallback(() => {
    schema.current.setAttribute('height', `${sizes.current.height}px`);
    schema.current.classList.remove(styles.opened);
    selectedLayer.current = null;

    layers.current.forEach((layer) => {
      layer.classList.remove(styles.raised);
      layer.classList.remove(styles.actived);
      layer.classList.remove(styles.lowered);
    });
  }, []);

  const selectLayer = useCallback((target: SVGGElement) => {
    const targetIndex = layers.current.findIndex((layer) => layer === target);
    const isFirst = targetIndex === 0;
    const isLast = layers.current.length - 1 === targetIndex;
    const diffHeight = isFirst || isLast ? 20 : 40;

    const bigHeight = schema.current.height.baseVal.value + diffHeight;

    schema.current.setAttribute('height', `${bigHeight}px`);
    schema.current.classList.add(styles.opened);
    selectedLayer.current = targetIndex;

    layers.current.forEach((layer, index) => {
      if (index < targetIndex) layer.classList.toggle(styles.raised);
      if (index === targetIndex) layer.classList.toggle(styles.actived);
      if (index > targetIndex) layer.classList.toggle(styles.lowered);
    });
  }, []);

  const transformPaths = useCallback((paths: SVGPathElement[]) => {
    paths.forEach((path) => {
      if (path.classList.contains('Aside')) path.classList.add(styles.aside);
      if (path.classList.contains('Upper')) path.classList.add(styles.upper);
      if (path.classList.contains('Pattern')) path.classList.add(styles.pattern);
    });
  }, []);

  const handleClickSvg = useCallback(
    (e: MouseEvent) => {
      let target = e.target as SVGElement;

      try {
        while (target.tagName !== 'svg' && target.tagName !== 'g') {
          target = (target.parentElement as unknown) as SVGElement;
        }

        const index = layers.current.findIndex((layer) => layer === target);
        const targetLayer = layers.current[index];
        const isAlreadyActive = targetLayer.classList.contains(styles.actived);

        resetSelection();
        selectLayer(targetLayer);

        if (onToggleLayer) onToggleLayer(e, isAlreadyActive ? null : index);
        // eslint-disable-next-line no-empty
      } catch {}
    },
    [onToggleLayer, resetSelection, selectLayer],
  );

  useEffect(() => {
    if (!refContainer.current) return;

    const svg = refContainer.current.querySelector('svg');
    const groups = Array.from(svg.querySelectorAll('g'));
    const paths = Array.from(svg.querySelectorAll('path'));
    const height = svg.height.baseVal.value;
    const width = svg.width.baseVal.value;

    schema.current = svg;
    sizes.current = { width, height };
    layers.current = groups.reverse();

    transformPaths(paths);
    svg.setAttribute('height', `${height}px`);
    svg.setAttribute('width', `${width}px`);
    svg.addEventListener('click', handleClickSvg);
  }, [handleClickSvg, transformPaths]);

  useEffect(() => {
    if (!layers.current) return;
    if (selectedLayer.current === activeLayer) return;

    const target = layers.current[activeLayer];

    if (target) {
      selectLayer(target);
    } else {
      resetSelection();
    }
  }, [activeLayer, resetSelection, selectLayer]);

  return (
    <div
      {...restProps}
      className={cn(styles.stack, className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: content }}
      ref={refContainer}
    />
  );
};

export default memo(MattressesStack);
