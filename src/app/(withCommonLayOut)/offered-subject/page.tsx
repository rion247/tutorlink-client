import OfferedSubjectComponent from "@/components/modules/offeredSubject/OfferedSubjectComponent";
import { getAllOfferSubject } from "@/services/OfferSubject";

type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const OfferedSubjectPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getAllOfferSubject(undefined, undefined, query);

  return (
    <div>
      <OfferedSubjectComponent offerSubjects={data} />
    </div>
  );
};

export default OfferedSubjectPage;
