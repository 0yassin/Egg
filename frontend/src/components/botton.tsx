import { type ReactNode } from "react";
import { motion } from "motion/react";
interface buttonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  onClick?: () => void;
  disabled?: boolean;
}
function Button({ children, variant = "primary", onClick, disabled = false }: buttonProps) {
  let buttonStyle = "";
  if (variant === "primary") {
    buttonStyle = "bg-[#6882bb] text-black hover:bg-[#5d4a43] hover:text-white cursor-pointer";
  }

  if (variant === "secondary") {
    buttonStyle = "bg-[#5d4a43] text-white hover:bg-[#6882bb] hover:text-black cursor-pointer";
  }

  if (variant === "dark") {
    buttonStyle = "bg-black text-white hover:bg-[#6882bb] hover:text-black cursor-pointer";
  }
  return (
    <motion.button
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.98, y: 1 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3
        rounded-lg
        font-medium
        ${buttonStyle}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </motion.button>
  );
}
export default Button;
