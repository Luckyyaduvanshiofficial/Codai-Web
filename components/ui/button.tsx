import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[#0969da] dark:bg-[#4493f8] text-white hover:bg-[#0860ca] dark:hover:bg-[#368cf9] active:bg-[#0757ba] dark:active:bg-[#1f7eea] shadow-sm hover:shadow focus-visible:ring-[#0969da]/50 dark:focus-visible:ring-[#4493f8]/50",
        destructive:
          "bg-[#d1242f] dark:bg-[#f85149] text-white hover:bg-[#b62324] dark:hover:bg-[#da3633] focus-visible:ring-[#d1242f]/50",
        outline:
          "border-2 border-[#0969da] dark:border-[#4493f8] bg-transparent text-[#0969da] dark:text-[#4493f8] hover:bg-[#0969da]/10 dark:hover:bg-[#4493f8]/10 shadow-sm",
        secondary:
          "bg-[#f6f8fa] dark:bg-[#21262d] text-[#1f2328] dark:text-[#e6edf3] hover:bg-[#f3f4f6] dark:hover:bg-[#30363d] border border-[#d0d7de] dark:border-[#30363d]",
        ghost:
          "hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] text-[#1f2328] dark:text-[#e6edf3]",
        link: "text-[#0969da] dark:text-[#4493f8] hover:underline underline-offset-4",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-5 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
