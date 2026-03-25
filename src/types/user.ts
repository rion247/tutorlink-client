export interface IUser {
  userEmail: string;
  role: "admin" | "student" | "tutor";
  iat?: number;
  exp?: number;
}

export type TUser = {
  _id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TName = {
  firstName: string;
  lastName: string;
  _id: string;
};

export interface ITutor {
  _id: string;
  user: TUser;
  name: TName;
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
  fullName: string;
  id: string;
}
