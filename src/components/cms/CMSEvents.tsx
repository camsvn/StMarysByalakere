
import { useState } from "react";
import { useCMS } from "@/contexts/CMSContext";
import { EventType } from "@/types/cms";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash, Plus, Edit, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CMSEvents = () => {
  const { events, addEvent, updateEvent, removeEvent } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventType | null>(null);
  const [formData, setFormData] = useState<Omit<EventType, "id">>({
    title: "",
    date: "",
    time: "",
    description: "",
    location: "",
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
    });
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (
      !formData.title.trim() ||
      !formData.date.trim() ||
      !formData.time.trim() ||
      !formData.description.trim()
    ) {
      return; // Don't save incomplete data
    }

    setIsSubmitting(true);
    
    try {
      if (currentEvent) {
        // Update existing event
        await updateEvent(currentEvent.id, formData);
      } else {
        // Add new event
        await addEvent(formData);
      }
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    await removeEvent(id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        <Button onClick={openNewEventForm}>
          <Plus className="h-4 w-4 mr-2" /> Add New Event
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">No events found. Create your first event!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardContent className="p-0">
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
      )}

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
              <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSEvents;
