"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SearchAreaProps = {
  occupations: string[];
};

const SearchArea = ({ occupations }: SearchAreaProps) => {
  const [chosenOccupation, setChosenOccupation] = useState("");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (searchText && chosenOccupation) {
      router.push(
        `/app?layout=connect&searchText=${searchText}&occupation=${chosenOccupation}`
      );
    } else if (searchText) {
      router.push(`/app?layout=connect&searchText=${searchText}`);
    } else if (chosenOccupation) {
      router.push(`/app?layout=connect&occupation=${chosenOccupation}`);
    } else {
      router.push(`/app?layout=connect`);
    }
  }, [chosenOccupation, searchText]);

  const handleOccupationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenOccupation(e.target.value);
  };

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex items-center gap-10 w-full p-3 bg-zinc-100">
      <input
        type="text"
        placeholder="Search by name, email, etc."
        className="w-[200px] flex py-1 px-2 border border-solid rounded-lg placeholder:text-zinc-400"
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <select
        id="occupation-select"
        className="py-1 px-2 w-fit border border-solid focus:outline-none rounded-lg text-zinc-400"
        value={chosenOccupation}
        onChange={handleOccupationChange}
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
