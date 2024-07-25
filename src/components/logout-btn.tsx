"use client";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

const LogoutButton = () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  return (
    <div>
      {isAuthenticated && (
        <LogoutLink postLogoutRedirectURL="/">Logout</LogoutLink>
      )}
    </div>
  );
};

export default LogoutButton;
