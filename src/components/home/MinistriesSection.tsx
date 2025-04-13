import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, BookOpen, Heart, Users, Award, Coffee, Globe, Gift, MessageCircle } from "lucide-react";
import { useCMS } from "@/contexts/CMSContext";

interface MinistryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
  imageUrl?: string; // optional image URL
}

const MinistryCard = ({ title, description, icon, delay, imageUrl }: MinistryCardProps) => (
  <Card className={`card-hover animate-fade-in ${delay}`}>
    <CardHeader className="flex flex-col items-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-20 h-20 object-cover rounded-full mb-4 border"
        />
      )}
      {/* <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-4">
        {icon}
      </div> */}
      <CardTitle className="text-xl text-center">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-center">{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button variant="ghost" asChild className="w-full">
        <Link to={`/ministries`}>Learn More</Link>
      </Button>
    </CardFooter>
  </Card>
);

const MinistriesSection = () => {
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
    <section className="section-container">
      <SectionHeading
        title="Pious Association"
        subtitle="Get involved in our parish community through various ministries and groups. Find a place where your gifts and passions meet the needs of others."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ministries.map((ministry, index) => (
          <MinistryCard
            key={index}
            title={ministry.title}
            description={ministry.description}
            icon={getIconComponent(ministry.icon)}
            delay={`animate-delay-${index * 100}`}
            imageUrl={"https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=600&h=400&q=80"} // pass the imageUrl prop
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <Button asChild>
          <Link to="/ministries">Explore All Ministries</Link>
        </Button>
      </div>
    </section>
  );
};

export default MinistriesSection;
