import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-80 transition",
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
