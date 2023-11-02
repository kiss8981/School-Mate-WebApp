import { classNames } from "@/lib/uitls";
import * as React from "react";

type ButtonProps = {
  isLoading?: boolean;
  variant?: "primary" | "danger" | "outline";
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, isLoading, disabled, variant, ...rest },
  ref
) {
  const buttonDisabled = isLoading || disabled;

  return (
    <button
      ref={ref}
      type="button"
      disabled={buttonDisabled}
      className={classNames(
        className,
        buttonDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ...[
          variant === "primary" && [
            "bg-primary-500 hover:bg-primary-600 text-white ring-0",
          ],
          variant === "danger" && [
            "bg-red-500 hover:bg-red-600 text-white ring-0",
          ],
          variant === "outline" && [
            "border border-gray-500 hover:border-gray-600 hover:bg-gray-100 text-black ring-0",
          ],
        ],
        "rounded-md px-2 py-1 border"
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.defaultProps = {
  variant: "primary",
};

export default Button;
