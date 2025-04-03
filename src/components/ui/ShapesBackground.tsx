
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ShapesBackgroundProps {
  className?: string;
}

const ShapesBackground = ({ className }: ShapesBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const shapes = container.querySelectorAll('.shape');
    
    const animateShapes = () => {
      shapes.forEach((shape) => {
        const duration = 15 + Math.random() * 15;
        const shapeElement = shape as HTMLElement;
        
        shapeElement.style.animationDuration = `${duration}s`;
      });
    };
    
    animateShapes();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}
    >
      {/* Abstract background shapes */}
      <div 
        className="shape shape-blue rounded-full w-64 h-64 blur-3xl opacity-20 animate-float"
        style={{ 
          top: '-5%', 
          left: '10%',
        }}
      ></div>
      <div 
        className="shape shape-purple rounded-full w-72 h-72 blur-3xl opacity-20 animate-float"
        style={{ 
          top: '30%', 
          right: '-10%',
        }}
      ></div>
      <div 
        className="shape shape-gold rounded-full w-48 h-48 blur-3xl opacity-20 animate-float"
        style={{ 
          bottom: '10%', 
          left: '20%',
        }}
      ></div>
      <div 
        className="shape shape-blue rounded-full w-56 h-56 blur-3xl opacity-20 animate-float"
        style={{ 
          bottom: '-10%', 
          right: '15%',
        }}
      ></div>
    </div>
  );
};

export default ShapesBackground;
