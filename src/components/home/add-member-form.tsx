"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Member } from "@prisma/client";
import { useForm } from "react-hook-form";
import { memberFormSchema, TMemberForm } from "@/lib/validations";
import FormBtn from "./form-btn";
import { useMemberContext } from "@/lib/hooks";
import { toast } from "sonner";

type AddMemberFormProps = {
  user: KindeUser;
  member: Member | null;
};

const AddMemberForm = ({ user, member }: AddMemberFormProps) => {
  const { handleAddMember, handleEditMember } = useMemberContext();
  const actionType = member ? "edit" : "add";
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TMemberForm>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      display_name: member?.display_name || "",
      email: member?.email || user?.email || "",
      first_name: member?.first_name || user?.given_name || "",
      last_name: member?.last_name || user?.family_name || "",
      occupation: member?.occupation || "",
      phone: member?.phone || "",
    },
  });
  return (
    <form
      action={async () => {
        const isValid = await trigger();

        if (!isValid) {
          return;
        }

        const memberData = getValues();
        if (actionType === "add") {
          await handleAddMember(memberData);
        } else if (actionType === "edit") {
          await handleEditMember(user.id, memberData);
        }
      }}
      className="flex flex-col gap-5"
    >
      <div className="flex gap-5">
        <div className="flex flex-col border border-solid border-zinc-400 rounded-xl w-72 py-2 pr-12 pl-2">
          <label htmlFor="display_name" className="text-zinc-400">
            Display Name
          </label>
          <input
            id="display_name"
            {...register("display_name")}
            className="bg-transparent border-none text-lg"
          />
        </div>
        <div className="flex flex-col border border-solid border-zinc-400 rounded-xl w-72 py-2 pr-12 pl-2">
          <label htmlFor="email" className="text-zinc-400">
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            className="bg-transparent border-none text-lg"
          />
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex flex-col border border-solid border-zinc-400 rounded-xl w-72 py-2 pr-12 pl-2">
          <label htmlFor="first_name" className="text-zinc-400">
            First Name
          </label>
          <input
            id="first_name"
            {...register("first_name")}
            className="bg-transparent border-none text-lg"
          />
        </div>
        <div className="flex flex-col border border-solid border-zinc-400 rounded-xl w-72 py-2 pr-12 pl-2">
          <label htmlFor="last_name" className="text-zinc-400">
            Last Name
          </label>
          <input
            id="last_name"
            {...register("last_name")}
            className="bg-transparent border-none text-lg"
          />
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex flex-col border border-solid border-zinc-400 rounded-xl w-72 py-2 pr-12 pl-2">
          <label htmlFor="occupation" className="text-zinc-400">
            Occupation
          </label>
          <input
            id="occupation"
            {...register("occupation")}
            className="bg-transparent border-none text-lg"
          />
        </div>
        <div className="flex flex-col border border-solid border-zinc-400 rounded-xl w-72 py-2 pr-12 pl-2">
          <label htmlFor="phone" className="text-zinc-400">
            Phone
          </label>
          <input
            id="phone"
            {...register("phone")}
            className="bg-transparent border-none text-lg"
          />
        </div>
      </div>
      <FormBtn />
    </form>
  );
};

export default AddMemberForm;
