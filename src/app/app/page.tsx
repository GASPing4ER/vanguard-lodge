// app-page.tsx
import HomeLayout from "@/src/components/home/home";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getMemberById } from "@/lib/server-utils";

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

  const { layout } = searchParams;

  if (!layout) {
    const user = await getUser();
    if (!user) {
      return <div>User not found</div>;
    }

    const member = await getMemberById(user.id);
    return <HomeLayout user={user} member={member} />;
  }

  return <div></div>;
};

export default AppPage;
