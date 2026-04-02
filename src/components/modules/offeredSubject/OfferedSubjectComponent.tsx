"use server";
import TLContainer from "@/components/ui/core/TLContainer";
import OfferedSubjectCard from "../home/OfferedSubject/OfferedSubjectCard";
import OfferedSubjectSearchBox from "./OfferedSubjectSearchBox";
import { IOfferSubject } from "@/types";

const OfferedSubjectComponent = async ({
  offerSubjects,
}: {
  offerSubjects: IOfferSubject[];
}) => {
  return (
    <div className="mb-16 md:mb-20 lg:mb-24 xl:mb-28">
      <OfferedSubjectSearchBox />
      <TLContainer className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 lg:gap-y-10 lg:gap-x-0 xl:gap-12 ">
        {offerSubjects &&
          offerSubjects.map((offerSubject: IOfferSubject) => (
            <OfferedSubjectCard
              key={offerSubject?._id}
              offerSubject={offerSubject}
            />
          ))}
      </TLContainer>
    </div>
  );
};

export default OfferedSubjectComponent;
