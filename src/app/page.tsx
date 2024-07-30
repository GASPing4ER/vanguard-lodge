import logo from "@/public/logo.svg";
import Image from "next/image";
import LoginBtn from "../components/login-btn";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import SignupButton from "../components/signup-btn";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  const user = await getUser();
  console.log(isLoggedIn);
  console.log(user);
  if (isLoggedIn) {
    redirect("/app");
  }
  return (
    <main className=" h-screen bg-primary flex flex-col justify-center items-center gap-5">
      <Image src={logo} alt="logo" width={100} className="-mb-8" />
      <h1 className="text-secondary font-normal text-5xl">Vanguard Lodge</h1>
      <hr className="w-1/2" />
      <h2 className="text-neutral font-normal italic">
        "Igniting Ambition, Cultivating Excellence"
      </h2>
      <div className="flex gap-4">
        <LoginBtn />
        <SignupButton />
      </div>
    </main>
  );
}
