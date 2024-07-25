"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

const LoginBtn = () => {
  return (
    <LoginLink
      postLoginRedirectURL="/app"
      className="bg-zinc-900 text-zinc-50 py-2 px-8 rounded"
    >
      Login
    </LoginLink>
  );
};

export default LoginBtn;
