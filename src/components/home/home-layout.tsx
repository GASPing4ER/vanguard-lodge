// home.tsx
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import AddMemberForm from "./add-member-form";
import Image from "next/image";
import { Member } from "@prisma/client";

type HomeLayoutProps = {
  user: KindeUser;
  member: Member | null;
};

const HomeLayout = ({ user, member }: HomeLayoutProps) => {
  if (!user) {
    return (
      <div>
        <p>User not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">Profile</h1>
      <p className="text-lg text-zinc-400 -mt-3">
        Update your personal details here.
      </p>
      <div className="flex">
        {user.picture && (
          <Image
            src={user.picture}
            alt="user avatar"
            width={75}
            height={75}
            className="rounded-full"
            priority
          />
        )}
        <div className="flex flex-col justify-center ml-5">
          <h2 className="text-2xl font-semibold">
            {member?.display_name || user.given_name}
          </h2>
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
