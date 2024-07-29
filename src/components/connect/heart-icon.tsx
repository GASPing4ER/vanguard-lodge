"use client";

import { Member } from "@prisma/client";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { useMemberContext } from "@/lib/hooks";

type HeartIconProps = {
  member: Member;
};

const HeartIcon = ({ member }: HeartIconProps) => {
  const { currentMember, handleLikeMember, handleUnlikeMember } =
    useMemberContext();
  if (!currentMember) {
    return null;
  }

  const isLiked = currentMember.favorites.includes(member.id);
  if (isLiked) {
    return (
      <FaHeart
        onClick={async () => handleUnlikeMember(member.id)}
        className="absolute right-3 top-3 text-black text-2xl cursor-pointer"
      />
    );
  } else {
    return (
      <BiHeart
        onClick={async () => handleLikeMember(member.id)}
        className="absolute right-3 top-3 text-black text-2xl cursor-pointer"
      />
    );
  }
};

export default HeartIcon;
