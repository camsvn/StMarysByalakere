
import { useCMS } from "@/contexts/CMSContext";
import { useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import Link from 'next/link'

const EventsMarquee = () => {
  const { events } = useCMS();
  const marqueeRef = useRef<HTMLDivElement>(null);

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
        duration: 30000,
        iterations: Infinity
      }
    );

    return () => {
      animation.cancel();
    };
  }, []);

  if (events.length === 0) return null;

  return (
    <div className="bg-primary text-white py-3 overflow-hidden">
      <div className="flex items-center">
        <div className="shrink-0 px-4 bg-primary font-bold flex items-center">
          <Clock className="mr-2 h-5 w-5 animate-pulse" />
          <span>UPCOMING:</span>
        </div>
        
        <div className="overflow-hidden">
          <div className="whitespace-nowrap flex" ref={marqueeRef}>
            {/* Duplicate content for smooth looping */}
            {[...events, ...events].map((event, index) => (
              <Link
                key={`${event.id}-${index}`}
                href="/events"
                className="inline-block px-6 font-medium hover:text-accent transition-colors"
              >
                <span className="mr-2">{event.date}:</span>
                <span className="text-primary-foreground">{event.title}</span>
                <span className="mx-8 text-primary-foreground/50">•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsMarquee;
