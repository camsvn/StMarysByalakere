
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";
import { useCMS } from "@/contexts/CMSContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, BookOpen, Heart, Users, Award, Coffee, Globe, Gift, MessageCircle } from "lucide-react";

const Ministries = () => {
  const { ministries } = useCMS();
  
  // Helper function to render the correct icon
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Users: <Users className="h-6 w-6" />,
      Music: <Music className="h-6 w-6" />,
      BookOpen: <BookOpen className="h-6 w-6" />,
      Heart: <Heart className="h-6 w-6" />,
      Award: <Award className="h-6 w-6" />,
      Coffee: <Coffee className="h-6 w-6" />,
      Globe: <Globe className="h-6 w-6" />,
      Gift: <Gift className="h-6 w-6" />,
      MessageCircle: <MessageCircle className="h-6 w-6" />,
    };
    
    return iconMap[iconName] || <Users className="h-6 w-6" />;
  };

  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <SectionHeading 
            title="Ministries & Groups"
            subtitle="Discover how you can get involved and serve in our parish community."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {ministries.map((ministry, index) => (
              <Card key={index} className={`overflow-hidden animate-fade-in animate-delay-${index % 3 * 100}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary">
                      {getIconComponent(ministry.icon)}
                    </div>
                    <CardTitle className="text-xl">{ministry.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{ministry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
              <p className="mb-4">
                Whether you're interested in serving, sharing your talents, or growing in faith, there's a place for you in our parish community. 
                Contact us to learn more about these ministries or to get involved.
              </p>
              <p>
                "As each one has received a gift, use it to serve one another as good stewards of God's varied grace." - 1 Peter 4:10
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Ministries;
