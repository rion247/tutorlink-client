import { IOfferSubject, TMeta } from "@/types";
import CreateOfferSubjectModal from "./offerSubjectModal";
import OfferSubjectTable from "./offerSubjectTable";

const OfferSubjectComponent = ({
  offerSubjects,
  meta,
}: {
  offerSubjects: IOfferSubject[];
  meta: TMeta;
}) => {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold">Manage Offer Subjects</h4>
        <CreateOfferSubjectModal />
      </div>
      <div className="my-8">
        <OfferSubjectTable offerSubjects={offerSubjects} meta={meta} />
      </div>
    </div>
  );
};

export default OfferSubjectComponent;
