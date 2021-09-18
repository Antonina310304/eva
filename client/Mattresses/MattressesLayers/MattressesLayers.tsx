import { FC, HTMLAttributes, memo, useCallback, MouseEvent, useState, useMemo } from 'react';
import cn from 'classnames';

import MattressesStack from '@Mattresses/MattressesStack';
import MattressesLayersAccordion from '@Mattresses/MattressesLayersAccordion';
import { MattressesLayerData, PriorityParameterData } from '@Types/Mattresses';
import styles from './MattressesLayers.module.css';

export interface MattressesLayersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  layers: MattressesLayerData[];
  priorityParameter: PriorityParameterData[];
}

const MattressesLayers: FC<MattressesLayersProps> = (props) => {
  const {
    className,
    title = 'Подробнее о составе',
    layers,
    priorityParameter,
    ...restProps
  } = props;
  const [activeLayer, setActiveLayer] = useState<MattressesLayerData>(null);
  const activeIndex = useMemo(() => {
    return layers.findIndex((layer) => layer === activeLayer);
  }, [activeLayer, layers]);

  const handleToggleLayerAccordion = useCallback((_e: MouseEvent, layer: MattressesLayerData) => {
    setActiveLayer(layer);
  }, []);

  const handleToggleLayerStock = useCallback(
    (_e, index) => {
      setActiveLayer(layers[index]);
    },
    [layers],
  );

  return (
    <div {...restProps} className={cn(styles.layers, className)}>
      <div className={styles.wrapperStack}>
        <div className={styles.stack}>
          <MattressesStack activeLayer={activeIndex} onToggleLayer={handleToggleLayerStock} />
        </div>

        {priorityParameter.length > 0 && (
          <div className={styles.characteristic}>
            {priorityParameter.map((param, index) => (
              <div className={styles.characteristicItem} key={index}>
                <div className={styles.characteristicValue}>{`${param.title} ${param.unit}`}</div>
                <div className={styles.characteristicTitle}>{param.description.toLowerCase()}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.wrapperAccordion}>
        <div className={styles.title}>{title}</div>
        <MattressesLayersAccordion
          layers={layers}
          activeLayer={activeIndex}
          onToggleLayer={handleToggleLayerAccordion}
        />
      </div>
    </div>
  );
};

export default memo(MattressesLayers);
