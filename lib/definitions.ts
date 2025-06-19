import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  surname: z.string().min(1, { message: "Surname is required." }),
  email: z.string().email({ message: "A valid email is required." }),
  phone: z.string().optional(),
  message: z
    .string()
    .min(4, { message: "Message must be at least 4 characters." }),
});

export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    surname?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  };
  fieldValues?: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    message: string;
  };
}; 