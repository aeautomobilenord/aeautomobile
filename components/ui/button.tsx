import * as React from "react";
import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  asChild?: boolean;
};

export function buttonClasses({
  variant = "primary",
  className
}: {
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  return cn(
    "inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" &&
      "bg-sky-500 text-white shadow-soft hover:-translate-y-0.5 hover:bg-sky-600",
    variant === "secondary" &&
      "border border-sky-200 bg-white text-slate-900 hover:border-sky-300 hover:bg-sky-50",
    variant === "ghost" && "text-slate-700 hover:bg-slate-100",
    className
  );
}

export function Button({
  className,
  variant = "primary",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = buttonClasses({ variant, className });

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(classes, (children.props as { className?: string }).className)
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
