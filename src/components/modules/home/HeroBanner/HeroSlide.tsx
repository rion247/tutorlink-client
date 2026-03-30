import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const HeroSlide = ({
  title,
  paragraphText,
  imgLink,
  ctaButton01,
  ctaButton02,
  ctaButtonLink01,
  ctaButtonLink02,
}: {
  title: string;
  paragraphText: string;
  imgLink: StaticImageData;
  ctaButton01: string;
  ctaButton02: string;
  ctaButtonLink01: string;
  ctaButtonLink02: string;
}) => {
  return (
    <section className=" w-full overflow-hidden">
      <div className=" flex flex-col justify-center mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-center xl:items-center md:gap-6 ">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-2xl lg:text-left ">
          <h1 className=" text-2xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold leading-9 md:leading-10 lg:leading-13 xl:leading-19 sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 mb-8 text-base md:text-lg sm:mb-12 text-neutral-400 tracking-wider">
            {paragraphText}
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link
              rel="noopener noreferrer"
              href={ctaButtonLink01}
              className="px-8 py-3 text-lg font-semibold rounded bg-blue-700 hover:bg-blue-600 text-white"
            >
              {ctaButton01}
            </Link>
            <Link
              rel="noopener noreferrer"
              href={ctaButtonLink02}
              className="px-8 py-3 text-lg font-semibold border rounded border-gray-300"
            >
              {ctaButton02}
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 ">
          {/* <Image
            src={imgLink}
            alt="...Loading"
            width={700}
            height={700}
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          /> */}
          <Image
            src={imgLink}
            alt="...Loading"
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSlide;
