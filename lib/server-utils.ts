import "server-only";

import prisma from "@/lib/db";
import { Member } from "@prisma/client";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export const getMemberById = async (id: Member["id"]) => {
  const member = await prisma.member.findUnique({
    where: {
      id,
    },
  });
  return member;
};

export const checkUserAuth = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }

  return user;
};

export const checkMemberAuth = async (user: KindeUser) => {
  const member = await getMemberById(user.id);

  if (!member) {
    return null;
  }

  return member;
};
