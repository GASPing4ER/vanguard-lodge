import { getMembers } from "@/src/actions/actions";
import ConnectNavigator from "@/src/components/connect/connect-navigator";
import LikedUsersList from "@/src/components/connect/liked-users-list";
import MembersList from "@/src/components/connect/members-list";
import SearchArea from "@/src/components/connect/search-area";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Member } from "@prisma/client";

const ConnectPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return <div>User not found</div>;
  }
  const members: Member[] = (await getMembers()) || [];

  return (
    <div className="h-screen">
      <div className="relative flex flex-col gap-5 max-w-[1024px] mx-auto p-10">
        <div className="flex items-end gap-5">
          <h1 className="text-2xl font-bold text-zinc-900">Members</h1>
          <p className="text-2xl font-bold text-zinc-400">{members.length}</p>
        </div>
        <SearchArea />
        <MembersList />
        {/* <LikedUsersList /> */}
      </div>
      {/* <ConnectNavigator /> */}
    </div>
  );
};

export default ConnectPage;
