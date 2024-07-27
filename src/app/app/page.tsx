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
    searchText: string;
    occupation: string;
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

  const { layout, searchText, occupation } = searchParams;

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

        const filteredMembers = [...members].filter((member) => {
          if (searchText && occupation) {
            return (
              member.first_name
                .toLowerCase()
                .includes(searchText.toLowerCase()) &&
              member.occupation === occupation
            );
          } else if (searchText) {
            return (
              member.first_name
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              member.email.toLowerCase().includes(searchText.toLowerCase())
            );
          } else if (occupation) {
            return member.occupation === occupation;
          } else {
            return true;
          }
        });

        return (
          <ConnectLayout
            member={member}
            members={members}
            filteredMembers={filteredMembers}
          />
        );
      }
    }
  }

  return <div>This layout is not supported yet!</div>;
};

export default AppPage;
