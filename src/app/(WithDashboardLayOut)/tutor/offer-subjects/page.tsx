import OfferSubjectComponent from "@/components/modules/tutor/offerSubjects/offerSubjectComponent";
import { getAllOfferSubject } from "@/services/OfferSubject";

const OfferedSubjectPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  const { page, limit } = await searchParams;

  const { data: offerSubjectData, meta } = await getAllOfferSubject(
    page,
    limit,
  );

  return (
    <div>
      <OfferSubjectComponent offerSubjects={offerSubjectData} meta={meta} />
    </div>
  );
};

export default OfferedSubjectPage;
