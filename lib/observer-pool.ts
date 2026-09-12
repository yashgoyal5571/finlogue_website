/**
 * Singleton Intersection Observer Pool
 * Reduces browser memory overhead and dispatch churn from O(N) observers to O(1).
 */

type ObserverCallback = (entry: IntersectionObserverEntry) => void;

interface ObserverRegistration {
  callback: ObserverCallback;
  once: boolean;
}

const observersMap = new Map<string, IntersectionObserver>();
const registrationsMap = new WeakMap<Element, ObserverRegistration>();

function getObserverKey(threshold: number | number[], rootMargin: string): string {
  const tKey = Array.isArray(threshold) ? threshold.join(",") : String(threshold);
  return `${tKey}_${rootMargin}`;
}

/**
 * Register an element with a pooled IntersectionObserver.
 */
export function observeElement(
  element: Element,
  callback: ObserverCallback,
  options: {
    threshold?: number | number[];
    rootMargin?: string;
    once?: boolean;
  } = {}
): () => void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    // Fallback if IntersectionObserver is not supported
    callback({
      isIntersecting: true,
      target: element,
      time: Date.now(),
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRatio: 1,
      intersectionRect: element.getBoundingClientRect(),
      rootBounds: null,
    } as IntersectionObserverEntry);
    return () => {};
  }

  const threshold = options.threshold ?? 0.1;
  const rootMargin = options.rootMargin ?? "0px 0px -40px 0px";
  const once = options.once ?? true;
  const key = getObserverKey(threshold, rootMargin);

  registrationsMap.set(element, { callback, once });

  let observer = observersMap.get(key);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const reg = registrationsMap.get(entry.target);
          if (reg) {
            reg.callback(entry);
            if (entry.isIntersecting && reg.once) {
              observer?.unobserve(entry.target);
              registrationsMap.delete(entry.target);
            }
          }
        }
      },
      { threshold, rootMargin }
    );
    observersMap.set(key, observer);
  }

  observer.observe(element);

  return () => {
    observer?.unobserve(element);
    registrationsMap.delete(element);
  };
}
