
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCMS } from "@/contexts/CMSContext";
import { useMember } from "@/contexts/MemberContext";
import CMSEvents from "@/components/cms/CMSEvents";
import CMSMassSchedule from "@/components/cms/CMSMassSchedule";
import CMSMinistries from "@/components/cms/CMSMinistries";
import CMSGallery from "@/components/cms/CMSGallery";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ShapesBackground from "@/components/ui/ShapesBackground";

const CMS = () => {
  const navigate = useNavigate();
  const { member } = useMember();
  const { toast } = useToast();
  const { contentType } = useParams<{ contentType?: string }>();
  const [activeTab, setActiveTab] = useState<string>(contentType || "events");
  const { saveContent } = useCMS();

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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/cms/${value}`);
  };

  const handleSave = () => {
    saveContent();
    toast({
      title: "Content Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Content Management System</h1>
            <Button onClick={handleSave}>Save All Changes</Button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="massSchedule">Mass Schedule</TabsTrigger>
                <TabsTrigger value="ministries">Ministries</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="events">
                <CMSEvents />
              </TabsContent>
              
              <TabsContent value="massSchedule">
                <CMSMassSchedule />
              </TabsContent>
              
              <TabsContent value="ministries">
                <CMSMinistries />
              </TabsContent>
              
              <TabsContent value="gallery">
                <CMSGallery />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CMS;
