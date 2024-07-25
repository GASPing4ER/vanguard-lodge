import LogoutButton from "@/src/components/logout-btn";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  return (
    <div>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
