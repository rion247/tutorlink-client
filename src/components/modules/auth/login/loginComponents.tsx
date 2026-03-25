import LogInForm from "./loginForm";
import LogInImg from "../../../../app/assets/svgs/logInImage.jpg";
import Image from "next/image";

const LoginComponents = () => {
  return (
    <div className="flex items-center justify-center md:h-screen w-screen py-2">
      <div className="flex justify-center items-center">
        <LogInForm />
        <div className="lg:w-115 lg:h-180 xl:h-200 xl:w-3xl hidden lg:block">
          <Image src={LogInImg} alt="...loading" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default LoginComponents;
