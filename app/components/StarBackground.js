'use client';
import { useEffect, useRef } from 'react';

export default function StarBackground() {
  const small = useRef(null);
  const med = useRef(null);
  const big = useRef(null);

  const genShadows = (count) => {
    let s = '';
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 2000;
      const y = Math.random() * 2000;
      s += `${x}px ${y}px #FFF${i < count - 1 ? ',' : ''}`;
    }
    return s;
  };

  useEffect(() => {
    if (small.current) small.current.style.boxShadow = genShadows(700);
    if (med.current) med.current.style.boxShadow = genShadows(200);
    if (big.current) big.current.style.boxShadow = genShadows(100);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: "linear-gradient(135deg, #000000 40%, rgba(0,100,200,0.3) 70%, rgba(0,150,255,0.2) 100%)",
          filter: "blur(40px)",
          transition: "background 0.8s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden="true"
      />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div ref={small} className="star-layer star-small" />
        <div ref={med}   className="star-layer star-medium" />
        <div ref={big}   className="star-layer star-big" />
      </div>
    </>
  );
}
