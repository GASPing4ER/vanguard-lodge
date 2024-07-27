// app-page.tsx
import HomeLayout from "@/src/components/home/home-layout";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getMemberById } from "@/lib/server-utils";
import ConnectLayout from "@/src/components/connect/connect-layout";

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
    return <HomeLayout user={user} member={member} />;
  } else {
    if (!member) {
      return (
        <HomeLayout user={user} member={member} />
        // Create a nottification component that will tell the user to fill in the form
      );
    } else {
      if (layout === "connect") {
        return <ConnectLayout user={user} member={member} />;
      }
    }
  }

  return <div></div>;
};

export default AppPage;
