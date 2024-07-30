import { getMemberById } from "@/lib/server-utils";
import HomeLayout from "@/src/components/home/home-layout";
import HomeNavigator from "@/src/components/home/home-navigator";
import MyEventsLayout from "@/src/components/home/my-events-layout";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type AppPageProps = {
  searchParams: {
    layout: string;
  };
};

const AppPage = async ({ searchParams }: AppPageProps) => {
  const { getUser } = getKindeServerSession();

  const { layout } = searchParams;

  const user = await getUser();
  if (!user) {
    return <div>User not found</div>;
  }

  const member = await getMemberById(user.id);

  return (
    <>
      <div className="hidden lg:block h-screen p-12 max-w-[1024px] mx-auto">
        {!layout && <HomeLayout user={user} member={member} />}
        {layout === "events" && <MyEventsLayout user={user} />}
        <HomeNavigator />
      </div>
      <div className="lg:hidden h-screen flex justify-center items-center">
        <div className="text-4xl">Open on desktop!</div>
      </div>
    </>
  );
};

export default AppPage;
