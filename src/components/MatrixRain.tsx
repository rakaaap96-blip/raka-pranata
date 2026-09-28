import { useIsLite } from '../lib/device';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

function makeDrops(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i / count) * 100}%`,
    delay: `${Math.random() * 10}s`,
    duration: `${12 + Math.random() * 18}s`,
    chars: Array.from({ length: 12 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''),
  }));
}

function MatrixRain() {
  const isLite = useIsLite();

  // 10 columns x infinite translateY is a permanent compositing cost for a
  // purely decorative effect. Lite devices get a static scatter instead.
  const drops = isLite ? null : makeDrops(10);

  if (isLite) {
    return (
      <div className="matrix-rain" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i / 14) * 100}%`,
              top: `${(i * 37) % 90}%`,
            }}
          >
            {CHARS[(i * 17) % CHARS.length]}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="matrix-rain" aria-hidden="true">
      {drops?.map((drop) => (
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
