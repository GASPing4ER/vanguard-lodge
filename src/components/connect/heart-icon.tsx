"use client";

import { Member } from "@prisma/client";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { likeMember, unlikeMember } from "@/src/actions/actions";

type HeartIconProps = {
  isLiked: boolean;
  user: Member;
  member: Member;
};

const HeartIcon = ({ isLiked, user, member }: HeartIconProps) => {
  if (isLiked) {
    return (
      <FaHeart
        onClick={async () => unlikeMember(member.id, user)}
        className="absolute right-3 top-3 text-black text-2xl cursor-pointer"
      />
    );
  } else {
    return (
      <BiHeart
        onClick={async () => likeMember(member.id, user)}
        className="absolute right-3 top-3 text-black text-2xl cursor-pointer"
      />
    );
  }
};

export default HeartIcon;
