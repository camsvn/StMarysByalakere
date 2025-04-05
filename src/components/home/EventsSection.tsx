
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import EventCard from "../ui/EventCard";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/contexts/CMSContext";

const EventsSection = () => {
  const { events } = useCMS();
  
  // Display the first 3 events
  const displayedEvents = events.slice(0, 3);

  return (
    <section className="section-container">
      <SectionHeading 
        title="Upcoming Events" 
        subtitle="Join us for these special events and be part of our vibrant community."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedEvents.map((event, index) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            time={event.time}
            description={event.description}
            location={event.location}
            className={`animate-fade-in animate-delay-${index * 100}`}
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <Button asChild>
          <Link to="/events">View All Events</Link>
        </Button>
      </div>
    </section>
  );
};

export default EventsSection;
