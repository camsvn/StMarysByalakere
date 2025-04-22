"use client";
import { useRef, useEffect, useState } from "react";
import { Clock } from "lucide-react";
import Link from "next/link";
import type { Event } from '@/payload-types';
import { formatToIST } from "@/lib/utils";


export default function MarqueeClient({ events }: { events: Event[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (marqueeRef.current) {
      setScrollWidth(marqueeRef.current.scrollWidth);
      setClientWidth(marqueeRef.current.clientWidth);
      setIsReady(true);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const { scrollWidth, clientWidth } = entries[0].target;
      setScrollWidth(scrollWidth);
      setClientWidth(clientWidth);
    });

    if (marqueeRef.current) {
      resizeObserver.observe(marqueeRef.current);
    }

    return () => {
      resizeObserver.disconnect()
    };
  }, [events]);

  const keyframes = `
    @keyframes scroll-left {
    0%, 100% { transform: translateX(${clientWidth}px); }
      0% { transform: translateX(${20}px); }
      100% { transform: translateX(-${scrollWidth}px); }
    }
  `;

  const speed = 30;
  const duration = scrollWidth / speed;

  return (
    <div className="bg-primary text-white py-3 overflow-hidden">
      <style>{keyframes}</style>
      <div className="flex items-center">
        <div className="shrink-0 px-4 bg-primary font-bold flex items-center">
          <Clock className="mr-2 h-5 w-5 animate-pulse" />
          <span>UPCOMING:</span>
        </div>

        <div className="overflow-hidden w-full">
          <div
            className="whitespace-nowrap flex will-change-transform"
            ref={marqueeRef}
            style={{
              animation: scrollWidth > clientWidth ? `scroll-left ${duration}s linear infinite` : 'none',
              visibility: !isReady ? "hidden" : undefined,
              opacity: !isReady ? "0%" : "100%",
              transition: "opacity 0.4s ease-in-out"
            }}
            onMouseEnter={() => {
              if (marqueeRef.current) {
                marqueeRef.current.style.animationPlayState = 'paused';
              }
            }}
            onMouseLeave={() => {
              if (marqueeRef.current) {
                marqueeRef.current.style.animationPlayState = 'running';
              }
            }}
          >
            {[...events].map((event, index) => (
              <Link
                key={`${event.id}-${index}`}
                href="/events"
                className="inline-block px-6 font-medium hover:text-accent transition-colors"
              >
                <span className="mr-2">{formatToIST(event.date)}:</span>
                <span className="text-primary-foreground">{event.title}</span>
                <span className="mx-8 text-primary-foreground/50">•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}