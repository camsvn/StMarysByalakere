
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";
import EventCard from "../components/ui/EventCard";
import { useCMS } from "@/contexts/CMSContext";

const Events = () => {
  const { events } = useCMS();

  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <SectionHeading 
            title="Events & Announcements"
            subtitle="Stay updated with what's happening in our parish community."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                description={event.description}
                location={event.location}
                className={`animate-fade-in animate-delay-${index % 3 * 100}`}
              />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Events;
