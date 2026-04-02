"use client";
import TLContainer from "@/components/ui/core/TLContainer";
import TestimonialsCard from "./TestimonialsCard";
import { TTestimonial } from "@/types";
import Slider from "react-slick";

const Testimonials = ({ testimonials }: { testimonials: TTestimonial[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <TLContainer className="my-15 md:my-20 lg:my-32 overflow-hidden">
      <Slider {...settings}>
        {testimonials.length &&
          testimonials.map((testimonial: TTestimonial) => (
            <TestimonialsCard key={testimonial?.id} testimonial={testimonial} />
          ))}
      </Slider>
    </TLContainer>
  );
};

export default Testimonials;
