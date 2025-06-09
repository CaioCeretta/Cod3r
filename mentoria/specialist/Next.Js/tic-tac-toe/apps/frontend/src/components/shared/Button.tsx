"use client";

import Card from "./Card";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: "primary" | "secondary" | "dark" | "light";
}

export const Button = (props: ButtonProps) => {
  return (
    <button {...props} className="text-black">
      <Card color={props.color} hover>
        {props.children}
      </Card>
    </button>
  );
};

export default Button;
