"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type NottificationModalProps = {
  layout: string;
};

const NottificationModal = ({ layout }: NottificationModalProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, [layout]);
  return <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />;
};

type SpringModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const SpringModal = ({ isOpen, setIsOpen }: SpringModalProps) => {
  const router = useRouter();

  const onHandleClick = () => {
    setIsOpen(false);
    router.push("/app");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-zinc-900 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Fill out your information!
              </h3>
              <p className="text-center mb-6">
                In order to access the full features of this app, please fill
                out your information.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={onHandleClick}
                  className="bg-white hover:opacity-90 transition-opacity text-zinc-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NottificationModal;
