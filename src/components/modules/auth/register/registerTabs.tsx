import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentRegistrationComponents from "./student/studentRegistrationComponents";
import TutorRegistrationComponents from "./tutor/tutorRegistrationComponents";

const RegisterTabs = () => {
  return (
    <Tabs defaultValue="StudentRegistration" className="">
      <TabsList variant="line">
        <TabsTrigger value="StudentRegistration" className="cursor-pointer">
          Student
        </TabsTrigger>
        <TabsTrigger value="TutorRegistration" className="cursor-pointer">
          Tutor
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="StudentRegistration"
        className=" absolute top-40 md:top-30 xl:top-40 left-5 md:left-45 lg:left-20 2xl:left-70 lg:w-4xl xl:w-7xl h-full"
      >
        <StudentRegistrationComponents />
      </TabsContent>
      <TabsContent
        value="TutorRegistration"
        className=" absolute top-40 md:top-30 xl:top-40 left-5 md:left-45 lg:left-20 2xl:left-70 lg:w-4xl xl:w-7xl h-full"
      >
        <TutorRegistrationComponents />
      </TabsContent>
    </Tabs>
  );
};

export default RegisterTabs;
