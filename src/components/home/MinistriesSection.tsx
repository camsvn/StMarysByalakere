
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, BookOpen, Heart, Users } from "lucide-react";

interface MinistryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const MinistryCard = ({ title, description, icon, delay }: MinistryCardProps) => (
  <Card className={`card-hover animate-fade-in ${delay}`}>
    <CardHeader>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 text-secondary mb-4">
        {icon}
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button variant="ghost" asChild className="w-full">
        <Link to={`/ministries`}>Learn More</Link>
      </Button>
    </CardFooter>
  </Card>
);

const MinistriesSection = () => {
  const ministries = [
    {
      title: "Youth Ministry",
      description: "A vibrant community where young people grow in faith, build friendships, and develop leadership skills.",
      icon: <Users className="h-6 w-6" />,
      delay: "animate-delay-100"
    },
    {
      title: "Choir & Music",
      description: "Enhance our liturgies through music and song, bringing the congregation into deeper worship.",
      icon: <Music className="h-6 w-6" />,
      delay: "animate-delay-200"
    },
    {
      title: "Sunday School",
      description: "Religious education for children and youth to learn about our faith and traditions.",
      icon: <BookOpen className="h-6 w-6" />,
      delay: "animate-delay-300"
    },
    {
      title: "Charity & Outreach",
      description: "Serving our community through charitable works, outreach programs, and social justice initiatives.",
      icon: <Heart className="h-6 w-6" />,
      delay: "animate-delay-400"
    }
  ];

  return (
    <section className="section-container">
      <SectionHeading 
        title="Ministries & Groups" 
        subtitle="Get involved in our parish community through various ministries and groups."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ministries.map((ministry, index) => (
          <MinistryCard
            key={index}
            title={ministry.title}
            description={ministry.description}
            icon={ministry.icon}
            delay={ministry.delay}
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
