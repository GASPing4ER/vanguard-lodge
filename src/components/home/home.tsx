import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AddMemberForm from "./add-member-form";
import Image from "next/image";
import { getMemberById } from "@/lib/server-utils";

const HomeLayout = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return {
      message: "User not found",
    };
  }

  const member = await getMemberById(user.id);

  return (
    <div className="flex flex-col gap-5 h-screen p-12">
      <h1 className="text-4xl font-semibold">Profile</h1>
      <p className="text-lg text-zinc-400">
        Update your personal details here.
      </p>
      <div className="flex">
        {user?.picture && (
          <Image
            src={user.picture}
            alt="user avatar"
            width={100}
            height={100}
            className="rounded-full "
            priority
          />
        )}
        <div className="flex flex-col justify-center ml-5">
          <h2 className="text-2xl font-semibold">{user?.given_name}</h2>
          <p className="text-lg text-zinc-400 -mt-1">
            {member ? "Authorized" : "Unauthorized"}
          </p>
        </div>
      </div>
      <AddMemberForm user={user} member={member} />
    </div>
  );
};

export default HomeLayout;
