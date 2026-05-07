import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (event: Event) => void,
  eventType: keyof DocumentEventMap = 'mousedown',
  eventListenerOptions?: AddEventListenerOptions
) => {
  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler(e);
      }
    };

    document.addEventListener(eventType, handleClick, eventListenerOptions);

    return () => {
      document.removeEventListener(eventType, handleClick, eventListenerOptions);
    };
  }, [ref, handler, eventType, eventListenerOptions]);
};
