
import { useState } from "react";
import { useCMS, GalleryImageType } from "@/contexts/CMSContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, Plus, Edit, ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

const CMSGallery = () => {
  const { galleryImages, setGalleryImages } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImageType | null>(null);
  const [formData, setFormData] = useState<Omit<GalleryImageType, "id">>({
    src: "",
    alt: "",
    category: "",
  });

  // Get unique categories
  const categories = Array.from(new Set(galleryImages.map(img => img.category)));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const openNewImageForm = () => {
    setCurrentImage(null);
    setFormData({
      src: "",
      alt: "",
      category: "",
    });
    setIsOpen(true);
  };

  const openEditImageForm = (image: GalleryImageType) => {
    setCurrentImage(image);
    setFormData({
      src: image.src,
      alt: image.alt,
      category: image.category,
    });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!formData.src.trim() || !formData.alt.trim() || !formData.category.trim()) {
      return; // Don't save incomplete data
    }

    if (currentImage) {
      // Update existing image
      setGalleryImages(galleryImages.map(img => img.id === currentImage.id ? { ...img, ...formData } : img));
    } else {
      // Add new image
      const newImage = {
        id: Math.max(0, ...galleryImages.map(img => img.id)) + 1,
        ...formData
      };
      setGalleryImages([...galleryImages, newImage]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: number) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gallery Images</h2>
        <Button onClick={openNewImageForm}>
          <Plus className="h-4 w-4 mr-2" /> Add New Image
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <AspectRatio ratio={4/3} className="bg-muted">
                  {image.src ? (
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted">
                      <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </AspectRatio>
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white" onClick={() => openEditImageForm(image)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-destructive" onClick={() => handleDelete(image.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium line-clamp-1">{image.alt}</h3>
                <div className="mt-2">
                  <Badge variant="outline">{image.category}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {galleryImages.length === 0 && (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">No gallery images found. Add your first image.</p>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{currentImage ? "Edit Image" : "Add New Image"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="src">Image URL</Label>
              <Input
                id="src"
                name="src"
                value={formData.src}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Image Description</Label>
              <Input
                id="alt"
                name="alt"
                value={formData.alt}
                onChange={handleInputChange}
                placeholder="Description of image"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="flex gap-2">
                <Select 
                  value={formData.category} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Add new category</SelectItem>
                  </SelectContent>
                </Select>
                {formData.category === "new" && (
                  <Input
                    name="category"
                    value=""
                    onChange={handleInputChange}
                    placeholder="New category name"
                    className="flex-1"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Image</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSGallery;
