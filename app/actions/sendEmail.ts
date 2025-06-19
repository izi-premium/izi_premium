"use server";

import { contactFormSchema, ContactFormState } from "@/lib/definitions";

export async function sendEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawFormData = {
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    message: formData.get("message") as string,
  };

  const validatedFields = contactFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
      fieldValues: rawFormData,
    };
  }

  // Here you would implement your email sending logic (e.g., with Resend, Nodemailer)
  console.log("Form data submitted successfully:");
  console.log(validatedFields.data);

  return {
    message: "Thank you for your message! We will get back to you shortly.",
    fieldValues: { name: "", surname: "", email: "", phone: "", message: "" },
  };
} 