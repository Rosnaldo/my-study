import { useEffect } from 'react';
import { env } from '~/helpers/env';

type Props = {
  handleMouseLeave: (e: MouseEvent | TouchEvent) => void;
  contentRef: React.RefObject<HTMLDivElement>;
};

function useInitMouseLeave({ contentRef, handleMouseLeave }: Props) {
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (!env.IS_COMPANION) {
      content.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (!env.IS_COMPANION) {
        content.removeEventListener('mouseup', handleMouseLeave);
      }
    };
  }, [handleMouseLeave]);
}

export { useInitMouseLeave };
