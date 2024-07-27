// app-page.tsx
import HomeLayout from "@/src/components/home/home-layout";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getMemberById } from "@/lib/server-utils";
import ConnectLayout from "@/src/components/connect/connect-layout";
import NottificationModal from "@/src/components/nottificationModal";
import { getMembers } from "@/src/actions/actions";

type AppPageProps = {
  searchParams: {
    layout: string;
  };
};

const AppPage = async ({ searchParams }: AppPageProps) => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const user = await getUser();
  if (!user) {
    return <div>User not found</div>;
  }

  const member = await getMemberById(user.id);

  const { layout } = searchParams;

  if (!layout) {
    return (
      <div>
        <HomeLayout user={user} member={member} />
      </div>
    );
  } else {
    if (!member) {
      return (
        <div>
          <HomeLayout user={user} member={member} />
          <NottificationModal layout={layout} />
        </div>
      );
    } else {
      if (layout === "connect") {
        const members = await getMembers();
        return <ConnectLayout member={member} members={members} />;
      }
    }
  }

  return <div></div>;
};

export default AppPage;
