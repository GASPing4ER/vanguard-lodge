import { getLikedMembers } from "@/src/actions/actions";
import MemberCard from "./member-card";
import { Member } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getMemberById } from "@/lib/server-utils";

const LikedUsersList = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return <div>User not found</div>;
  }
  const member = await getMemberById(user.id);

  if (!member) {
    return <div>Member not found</div>;
  }

  const likedMembers = await getLikedMembers(member);
  console.log("liked members:", likedMembers);
  return (
    <>
      <h1>Liked members:</h1>
      <div className="max-h-[400px] overflow-y-auto">
        <ul className="flex flex-wrap gap-5">
          {likedMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default LikedUsersList;
