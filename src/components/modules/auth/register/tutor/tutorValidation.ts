import z from "zod";

export const TutorFormSchemaForCreate = z.object({
  firstName: z.string().nonempty("First Name is required!!!"),
  lastName: z.string().nonempty("Last Name is required!!!"),
  address: z.string().nonempty("Student home address is required!!!"),
  contactNo: z.string().nonempty("Contact No is required!!!"),
  bio: z
    .string()
    .min(10, "Tutor Bio must be at least 10 characters long")
    .max(100, "Tutor bio must not exceed 100 characters!!!")
    .nonempty("Tutor Bio is required!!!"),
  email: z.email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required!!!"),
});
