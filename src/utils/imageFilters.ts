
// Define different image filter options
export type ImageFilterType = 
  | "none" 
  | "church" 
  | "sepia" 
  | "grayscale" 
  | "contrast" 
  | "blur" 
  | "vintage";

// Map of filter class names for each filter type
export const filterClassMap: Record<ImageFilterType, string> = {
  none: "",
  church: "filter-church",
  sepia: "filter-sepia",
  grayscale: "filter-grayscale",
  contrast: "filter-contrast",
  blur: "filter-blur",
  vintage: "filter-vintage"
};

// Get default filter for a specific category (can be customized)
export const getDefaultFilterForCategory = (category?: string): ImageFilterType => {
  if (!category) return "none";
  
  // Map categories to specific filters
  const categoryFilterMap: Record<string, ImageFilterType> = {
    "Church": "church",
    "Events": "vintage",
    "Services": "contrast",
    "Outreach": "sepia",
    "Ministries": "church"
  };
  
  return categoryFilterMap[category] || "none";
};
