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
    <Button
      type="submit"
      disabled={pending}
      className="paragraph-24-medium text-black-700 h-fit w-full max-w-[90rem] py-2 transition-all duration-300 ease-in-out hover:cursor-pointer"
    >
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
    <section
      id="contact"
      className="px-mobile md:px-tablet lg:px-desktop w-full max-w-[160rem] py-12 md:py-24 lg:py-32"
    >
      <div className="flex-center-col w-full">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="h2-medium text-black-800">Contact Us</h2>
          <p className="paragraph-24-normal text-black-600 3xl:max-w-[220rem] max-w-[120rem] 2xl:max-w-[160rem]">
            Have a question or want to work with us? Drop us a message.
          </p>
        </div>
        <div className="3xl:max-w-[120rem] w-full max-w-[70rem] 2xl:max-w-[90rem]">
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="paragraph-134-normal text-black-700"
                >
                  Name{" "}
                  <span className="text-destructive paragraph-14-normal text-red-600">
                    *
                  </span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John"
                  defaultValue={state.fieldValues?.name}
                  className={cn(
                    state.errors?.name &&
                      "border-destructive paragraph-18-normal"
                  )}
                />
                {state.errors?.name && (
                  <p className="text-destructive paragraph-14-normal font-medium text-red-700">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="surname"
                  className="paragraph-14-normal text-black-700"
                >
                  Surname{" "}
                  <span className="text-destructive paragraph-14-normal text-red-600">
                    *
                  </span>
                </Label>
                <Input
                  id="surname"
                  name="surname"
                  placeholder="Doe"
                  defaultValue={state.fieldValues?.surname}
                  className={cn(state.errors?.surname && "border-destructive")}
                />
                {state.errors?.surname && (
                  <p className="text-destructive paragraph-14-normal font-medium text-red-700">
                    {state.errors.surname[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="paragraph-14-normal text-black-700"
              >
                Email{" "}
                <span className="text-destructive paragraph-14-normal text-red-600">
                  *
                </span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                defaultValue={state.fieldValues?.email}
                className={cn(state.errors?.email && "border-destructive")}
              />
              {state.errors?.email && (
                <p className="text-destructive paragraph-14-normal font-medium text-red-700">
                  {state.errors.email[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="paragraph-14-normal text-black-700"
              >
                Phone Number (Optional)
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+1 234 567 890"
                defaultValue={state.fieldValues?.phone}
                className={cn(state.errors?.phone && "border-destructive")}
              />
              {state.errors?.phone && (
                <p className="text-destructive paragraph-14-normal font-medium text-red-700">
                  {state.errors.phone[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="paragraph-14-normal text-black-700"
              >
                Message{" "}
                <span className="text-destructive paragraph-14-normal text-red-600">
                  *
                </span>
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                defaultValue={state.fieldValues?.message}
                className={cn(
                  state.errors?.message &&
                    "border-destructive paragraph-18-normal"
                )}
              />
              {state.errors?.message && (
                <p className="text-destructive paragraph-14-normal font-medium text-red-700">
                  {state.errors.message[0]}
                </p>
              )}
            </div>
            <SubmitButton />
            {state.message && !state.errors && (
              <p className="paragraph-14-medium mt-2 text-green-600">
                {state.message}
              </p>
            )}
            {state.message &&
              state.errors &&
              Object.keys(state.errors).length > 0 && (
                <p className="text-destructive paragraph-14-medium mt-2 text-red-700">
                  {state.message}
                </p>
              )}
          </form>
        </div>
      </div>
    </section>
  );
}
