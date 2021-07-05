export interface MattressesLayerData {
  title: string;
  description: string;
  images: {
    main: string;
    shadow: string;
  };
  mark?: {
    offsetX: number;
    offsetY: number;
  };
}

export interface PriorityParameterData {
  title: string;
  unit: string;
  description: string;
}
