import TLContainer from "@/components/ui/core/TLContainer";
import { getAllTutor } from "@/services/Tutor";
import TutorSectionCard from "./TutorSectionCard";
import { ITutor } from "@/types";

const TutorSection = async () => {
  const { data } = await getAllTutor();

  return (
    <TLContainer className="my-15 md:my-20 lg:my-32 xl:my-38">
      <div className="text-center mb-14 lg:mb-20">
        <h4 className=" text-2xl md:text-4xl font-extrabold text-neutral-600">
          Meet Our Expert Tutors
        </h4>
        <p className="max-w-xs md:max-w-xl lg:max-w-2xl mx-auto mt-4 md:mt-6 lg:mt-8 text-neutral-400 font-light tracking-wide text-base lg:text-lg">
          Dedicated professionals committed to delivering quality education and
          helping students succeed.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 lg:gap-y-10 lg:gap-x-0 xl:gap-12 ">
        {data &&
          data
            ?.slice(0, 6)
            .map((tutorData: ITutor) => (
              <TutorSectionCard key={tutorData?._id} tutorData={tutorData} />
            ))}
      </div>
    </TLContainer>
  );
};

export default TutorSection;
