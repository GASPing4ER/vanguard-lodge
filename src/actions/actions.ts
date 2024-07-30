"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { eventDataSchema, memberDataSchema } from "@/lib/validations";
import { getMemberById } from "@/lib/server-utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Member } from "@prisma/client";

const { getUser } = getKindeServerSession();

// MEMBER ACTIONS

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
  return {
    message: "Member authorized successfully",
  };
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
  return {
    message: "Member saved successfully",
  };
};

export const getMembers = async () => {
  const members = await prisma.member.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return members;
};

export const getEvents = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      date: "desc",
    },
  });
  return events;
};

// EVENTS ACTIONS

export const joinEvent = async (eventId: number) => {
  // authentication
  const user = await getUser();
  if (!user) {
    return {
      message: "User not found",
    };
  }
  console.log("checking if user is already joined...");
  try {
    // Check if the member already joined the event
    const existingParticipant = await prisma.eventParticipant.findUnique({
      where: {
        eventId_memberId: {
          eventId: eventId,
          memberId: user.id,
        },
      },
    });

    if (existingParticipant) {
      return {
        message: "Already joined",
      };
    }

    console.log("joining event...");

    // Create a new participant entry
    await prisma.eventParticipant.create({
      data: {
        eventId: eventId,
        memberId: user.id,
      },
    });

    // Optionally, you can revalidate the path to reflect changes
    revalidatePath("/app");

    return {
      message: "Joined successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to join event",
    };
  }
};

export const checkJoinedEvent = async (eventId: number) => {
  const user = await getUser();
  if (!user) {
    return {
      message: "User not found",
    };
  }
  const joinedMember = await prisma.eventParticipant.findUnique({
    where: {
      eventId_memberId: {
        eventId: eventId,
        memberId: user.id,
      },
    },
  });
  return !!joinedMember;
};

export const addEvent = async (eventData: unknown) => {
  // Authentication
  const user = await getUser();
  if (!user) {
    return {
      message: "User not found",
    };
  }

  // Validation
  const validatedEventData = eventDataSchema.safeParse(eventData);
  if (!validatedEventData.success) {
    return {
      message: "Invalid event data",
    };
  }

  // Transform validated data
  const { date, activities, time, ...rest } = validatedEventData.data;
  const formattedDate = new Date(date); // Convert date string to Date object
  const activitiesArray = activities
    .split(",")
    .map((activity) => activity.trim()); // Convert comma-separated string to array

  // Ensure timeConstraint is a string or use an empty string if undefined
  const validTimeConstraint = time ?? "";

  // Ensure imageUrl is a string or use an empty string if undefined

  // Database mutation
  try {
    await prisma.event.create({
      data: {
        ...rest,
        date: formattedDate,
        activities: activitiesArray, // Ensure activities is an array of strings
        organizerId: user.id, // Assuming the current user is the organizer
        time: validTimeConstraint, // Ensure timeConstraint is always a string
      },
    });
    revalidatePath("/app"); // Optionally revalidate the path
    return {
      message: "Event added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to add event",
    };
  }
};

export const getAttendingEvents = async (userId: KindeUser["id"]) => {
  const events = await prisma.event.findMany({
    where: {
      participants: {
        some: {
          memberId: userId,
        },
      },
    },
  });
  return events;
};

export const getOrganizingEvents = async (userId: KindeUser["id"]) => {
  const events = await prisma.event.findMany({
    where: {
      organizerId: userId,
    },
  });
  return events;
};

export const unattendEvent = async (memberId: string, eventId: number) => {
  try {
    await prisma.eventParticipant.delete({
      where: {
        eventId_memberId: {
          eventId: eventId,
          memberId: memberId,
        },
      },
    });
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error("Error unattending event:", error);
    return { success: false, error: "Error unattending event" };
  }
};

export const getEventAttendees = async (eventId: number): Promise<Member[]> => {
  const participants = await prisma.eventParticipant.findMany({
    where: { eventId },
    include: { member: true },
  });
  return participants.map((participant) => participant.member);
};
