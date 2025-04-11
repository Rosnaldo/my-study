import { useEffect } from 'react';
import { env } from '~/helpers/env';

type Props = {
  handleMouseUp: (e: MouseEvent | TouchEvent) => void;
  contentRef: React.RefObject<HTMLDivElement>;
};

function useInitMouseUp({ contentRef, handleMouseUp }: Props) {
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (!env.IS_COMPANION) {
      content.addEventListener('mouseup', handleMouseUp);
      content.addEventListener('touchend', handleMouseUp, { passive: true });
    }

    return () => {
      if (!env.IS_COMPANION) {
        content.removeEventListener('mouseup', handleMouseUp);
        content.removeEventListener('touchend', handleMouseUp);
      }
    };
  }, [handleMouseUp]);
}

export { useInitMouseUp };
