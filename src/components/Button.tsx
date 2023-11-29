import { ButtonHTMLAttributes, PropsWithChildren } from "react";

const Button = ({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={`h-8 px-2 m-1 rounded-lg border border-gray-300 shadow hover:shadow-md hover:shadow-gray-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
