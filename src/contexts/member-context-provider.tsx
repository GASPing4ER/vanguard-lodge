"use client";

import { memberData } from "@/lib/types";
import {
  addMember,
  editMember,
  likeMember,
  unlikeMember,
} from "@/src/actions/actions";
import { Member } from "@prisma/client";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type MemberContextProviderProps = {
  data: Member[];
  currentMember: Member | null;
  children: React.ReactNode;
};

type TMemberContext = {
  members: Member[];
  currentMember: Member | null;
  selectedMember: Member | undefined;
  numberOfMembers: number;
  selectedMemberId: Member["id"] | null;
  handleAddMember: (newMember: memberData) => Promise<void>;
  handleEditMember: (
    memberId: Member["id"],
    editedMember: memberData
  ) => Promise<void>;
  handleChangeSelectedMemberId: (memberId: Member["id"]) => void;
  // handleLikeMember: (memberId: Member["id"]) => void;
  // handleUnlikeMember: (memberId: Member["id"]) => void;
};

export const MemberContext = createContext<TMemberContext | null>(null);

const MemberContextProvider = ({
  data,
  currentMember,
  children,
}: MemberContextProviderProps) => {
  // state
  const [optimisticMembers, setOptimisticMembers] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload, id: Math.random().toString() }];
        case "edit":
          return state.map((member) =>
            member.id === payload.id
              ? { ...member, ...payload.editedMember }
              : member
          );
        case "like":
          return state.map((member) =>
            member.id === payload.id
              ? {
                  ...member,
                  favorites: [...member.favorites, payload.currentMemberId],
                }
              : member
          );
        case "unlike":
          return state.map((member) =>
            member.id === payload.id
              ? {
                  ...member,
                  favorites: member.favorites.filter(
                    (id) => id !== payload.currentMemberId
                  ),
                }
              : member
          );
        default:
          return state;
      }
    }
  );

  const [selectedMemberId, setSelectedMemberId] = useState<Member["id"] | null>(
    null
  );

  // derived state
  const selectedMember = optimisticMembers.find(
    (member) => member.id === selectedMemberId
  );
  const numberOfMembers = optimisticMembers.length;

  // handlers
  const handleAddMember = async (newMember: memberData) => {
    setOptimisticMembers({ action: "add", payload: newMember });
    const error = await addMember(newMember);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditMember = async (
    memberId: Member["id"],
    editedMember: memberData
  ) => {
    setOptimisticMembers({
      action: "edit",
      payload: { id: memberId, editedMember },
    });
    const error = await editMember(memberId, editedMember);

    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleChangeSelectedMemberId = (id: Member["id"]) => {
    setSelectedMemberId(id);
  };

  // const handleLikeMember = async (memberId: Member["id"]) => {
  //   setOptimisticMembers({
  //     action: "like",
  //     payload: { id: memberId, currentMemberId: currentMember.id },
  //   });
  //   const error = await likeMember(memberId, currentMember);
  //   if (error) {
  //     toast.warning(error.message);
  //     return;
  //   }
  // };

  // const handleUnlikeMember = async (memberId: Member["id"]) => {
  //   setOptimisticMembers({
  //     action: "unlike",
  //     payload: { id: memberId, currentMemberId: currentMember.id },
  //   });
  //   const error = await unlikeMember(memberId, currentMember);
  //   if (error) {
  //     toast.warning(error.message);
  //     return;
  //   }
  // };

  return (
    <MemberContext.Provider
      value={{
        members: optimisticMembers,
        currentMember,
        selectedMember,
        numberOfMembers,
        selectedMemberId,
        handleAddMember,
        handleEditMember,
        handleChangeSelectedMemberId,
        // handleLikeMember,
        // handleUnlikeMember,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export default MemberContextProvider;
