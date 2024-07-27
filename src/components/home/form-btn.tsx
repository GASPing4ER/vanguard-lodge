import { useFormStatus } from "react-dom";

const FormBtn = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      {" "}
      <button
        disabled={pending}
        className="text-zinc-50 bg-zinc-950 py-4 px-5 rounded-xl cursor-pointer disabled:opacity-50"
      >
        Save changes
      </button>
    </div>
  );
};

export default FormBtn;
