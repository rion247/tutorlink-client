import { ITutor } from "@/types";
import Image from "next/image";
import Link from "next/link";

const TutorSectionCard = ({ tutorData }: { tutorData: ITutor }) => {
  return (
    <div className="w-full max-w-xs md:max-w-xl lg:max-w-md xl:max-w-lg rounded-md shadow-md border border-neutral-300 text-gray-700 mx-auto flex flex-col">
      <Image
        src={tutorData?.profileImage}
        alt="...loading"
        width={500}
        height={100}
        className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500 z-10"
      />
      <div className="flex flex-col flex-1 justify-between p-6 space-y-8 w-full">
        <div className="space-y-2">
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-wide">
            {tutorData?.fullName}
          </h2>

          <p className="text-neutral-700 my-4 ">{tutorData?.bio}</p>
        </div>
        <Link
          href={"/"}
          type="button"
          className="mt-auto flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md hover:bg-blue-600 text-white bg-blue-700"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default TutorSectionCard;
