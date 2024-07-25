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
      {isLoading && (
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary/50 mx-auto my-2"></div>
      )}
      {user?.picture && (
        <Image
          src={user.picture}
          width={50}
          height={50}
          className="rounded-full"
          alt="user img"
        />
      )}

      {user && !user.picture && (
        <div className="h-7 w-7 rounded-full mx-auto my-2 bg-primary text-xs flex justify-center items-center">
          {user?.given_name?.charAt(0)}
        </div>
      )}

      {user?.email && (
        <p className="text-center text-xs mb-3">Logged in as {user?.email}</p>
      )}

      {isAuthenticated && <LogoutLink>Logout</LogoutLink>}
    </div>
  );
};

export default LogoutButton;
