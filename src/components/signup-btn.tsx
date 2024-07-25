"use client";

import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const SignupButton = () => {
  return (
    <RegisterLink
      postLoginRedirectURL="/app"
      className="bg-transparent text-zinc-900 border border-solid border-zinc-900 py-2 px-8 rounded"
    >
      Sign Up
    </RegisterLink>
  );
};

export default SignupButton;
