import { Member } from "@prisma/client";
import Image from "next/image";

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
      <ul>
        {members.map((member) => (
          <li
            key={member.id}
            className="flex flex-col items-center gap-1 bg-zinc-100 rounded p-8 w-fit"
          >
            <Image
              src={member.imageUrl}
              alt="member avatar"
              width={75}
              height={75}
              className="rounded-full"
            />
            <p className="font-bold">
              {member.first_name} {member.last_name}
            </p>
            <p className="text-zinc-50 text-xs bg-zinc-900 py-1 px-4 rounded-full">
              {member.occupation}
            </p>
            <p className="text-sm text-zinc-700">{member.phone}</p>
            {/* Link mailto: member.email */}
            <a
              href={`mailto:${member.email}`}
              className="text-sm text-blue-800"
            >
              {member.email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectLayout;
