import { useEffect, useRef, useState } from 'react';

const AnimatedNumber = ({ end, duration = 2000, prefix = '', suffix = '', delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Start animation after delay
          setTimeout(() => {
            const startTime = performance.now();
            // Adjust duration so all animations end at the same time
            // If delay is 200ms and duration is 2000ms, this animation runs for 1800ms
            const adjustedDuration = duration - delay;

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / adjustedDuration, 1);

              // Ease-out cubic: fast start, slow end
              // progress=0 → easeOut=0, progress=0.5 → easeOut=0.875, progress=1 → easeOut=1
              const easeOut = 1 - Math.pow(1 - progress, 3);

              setCount(Math.floor(easeOut * end));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(end);
              }
            };
            
            requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated, delay]);

  return (
    <span ref={elementRef}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedNumber;
