interface Name {
  firstName: string;
  lastName: string;
  _id: string;
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

export interface IOfferSubject {
  _id: string;
  tutor: Tutor;
  subject: Subject;
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
  offeredSubjectImage: string;
}
