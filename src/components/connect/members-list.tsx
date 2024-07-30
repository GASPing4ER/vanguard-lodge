"use client";

import { useMemberContext, useSearchContext } from "@/lib/hooks";
import MemberCard from "./member-card";
import { useMemo } from "react";

const MembersList = () => {
  const { members } = useMemberContext();
  const { searchQuery, chosenOccupation } = useSearchContext();
  console.log("searchQuery", searchQuery);
  console.log("chosenOccupation", chosenOccupation);

  const filteredMembers = useMemo(
    () =>
      members.filter(
        (member) =>
          (member.first_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            member.last_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          member.occupation
            .toLowerCase()
            .includes(chosenOccupation.toLowerCase())
      ),
    [members, searchQuery, chosenOccupation]
  );

  return (
    <div className="max-h-[450px] overflow-y-auto shadow-xl px-5 py-10 rounded-md custom-scrollbar">
      <ul className="flex flex-wrap gap-5">
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </ul>
    </div>
  );
};

export default MembersList;
