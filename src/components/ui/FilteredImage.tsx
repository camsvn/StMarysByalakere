
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FilteredImageProps {
  src: string;
  alt: string;
  aspectRatio?: number;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}

const FilteredImage = ({ 
  src, 
  alt, 
  aspectRatio = 16/9, 
  className,
  overlayClassName,
  children 
}: FilteredImageProps) => {
  return (
    <div className={cn("filtered-image-container", className)}>
      <AspectRatio ratio={aspectRatio}>
        <img 
          src={src} 
          alt={alt} 
          className="filtered-image w-full h-full object-cover"
        />
        <div className={cn("filtered-image-overlay", overlayClassName)}></div>
        {children}
      </AspectRatio>
    </div>
  );
};

export default FilteredImage;
