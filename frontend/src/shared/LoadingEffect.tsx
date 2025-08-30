// shared/LoadingEffect.tsx
import React from "react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit";
}

const LoadingEffect: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  children,
  type = "submit",
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={isLoading || rest.disabled}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform ${
        isLoading
          ? "cursor-not-allowed opacity-70 bg-gray-600 text-white"
          : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 hover:scale-105"
      } ${rest.className || ""}`}
      {...rest} // now safe to spread other props like onClick
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {!isLoading && children}
    </button>
  );
};

export default LoadingEffect;