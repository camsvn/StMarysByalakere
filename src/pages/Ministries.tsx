
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";
import { useCMS } from "@/contexts/CMSContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, BookOpen, Heart, Users, Award, Coffee, Globe, Gift, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

  // Function to get a background image based on the ministry type
  const getMinistryBackground = (title: string, icon: string) => {
    const imageMap: Record<string, string> = {
      "Youth Ministry": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb",
      "Choir & Music": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      "Sunday School": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      "Charity & Outreach": "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "Catechism": "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    };
    
    // Default images based on icon if no specific match
    const iconImageMap: Record<string, string> = {
      Users: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
      Music: "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
      BookOpen: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
      Heart: "https://images.unsplash.com/photo-1469571486292-b53926e246b7",
      Award: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107",
      Coffee: "https://images.unsplash.com/photo-1542763979-ca8f1a060cf4",
      Globe: "https://images.unsplash.com/photo-1435575653489-b0873ec954e2",
      Gift: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f",
      MessageCircle: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
    };
    
    return imageMap[title] || iconImageMap[icon] || "https://images.unsplash.com/photo-1466442929976-97f336a657be";
  };

  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <SectionHeading 
            title="Pious Associations"
            subtitle="Discover how you can get involved and serve in our parish community."
          />
          
          {/* Featured Ministry */}
          {ministries.length > 0 && (
            <div className="mb-12">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative">
                    <AspectRatio ratio={16/9} className="md:h-full">
                      <img 
                        src={`${getMinistryBackground(ministries[0].title, ministries[0].icon)}?w=800&h=600&fit=crop&auto=format`}
                        alt={ministries[0].title}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-6 md:hidden">
                      <h3 className="text-2xl font-bold text-white">{ministries[0].title}</h3>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 hidden md:block">{ministries[0].title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary">
                        {getIconComponent(ministries[0].icon)}
                      </span>
                      <Badge variant="outline">Featured Ministry</Badge>
                    </div>
                    <p className="text-muted-foreground">{ministries[0].description}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
          
          {/* Ministries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {ministries.slice(1).map((ministry, index) => (
              <Card key={index} className={`overflow-hidden animate-fade-in animate-delay-${index % 3 * 100}`}>
                <div className="relative h-40">
                  <img 
                    src={`${getMinistryBackground(ministry.title, ministry.icon)}?w=400&h=200&fit=crop&auto=format`}
                    alt={ministry.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 text-secondary mb-2">
                      {getIconComponent(ministry.icon)}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{ministry.title}</CardTitle>
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
