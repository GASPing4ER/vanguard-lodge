import { getLikedMembers } from "@/src/actions/actions";
import { Member } from "@prisma/client";
import MemberCard from "./member-card";

type LikedUsersListProps = {
  user: Member;
};

const LikedUsersList = async ({ user }: LikedUsersListProps) => {
  const likedMembers = await getLikedMembers(user);
  return (
    <>
      <h1>Liked members:</h1>
      <div className="max-h-[400px] overflow-y-auto">
        <ul className="flex flex-wrap gap-5">
          {likedMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              user={user}
              isLiked={
                user.favorites ? !!user.favorites.includes(member.id) : false
              }
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default LikedUsersList;
