import z from "zod";

export const StudentFormSchemaForCreate = z.object({
  firstName: z.string().nonempty("First Name is required!!!"),
  lastName: z.string().nonempty("Last Name is required!!!"),
  gradeLevel: z.string().nonempty("Grade Level is required!!!"),
  address: z.string().nonempty("Student home address is required!!!"),
  contactNo: z.string().nonempty("Contact No is required!!!"),
  email: z.email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required!!!"),
});
