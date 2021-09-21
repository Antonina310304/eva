export interface GallerySlidesState {
  coordX: number;
  width: number;
}

export interface GalleryState {
  slides: GallerySlidesState[];
  min: number;
  max: number;
  viewportWidth: number;
  layerWidth: number;
  initialized: boolean;
  shiftX: number;
  deltaX: number;
  dragging: boolean;
  current: number;
  animation: boolean;
  canDrag: boolean;
  generalIndent: number;
}

export interface ProgressOptions {
  width: number;
  offset: number;
  finished: boolean;
}

export interface CalcMinParams {
  viewportWidth: number;
  layerWidth: number;
}
