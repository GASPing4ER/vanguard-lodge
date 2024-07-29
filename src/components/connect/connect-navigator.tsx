import { BiHeart } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const ConnectNavigator = () => {
  return (
    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-5">
      <div className="text-zinc-50 text-sm bg-zinc-900 p-4 rounded-full flex flex-col items-center">
        <FaUsers className="text-3xl text-zinc-50" />
        Members
      </div>
      <div className="text-zinc-50 text-sm bg-zinc-900 p-4 rounded-full flex flex-col items-center">
        <BiHeart className="text-3xl text-zinc-50" />
        Liked
      </div>
    </div>
  );
};

export default ConnectNavigator;
