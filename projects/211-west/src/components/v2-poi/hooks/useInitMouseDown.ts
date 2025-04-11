import { useEffect } from 'react';
import { env } from '~/helpers/env';

type Props = {
  handleMouseDown: (e: MouseEvent | TouchEvent) => void;
  contentRef: React.RefObject<HTMLDivElement>;
};

function useInitMouseDown({ contentRef, handleMouseDown }: Props) {
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (!env.IS_COMPANION) {
      content.addEventListener('mousedown', handleMouseDown);
      content.addEventListener('touchstart', handleMouseDown, {
        passive: true
      });
    }

    return () => {
      if (!env.IS_COMPANION) {
        content.removeEventListener('mousedown', handleMouseDown);
        content.removeEventListener('touchstart', handleMouseDown);
      }
    };
  }, [handleMouseDown]);
}

export { useInitMouseDown };
