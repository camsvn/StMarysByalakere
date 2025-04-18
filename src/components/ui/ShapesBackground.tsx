"use client"

import { useEffect, useRef } from "react";

const ShapesBackground = () => {
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate the shapes with random motion
    shapesRef.current.forEach((shape) => {
      if (!shape) return;
      
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const speed = 20 + Math.random() * 40;
      const size = 100 + Math.random() * 200;
      
      shape.style.left = `${xPos}%`;
      shape.style.top = `${yPos}%`;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      
      const animation = shape.animate(
        [
          { transform: 'translate(0, 0) rotate(0deg)' },
          { transform: `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 60 - 30}deg)` }
        ],
        {
          duration: speed * 1000,
          iterations: Infinity,
          direction: 'alternate',
          easing: 'ease-in-out'
        }
      );
      
      return () => animation.cancel();
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div 
      ref={el => { shapesRef.current[0] = el; }}
      className="shape shape-blue rounded-full blur-3xl absolute opacity-20"
      />
      <div 
      ref={el => { shapesRef.current[1] = el; }}
      className="shape shape-purple rounded-full blur-3xl absolute opacity-20"
      />
      <div 
      ref={el => { shapesRef.current[2] = el; }}
      className="shape shape-gold rounded-full blur-3xl absolute opacity-20"
      />
    </div>
  );
};

export default ShapesBackground;
