export interface IUser {
  userEmail: string;
  role: "admin" | "student" | "tutor";
  iat?: number;
  exp?: number;
}
