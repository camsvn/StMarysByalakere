
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import EventCard from "../ui/EventCard";
import { Button } from "@/components/ui/button";

const EventsSection = () => {
  // Sample event data
  const events = [
    {
      id: 1,
      title: "Easter Sunday Mass",
      date: "Apr 9, 2023",
      time: "9:00 AM",
      description: "Celebrate the resurrection of our Lord Jesus Christ with a special Easter service followed by community breakfast.",
      location: "Main Church"
    },
    {
      id: 2,
      title: "Youth Group Meeting",
      date: "Apr 12, 2023",
      time: "6:30 PM",
      description: "Join fellow youth for an evening of faith, fun, and fellowship. This week's topic: 'Faith in Action'.",
      location: "Parish Hall"
    },
    {
      id: 3,
      title: "Food Drive for Local Shelter",
      date: "Apr 15, 2023",
      time: "10:00 AM - 2:00 PM",
      description: "Help collect non-perishable food items for our local community shelter. All donations welcome!",
      location: "Church Parking Lot"
    }
  ];

  return (
    <section className="section-container">
      <SectionHeading 
        title="Upcoming Events" 
        subtitle="Join us for these special events and be part of our vibrant community."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
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
