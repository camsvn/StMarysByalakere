
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";
import EventCard from "../components/ui/EventCard";

const Events = () => {
  // Sample events data
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
    },
    {
      id: 4,
      title: "Parish Council Meeting",
      date: "Apr 18, 2023",
      time: "7:00 PM",
      description: "Monthly meeting to discuss parish matters and upcoming events. All parishioners are welcome to attend.",
      location: "Meeting Room"
    },
    {
      id: 5,
      title: "First Communion Preparation",
      date: "Apr 22, 2023",
      time: "10:00 AM",
      description: "Preparation class for children receiving First Holy Communion. Parents must accompany their children.",
      location: "Classroom 3"
    },
    {
      id: 6,
      title: "Senior Group Social",
      date: "Apr 25, 2023",
      time: "1:00 PM",
      description: "Monthly social gathering for seniors with refreshments, games, and fellowship.",
      location: "Parish Hall"
    }
  ];

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
