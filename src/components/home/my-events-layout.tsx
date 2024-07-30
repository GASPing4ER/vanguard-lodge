const MyEventsLayout = async () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">My Events</h1>
      <p className="text-lg text-zinc-400 -mt-3">
        View and manage your events here.
      </p>
      <h2 className="text-2xl font-semibold">Attending:</h2>
      <h2 className="text-2xl font-semibold">Organizing:</h2>
    </div>
  );
};

export default MyEventsLayout;
