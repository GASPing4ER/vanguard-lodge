"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { memberDataSchema } from "@/lib/validations";
import { getMemberById } from "@/lib/server-utils";
import { Member } from "@prisma/client";

const { getUser } = getKindeServerSession();

export const addMember = async (memberData: unknown) => {
  // authentication
  const user = await getUser();
  if (!user) {
    return {
      message: "User not found",
    };
  }

  // validation
  const validatedFormData = memberDataSchema.safeParse(memberData);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }

  // database mutation
  try {
    await prisma.member.create({
      data: {
        id: user.id,
        imageUrl: user.picture || "",
        ...validatedFormData.data,
      },
    });
  } catch (error) {
    return {
      message: "Failed to add member",
    };
  }

  revalidatePath("/app");
};

export const editMember = async (memberId: string, memberData: unknown) => {
  // authentication
  const user = await getUser();
  if (!user) {
    return {
      message: "User not found",
    };
  }

  // validation
  const validatedMember = memberDataSchema.safeParse(memberData);

  if (!validatedMember.success) {
    return {
      message: "Invalid member data",
    };
  }

  // authorization
  const memberCheck = await getMemberById(memberId);

  if (!memberCheck) {
    return {
      message: "Member not found",
    };
  }

  if (memberCheck.id !== user.id) {
    return {
      message: "Unauthorized",
    };
  }

  // database mutation
  try {
    await prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        ...validatedMember.data,
      },
    });
  } catch (error) {
    return {
      message: "Failed to edit member",
    };
  }

  revalidatePath("/app", "layout");
};

export const getMembers = async () => {
  const members = await prisma.member.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return members;
};

export const likeMember = async (memberId: string, currentUser: Member) => {
  console.log("liking in progress...");
  // authentication
  const user = await getUser();
  if (!user) {
    return {
      message: "User not found",
    };
  }

  try {
    await prisma.member.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favorites: currentUser.favorites
          ? [...currentUser.favorites, memberId]
          : [memberId],
      },
    });
    revalidatePath("/app");
  } catch (error) {
    console.error(error);
  }
};

export const unlikeMember = async (memberId: string, currentUser: Member) => {
  // authentication
  const user = await getUser();
  if (!user) {
    return {
      message: "User not found",
    };
  }

  try {
    await prisma.member.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favorites: currentUser.favorites.filter((id) => id !== memberId),
      },
    });
    revalidatePath("/app");
  } catch (error) {
    console.error(error);
  }
};

export const getLikedMembers = async (currentUser: Member) => {
  const likedMembers = await prisma.member.findMany({
    where: {
      id: {
        in: currentUser.favorites,
      },
    },
  });
  return likedMembers;
};
