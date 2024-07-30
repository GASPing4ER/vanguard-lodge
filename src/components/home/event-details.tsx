"use client";

import { Event, Member } from "@prisma/client";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import logo from "/public/logo.svg";
import { getEventAttendees } from "@/src/actions/actions";
import { useEffect, useState } from "react";

type EventDetailsProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: Event;
};

const EventDetails = ({ isOpen, setOpen, event }: EventDetailsProps) => {
  const [attendees, setAttendees] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const data = await getEventAttendees(event.id);
        setAttendees(data);
      } catch (err) {
        setError("Failed to fetch attendees");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchAttendees();
    }
  }, [event.id, isOpen]);
  return (
    <div
      className={`${
        isOpen ? "visible" : "invisible"
      } absolute w-full min-h-screen bg-zinc-50 top-0 left-0 flex justify-center items-center z-10`}
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
        <h1 className="text-5xl font-semibold text-zinc-900">{event.name}</h1>
        <h2 className="text-3xl font-semibold text-zinc-900 self-start">
          Attending:
        </h2>
        {loading ? (
          <p>Loading attendees...</p>
        ) : error ? (
          <p>{error}</p>
        ) : attendees.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 border">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendees.map((attendee) => (
                  <tr key={attendee.id} className="text-left">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {attendee.first_name} {attendee.last_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {attendee.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {attendee.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No attendees yet.</p>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
