
import { useCMS } from "@/contexts/CMSContext";
import { useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const EventsMarquee = () => {
  const { events } = useCMS();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Animation effect when component mounts
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const animation = marquee.animate(
      [
        { transform: "translateX(0%)" },
        { transform: "translateX(-50%)" }
      ],
      {
        duration: isMobile ? 20000 : 30000, // Faster on mobile
        iterations: Infinity
      }
    );

    return () => {
      animation.cancel();
    };
  }, [isMobile]);

  if (events.length === 0) return null;

  return (
    <div className="bg-primary text-white py-3 w-full overflow-hidden">
      <div className="flex items-center">
        <div className="shrink-0 px-2 sm:px-4 bg-primary font-bold flex items-center">
          <Clock className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
          <span className="text-sm sm:text-base">UPCOMING:</span>
        </div>
        
        <div className="overflow-hidden">
          <div className="whitespace-nowrap flex" ref={marqueeRef}>
            {/* Duplicate content for smooth looping */}
            {[...events, ...events].map((event, index) => (
              <Link
                key={`${event.id}-${index}`}
                to="/events"
                className="inline-block px-3 sm:px-6 text-sm sm:text-base font-medium hover:text-accent transition-colors"
              >
                <span className="mr-1 sm:mr-2">{event.date}:</span>
                <span className="text-primary-foreground">{event.title}</span>
                <span className="mx-4 sm:mx-8 text-primary-foreground/50">•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsMarquee;
