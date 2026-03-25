import SubjectComponent from "@/components/modules/admin/subjects/subjectComponent";
import { getAllSubject } from "@/services/Subject";

const GetAllSubjectPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  const { page, limit } = await searchParams;

  const { data: subjectData, meta } = await getAllSubject(page, limit);

  return (
    <div>
      <SubjectComponent subjects={subjectData} meta={meta} />
    </div>
  );
};

export default GetAllSubjectPage;
