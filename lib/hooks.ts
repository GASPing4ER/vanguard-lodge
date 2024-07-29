import { MemberContext } from "@/src/contexts/member-context-provider";
import { SearchContext } from "@/src/contexts/search-context-provider";
import { useContext } from "react";

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("useMemberContext must be used within a MemberProvider");
  }
  return context;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
