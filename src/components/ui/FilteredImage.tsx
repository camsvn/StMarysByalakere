
import React from 'react';
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type FilterType = 'event' | 'ministry' | 'church' | 'gallery' | 'none';

interface FilteredImageProps {
  src: string;
  alt: string;
  filterType?: FilterType;
  aspectRatio?: number;
  className?: string;
  containerClassName?: string;
}

const FilteredImage = ({ 
  src, 
  alt, 
  filterType = 'church', 
  aspectRatio, 
  className,
  containerClassName 
}: FilteredImageProps) => {
  const filterClass = filterType !== 'none' ? `filter-${filterType}` : '';
  
  const imageContent = (
    <img 
      src={src} 
      alt={alt} 
      className={cn(
        "w-full h-full object-cover image-filter transition-all duration-500",
        filterClass,
        className
      )} 
    />
  );
  
  return (
    <div className={cn("image-container", containerClassName)}>
      {aspectRatio ? (
        <AspectRatio ratio={aspectRatio}>
          {imageContent}
        </AspectRatio>
      ) : (
        imageContent
      )}
    </div>
  );
};

export default FilteredImage;
