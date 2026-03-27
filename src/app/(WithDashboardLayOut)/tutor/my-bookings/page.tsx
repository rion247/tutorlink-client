import MyBookingsTableComponent from "@/components/modules/tutor/bookings/bookingsTable";
import TLContainer from "@/components/ui/core/TLContainer";
import { getMyBooking } from "@/services/Booking";

const MyBookingsPage = async () => {
  const { data } = await getMyBooking();
  return (
    <TLContainer className="h-screen">
      <MyBookingsTableComponent bookings={data} />
    </TLContainer>
  );
};

export default MyBookingsPage;
