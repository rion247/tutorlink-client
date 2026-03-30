"use client";
import silderImage01 from "../../../../app/assets/svgs/sliderImage01.jpg";
import silderImage02 from "../../../../app/assets/svgs/tutorBanner.png";
import silderImage03 from "../../../../app/assets/svgs/heroImage.jpg";
import Slider from "react-slick";
import HeroSlide from "./HeroSlide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroBanner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className=" text-neutral-700 my-4 overflow-hidden">
      <Slider {...settings}>
        <HeroSlide
          title="Your Learning Journey Starts Here"
          paragraphText="Join thousands of students sharing knowledge, solving challenges, and achieving excellence together."
          imgLink={silderImage01}
          ctaButton01={"Get Started"}
          ctaButtonLink01={"/register"}
          ctaButton02={"View Subjects"}
          ctaButtonLink02={"/offered-subject"}
        />
        <HeroSlide
          title="Share Knowledge. Earn And Inspire"
          paragraphText="Join as a tutor, connect with students, and grow your teaching career while making a real impact."
          imgLink={silderImage02}
          ctaButton01={"Become a Tutor"}
          ctaButtonLink01={"/register"}
          ctaButton02={"Learn More"}
          ctaButtonLink02={"/about"}
        />
        <HeroSlide
          title="Empower Your Journey, Shape Your Future"
          paragraphText="Unlock your potential through learning and teaching—connect, improve, and build a brighter future together."
          imgLink={silderImage03}
          ctaButton01={"Login"}
          ctaButtonLink01={"/login"}
          ctaButton02={"Register"}
          ctaButtonLink02={"/register"}
        />
      </Slider>
    </div>
  );
};

export default HeroBanner;
