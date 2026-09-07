import MatrixRain from '../components/MatrixRain';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <div
      className="relative min-h-screen bg-[#000000] text-[#ffffea]"
      style={{
        background: [
          'linear-gradient(rgba(212, 175, 55, 0.06) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(212, 175, 55, 0.06) 1px, transparent 1px)',
          'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 55%)',
          'linear-gradient(180deg, #000000 0%, #050505 50%, #000000 100%)',
        ].join(', '),
        backgroundSize: '40px 40px, 40px 40px, auto, auto',
      }}
    >
      <MatrixRain />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default BackgroundWrapper;