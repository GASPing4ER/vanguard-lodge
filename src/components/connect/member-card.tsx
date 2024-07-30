import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Member } from "@prisma/client";
import Image from "next/image";

type MemberCardProps = {
  member: Member;
};

const MemberCard = ({ member }: MemberCardProps) => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  if (!user) {
    return null;
  }

  return (
    <li className="relative text-center flex flex-col items-center gap-1 bg-zinc-100 rounded p-8 w-full xs:w-[calc(50%-16px)] sm:w-56">
      {member.imageUrl && !member.imageUrl.includes("blank") ? (
        <Image
          src={member.imageUrl || ""}
          alt="member avatar"
          width={75}
          height={75}
          className="rounded-full"
        />
      ) : (
        <div className="w-[75px] h-[75px] bg-zinc-300 rounded-full flex justify-center items-center text-4xl">
          {member.first_name[0]}
        </div>
      )}
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
