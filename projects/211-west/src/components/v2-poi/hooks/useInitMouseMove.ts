import { useEffect } from 'react';
import { env } from '~/helpers/env';

type Props = {
  handleMouseMove: (e: MouseEvent | TouchEvent) => void;
  contentRef: React.RefObject<HTMLDivElement>;
};

function useInitMouseMove({ contentRef, handleMouseMove }: Props) {
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (!env.IS_COMPANION) {
      content.addEventListener('mousemove', handleMouseMove);
      content.addEventListener('touchmove', handleMouseMove, { passive: true });
    }

    return () => {
      if (!env.IS_COMPANION) {
        content.removeEventListener('mousemove', handleMouseMove);
        content.removeEventListener('touchmove', handleMouseMove);
      }
    };
  }, [handleMouseMove]);
}

export { useInitMouseMove };
