import Link from "next/link";

const HomeNavigator = () => {
  return (
    <div className="invisible lg:visible absolute right-0 top-[50%] -translate-y-1/2 bg-zinc-900 text-zinc-50 p-5 rounded-l-xl">
      <ul className="flex flex-col gap-5">
        <li>
          <Link href="/app">Settings</Link>
        </li>
        <li>
          <Link href="/app?layout=events">My Events</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomeNavigator;
