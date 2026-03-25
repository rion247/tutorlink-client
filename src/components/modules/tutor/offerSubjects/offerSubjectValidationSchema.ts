import z from "zod";

export const offerSubjectValidationSchema = z.object({
  subject: z
    .string("Subject must be a string")
    .nonempty("Subject Name is required"),
  day: z.string("Day must be a string").nonempty("Day is required!!!"),
  startTime: z
    .string("Start Time must be a string")
    .nonempty("Start Time is required!!!"),
  endTime: z
    .string("End Time must be a string")
    .nonempty("End Time is required!!!"),
  pricePerHour: z.string("Offer Subject Price is required"),
  maxCapacity: z.string("Max Capacity is required"),
});

export const offerSubjectValidationSchemaforEdit = z.object({
  day: z
    .string("Day must be a string")
    .nonempty("Day is required!!!")
    .optional(),
  startTime: z
    .string("Start Time must be a string")
    .nonempty("Start Time is required!!!")
    .optional(),
  endTime: z
    .string("End Time must be a string")
    .nonempty("End Time is required!!!")
    .optional(),
  pricePerHour: z.string("Offer Subject Price is required").optional(),
  maxCapacity: z.string("Max Capacity is required").optional(),
});
