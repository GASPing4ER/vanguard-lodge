import { checkMemberAuth, checkUserAuth } from "@/lib/server-utils";
import { getMembers } from "@/src/actions/actions";
import MembersList from "@/src/components/connect/members-list";
import SearchArea from "@/src/components/connect/search-area";
import NottificationModal from "@/src/components/nottification-modal";
import { Member } from "@prisma/client";

const ConnectPage = async () => {
  const user = await checkUserAuth();
  const member = await checkMemberAuth(user);

  const members: Member[] = (await getMembers()) || [];

  return (
    <div className="h-screen">
      <div className="hidden relative lg:flex flex-col gap-5 max-w-[1024px] mx-auto p-10">
        <div className="flex items-end gap-5">
          <h1 className="text-2xl font-bold text-zinc-900">Members</h1>
          <p className="text-2xl font-bold text-zinc-400">{members.length}</p>
        </div>
        <SearchArea />
        <MembersList />
      </div>
      <NottificationModal member={member} />
      <div className="lg:hidden h-screen flex justify-center items-center">
        <div className="text-4xl">Open on desktop!</div>
      </div>
    </div>
  );
};

export default ConnectPage;
