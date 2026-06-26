
import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

function AnimatedCounter({ value, duration = 2, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value.toString().replace(/,/g, ''));
    if (isNaN(end)) return;

    const totalMilSecDur = parseInt(duration);
    const incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      start += Math.ceil(end / (totalMilSecDur * 60)) || 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default AnimatedCounter;
