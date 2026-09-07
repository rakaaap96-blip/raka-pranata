import { useEffect, useRef, useState } from 'react';

const sharedObservers = new Map<string, IntersectionObserver>();
const callbacks = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

function getObserver(options?: IntersectionObserverInit): IntersectionObserver {
  const key = JSON.stringify(options ?? { threshold: 0.1 });
  if (!sharedObservers.has(key)) {
    sharedObservers.set(key, new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        callbacks.get(entry.target)?.(entry);
      });
    }, options));
  }
  return sharedObservers.get(key)!;
}

function useInView(threshold = 0.1, rootMargin = '50px'): { ref: React.RefObject<HTMLDivElement | null>; isVisible: boolean } {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getObserver({ threshold, rootMargin });

    callbacks.set(el, (entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el);
        callbacks.delete(el);
      }
    });

    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

export default useInView;
