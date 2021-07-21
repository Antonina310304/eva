import React, {
  FC,
  HTMLAttributes,
  memo,
  useCallback,
  useState,
  useEffect,
  MouseEvent,
} from 'react';
import cn from 'classnames';

import Icon11MinusThin from '@divanru/icons/dist/11/minus_thin';
import Icon11PlusThin from '@divanru/icons/dist/11/plus_thin';

import Collapse from '@UI/Collapse';
import { MattressesLayerData } from '@Types/Mattresses';
import styles from './MattressesLayersAccordion.module.css';

export interface MattressesLayersAccordionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  layers: MattressesLayerData[];
  activeLayer?: number;
  onToggleLayer?: (e: MouseEvent, item: MattressesLayerData) => void;
}

const iconProps = { className: styles.icon, width: 15, height: 15 };

function getUniqLayers(layers: MattressesLayerData[]) {
  const retArr = [];
  for (let i = 0; i < layers.length; i += 1) {
    if (
      retArr.findIndex(
        (item) => item.title.trim().toLowerCase() === layers[i].title.trim().toLowerCase(),
      ) === -1
    ) {
      retArr.push(layers[i]);
    }
  }
  return retArr;
}

const MattressesLayersAccordion: FC<MattressesLayersAccordionProps> = (props) => {
  const { className, layers, activeLayer, onToggleLayer, ...restProps } = props;
  const [openedLayer, setOpenedLayer] = useState<MattressesLayerData>(layers[activeLayer]);

  const handleClickLayer = useCallback(
    (e: MouseEvent, layer: MattressesLayerData) => {
      setOpenedLayer(null);
      if (onToggleLayer) onToggleLayer(e, null);

      setOpenedLayer(() => {
        const newLayer = openedLayer === layer ? null : layer;

        if (newLayer && onToggleLayer) {
          onToggleLayer(e, newLayer);
        }

        return newLayer;
      });
    },
    [onToggleLayer, openedLayer],
  );

  useEffect(() => {
    setOpenedLayer(layers[activeLayer]);
  }, [activeLayer, layers]);

  return (
    <div {...restProps} className={cn(styles.accordion, className)}>
      {getUniqLayers(layers).map((layer, index) => {
        const collapsed = !openedLayer || openedLayer !== layer;

        return (
          <div className={styles.item} key={index} onClick={(e) => handleClickLayer(e, layer)}>
            <div className={styles.wrapperTitle}>
              <div className={styles.title}>{layer.title}</div>

              <div className={styles.wrapperIcon}>
                {collapsed ? <Icon11PlusThin {...iconProps} /> : <Icon11MinusThin {...iconProps} />}
              </div>
            </div>

            <Collapse collapsed={collapsed} duration={200}>
              <div className={styles.description}>{layer.description}</div>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};

export default memo(MattressesLayersAccordion);
