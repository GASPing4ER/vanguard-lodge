import { Event } from "@prisma/client";
import UnattendButton from "./unattend-button";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

type AttendingEventsListProps = {
  events: Event[];
  user: KindeUser;
};

const AttendingEventsList = ({ events, user }: AttendingEventsListProps) => {
  return (
    <div>
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
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              City
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Unattend
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {event.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {event.time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {event.city}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <UnattendButton eventId={event.id} memberId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendingEventsList;
