import { useEffect, useRef, useState } from 'react';

export const useScrollEffect = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Only trigger once
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

/**
 * How to use this hook:
 *
 * 1. Add a new style to your styled component:
 * transition: opacity 0.6s ease-out, transform 0.6s ease-out;
 * opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
 * transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(20px)')};
 *
 * 2. In your component:
 * import { useScrollEffect } from '../hooks/useScrollEffect';
 * const [ref, isVisible] = useScrollEffect({ threshold: 0.1 });
 * * return <YourStyledComponent ref={ref} isVisible={isVisible}>...</YourStyledComponent>;
 */