
import Link from 'next/link'
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getPayload } from 'payload'
import config from '@payload-config'

interface MinistryCardProps {
  title: string;
  description: string;
  delay: string;
  imageUrl?: string; // optional image URL
}

const MinistryCard = ({ title, description, delay, imageUrl }: MinistryCardProps) => (
  <Card className={`card-hover animate-fade-in ${delay}`}>
    <CardHeader className="flex flex-col items-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-20 h-20 object-cover rounded-full mb-4 border"
        />
      )}
      <CardTitle className="text-xl text-center">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-center line-clamp-3">{description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button variant="ghost" asChild className="w-full">
        <Link href={`/pious-associations`}>Learn More</Link>
      </Button>
    </CardFooter>
  </Card>
);

async function MinistriesSection() {
  const payload = await getPayload({
    config
  });

  const ministries = await payload.find({
    collection: 'ministries',
    sort: "id"
  });
  
  return (
    <section className="section-container">
      <SectionHeading
        title="Pious Association"
        subtitle="Get involved in our parish community through various ministries and groups. Find a place where your gifts and passions meet the needs of others."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ministries.docs.map((ministry, index) => (
          <MinistryCard
            key={index}
            title={ministry.name}
            description={ministry?.description || ''}
            delay={`animate-delay-${index * 100}`}
            imageUrl={"https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=600&h=400&q=80"} // pass the imageUrl prop
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <Button asChild>
          <Link href="/ministries">Explore All Ministries</Link>
        </Button>
      </div>
    </section>
  );
};

export default MinistriesSection;
