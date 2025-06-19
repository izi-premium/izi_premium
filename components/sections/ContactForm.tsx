"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendEmail } from "@/app/actions/sendEmail";
import { ContactFormState } from "@/lib/definitions";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ContactForm() {
  const initialState: ContactFormState = {
    message: "",
    errors: {},
    fieldValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      message: "",
    },
  };
  const [state, formAction] = useActionState(sendEmail, initialState);

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="h2-bold">Contact Us</h2>
          <p className="max-w-[900px] text-muted-foreground p-large">
            Have a question or want to work with us? Drop us a message.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John"
                  defaultValue={state.fieldValues?.name}
                  className={cn(state.errors?.name && "border-destructive")}
                />
                {state.errors?.name && (
                  <p className="text-sm font-medium text-destructive">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Surname <span className="text-destructive">*</span></Label>
                <Input
                  id="surname"
                  name="surname"
                  placeholder="Doe"
                  defaultValue={state.fieldValues?.surname}
                  className={cn(state.errors?.surname && "border-destructive")}
                />
                {state.errors?.surname && (
                  <p className="text-sm font-medium text-destructive">
                    {state.errors.surname[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                defaultValue={state.fieldValues?.email}
                className={cn(state.errors?.email && "border-destructive")}
              />
              {state.errors?.email && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.email[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+1 234 567 890"
                defaultValue={state.fieldValues?.phone}
                className={cn(state.errors?.phone && "border-destructive")}
              />
              {state.errors?.phone && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.phone[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                defaultValue={state.fieldValues?.message}
                className={cn(state.errors?.message && "border-destructive")}
              />
              {state.errors?.message && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.message[0]}
                </p>
              )}
            </div>
            <SubmitButton />
            {state.message &&
              !state.errors && (
                <p className="text-sm font-medium text-green-600 mt-2">
                  {state.message}
                </p>
              )}
            {state.message &&
              state.errors &&
              Object.keys(state.errors).length > 0 && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {state.message}
                </p>
              )}
          </form>
        </div>
      </div>
    </section>
  );
} 