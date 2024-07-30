import { getAttendingEvents, getOrganizingEvents } from "@/src/actions/actions";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import AttendingEventsList from "./attending-events-list";
import OrganizingEventsList from "./organizing-events-list";

type MyEventsLayoutProps = {
  user: KindeUser;
};

const MyEventsLayout = async ({ user }: MyEventsLayoutProps) => {
  const attendingEvents = await getAttendingEvents(user.id);
  const organizingEvents = await getOrganizingEvents(user.id);

  console.log(attendingEvents);
  console.log(organizingEvents);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">My Events</h1>
      <p className="text-lg text-zinc-400 -mt-3">
        View and manage your events here.
      </p>
      <h2 className="text-2xl font-semibold">Attending:</h2>
      <AttendingEventsList user={user} events={attendingEvents} />
      <h2 className="text-2xl font-semibold">Organizing:</h2>
      <OrganizingEventsList events={organizingEvents} />
    </div>
  );
};

export default MyEventsLayout;
