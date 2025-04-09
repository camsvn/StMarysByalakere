
import { cn } from "@/lib/utils";

interface FluidDividerProps {
  className?: string;
  color?: string;
  height?: number;
}

const FluidDivider = ({
  className,
  color = "bg-accent",
  height = 8
}: FluidDividerProps) => {
  return (
    <div className={cn("w-full overflow-hidden my-8", className)}>
      <svg
        className="w-full"
        height={height * 10}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,50 C200,10 400,60 600,30 C800,10 1000,40 1200,20 L1200,60 L0,60 Z"
          className={cn("fill-current", color)}
        />
      </svg>
    </div>
  );
};

export default FluidDivider;
