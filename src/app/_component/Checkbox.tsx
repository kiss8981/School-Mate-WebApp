import { classNames } from "@/lib/uitls";
import * as React from "react";
import styled from "styled-components";

type InputProps = {
  variant?: "primary" | "danger" | "outline";
} & React.ComponentPropsWithRef<"input">;

const Checkbox = React.forwardRef<HTMLInputElement, InputProps>(function Button(
  { children, className, disabled, variant, ...rest },
  ref
) {
  return (
    <input
      type="checkbox"
      ref={ref}
      disabled={disabled}
      className={classNames(
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ...[variant === "primary" && ["bg-[#f9f9f9] text-black ring-0"]],
        "px-3 py-3 rounded-[10px] ring-0 outline-none",
        className
      )}
      {...rest}
    />
  );
});

Checkbox.defaultProps = {
  variant: "primary",
};

export default Checkbox;
