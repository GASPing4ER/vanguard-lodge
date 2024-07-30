import { z } from "zod";

export const memberDataSchema = z.object({
  email: z.string().email().max(100),
  display_name: z.string().max(100),
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  occupation: z.string().max(100),
  phone: z.string().max(100),
});

export const memberFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email()
      .min(1, { message: "Email is required" })
      .max(100, { message: "Email is too long" }),
    display_name: z
      .string()
      .trim()
      .min(1, { message: "Display name is required" })
      .max(100, { message: "Display name is too long" }),
    first_name: z
      .string()
      .trim()
      .min(1, { message: "First name is required" })
      .max(100, { message: "First name is too long" }),
    last_name: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" })
      .max(100, { message: "Last name is too long" }),
    occupation: z
      .string()
      .trim()
      .min(1, { message: "Occupation is required" })
      .max(100, { message: "Occupation is too long" }),
    phone: z
      .string()
      .trim()
      .min(1, { message: "Phone number is required" })
      .max(20, { message: "Phone number is too long" }),
  })
  .transform((data) => ({
    ...data,
  }));

export type TMemberForm = z.infer<typeof memberFormSchema>;

export const eventDataSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  slug: z.string().min(1, "Slug is required"),
  city: z.string().min(1, "City is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Date is required and must be a valid date",
  }),
  activities: z.string().min(1, "Activities are required"),
  time: z.string().optional(), // Adjust as needed, you might want to make it required
  description: z.string().min(1, "Description is required"),
});
