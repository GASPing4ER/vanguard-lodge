"use server";

import { redirect } from "next/navigation";

export const login = async (prevState: unknown, authData: unknown) => {
  // validation
  if (!(authData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  const email = authData.get("email") as string;
  const password = authData.get("password") as string;

  try {
    // await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }

  redirect("/");
};

export const signup = async (prevState: unknown, authData: unknown) => {
  // validation
  if (!(authData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  const email = authData.get("email") as string;
  const password = authData.get("password") as string;

  try {
    // await createUserWithEmailAndPassword(auth, email, password);
    // sendEmailVerification(auth.currentUser!);
  } catch (error) {
    console.error(error);
  }

  redirect("/");
};
