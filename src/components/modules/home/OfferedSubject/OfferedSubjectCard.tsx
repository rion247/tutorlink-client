import { IOfferSubject } from "@/types";
import Image from "next/image";
import Link from "next/link";

const OfferedSubjectCard = ({
  offerSubject,
}: {
  offerSubject: IOfferSubject;
}) => {
  return (
    <div className="w-full max-w-xs md:max-w-xl lg:max-w-md xl:max-w-lg rounded-md shadow-md border border-neutral-300 text-gray-700 mx-auto">
      <Image
        src={offerSubject?.offeredSubjectImage}
        alt="...loading"
        width={500}
        height={100}
        className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500 z-10"
      />
      <div className="flex flex-col justify-between p-6 space-y-8 w-full">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-wide">
              {offerSubject?.subject?.name}
            </h2>
          </div>

          <p className="text-neutral-700 my-4">
            Tutor Name: {offerSubject?.tutor?.fullName}
          </p>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-neutral-600">
                Start Time: {offerSubject?.startTime}
              </p>
            </div>
            <div>
              <p className="text-neutral-600">Day: {offerSubject?.day}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-neutral-600">
                End Time: {offerSubject?.endTime}
              </p>
            </div>
            <div>
              <p className="">Duration: {offerSubject?.duration}hr</p>
            </div>
          </div>
        </div>
        <Link
          href={"/"}
          type="button"
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md hover:bg-blue-600 text-white bg-blue-700"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default OfferedSubjectCard;
