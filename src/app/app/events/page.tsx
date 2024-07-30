import { checkMemberAuth, checkUserAuth } from "@/lib/server-utils";
import { getEvents } from "@/src/actions/actions";
import EventCard from "@/src/components/events/event-card";
import EventFrom from "@/src/components/events/event-form";
import NottificationModal from "@/src/components/nottification-modal";

const EventsPage = async () => {
  const user = await checkUserAuth();
  const member = await checkMemberAuth(user);

  const events = await getEvents();
  return (
    <div className="min-h-screen">
      <div className="hidden max-w-[1024px] mx-auto p-10 lg:flex flex-col gap-10">
        <h1 className="text-5xl font-semibold text-zinc-90">Events</h1>
        <ul className="flex gap-10">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
        <EventFrom />
      </div>
      <NottificationModal member={member} />
      <div className="lg:hidden h-screen flex justify-center items-center">
        <div className="text-4xl">Open on desktop!</div>
      </div>
    </div>
  );
};

export default EventsPage;
