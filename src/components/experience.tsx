import Image, { StaticImageData } from "next/image";

type ExperienceProps = {
  icon: StaticImageData;
  title: string;
  desc: string;
};

const Experience = ({ icon, title, desc }: ExperienceProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Image src={icon} alt="experience icon" height={60} />
      <h2 className="text-4xl text-neutral">{title}</h2>
      <p className="text-[#cecccc9f]">{desc}</p>
      <hr className="border border-solid border-[#cecccc42]" />
    </div>
  );
};

export default Experience;
