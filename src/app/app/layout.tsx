import { checkMemberAuth, checkUserAuth } from "@/lib/server-utils";
import { getMembers } from "@/src/actions/actions";
import { Navigator } from "@/src/components/navigator";
import MemberContextProvider from "@/src/contexts/member-context-provider";
import SearchContextProvider from "@/src/contexts/search-context-provider";
import { Toaster } from "sonner";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProps) => {
  const user = await checkUserAuth();

  const member = await checkMemberAuth(user);

  const members = await getMembers();
  return (
    <div>
      <MemberContextProvider data={members} currentMember={member}>
        <SearchContextProvider>{children}</SearchContextProvider>
      </MemberContextProvider>
      <Navigator />
      <Toaster position="top-right" />
    </div>
  );
};

export default AppLayout;
