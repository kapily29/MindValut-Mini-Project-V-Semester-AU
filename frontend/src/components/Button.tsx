import { type ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "success";
  text: string;             // ✅ fix type
  startIcon?: ReactElement; // optional
  onClick?: () => void;
}

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600",
  secondary: "bg-purple-200 text-purple-600 hover:bg-purple-300 active:bg-purple-400 dark:bg-purple-800 dark:text-purple-200 dark:hover:bg-purple-700",
  success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 dark:bg-green-700 dark:hover:bg-green-600",
};

const defaultStyles = "px-3 sm:px-4 py-2 sm:py-2.5 rounded-md flex justify-center items-center transition-colors min-h-[44px] text-xs sm:text-sm font-medium whitespace-nowrap";

export function Button({ variant, text, startIcon, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}   
      className={`${variantClasses[variant]} ${defaultStyles} cursor-pointer`}
    >
      {startIcon && <div className="pr-1.5 sm:pr-2 flex items-center">{startIcon}</div>}
      <span className="truncate">{text}</span>
    </button>
  );
}
