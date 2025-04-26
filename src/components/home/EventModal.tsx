import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import type { Event, Media } from "@/payload-types";
import { cn, formatToIST } from "@/lib/utils";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

function getImageURL(event: Event) {
  const media = event.image as Media;
  return media ? media.url : "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&h=400&q=80"
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-0 rounded-xl shadow-2xl">
        <div className="relative h-48 bg-gradient-to-b from-primary/30 via-secondary/30 to-accent/30">
        {event.image && (
        <img
          src={getImageURL(event)}
          alt={event.title}
          className="absolute inset-0 object-cover w-full h-full rounded-t-xl"
        />
          )}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                {event.title}
              </DialogTitle>
              <div className="flex items-center mb-2">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium bg-primary/80 px-3 py-1 rounded-full">
                  {formatToIST(event.date)} • {formatToIST(event.date, "t")}
                </span>
              </div>
            </DialogHeader>
          </div>
        </div>
        <div className="p-4 pt-0">
          <DialogDescription className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
            {event.description}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
