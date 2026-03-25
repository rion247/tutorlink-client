import { Card } from "@/components/ui/card";
import Image from "next/image";
import TutorImage from "../../../../../app/assets/svgs/TutorImage.jpg";
import TutorRegistrationForm from "./tutorRegistrationForm";

const TutorRegistrationComponents = () => {
  return (
    <Card className="flex flex-row justify-center ml-0 xl:ml-12 items-start pb-28">
      <div className="lg:w-138 xl:w-165 lg:h-228 hidden lg:block">
        <Image src={TutorImage} alt="...Loading" className="h-full" />
      </div>
      <div className="lg:w-120">
        <TutorRegistrationForm />
      </div>
    </Card>
  );
};

export default TutorRegistrationComponents;
