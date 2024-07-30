"use client";

import { Event } from "@prisma/client";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import logo from "/public/logo.svg";
import { formatDate } from "@/lib/utils";
import { useMemberContext } from "@/lib/hooks";
import { joinEvent } from "@/src/actions/actions";
import { toast } from "sonner";

type OpenedEventProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isJoined: boolean;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  event: Event;
};

const OpenedEvent = ({
  isOpen,
  setOpen,
  isJoined,
  setIsJoined,
  event,
}: OpenedEventProps) => {
  const { members, currentMember } = useMemberContext();
  const organizer = members.find((member) => member.id === event.organizerId);

  const handleJoinEvent = async () => {
    if (!currentMember) return;

    const response = await joinEvent(event.id);
    if (response.message === "Already joined") {
      toast.message("You have already joined this event.");
    } else if (response.message === "Joined successfully") {
      setIsJoined(true);
      toast.message("Successfully joined the event.");
    } else {
      toast.message("Failed to join event.");
    }
  };

  return (
    <div
      className={`${
        isOpen ? "visible" : "invisible"
      } absolute w-full min-h-screen bg-zinc-50 top-0 left-0 flex justify-center items-center`}
    >
      <CgClose
        onClick={() => setOpen(false)}
        className="absolute top-[2%] left-[2%] text-zinc-900 text-4xl cursor-pointer"
      />
      <div className="max-w-[1024px] mx-auto p-10 flex flex-col gap-4 items-center text-center">
        <Image
          src={logo}
          alt={event.name}
          className="w-full h-[150px] -mb-10"
        />
        <h1 className="text-5xl font-semibold text-zinc-90">{event.name}</h1>
        <ul className="flex gap-4">
          {event.activities.map((activity, index) => (
            <li
              key={index}
              className="bg-zinc-200 px-2 py-1 text-sm rounded-md"
            >
              {activity}
            </li>
          ))}
        </ul>
        <p className="max-w-[400px] text-sm">{event.description}</p>
        {/* Format date like this: Day.Month.Year */}
        <p>
          Date: {formatDate(event.date)}, {event.time}
        </p>
        <p>
          Location: {event.city}, {event.location}
        </p>
        {!isJoined && (
          <button
            onClick={handleJoinEvent}
            className="bg-zinc-900 text-zinc-50 px-12 py-2 rounded"
          >
            Join now!
          </button>
        )}
        <p>
          Organized by:{" "}
          <span className="italic">
            {organizer?.first_name} {organizer?.last_name}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OpenedEvent;
