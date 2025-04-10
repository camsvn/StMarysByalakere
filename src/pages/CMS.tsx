
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { useCMS } from "@/contexts/CMSContext";
import { useMember } from "@/contexts/MemberContext";
import CMSEvents from "@/components/cms/CMSEvents";
import CMSMassSchedule from "@/components/cms/CMSMassSchedule";
import CMSMinistries from "@/components/cms/CMSMinistries";
import CMSGallery from "@/components/cms/CMSGallery";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ShapesBackground from "@/components/ui/ShapesBackground";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Calendar, Clock, Users, Image } from "lucide-react";

// Define content types with metadata for more flexibility
const contentTypes = [
  {
    id: "events",
    title: "Events & Announcements",
    description: "Manage upcoming events and announcements",
    icon: <Calendar className="h-5 w-5" />,
    component: CMSEvents
  },
  {
    id: "massSchedule",
    title: "Mass Schedule",
    description: "Update mass and service times",
    icon: <Clock className="h-5 w-5" />,
    component: CMSMassSchedule
  },
  {
    id: "ministries",
    title: "Ministries & Groups",
    description: "Edit ministry information",
    icon: <Users className="h-5 w-5" />,
    component: CMSMinistries
  },
  {
    id: "gallery",
    title: "Gallery",
    description: "Manage photo gallery images",
    icon: <Image className="h-5 w-5" />,
    component: CMSGallery
  }
];

const CMS = () => {
  const navigate = useNavigate();
  const { member } = useMember();
  const { toast } = useToast();
  const { contentType } = useParams<{ contentType?: string }>();
  const [activeContent, setActiveContent] = useState<string>(contentType || "events");
  const { saveContent } = useCMS();

  // Update active content when route parameter changes
  useEffect(() => {
    if (contentType) {
      setActiveContent(contentType);
    }
  }, [contentType]);

  // Redirect non-admin users
  if (!member || member.role !== "admin") {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="mb-8">Only administrators can access the content management system.</p>
            <Button onClick={() => navigate("/login")}>Go to Login</Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const handleContentSelect = (id: string) => {
    setActiveContent(id);
    navigate(`/cms/${id}`);
  };

  const handleSave = () => {
    saveContent();
    toast({
      title: "Content Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  // Find the active content type
  const activeContentType = contentTypes.find(type => type.id === activeContent);
  const ActiveComponent = activeContentType?.component || contentTypes[0].component;

  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Content Management System</h1>
            <Button onClick={handleSave}>Save All Changes</Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Content Type Selection */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-4 sticky top-20">
                <h2 className="font-semibold mb-4 text-lg">Content Types</h2>
                <div className="space-y-2">
                  {contentTypes.map((type) => (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all hover:bg-primary/5 ${activeContent === type.id ? 'border-primary bg-primary/10' : ''}`}
                      onClick={() => handleContentSelect(type.id)}
                    >
                      <CardHeader className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-md ${activeContent === type.id ? 'bg-primary text-white' : 'bg-secondary/10'}`}>
                            {type.icon}
                          </div>
                          <div>
                            <CardTitle className="text-sm md:text-base">{type.title}</CardTitle>
                            <CardDescription className="text-xs hidden md:block">{type.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6">{activeContentType?.title}</h2>
                <ActiveComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CMS;
