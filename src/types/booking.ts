interface Student {
  _id: string;
  user: string;
  name: Name;
  contactNo: string;
  profileImage: string;
  gradeLevel: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
  id: string;
}

interface Name {
  firstName: string;
  lastName: string;
  _id: string;
}

interface Subject {
  _id: string;
  name: string;
  category: string;
  gradeLevel: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Tutor {
  _id: string;
  user: string;
  name: Name;
  contactNo: string;
  profileImage: string;
  bio: string;
  address: string;
  averageRating: number;
  totalReviews: number;
  isApproved: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
  id: string;
}

interface OfferedSubject {
  _id: string;
  tutor: string;
  subject: string;
  day: string;
  startTime: string;
  endTime: string;
  duration: number;
  pricePerHour: number;
  maxCapacity: number;
  currentlyBooked: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IBooking {
  _id: string;
  student: Student;
  subject: Subject;
  tutor: Tutor;
  offeredSubject: OfferedSubject;
  bookingStatus: string;
  paymentStatus: string;
  transactionID: string;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
