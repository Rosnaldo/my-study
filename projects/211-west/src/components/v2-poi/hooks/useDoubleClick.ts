import { useCallback, useEffect, useState } from 'react';
import { useInitMouseClick } from './useInitMouseClick';

type Props = {
  contentRef: React.RefObject<HTMLDivElement>;
  handleDoubleClick: (e: MouseEvent) => void;
};

function useDoubleClick({ contentRef, handleDoubleClick }: Props) {
  let timer;
  const waitMs = 200;

  const secondClickClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      handleDoubleClick(e);
    },
    [handleDoubleClick]
  );

  const firstClickClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const content = contentRef.current;
      if (!content) return;

      clearTimeout(timer);
      content.addEventListener('click', secondClickClick);
      content.addEventListener('touchstart', secondClickClick, {
        passive: true
      });

      timer = setTimeout(function () {
        // unbinding the second click if the user doesn't click within the wait_time, 200ms in this case
        content.removeEventListener('click', secondClickClick);
        content.removeEventListener('touchstart', secondClickClick);
      }, waitMs);
    },
    [timer, secondClickClick]
  );

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  useInitMouseClick({ contentRef, handleMouseClick: firstClickClick });
}

export { useDoubleClick };
