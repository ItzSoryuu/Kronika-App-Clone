import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold font-ui ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        locked: "bg-stone-200 text-stone-400 hover:bg-stone-200/90 border-stone-300 border-b-4 active:border-b-0",
        default: "bg-amber-50 text-amber-900 border-amber-200 border-2 border-b-4 active:border-b-2 hover:bg-amber-100/70",
        primary: "bg-amber-700 text-white hover:bg-amber-700/90 border-amber-800 border-b-4 active:border-b-0",
        primaryOutline: "bg-white text-amber-700 border-amber-200 border-2 hover:bg-amber-50",
        secondary: "bg-amber-600 text-white hover:bg-amber-600/90 border-amber-700 border-b-4 active:border-b-0",
        secondaryOutline: "bg-white text-amber-600 border-amber-200 border-2 hover:bg-amber-50",
        danger: "bg-red-700 text-white hover:bg-red-700/90 border-red-800 border-b-4 active:border-b-0",
        dangerOutline: "bg-white text-red-700 border-red-200 border-2 hover:bg-red-50",
        super: "bg-stone-700 text-white hover:bg-stone-700/90 border-stone-800 border-b-4 active:border-b-0",
        superOutline: "bg-white text-stone-700 border-stone-200 border-2 hover:bg-stone-50",
        ghost: "bg-transparent text-stone-600 border-transparent border-0 hover:bg-stone-100",
        sidebar: "bg-transparent text-stone-600 border-2 border-transparent hover:bg-stone-100 transition-none",
        sidebarOutline: "bg-amber-700/15 text-amber-800 border-amber-600/30 border-2 hover:bg-amber-700/20 transition-none"
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
