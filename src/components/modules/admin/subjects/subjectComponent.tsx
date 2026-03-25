import { ISubject } from "@/types";
import CreateSubjectModal from "./subjectModal";
import SubjectTable from "./subjectTable";
import { TMeta } from "@/types/meta";

const SubjectComponent = ({
  subjects,
  meta,
}: {
  subjects: ISubject[];
  meta: TMeta;
}) => {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold">Manage Subjects</h4>
        <CreateSubjectModal />
      </div>
      <div className="my-8">
        <SubjectTable subjects={subjects} meta={meta} />
      </div>
    </div>
  );
};

export default SubjectComponent;
