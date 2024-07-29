"use client";

import { useMemberContext, useSearchContext } from "@/lib/hooks";

const SearchArea = () => {
  const { members } = useMemberContext();
  const {
    searchQuery,
    chosenOccupation,
    handleChangeSearchQuery,
    handleOccupationChange,
  } = useSearchContext();

  const occupations = Array.from(
    new Set(members.map((member) => member.occupation))
  );

  return (
    <div className="flex flex-col xs:flex-row  xs:items-center gap-2 xs:gap-10 w-full p-3 bg-zinc-100">
      <input
        type="text"
        placeholder="Search by name, email, etc."
        className="xs:w-[200px] flex py-1 px-2 border border-solid rounded-lg placeholder:text-zinc-400"
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
      <select
        id="occupation-select"
        className="py-1 px-2 xs:w-fit border border-solid focus:outline-none rounded-lg text-zinc-400"
        value={chosenOccupation}
        onChange={(e) => handleOccupationChange(e.target.value)}
      >
        <option value="">Occupation</option>
        {occupations.map((occupation, index) => (
          <option key={index} value={occupation}>
            {occupation}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchArea;
