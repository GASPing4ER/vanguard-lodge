import logo from "@/public/logo.svg";
import dinnerImg from "@/public/dinner.png";

import Image from "next/image";
import Link from "next/link";

import adventuresIcon from "@/public/adventures.svg";
import dinnersIcon from "@/public/dinners.svg";
import discussionsIcon from "@/public/discussions.svg";
import networkingIcon from "@/public/networking.svg";

import Experience from "@/src/components/experience";

export default function Home() {
  return (
    <>
      <main className="h-screen bg-primary flex flex-col justify-center items-center gap-5">
        <Image src={logo} alt="logo" width={100} className="-mb-8" />
        <h1 className="text-secondary font-normal text-5xl">Vanguard Lodge</h1>
        <hr className="h-[1px] border-secondary w-1/2" />
        <h2 className="text-neutral font-normal italic">
          "Igniting Ambition, Cultivating Excellence"
        </h2>
        <button className="bg-secondary text-neutral py-4 px-10 border border-solid border-secondary font-semibold cursor-pointer">
          <a href="#introduction">Join the movement</a>
        </button>
      </main>

      <div
        id="introduction"
        className="h-screen bg-neutral flex items-center justify-center gap-24"
      >
        <Image
          src={dinnerImg}
          alt="dinner with the boys"
          width={500}
          priority
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">
            Welcome to Vanguard Lodge: <br /> Where Brotherhood Meets Excellence
          </h2>
          <hr className="border border-solid border-secondary" />
          <p className="max-w-[500px]">
            At Vanguard Lodge, we're more than just a men's club – we're a
            community of like-minded individuals united by a shared passion for
            growth, camaraderie, and achievement. Whether you're seeking
            meaningful connections, stimulating conversations, or opportunities
            for personal and professional development, you'll find it all within
            our distinguished enclave.
          </p>
          <div>
            <button className="bg-secondary text-neutral py-4 px-10 rounded-xl font-semibold cursor-pointer">
              <Link href="/membership">Become a member</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="h-screen bg-primary flex items-start justify-center p-24 gap-24">
        <div className="flex flex-col gap-8">
          <h3 className="text-[#cecccc9f]">EXPERIENCE</h3>
          <h2 className="text-5xl text-neutral">Elevated Events</h2>
          <hr className="border border-solid border-secondary" />
          <p className="text-neutral">
            From intimate gatherings to grand celebrations, our events are
            designed to inspire, engage, and enrich.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Experience
            icon={networkingIcon}
            title="Networking Mixers"
            desc="Connect with like-minded individuals, forge meaningful relationships, and discover new opportunities at our networking mixers."
          />
          <Experience
            icon={dinnersIcon}
            title="Gourmet Dinners"
            desc="Savor exquisite cuisine and enjoy fine dining experiences with our gourmet dinners. Join us for culinary delights and memorable evenings."
          />
          <Experience
            icon={discussionsIcon}
            title="Discussion Groups"
            desc="Engage in lively conversations, share ideas, and broaden your horizons with our discussion groups. From current affairs to literature, explore diverse topics in a welcoming setting."
          />
          <Experience
            icon={adventuresIcon}
            title="Outdoor Adventures"
            desc="Escape the ordinary and embrace adventure with our outdoor activities. From axe throwing to hiking, join us for exhilarating experiences."
          />
        </div>
      </div>
    </>
  );
}
