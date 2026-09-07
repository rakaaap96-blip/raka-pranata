import BrandSection from './BrandSection';
import SocialSection from './SocialSection';

interface FooterMainContentProps {
  isVisible: boolean;
}

function FooterMainContent({ isVisible }: FooterMainContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <BrandSection isVisible={isVisible} />
      <div className="text-center">
      <SocialSection isVisible={isVisible} />
      </div>
    </div>
  );
}

export default FooterMainContent;