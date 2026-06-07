import MagneticButton from '../ui/MagneticButton';
import { FaDownload, FaComments } from 'react-icons/fa';

interface CTAButtonsProps {
  onDownloadCV: () => void;
  onLetsTalk: () => void;
}

function CTAButtons({ onDownloadCV, onLetsTalk }: CTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 justify-center lg:justify-start relative">
      <MagneticButton
        href="https://drive.google.com/file/d/1GMGxkzO1oAyBYOQQQD_BYLpcY6PQxaWH/view?usp=sharing"
        onClick={onDownloadCV}
        variant="primary"
        delay={0}
        icon={<FaDownload />}
        showEq
      >
        Download CV
      </MagneticButton>

      <MagneticButton
        href="https://wa.me/6287823268333?text=Hi%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch"
        onClick={onLetsTalk}
        variant="secondary"
        delay={100}
        icon={<FaComments />}
        showEq
      >
        Let's Talk
      </MagneticButton>
    </div>
  );
}

export default CTAButtons;