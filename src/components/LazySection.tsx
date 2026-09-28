import { useRef, useState, useEffect, type ReactNode } from 'react';
import { REVEAL_EVENT } from '../lib/reveal';

/**
 * Mounts `children` only once the wrapper is within `rootMargin` of the
 * viewport, then keeps it mounted.
 *
 * React.lazy + Suspense alone defers nothing here: every section sits in the
 * initial tree, so the browser fires all five chunk requests in parallel and
 * React mounts all five subtrees in one pass (~1.3 s of Style & Layout under
 * mobile throttling). Gating on intersection makes the visitor pay for one
 * section at a time while scrolling.
 *
 * The anchor `id` lives on the wrapper, not the section, so `getElementById`
 * and in-page links keep working before the content mounts.
 */
function LazySection({
  id,
  children,
  minHeight = '100vh',
  rootMargin = '700px 0px',
}: {
  id: string;
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(() => {
    // Deep link like /#contact: the browser has already scrolled to the
    // placeholder, so there is no point waiting for an intersection.
    if (typeof window === 'undefined') return false;
    return window.location.hash === `#${id}`;
  });

  useEffect(() => {
    const onReveal = (e: Event) => {
      if ((e as CustomEvent<string>).detail === id) setShouldRender(true);
    };
    window.addEventListener(REVEAL_EVENT, onReveal);
    return () => window.removeEventListener(REVEAL_EVENT, onReveal);
  }, [id]);

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldRender) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender, rootMargin]);

  return (
    <div id={id} ref={ref} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
}

export default LazySection;
