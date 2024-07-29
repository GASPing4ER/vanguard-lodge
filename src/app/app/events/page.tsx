import { getEvents } from "@/src/actions/actions";
import EventCard from "@/src/components/events/event-card";

const EventsPage = async () => {
  const events = await getEvents();
  return (
    <div className="h-screen ">
      <div className="max-w-[1024px] mx-auto p-10 flex flex-col gap-10">
        <h1 className="text-5xl font-semibold text-zinc-90">Events</h1>
        <ul className="flex gap-10">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventsPage;
