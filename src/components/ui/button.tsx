import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[1.25em] text-sm font-medium transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)]",
  {
    variants: {
      variant: {
        default: "bg-[hsla(0,0%,100%,0.15)] text-primary shadow-[0_0_0_0.1em_hsla(0,0%,100%,0.3)_inset] hover:bg-[hsla(0,0%,100%,0.25)] hover:text-primary",
        mint: "bg-primary text-primary-foreground shadow-[0_0_0_0.1em_hsla(0,0%,100%,0.3)_inset] hover:bg-primary/90 hover:shadow-[0_0_0_0.15em_hsla(0,0%,100%,0.4)_inset]",
        destructive:
          "bg-[hsla(0,0%,100%,0.15)] text-destructive shadow-[0_0_0_0.1em_hsla(0,0%,100%,0.3)_inset] hover:bg-[hsla(0,0%,100%,0.25)] hover:text-destructive",
        outline:
          "bg-[hsla(0,0%,100%,0.1)] text-foreground shadow-[0_0_0_0.1em_hsla(0,0%,100%,0.3)_inset] hover:bg-[hsla(0,0%,100%,0.2)] hover:text-primary",
        secondary:
          "bg-[hsla(0,0%,100%,0.15)] text-secondary shadow-[0_0_0_0.1em_hsla(0,0%,100%,0.3)_inset] hover:bg-[hsla(0,0%,100%,0.25)] hover:text-secondary",
        ghost:
          "bg-transparent text-foreground hover:bg-[hsla(0,0%,100%,0.15)] hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-[1em] gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-[1.25em] px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-[1.25em]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
