import z from "zod";

export const loginFormSchema = z.object({
  email: z.email().nonempty("Email is required"),
  password: z.string().nonempty("Password is required!!!"),
});
