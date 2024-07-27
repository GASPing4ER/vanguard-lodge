import { Member } from "@prisma/client";
import MemberCard from "./member-card";
import SearchArea from "./search-area";
import LikedUsersList from "./liked-users-list";

type ConnectLayoutProps = {
  user: Member;
  members: Member[];
  filteredMembers: Member[];
};

const ConnectLayout = ({
  user,
  members,
  filteredMembers,
}: ConnectLayoutProps) => {
  console.log("Members", members);

  const occupations = Array.from(
    new Set(members.map((member) => member.occupation))
  );

  return (
    <div className="flex flex-col gap-5 h-screen max-w-[1024px] mx-auto py-10">
      <div className="flex items-end gap-5">
        <h1 className="text-2xl font-bold text-zinc-900">Members</h1>
        <p className="text-2xl font-bold text-zinc-400">
          {filteredMembers.length}
        </p>
      </div>
      <SearchArea occupations={occupations} />
      <div className="max-h-[400px] overflow-y-auto">
        <ul className="flex flex-wrap gap-5">
          {filteredMembers.map((member) => (
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
      <LikedUsersList user={user} />
    </div>
  );
};

export default ConnectLayout;
