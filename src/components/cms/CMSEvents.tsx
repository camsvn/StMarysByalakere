
import { useState } from "react";
import { useCMS, EventType } from "@/contexts/CMSContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash, Plus, Edit, ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const CMSEvents = () => {
  const { events, setEvents } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
  const [formData, setFormData] = useState<Omit<EventType, "id">>({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
    image: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openNewEventForm = () => {
    setCurrentEvent(null);
    setFormData({
      title: "",
      date: "",
      time: "",
      description: "",
      location: "",
      image: "",
    });
    setIsOpen(true);
  };

  const openEditEventForm = (event: EventType) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      location: event.location || "",
      image: event.image || "",
    });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (
      !formData.title.trim() ||
      !formData.date.trim() ||
      !formData.time.trim() ||
      !formData.description.trim()
    ) {
      return; // Don't save incomplete data
    }

    if (currentEvent) {
      // Update existing event
      setEvents(events.map(e => e.id === currentEvent.id ? { ...e, ...formData } : e));
    } else {
      // Add new event
      const newEvent = {
        id: Math.max(0, ...events.map(e => e.id)) + 1,
        ...formData
      };
      setEvents([...events, newEvent]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        <Button onClick={openNewEventForm}>
          <Plus className="h-4 w-4 mr-2" /> Add New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardContent className="p-0">
              {event.image && (
                <div className="relative h-48 w-full">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditEventForm(event)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)}>
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {event.date} • {event.time}
                </p>
                <p className="mt-2 line-clamp-2">{event.description}</p>
                {event.location && (
                  <p className="text-sm text-muted-foreground mt-2">Location: {event.location}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{currentEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Event title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g., Apr 9, 2023"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 9:00 AM"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Event location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image || ""}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div className="mt-2 border rounded-md overflow-hidden">
                  <img src={formData.image} alt="Preview" className="w-full h-40 object-cover" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Event description"
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Event</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSEvents;
