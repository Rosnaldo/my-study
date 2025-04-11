import { useEffect, useLayoutEffect, useRef } from 'react';
import { useSyncedState } from './useSyncedState';
import { env } from '~/helpers/env';

export function useSyncScroll() {
  const contentRef = useRef<any | null>(null);
  const [scroll, setScroll] = useSyncedState<number>(
    'poi-scroll',
    contentRef.current?.scrollTop || 0
  );
  const totalScroll =
    contentRef.current?.scrollHeight -
    contentRef.current?.getBoundingClientRect().height;

  useEffect(() => {
    if (contentRef.current && env.IS_COMPANION) {
      contentRef.current.scrollTo({
        top: scroll * totalScroll,
        behavior: 'smooth'
      });
    }
  }, [scroll]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content?.scrollHeight) return;

    const handleScroll = (e) => {
      if (!env.IS_COMPANION) {
        const newScroll = e.target.scrollTop / totalScroll;
        setScroll(newScroll);
      }
    };

    content.addEventListener('scroll', handleScroll);

    return () => {
      content.removeEventListener('scroll', handleScroll);
    };
  }, [contentRef, contentRef.current?.scrollHeight]);

  return { contentRef };
}
