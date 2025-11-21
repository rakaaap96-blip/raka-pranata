import useImageTilt from '../../hooks/useImageTilt';
function ContactRobot() {
  const { imageRef, handleImageInteraction, resetImageTransform } = useImageTilt();

  return (
    <div
      ref={imageRef}
      className="relative w-full h-full sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] group cursor-pointer transition-all duration-500"
      onMouseMove={handleImageInteraction}
      onMouseLeave={resetImageTransform}
    >
      {/* Main Image Container */}
      <div className="relative w-200 h-200 rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl">
        <img
          src="/IMGG/ContactRobot.png"
          alt="AI Contact Robot"
          className="w-full h-full object-cover transition-all duration-1000 ease-out opacity-100 group-hover:opacity-90 group-hover:scale-105"
        />
        
      </div>
    </div>
  );
}

export default ContactRobot;