import "server-only";

import prisma from "@/lib/db";
import { Member } from "@prisma/client";

export const getMemberById = async (id: Member["id"]) => {
  const member = await prisma.member.findUnique({
    where: {
      id,
    },
  });
  return member;
};
