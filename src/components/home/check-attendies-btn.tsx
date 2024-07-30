"use client";

import { Event } from "@prisma/client";
import { useState } from "react";
import EventDetails from "./event-details";

type CheckAttendiesBtnProps = {
  event: Event;
};

const CheckAttendiesBtn = ({ event }: CheckAttendiesBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-zinc-900 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Details
      </button>
      <EventDetails event={event} isOpen={isOpen} setOpen={setIsOpen} />
    </>
  );
};

export default CheckAttendiesBtn;
