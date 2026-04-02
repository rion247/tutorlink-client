import TLContainer from "@/components/ui/core/TLContainer";
import { getAllOfferSubject } from "@/services/OfferSubject";
import { IOfferSubject } from "@/types";
import OfferedSubjectCard from "./OfferedSubjectCard";
import Link from "next/link";

const OfferedSubject = async () => {
  const { data } = await getAllOfferSubject();

  return (
    <TLContainer className="my-15 md:my-20 lg:my-24 xl:my-28">
      <div className="text-center mb-14 lg:mb-20">
        <h4 className=" text-2xl md:text-4xl font-extrabold text-neutral-600">
          Offered Subjects
        </h4>
        <p className="max-w-xs md:max-w-xl lg:max-w-2xl mx-auto mt-4 md:mt-6 lg:mt-8 text-neutral-400 font-light tracking-wide text-base lg:text-lg">
          Choose from a wide range of subjects taught by expert tutors, designed
          to help you understand concepts clearly and achieve academic success.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 lg:gap-y-10 lg:gap-x-0 xl:gap-12 ">
        {data &&
          data
            ?.slice(0, 6)
            .map((offerSubject: IOfferSubject) => (
              <OfferedSubjectCard
                key={offerSubject?._id}
                offerSubject={offerSubject}
              />
            ))}
      </div>
      <div className="flex space-y-4 justify-center sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-center w-full mt-10 md:mt-13 lg:mt-16 xl:mt-18 ">
        <Link
          rel="noopener noreferrer"
          href={"/offered-subject"}
          className="px-4 md:px-6 lg:px-8 py-3 text-sm md:text-base lg:text-lg font-semibold border rounded border-gray-300 hover:bg-blue-700 hover:text-white hover:border-transparent"
        >
          {"Load More"}
        </Link>
      </div>
    </TLContainer>
  );
};

export default OfferedSubject;
