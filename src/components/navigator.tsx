"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

type CursorProps = {
  position: Position;
};

export const Navigator = () => {
  return (
    <div className="fixed bottom-[5%] left-1/2 -translate-x-1/2">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border border-black bg-white p-1"
    >
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition} link="connect">
        Connect
      </Tab>
      <Tab setPosition={setPosition} link="events">
        Events
      </Tab>
      <Tab setPosition={setPosition} link="logout">
        Logout
      </Tab>

      <Cursor position={position} />
    </ul>
  );
};

type TabProps = {
  children: React.ReactNode;
  setPosition: Dispatch<SetStateAction<Position>>;
  link?: string;
};

const Tab = ({ children, setPosition, link }: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {link === "logout" ? (
        <LogoutLink>{children}</LogoutLink>
      ) : link ? (
        <Link href={`/app?layout=${link}`}>{children}</Link>
      ) : (
        <Link href="/app">{children}</Link>
      )}
    </li>
  );
};

const Cursor = ({ position }: CursorProps) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};
