"use client";

import { Event } from "@prisma/client";
import logo from "/public/logo.svg";
import Image from "next/image";
import { truncateText } from "@/lib/utils";
import { useEffect, useState } from "react";
import OpenedEvent from "./opened-event";
import { checkJoinedEvent, joinEvent } from "@/src/actions/actions";
import { useMemberContext } from "@/lib/hooks";
import { toast } from "sonner";

type EventCardProps = {
  event: Event;
};

const EventCard = ({ event }: EventCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const { currentMember } = useMemberContext();

  useEffect(() => {
    if (currentMember) {
      // Function to check if the currentMember has already joined the event
      const checkJoinedStatus = async () => {
        const existingParticipant = await checkJoinedEvent(event.id);
        setIsJoined(!!existingParticipant);
      };

      checkJoinedStatus();
    }
  }, [currentMember, event.id]);

  const handleOpen = () => {
    setIsOpen(true);
  };

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
    <li className="border border-solid text-center justify-center flex flex-col gap-4 p-4 w-[300px]">
      <Image src={logo} alt={event.name} className="w-full h-[150px] -mt-6" />
      <h2 className="text-2xl -mt-12">{event.name}</h2>
      <ul className="flex gap-3 justify-center">
        {event.activities.map((activity, index) => (
          <li key={index} className="bg-zinc-200 px-2 py-1 text-sm rounded-md">
            {activity}
          </li>
        ))}
      </ul>
      <p className="max-w-[400px] text-sm">
        {truncateText(event.description, 10)}
      </p>
      <div className="flex justify-center gap-4">
        {!isJoined && (
          <button
            onClick={handleJoinEvent}
            className="bg-transparent text-zinc-900 px-4 py-1 rounded border border-solid border-zinc-900"
          >
            Join
          </button>
        )}
        <button
          onClick={handleOpen}
          className="bg-zinc-900 text-zinc-50 px-4 py-1 rounded"
        >
          Read More
        </button>
      </div>
      <OpenedEvent
        isOpen={isOpen}
        setOpen={setIsOpen}
        isJoined={isJoined}
        setIsJoined={setIsJoined}
        event={event}
      />
    </li>
  );
};

export default EventCard;
