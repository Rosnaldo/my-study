import { useEffect } from 'react';
import { env } from '~/helpers/env';

type Props = {
  handleMouseClick: (e: MouseEvent | TouchEvent) => void;
  contentRef: React.RefObject<HTMLDivElement>;
};

function useInitMouseClick({ contentRef, handleMouseClick }: Props) {
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (!env.IS_COMPANION) {
      content.addEventListener('click', handleMouseClick);
      content.addEventListener('touchstart', handleMouseClick, {
        passive: true
      });
    }

    return () => {
      if (!env.IS_COMPANION) {
        content.removeEventListener('click', handleMouseClick);
        content.removeEventListener('touchstart', handleMouseClick);
      }
    };
  }, [handleMouseClick]);
}

export { useInitMouseClick };
