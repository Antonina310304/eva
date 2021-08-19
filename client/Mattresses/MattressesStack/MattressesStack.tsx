import React, { FC, HTMLAttributes, MouseEvent, memo, useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';

import hexToHsl from '@Utils/hexToHsl';
import content from './content';
import styles from './MattressesStack.module.css';

export interface Sizes {
  width: number;
  height: number;
}

export interface LayerColors {
  aside: string;
  upper: string;
  pattern: string;
}

export interface Layer {
  elem: SVGGElement;
  colors: Partial<LayerColors>;
}

export interface Stack {
  width?: number;
  height?: number;
  svg?: SVGSVGElement;
  layers?: Layer[];
}

export interface MattressesStackProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  activeLayer?: number;
  onToggleLayer?: (e: MouseEvent, index: number) => void;
}

const MattressesStack: FC<MattressesStackProps> = (props) => {
  const { className, activeLayer = 0, onToggleLayer, ...restProps } = props;
  const stack = useRef<Stack>(null);
  const refContainer = useRef<HTMLDivElement>();
  const selectedLayer = useRef<number>(null);

  const resetSelection = useCallback(() => {
    stack.current.svg?.setAttribute('height', `${stack.current.height}px`);
    stack.current.svg?.classList.remove(styles.opened);

    selectedLayer.current = null;

    stack.current.layers.forEach((layer) => {
      layer.elem.classList.remove(styles.raised);
      layer.elem.classList.remove(styles.actived);
      layer.elem.classList.remove(styles.lowered);
    });
  }, []);

  const selectLayer = useCallback((target: SVGGElement) => {
    const targetIndex = stack.current.layers.findIndex((layer) => layer.elem === target);
    const isFirst = targetIndex === 0;
    const isLast = stack.current.layers.length - 1 === targetIndex;
    const diffHeight = isFirst || isLast ? 20 : 40;

    const bigHeight = stack.current.height + diffHeight;

    stack.current.svg?.setAttribute('height', `${bigHeight}px`);
    stack.current.svg?.classList.add(styles.opened);

    selectedLayer.current = targetIndex;

    stack.current.layers.forEach((layer, index) => {
      if (index < targetIndex) layer.elem.classList.toggle(styles.raised);
      if (index === targetIndex) layer.elem.classList.toggle(styles.actived);
      if (index > targetIndex) layer.elem.classList.toggle(styles.lowered);
    });
  }, []);

  const parseSvg = useCallback((svg: SVGSVGElement) => {
    const width = svg.width.baseVal.value;
    const height = svg.height.baseVal.value;
    const groups = Array.from(svg.querySelectorAll('g'));
    const layers = groups.reverse().map((elem) => {
      const colors: any = {};
      const pathElems = Array.from(elem.querySelectorAll('path'));

      pathElems.forEach((pathElem) => {
        const id = pathElem.getAttribute('id');
        const fill = pathElem.getAttribute('fill');
        const key = id.match(/^([a-zA-Z]*)_\d*$/)[1].toLowerCase();

        colors[key] = fill;
      });

      return { elem, colors };
    });

    stack.current = { svg, width, height, layers };
  }, []);

  const transformSvg = useCallback((svg: SVGSVGElement) => {
    svg.setAttribute('height', `${stack.current.height}px`);
    svg.setAttribute('width', `${stack.current.width}px`);

    const groups = Array.from(svg.querySelectorAll('g'));

    groups.forEach((group) => {
      const paths = Array.from(group.querySelectorAll('path'));

      paths.forEach((path) => {
        const id = path.getAttribute('id');
        const fill = path.getAttribute('fill');
        const key = id.match(/^([a-zA-Z]*)_\d*$/)[1].toLowerCase();

        if (key === 'upper') {
          const { h, s, l } = hexToHsl(fill);
          const newColor = `hsl(${h}, ${s}%, ${l - 10}%)`;

          path.setAttribute('fill', newColor);
        }

        path.removeAttribute('id');
        path.classList.add(styles[key]);
      });

      group.removeAttribute('id');
    });

    svg.removeAttribute('id');
  }, []);

  const handleClickSvg = useCallback(
    (e: MouseEvent) => {
      let target = e.target as SVGSVGElement;

      try {
        while (target.tagName !== 'svg' && target.tagName !== 'g') {
          target = (target.parentElement as unknown) as SVGSVGElement;
        }

        const index = stack.current.layers.findIndex((layer) => layer.elem === target);
        const targetLayer = stack.current.layers[index];
        const isAlreadyActive = targetLayer.elem.classList.contains(styles.actived);

        resetSelection();
        selectLayer(targetLayer.elem);

        if (onToggleLayer) onToggleLayer(e, isAlreadyActive ? null : index);
        // eslint-disable-next-line no-empty
      } catch {}
    },
    [onToggleLayer, resetSelection, selectLayer, stack],
  );

  useEffect(() => {
    if (!refContainer.current) return;

    const svg = refContainer.current.querySelector('svg');

    parseSvg(svg);
    transformSvg(svg);
  }, [handleClickSvg, parseSvg, transformSvg]);

  useEffect(() => {
    if (selectedLayer.current === activeLayer) return;

    const target = stack.current.layers[activeLayer];

    if (target) {
      selectLayer(target.elem);
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
      onClick={handleClickSvg}
    />
  );
};

export default memo(MattressesStack);
