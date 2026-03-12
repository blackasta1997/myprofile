"use client";

import { useRouter } from "next/navigation";

interface SignUpButtonProps {
  label: string;
}

const SignUpButton = ({ label }: SignUpButtonProps) => {
  const router = useRouter();

  const redirectToSignUp = () => {
    router.push("/appointment");
  };

  return (
    <button onClick={redirectToSignUp} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg uppercase text-sm tracking-wider">
      {label}
    </button>
  );
};

export default SignUpButton;
