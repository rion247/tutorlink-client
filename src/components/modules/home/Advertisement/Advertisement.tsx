import TLContainer from "@/components/ui/core/TLContainer";
import Link from "next/link";

const Advertisement = () => {
  return (
    <div className="my-15 md:my-20 lg:my-32 xl:my-34 bg-blue-800 text-white">
      <TLContainer className="py-12 xl:py-16">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-3">
          <h2 className="text-center text-2xl lg:text-3xl xl:text-5xl xxl:text-6xl font-bold">
            Learn at Your Own Pace
          </h2>
          <div className="text-sm md:text-base space-x-2 text-center xl:py-0 text-neutral-200">
            <p>
              Choose tutors, set your schedule, and learn the way that works
              best for you.
            </p>
          </div>
          <Link
            href="/"
            rel="noreferrer noopener"
            className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-white text-gray-900"
          >
            Find a Tutor
          </Link>
        </div>
      </TLContainer>
    </div>
  );
};

export default Advertisement;
