import { useEffect, useRef } from "react";
export function useDebouncedEffect(effect, deps, delay) {
  const cleanupRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      cleanupRef.current = effect();
    }, delay);
    return () => {
      clearTimeout(timer);
      if (typeof cleanupRef.current === "function") cleanupRef.current();
    };
  }, [...deps, delay]);
}
