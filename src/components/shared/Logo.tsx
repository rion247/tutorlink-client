import Image from "next/image";
import logoImage from "../../app/assets/svgs/logo.png";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-3 xl:gap-4">
        <Image
          src={logoImage}
          alt="Logo image is loading"
          className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-14 xl:h-14"
        />

        <h6 className="text-blue-500 text-2xl font-extrabold tracking-wider">
          Tutor<span className="text-red-500">Link</span>
        </h6>
      </div>
    </Link>
  );
};

export default Logo;
