import { getMemberById } from "@/lib/server-utils";
import AddMemberForm from "@/src/components/home/add-member-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

const AppPage = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  if (!user) {
    return <div>User not found</div>;
  }

  const member = await getMemberById(user.id);

  return (
    <div className="flex flex-col gap-5 h-screen p-12 max-w-[1024px] mx-auto">
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

export default AppPage;
