"use server";
import axios, { isAxiosError } from "axios";

export async function formSparkFormAction<T>(
  formId: string,
  state: T,
  form: FormData
) {
  console.log("", formId, state, form);

  if (!formId) {
    return {
      message: "Form field missing",
      hasError: true,
      isComplete: false,
    };
  }

  const extractData = Object.fromEntries(form.entries());

  try {
    await axios.post(`https://submit-form.com/${formId}`, extractData);
  } catch (error) {
    console.log({ error });
    if (isAxiosError(error)) {
      console.log(error.response?.data, error.message);
      return { message: error.message, hasError: true, isComplete: true };
    }
  }

  return { message: "done", hasError: false, isComplete: true };
}
