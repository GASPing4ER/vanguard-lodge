import HomeLayout from "@/src/components/home/home";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

type AppPageProps = {
  searchParams: {
    layout: string;
  };
};

const AppPage = async ({ searchParams }: AppPageProps) => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const { layout } = searchParams;

  if (!layout) {
    return <HomeLayout />;
  }

  return <div></div>;
};

export default AppPage;
