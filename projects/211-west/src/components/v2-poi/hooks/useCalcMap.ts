import { useEffect, useState } from 'react';
import { Map, MapArea, Position } from '../types';

type Props = {
  map: Map;
  imgRef: React.RefObject<HTMLImageElement>;
};

function useCalcMap({ map, imgRef }: Props): {
  map: Map;
} {
  const [newMap, setNewMap] = useState<Map>(map);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const calcNewCoords = (position: Position) => {
      const { x, y } = position;
      const newX = (100 * y) / img.naturalHeight;
      const newY = (100 * x) / img.naturalWidth;
      return { x: newX, y: newY };
    };
    const getNewAreas = (areas: MapArea[]): MapArea[] =>
      areas.map((area) => ({
        ...area,
        position: calcNewCoords(area.position)
      }));
    setNewMap({
      ...map,
      areas: getNewAreas(map.areas)
    });
  }, [map, imgRef]);

  return { map: newMap };
}

export { useCalcMap };
