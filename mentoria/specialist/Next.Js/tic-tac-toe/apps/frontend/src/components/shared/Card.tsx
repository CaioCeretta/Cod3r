import type { ReactNode } from "react";
import clsx from "clsx";
import type { ColorVariant } from "@/types/theme";

export interface CardProps {
  children?: ReactNode;
  color: ColorVariant;
  noBorder?: boolean;
  hover?: boolean;
}

const lightColor = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  dark: "bg-dark-500",
  light: "bg-light-500",
};

const darkerColor = {
  primary: "bg-primary-600",
  secondary: "bg-secondary-600",
  dark: "bg-dark-600",
  light: "bg-light-600",
};

const hoverColor = {
  primary: "hover:bg-primary-400",
  secondary: "hover:bg-secondary-400",
  dark: "hover:bg-dark-400",
  light: "hover:bg-light-400",
};

export const Card = ({ children, color, noBorder, hover }: CardProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className={clsx("rounded-xl", lightColor[color])}>
        <div
          className={clsx(
            "rounded-xl",
            darkerColor[color],
            !noBorder && "mb-2"
          )}
        >
          <div
            className={clsx(
              "rounded-xl p-2 overflow-auto",
              hover && hoverColor[color ?? "light"]
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
