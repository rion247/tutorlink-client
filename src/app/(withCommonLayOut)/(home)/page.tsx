import Advertisement from "@/components/modules/home/Advertisement/Advertisement";
import HeroBanner from "@/components/modules/home/HeroBanner/HeroBanner";
import OfferedSubject from "@/components/modules/home/OfferedSubject/OfferedSubject";
import Testimonials from "@/components/modules/home/Testimonials/Testimonials";
import TutorSection from "@/components/modules/home/TutorSection/TutorSection";
import Footer from "@/components/shared/Footer/Footer";
import { getAllTestimonials } from "@/services/Testimonials";

const HomePage = async () => {
  const testimonialsdata = await getAllTestimonials();

  return (
    <div>
      <HeroBanner />
      <OfferedSubject />
      <TutorSection />
      <Advertisement />
      <Testimonials testimonials={testimonialsdata} />
      <Footer />
    </div>
  );
};

export default HomePage;
