"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { formSparkFormAction } from "~/action/formspark";
import { FC } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle, Loader2 } from "lucide-react";
import { CrossCircledIcon } from "@radix-ui/react-icons";

export type FormProps = { formId: string };

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant={"secondary"}
      className="bg-blue-500 text-white w-full flex gap-2"
    >
      {pending && <Loader2 className="animate-spin text-white" />}
      Submit
    </Button>
  );
};

const INITIAL = {
  message: "",
  hasError: false,
  isComplete: false,
};

export const ContactForm: FC = () => {
  return (
    <Card className=" shadow-lg max-w-md mx-auto p-6 rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Contact Us
        </CardTitle>
        <CardDescription className="text-gray-500 text-center">
          We would love to hear from you. Please fill out the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form formId="1MtTF9c1l" />
      </CardContent>
    </Card>
  );
};

const Form: FC<FormProps> = ({ formId }) => {
  const _action = formSparkFormAction.bind(null, formId);
  const [state, action] = useFormState(_action, INITIAL);
  console.log("🚀 ~ state:", state);

  if (!state.hasError && state.isComplete)
    return (
      <div className="flex w-full max-w-wd" id="form">
        <div className="my-10 flex w-full items-center justify-center gap-4 rounded-lg bg-gray-200 p-4 text-black ">
          <CheckCircle />
          Form Submitted
        </div>
      </div>
    );

  if (state.hasError && state.isComplete) {
    console.error("Form submit error:", state.message);
    return (
      <div className="flex w-full max-w-wd" id="form">
        <div className="my-10 flex w-full items-center justify-center gap-4 rounded-lg bg-red-200 p-4 text-black ">
          <CrossCircledIcon />
          something went wrong!!
        </div>
      </div>
    );
  }
  return (
    <form className="space-y-4" action={action}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First name</Label>
          <Input
            id="first-name"
            name="first-name"
            placeholder="Enter your first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input
            id="last-name"
            name="last-name"
            placeholder="Enter your last name"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          className="min-h-[100px]"
          id="message"
          name="message"
          placeholder="Enter your message"
        />
      </div>
      <SubmitButton />
    </form>
  );
};
