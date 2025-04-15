
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageFilterType, filterClassMap, getDefaultFilterForCategory } from "@/utils/imageFilters";

interface FilteredImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  filter?: ImageFilterType;
  defaultFilter?: ImageFilterType;
  enableHover?: boolean;
}

const FilteredImage: React.FC<FilteredImageProps> = ({
  src,
  alt,
  className,
  category,
  filter,
  defaultFilter = "none",
  enableHover = false
}) => {
  // Use provided filter, or get default for category, or use provided defaultFilter
  const [activeFilter] = useState<ImageFilterType>(
    filter || getDefaultFilterForCategory(category) || defaultFilter
  );
  
  return (
    <div className={cn(
      "filtered-image-container overflow-hidden relative", 
      className
    )}>
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          filterClassMap[activeFilter],
          enableHover && "hover:scale-105"
        )}
      />
    </div>
  );
};

export default FilteredImage;
