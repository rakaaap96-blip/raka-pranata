function GeometricPattern() {
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #d4af37 2px, transparent 2px),
            linear-gradient(150deg, #d4af37 2px, transparent 2px),
            linear-gradient(30deg, #d4af37 1px, transparent 1px),
            linear-gradient(150deg, #d4af37 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 80px 80px, 40px 40px, 40px 40px',
          backgroundPosition: '0 0, 0 40px, 40px 80px, 40px 120px',
        }}
      />
    </div>
  );
}

export default GeometricPattern;