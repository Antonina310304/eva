import React, {
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
import cns from 'classnames';

import useKeyboardEvents from '@divanru/ts-utils/useKeyboardEvents';
import { Cylindo360ViewerOpts } from '@Types/Cylindo360Viewer';

import styles from './Cylindo360Viewer.module.css';

export interface Coordinates {
  x: number;
  y: number;
}

export interface Cylindo360ViewerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  opts?: Cylindo360ViewerOpts;
  zoom?: [number, number];
  angle?: number;
  autonomic?: boolean;
  onZoomEnter?: (coordinates: Coordinates) => void;
  onZoomExit?: () => void;
  onChangeFrameIndex?: (index: number) => void;
  onViewerReady?: () => void;
  onError?: () => void;
}

const defaultOpts: Cylindo360ViewerOpts = {
  progressBar: false,
  fullscreen: false,
  thumbs: false,
  features: [],
  tooltipDragText: '',
  tooltipZoomText: '',
  zoomButton: false,
};

const Cylindo360Viewer: FC<Cylindo360ViewerProps> = (props) => {
  const {
    className,
    opts = {},
    zoom,
    angle: propsAngle,
    autonomic,
    onZoomEnter,
    onZoomExit,
    onChangeFrameIndex,
    onViewerReady,
    onError,
    ...restProps
  } = props;
  const [containerID, setContainerID] = useState(null);
  const [angle, setAngle] = useState(0);
  const refCylindo = useRef(null);

  const fullOpts = useMemo(() => {
    return { ...defaultOpts, ...opts, containerID: `#${containerID}` };
  }, [containerID, opts]);

  const handleReady = useCallback(() => {
    refCylindo.current = refCylindo.current || window.cylindo.viewer.create(fullOpts);

    const { events } = refCylindo.current;

    if (onZoomEnter)
      refCylindo.current.on(events.ZOOM_ENTER, (_: string, params: Coordinates) =>
        onZoomEnter(params),
      );
    if (onZoomExit) refCylindo.current.on(events.ZOOM_EXIT, onZoomExit);
    if (onViewerReady) refCylindo.current.on(events.VIEWER_READY, onViewerReady);
    if (onError) refCylindo.current.on(events.ERROR, () => onError());
  }, [fullOpts, onError, onViewerReady, onZoomEnter, onZoomExit]);

  const handleLoad = useCallback(() => {
    if (!window.cylindo) return;

    window.cylindo.on('ready', handleReady);
  }, [handleReady]);

  const handleRotateLeft = useCallback(() => {
    if (autonomic) return;

    // подогнанный огород из-за не равномерности распределения картинок по окружности
    let ang = refCylindo.current.getCurrentFrameIndex();
    if (ang > 23) {
      ang = (ang - 1) * 11;
    } else if (ang === 23) {
      ang = (ang - 1) * 10;
    } else if (ang <= 6) {
      ang = (ang - 1) * 5;
    } else {
      ang = (ang - 1) * 10;
    }

    refCylindo.current.goToAngle(ang === 0 ? 350 : ang);
  }, [autonomic]);

  const handleRotateRight = useCallback(() => {
    if (autonomic) return;

    const ang = refCylindo.current.getCurrentFrameIndex() * 12;
    refCylindo.current.goToAngle(ang >= 360 ? 0 : ang);
  }, [autonomic]);

  useEffect(() => {
    if (refCylindo.current) return;

    setContainerID(`cylindo-${nanoid()}`);
  }, []);

  // Загружаем внешние ресурсы
  useEffect(() => {
    if (!containerID) return;
    if (window.cylindo) {
      handleReady();
      return;
    }

    const script = document.createElement('script');
    const link = document.createElement('link');

    script.onload = handleLoad;
    script.src = 'https://viewer.cylindo.com/v4/viewer.js';
    link.rel = 'stylesheet';
    link.href = 'https://viewer.cylindo.com/v4/viewer.css';

    document.head.appendChild(script);
    document.head.appendChild(link);
  }, [containerID, handleReady, handleLoad]);

  // Применяем к модели features
  useEffect(() => {
    if (!refCylindo.current) return;

    refCylindo.current.setFeatures(opts.features);
  }, [opts.features]);

  // Примеяем zoom
  useEffect(() => {
    if (!refCylindo.current) return;

    if (!zoom) {
      refCylindo.current.exitZoom();
      return;
    }

    const [x, y] = zoom;
    refCylindo.current.zoom(x, y);
  }, [zoom]);

  // Применяем angle
  useEffect(() => {
    if (!refCylindo.current) return;
    if (!angle) return;

    refCylindo.current.goToAngle(angle);
  }, [angle]);

  // Синхронизируем внешний angle со внутренним
  useEffect(() => {
    if (!propsAngle) return;

    setAngle(propsAngle);
  }, [propsAngle]);

  // Имитируем событие изменения индекса фрейма через интервал, так как такого события нет в Cylindo API
  useEffect(() => {
    let oldIndex = 1;
    const intervalId = setInterval(() => {
      if (!onChangeFrameIndex) return;
      if (!refCylindo.current) return;

      const newIndex = refCylindo.current.getCurrentFrameIndex();

      if (newIndex !== oldIndex) {
        onChangeFrameIndex(newIndex);
        oldIndex = newIndex;
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [onChangeFrameIndex]);

  useKeyboardEvents({ onArrowLeft: handleRotateLeft, onArrowRight: handleRotateRight });

  return (
    <div {...restProps} className={cns(styles.cylindo360Viewer, className)} id={containerID} />
  );
};

export default memo(Cylindo360Viewer);
