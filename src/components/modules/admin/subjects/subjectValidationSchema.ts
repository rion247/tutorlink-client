import z from "zod";

export const subjectValidationSchema = z.object({
  name: z
    .string("Subject Name must be a string")
    .nonempty("Subject Name is required"),
  category: z
    .string("Category must be a string")
    .nonempty("Category is required!!!"),
  gradeLevel: z
    .string("Grade Level must be a string")
    .nonempty("Grade Level is required!!!"),
});

export const subjectValidationSchemaforEdit = z.object({
  name: z
    .string("Subject Name must be a string")
    .nonempty("Subject Name is required")
    .optional(),
  category: z
    .string("Category must be a string")
    .nonempty("Category is required!!!")
    .optional(),
  gradeLevel: z
    .string("Grade Level must be a string")
    .nonempty("Grade Level is required!!!")
    .optional(),
});

export const subjectValidationSchemaforUpdateSubjectStatus = z.object({
  isActive: z.string("Subject Status is required"),
});
