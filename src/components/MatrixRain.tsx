import { useState } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
const COLUMNS = 10;

function makeDrops() {
  return Array.from({ length: COLUMNS }, (_, i) => ({
    id: i,
    left: `${(i / COLUMNS) * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${12 + Math.random() * 18}s`,
    chars: Array.from({ length: 12 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''),
  }));
}

function MatrixRain() {
  const [drops] = useState(makeDrops);

  return (
    <div className="matrix-rain">
      {drops.map((drop) => (
        <span
          key={drop.id}
          style={{
            left: drop.left,
            animationDelay: drop.delay,
            animationDuration: drop.duration,
          }}
        >
          {drop.chars}
        </span>
      ))}
    </div>
  );
}

export default MatrixRain;
