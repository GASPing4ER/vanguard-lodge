import { Member } from "@prisma/client";
import Image from "next/image";

type MemberCardProps = {
  member: Member;
};

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <li className="flex flex-col items-center gap-1 bg-zinc-100 rounded p-8 w-56">
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
      <a href={`mailto:${member.email}`} className="text-sm text-blue-800">
        {member.email}
      </a>
    </li>
  );
};

export default MemberCard;
