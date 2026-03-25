import TutorTableComponent from "@/components/modules/admin/tutor/tutorTable";
import TLContainer from "@/components/ui/core/TLContainer";
import { getAllTutorForAdmin } from "@/services/Tutor";

const TutorRequestApprovalPage = async () => {
  const { data } = await getAllTutorForAdmin();
  return (
    <TLContainer className="h-screen">
      <TutorTableComponent tutors={data} />
    </TLContainer>
  );
};

export default TutorRequestApprovalPage;
