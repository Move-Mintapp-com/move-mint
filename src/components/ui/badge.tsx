import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border-none px-3 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all duration-300 overflow-hidden backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] shadow-[0_0_0_0.1em_hsla(0,0%,100%,0.3)_inset]",
  {
    variants: {
      variant: {
        default:
          "bg-[hsla(0,0%,100%,0.15)] text-primary [a&]:hover:bg-[hsla(0,0%,100%,0.25)]",
        mint:
          "bg-primary/20 text-foreground dark:text-primary-foreground [a&]:hover:bg-primary/30",
        secondary:
          "bg-primary/20 text-foreground dark:text-primary-foreground [a&]:hover:bg-primary/30",
        destructive:
          "bg-[hsla(0,0%,100%,0.15)] text-destructive [a&]:hover:bg-[hsla(0,0%,100%,0.25)]",
        outline:
          "bg-[hsla(0,0%,100%,0.1)] text-foreground [a&]:hover:bg-[hsla(0,0%,100%,0.2)] [a&]:hover:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
