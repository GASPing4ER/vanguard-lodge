import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Member } from "@prisma/client";

type ConnectLayoutProps = {
  user: KindeUser;
  member: Member;
};

const ConnectLayout = ({ user, member }: ConnectLayoutProps) => {
  return <div>Connect Layout</div>;
};

export default ConnectLayout;
