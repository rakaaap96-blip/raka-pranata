import { useCallback, useRef } from 'react';

function useImageTilt() {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageInteraction = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    imageRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${y * 10}deg) 
      rotateY(${x * 10}deg) 
      scale3d(1.05, 1.05, 1.05)
      translateZ(20px)
    `;

    const glow = Math.sqrt(x * x + y * y) * 50;
    imageRef.current.style.filter = `drop-shadow(0 0 ${glow}px rgba(212, 175, 55, 0.3))`;
  }, []);

  const resetImageTransform = useCallback(() => {
    if (imageRef.current) {
      imageRef.current.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)';
      imageRef.current.style.filter = 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.2))';
    }
  }, []);

  return {
    imageRef,
    handleImageInteraction,
    resetImageTransform,
  };
}

export default useImageTilt;