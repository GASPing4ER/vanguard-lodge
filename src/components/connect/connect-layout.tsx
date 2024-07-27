import { Member } from "@prisma/client";
import Image from "next/image";
import MemberCard from "./member-card";

type ConnectLayoutProps = {
  member: Member;
  members: Member[];
};

const ConnectLayout = ({ member, members }: ConnectLayoutProps) => {
  console.log("Members", members);
  return (
    <div className="flex flex-col gap-5 h-screen p-12">
      <div className="flex items-end gap-5">
        <h1 className="text-2xl font-bold text-zinc-900">Members</h1>
        <p className="text-2xl font-bold text-zinc-400">{members.length}</p>
      </div>
      <ul className="flex gap-5">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </ul>
    </div>
  );
};

export default ConnectLayout;
