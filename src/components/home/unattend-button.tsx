"use client";

import { unattendEvent } from "@/src/actions/actions";
import React from "react";
import { CgClose } from "react-icons/cg";

type UnattendButtonProps = {
  memberId: string;
  eventId: number;
};

const UnattendButton = ({ memberId, eventId }: UnattendButtonProps) => {
  const onUnattend = async () => {
    await unattendEvent(memberId, eventId);
  };

  return (
    <button
      onClick={onUnattend}
      className="bg-zinc-900 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
    >
      <CgClose />
    </button>
  );
};

export default UnattendButton;
