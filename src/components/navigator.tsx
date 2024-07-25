"use client";

import { FaUser } from "react-icons/fa";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Navigator = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <div className="fixed bottom-[5%] left-1/2 -translate-x-1/2 py-3 px-4 rounded-2xl border border-solid border-primary bg-neutral">
      <ul className="text-lg font-semibold flex justify-center items-center gap-4">
        <li
          className={`${
            pathname === "/"
              ? "bg-primary text-neutral py-3 px-4 border border-solid border-primary"
              : "hover:text-secondary"
          } cursor-pointer py-3 px-4 rounded-2xl`}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          className={`
      ${
        pathname === "/connect"
          ? "bg-primary text-neutral py-3 px-4 border border-solid border-primary"
          : "hover:text-secondary"
      }
          cursor-pointer py-3 px-4 rounded-2xl`}
        >
          <Link href="/connect">Connect</Link>
        </li>
        <li
          className={`
            ${
              pathname === "/events"
                ? "bg-primary text-neutral py-3 px-4 border border-solid border-primary"
                : "hover:text-secondary"
            }
          cursor-pointer py-3 px-4 rounded-2xl`}
        >
          <Link href="/events">Events</Link>
        </li>
        <li
          className={`
            ${
              pathname === "/contact"
                ? "bg-primary text-neutral py-3 px-4 border border-solid border-primary"
                : "hover:text-secondary"
            }
          cursor-pointer py-3 px-4 rounded-2xl`}
        >
          <Link href="/contact">Contact</Link>
        </li>
        {isAuthenticated ? (
          <li
            className={`
              ${
                pathname.startsWith("/dashboard")
                  ? "bg-primary text-neutral py-3 px-4 border border-solid border-primary"
                  : "hover:text-secondary"
              }
            cursor-pointer py-3 px-4 rounded-2xl`}
          >
            <Link href="/dashboard">
              <FaUser />
            </Link>
          </li>
        ) : (
          <li
            className={`
              ${
                pathname === "/login"
                  ? "bg-primary text-neutral py-3 px-4 border border-solid border-primary"
                  : "hover:text-secondary"
              }
            cursor-pointer py-3 px-4 rounded-2xl`}
          >
            <Link href="/login">
              <FaUser />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navigator;
