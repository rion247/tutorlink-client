import { Card } from "@/components/ui/card";
import Image from "next/image";
import StudentImage from "../../../../../app/assets/svgs/studentImage.jpg";
import StudentRegistrationForm from "./studentRegistrationForm";

const StudentRegistrationComponents = () => {
  return (
    <Card className="flex flex-row justify-center items-start">
      <div className="lg:w-120 xl:w-165 lg:h-200 hidden lg:block">
        <Image src={StudentImage} alt="...Loading" className="h-full" />
      </div>
      <div className="">
        <StudentRegistrationForm />
      </div>
    </Card>
  );
};

export default StudentRegistrationComponents;
