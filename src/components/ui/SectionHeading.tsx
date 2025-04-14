
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) => {
  return (
    <div className={cn(
      centered ? "text-center" : "text-left",
      "mb-8 md:mb-12",
      className
    )}>
      <h2 className="font-bold text-3xl md:text-4xl mb-3">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={cn(
        "h-1 w-20 bg-accent mt-4",
        centered ? "mx-auto" : ""
      )} />
    </div>
  );
};

export default SectionHeading;
