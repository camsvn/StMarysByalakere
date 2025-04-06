
import { useState } from "react";
import { useCMS, MinistryType } from "@/contexts/CMSContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash, Plus, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import * as Icons from "lucide-react";

const iconOptions = ["Users", "Music", "BookOpen", "Heart", "Award", "Coffee", "Globe", "Gift", "MessageCircle"];

const CMSMinistries = () => {
  const { ministries, setMinistries } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [currentMinistry, setCurrentMinistry] = useState<MinistryType | null>(null);
  const [formData, setFormData] = useState<MinistryType>({
    title: "",
    description: "",
    icon: "Users",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, icon: value }));
  };

  const openNewMinistryForm = () => {
    setCurrentMinistry(null);
    setFormData({
      title: "",
      description: "",
      icon: "Users",
    });
    setIsOpen(true);
  };

  const openEditMinistryForm = (ministry: MinistryType) => {
    setCurrentMinistry(ministry);
    setFormData({
      title: ministry.title,
      description: ministry.description,
      icon: ministry.icon,
    });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.icon
    ) {
      return; // Don't save incomplete data
    }

    if (currentMinistry) {
      // Update existing ministry
      setMinistries(ministries.map(m => 
        m.title === currentMinistry.title ? formData : m
      ));
    } else {
      // Add new ministry
      setMinistries([...ministries, formData]);
    }
    setIsOpen(false);
  };

  const handleDelete = (title: string) => {
    setMinistries(ministries.filter(ministry => ministry.title !== title));
  };

  const renderIcon = (iconName: string) => {
    // @ts-ignore - We know these icons exist in the library
    const Icon = Icons[iconName];
    return Icon ? <Icon className="h-6 w-6" /> : null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Ministries</h2>
        <Button onClick={openNewMinistryForm}>
          <Plus className="h-4 w-4 mr-2" /> Add New Ministry
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ministries.map((ministry, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary">
                    {renderIcon(ministry.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{ministry.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {ministry.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-2">
                  <Button variant="ghost" size="sm" onClick={() => openEditMinistryForm(ministry)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(ministry.title)}>
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{currentMinistry ? "Edit Ministry" : "Add New Ministry"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ministry title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Select value={formData.icon} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      <div className="flex items-center gap-2">
                        {renderIcon(icon)}
                        <span>{icon}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ministry description"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Ministry</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSMinistries;
