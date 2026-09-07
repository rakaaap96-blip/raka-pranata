function GeometricPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Hex grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(60deg, #d4af37 1.5px, transparent 1.5px),
            linear-gradient(-60deg, #d4af37 1.5px, transparent 1.5px),
            linear-gradient(60deg, #d4af37 0.5px, transparent 0.5px),
            linear-gradient(-60deg, #d4af37 0.5px, transparent 0.5px)
          `,
          backgroundSize: '100px 60px, 100px 60px, 50px 30px, 50px 30px',
          backgroundPosition: '0 0, 0 0, 25px 15px, 25px 15px',
        }}
      />
      {/* Circuit dots */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
}

export default GeometricPattern;