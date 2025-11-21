// hooks/useTyping.ts
import { useState, useEffect, useRef } from 'react';

function useTyping(words: string[]) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const actionRef = useRef<'typing' | 'deleting' | 'pause'>('typing');
  const startTimeRef = useRef<number>(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (words.length === 0) return;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 1500;
    const loopDelay = 500;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const currentWord = words[currentWordIndex % words.length];

      if (actionRef.current === 'typing') {
        if (elapsed > typingSpeed) {
          const nextText = currentWord.slice(0, currentText.length + 1);
          setCurrentText(nextText);
          startTimeRef.current = timestamp;
          if (nextText === currentWord) {
            actionRef.current = 'pause';
            startTimeRef.current = timestamp;
          }
        }
      } else if (actionRef.current === 'pause') {
        if (elapsed > pauseDuration) {
          actionRef.current = 'deleting';
          startTimeRef.current = timestamp;
        }
      } else if (actionRef.current === 'deleting') {
        if (elapsed > deletingSpeed) {
          const nextText = currentText.slice(0, -1);
          setCurrentText(nextText);
          startTimeRef.current = timestamp;
          if (nextText === '') {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            actionRef.current = 'typing';
            startTimeRef.current = timestamp + loopDelay;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [words, currentWordIndex, currentText]);

  return currentText; // Hanya return teks
}

export default useTyping;